import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  isEditMode =  false;
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute,
    private recipeService : RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
     // console.log(this.isEditMode);
      this.initForm();
    });
  }


  // Initalize the form
  private initForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.isEditMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // Checkng if recipe has ingredients
      if (recipe['ingredients']){
          for (let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount,
                  [Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)]
                  )
              })
            );
          }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    //   );

    // We can directly use formValue if you are sure object you are passing has valid Recipe format

    // console.log(this.recipeForm.value);

    if (this.isEditMode){
      this.recipeService.editRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.OnCancel();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup ({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,
          [ Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
    })
    );
  }


  // OnCance We want to go up 1 level
  OnCancel(){
    this.router.navigate(['../'], {relativeTo : this.route});
  }

  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
