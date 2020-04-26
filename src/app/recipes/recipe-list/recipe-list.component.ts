import { Component, Output, EventEmitter } from '@angular/core';

import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent{
  plusIcon: IconDefinition = faPlus;

  @Output() onRecipeSelectedHandler = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Test DesciptioneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeDesciptioneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg'),
    new Recipe('Test Recipe Two', 'Test Desciption', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg')
  ];

  onRecipeSelected(recipe: Recipe) {
    this.onRecipeSelectedHandler.emit(recipe);
  }
}
