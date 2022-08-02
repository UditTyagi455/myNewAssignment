import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {


  url:any ="http://localhost:3000/posts";
  constructor(private http:HttpClient) { }
   

  getApiData() {
    return this.http.get(this.url);
  }
  postApiData(data:any){
    return this.http.post(this.url,data);
  }
  deleteApiData(id:any){
    return this.http.delete(`http://localhost:3000/posts/${id}`);
  }
  updateApiData(data:any,id:any){
    return this.http.patch(`http://localhost:3000/posts/${id}`,data);
  }
}
