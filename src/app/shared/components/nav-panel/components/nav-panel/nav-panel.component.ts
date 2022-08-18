import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@routes/dashboard/components/dashboard/dashboard.component';
import { ProductCategoriesService } from '@shared/services/productCategories/product-categories.service';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';

import { PagesList, ProductsCategories } from '../../models/nav-panel.model';
import { NavPanelService } from '../../services/nav-panel.service';

const appRoutes: Routes = [{ path: 'gameboard', component: DashboardComponent }];

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavPanelComponent implements OnInit {
  public productCategories$: Observable<ProductsCategories[]>;
  public pagesList$: Observable<PagesList[]>;

  @Input() shop: boolean = false;
  @Input() isCategory: boolean = false;

  constructor(
    private readonly navPanelService: NavPanelService,
    private readonly productCategories: ProductCategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.productCategories$ = this.productCategories.getProductsCategories().pipe(take(1));
    this.productCategories$ = this.productCategories.getProductsCategories1();
    this.pagesList$ = this.navPanelService.getPagesList();
  }

  takeScreenshot(): void {
    const node = document.getElementById('dashboard');

    if (node) {
      htmlToImage
        .toPng(node)
        // @ts-ignore
        .then(dataUrl => {
          const img = new Image();
          img.src = dataUrl;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '100%';

          const arr = dataUrl.split(',');
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          saveAs(new File([u8arr], 'Dashboard.png', { type: 'png' }));
        })
        // @ts-ignore
        .catch(error => {
          console.error('oops, something went wrong!', error);
        });
    }
  }

  get showCategories() {
    if (this.router.url.includes('product/detail')) {
      return false;
    } else {
      return !this.isCategory;
    }
  }
}
