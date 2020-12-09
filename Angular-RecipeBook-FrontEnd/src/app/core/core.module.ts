import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { SidebarModule } from 'ng-sidebar';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RibbonToastrComponent } from '../shared/utilities/ribbon-toastr/container/ribbon-toastr.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      toastComponent: RibbonToastrComponent,
    }),
    UiSwitchModule.forRoot({
      size: 'small',
    }),
    SidebarModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
