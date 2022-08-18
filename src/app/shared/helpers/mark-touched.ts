// Helper types

import {AbstractControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';

/**
 * Extract arguments of function
 */
export type ArgumentsType<F> = F extends (...args: infer A) => any ? A : never;

/**
 * Creates an object like O. Optionally provide minimum set of properties P which the objects must share to conform
 */
type ObjectLike<O extends object, P extends keyof O = keyof O> = Pick<O, P>;


//   * Extract a touched changed observable from an abstract control
//   * @param control AbstractControl like object with markAsTouched method
//   */
export const extractTouchedChanges = (
  control: ObjectLike<AbstractControl, 'markAsTouched' | 'markAsUntouched'>
): Observable<boolean> => {
  const prevMarkAsTouched = control.markAsTouched;
  const prevMarkAsUntouched = control.markAsUntouched;

  const touchedChanges$ = new Subject<boolean>();

  function nextMarkAsTouched(...args: ArgumentsType<AbstractControl['markAsTouched']>) {
    prevMarkAsTouched.bind(control)(...args);
    touchedChanges$.next(true);
  }

  function nextMarkAsUntouched(...args: ArgumentsType<AbstractControl['markAsUntouched']>) {
    prevMarkAsUntouched.bind(control)(...args);
    touchedChanges$.next(false);
  }

  control.markAsTouched = nextMarkAsTouched;
  control.markAsUntouched = nextMarkAsUntouched;

  return touchedChanges$;
};
