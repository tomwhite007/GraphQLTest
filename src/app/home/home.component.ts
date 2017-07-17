import { Component, OnInit } from '@angular/core';
import { ExternalInterfaceService } from 'app/services/external-interface.service';
import { JsonifyPipe } from 'app/pipes/jsonify.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  output: any;

  constructor (private externalInterface: ExternalInterfaceService) {}

  ngOnInit() {
    this.processR2d2('1111');
  }

  tryAgain() {
    this.processR2d2('1234');
  }

  private processR2d2(Token: string) {

    this.externalInterface.r2d2(Token)
      .map(res => {
        console.log('r2d2', res);
        this.output = res;
      })
      .subscribe();
  }

}
