import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { AlertService } from '../service/alert.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    currentUser: User;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authenticationService.getCurrentUser();
        this.authenticationService.currentUser.subscribe(userAccount => { this.currentUser = userAccount; });

    }


    logout() {
        this.authenticationService.logout();
    }

}