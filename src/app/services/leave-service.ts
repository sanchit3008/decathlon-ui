import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../shared/constants";
import { Leaves } from "../shared/leaves";

@Injectable()
export class LeaveService implements OnInit {
    
    ngOnInit(){};

    constructor(private http: HttpClient) { }

    localUrl = new Constants().localUrl;

    getLeavesForEmployee(empId: string): Observable<Leaves[]> {
        return this.http.get<Leaves[]>(`${this.localUrl}/leaves/${empId}`);
    }

    getPendingLeaves() : Observable<Leaves[]> {
        return this.http.get<Leaves[]>(`${this.localUrl}/leaves/pending`);
    }

    postNewLeave(empId: string, from: Date, to: Date) {
        let body = {
            empId,
            from,
            to,
            status: "Pending"
        };

        return this.http.post(`${this.localUrl}/leaves/add`, body);
    }

    modifyLeave(id: any, status: string) {
        let body = {
            id,
            status
        };
        return this.http.put(`${this.localUrl}/leaves/modify`,body);
    }

}