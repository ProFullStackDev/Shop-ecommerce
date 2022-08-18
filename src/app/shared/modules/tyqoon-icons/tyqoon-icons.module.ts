import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TyqoonIconComponent } from './components/tyqoon-icon/tyqoon-icon.component';
import { TyqoonIconRegistryService } from './services/tyqoon-icon-registry.service';

function tyqoonIconRegistryServiceFactory(): TyqoonIconRegistryService {
	return new TyqoonIconRegistryService();
}

@NgModule({
	declarations: [TyqoonIconComponent],
	imports: [CommonModule],
	exports: [TyqoonIconComponent]
})
export class TyqoonIconsModule {
	static forRoot(): ModuleWithProviders<TyqoonIconsModule> {
		return {
			ngModule: TyqoonIconsModule,
			providers: [
				{
					provide: TyqoonIconRegistryService,
					useFactory: tyqoonIconRegistryServiceFactory
				}
			]
		};
	}
}
