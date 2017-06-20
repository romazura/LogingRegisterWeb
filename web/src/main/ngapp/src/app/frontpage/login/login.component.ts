import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../service/alert.service';
import { AuthenticationService } from '../../service/authentication.service';
import { LoginServiceJson } from '../../backend/service';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private loginServiceJson: LoginServiceJson
    ) { }

    login() {
        this.loading = true;
        this.loginServiceJson.loginUser(this.model.username, this.model.password)
            .then(authToken => {
                if (authToken !== null) {
                    this.loading = false;
                    this.authenticationService.login(authToken);
                    this.router.navigate([this.authenticationService.getReturnUrl()]);
                } else {
                    this.loading = false;
                    this.alertService.error("Null Token", false);
                    this.authenticationService.logout();
                }
            })
            .catch(error => {
                this.loading = false;
                this.alertService.error(error.message, true);
                this.authenticationService.logout();
            });
    }

}
