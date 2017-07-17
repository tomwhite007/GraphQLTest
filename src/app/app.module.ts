import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExternalInterfaceService } from 'app/services/external-interface.service';
import { JsonifyPipe } from 'app/pipes/jsonify.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JsonifyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ExternalInterfaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
