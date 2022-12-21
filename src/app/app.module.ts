import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {JwtInterceptor} from "./shared/_helper/jwt.interceptor";
import {WasteProcessingModule} from "./waste-processing/waste-processing.module";
import {SharedModule} from "./shared/shared.module";
import {HeaderModule} from "./header/header.module";
import { SettingsComponent } from './settings/settings.component';
import {SettingsModule} from "./settings/settings.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    WasteProcessingModule,
    SharedModule,
    HeaderModule,
    SettingsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
