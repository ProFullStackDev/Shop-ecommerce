import {Injectable} from '@angular/core';
import {BlockScrollStrategy, OverlayRef} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class OverlayRefStorageService {

  public readonly lastOpenedOverlayRefs = new Map<number, OverlayRef>();

  constructor() {
  }

  public addOpenedModal(ref: OverlayRef, id: number): void {
    this.lastOpenedOverlayRefs.set(id, ref);
  }

  public removeOpenedModal(id: number): void {
    this.lastOpenedOverlayRefs.delete(id);
  }

  public hasOpenedModalWithGlobalPosition(): boolean {
    const values = Array.from(this.lastOpenedOverlayRefs.values());
    return !!values.find(ref => ref.getConfig().scrollStrategy instanceof BlockScrollStrategy);
  }
}
