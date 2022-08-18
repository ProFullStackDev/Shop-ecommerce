import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnDestroy, OnInit, TemplateRef, Type} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {CustomOverlayRef} from '../../classes/custom-overlay-ref';
import {MODAL_ADDITIONAL_CONFIG} from '../../classes/modal-data';
import {CustomOverlayConfig} from '../../interfaces/custom-overlay-config';
import {modalDrawerAnimations} from '../../animations/modal-drawer-animation';
import {BlockScrollStrategy} from '@angular/cdk/overlay';
import {OverlayRefStorageService} from '../../services/overlay-ref-storage.service';
import {DestroySubscription} from "../../../../helpers/destroy-subscription";
import {addPointerEvents, addScroll, removePointerEvents, removeScroll} from "../../../../helpers/scroll-top";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [modalDrawerAnimations.transformDrawer],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OverlayComponent extends DestroySubscription implements OnInit, OnDestroy {

  public contentType: 'component' | undefined;
  // @ts-ignore
  public content;
  // @ts-ignore
  public context;
  public showCloseBtn = true;

  @HostBinding('@transform')
  animationState: 'open-instant' | 'open' | 'void' = 'void';

  constructor(
    private readonly ref: CustomOverlayRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Inject(MODAL_ADDITIONAL_CONFIG) private readonly customOverlayConfig: CustomOverlayConfig,
    private readonly overlayRefStorage: OverlayRefStorageService,
  ) {
    super();
  }

  ngOnInit() {

    this.content = this.ref.content;
    this.detectContentType();

    document?.body.classList.add('open');

    const config = this.ref.overlay.getConfig();
    if (config.scrollStrategy instanceof BlockScrollStrategy) {
      removeScroll();
    }
    if (config.disposeOnNavigation) {
      this.disposeOnNavigation();
    }

    const {overlayPointerEvents, animation} = this.customOverlayConfig;
    if (overlayPointerEvents) {
      addPointerEvents();
    }
    this.animationState = animation ? 'open' : 'open-instant';
  }
// @ts-ignore
  ngOnDestroy(): void {
    super.ngOnDestroy();

    document?.body.classList.remove('open');

    this.ref.removeLastModalRef();
    const hasOpenedModalWithGlobalPosition = this.overlayRefStorage.hasOpenedModalWithGlobalPosition();
    if (hasOpenedModalWithGlobalPosition) {
      return;
    }
    addScroll();
    const customConfig = this.customOverlayConfig;
    if (customConfig && customConfig.overlayPointerEvents) {
      removePointerEvents();
    }
  }

  public close() {
    this.ref.close(this.ref.backdropClickData);
  }

  private detectContentType(): void {
    this.contentType = 'component';
    const customConfig = this.customOverlayConfig;
    if (customConfig && customConfig.disableCloseBtn) {
      this.showCloseBtn = false;
    }
  }

  private disposeOnNavigation(): void {
    const currentUrl = this.router.url;
    this.router.events.pipe(
      filter((e) => e instanceof RoutesRecognized),
      takeUntil(this.destroyStream$),
      // @ts-ignore
    ).subscribe((e: RoutesRecognized) => {
      if (e.urlAfterRedirects !== currentUrl) {
        this.close();
      }
    });
  }
}
