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

@NgModule({
  declarations: [NavBarComponent, FooterComponent, DropDownDirective],
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
})
export class SharedModule {}
