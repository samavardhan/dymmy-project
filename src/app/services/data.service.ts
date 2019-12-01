import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    getCountType(body) {
        console.log(body, "getcount");
        let url = '';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //    return this.http.post('https://localhost:8080/ersp/getApplicationTypeCount',body,{headers}).pipe((res)=>{
        //         return res
        //     })


        return this.http.get("assets/getcount.json", { headers }).pipe((res) => {
            return res
        }
        );
    }

    getCountEnvironment(body) {
        console.log(body, "envi");
        let url = '';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //    return this.http.post('https://localhost:8080/ersp/getEnvironmentTypeCount',body,{headers}).pipe((res)=>{
        //         return res
        //     })
        return this.http.get("assets/getenvi.json", { headers }).pipe((res) => {
            return res;
        }
        );
    }

    sendFormData(body) {
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post('https://localhost:8080/ersp/getEnvironmentTypeCount', body, { headers }).pipe((res) => {
            return res;
        })
    }

}