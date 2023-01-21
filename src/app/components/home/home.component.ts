import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable, Subject, of, shareReplay, map, tap} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {StoreModel} from '../../models/store.model';
import {CategoryService} from '../../services/category.service';
import {StoreService} from '../../services/store.service';

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

  readonly stores$: Observable<StoreModel[]> = this._storeService.getStories().pipe(
    shareReplay(1),
    map(store => store.map(store => ({...store, distanceInMeters: +((store.distanceInMeters / 1000).toFixed(1))})
    ))
  );

  constructor(private _categoryService: CategoryService, private _storeService: StoreService) {
  }

  public showMobileMenu(): void {
    this._showMobileMenuSubject.next(true)
  }

  public hideMobileMenu(): void {
    this._showMobileMenuSubject.next(false)
  }
}
