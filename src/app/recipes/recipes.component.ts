import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe : Recipe;

  // Injecting service which will be used by html file to decide to show the template. it will
  // decide whether we selected any recipe or not

  constructor( private recipeService : RecipeService) { }

  ngOnInit(): void { }
}

// op and ip

// export class RecipesComponent implements OnInit {

//   selectedRecipe : Recipe;

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
