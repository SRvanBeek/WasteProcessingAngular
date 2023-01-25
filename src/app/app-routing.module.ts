import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {WasteProcessingComponent} from "./waste-processing/waste-processing.component";
import {UsersComponent} from "./users/users.component";
import {SettingsComponent} from "./settings/settings.component";
import {CategoriesComponent} from "./categories/categories.component";
import {HistoryComponent} from "./history/history.component";
import {CustomersComponent} from "./customers/customers.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'wasteProc', component: WasteProcessingComponent},
  {path: 'users', component: UsersComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'customers', component: CustomersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
