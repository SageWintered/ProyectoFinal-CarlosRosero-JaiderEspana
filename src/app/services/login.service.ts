import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = 'http://localhost:5069/Users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/login?username=${username}&password=${password}`);
  }

  register(username: string, password: string, email: string, rol: string): Observable<any> {
  const body = { username, password, email, rol };
  return this.http.post(this.apiUrl, body);
}


}
