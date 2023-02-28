import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('api.apilayer.com/currency_data/')) {
      const paramReq = req.clone({
        setHeaders: {
          apikey: `SOSVMzx4PGPXDFOANNBAZ0q5ls0g9jNI`,
        },
      });
      return next.handle(paramReq);
    } else {
      return next.handle(req);
    }
  }
}
