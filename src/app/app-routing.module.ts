import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailsComponent } from './recipes/recipes-details/recipes-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesServiceResolver } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

// Routes is simply javascript object which each object represent routes
const appRoutes : Routes = [
    // here path will be displayed in url and allow us to go to that route  and
    // component is component which get loaded when we visit recipes
      { path : '', redirectTo : '/recipes', pathMatch : 'full' },
      { path : 'recipes', component : RecipesComponent, canActivate : [AuthGuard], children : [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent},
        { path: ':id', component: RecipesDetailsComponent, resolve: [RecipesServiceResolver]},
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesServiceResolver]}
    ]},
    { path : 'shopping-list', component : ShoppingListComponent },
    { path : 'auth', component : AuthComponent }
]

// NgModule is used to Transform this normal class to Angular Module
@NgModule({

  //import RouterModule and Register your appRoutes
  imports : [RouterModule.forRoot(appRoutes)],

  // Currently we are in our extra module and want it to our main module, we have to export this
  exports: [RouterModule]

  // After this go to the App module and in the Imports array, import this Class
})

export class AppRoutingModule{

}
