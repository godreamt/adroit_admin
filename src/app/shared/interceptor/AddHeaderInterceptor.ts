import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  
  export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      // Clone the request to add the new header
      const clonedRequest = req.clone({ headers: req.headers.set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('sha_token')) });
  
      // Pass the cloned request instead of the original request to the next handle.set('Accept', 'application/json')
      return next.handle(clonedRequest);
    }
  }