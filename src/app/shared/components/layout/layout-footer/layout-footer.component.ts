import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { ThemeService } from '@shared/services/theme-service/theme.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutFooterComponent extends DestroySubscription implements OnInit, AfterViewInit {
  themeCheck: boolean;
  lang: string;
  constructor(private readonly themeService: ThemeService, private readonly localStorage: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    this.themeService.themeCheck$.pipe(takeUntil(this.destroyStream$)).subscribe(val => {
      this.themeCheck = val;
    });

    this.getPromiseList();
  }

  ngAfterViewInit(): void {
    const currentLang = localStorage.getItem('current-lang');
    if (currentLang === 'cn-TR' || currentLang === 'zh-CN') {
      this.lang = 'zh-hans';
    } else {
      this.lang = 'en';
    }
  }

  promiseList: any[] = [];

  contactList: any[] = [
    {
      icon: 'phone',
      content: 'footer-phone'
    },
    {
      icon: 'mail',
      content: 'footer-email'
    },
    {
      icon: 'environment',
      content: 'footer-address'
    }
  ];

  articleList = [
    {
      title: 'footer-title-shop',
      links: [
        {
          link: '/product/search',
          text: 'footer-start-shopping',
          external: false,
          target: ''
        },
        {
          link: '/cart',
          text: 'footer-cart',
          external: false,
          target: ''
        },
        {
          link: '/cart',
          text: 'footer-checkout',
          external: false,
          target: ''
        }
      ]
    },
    {
      title: 'footer-title-account',
      links: [
        {
          link: '/login',
          text: 'footer-login',
          external: false,
          target: ''
        },
        {
          link: '/register',
          text: 'footer-sign-up',
          external: null,
          target: ''
        },
        {
          link: '/member/order/list',
          text: 'footer-account',
          external: false,
          target: ''
        }
      ]
    },
    {
      title: 'footer-title-help',
      links: [
        {
          link: 'https://about.tyqoon.co/faq/',
          text: 'footer-help',
          external: true,
          target: '_blank'
        },
        {
          link: 'https://about.tyqoon.co/cancellation-policy/',
          text: 'footer-return-policy',
          external: true,
          target: '_blank'
        },
        {
          link: '/member/order/list',
          text: 'footer-return',
          external: false,
          target: ''
        }
      ]
    }
    // {
    //   title: '商家服务',
    //   links: [
    //     {
    //       link: '/',
    //       text: '商家入驻'
    //     },
    //     {
    //       link: '/',
    //       text: '商家帮助'
    //     },
    //     {
    //       link: '/',
    //       text: '运营服务'
    //     }
    //   ]
    // }
  ];

  bottomNav = [
    {
      link: `https://about.tyqoon.co`,
      text: 'footer-about',
      external: true
    },
    {
      link: `https://about.tyqoon.co/privacy-policy`,
      text: 'footer-privacy',
      external: true
    },
    {
      link: `https://about.tyqoon.co/terms-conditions`,
      text: 'footer-terms',
      external: true
    }
  ];

  getPromiseList() {
    this.promiseList = [
      {
        icon: 'tgicon-anquanbaozhang',
        name: '品质保障',
        desc: '品质护航 购物无忧'
      },
      {
        icon: 'tgicon-wuliu',
        name: '极速物流',
        desc: '多仓直发 极速配送'
      },
      {
        icon: 'tgicon-kefu',
        name: '售后无忧',
        desc: '退换无忧 维修无忧'
      },
      {
        icon: 'tgicon-liwuhuodong',
        name: '天天低价',
        desc: '天天低价 帮您省钱'
      },
      {
        icon: 'tgicon--fuwu',
        name: '专注服务',
        desc: '轻松购物 畅选无忧'
      }
    ];
  }
}
