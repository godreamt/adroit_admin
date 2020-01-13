import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  success(message) {
    this.toastr.success(message, 'Success', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    })
  }

  error(message) {
    this.toastr.error(message, 'Failed!', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    })
  }

  
  showSuccess(message) {
    this.toastr.success(message, 'Success!', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    })
  }

  showApiError(error) {
    let message ="";
    error = error.error;
    if(error.hasOwnProperty('errors')) {
        error = error.errors;
        message = error[Object.keys(error)[0]]
    }else {
        message = error[0];
    }
    this.toastr.error(message, 'Failed!', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    })
  }

}
