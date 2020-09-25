import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DropDownDirective } from './directives/dropdown.directive';
import { FooterComponent } from './containers/footer/footer.component';
import { NavBarComponent } from './containers/nav-bar/nav-bar.component';
import { FontAwesomeIconsModule } from './modules/fontawesome-icons.module';
import { RibbonToastrComponent } from './containers/ribbon-toastr/ribbon-toastr.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, DropDownDirective, RibbonToastrComponent],
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HttpClientModule, DigitOnlyModule],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    DropDownDirective,
    NavBarComponent,
    FooterComponent,
    FontAwesomeIconsModule,
    DigitOnlyModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [RibbonToastrComponent],
})
export class SharedModule {}
