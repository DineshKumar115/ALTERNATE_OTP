import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from'@angular/common/http'
import{ environment } from '../../environments/environment'

@Injectable()
export class UserService {
  APIUrl: any;
  constructor(private http : HttpClient) { 
    this.APIUrl = environment.apiUrl; 
    
  }
  
  
  getData(model: any, url:any, mode:any): any { 
    const httpHeaders :any = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('accept', 'application/json');
    httpHeaders.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    httpHeaders.append('Access-Control-Allow-Methods', 'GET, POST');
    // httpHeaders.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    if(mode=="POST")
    { 
      let body = this.serializeObj(model);
      return this.http.post(this.APIUrl + url, body, {headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'http://localhost:3003',})})

    }
  } 
private serializeObj(obj: any) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}
}
