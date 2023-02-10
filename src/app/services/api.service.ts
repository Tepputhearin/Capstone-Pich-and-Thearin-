import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postPill(data : any){
    return this.http.post<any>("http://localhost:3000/pillList/", data);
  }
  getPill(){
    return this.http.get<any>("http://localhost:3000/pillList/");
  }
  putPill(data : any, id: number){
    return this.http.put<any>("http://localhost:3000/pillList/"+id,data)
  }
  deletePill(id : number){
    return this.http.delete<any>("http://localhost:3000/pillList/"+id);
  }
}
