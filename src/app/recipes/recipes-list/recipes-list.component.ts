import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  subscription : Subscription;

  constructor( private recipeService : RecipeService,
    private router : Router,
    private route : ActivatedRoute) { }

  recipes : Recipe[];

  ngOnInit(){
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes : Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  onAddItem(){
    this.router.navigate(['new'], {relativeTo : this.route});
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}

// Code with @Input and @Output

// export class RecipesListComponent implements OnInit {

//   @Output() recipeWasSelected = new EventEmitter<Recipe>();

//   constructor( private recipeService : RecipeService) { };

//   recipes : Recipe[];

//   ngOnInit(){
//     this.recipes = this.recipeService.getRecipes();
//   }


//   onRecipeSelected(recipe: Recipe){
//       this.recipeWasSelected.emit(recipe);
//   }

// }
