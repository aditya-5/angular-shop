import {Recipe} from "./recipe.model";
import { EventEmitter } from "@angular/core"
import {Ingredient} from "../shared/ingredient.model"
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Arabiata Pasta",
    "It is prepared by frying onions in oil",
    "https://pngimg.com/uploads/pasta/pasta_PNG58.png",
  [new Ingredient('Penne', 500), new Ingredient('Mayonnaise', 100)]),
  new Recipe("Alfredo Pasta",
  "It is prepared by heating up oil and using white flour",
  "https://i0.wp.com/aartimadan.com/wp-content/uploads/2020/07/White-Sauce-Pasta.jpg?w=1000&ssl=1",
[new Ingredient('Fusilli', 300), new Ingredient('Milk', 100)])

  ];

  getRecipes(){
    return this.recipes.slice();
  }

}
