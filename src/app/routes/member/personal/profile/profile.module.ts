import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { PhoneControlModule } from '@shared/controls/phone-control/phone-control.module';
import { SharedModule } from '@shared/shared.module';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { AddRecommendComponent } from './add-recommend/add-recommend.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { EditPhoneComponent } from './edit-phone/edit-phone.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent, EditPhoneComponent, EditEmailComponent, AddRecommendComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    PhoneControlModule,
    NzCarouselModule,
    NzIconModule,
    NzAnchorModule,
    NzGridModule,
    NzModalModule,
    NzTabsModule,
    NzButtonModule,
    FormsModule,
    NzInputModule,
    NzDatePickerModule,
    NzTableModule,
    NzPaginationModule,
    NzCascaderModule,
    NzStepsModule
  ],
  providers: [BasicService]
})
export class ProfileModule {}
