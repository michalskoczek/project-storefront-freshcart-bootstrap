import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {StoreService} from "../../services/store.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {map, Observable, of, shareReplay, switchMap} from "rxjs";
import {CategoryModel} from "../../models/category.model";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getCategories().pipe(shareReplay(1));

  readonly title$: Observable<CategoryModel | undefined> = this._activatedRoute.params.pipe(
    switchMap((params: Params) => this.categories$.pipe(
      map((categories: CategoryModel[] )=> categories.find((category: CategoryModel)=> category.id === params['categoryId']))
    )
  ))

  readonly productsByCategoryId$: Observable<ProductModel[]> = this._activatedRoute.params.pipe(
    switchMap((params: Params) => this._productService.getProductsByCategoryId(params['categoryId']))
  )

  readonly ratingValue$: Observable<number[]> = of([1,1,1,0.5,0])


  constructor(private _categoryService: CategoryService,
              private _storeService: StoreService,
              private _activatedRoute: ActivatedRoute,
              private _productService: ProductService) {
  }

}
