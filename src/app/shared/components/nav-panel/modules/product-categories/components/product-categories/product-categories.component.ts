import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ProductsCategories, ProductsCategoriesSubItem } from '../../../../models/nav-panel.model';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoriesComponent implements OnInit {
  @Input() productCategories: ProductsCategories[] | null;
  @Input() homePage = false;
  @Input() isMobile = false;

  constructor() {}

  ngOnInit(): void {}
}
