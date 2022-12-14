import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {WasteProcessingComponent} from "./waste-processing/waste-processing.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'wasteProc', component: WasteProcessingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
