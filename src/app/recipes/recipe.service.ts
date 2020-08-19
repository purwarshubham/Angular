import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

  // recipesSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService : ShoppingListService){}

  // private recipes : Recipe[] = [
  //   new Recipe(
  //     'Panner Tikka',
  //     'This is the description of the test recipe 1',
  //     'https://www.cookwithmanali.com/wp-content/uploads/2015/07/Restaurant-Style-Recipe-Paneer-Tikka.jpg',
  //     [
  //       new Ingredient('paneer',20),
  //       new Ingredient('capsicum',2),
  //       new Ingredient('curd',1)
  //     ]
  //     ),
  //   new Recipe(
  //     'Chicken Tikka',
  //     'This is the description of the test recipe 2',
  //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.616.462.suffix/1568222255998.jpeg',
  //     [
  //       new Ingredient('chicken', 2),
  //       new Ingredient('french fries',20)
  //     ]
  //     ),
  //     new Recipe(
  //       'Pizza',
  //       'This is the description of the test recipe 3',
  //       'https://b.zmtcdn.com/data/pictures/4/90384/ba50a5176f9b3abf84a4b734543474a2.jpg?output-format=webp',
  //       [
  //         new Ingredient('Capsicum', 5),
  //         new Ingredient('corn',2),
  //         new Ingredient('cheese',3)
  //       ]
  //       )
  // ];

  private recipes : Recipe[] = [];

  getRecipes(){
  return this.recipes.slice();
  }

  getRecipe( index : number){
    return this.recipes.slice()[index];
  }

  // overriding the recipies  and informing the interseted components using emitter
  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  editRecipe(index : number, recipe : Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
