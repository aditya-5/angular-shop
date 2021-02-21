import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable } from "rxjs";
import {Injectable} from "@angular/core";
import {Recipe } from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";

@Injectable({
  providedIn:'root'
})

export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService :  DataStorageService){
  }

  resolve (route : ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("started resolving");
    return this.dataStorageService.fetchRecipes();
  }
}
