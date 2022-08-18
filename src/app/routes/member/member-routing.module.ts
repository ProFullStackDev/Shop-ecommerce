import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 首页
import { MemberMenuComponent } from '@routes/member/member-menu/member-menu.component';

import { CouponBindComponent } from './business/coupon-bind/coupon-bind.component';
import { CouponCodeComponent } from './business/coupon-code/coupon-code.component';
import { CouponExchangeComponent } from './business/coupon-exchange/coupon-exchange.component';
import { PointComponent } from './business/point/point.component';
import { IndexComponent } from './index/index.component';
// 交易信息 business
// 我的关注

// 我的发票 invoice
import { HeaderManageComponent } from './invoice/header/header-manage.component';
import { InvoiceAddComponent } from './invoice/list/add/invoice-add.component';
import { InvoiceEditComponent } from './invoice/list/edit/invoice-edit.component';
import { InvoiceComponent } from './invoice/list/invoice.component';
import { InvoiceDetailComponent } from './invoice/list/views/invoice-detail.component';

// 账户余额 account-blance
import { BlanceComponent } from './member-deposit/blance/blance.component';
import { RechargeComponent } from './member-deposit/recharge/recharge.component';
import { MemberComponent } from './member.component';
// 账户设置
import { AccountBindComponent } from './personal/account-bind/account-bind.component';
import { AddressListComponent } from './personal/address/list/address-list.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    data: {
      name: '个人中心首页'
    }
  },
  {
    path: '',
    component: MemberComponent,
    children: [
      {
        path: 'order',
        loadChildren: () => import('@routes/member/business/order/order.module').then(m => m.OrderModule),
        // component: OrderComponent,
        data: {
          name: '个人中心-我的订单'
        }
      },
      {
        path: 'my-favorites',
        loadChildren: () => import('@routes/member/business/wishlist/wishlist.module').then(m => m.WishlistModule),
        // component: OrderComponent,
        data: {
          name: '个人中心-我的愿望'
        }
      },
      {
        path: 'coupon-code',
        // loadChildren: () => import('@routes/member/personal/password/password.module').then(m => m.PasswordModule),
        component: CouponCodeComponent,
        data: {
          name: '个人中心-我的优惠券'
        }
      },
      {
        path: 'coupon-bind',
        loadChildren: () => import('@routes/member/business/coupon-bind/coupon-bind.module').then(m => m.CouponBindModule),
        // component: CouponBindComponent,
        data: {
          name: '个人中心-绑定优惠券'
        }
      },
      {
        path: 'coupon-exchange',
        component: CouponExchangeComponent,
        data: {
          name: '个人中心-兑换优惠券'
        }
      },
      {
        path: 'point',
        component: PointComponent,
        data: {
          name: '个人中心-我的积分'
        }
      },
      {
        path: 'aftersales',
        loadChildren: () => import('@routes/member/business/aftersales/aftersales.module').then(m => m.AftersalesModule),
        data: {
          name: '个人中心-我的售后'
        }
      },
      // {
      //   path: 'history',
      //   component: HistoryComponent,
      //   data: {
      //     name: '个人中心-我的足迹'
      //   }
      // },
      {
        path: 'member-deposit/recharge',
        loadChildren: () => import('@routes/member/member-deposit/recharge/recharge.module').then(m => m.RechargeModule),
        // component: RechargeComponent,
        data: {
          name: '个人中心-账户充值'
        }
      },
      {
        path: 'member-deposit/log',
        component: BlanceComponent,
        data: {
          name: '个人中心-余额明细'
        }
      },
      {
        path: 'profile/edit',
        loadChildren: () => import('@routes/member/personal/profile/profile.module').then(m => m.ProfileModule),
        data: {
          name: '账户设置-个人资料'
        }
      },
      {
        path: 'password/edit',
        loadChildren: () => import('@routes/member/personal/password/password.module').then(m => m.PasswordModule),
        data: {
          name: '账户设置-修改密码'
        }
      },
      {
        path: 'address/list',
        component: AddressListComponent,
        data: {
          name: '账户设置-收货地址列表'
        }
      },
      {
        path: 'address',
        loadChildren: () => import('@routes/member/personal/address/detail/address-detail.module').then(m => m.AddressDetailModule),
        data: {
          name: '账户设置-收货地址新增'
        }
      },
      {
        path: 'account-bind/list',
        component: AccountBindComponent,
        data: {
          name: '账户设置-账号绑定'
        }
      },
      {
        path: 'invoice/list',
        component: InvoiceComponent,
        data: {
          name: '我的发票-发票列表'
        }
      },
      {
        path: 'invoice/views',
        component: InvoiceDetailComponent,
        data: {
          name: '我的发票-详情1'
        }
      },
      {
        path: 'invoice/add',
        loadChildren: () => import('@routes/member/invoice/list/add/invoice-add.module').then(m => m.InvoiceAddModule),
        data: {
          name: '我的发票-编辑'
        }
      },
      {
        path: 'invoice/edit',
        loadChildren: () => import('@routes/member/invoice/list/edit/invoice-edit.module').then(m => m.InvoiceEditModule),
        data: {
          name: '我的发票-编辑'
        }
      },
      {
        path: 'increase/list',
        loadChildren: () => import('@routes/member/invoice/increase/increase-list.module').then(m => m.IncreaseListModule),
        data: {
          name: '我的发票-增票资质'
        }
      },
      {
        path: 'header-manage/list',
        loadChildren: () => import('@routes/member/invoice/header/header-manage.module').then(m => m.HeaderManageModule),
        data: {
          name: '我的发票-抬头管理'
        }
      },
      {
        path: 'header-manage',
        loadChildren: () => import('@routes/member/invoice/header/detail/header-detail.module').then(m => m.HeaderDetailModule),
        data: {
          name: '我的发票-抬头管理-新增/详情'
        }
      },
      {
        path: 'review',
        loadChildren: () => import('@routes/member/business/review/review.module').then(m => m.ReviewModule),
        data: {
          name: '个人中心-商品评论'
        }
      },
      {
        path: 'modify-payment-password',
        loadChildren: () => import('@routes/member/modify/modify.module').then(m => m.ModifyModule),
        data: {
          name: '修改支付密码'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
