
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';


@Injectable()
export class RegistrationServiceJson {

    private prodServiceUrl = '../registration.json';
    private devServiceUrl = 'http://localhost:8080/client/registration.json';

    constructor(private http: Http) { }

    registerUser(arg0: User): Promise<void> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'registerUser',
            params: [arg0]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as void;
            })
            .catch(error => {
                return this.handleError('RegistrationServiceJson.registerUser', error);
            });
    }

    private handleError(info: string, error: any): Promise<any> {
        if (error.type === 'json-rpc') {
            if (!environment.production) {
                console.error('JSON-RPC: ' + info, error.error);
            }
            return Promise.reject(error.error);
        } else {
            const data = { message: 'FATAL', data: [error] };
            if (!environment.production) {
                console.error('HTTP: ' + info, error);
            }
            return Promise.reject(data);
        }
    }

    private getServiceUrl(): string {
        if (environment.production) {
            return this.prodServiceUrl;
        }
        return this.devServiceUrl;
    }
}



@Injectable()
export class LoginServiceJson {

    private prodServiceUrl = '../login.json';
    private devServiceUrl = 'http://localhost:8080/client/login.json';

    constructor(private http: Http) { }

    loginUser(arg0: string, arg1: string): Promise<string> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'loginUser',
            params: [arg0, arg1]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as string;
            })
            .catch(error => {
                return this.handleError('LoginServiceJson.loginUser', error);
            });
    }



    private handleError(info: string, error: any): Promise<any> {
        if (error.type === 'json-rpc') {
            if (!environment.production) {
                console.error('JSON-RPC: ' + info, error.error);
            }
            return Promise.reject(error.error);
        } else {
            const data = { message: 'FATAL', data: [error] };
            if (!environment.production) {
                console.error('HTTP: ' + info, error);
            }
            return Promise.reject(data);
        }
    }

    private getServiceUrl(): string {
        if (environment.production) {
            return this.prodServiceUrl;
        }
        return this.devServiceUrl;
    }
}

@Injectable()
export class UserServiceJson {

    private prodServiceUrl = '../userservice.json';
    private devServiceUrl = 'http://localhost:8080/client/userservice.json';

    constructor(private http: Http) { }

    findById(arg0: number): Promise<User> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'findById',
            params: [arg0]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as User;
            })
            .catch(error => {
                return this.handleError('UserServiceJson.findById', error);
            });
    }

    getMyProfile(): Promise<User> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'getMyProfile'
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as User;
            })
            .catch(error => {
                return this.handleError('UserServiceJson.getMyProfile', error);
            });
    }

    editMyProfile(arg0: User): Promise<void> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'editMyProfile',
            params: [arg0]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as void;
            })
            .catch(error => {
                return this.handleError('UserServiceJson.editMyProfile', error);
            });
    }

    findByUserName(arg0: string): Promise<User> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'findByUserName',
            params: [arg0]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as User;
            })
            .catch(error => {
                return this.handleError('UserServiceJson.findByUserName', error);
            });
    }

    findAll(): Promise<User[]> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'findAll'
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as User[];
            })
            .catch(error => {
                return this.handleError('UserServiceJson.findAll', error);
            });
    }

    deleteUser(arg0: number): Promise<void> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'deleteUser',
            params: [arg0]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as void;
            })
            .catch(error => {
                return this.handleError('UserServiceJson.deleteUser', error);
            });
    }

    updateUser(arg0: User): Promise<void> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'updateUser',
            params: [arg0]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as void;
            })
            .catch(error => {
                return this.handleError('UserServiceJson.updateUser', error);
            });
    }

    changePassword(arg0: string, arg1: string, arg2: string): Promise<void> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        });
        const options = new RequestOptions({ headers: headers });
        const body = {
            id: '1',
            jsonrpc: '2.0',
            method: 'changePassword',
            params: [arg0, arg1, arg2]
        };

        return this.http.post(this.getServiceUrl(), body, options).toPromise()
            .then(response => {
                if (response.json().error) {
                    throw { type: 'json-rpc', error: response.json().error };
                }
                return response.json().result as void;
            })
            .catch(error => {
                return this.handleError('UserServiceJson.changePassword', error);
            });
    }



    private handleError(info: string, error: any): Promise<any> {
        if (error.type === 'json-rpc') {
            if (!environment.production) {
                console.error('JSON-RPC: ' + info, error.error);
            }
            return Promise.reject(error.error);
        } else {
            const data = { message: 'FATAL', data: [error] };
            if (!environment.production) {
                console.error('HTTP: ' + info, error);
            }
            return Promise.reject(data);
        }
    }

    private getServiceUrl(): string {
        if (environment.production) {
            return this.prodServiceUrl;
        }
        return this.devServiceUrl;
    }
}