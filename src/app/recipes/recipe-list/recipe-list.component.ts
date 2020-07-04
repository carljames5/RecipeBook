import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeService } from '../services/recipe.service';
import { GetAllRecipeItemResponseModel } from '../models/response-models/getAllRecipeItemResponseModel.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public plusIcon: IconDefinition = faPlus;

  private recipesChangedSubscription: Subscription;
  private recipeAddedSubscription: Subscription;
  private recipeUpdatedSubscription: Subscription;
  private recipeDeletedSubscription: Subscription;

  public recipes: GetAllRecipeItemResponseModel[];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: GetAllRecipeItemResponseModel[]) => {
        this.recipes = recipes;
      }
    );

    this.recipeAddedSubscription = this.recipeService.recipeAdded.subscribe(() => {
      this.recipeService.getAllRecipe();
    });

    this.recipeUpdatedSubscription = this.recipeService.recipeUpdated.subscribe(() => {
      this.recipeService.getAllRecipe();
    });

    this.recipeDeletedSubscription = this.recipeService.recipeDeleted.subscribe(() => {
      this.recipeService.getAllRecipe();
    });

    this.recipeService.getAllRecipe();
  }

  public ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
    this.recipeAddedSubscription.unsubscribe();
    this.recipeUpdatedSubscription.unsubscribe();
    this.recipeDeletedSubscription.unsubscribe();
  }

  public onCreateRecipe() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
