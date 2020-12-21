import {Ingredient} from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

  ingredientAdded =  new Subject<Ingredient[]>();


  private ingredients: Ingredient[] = [
    new Ingredient('Penne', 4),
    new Ingredient('Mayonnaise', 10)
  ];



  getIng(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice())
  }

  addIngToBag(ingredients : Ingredient[]){
    for ( let ing of ingredients){
      this.ingredients.push(ing);
      this.ingredientAdded.next(this.ingredients.slice())
    }

  }

}
