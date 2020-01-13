import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private router: Router) { }

  notificationClick(item) {

    switch(item.notificationType) {
      case 'shift-plan' :
          this.router.navigate(['/shift-plan/'+item.data]);
        break;
      case "volunteer_registration":
          this.router.navigate(['/user/requested-volunteers/'+item.data]);
        break;
      case "volunteer_added":
          this.router.navigate(['/core/event/list/'+item.data]);
        break;
      case "swap_emp_req":
          this.router.navigate(['/shift-plan/swap-request/'+item.data]);
        break;
      case "swap_emp_resp":
          this.router.navigate(['/shift-plan/'+item.data]);
        break;
    }
  }
}
