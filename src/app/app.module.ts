import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {JwtInterceptor} from "./shared/_helper/jwt.interceptor";
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WasteProcessingModule} from "./waste-processing/waste-processing.module";
import {SharedModule} from "./shared/shared.module";
import {HeaderModule} from "./header/header.module";


@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    WasteProcessingModule,
    SharedModule,
    HeaderModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
