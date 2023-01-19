import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient ) { }

  login(user: User){
    return this.httpClient.post(`${this.baseURL}/${'login'}`,user)
     }

  
}
