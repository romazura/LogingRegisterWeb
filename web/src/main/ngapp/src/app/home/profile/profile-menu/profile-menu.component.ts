import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../service/authentication.service';

import { User } from '../../../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: './profile-menu.component.html',
})
export class ProfileMenuComponent implements OnInit {

    currentUser: User;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }
}