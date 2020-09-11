import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageInfoComponent} from './modules/manage-info/components/manage-info/manage-info.component';
import {StateInfoComponent} from './modules/manage-info/components/state-info/state-info.component';
import {StateMapComponent} from './modules/manage-info/components/state-info/state-map/state-map.component';
import {PageNotFoundComponent} from './modules/page-not-found/components/page-not-found/page-not-found.component';

const routes: Routes = [
  // {path:'manage-info',loadChildren:'./modules/manage-info/manage-info.module#ManageInfoModule'},
  {path:'',redirectTo:'/manage-info',pathMatch:'full' },
  {path:'state-info/:state',component:StateInfoComponent},
  {path:'state-map',component:StateMapComponent},
  {path:'manage-info',component:ManageInfoComponent},
  {path:"**",component:PageNotFoundComponent},// page not found,list specical ne last line // wildcard route
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ManageInfoComponent,PageNotFoundComponent,StateInfoComponent,StateMapComponent]
