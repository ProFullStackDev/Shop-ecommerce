import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { DashboardLayoutComponent } from '@layout/dashboard-layout/components/dashboard-layout/dashboard-layout.component';
import { DashboardLayoutModule } from '@layout/dashboard-layout/dashboard-layout.module';
import { HomeLayoutComponent } from '@layout/home-layout/home-layout/home-layout.component';
import { HomeLayoutModule } from '@layout/home-layout/home-layout/home-layout.module';
import { MemberLayoutComponent } from '@layout/member-layout/member-layout/member-layout.component';
import { MemberLayoutModule } from '@layout/member-layout/member-layout/member-layout.module';
import { ErrorComponent } from '@routes/error/error.component';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@routes/home/home.module').then(mod => mod.HomeModule)
      },
      { path: 'theme', loadChildren: () => import('@routes/theme/theme.module').then(m => m.ThemeModule) },
      { path: 'login', canActivate: [AuthGuard], loadChildren: () => import('@routes/login/login.module').then(m => m.LoginModule) },
      {
        path: 'register',
        canActivate: [AuthGuard],
        loadChildren: () => import('@routes/register/register.module').then(m => m.RegisterModule)
      },
      { path: 'product', loadChildren: () => import('@routes/shop-product/shop-product.module').then(m => m.ShopProductModule) },
      {
        path: 'cart',
        canActivate: [SimpleGuard],
        loadChildren: () => import('@routes/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
      },
      { path: 'order', loadChildren: () => import('@routes/shop-order/shop-order.module').then(m => m.ShopOrderModule) },
      { path: 'pay', loadChildren: () => import('@routes/pay/pay.module').then(m => m.PayModule) },
      { path: 'article', loadChildren: () => import('@routes/shop-article/shop-article.module').then(m => m.ShopArticleModule) },
      {
        path: 'forgotPassword',
        loadChildren: () => import('@routes/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      { path: 'invite', loadChildren: () => import('@routes/invite/invite.module').then(m => m.InviteModule) }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'gameboard',
        canActivate: [SimpleGuard],
        loadChildren: () => import('@routes/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'dashboard',
        canActivate: [SimpleGuard],
        loadChildren: () => import('@routes/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
      }
    ]
  },
  {
    path: '',
    component: MemberLayoutComponent,
    canActivate: [SimpleGuard],
    children: [
      {
        path: 'member',
        loadChildren: () => import('@routes/member/member.module').then(mod => mod.MemberModule)
      }
    ]
  },
  {
    path: '**',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: ErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    HomeLayoutModule,
    DashboardLayoutModule,
    MemberLayoutModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
