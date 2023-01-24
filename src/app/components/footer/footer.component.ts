import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable, of, shareReplay} from "rxjs";
import {CategoryModel} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {StoreService} from "../../services/store.service";
import {StoreModel} from "../../models/store.model";

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getCategories().pipe(shareReplay(1));
  readonly getToKnowsUsElements$: Observable<string[]> = of(['Company', 'About', 'Blog', 'Help Center', 'Our Value']);
  readonly storesHeader$: Observable<StoreModel[]> = this._storeService.getStories().pipe(shareReplay(1));

  constructor(private _categoryService: CategoryService,
              private _storeService: StoreService) {
  }
}
