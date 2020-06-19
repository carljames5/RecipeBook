import { Ingredient } from '../models/ingredient.model';

export class IngredientsService {
  private ingredients: Ingredient[] = [
    new Ingredient(1, 'Apple'),
    new Ingredient(2, 'Tomato'),
    new Ingredient(3, 'Meat'),
    new Ingredient(4, 'French Fries'),
    new Ingredient(5, 'Buns'),
  ];

  public getTheFirstTwoItems() {
    return this.ingredients.slice(0, 2);
  }

  public getIngredientIdByName(name: string): number {
    return this.ingredients.find(x => x.name.toLowerCase().trim() === name.toLowerCase().trim())?.id;
  }

  public getIngredientById(id: number): Ingredient {
    return this.ingredients.find(x => x.id === id);
  }

  public addIngredient(ingredient: Ingredient): Ingredient {
    ingredient.id = this.ingredients[this.ingredients.length - 1].id + 1;

    this.ingredients.push(ingredient);

    return ingredient;
  }
}
