import {Ingredient} from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {

  ingredientAdded =  new EventEmitter<Ingredient>();


  private ingredients: Ingredient[] = [
    new Ingredient('Penne', 4),
    new Ingredient('Mayonnaise', 10)
  ];



  getIng(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice())
  }
}
