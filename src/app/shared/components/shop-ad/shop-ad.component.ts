import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdPOM, AdPositionEnum, CommonService } from '@core/services/common.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { checkIsUrl } from '@shared/utils/utils';
import { takeUntil } from 'rxjs/operators';
import SwiperCore, { Pagination, Navigation, Autoplay, SwiperOptions } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-shop-ad',
  templateUrl: './shop-ad.component.html',
  styleUrls: ['./shop-ad.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ShopAdComponent extends DestroySubscription implements OnInit, AfterViewInit {
  constructor(private commonService: CommonService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getAd();
  }

  @Input() positionName!: AdPositionEnum;
  @Input() title: string = '';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() autoJump: boolean = true;
  @Input() autoplayDelay: number = 2000;
  @Output() readonly adLoaded = new EventEmitter<AdPOM[]>();
  @Output() readonly click = new EventEmitter<AdPOM>();

  config: SwiperOptions = {};

  ngAfterViewInit(): void {
    this.config = {
      pagination: true,
      loop: true,
      autoplay: {
        delay: this.autoplayDelay,
        disableOnInteraction: false
      },
      speed: 500
    };
  }

  adList: AdPOM[] = [];
  ad!: AdPOM;
  single: boolean = true;

  private getAd() {
    if (!this.positionName && !this.title) return;
    this.commonService
      .queryAd({ positionName: this.positionName, title: this.title })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.single = Object.is(res.length, 1);
        this.adLoaded.emit(res);
        if (Object.is(res.length, 1)) {
          this.ad = res[0];
          return;
        }
        this.adList = res || [];
      });
  }

  adClick(ad: AdPOM) {
    const url = ad.url;
    if (this.autoJump && url) {
      if (checkIsUrl(url)) {
        window.open(url);
        return;
      }
      this.router.navigateByUrl(url);
      return;
    }
    this.click.emit(ad);
  }
}
