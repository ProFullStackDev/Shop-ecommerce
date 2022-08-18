import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatchComponent } from './patch.component';

const routes: Routes = [{ path: '', component: PatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatchRoutingModule {}
