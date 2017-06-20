import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService } from '../../../service/alert.service';
import { UserServiceJson } from '../../../backend/service';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: './edit-user.component.html',
})

export class EditUserComponent implements OnInit {

    loading = false;
    model: any = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userServiceJson: UserServiceJson,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        let id: number = +this.route.snapshot.params['id'];
        this.userServiceJson.findById(id).then(selectedUser => { this.model = { ...selectedUser }; });
        if (id == this.authenticationService.getCurrentUserID()) {
            this.authenticationService.getCurrentUser();
            this.authenticationService.currentUser.subscribe(userAccount => { this.model = userAccount; });
        }
    }

    cancel() {
        this.router.navigate(['./home']);
    }

    save() {
        this.loading = true;
        this.userServiceJson.updateUser(this.model)
            .then(() => {
                this.loading = false;
                this.alertService.success('Profile updated successful', true);
                this.router.navigate(['./home']);
            })
            .catch(error => {
                this.alertService.error(error.message, false);
                this.loading = false;
            });
    }
}
