import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopArticleService, ArticlePOM } from '@core/services/shop/article.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent extends DestroySubscription implements OnInit {
  constructor(private route: ActivatedRoute, private articleSrv: ShopArticleService, private sanitizer: DomSanitizer,) {
    super();
  }

  loading = false;
  articleId: string;
  articleCategoryName?: string;
  articleCategoryId?: string;
  article!: ArticlePOM;

  get contentHTML(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.article?.content || '');
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(queryParams => {
      console.log(queryParams);
      this.articleCategoryId = queryParams.articleCategoryId;
      this.articleCategoryName = queryParams.articleCategoryName;
      this.articleId = queryParams.articleId;
      this.getDetails();
    });
  }


  getDetails() {
    this.loading = true;
    this.articleSrv
      .getParticulars(this.articleId)
      .subscribe({
        next: res => {
          console.log(res);
          this.article = res;
        },
        error: err => {
          console.error(err);
        }
      })
      .add(() => (this.loading = false));
  }
}
