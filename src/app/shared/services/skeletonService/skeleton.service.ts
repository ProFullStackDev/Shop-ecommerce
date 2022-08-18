import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";
import {LoaderService} from "@shared/services/loaderService/loader.service";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SkeletonService {
  private renderer: Renderer2;

  constructor(
    private readonly rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public setSkeleton(selectors: any, classArray: any): void {
    if (classArray?.length) {
      classArray.forEach((item: any) => {
        this.renderer.addClass(item, 'skeleton-loader');
      });
    }

    selectors.forEach((selector: any) => {
      this.renderer.addClass(selector, 'skeleton-loader');
    });
  }

  public toggleSkeleton(selectors: any, classArray: any): void {
    const toggle = (selector: any) => {
      setTimeout(() => {
        this.renderer.addClass(selector, 'fade-in');
      }, 1500);

      setTimeout(() => {
        this.renderer.removeClass(selector, 'fade-in');
        this.renderer.removeClass(selector, 'skeleton-loader');
      }, 2000);
    };


    if (classArray?.length) {
      classArray.forEach((item: any) => {
        toggle(item);
      });
    }

    selectors.forEach((selector: any) => {
      toggle(selector);
    });
  };
}
