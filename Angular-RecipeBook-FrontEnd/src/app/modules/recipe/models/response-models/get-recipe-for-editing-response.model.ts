import { EditRecipeIngredientListItemResponseModel } from './edit-recipe-ingredient-list-item-response.model';

export interface GetRecipeForEditingResponseModel {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: EditRecipeIngredientListItemResponseModel[];
}
