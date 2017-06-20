import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/user';
import { UserServiceJson } from '../../backend/service';

@Component({
    moduleId: module.id,
    selector: 'user-list',
    styles: [` 
        .current-sort {
            color: #1f78d1;
        }
        .passive-sort:hover {
            text-decoration: underline;
        }
        .sort-field {
            cursor: pointer;
        }
    `],
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {

    users: User[] = [];
    selectedUsers: number[] = [];
    sortField: string = "id";
    sortAsc: boolean = false;

    constructor(private userServiceJson: UserServiceJson) { }

    ngOnInit() {
        this.loadAllUsers();
    }

    public isCurrent(current: string) {
        return current === this.sortField;
    }

    sort(sortField: string) {
        this.sortField = sortField;
        this.sortAsc = !this.sortAsc;

        this.users =
            this.users.sort((n1, n2) => {
                return this.sortAsc ? this.sortByField(n1, n2) : -this.sortByField(n1, n2);
            });
    }

    private sortByField(n1: User, n2: User): number {
        return n1[this.sortField] < n2[this.sortField] ? -1 :
            (n1[this.sortField] > n2[this.sortField] ? 1 : 0);
    }

    deleteSelected() {
        for (let userid of this.selectedUsers) {
            this.deleteUser(userid);
        }
    }

    allChecked(value: boolean) {
        if (value) {
            this.selectedUsers = this.users.map(user => user.id);
        } else {
            this.selectedUsers = [];
        }
    }
    isUserChecked(userid: number) {
        return this.selectedUsers.includes(userid);
    }

    userChecked(value: boolean, userid: number) {
        if (value) {
            if (!this.selectedUsers.includes(userid)) {
                this.selectedUsers.push(userid);
            }
        } else {
            if (this.selectedUsers.includes(userid)) {
                this.selectedUsers = this.selectedUsers.filter(id => id !== userid);
            }
        }
    }

    deleteUser(id: number) {
        this.userServiceJson.deleteUser(id).then(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userServiceJson.findAll().then(users => { this.users = users; });
    }
}