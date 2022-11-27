import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdersComponent} from './orders/orders.component'
import {LoginComponent} from "./login/login.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";

const routes: Routes = [
  { path: '', component:  LoginComponent},
  { path: 'orders', component:  OrdersComponent},
  { path: 'adminPanel', component:  AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
