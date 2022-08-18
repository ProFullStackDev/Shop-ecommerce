import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Inject, Injectable, Injector, NgZone, StaticProvider, TemplateRef, Type} from '@angular/core';
import {MODAL_ADDITIONAL_CONFIG, MODAL_DATA, TYQOON_MODAL_CONFIG} from '../../modal/classes/modal-data';
import {EMPTY, Observable} from 'rxjs';
import {CustomOverlayRef} from '../classes/custom-overlay-ref';
import {OverlayComponent} from '../components/overlay/overlay.component';
import {CustomOverlayConfig} from '../interfaces/custom-overlay-config';
import {TyqoonModalConfig} from '../interfaces/tyqoon-modal-config';
import {OverlayRefStorageService} from '../../modal/services/overlay-ref-storage.service';
import {OverlayCloseEvent} from '../interfaces/overlay-close-event';

@Injectable()
export class OverlayService {

  private lastOverlayRefs = new Set<string | TemplateRef<any> | Type<any>>();

  constructor(
    private readonly overlay: Overlay,
    private readonly injector: Injector,
    @Inject(TYQOON_MODAL_CONFIG) private readonly tyqoonConfig: TyqoonModalConfig,
    private readonly zone: NgZone,
    private readonly overlayRefStorageService: OverlayRefStorageService,
  ) {
  }

  open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>,
    data: T,
    config?: OverlayConfig,
    additionalConfig: CustomOverlayConfig = {},
  ): CustomOverlayRef<R> | null {

    const defaultConfig = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal-small', 'is-active'],
      backdropClass: 'modal-background',
      disposeOnNavigation: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    const configs = {...defaultConfig, ...config};
    if (this.tyqoonConfig) {
      const {panelClass, backdropClass} = this.tyqoonConfig;
      if (panelClass) {
        configs.panelClass = this.updateOverlayClasses(configs.panelClass as string | string[], panelClass);
      }
      if (backdropClass) {
        configs.backdropClass = this.updateOverlayClasses(configs.backdropClass as string | string[], backdropClass);
      }
    }
    const isModalOpened = this.lastOverlayRefs.has(content);
    if (isModalOpened) {
      return null;
    }
    const overlayRef = this.overlay.create(configs);
    const customOverlayRef = new CustomOverlayRef<R, T>(overlayRef, content, data, this, additionalConfig);
    const injector = this.createInjector(customOverlayRef, this.injector, data, additionalConfig);
    this.zone.run(() => {
      overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));
    });
    this.lastOverlayRefs.add(customOverlayRef.content);
    this.overlayRefStorageService.addOpenedModal(overlayRef, customOverlayRef.id);
    return customOverlayRef;
  }

  public openAndCloseAsync<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>,
    data: T,
    config?: OverlayConfig,
    additionalConfig: CustomOverlayConfig = {},
  ): Observable<OverlayCloseEvent<any | null>> {
    return this.open(content, data, config, additionalConfig)?.afterClosed$ || EMPTY;
  }

  public removeLastModalRef(content: string | TemplateRef<any> | Type<any>, id: number): void {
    this.overlayRefStorageService.removeOpenedModal(id);
    this.lastOverlayRefs.delete(content);
  }

  private createInjector(
    ref: CustomOverlayRef,
    inj: Injector,
    data: any | null = null,
    additionalConfig: CustomOverlayConfig | null = null,
  ): Injector {
    const tokens: StaticProvider[] = [
      {
        provide: CustomOverlayRef,
        useValue: ref,
      },
      {
        provide: MODAL_DATA,
        useValue: data,
      },
      {
        provide: MODAL_ADDITIONAL_CONFIG,
        useValue: additionalConfig,
      },
    ];
    return Injector.create({
      parent: inj,
      providers: [tokens],
    });
  }

  private updateOverlayClasses(configClasses: string | string[], seazClasses: string | string[]): string | string[] {
    return [configClasses, seazClasses]
      .reduce((acc: string[], val: string | string[]) => acc.concat(val), []);
  }
}
