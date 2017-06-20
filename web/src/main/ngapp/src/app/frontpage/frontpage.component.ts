import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../service/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'app-frontpage',
    templateUrl: './frontpage.component.html'
})

export class FrontpageComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }
}