import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import {
  getBadRequestMessage,
  getInternalServerErrorMessage,
  localizeException,
} from '../../shared/helpers/interceptors/error-handling.helper';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  private readonly _httpBadRequestStatusCode: number;

  constructor(private toastrService: ToastrService) {
    this._httpBadRequestStatusCode = 400;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(null, (err: any) => {
        if (err.status === this._httpBadRequestStatusCode) {
          if (err.error.ExceptionCode) {
            // For Custom Error Handling
            this.toastrService.error(localizeException(err.error.ExceptionCode), null, {
              titleClass: 'title error',
            });
          } else if (err.error.errors) {
            // For Validation Erorr Handling
            for (const propertyName of Object.keys(err.error.errors)) {
              this.toastrService.error(err.error.errors[propertyName]);
            }
          } else {
            // For 400 - Unknow Error
            this.toastrService.error(getBadRequestMessage(), null, { titleClass: 'title error' });

            console.log(err);
          }
        } else {
          this.toastrService.error(getInternalServerErrorMessage(), null, { titleClass: 'title error' });

          console.log(err);
        }
      })
    );
  }
}
