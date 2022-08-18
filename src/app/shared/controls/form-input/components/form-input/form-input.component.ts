import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	Renderer2,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {ControlStatus} from "../../../form-errors/form-errors";

export type InputType = 'text' | 'number' | 'password' | 'email' | 'tel' | 'url';

@Component({
	selector: 'app-form-input',
	templateUrl: './form-input.component.html',
	styleUrls: ['./form-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormInputComponent),
			multi: true
		}
	]
})
export class FormInputComponent implements OnInit, OnChanges, ControlValueAccessor {
	public value: any;
	public status = false;

	@Input() label = '';
	@Input() hint = '';
	@Input() placeholder = '';
	@Input() disabled = false;
	@Input() required = false;
	@Input() readonly = false;
	@Input() type: InputType = 'text';
	@Input() autocomplete: string | null = null;
	@ViewChild('formInput', { static: true }) formInput: ElementRef;

	private onChangeFn = (value: any) => {};
	private onTouchedFn = () => {};

	constructor(private readonly renderer: Renderer2) {}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		const typeChanges = changes && changes['type'];
		if (!typeChanges) {
			return;
		}
		this.setInputType();
	}

	public onChangeStatus(event: ControlStatus): void {
		if (this.status !== !!event) {
			this.status = !!event;
		}
	}

	private setInputType(): void {
		const type = this.type;
		const input = this.formInput;
		if (!input) {
			return;
		}
		this.renderer.setAttribute(
			this.formInput.nativeElement,
			'type',
			type === 'password' ? 'password' : 'text'
		);
	}

	public onChangeValue(event: any): void {
		const value = event.target && event.target.value;
		this.onChange(value);
	}

	public registerOnChange(fn: any): void {
		this.onChangeFn = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouchedFn = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	public writeValue(value: string): void {
		if (!value) {
			this.value = '';
		}
		this.value = value;
	}

	public onTouched(): void {
		this.onTouchedFn();
	}

	public onChange(value: any): void {
		this.onChangeFn(value);
	}
}
