import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreProductsComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getCategories().pipe(shareReplay(1));

  readonly store$: Observable<StoreModel> = this._activatedRoute.params.pipe(
    switchMap((params: Params) => this._storeService.getStoreByStoreId(params['storeId']).pipe(
      map(store => ({
        ...store,
        distanceInMeters: +(store.distanceInMeters / 1000).toFixed(1),
      }))
    ))
  )
  readonly storeProducts$: Observable<ProductModel[]> = this._activatedRoute.params.pipe(
    switchMap((params: Params) => this._productService.getProductsByStoreId(params['storeId']))
  )


  constructor(private _categoryService: CategoryService,
    private _storeService: StoreService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute) {
  }
}
