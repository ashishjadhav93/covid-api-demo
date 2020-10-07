import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCountryInfoComponent } from './components/manage-country-info/manage-country-info.component';

const routes: Routes = [
  {path:'', component:ManageCountryInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageInfoRoutingModule { }
