import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontpageComponent } from './frontpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const frontpageRoutes: Routes = [
    { path: 'logout', redirectTo: 'frontpage', pathMatch: 'full' },
    {
        path: 'frontpage', component: FrontpageComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(frontpageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FrontpageRoutingModule { }