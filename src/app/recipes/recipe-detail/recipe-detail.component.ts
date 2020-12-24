import { Component, OnInit} from '@angular/core';
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service"
import { Router, ActivatedRoute, Params }  from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe: Recipe;
  constructor(private slService : ShoppingListService,
  private router : Router, private route : ActivatedRoute,
private recipeService : RecipeService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getSelectedRecipe(id)
    this.route.params.subscribe((params: Params)=>{
      this.recipe = this.recipeService.getSelectedRecipe(+params['id'])
    })
  }

  addToBag(){
    this.slService.addIngToBag(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    console.log('ss')
    const id = +this.route.snapshot.params['id'];
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['/recipes']);
  }
}
