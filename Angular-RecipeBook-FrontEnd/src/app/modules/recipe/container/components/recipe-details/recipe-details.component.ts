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
  private getRecipeByIdSubscription: Subscription;
  private recipeDeletedSubscription: Subscription;

  public recipe: GetRecipeByIdResponseModel;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getRecipeByIdSubscription = this.recipeService.getRecipeByIdSubject.subscribe(recipe => {
      this.recipe = recipe;
    });

    this.recipeDeletedSubscription = this.recipeService.deletedRecipeItemSubject.subscribe(() => {
      this.router.navigate(['/recipes']);
    });

    this.route.params.subscribe((params: Params) => {
      this.recipeService.getRecipeById(+params['id']);
    });
  }

  ngOnDestroy(): void {
    this.getRecipeByIdSubscription.unsubscribe();
    this.recipeDeletedSubscription.unsubscribe();
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
