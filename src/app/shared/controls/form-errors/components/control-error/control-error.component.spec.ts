import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorComponent } from './control-error.component';

describe('ControlErrorComponent', () => {
	let component: ControlErrorComponent;
	let fixture: ComponentFixture<ControlErrorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ControlErrorComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ControlErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
