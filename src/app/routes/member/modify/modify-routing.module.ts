import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyComponent } from './modify.component';

const routes: Routes = [{ path: '', component: ModifyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyRoutingModule { }
