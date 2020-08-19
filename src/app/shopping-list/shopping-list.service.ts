
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService{

// ingredientChanged = new EventEmitter<Ingredient[]>();
 ingredientChanged = new Subject<Ingredient[]>();

 startedEditing = new Subject<number>();

 private ingredients : Ingredient[] = [
    new Ingredient('Apples',8),
    new Ingredient('Tomato', 10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index : number){
    return this.ingredients[index];
  }

  addIngredient(ing : Ingredient){
    this.ingredients.push(ing);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  editIngredient(index : number, ing : Ingredient){
    this.ingredients[index] =  ing;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index : number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  // Comment line will emit a lot of event here

   addIngredients(ingretients : Ingredient[]){
  //    for(let ingredient of ingretiens){
  //      this.OnIngredientAdded(ingredient);
          this.ingredients.push(...ingretients); // conert array to list and insert all item individually
          this.ingredientChanged.next(this.ingredients.slice());
     }
}
