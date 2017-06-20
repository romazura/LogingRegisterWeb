import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../../service/alert.service';
import { UserServiceJson } from '../../../backend/service';

@Component({
    moduleId: module.id,
    templateUrl: './add-user.component.html',
})
export class AddUserComponent {

    loading = false;
    model: any = {};

    constructor(
        private router: Router,
        private userServiceJson: UserServiceJson,
        private alertService: AlertService,
    ) { }

    cancel() {
        this.router.navigate(['./home']);
    }

    add() {
        this.loading = true;
        this.userServiceJson.updateUser(this.model)
            .then(() => {
                this.loading = false;
                this.alertService.success('User created', true);
                this.router.navigate(['./home']);
            })
            .catch(error => {
                this.loading = false;
                this.alertService.error(error.message, false);
            });
    }
}
