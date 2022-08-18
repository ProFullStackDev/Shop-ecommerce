import {
	ChangeDetectorRef,
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	EventEmitter,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	Output,
	ViewContainerRef
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { merge, startWith, Subject, takeUntil } from 'rxjs';
import {ControlErrorComponent} from "../components/control-error/control-error.component";
import {ControlStatus, CustomFormError, CustomFormErrors, FORM_ERRORS} from "../form-errors";
import {extractTouchedChanges} from "../../../helpers/mark-touched";

@Directive({
	selector: '[appControlErrors]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
	private ref: ComponentRef<ControlErrorComponent>;
	private readonly destroyStream$ = new Subject<void>();

	@Input() hideErrors = false;

	@Output() status = new EventEmitter<ControlStatus>();

	constructor(
		private readonly vcr: ViewContainerRef,
		private readonly resolver: ComponentFactoryResolver,
		@Optional() private readonly control: NgControl,
		@Inject(FORM_ERRORS) private readonly errors: CustomFormErrors,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.checkStatusOrTouchedChanges();
	}

	ngOnDestroy(): void {
		const destroy = this.destroyStream$;
		destroy.next();
		destroy.complete();
		const ref = this.ref;
		if (ref) {
			ref.destroy();
		}
	}

	private checkStatusOrTouchedChanges(): void {
		const control = this.control;
		if (control && control.statusChanges) {
			merge(
				control.statusChanges.pipe(startWith(control.status)),
				extractTouchedChanges(control.control as AbstractControl)
			)
				.pipe(takeUntil(this.destroyStream$))
				.subscribe(() => {
					this.toggleErrorContainer();
					if (control.control) {
						control.control.markAsDirty();
						this.cdr.detectChanges();
					}
				});
		}
	}

	private toggleErrorContainer(): void {
		if (this.hideErrors) {
			return;
		}
		const controlErrors = this.control.errors;
		if (controlErrors && (this.control.touched || !this.control.pristine)) {
			const firstValue = Object.keys(controlErrors)[0];
			const getError = this.errors[firstValue];
			if (!getError) {
				return;
			}
			const error = getError(controlErrors[firstValue]);
			this.setError(error);
			this.status.emit(ControlStatus.invalid);
		} else if (this.ref) {
			this.setError(null);
			this.status.emit(ControlStatus.valid);
		}
	}

	private setError(text: CustomFormError | null): void {
		if (!this.ref) {
			const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
			this.ref = this.vcr.createComponent(factory);
		}
		this.ref.instance.error = text;
	}
}
