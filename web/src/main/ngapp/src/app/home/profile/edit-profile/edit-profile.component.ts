import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../_models/user';
import { AlertService } from '../../../service/alert.service';
import { UserServiceJson } from '../../../backend/service';
import { AuthenticationService } from '../../../service/authentication.service'

@Component({
    moduleId: module.id,
    selector: 'edit-profile',
    templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {

    loading = false;
    model: User;

    constructor(
        private router: Router,
        private userServiceJson: UserServiceJson,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authenticationService.getCurrentUser();
        this.authenticationService.currentUser.subscribe(userAccount => { this.model = userAccount; });
    }

    cancel() {
        this.router.navigate(['./home']);
    }

    save() {
        this.loading = true;
        this.userServiceJson.editMyProfile(this.model)
            .then(() => {
                this.loading = false;
                this.alertService.success('Profile updated successful', true);
                this.router.navigate(['./home']);
            })
            .catch(error => {
                this.loading = false;
                this.alertService.error(error.message, false);
            });
    }
}
