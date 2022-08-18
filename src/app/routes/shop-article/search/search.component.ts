import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopArticleService, ArticlePOM } from '@core/services/shop/article.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent extends DestroySubscription implements OnInit {
  constructor(private route: ActivatedRoute, private articleSrv: ShopArticleService, private router: Router) {
    super();
  }

  loading = false;
  searchContent?: string;
  articleList: ArticlePOM[] = [];
  page = 1;
  rows = 10;
  total = 0;
  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(queryParams => {
      console.log(queryParams);
      this.searchContent = queryParams.searchContent;
      if (queryParams.page) {
        this.page = queryParams.page
      }
      if (queryParams.rows) {
        this.rows = queryParams.rows
      }
      this.search();
    });
  }

  removeHTMLTag(str: any) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
    str = str.replace(/\s/g, ''); //将空格去掉
    return str;
  }

  pageIndexChange() {
    this.router.navigate(['/article/search'], {
      queryParams: { searchContent: this.searchContent, page: this.page, rows: this.rows }
    });
  }

  pageSizeChange() {
    this.page = 1;
    this.router.navigate(['/article/search'], {
      queryParams: { searchContent: this.searchContent, page: this.page, rows: this.rows }
    });
  }

  search() {
    this.loading = true;
    this.articleSrv
      .getArticleList({ rows: this.rows, page: this.page - 1, searchContent: this.searchContent })
      .subscribe({
        next: res => {
          console.log(res);
          this.total = res.total;
          this.articleList = res.rows.map(item => {
            return {
              ...item,
              content: this.removeHTMLTag(item.content)
            }
          });

        },
        error: err => {
          console.error(err);
        }
      })
      .add(() => (this.loading = false));
  }
}
