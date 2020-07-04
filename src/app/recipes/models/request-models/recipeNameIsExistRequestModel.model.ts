export class RecipeNameIsExistRequestModel {
  public recipeId: number;
  public recipeName: string;

  constructor(recipeId: number, recipeName: string) {
    this.recipeId = recipeId ?? 0;
    this.recipeName = recipeName;
  }
}
