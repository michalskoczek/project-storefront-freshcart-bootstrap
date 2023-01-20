import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent]
})
export class HomeComponentModule {
}
