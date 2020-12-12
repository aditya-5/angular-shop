import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model"

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Pasta", "It is super tasty", "https://pngimg.com/uploads/pasta/pasta_PNG58.png")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
