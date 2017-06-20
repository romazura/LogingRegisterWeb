import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonCompModule } from '../common-comp/common-comp.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { ProfileMenuComponent } from './profile/profile-menu/profile-menu.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './user-list/edit-user/edit-user.component';
import { AddUserComponent } from './user-list/add-user/add-user.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonCompModule,
        NgbModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        ProfileMenuComponent,
        EditProfileComponent,
        UserListComponent,
        EditUserComponent,
        AddUserComponent,
        ChangePasswordComponent
    ],
})
export class HomeModule { }