import { TestBed } from '@angular/core/testing';

import { TyqoonIconRegistryService } from './tyqoon-icon-registry.service';

describe('TyqoonIconRegistryService', () => {
	let service: TyqoonIconRegistryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TyqoonIconRegistryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
