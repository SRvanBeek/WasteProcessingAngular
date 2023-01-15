import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {JwtInterceptor} from "./shared/_helper/jwt.interceptor";
import {WasteProcessingModule} from "./waste-processing/waste-processing.module";
import {SharedModule} from "./shared/shared.module";
import {HeaderModule} from "./header/header.module";
import {SidebarModule} from "./sidebar/sidebar.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UsersModule} from "./users/users.module";
import {SettingsModule} from "./settings/settings.module";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { HistoryComponent } from './history/history.component';
import { HistoryItemComponent } from './history/history-item/history-item.component';
import { HistoryOffcanvasComponent } from './history/history-offcanvas/history-offcanvas.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { HistorymodalComponent } from './history/historymodal/historymodal.component';
import {HistoryModule} from "./history/history.module";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    WasteProcessingModule,
    SharedModule,
    HeaderModule,
    SidebarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    UsersModule,
    SettingsModule,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        LoginModule,
        WasteProcessingModule,
        SharedModule,
        HeaderModule,
        SidebarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        UsersModule,
        SettingsModule,
        MatCheckboxModule,
        HistoryModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
