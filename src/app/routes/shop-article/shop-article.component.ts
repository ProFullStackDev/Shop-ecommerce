import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopArticleService } from '@core/services/shop/article.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shop-article',
  templateUrl: './shop-article.component.html',
  styleUrls: ['./shop-article.component.less']
})
export class ShopArticleComponent extends DestroySubscription implements OnInit {
  constructor(private route: ActivatedRoute, private articleSrv: ShopArticleService, private router: Router) {
    super();
  }

  loading = false;

  articleCategoryList: any;
  searchContent?: string;

  ngOnInit(): void {
    this.getArticleCategory();
  }

  goSearch() {
    if (this.searchContent) {
      this.router.navigate(['/article/search'], {
        queryParams: { searchContent: this.searchContent }
      });
    }
  }

  getArticleCategory() {
    this.loading = true;
    this.articleSrv
      .getCategory({ rows: 100, page: 0 })
      .subscribe({
        next: res => {
          console.log(res);
          this.articleCategoryList = res.rows;
        },
        error: err => {
          console.error(err);
        }
      })
      .add(() => (this.loading = false));
  }
}
