import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../service/auth.guard';
import { EditUserComponent } from './user-list/edit-user/edit-user.component';
import { AddUserComponent } from './user-list/add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileMenuComponent } from './profile/profile-menu/profile-menu.component'


const homeRoutes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
            { path: 'profile', component: ProfileMenuComponent },
            { path: 'edit-user/:id', component: EditUserComponent },
            { path: 'add-user', component: AddUserComponent },
            { path: 'user-list', component: UserListComponent },
            { path: '', redirectTo: 'user-list', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }