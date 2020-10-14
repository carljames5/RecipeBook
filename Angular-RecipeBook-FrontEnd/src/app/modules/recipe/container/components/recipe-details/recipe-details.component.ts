import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../../../services/recipe.service';
import { GetRecipeByIdResponseModel } from '../../../models/response-models/get-recipe-by-id-response.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public recipe: GetRecipeByIdResponseModel;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(this.recipeService.getRecipeByIdSubject.subscribe(recipe => {
      this.recipe = recipe;
    }));

    this.subscriptions.push(this.recipeService.deletedRecipeItemSubject.subscribe(() => {
      this.router.navigate(['/recipes']);
    }));

    this.route.params.subscribe((params: Params) => {
      this.recipeService.getRecipeById(+params['id']);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onAddRecipeIngredientsToShoppingList() {
    this.recipeService.addRecipeIngredientsToShoppingList(this.recipe.ingredients);
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id);
  }
}
