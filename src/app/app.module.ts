import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {JwtInterceptor} from "./_helper/jwt.interceptor";
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WasteProcessingComponent} from "./waste-processing/waste-processing.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminPanelComponent,
    WasteProcessingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
