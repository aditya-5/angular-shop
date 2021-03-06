import { Component, OnInit , Input} from '@angular/core';
import { Recipe }  from "../../recipe.model";
import { RecipeService } from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  index: number;
  recipes: Recipe[];

  constructor(private recipeService : RecipeService){

  }

  ngOnInit() {

    this.recipes = this.recipeService.getRecipes();
    this.index = this.recipes.indexOf(this.recipe);
    this.recipeService.recipesChanged.subscribe(
      (neww: Recipe[]) => {
           this.recipes = neww ;
           this.index = this.recipes.indexOf(this.recipe);
       });
  }





}
