import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderSearchComponent } from '@shared/components/header/modules/header-search/components/header-search/header-search.component';
import { FormInputModule } from '@shared/controls/form-input';
import { FormSelectModule } from '@shared/controls/form-select';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';

@NgModule({
  declarations: [HeaderSearchComponent],
  exports: [HeaderSearchComponent],
  imports: [CommonModule, FormInputModule, ReactiveFormsModule, TyqoonIconsModule, FormSelectModule, TranslateModule]
})
export class HeaderSearchModule {}
