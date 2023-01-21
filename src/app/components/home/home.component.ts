import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable, Subject, of, shareReplay, map, tap, combineLatest} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {StoreModel} from '../../models/store.model';
import {CategoryService} from '../../services/category.service';
import {StoreService} from '../../services/store.service';
import {StoreTagsModel} from "../../models/store-tags.model";
import {StoreQueryModel} from "../../query-model/store-query.model";

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
    map(([stores, tags] : [StoreModel[], StoreTagsModel[]]) => this.mapToStoreQueryModel(stores, tags))
  );

  constructor(private _categoryService: CategoryService, private _storeService: StoreService) {
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
}
