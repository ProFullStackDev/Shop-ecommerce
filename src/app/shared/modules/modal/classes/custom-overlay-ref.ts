import {OverlayRef} from '@angular/cdk/overlay';
import {DOCUMENT} from '@angular/common';
import {Inject, TemplateRef, Type} from '@angular/core';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import {CustomOverlayConfig} from '../interfaces/custom-overlay-config';
import {OverlayCloseEvent, OverlayCloseEventType} from '../interfaces/overlay-close-event';
import {OverlayService} from '../services/overlay.service';

export class CustomOverlayRef<R = any | null, T = any> {
  private static uid = 0;
  public id = CustomOverlayRef.uid++;
  public afterClosed$ = new Subject<OverlayCloseEvent<T | null>>();
  private destroyStream$ = new Subject();
  public backdropClickData: T | null = null;

  constructor(
    public readonly overlay: OverlayRef,
    public readonly content: string | TemplateRef<any> | Type<any>,
    public readonly data: T,
    public readonly overlayService: OverlayService,
    private customOverlayConfig?: CustomOverlayConfig
  ) {
    this.onBackdropClick();
  }

  public close(data: T | null, closeType: OverlayCloseEventType = 'close') {
    this.dispose(closeType, data);
  }

  public setBackdropClickData(data: T): void {
    this.backdropClickData = data;
  }

  private dispose(type: OverlayCloseEventType, data: T | null) {
    this.overlay.addPanelClass('hide');
    // @ts-ignore
    document.querySelector('.cdk-overlay-backdrop-showing')?.style.display = 'none';
    setTimeout(() => this.overlay.dispose(), 500);
    this.afterClosed$.next({
      type,
      data
    });
    this.destroy();
  }

  public removeLastModalRef(): void {
    this.overlayService.removeLastModalRef(this.content, this.id);
  }

  private onBackdropClick(): void {
    const config = this.customOverlayConfig;
    const preventBackdropClick = config && config.preventBackdropClick;
    if (preventBackdropClick) {
      return;
    }
    this.overlay
      .backdropClick()
      .pipe(take(1), takeUntil(this.destroyStream$))
      .subscribe(() => this.dispose('backdropClick', this.backdropClickData));
  }

  private destroy(): void {
    // @ts-ignore
    this.destroyStream$.next();
    this.destroyStream$.complete();
    this.afterClosed$.complete();
  }
}
