import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CarouselModule} from "ngx-bootstrap/carousel";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent]
})
export class HomeComponentModule {
}
