import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from "./users.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ChangePassDialogComponent} from './change-pass-dialog/change-pass-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {DisableConfirmDialogComponent} from './disable-confirm-dialog/disable-confirm-dialog.component';
import {UserModalComponent} from "./user-modal/user-modal.component";
import {CreateUserComponent} from "./create-user/create-user.component";


@NgModule({
  declarations: [
    UsersComponent,
    UserInfoComponent,
    ChangePassDialogComponent,
    DisableConfirmDialogComponent,
    UserModalComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule {
}