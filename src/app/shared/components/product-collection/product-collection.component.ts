import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FavoriteService } from '@core/services/user/favorite.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';

@Component({
  selector: 'app-product-collection',
  templateUrl: './product-collection.component.html',
  styleUrls: ['./product-collection.component.less']
})
export class ProductCollectionComponent extends DestroySubscription implements OnInit {
  constructor(private favoriteService: FavoriteService, private userSrv: SystemUserService) {
    super();
  }

  favorite = false;

  @Input()
  isButton: boolean = false;

  @Input()
  isMobile: boolean = false;

  @Input()
  productId: number;

  @Input()
  get isFavorite() {
    return this.favorite;
  }

  set isFavorite(val) {
    this.favorite = val;
    this.isFavoriteChange.emit(this.favorite);
  }

  @Output()
  isFavoriteChange = new EventEmitter<boolean>();

  ngOnInit(): void {}

  isActive() {
    if (!this.userSrv.isLogin()) {
      this.userSrv.showConfirmLoginModal();
      return;
    }
    if (!this.favorite) {
      //收藏
      this.addProductFavorite();
    } else {
      //取消收藏
      this.delProductFavorite();
    }
  }

  addProductFavorite() {
    this.favoriteService
      .saveUserProductFavorite({ productId: this.productId })
      .subscribe({
        next: res => {
          this.isFavoriteChange.emit(true);
        },
        error: err => {
          console.error(err);
          if (err.code == 1003001) {
            //后端返回已收藏
            this.isFavoriteChange.emit(true);
          }
        }
      })
      .add();
  }

  delProductFavorite() {
    this.favoriteService
      .delUserProductFavorite({ id: this.productId })
      .subscribe({
        next: res => {
          this.isFavoriteChange.emit(false);
        },
        error: err => {
          console.error(err);
        }
      })
      .add();
  }
}
