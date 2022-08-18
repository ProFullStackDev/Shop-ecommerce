import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { UserNftPOM, NftPOM, NftService } from '@core/services/game/nft.service';
import { CashBackData, rewardService } from '@core/services/game/reward.service';
import { StationLetterPOM, StationLetterService } from '@core/services/game/stationLetter.service';
import { UserLevelPOM, UserLevelService } from '@core/services/game/userLevel.service';
import { BasicService, UsersPOM } from '@core/services/user/basic.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { BuildingType } from '@shared/models/nft-shop-modal.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: [BasicService, NftService, UserLevelService, rewardService]
})
export class SystemUserService {
  public nftShopList: NftPOM[] = [];
  public userNftList: UserNftPOM[] = [];
  public buildingType = BuildingType;
  public defaultAvatar = '/assets/images/sign-up-user.svg';
  get userData() {
    return this._userInfo;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private modal: NzModalService,
    private reward: rewardService,
    private injector: Injector,
    private basicSrv: BasicService,
    private readonly letter: StationLetterService,
    private nftSrv: NftService,
    private userLevelSrv: UserLevelService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {
    this._getUserInfo();
    if (this.isLogin()) {
      this.getNtfInfo();
    }
  }

  loading = {
    getUserInfo: false
  };

  private _level = {
    needPeople: 10
  };
  private cashBack: CashBackData;
  private _rewardPeople: number = 0;
  private unread: number = 0;
  public _userInfo!: UsersPOM;
  private _nftInfo!: UserNftPOM[];
  private initBuilding: any[];
  private scrollTo: number | undefined;

  private _getUserInfo() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem(LocalStorageEnum.USERINFO)) {
      this._userInfo = JSON.parse(localStorage.getItem(LocalStorageEnum.USERINFO) || '{}');
      this.updateUserInfo();
    }
  }

  private _setUserInfo(userInfo: UsersPOM) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LocalStorageEnum.USERINFO, JSON.stringify(userInfo));
    }
  }

  private _removeUserInfo() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(LocalStorageEnum.USERINFO);
    }
    this._userInfo = JSON.parse('{}');
  }

  setUserInfo(userInfo: UsersPOM): void {
    this._userInfo = userInfo;
    if (!this._userInfo.avatar) {
      this._userInfo.avatar = this.defaultAvatar;
    }
    this._setUserInfo(userInfo);
  }

  setNFTInfo(NFTInfo: UserNftPOM[]): void {
    this._nftInfo = NFTInfo;
  }

  isLogin(): boolean {
    return this._userInfo && Object.keys(this._userInfo).length > 0;
  }

  get userInfo() {
    return this._userInfo;
  }

  get initNum() {
    return this.scrollTo;
  }

  setScrollTo(val: number) {
    this.scrollTo = val;
  }

  get unreadNum() {
    return this.unread;
  }

  get levelConfig() {
    return this._level;
  }

  get rewardPeople() {
    return this._rewardPeople;
  }

  get cashBackData() {
    return this.cashBack;
  }

  get getNFT() {
    return this.nftShopList;
  }

  get initBuild() {
    return this.initBuilding;
  }

  get hasEmail() {
    return !!this.userInfo.email;
  }

  get hasPhone() {
    return !!this.userInfo.mobile;
  }

  get inviteProgress() {
    let barNumber = parseInt(String((this.userInfo.recommendPeople / 10) * 100));
    return `${barNumber}%`;
  }

  get showPrime() {
    if (!this.isLogin()) return false;
    const nowTime = new Date().getTime();
    const vipExprTime = new Date(this.userInfo.vipExprTime).getTime();
    return nowTime <= vipExprTime;
  }

  public getNFTList(showAnimate?: number) {
    forkJoin([this.nftSrv.queryUser(), this.nftSrv.queryConfig()])
      .subscribe(
        ([userNftList, res]) => {
          // console.log('getNFTList', userNftList, res);
          const arr = res;
          const buildingArr = [];
          this.userNftList = userNftList;
          const userList = this.userNftList;
          arr.forEach((item, index) => {
            item.numleft = 0;
            item.numright = 0;
            item.unshow = true;
            if (item.icon) {
              item.icon = JSON.parse(item.icon);
            }
            if (item.level === 0) {
              item.type = 'shop';
            }
            if (item.level === 1) {
              item.type = 'franchise';
            }
            if (item.level === 2) {
              item.type = 'superMarket';
            }
            if (item.level === 3) {
              item.type = 'mall';
            }
            if (userList[index]) {
              arr[index].numright = userList[index].num;
            }
            if (index >= 1 && userList[Number(index) - 1]) {
              arr[index].numleft = userList[Number(index) - 1].num;
            }
          });
          for (let item of arr) {
            for (let i = 0; i < item.numright; i++) {
              buildingArr.push({ ...item });
            }
          }
          if (showAnimate !== null && !Object.is(showAnimate, undefined)) {
            // @ts-ignore
            buildingArr[showAnimate].unshow = false;
          }
          this.initBuilding = buildingArr;
          this.scrollTo = showAnimate;
          // console.log(buildingArr[0], '处理完的数据', buildingArr);
          this.nftShopList = arr;
        },
        error => {
          console.error(error);
        }
      )
      .add();
  }

  public getStationLetter() {
    this.letter
      .queryLetter()
      .subscribe(
        res => {
          this.unread = res.filter(item => !item.isRead).length;
          // console.log('this.unread', this.unread);
        },
        error => {
          console.error(error);
        }
      )
      .add();
  }

  getNtfInfo() {
    this.getBasicNft();
    this.getStationLetter();
    this.getNFTList();
    this.getUserReward();
  }

  getUserReward() {
    this.reward
      .generate()
      .subscribe(
        res => {
          this.cashBack = res;
          // console.log(typeof res, '我是查询个人信息', res);
        },
        error => {
          console.error(error);
        }
      )
      .add();
  }

  getBasicNft() {
    this.userLevelSrv
      .queryLevel()
      .subscribe(
        res => {
          const userLever = this.userInfo.userLevel;
          const leveldata: any = res.find(item => item.level == userLever + 1);
          // const nowRewardPeople: any = res.find(item => item.level == userLever);
          this._rewardPeople = leveldata.rewardMaxPeople - this.userInfo.recommendPeople;
          this._level.needPeople = leveldata.needPeople;
          // console.log(this._rewardPeople, '我是查询NFT', res);
        },
        error => {
          console.error(error);
        }
      )
      .add();
  }

  updateUserInfo() {
    if (!this.isLogin()) return;
    this.loading.getUserInfo = true;
    this.basicSrv
      .getUserInfo()
      .subscribe(
        res => {
          this.setUserInfo(res);
        },
        error => {
          console.error(error);
        }
      )
      .add(() => (this.loading.getUserInfo = false));
  }

  showConfirmLoginModal() {
    this.modal.create({
      // please log in
      nzTitle: '请先登录',
      // goto log in？
      nzContent: '是否前往登录？',
      nzCentered: true,
      nzOnOk: () => {
        this.router.navigateByUrl('/login');
      }
    });
  }

  showBindEmailAndPhoneModal() {
    this.modal.create({
      // mobile、email binding
      nzTitle: '手机号、邮箱绑定',
      // please binding mobile and email
      nzContent: `请先绑定${this.hasPhone ? '' : '手机号'}${!this.hasPhone && !this.hasEmail ? '和' : ''}${this.hasEmail ? '' : '邮箱'}`,
      nzClosable: false,
      nzMaskClosable: false,
      nzOnOk: () => {
        this.router.navigateByUrl(`/member/profile/edit`);
      }
    });
  }

  isBindEmailAndPhone() {
    return this.hasEmail && this.hasPhone;
  }

  login(res: UsersPOM) {
    this.setUserInfo(res);
    const url = this.tokenService.referrer?.url || '/';
    this.router.navigateByUrl(Object.is(url, '/login') ? '/' : url);
    this.getNtfInfo();
  }

  logout() {
    this._removeUserInfo();
    this.tokenService.clear();
    this.router.navigateByUrl('/login');
  }

  showInsufficientBalanceModal() {
    const modal = this.modal.confirm({
      nzTitle: '余额不足', // InsufficientBalance
      nzContent: '请先充值余额或选择在线支付', // Please recharge the balance first or choose online payment
      nzOkText: '在线支付', // Online Payment
      nzCancelText: '余额充值', // recharge the balance
      nzClosable: false,
      nzOnOk: () => {
        modal.destroy();
      },
      nzOnCancel: () => {
        this.router.navigateByUrl('/member/member-deposit/recharge');
      }
    });
  }
}
