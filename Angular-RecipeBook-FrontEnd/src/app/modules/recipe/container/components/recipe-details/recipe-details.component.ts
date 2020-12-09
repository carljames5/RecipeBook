import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MODULE_NAMES } from '../../../constants/module-names.constant';

import { RecipeService } from '../../../services/recipe.service';
import { AppHeaderService } from 'src/app/core/services/app-header.service';

import { RecipeModel } from '../../../models/recipe.model';
import { DeleteRecipeRequestModel } from '../../../models/request-models/delete-recipe-request.model';
import { GetRecipeByIdRequestModel } from '../../../models/request-models/get-recipe-by-id-request.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public recipe: RecipeModel;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private appHeaderService: AppHeaderService
  ) {}

  public ngOnInit(): void {
    this.appHeaderService.subTitle$.next(MODULE_NAMES['MAIN']);
    this.appHeaderService.mainTitle$.next(MODULE_NAMES['DETAILS']);

    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        const requestModel: GetRecipeByIdRequestModel = { id: +params['id'] } as GetRecipeByIdRequestModel;

        this.recipeService.getRecipeById(requestModel);
      }),
      this.recipeService.recipe$.subscribe((recipe: RecipeModel) => {
        this.recipe = recipe;
      }),
      this.recipeService.recipeItemDeleted$.subscribe(() => {
        this.router.navigate(['/recipes']);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onAddRecipeIngredientsToShoppingList(): void {
    this.recipeService.addRecipeIngredientsToShoppingList(this.recipe.ingredients);
  }

  public onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteRecipe(id: number): void {
    const requestModel: DeleteRecipeRequestModel = { id: id } as DeleteRecipeRequestModel;

    this.recipeService.deleteRecipe(requestModel);
  }
}
