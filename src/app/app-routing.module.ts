import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {WasteProcessingComponent} from "./waste-processing/waste-processing.component";
import {UsersComponent} from "./users/users.component";
import {SettingsComponent} from "./settings/settings.component";
import {HistoryComponent} from "./history/history.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'wasteProc', component: WasteProcessingComponent},
  {path: 'users', component: UsersComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
