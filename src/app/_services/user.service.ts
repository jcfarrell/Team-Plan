import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://67.205.154.236:8080/user/all', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
       return this.http.get('http://67.205.154.236:8080/user/get?userId=' + id, this.jwt())
        .map((response: Response) => response.json()).subscribe(response => { });
    }

    setUserInfo(id: number){
        this.http.get('http://67.205.154.236:8080/user/get?userId=' + id, this.jwt()).map(response => response.json()).subscribe(response => {
            localStorage.setItem('currentUserInfo', JSON.stringify(response));
        });
    }

    create(user: User) {
        return this.http.post('http://67.205.154.236:8080/user/create?firstName='+user.firstName+'&lastName='+user.lastName+'&userName='+user.username+'&password='+user.password, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}