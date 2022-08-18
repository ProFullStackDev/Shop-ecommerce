import { NgModule } from '@angular/core';
import { ShopArticleService } from '@core/services/shop/article.service';
import { SharedModule } from '@shared/shared.module';

import { ShopArticleRoutingModule } from './shop-article-routing.module';
import { ShopArticleComponent } from './shop-article.component';

@NgModule({
  declarations: [ShopArticleComponent],
  imports: [SharedModule, ShopArticleRoutingModule],
  providers: [ShopArticleService]
})
export class ShopArticleModule {}
