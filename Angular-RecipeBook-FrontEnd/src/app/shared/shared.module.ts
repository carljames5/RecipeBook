import { AvatarModule } from 'ngx-avatar';
import { SidebarModule } from 'ng-sidebar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeIconsModule } from './modules/fontawesome-icons.module';

import { DropDownDirective } from './directives/dropdown.directive';

import { FooterComponent } from './containers/footer/footer.component';
import { HeaderComponent } from './containers/header/header.component';
import { SideNavComponent } from './containers/sidebar/sidebar.component';
import { RibbonToastrComponent } from './containers/ribbon-toastr/ribbon-toastr.component';
import { LoadingSpinnerComponent } from './containers/loading-spinner/loading-spinner.component';
import { ClosedSidebarComponent } from './containers/sidebar/components/closed-sidebar/closed-sidebar.component';
import { OpenedSidebarComponent } from './containers/sidebar/components/opened-sidebar/opened-sidebar.component';
import { ClosedSidebarItemComponent } from './containers/sidebar/components/closed-sidebar/closed-sidebar-item/closed-sidebar-item.component';
import { OpenedSidebarItemComponent } from './containers/sidebar/components/opened-sidebar/opened-sidebar-item/opened-sidebar-item.component';
import { AuthorizedUserInformationComponent } from './containers/header/authorized-user-information/authorized-user-information.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DropDownDirective,
    RibbonToastrComponent,
    LoadingSpinnerComponent,
    SideNavComponent,
    ClosedSidebarComponent,
    ClosedSidebarItemComponent,
    OpenedSidebarComponent,
    OpenedSidebarItemComponent,
    AuthorizedUserInformationComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    DigitOnlyModule,
    NgxSpinnerModule,
    UiSwitchModule,
    FontAwesomeModule,
    SidebarModule,
    AvatarModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    DropDownDirective,
    HeaderComponent,
    FooterComponent,
    DigitOnlyModule,
    NgxSpinnerModule,
    LoadingSpinnerComponent,
    UiSwitchModule,
    FontAwesomeIconsModule,
    FontAwesomeModule,
    SideNavComponent,
    SidebarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [RibbonToastrComponent],
})
export class SharedModule {}
