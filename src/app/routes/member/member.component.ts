import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { ProductCategoryAttributes } from '@core/models/ProductCategory';

@Component({
  selector: 'app-home',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.less']
})
export class MemberComponent {
  silderValue: boolean = false;
  array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  @HostListener('window:scroll', [])
  onWindowScroll() {
    //we'll do some stuff here when the window is scrolled
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
      t = document.documentElement.scrollTop;
      l = document.documentElement.scrollLeft;
      w = document.documentElement.scrollWidth;
      h = document.documentElement.scrollHeight;
      if (t > 400) {
        this.silderValue = true;
      } else {
        this.silderValue = false;
      }
    }
  }

  constructor() {}
  appendNumber = 4;
  prependNumber = 1;

  category: Array<Partial<ProductCategoryAttributes>> = [
    {
      name: '123',
      icon: '5645'
    }
  ];
  mouseenterValue: boolean = true;
  mouseenterFn() {
    this.mouseenterValue = false;
  }

  mouseleaveFn() {
    this.mouseenterValue = true;
  }

  limtTimeList = [
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '2022-03-30'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '2022-03-30'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '2022-03-30'
    }
  ];
  bannerList = [
    {
      img: 'https://image.demo.b2b2c.shopxx.net/9.0/dfbd14d3-252c-4add-91e7-5bbc396aea20.jpg',
      link: ''
    },
    {
      img: 'https://image.demo.b2b2c.shopxx.net/9.0/dfbd14d3-252c-4add-91e7-5bbc396aea20.jpg',
      link: ''
    },
    {
      img: 'https://image.demo.b2b2c.shopxx.net/9.0/dfbd14d3-252c-4add-91e7-5bbc396aea20.jpg',
      link: ''
    }
  ];
  goodLIst = [
    {
      title: '手机数码',
      name1: '手机通讯',
      name2: '手机配件',
      name3: '摄影摄像',
      name4: '数码配件',
      icon: 'tgicon-anquanbaozhang'
    },
    {
      title: '手机数码',
      name1: '手机通讯',
      name2: '手机配件',
      name3: '摄影摄像',
      name4: '数码配件',
      icon: ''
    },
    {
      title: '手机数码',
      name1: '手机通讯',
      name2: '手机配件',
      name3: '摄影摄像',
      name4: '数码配件',
      icon: ''
    },
    {
      title: '手机数码',
      name1: '手机通讯',
      name2: '手机配件',
      name3: '摄影摄像',
      name4: '数码配件',
      icon: ''
    },
    {
      title: '手机数码',
      name1: '手机通讯',
      name2: '手机配件',
      name3: '摄影摄像',
      name4: '数码配件',
      icon: ''
    },
    {
      title: '手机数码',
      name1: '手机通讯',
      name2: '手机配件',
      name3: '摄影摄像',
      name4: '数码配件',
      icon: ''
    }
  ];
  bannerListIcon = [
    {
      icon: 'icon1',
      words: '会员'
    },
    {
      icon: 'icon1',
      words: '积分'
    },
    {
      icon: 'icon1',
      words: '订单'
    },
    {
      icon: 'icon1',
      words: '收藏'
    },
    {
      icon: 'icon1',
      words: '充值'
    },
    {
      icon: 'icon1',
      words: '帮助'
    }
  ];
  bannerDetailList = [
    {
      title: '农村电商加速布局助力乡村振兴'
    },
    {
      title: '农村电商加速布局助力乡村振兴'
    },
    {
      title: '农村电商加速布局助力乡村振兴'
    },
    {
      title: '农村电商加速布局助力乡村振兴'
    }
  ];
  bannerListImg = [
    {
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/2172d303-e974-40ab-9da6-8ca192fec3fb.jpg'
    },
    {
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/2172d303-e974-40ab-9da6-8ca192fec3fb.jpg'
    },
    {
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/2172d303-e974-40ab-9da6-8ca192fec3fb.jpg'
    },
    {
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/2172d303-e974-40ab-9da6-8ca192fec3fb.jpg'
    }
  ];
  limtTimeUrl = `https://image.demo.b2b2c.shopxx.net/9.0/758a27cd-c951-4060-a821-ee0a0cc17ff3.jpg`;
  goodLogo = `https://image.demo.b2b2c.shopxx.net/9.0/9956e86d-a5ca-40fb-ac46-c67a93bab2c9.jpg`;
  pingdaoList = [
    {
      index: 1,
      title: '手机数码',
      desc: '正品行货',
      url1: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg',
      url2: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg'
    },
    {
      index: 1,
      title: '手机数码',
      desc: '正品行货',
      url1: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg',
      url2: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg'
    },
    {
      index: 1,
      title: '手机数码',
      desc: '正品行货',
      url1: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg',
      url2: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg'
    }
    // {
    //   index: 1,
    //   title: '手机数码',
    //   desc: '正品行货',
    //   url1: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg',
    //   url2: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg'
    // },
    // {
    //   index: 1,
    //   title: '手机数码',
    //   desc: '正品行货',
    //   url1: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg',
    //   url2: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg'
    // },
    // {
    //   index: 1,
    //   title: '手机数码',
    //   desc: '正品行货',
    //   url1: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg',
    //   url2: 'https://image.demo.b2b2c.shopxx.net/9.0/3f893cce-24e1-45f0-b8ce-f4681bbe7738_thumbnail.jpg'
    // },
  ];
  storeList = [
    {
      index: 1,
      bigUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/0d2c4c8d-4374-4b5b-97fe-a43334f742c3.jpg',
      iconUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/e5adcae6-0895-425e-8607-ecf15a97f0e2.png',
      title: '手机数码旗舰店',
      btnWords: '进店逛逛'
    },
    {
      index: 2,
      bigUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/aafaab6f-2143-4e02-8350-f88b6a60c141.jpg',
      iconUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/8ce3fee3-62cb-4319-ba40-acef865e7232.png',
      title: '办公家电旗舰店',
      btnWords: '进店逛逛'
    },
    {
      index: 3,
      bigUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/ae724424-be6c-4b60-abc2-e93bf326face.jpg',
      iconUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/8ce3fee3-62cb-4319-ba40-acef865e7232.png',
      title: '精品服饰旗舰店',
      btnWords: '进店逛逛'
    },
    {
      index: 4,
      bigUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/c9a444e9-ecdf-488b-9eb7-4ee1dac97be6.jpg',
      iconUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/8ce3fee3-62cb-4319-ba40-acef865e7232.png',
      title: '珠宝饰品旗舰店',
      btnWords: '进店逛逛'
    },
    {
      index: 5,
      bigUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/2b1ab56f-e7c1-4301-b21a-50c823ec0f52.jpg',
      iconUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/8ce3fee3-62cb-4319-ba40-acef865e7232.png',
      title: '美妆护肤旗舰店',
      btnWords: '进店逛逛'
    },
    {
      index: 5,
      bigUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/2b1ab56f-e7c1-4301-b21a-50c823ec0f52.jpg',
      iconUrl: 'https://image.demo.b2b2c.shopxx.net/9.0/8ce3fee3-62cb-4319-ba40-acef865e7232.png',
      title: '美妆护肤旗舰店',
      btnWords: '进店逛逛'
    }
  ];
  productCategoryList = [
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    },
    {
      index: 0,
      url: 'https://image.demo.b2b2c.shopxx.net/9.0/43d2c252-7ee4-4174-a439-1149213d1ea0_thumbnail.jpg',
      title5: 'VIVO X50 Pro 微云台超感光主摄 60倍变焦 90Hz轻薄曲面屏 双模5G全网通手机',
      title6: '微云台无损防抖，超感光夜摄，90Hz高刷曲面屏，开学欢乐购满1000元减100元',
      num: '20000',
      price: '1000.00'
    }
  ];
  goodImg = 'https://image.demo.b2b2c.shopxx.net/9.0/61938faa-bd83-4fd7-8095-d8648ebef664.jpg';
  linkImg = 'https://image.demo.b2b2c.shopxx.net/9.0/9a3b8c27-0d52-4f02-9d5e-4ff6b4a72216.jpg';
  linkCompanyList = [
    { index: 0, url: 'https://image.demo.b2b2c.shopxx.net/9.0/fc8a80af-7fe1-44d2-a81b-564900d0a166.png' },
    { index: 1, url: 'https://image.demo.b2b2c.shopxx.net/9.0/27ebf729-400e-424e-837d-00c23a0f7818.png' },
    { index: 2, url: 'https://image.demo.b2b2c.shopxx.net/9.0/0625d640-5136-4106-b33b-999c0d0f9f8e.png' },
    { index: 3, url: 'https://image.demo.b2b2c.shopxx.net/9.0/fc89ade2-5b21-4233-9b61-08e28e7c826a.png' },
    { index: 4, url: 'https://image.demo.b2b2c.shopxx.net/9.0/2a66066c-2d26-4a1b-afa5-df32bbf5becb.png' },
    { index: 5, url: 'https://image.demo.b2b2c.shopxx.net/9.0/f497b2a8-bffb-4ddd-93e6-b6f0e6d29e7c.png' },
    { index: 6, url: 'https://image.demo.b2b2c.shopxx.net/9.0/eb9cc7d6-b61b-4003-8eed-c151bf5e5e4c.png' },
    { index: 7, url: 'https://image.demo.b2b2c.shopxx.net/9.0/457772af-446c-489d-9232-58cdc79e3748.png' },
    { index: 8, url: 'https://image.demo.b2b2c.shopxx.net/9.0/b3031acc-8053-4d9d-adf3-c9d84ab0a416.png' },
    { index: 9, url: 'https://image.demo.b2b2c.shopxx.net/9.0/f1e27bcc-c80d-4dd7-8f65-6df3fcfd6096.png' }
  ];
  linkCompanyListtrackBy() {}
}
