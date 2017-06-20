import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FrontpageComponent } from './frontpage.component';
import { FrontpageRoutingModule } from './frontpage-routing.module';
import { CommonCompModule } from '../common-comp/common-comp.module';



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        FrontpageRoutingModule,
        CommonCompModule,
        NgbModule.forRoot()
    ],
    declarations: [
        FrontpageComponent,
        LoginComponent,
        RegisterComponent
    ]
})

export class FrontpageModule { }
