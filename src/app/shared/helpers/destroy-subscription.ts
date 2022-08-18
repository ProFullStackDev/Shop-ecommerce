import { HostListener, OnDestroy, Directive } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive()
export class DestroySubscription implements OnDestroy {
  private readonly destroySubject: Subject<void> = new Subject();

  protected get destroyStream$(): Observable<void> {
    return this.destroySubject.asObservable();
  }

  protected destroy(): void {
    const destroy = this.destroySubject;
    if (destroy.isStopped) {
      return;
    }
    destroy.next();
    destroy.unsubscribe();
  }

  public ngOnDestroy(): void {
    this.destroy();
  }
}
