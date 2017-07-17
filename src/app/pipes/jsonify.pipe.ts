import { GenerateOptions } from 'rxjs/observable/GenerateObservable';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonify'
})
export class JsonifyPipe implements PipeTransform {

  transform(val) {
    return JSON.stringify(val, null, 2)
      .replace(/\n/g, '<br/>')
      .replace(/\s/g, '&nbsp;')
      .replace(',', ',<br/>')
      .replace('<br/><br/>', '<br/>');
  }

}
