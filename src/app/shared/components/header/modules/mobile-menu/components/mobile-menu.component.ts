import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { LanguageModalComponent } from '@routes/dashboard/modules/language-modal/components/language-modal/language-modal.component';
import { DropdownItem } from '@shared/components/app-select/models/app-select.model';
import { HeaderService } from '@shared/components/header/services/header.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { ThemeService } from '@shared/services/theme-service/theme.service';
import { EMPTY } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent extends DestroySubscription implements OnInit {
  isConsole: boolean = false;
  themeCheck: boolean;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly localStorageService: LocalStorageService,
    private readonly userService: SystemUserService,
    private readonly overlayService: OverlayService,
    public readonly headerService: HeaderService,
    private readonly user: SystemUserService,
    public readonly themeService: ThemeService
  ) {
    super();
    this.isConsole = this.modalData.isConsole;
  }

  ngOnInit(): void {
    this.themeService.defaultTheme();
    this.themeService.themeCheck$.pipe(takeUntil(this.destroyStream$)).subscribe((val: any) => {
      this.themeCheck = val;
    });
    this.headerService.closeMenuTrigger$.pipe(takeUntil(this.destroyStream$)).subscribe((val: any) => {
      if (val) {
        this.closeMenu();
      }
    });
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get levelConfig() {
    return this.user.levelConfig;
  }

  get cashback() {
    return this.user.cashBackData;
  }

  closeMenu(): void {
    this.close();
  }

  toggleTheme(e: Event): void {
    this.themeService.toggleTheme(e);
  }

  openLanguageModal() {
    const ref = this.overlayService.open(
      LanguageModalComponent,
      {},
      {
        panelClass: ['modal', 'language-modal']
      }
    );

    return ref
      ? ref.afterClosed$
          .pipe(
            takeUntil(this.destroyStream$),
            map(event => event.data)
          )
          .subscribe(data => {
            this.setLanguage(data.lang);
            this.headerService.activeItem = new DropdownItem(data.id, data.icon, data.currency, data.lang, data.text);
          })
      : EMPTY;
  }

  setLanguage(lang: string) {
    this.headerService.setLanguage(lang);
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
