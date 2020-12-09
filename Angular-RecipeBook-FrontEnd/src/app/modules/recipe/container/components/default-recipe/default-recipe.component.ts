import { Component, OnInit } from '@angular/core';

import { MODULE_NAMES } from '../../../constants/module-names.constant';

import { AppHeaderService } from 'src/app/core/services/app-header.service';

@Component({
  selector: 'app-default-recipe',
  templateUrl: './default-recipe.component.html',
  styleUrls: ['./default-recipe.component.scss'],
})
export class DefaultRecipeComponent implements OnInit {
  public constructor(private appHeaderService: AppHeaderService) {}

  public ngOnInit(): void {
    this.appHeaderService.subTitle$.next(MODULE_NAMES['MAIN']);
    this.appHeaderService.mainTitle$.next(MODULE_NAMES['LIST']);
  }
}
