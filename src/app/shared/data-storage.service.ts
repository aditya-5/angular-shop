import {Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {tap , take, exhaustMap, map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import { pipe } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class DataStorageService {

  constructor(private http: HttpClient, private recipeService : RecipeService, private authService:AuthService){

  }

  storeRecipes(){
    // token = null;
    const recipes = this.recipeService.getRecipes();
    return this.http.put("https://ng-course-recipe-book-62fb6-default-rtdb.firebaseio.com/recipes.json",
    recipes);
  }

  fetchRecipes(){
      return this.http.get<Recipe[]>("https://ng-course-recipe-book-62fb6-default-rtdb.firebaseio.com/recipes.json")
    .pipe(
        tap(
          (responseData:any)=>{
            const postsArray = [];
            for(const key in responseData){
              postsArray.push(responseData[key])}
            this.recipeService.fetchRec(postsArray);
          }
        ))
      ;
  }

}
