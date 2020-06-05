import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5, 1),
        new Ingredient('Tomato', 10, 2)
    ];

    public ingredientsChanged = new Subject<Ingredient[]>();
    public ingredientEditing = new Subject<number>();

    public addIngredient(ingredient: Ingredient): void {
        const ingredientIndex = this.getIngredientIndexByName(ingredient);

        if(ingredientIndex !== -1) {
            let modifiedIngredient = this.getIngredientById(ingredient.id);
            modifiedIngredient.amount += ingredient.amount;

            this.ingredients[ingredientIndex] = modifiedIngredient;
        } else {
            ingredient.id = this.ingredients[this.ingredients.length - 1].id + 1;
    
            this.ingredients.push(ingredient);
        }

        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public addIngredients(ingredients: Ingredient[]): void {
        ingredients.forEach(item => {
            const ingredientIndex = this.getIngredientIndexById(item);

            if(ingredientIndex !== -1) {
                let updatedIngredient = this.getIngredientById(item.id);
                updatedIngredient.amount += item.amount;
                
                this.ingredients[ingredientIndex] = updatedIngredient;
            } else {
                this.ingredients.push(item);
            }
        });

        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public updateIngredient(updatedIngredient: Ingredient): void {
        const updatedIngredientIndex = this.getIngredientIndexById(updatedIngredient);
        
        if (updatedIngredientIndex !== -1) {
            this.ingredients[updatedIngredientIndex] = updatedIngredient;
            
            this.ingredientsChanged.next(this.ingredients.slice());
        }
    }
    
    public deleteIngredient(id: number): void {
        const deleteIngredientIndex = this.getIngredientIndexById(this.getIngredientById(id));
        
        if (deleteIngredientIndex !== -1) {
            this.ingredients.splice(deleteIngredientIndex, 1);
            
            this.ingredientsChanged.next(this.ingredients.slice());
        }
    }
    
    public getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    public getIngredientById(id: number) : Ingredient {
        return this.ingredients.find(x => x.id == id);
    }

    private getIngredientIndexById(ingredient: Ingredient) {
        return this.ingredients.findIndex(x => x.id === ingredient.id);
    }

    private getIngredientIndexByName(ingredient: Ingredient) {
        return this.ingredients.findIndex(x => x.name.toLowerCase().trim() === ingredient.name.toLowerCase().trim());
    }
}