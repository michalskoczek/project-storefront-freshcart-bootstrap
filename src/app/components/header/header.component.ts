import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable, of, shareReplay, Subject} from "rxjs";
import {CategoryModel} from "../../models/category.model";
import {StoreModel} from "../../models/store.model";
import {CategoryService} from "../../services/category.service";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getCategories().pipe(shareReplay(1));
  private _showMobileMenuSubject: Subject<boolean> = new Subject<boolean>();
  public showMobileMenu$: Observable<boolean> = this._showMobileMenuSubject.asObservable();
  readonly storesHeader$: Observable<StoreModel[]> = this._storeService.getStories().pipe(shareReplay(1));

  constructor(private _categoryService: CategoryService,
              private _storeService: StoreService) {
  }

  public showMobileMenu(): void {
    this._showMobileMenuSubject.next(true)
  }

  public hideMobileMenu(): void {
    this._showMobileMenuSubject.next(false)
  }
}
