import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatisticsService } from '@core/services/user/statistics.service';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@shared/components/header/header.module';
import { LayoutFooterModule } from '@shared/components/layout/layout-footer/layout-footer.module';
import { LayoutHeaderToolsModule } from '@shared/components/layout/layout-header-tools/layout-header-tools.module';
import { LayoutTopNavModule } from '@shared/components/layout/layout-top-nav/layout-top-nav.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { MemberLayoutComponent } from './member-layout.component';

@NgModule({
  declarations: [MemberLayoutComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzIconModule,
    SharedModule,
    LayoutFooterModule,
    LayoutTopNavModule,
    LayoutHeaderToolsModule,
    NzModalModule,
    NzDropDownModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzStepsModule,
    HeaderModule,
    TranslateModule,
    TyqoonIconsModule
  ],
  exports: [MemberLayoutComponent],
  providers: [StatisticsService]
})
export class MemberLayoutModule {
  static forRoot(): ModuleWithProviders<MemberLayoutModule> {
    return {
      ngModule: MemberLayoutModule,
      providers: []
    };
  }
}
