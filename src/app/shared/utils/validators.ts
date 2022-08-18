import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

const EMAIL_PATTERN = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


export class CustomValidators {
  static number(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      // return { required: true };
    } else if (!/^[0-9]*$/.test(control.value)) {
      return { error: true };
    }
    return {};
  }

  static phone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    } else if (!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(control.value)) {
      return { error: true };
    }
    return {};
  }

  static userName(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    } else if (!/(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)/.test(control.value)) {
      return { error: true };
    } else if (control.value.trim().length < 6) {
      return { length: true };
    }
    return {};
  }

  static password(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    } else if (!/(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)/.test(control.value)) {
      return { error: true };
    } else if (control.value.trim().length < 6) {
      return { length: true };
    }
    return {};
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      // return { required: true };
    } else if (!EMAIL_PATTERN.test(control.value)) {
      return { error: true };
    }
    return {};
  }
}
