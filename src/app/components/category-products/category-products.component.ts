import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {StoreService} from "../../services/store.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {map, Observable, of, shareReplay, Subject, switchMap} from "rxjs";
import {CategoryModel} from "../../models/category.model";
import {StoreModel} from "../../models/store.model";
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
  readonly getToKnowsUsElements$: Observable<string[]> = of(['Company', 'About', 'Blog', 'Help Center', 'Our Value']);
  private _showMobileMenuSubject: Subject<boolean> = new Subject<boolean>();
  public showMobileMenu$: Observable<boolean> = this._showMobileMenuSubject.asObservable();
  readonly storesHeader$: Observable<StoreModel[]> = this._storeService.getStories().pipe(shareReplay(1));

  readonly title$: Observable<CategoryModel | undefined> = this._activatedRoute.params.pipe(
    switchMap((params: Params) => this.categories$.pipe(
      map((categories: CategoryModel[] )=> categories.find((category: CategoryModel)=> category.id === params['categoryId']))
    )
  ))

  readonly productsByCategoryId$: Observable<ProductModel[]> = this._activatedRoute.params.pipe(
    switchMap((params: Params) => this._productService.getProductsByCategoryId(params['categoryId']))
  )

  readonly ratingValue$: Observable<number[]> = of(this.ratingFunction())

  constructor(private _categoryService: CategoryService,
              private _storeService: StoreService,
              private _activatedRoute: ActivatedRoute,
              private _productService: ProductService) {
  }

  public showMobileMenu(): void {
    this._showMobileMenuSubject.next(true)
  }

  public hideMobileMenu(): void {
    this._showMobileMenuSubject.next(false)
  }

  private ratingFunction(): any {
    let number = 3.5;
    let n = 5;

    let values = [];
    let a = 0;
    while (number > 0 && n > 0) {
      if (a%2 == 0)
        a = Math.floor(number / n / 0.5) * 0.5;
      else
        a = Math.ceil(number / n / 0.5) * 0.5;
      number -= a;
      n--;
      values.push(a);

    }
    values.sort((a,b) => {
      if(a < b)return 1;
      if(a > b) return -1;
      return 0;
    })
    return values

  }

}
