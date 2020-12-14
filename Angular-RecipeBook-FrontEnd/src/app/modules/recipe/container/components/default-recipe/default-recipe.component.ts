import { Component, OnInit } from '@angular/core';

import { MODULE_NAMES } from '../../../constants/module-names.constant';

import { AppHeaderService } from 'src/app/shared/utilities/header/services/app-header.service';

@Component({
  selector: 'app-default-recipe',
  templateUrl: './default-recipe.component.html',
  styleUrls: ['./default-recipe.component.scss'],
})
export class DefaultRecipeComponent implements OnInit {
  public constructor(private appHeaderService: AppHeaderService) {}

  public ngOnInit(): void {
    this.appHeaderService.setTitles(MODULE_NAMES['LIST'], MODULE_NAMES['MAIN']);
  }
}
