import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];

  private igChangeSub : Subscription;

  constructor(private shoppingListService : ShoppingListService) { }


  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

}

// code with input and output

// export class ShoppingListComponent implements OnInit {

//   ingredients : Ingredient[] = [
//     new Ingredient('Apples',8),
//     new Ingredient('Tomato', 10)
//   ];

//   constructor() { }

//   ngOnInit(): void {
//   }

//   OnIngredientAdded(ing : Ingredient){
//     this.ingredients.push(ing);
//   }

// }
