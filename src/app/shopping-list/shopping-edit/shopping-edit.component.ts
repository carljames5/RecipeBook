import { faPlus, faTrashAlt, faSyncAlt, IconDefinition, faEraser  } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingEditValidator } from './validators/shopping-edit-validators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private editingSubscription: Subscription;
  
  public plusIcon: IconDefinition = faPlus;
  public trashIcon: IconDefinition = faTrashAlt;
  public clearIcon: IconDefinition = faEraser;
  public updateIcon: IconDefinition = faSyncAlt;
  
  public shoppingEditForm: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'name': new FormControl(null, Validators.required),
    'amount': new FormControl(null, [Validators.required, ShoppingEditValidator.amountValidator, ShoppingEditValidator.maxAmountValueValidator])
  })

  public get id(): AbstractControl {
    return this.shoppingEditForm.get('id');
  }

  public get name(): AbstractControl {
    return this.shoppingEditForm.get('name');
  }

  public get amount(): AbstractControl {
    return this.shoppingEditForm.get('amount');
  }

  constructor(private shoppingListService: ShoppingListService) { }
    
  ngOnInit(): void {
    this.editingSubscription = this.shoppingListService.ingredientEditing.subscribe((id) => {
      const selectedIngredient = this.shoppingListService.getIngredientById(id);

      this.shoppingEditForm.setValue({
        'id': selectedIngredient.id,
        'name': selectedIngredient.name,
        'amount': selectedIngredient.amount
      })
    });
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }

  onCreateOrUpdateItem(): void {
    if (this.id.value !== null) {
      this.shoppingListService.updateIngredient(this.createIngredientObjectFromInputFileds());
    } else {
      this.shoppingListService.addIngredient(this.createIngredientObjectFromInputFileds());
    }

    this.shoppingEditFormReset();
  }

  private createIngredientObjectFromInputFileds(): Ingredient {
    return new Ingredient(
      this.name.value, 
      this.amount.value,
      this.id.value);
  };

  private shoppingEditFormReset(): void {
    this.shoppingEditForm.reset();
  }
}
