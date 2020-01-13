import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  constructor(private http: HttpClient, private router: Router, private alert: AlertService) { }

  login(data){
    let token = { headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})}
    this.http.post(this.url+'login', data, {}).subscribe(response => {
      if(response['status'] == 'success' ){
        const helper = new JwtHelperService();
        localStorage.setItem('sha_token', response['token']);
        let decoded = helper.decodeToken(response['token']);
        localStorage.setItem('roles', decoded.roles);
        localStorage.setItem('userId', decoded.userId);
        this.router.navigate ( [ '/' ] );
      }
    }, error => {    
      this.alert.error(error.error.msg)
    })
  }

}
