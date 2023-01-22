import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map, of, shareReplay } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { StoreQueryModel } from '../../query-model/store-query.model';
import { StoreModel } from '../../models/store.model';
import { StoreTagsModel } from '../../models/store-tags.model';
import { ProductModel } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getCategories().pipe(shareReplay(1));
  readonly getToKnowsUsElements$: Observable<string[]> = of(['Company', 'About', 'Blog', 'Help Center', 'Our Value']);
  private _showMobileMenuSubject: Subject<boolean> = new Subject<boolean>();
  public showMobileMenu$: Observable<boolean> = this._showMobileMenuSubject.asObservable();

  readonly stores$: Observable<StoreQueryModel[]> = combineLatest([
    this._storeService.getStories().pipe(shareReplay(1)),
    this._storeService.getStoreTags().pipe(shareReplay(1))
  ]).pipe(
    map(([stores, tags]: [StoreModel[], StoreTagsModel[]]) => this.mapToStoreQueryModel(stores, tags))
  );

  readonly fruitsAndVegetables$: Observable<ProductModel[]> = this._productService.getProductsByCategoryId('5').pipe(
    map(products => {
      products.sort((a, b) => this.sortByFeatureValue(a, b));
      return products.splice(0,5);
    })
  );

  readonly snackAndMunchies$: Observable<ProductModel[]> = this._productService.getProductsByCategoryId('2').pipe(
    map(products => {
      products.sort((a, b) => this.sortByFeatureValue(a, b));
      return products.splice(0,5);
    })
  );

  constructor(private _categoryService: CategoryService, private _storeService: StoreService, private _productService: ProductService) {
  }

  public showMobileMenu(): void {
    this._showMobileMenuSubject.next(true)
  }

  public hideMobileMenu(): void {
    this._showMobileMenuSubject.next(false)
  }

  private mapToStoreQueryModel(stores: StoreModel[], storeTags: StoreTagsModel[]): StoreQueryModel[] {
    const storeTagsMap = storeTags.reduce((previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.id]: currentValue
    }), {}) as Record<string, StoreTagsModel>;
    return stores.map(store => ({
      name: store.name,
      logoUrl: store.logoUrl,
      distanceInKilometers: +(store.distanceInMeters / 1000).toFixed(1),
      id: store.id,
      tags: (store.tagIds ?? []).map(id => storeTagsMap[id]?.name)
    }))
  }

  private sortByFeatureValue(a: ProductModel, b: ProductModel): number {
    if(a.featureValue > b.featureValue) return -1;
    if(a.featureValue < b.featureValue) return 1;
    return 0;
  }
}
