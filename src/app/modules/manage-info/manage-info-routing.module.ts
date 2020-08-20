import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageInfoComponent } from './components/manage-info/manage-info.component';

const routes: Routes = [
  {path:'', component:ManageInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageInfoRoutingModule { }
