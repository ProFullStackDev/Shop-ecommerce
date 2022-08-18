import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductImageType, WishProductPOM, SpecificationPOM } from '@core/services/shop/product.service';
import { CartItemPOM, CartPOM } from '@core/services/user/cart.service';
import { FavoriteService } from '@core/services/user/favorite.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { getProductCover } from '@shared/utils/utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.less']
})
export class WishlistListComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollingContainer') scrollingContainer: ElementRef;
  allChecked = false;
  // indeterminate = true;
  isTableStartPosition = false;
  constructor(
    private favoriteService: FavoriteService,
    private readonly user: SystemUserService,
    private readonly cartService: SystemCartService,
    private readonly message: NzMessageService,
    private readonly systemCartService: SystemCartService
  ) {
    super();
  }
  page = 1;
  rows = 10;
  total = 0;

  loading = {
    table: false
  };
  wishListTabIndex = 0;
  wishListTab = ['my-wishlist-search'];
  tableSpan = {
    detail: 16,
    price: 4,
    operation: 4
  };
  wishListItems: any = [];
  selectedGoods: any = [];
  noSelectedGoods = false;
  noGoodsToDelete = false;
  isVisible: boolean = false;
  searchControl = new FormControl(null, [Validators.required]);
  searchError: boolean = false;

  ngOnInit(): void {
    this.getProductFavorite();
  }

  updateAllChecked(): void {
    this.noSelectedGoods = false;
    this.noGoodsToDelete = false;
    // this.indeterminate = false;
    if (this.allChecked) {
      this.wishListItems = this.wishListItems.map((item: any) => ({
        ...item,
        checked: true
      }));
    } else {
      this.wishListItems = this.wishListItems.map((item: any) => ({
        ...item,
        checked: false
      }));
    }
  }

  updateSingleChecked(): void {
    this.noSelectedGoods = false;
    this.noGoodsToDelete = false;
    if (this.wishListItems.every((item: any) => !item.checked)) {
      this.allChecked = false;
      // this.indeterminate = false;
    } else if (this.wishListItems.every((item: any) => item.checked)) {
      this.allChecked = true;
      // this.indeterminate = false;
    } else {
      // this.indeterminate = true;
    }
  }

  addToCard() {
    this.selectedGoods = this.wishListItems.reduce((acc: any, curr: any) => {
      if (curr.checked) {
        acc.push(curr.id);
      }
      return acc;
    }, []);

    if (!this.selectedGoods.length) {
      this.noSelectedGoods = true;
      return;
    }

    this.addCart(this.selectedGoods)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.message.success('添加成功');
          this.getProductFavorite();
          this.allChecked = false;
          this.cartService.getCart().pipe(takeUntil(this.destroyStream$)).subscribe();
        },
        error => {
          this.message.error(error.message);
        }
      );

    this.noSelectedGoods = false;
  }

  addCart(cartList: string[]): Observable<any> {
    return this.user.isLogin() ? this.systemCartService.addToDb(cartList) : this.systemCartService.addToStorage(cartList);
  }

  deleteGoods() {
    this.selectedGoods = this.wishListItems.reduce((acc: any, curr: any) => {
      if (curr.checked) {
        acc.push(curr.id);
      }
      return acc;
    }, []);

    if (!this.selectedGoods.length) {
      this.noGoodsToDelete = true;
      return;
    }

    this.confirmDelete();

    this.noGoodsToDelete = false;
  }

  confirmDelete() {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.delWishListItems(this.selectedGoods);
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  delWishListItems(goodsList: any) {
    this.favoriteService
      .delUserProductFavorites({ ids: goodsList })
      .subscribe({
        next: res => {
          this.getProductFavorite();
          this.allChecked = false;
        },
        error: err => {
          console.error(err);
        }
      })
      .add();
  }

  wishlistStatusChange(index: number) {
    console.log('statusChange');
  }

  search() {
    if (this.searchControl.invalid) {
      this.searchError = true;
      return;
    }

    const product = this.searchControl.value.toLowerCase();

    this.favoriteService
      .getUserProductFavorite({ page: this.page - 1, rows: this.rows, name: product })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          this.total = res.total;
          this.wishListItems = res.rows.map(item => {
            return {
              ...item,
              value: item.id,
              checked: false,
              specifications: this.getSpecifications(item.specificationItems),
              cover: getProductCover(item.productImages || '{}', ProductImageType.THUMBNAIL)
            };
          });
        },
        error: err => {
          console.error(err);
          console.error(err);
        }
      })
      .add();
  }

  pageIndexChange() {
    this.getProductFavorite();
  }

  pageSizeChange() {
    this.page = 1;
    this.getProductFavorite();
  }

  keys(items: any): string[] {
    return Object.keys(items);
  }

  delWishListItem(id: number) {
    //console.log('id' + id)
    this.favoriteService
      .delUserProductFavorite({ id: id })
      .subscribe({
        next: res => {
          //console.log(res);
          let index = this.wishListItems.findIndex((item: any) => Object.is(item.id, id));
          delete this.wishListItems[index];
        },
        error: err => {
          console.error(err);
        }
      })
      .add();
  }

  getProductFavorite() {
    this.favoriteService
      .getUserProductFavorite({ page: this.page - 1, rows: this.rows })
      .subscribe({
        next: res => {
          this.total = res.total;
          this.wishListItems = res.rows.map(item => {
            return {
              ...item,
              value: item.id,
              checked: false,
              specifications: this.getSpecifications(item.specificationItems),
              cover: getProductCover(item.productImages || '{}', ProductImageType.THUMBNAIL)
            };
          });
        },
        error: err => {
          console.error(err);
          console.error(err);
        }
      })
      .add();
  }
  getSpecifications(specificationItems: any = '') {
    let specifications = '';
    if (specificationItems) {
      const specificationItemList: SpecificationPOM[] = JSON.parse(specificationItems);
      specificationItemList.forEach(item => {
        specifications += `[${item.name}：`;
        //specifications += "[";
        item.entries
          .filter(item => Object.is(item.isSelected, true))
          .forEach(entry => {
            specifications += `${entry.value}、`;
          });
        if (specifications && specifications.lastIndexOf('、') != -1) {
          specifications = specifications.substring(0, specifications.length - 1);
        }
        specifications += ']';
      });
    }
    return specifications;
  }

  startTouching(): void {
    this.isTableStartPosition = this.scrollingContainer.nativeElement.scrollLeft === 0;
  }

  checkTouching(e: TouchEvent): void {
    if (this.isTableStartPosition) {
      return;
    }

    e.stopPropagation();
  }

  get isChecked() {
    return this.wishListItems.filter((item: any) => item.checked);
  }
}
