import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyqoonIconComponent } from './tyqoon-icon.component';

describe('TyqoonIconComponent', () => {
	let component: TyqoonIconComponent;
	let fixture: ComponentFixture<TyqoonIconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TyqoonIconComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TyqoonIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
