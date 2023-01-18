import {ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, of, shareReplay} from "rxjs";
import {CategoryModel} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {StoreModel} from "../../models/store.model";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getCategories().pipe(shareReplay(1));
  readonly stores$: Observable<StoreModel[]> = this._storeService.getStories();
  readonly getToKnowsUsElements$: Observable<string[]> = of(['Company', 'About', 'Blog', 'Help Center', 'Our Value']);

  constructor(private _categoryService: CategoryService, private _storeService: StoreService) {
  }

  public openMobileMenu(): void {
    this.mobileMenu.nativeElement.style = 'transform: translateX(0); visibility: visible';
  }

  public onCloseMobileMenu(): void {
    this.mobileMenu.nativeElement.style = '';
  }
}
