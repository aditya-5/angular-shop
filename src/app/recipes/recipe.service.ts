import {Recipe} from "./recipe.model";
import { EventEmitter } from "@angular/core"

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Pasta", "It is super tasty", "https://pngimg.com/uploads/pasta/pasta_PNG58.png")
  ];

  getRecipes(){
    return this.recipes.slice();
  }

}
