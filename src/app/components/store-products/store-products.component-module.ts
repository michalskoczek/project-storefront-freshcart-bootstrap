import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProductsComponent } from './store-products.component';
import {RouterModule} from "@angular/router";
import {CarouselModule} from "ngx-bootstrap/carousel";

@NgModule({
  imports: [CommonModule, RouterModule, CarouselModule],
  declarations: [StoreProductsComponent],
  providers: [],
  exports: [StoreProductsComponent]
})
export class StoreProductsComponentModule {
}
