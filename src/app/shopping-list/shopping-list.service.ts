import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {

  ingredientAdded =  new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Penne', 4),
    new Ingredient('Mayonnaise', 10)
  ];

  getIngredient(index: number){
    return this.ingredients[index];
  }

  getIng(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice())
  }

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice())
  }

  addIngToBag(ingredients : Ingredient[]){
    for ( let ing of ingredients){
      this.ingredients.push(ing);
      this.ingredientAdded.next(this.ingredients.slice())
    }
}
  onDeleteIng(index:number){
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice())
  }



}
