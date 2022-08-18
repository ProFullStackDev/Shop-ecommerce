import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CouponService } from '@core/services/member/coupon.service';
import { BasicService } from '@core/services/user/basic.service';
import { BillService } from '@core/services/user/bill.service';
import { WalletService } from '@core/services/user/wallet.service';
import { PointModule } from '@routes/member/business/point/point.module';
import { PaymentModalsModule } from '@shared/components/payment-modals/payment-modals.module';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { CouponBindComponent } from './business/coupon-bind/coupon-bind.component';
import { CouponCodeComponent } from './business/coupon-code/coupon-code.component';
import { CouponExchangeComponent } from './business/coupon-exchange/coupon-exchange.component';
import { IndexComponent } from './index/index.component';

// 我的发票 invoice
import { HeaderManageComponent } from './invoice/header/header-manage.component';
import { InvoiceComponent } from './invoice/list/invoice.component';
import { InvoiceDetailComponent } from './invoice/list/views/invoice-detail.component';

// 账户余额 account-blance
import { BlanceComponent } from './member-deposit/blance/blance.component';
import { MemberMenuComponent } from './member-menu/member-menu.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
// 账户设置
import { AccountBindComponent } from './personal/account-bind/account-bind.component';
import { AddressListComponent } from './personal/address/list/address-list.component';

@NgModule({
  declarations: [
    MemberComponent,
    IndexComponent,
    CouponCodeComponent,
    CouponBindComponent,
    CouponExchangeComponent,
    InvoiceComponent,
    InvoiceDetailComponent,
    HeaderManageComponent,
    BlanceComponent,
    AddressListComponent,
    AccountBindComponent,
    MemberMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemberRoutingModule,
    NzCarouselModule,
    NzIconModule,
    NzAnchorModule,
    NzGridModule,
    NzModalModule,
    NzTabsModule,
    NzButtonModule,
    FormsModule,
    NzInputModule,
    NzDatePickerModule,
    NzTableModule,
    NzPaginationModule,
    NzCascaderModule,
    NzStepsModule,
    PaymentModalsModule,
    TyqoonIconsModule,
    CopyingModule,
    PointModule
  ],
  providers: [BasicService, CouponService, WalletService, BillService]
})
export class MemberModule {}
