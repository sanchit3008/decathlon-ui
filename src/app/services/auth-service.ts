import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Constants } from '../shared/constants';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    localUrl = new Constants().localUrl;

    getLoginInfo(empId:string, pwd:string) {
        let headers = new HttpHeaders({'empId': empId, 'pwd': pwd});
        return this.http.get(`${this.localUrl}/login`, {headers});
    }

}