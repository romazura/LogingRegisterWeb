import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'

import { UserServiceJson } from '../backend/service';
import { AlertService } from './alert.service';

import { User } from '../_models/user';

const RETURN_URL = 'returnUrl';

@Injectable()
export class AuthenticationService {

    private currentUserSubj: BehaviorSubject<User> = new BehaviorSubject(null);
    public readonly currentUser: Observable<User> = this.currentUserSubj.asObservable();

    constructor(
        private http: Http,
        private router: Router,
        private userServiceJson: UserServiceJson,
        private alertService: AlertService) {

    }

    getCurrentUser() {
        this.userServiceJson.getMyProfile()
            .then(userAccount => {
                this.currentUserSubj.next(userAccount);
            })
            .catch(error => {
                this.alertService.error(error.message, false);
                this.logout();
            });
    }

    login(token: string) {

        if (token !== null) {
            //token: string format id:username
            this.setCurrentUserID(token.substring(0, token.indexOf(":")));
            localStorage.setItem('authToken', token);
            this.getCurrentUser();
        }
    }

    logout(returnUrl: string = null) {
        this.setReturnUrl(returnUrl);
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUserID');
        this.router.navigate(['/frontpage']);

    }

    getReturnUrl(): string {
        let returnUrl = localStorage.getItem(RETURN_URL);
        if (returnUrl) {
            return returnUrl;
        }
        return '/';
    }

    private setReturnUrl(returnUrl: string) {
        if (returnUrl && returnUrl !== '/' && returnUrl.trim() !== '') {
            localStorage.setItem(RETURN_URL, returnUrl);
        }
    }

    private setCurrentUserID(userid: string) {
        localStorage.setItem('currentUserID', userid);
    }

    getCurrentUserID(): number {
        return parseInt(localStorage.getItem('currentUserID'));
    }

    getAuthToken(): string {
        return localStorage.getItem('authToken');
    }
}