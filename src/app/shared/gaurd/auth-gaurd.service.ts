import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AccessPrevilegeService } from '../services/access-previlege.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate    {
  constructor(private access:AccessPrevilegeService , private router:Router) { }
  canActivate( routeData: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any   {
    let roleData = routeData.data;
    let previlege = this.access.getPrevileges();

    if(previlege[roleData.module]=='denied'){
      this.router.navigate(['/error/401']);
      return false;
    }else {
      return true;
    }
  }
}