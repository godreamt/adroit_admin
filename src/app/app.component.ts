import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(translate: TranslateService, private router: Router, private loadingBarService: LoadingBarService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    this.tokenCheck();

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  tokenCheck() {
      this.router.events.subscribe(response => {
        if(response instanceof NavigationEnd) {

          this.loadingBarService.start();
          setTimeout(() => {
            this.loadingBarService.stop();
          }, 2500)
          if(this.router.url.indexOf('/authentication/signin') >= 0){
            localStorage.removeItem('sha_token');
          }
          let token = localStorage.getItem('sha_token');
          if(token == null){     
            if(this.router.url.indexOf('forgot') < 0 && this.router.url.indexOf('volunteer-request') < 0 && this.router.url.indexOf('/authentication/signin') < 0){
              this.router.navigate(['/authentication/signin'])
            }
          }else {
            const helper = new JwtHelperService();          
            const isExpired = helper.isTokenExpired(token);
            if(isExpired){
              this.router.navigate(['/authentication/signin'])
            }
          }
        }
      })
  }
}
