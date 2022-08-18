import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrls: ['./phone-control.component.css']
})
export class PhoneControlComponent extends DestroySubscription implements OnInit {
  @Output() readonly setMobileFormValue = new EventEmitter<any>();

  constructor() {
    super();
  }

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  setPhoneValue(): void {
    this.mobileControl.valueChanges.pipe(takeUntil(this.destroyStream$)).subscribe((val: any) => {
      if (!val) {
        return;
      }
      const mobNum = val.number.replace(' ', '');

      const formData = {
        dialCode: val.dialCode,
        number: mobNum
      };

      console.log(formData);

      this.setMobileFormValue.emit(formData);
    });
  }

  mobileControl = new FormControl(null);

  ngOnInit(): void {
    this.setPhoneValue();
  }
}
