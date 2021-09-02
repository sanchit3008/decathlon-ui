import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../shared/user";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../shared/constants";
import { Metric } from "../shared/metric";

@Injectable()
export class UserService implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit(){}

    localUrl = new Constants().localUrl;

    getUser(empId: string): Observable<User> {
        return this.http.get<User>(`${this.localUrl}/employee/${empId}`);
    }

    getUserCount(): Observable<Metric> {
        return this.http.get<Metric>(`${this.localUrl}/employee/count`)
    }

    addUser(body: any) {
        return this.http.post<{"response": string}>(`${this.localUrl}/employee/add`, body);
    }

    modifyUser(body:any) {
        return this.http.put(`${this.localUrl}/employee/modify`, body);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.localUrl}/employee/all`)
    }

    setLoggedInUser(user: any): void {
        let loggedInUser = new User();
        loggedInUser.city = user?.city;
        loggedInUser.designation = user?.designation;
        loggedInUser.email = user?.email;
        loggedInUser.empId = user?.empId;
        loggedInUser.home = user?.home;
        loggedInUser.isHr = user?.isHr;
        loggedInUser.name = user?.name;
        loggedInUser.phone = user?.phone;
        loggedInUser.photo = user?.photo;
        loggedInUser.salary = user?.salary;
        loggedInUser.state = user?.state;
        loggedInUser.pincode = user?.pincode;

        sessionStorage.setItem('user', JSON.stringify(loggedInUser));
        sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
        sessionStorage.setItem('isHr', JSON.stringify(user?.isHr));
    }

    getLoggedInUser(): User {
        return JSON.parse(sessionStorage.getItem('user') || "{}");
    }

    isUserLoggedIn(): boolean {
        return JSON.parse(sessionStorage.getItem('isLoggedIn') || "false");
    }

    isHr(): boolean {
        return JSON.parse(sessionStorage.getItem('isHr') || "false");
    }

    logout(): void {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isHr');
    }
}