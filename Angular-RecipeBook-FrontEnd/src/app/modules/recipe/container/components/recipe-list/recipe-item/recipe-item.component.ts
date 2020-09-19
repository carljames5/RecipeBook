import { Component, Input } from '@angular/core';

import { GetAllRecipeListItemResponseModel } from 'src/app/modules/recipe/models/response-models/get-all-recipe-list-item-response.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipe: GetAllRecipeListItemResponseModel;
  @Input() index: number;
}
