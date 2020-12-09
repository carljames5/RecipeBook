import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { CoreAuthenticationService } from '../services/core-authentication.service';
import {
  getBadRequestMessage,
  getInternalServerErrorMessage,
  localizeException,
} from '../helpers/interceptors/error-handling-interceptor.helper';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  private readonly _httpBadRequestStatusCode: number;
  private readonly _httpUnauthorizedStatusCode: number;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private coreAuthenticationService: CoreAuthenticationService
  ) {
    this._httpBadRequestStatusCode = 400;
    this._httpUnauthorizedStatusCode = 401;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(null, (err: any) => {
        if (err.status === this._httpUnauthorizedStatusCode) {
          // For Unauthorized Error Handling
          this.coreAuthenticationService.signOut();
          this.router.navigate(['/sign-in']);
        } else if (err.status === this._httpBadRequestStatusCode) {
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
            this.toastrService.error(getBadRequestMessage(), null, {
              titleClass: 'title error',
            });

            console.log(err);
          }
        } else {
          this.toastrService.error(getInternalServerErrorMessage(), null, {
            titleClass: 'title error',
          });

          console.log(err);
        }
      })
    );
  }
}
