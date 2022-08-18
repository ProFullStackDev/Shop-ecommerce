import {OverlayRef} from '@angular/cdk/overlay';
import {fromEvent, Observable} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

export function overlayClickOutside(overlayRef: OverlayRef, origin: HTMLElement) {
  return elementClickOutside(overlayRef.overlayElement, origin)
    .pipe(
      takeUntil(overlayRef.detachments()),
    );
}

export function elementClickOutside(parentRef: HTMLElement, origin: HTMLElement): Observable<boolean> {
  return fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin;
        const notOverlay = !parentRef.contains(clickTarget);
        return notOrigin && notOverlay;
      }),
      map(event => !!event),
    );
}
