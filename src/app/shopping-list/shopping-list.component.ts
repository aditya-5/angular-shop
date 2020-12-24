import { Component, OnInit , OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{

  ingredients: Ingredient[];
  private igChangeSub : Subscription;

  constructor( private shoppinglistService : ShoppingListService) { };

  addIng( ing: Ingredient ){
    this.ingredients.push(ing)
  }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIng();
    this.igChangeSub = this.shoppinglistService.ingredientAdded.subscribe((ing: Ingredient[])=> {
      this.ingredients = ing;
    });
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index : number){
      this.shoppinglistService.startedEditing.next(index)
  }

}
