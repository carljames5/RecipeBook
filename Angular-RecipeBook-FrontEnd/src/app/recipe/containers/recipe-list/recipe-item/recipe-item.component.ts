import { Component, Input } from '@angular/core';
import { GetRecipeByIdResponseModel } from 'src/app/recipes/models/response-models/get-recipe-by-id-response.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipe: GetRecipeByIdResponseModel;
  @Input() index: number;
}
