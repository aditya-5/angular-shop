import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable } from "rxjs";
import {Injectable} from "@angular/core";
import {Recipe } from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";
@Injectable({
  providedIn:'root'
})

export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService :  DataStorageService, private recipeService:RecipeService){
  }

  resolve (route : ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("started resolving");
    const newRec = this.dataStorageService.fetchRecipes();
    const rec = this.recipeService.getRecipes();
    if(rec.length === 0)
    return newRec;
    else
    return rec;
  }
}
