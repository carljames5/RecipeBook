import { Component } from '@angular/core';
import { AppHeaderService } from 'src/app/core/services/app-header.service';
import { MODULE_NAMES } from '../../../constants/module-names.constant';

@Component({
  selector: 'app-default-recipe',
  templateUrl: './default-recipe.component.html',
  styleUrls: ['./default-recipe.component.scss'],
})
export class DefaultRecipeComponent {
  constructor(private appHeaderService: AppHeaderService) {
    this.appHeaderService.subTitle$.next(MODULE_NAMES['MAIN']);
    this.appHeaderService.mainTitle$.next(MODULE_NAMES['LIST']);
  }
}
