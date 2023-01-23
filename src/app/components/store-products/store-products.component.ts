import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Observable, Subject, map, of, shareReplay, switchMap } from 'rxjs';
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
  readonly getToKnowsUsElements$: Observable<string[]> = of(['Company', 'About', 'Blog', 'Help Center', 'Our Value']);
  private _showMobileMenuSubject: Subject<boolean> = new Subject<boolean>();
  public showMobileMenu$: Observable<boolean> = this._showMobileMenuSubject.asObservable();
  readonly storesHeader$: Observable<StoreModel[]> = this._storeService.getStories().pipe(shareReplay(1))


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


  public showMobileMenu(): void {
    this._showMobileMenuSubject.next(true)
  }

  public hideMobileMenu(): void {
    this._showMobileMenuSubject.next(false)
  }
}
