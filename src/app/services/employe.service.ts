import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private _http: HttpClient) { }

  addEmploye(data:any): Observable<any> {
    return this._http.post('http://localhost:3000/employees',data);
  }

updateEmploye(id:number, data:any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`,data);
  }

getEmployeList(): Observable<any> {
      return this._http.get('http://localhost:3000/employees');
  }
  deleteEmploye(id:number):Observable<any>{
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}
