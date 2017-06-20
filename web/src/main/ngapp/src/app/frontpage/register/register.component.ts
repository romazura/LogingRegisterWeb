import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../service/alert.service';
import { RegistrationServiceJson } from '../../backend/service';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private registrationServiceJson: RegistrationServiceJson,
    ) { }

    register() {
        this.loading = true;
        this.registrationServiceJson.registerUser(this.model)
            .then(() => {
                this.loading = false;
                this.alertService.success('Registration successful', true);
                this.router.navigate(['../frontpage/login']);
            })
            .catch(error => {
                this.loading = false;
                this.alertService.error(error.message, false);
            });
    }
}


