import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

 @Input() recipe : Recipe;
 @Input() index : number;

  ngOnInit(): void {

  }

}


// Old code with event @Input and @Output

// export class RecipesItemComponent implements OnInit {

//   @Input() recipe : Recipe;

//   constructor() { }
//    ngOnInit(): void {
//    }

//    @Output() recipeSelected = new EventEmitter<void>();

//    onSelected(){
//        this.recipeSelected.emit();
//    }

//  }
