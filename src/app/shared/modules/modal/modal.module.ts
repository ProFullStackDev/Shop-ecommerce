import {Overlay, OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {Injector, NgModule, NgZone} from '@angular/core';
import {MODAL_DATA, TYQOON_MODAL_CONFIG} from './classes/modal-data';
import {CustomOverlayRef} from './classes/custom-overlay-ref';
import {OverlayComponent} from './components/overlay/overlay.component';
import {TyqoonModalConfig} from './interfaces/tyqoon-modal-config';
import {OverlayService} from './services/overlay.service';
import {OverlayRefStorageService} from './services/overlay-ref-storage.service';
import {TyqoonIconRegistryService} from "../tyqoon-icons/services/tyqoon-icon-registry.service";

export const overlayServiceFactory = (
  overlay: Overlay,
  injector: Injector,
  config: TyqoonModalConfig,
  zone: NgZone,
  overlayRefStorageService: OverlayRefStorageService,
): OverlayService => {
  return new OverlayService(overlay, injector, config, zone, overlayRefStorageService);
};

@NgModule({
  declarations: [
    OverlayComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  providers: [
    TyqoonIconRegistryService,
    {provide: MODAL_DATA, useValue: {}},
    {provide: TYQOON_MODAL_CONFIG, useValue: {}},
    {provide: CustomOverlayRef, useValue: {}},
    {
      provide: OverlayService,
      useFactory: overlayServiceFactory,
      deps: [Overlay, Injector, TYQOON_MODAL_CONFIG, NgZone, OverlayRefStorageService]
    }
  ]
})
export class ModalModule {
}
