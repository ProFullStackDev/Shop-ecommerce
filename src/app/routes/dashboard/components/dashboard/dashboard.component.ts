import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { SystemUserService } from '@core/system/system-user.service';
import { GameBoardActions, Modals } from '@routes/dashboard/models/game-board';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';
import { MessagesComponent } from '@routes/dashboard/modules/messages/components/messages/messages.component';
import { MissionsComponent } from '@routes/dashboard/modules/missions/components/missions/missions.component';
import { MyProfileModalComponent } from '@routes/dashboard/modules/my-profile-modal/components/my-profile-modal/my-profile-modal.component';
import { NftDetailsComponent } from '@routes/dashboard/modules/nft-details/components/nft-details/nft-details.component';
import { NftShopComponent } from '@routes/dashboard/modules/nft-shop/components/nft-shop/nft-shop.component';
import { TokensComponent } from '@routes/dashboard/modules/tokens/components/tokens/tokens.component';
import { TyqoonDollarsComponent } from '@routes/dashboard/modules/tyqoon-dollars/components/tyqoon-dollars/tyqoon-dollars.component';
import { svgAnimation } from '@shared/helpers/confetti-animation';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { BuildingType } from '@shared/models/nft-shop-modal.model';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { BuildShopsService } from '@shared/services/build-shops/build-shops.service';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { CONFETTI_SVG } from '@shared/statics/confetti/confetti.static';
import { GAME_BOARD_ACTIONS } from '@shared/statics/game-board/game-board.static';
import { Observable, EMPTY } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent extends DestroySubscription implements OnInit, OnDestroy {
  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;
  @ViewChildren('blankRows') blankRows: any;
  @ViewChild('people') people: ElementRef;

  readonly gameBoardActions: GameBoardActions[] = GAME_BOARD_ACTIONS;
  readonly PEOPLE_MOVING_INTERVAL = 500;
  readonly WHITE_PERSON = `<img src="/assets/images/game-board/person-white.svg" alt="Person">`;
  readonly DARK_PERSON = `<img src="/assets/images/game-board/person-dark.svg" alt="Person">`;
  readonly ORANGE_PERSON = `<img src="/assets/images/game-board/person-orange.svg" alt="Person">`;
  modalInviteFriends = Modals.InviteFriends;
  modalTokens = Modals.Tokens;
  modalNftDetails = Modals.NftDetails;
  modalNftShop = Modals.NftShop;
  modalMessages = Modals.Messages;
  modalTyqoonDollars = Modals.TyqoonDollars;
  buildings: string[] = [];
  confetti = CONFETTI_SVG;
  public defaultAvatar = '/assets/images/avatar.jpg';
  public initBuilding = this.user.initBuild;
  persons: any[] = [];
  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly overlayService: OverlayService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly buildShopsService: BuildShopsService,
    private readonly user: SystemUserService,
    private el: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.user.updateUserInfo();
    this.generatePeople();
    this.document.querySelector('app-root')?.classList.add('gameboard');
    this.buildShopsService.buildShop.pipe(takeUntil(this.destroyStream$)).subscribe(val => {
      if (val?.length) {
        this.buildShop(val);
      }
    });
  }

  override ngOnDestroy(): void {
    this.document.querySelector('app-root')?.classList.remove('gameboard');
  }

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }

  // public getSon(val: any) {
  //   console.log('valivalvalvalvav', val);
  // }

  get sumPerformance() {
    return parseInt(String(this.userInfo.amount));
  }

  get point() {
    return parseInt(String(this.userInfo.point));
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get myBuild() {
    return this.user.initBuild;
  }

  get cashback() {
    return this.user.cashBackData;
  }

  get levelConfig() {
    return this.user.levelConfig;
  }

  get unreadNumber() {
    return this.user.unreadNum;
  }

  get initNumber() {
    return this.user.initNum;
  }

  get showPrime() {
    return this.user.showPrime;
  }

  // TODO: Create method for open different components or
  //  create global modal component & transfer different data
  openModal(type: Modals | any): Observable<boolean> | null {
    let component;
    let className;
    switch (type) {
      case Modals.Build:
        component = null;
        break;
      case Modals.Missions:
        component = MissionsComponent;
        className = 'missions-modal__wrap';
        break;
      case Modals.MyProfile:
        component = MyProfileModalComponent;
        break;
      case Modals.Tokens:
        component = TokensComponent;
        break;
      case Modals.TyqoonDollars:
        component = TyqoonDollarsComponent;
        break;
      case Modals.InviteFriends:
        component = InviteFriendsComponent;
        break;
      case Modals.NftShop:
        component = NftShopComponent;
        break;
      case Modals.Messages:
        component = MessagesComponent;
        break;
      default:
        return null;
    }

    if (!component) {
      return null;
    }

    const ref = this.overlayService.open(
      component,
      {},
      {
        panelClass: ['modal', `${className ? className : null}`]
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  public openNftShopModal(): void {
    this.openModal(this.modalNftShop);
  }

  openNftDetailsModal(type: any): Observable<boolean> | null {
    const ref = this.overlayService.open(
      NftDetailsComponent,
      { modalType: type },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  private static getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }

  private static fixPosition(pos: number, fix: number): number {
    const max = 100 - fix;
    if (max < pos) {
      return pos - fix;
    } else if (pos < fix) {
      return fix + pos;
    }

    return pos;
  }

  private static getTopPosition(top: number): string {
    return `${DashboardComponent.fixPosition(top, 15)}%`;
  }

  private static getLeftPosition(left: number): string {
    return `${DashboardComponent.fixPosition(left, 20)}%`;
  }

  private generatePeople(): void {
    this.persons = [];
    const people = this.userInfo.recommendPeople;
    for (let i = 1; i <= people; i++) {
      const randomTop = DashboardComponent.getRandomNumber();
      const randomLeft = DashboardComponent.getRandomNumber();

      const top = DashboardComponent.getTopPosition(randomTop);
      const left = DashboardComponent.getLeftPosition(randomLeft);

      const person = {
        top,
        topPosition: randomTop,
        leftPosition: randomLeft,
        left,
        image: this.WHITE_PERSON
      };

      if (i > 5 && i <= 13) {
        person.image = this.ORANGE_PERSON;
      }

      if (i > 13 && i <= people) {
        person.image = this.DARK_PERSON;
      }

      this.persons.push(person);
    }

    setInterval(() => this.movePeople(), this.PEOPLE_MOVING_INTERVAL);
  }

  private movePeople(): void {
    this.persons = this.persons.map((person, index) => {
      // change randomly top position
      const isTopPlus = DashboardComponent.getRandomNumber() >= 51;
      if (isTopPlus) {
        person.topPosition++;
      } else {
        person.topPosition--;
      }

      const personPosition = document.getElementById(`person.${index}`)?.getBoundingClientRect();
      const peopleBoxPosition = document.getElementById('people')?.getBoundingClientRect();
      if (personPosition && peopleBoxPosition) {
        if (personPosition?.top <= peopleBoxPosition?.top) person.top = 25;
        if (personPosition?.left <= peopleBoxPosition?.left) person.left = 25;
        if (personPosition?.right >= peopleBoxPosition?.right) person.left = 25;
        if (personPosition?.bottom >= peopleBoxPosition?.bottom) person.top = 25;
      }

      person.top = DashboardComponent.getTopPosition(person.topPosition);

      // console.log(person.top);

      // change randomly left position
      const isLeftPlus = DashboardComponent.getRandomNumber() >= 49;
      if (isLeftPlus) {
        person.leftPosition++;
      } else {
        person.leftPosition--;
      }
      person.left = DashboardComponent.getLeftPosition(person.leftPosition);

      return person;
    });

    this.cdr.detectChanges();
  }

  private buildShop(data: string[]): void {
    this.confetti = CONFETTI_SVG;
    setTimeout(() => {
      svgAnimation();
      this.confetti = ``;
    }, 3000);

    this.buildings = data;
    // this.blankRows.nativeElement.scrollIntoView({ behavior: 'smooth' });
    // this.cdr.detectChanges();
    setTimeout(() => {
      // console.log(this.initNumber, '显示buildings数据200+x*150');
      // @ts-ignore
      const defaultHeight = this.document.querySelector('.part-wrap').firstChild.height;
      // @ts-ignore
      const number = this.initNumber * defaultHeight;
      this.scrollWrapper.nativeElement.scrollTo({ top: number, behavior: 'smooth' });
    }, 500);
  }
}
