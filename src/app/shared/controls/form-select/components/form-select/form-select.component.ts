import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SearchCategories } from '../../../../components/header/modules/header-search/models/search.model';
import { DropdownItem } from '../../models/form-select.model';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelectComponent),
      multi: true
    }
  ]
})
export class FormSelectComponent<T> implements OnInit, ControlValueAccessor {
  values: Array<DropdownItem<T>>;

  @Input() value: number | string;
  @Input() label: string;
  @Input() name: string;
  @Input() checked = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() description: string;
  @Output() changed = new EventEmitter<number | string>();
  @Input() selectedValues: Array<DropdownItem<T>>;

  public static nextId = 0;
  public readonly id = `tyqoon-radio-${FormSelectComponent.nextId++}`;

  @ViewChild('formInput', { static: true }) formInput: ElementRef<HTMLInputElement>;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  @HostListener('click')
  public onChangeValue(): void {
    if (this.disabled) {
      return;
    }
    this.onChangeFn(true);
    this.setInputChecked(true);
    this.changed.emit(this.value);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: any): void {
    const newVal = !!value;
    this.checked = newVal;
    this.setInputChecked(newVal);
    this.cdr.detectChanges();
  }

  public onInputClick(e: Event): void {
    e.preventDefault();
  }

  public onTouched() {
    this.onTouchedFn();
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  private onChangeFn = (value: boolean | null) => {};

  private onTouchedFn = () => {};

  private setInputChecked(value: boolean): void {
    const input = this.formInput.nativeElement;
    if (!input) {
      return;
    }
    input.checked = value;
  }
}
