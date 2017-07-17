import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';

@Injectable()
export class ExternalInterfaceService {

  constructor (private http: Http) {}


  r2d2 (Token: string): Observable<any> {
    return this.post('http://localhost:5000/graphql', {
      'query': 'query r2d2 {  hero(Token: "' + Token + '" episode: NEWHOPE) { id name } }', 'variables': 'null', 'operationName': 'r2d2'
    });
  }



  // private methods:

  private post (url: string, requestJson: any): Observable<any> {

    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=1.0'});
    const options = new RequestOptions({ headers: headers });

    console.log(`post to ${url} `, requestJson);

    let errorAlready = false;
    const statusGoodForRetry = this.statusGoodForRetry;

    return this.http.post(url, requestJson, options)
                    .map(this.extractData.bind(this))
                    .retryWhen(errors => {
                        return errors.scan(function(errorCount, err) {
                            if (errorCount >= 2) {
                                throw err;
                            }

                            console.log('testing...', err);
                            if (statusGoodForRetry(err) && !errorAlready && errorCount > 0) {
                              console.log('Connection problem, retrying...');
                              errorAlready = true;
                            }

                            return errorCount + 1;
                        }, 0)
                        .delay(400);
                      }
                    )
                    .catch(
                      this.handleError.bind(this)
                    );

  }

  statusGoodForRetry(res: Response) {
    /*
      retry logic for...
      400 Bad Request
      404 Not Found
      408 Request Timeout
      409 Conflict
      500 Internal Server Error
      502 Bad Gateway
      503 Service Unavailable
      504 Gateway Timeout
    */
    if (res.status &&
      (
        res.status === 400 ||
        res.status === 404 ||
        res.status === 408 ||
        res.status === 409 ||
        res.status === 500 ||
        res.status === 502 ||
        res.status === 503 ||
        res.status === 504
      )) {
        return true;
    }
    return false;
  }

  private extractData(res: Response) {

    console.log('extractData');

    if (this.statusGoodForRetry(res)) {
        console.log('res.status ', res.status);
        throw res;
    }

    const body = res.json();

    console.log('result: ', body);

    return body;
  }


  private showError(msg: string) {
    console.log('error: ', msg);
  }

  private handleError (error: any): string {
    console.log('handleError');
    const _status = (error.status && error.status === 401 ? '' : error.status + ' - ');
    const errMsg = (error.Message) ? error.Message :
      error.status ? `${_status}${error.statusText}` : 'Server error - sorry, cannot connect';
    console.error(errMsg);
    console.log(JSON.stringify(error));
    this.showError(errMsg);
    return errMsg;
  }


}
