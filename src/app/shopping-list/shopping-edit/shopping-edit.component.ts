import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm : NgForm;

  subscription : Subscription;
  editMode = false ;
  itemIndexNumber : number ;
  editedItem : Ingredient;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    // console.log("called");
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index : number)  => {
     // console.log("Sunscription called");
      this.editMode = true;
      this.itemIndexNumber = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
       name: this.editedItem.name,
       amount: this.editedItem.amount
      })
    });
  }

  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.shoppingListService.editIngredient( this.itemIndexNumber ,newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.itemIndexNumber);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}




// Code with Input nad ouput

// import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
// import { Ingredient } from 'src/app/shared/ingredient.model';

// @Component({
//   selector: 'app-shopping-edit',
//   templateUrl: './shopping-edit.component.html',
//   styleUrls: ['./shopping-edit.component.css']
// })

//export class ShoppingEditComponent implements OnInit {



//  @ViewChild('nameInput') nameInputRef : ElementRef ;
//  @ViewChild('amountInput') amountInputRef : ElementRef ;

//  // @Output() ingredient = new EventEmitter< { name : string, amount : number }>();
//  @Output() ingredientAdded = new EventEmitter<Ingredient>();

//   constructor() { }

//   ngOnInit(): void {
//   }
//   onAddItem(){
//     const ingName = this.nameInputRef.nativeElement.value ;
//     const ingAmount = this.amountInputRef.nativeElement.value ;
//     const newIngredient = new Ingredient(ingName, ingAmount);
//     this.ingredientAdded.emit(newIngredient);
//   }
// }
