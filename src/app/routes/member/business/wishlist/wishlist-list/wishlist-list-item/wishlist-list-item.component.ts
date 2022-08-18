import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey } from '@shared/pipes/dict/dict.pipe';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-list-item.component.html',
  styleUrls: ['./wishlist-list-item.component.less']
})
export class WishlistListItemComponent extends DestroySubscription {
  productId: number;
  isVisible: boolean = false;
  @Input() wishListItem!: any;
  @Input() tableSpan!: { [key: string]: number };
  @Output() readonly delWishListItem = new EventEmitter();
  @Output() readonly singleCheckedChange = new EventEmitter();

  DictKey = DictKey;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly user: SystemUserService,
    private readonly systemCartService: SystemCartService
  ) {
    super();
  }

  handleOk(): void {
    this.isVisible = false;
    this.delWishListItem.emit(this.productId);
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  btn(id: number) {
    this.isVisible = true;
    this.productId = id;
  }

  updateSingleChecked(wishListItem: any): void {
    wishListItem.checked = !wishListItem.checked;
    this.cdr.detectChanges();
    this.singleCheckedChange.emit();
  }

  addToCart(item: any) {
    this.addCart(item).subscribe(() => this.systemCartService.getCart().pipe(takeUntil(this.destroyStream$)).subscribe());
  }

  addCart(item: any) {
    const wishlistItem = { skuId: item.id };
    return this.user.isLogin() ? this.systemCartService.addToDb(wishlistItem) : this.systemCartService.addToStorage(wishlistItem);
  }
}
