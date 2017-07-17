import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; // *** inserted line

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', }, // *** edited line
  { path: 'home', component: HomeComponent }     // *** inserted line
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
