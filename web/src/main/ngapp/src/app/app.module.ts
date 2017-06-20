import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';


import { AuthGuard } from './service/auth.guard';
import { AlertService } from './service/alert.service';
import { AuthenticationService } from './service/authentication.service';
import { LocaleService } from './service/locale.service';

import { CommonCompModule } from './common-comp/common-comp.module';
import { HomeModule } from './home/home.module';
import { FrontpageModule } from './frontpage/frontpage.module';

import { LoginServiceJson } from './backend/service';
import { RegistrationServiceJson } from './backend/service';
import { UserServiceJson } from './backend/service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        FrontpageModule,
        AppRoutingModule,
        CommonCompModule,
        HomeModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        LocaleService,
        LoginServiceJson,
        RegistrationServiceJson,
        UserServiceJson,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }