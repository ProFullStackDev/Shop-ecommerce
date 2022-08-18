import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopProductSearchComponent } from './search.component';

const routes: Routes = [{ path: '', component: ShopProductSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
