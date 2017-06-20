import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../../service/alert.service';
import { UserServiceJson } from '../../../backend/service';
import { AuthenticationService } from '../../../service/authentication.service'
import { User } from '../../../_models/user';

@Component({
    moduleId: module.id,
    selector: 'change-password',
    templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

    loading = false;
    model: any = {};
    currentUser: User;

    constructor(
        private router: Router,
        private userServiceJson: UserServiceJson,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authenticationService.currentUser.subscribe(userAccount => { this.currentUser = userAccount; });
    }
    cancel() {
        this.router.navigate(['./home']);
    }

    save() {
        this.loading = true;
        this.model.id = this.currentUser.id;
        this.userServiceJson.changePassword(
            this.model.oldPassword,
            this.model.newPassword,
            this.model.confirmPassword
        )
            .then(() => {
                this.loading = false;
                this.alertService.success('Password changed', true);
                this.router.navigate(['./home']);
            })
            .catch(error => {
                this.loading = false;
                this.alertService.error(error.message, false);
            });
    }
}