import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {

  recipe : Recipe;
  id : number ;

  constructor(private recipeService : RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  // Since we know we change id frequently by selecting left side recipeList,
  // So below approach wont work, we have to subcribe id if we want to change the item as per params
  //  const id = +this.route.snapshot.params['id'];
  //  this.recipe = this.recipeService.getRecipe(this.id);

  // Here params is observables, we will subscribe it and we can react to any changes in our route params
  // Now Id we get will help to identify the recipe
  this.route.params.subscribe((params : Params) => {
     this.id = +params['id'];
     this.recipe = this.recipeService.getRecipe(this.id);
   });

  }

  onAddToShoppingList(){
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditItem(){
   this.router.navigate(['edit'], {relativeTo: this.route});
   // this.router.navigate(['../', this.id ,'edit'], {relativeTo : this.route});
  }

  OnDeleteItem(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
