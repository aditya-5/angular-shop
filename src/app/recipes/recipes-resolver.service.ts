import {Resolve, ActivatedRouteSnapshort, RouterStateSnapshot} from "@angular/router";
import {Observable } from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Recipe } from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
@Injectable({
  providedIn:'root'
})

export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService :  DataStorageService){

  }
}
