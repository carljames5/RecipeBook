import { RecipeIngredient } from '../recipe-ingredient.model';

export class GetRecipeByIdResponseModel {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: RecipeIngredient[];

  constructor(id: number, name: string, description: string, imagePath: string, ingredients: RecipeIngredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
