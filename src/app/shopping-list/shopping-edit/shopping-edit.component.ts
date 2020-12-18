import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", {static: true}) nameInputRef : ElementRef;
  @ViewChild("amountInput", {static: true}) amountInputRef : ElementRef;

  constructor(private shoppinglistService : ShoppingListService) { }

  ngOnInit(): void {
  }

  add(){
    // this.shoppinglistService.ingredientAdded.emit({name: this.nameInputRef.nativeElement.value,
      // amount: this.amountInputRef.nativeElement.value});
    this.shoppinglistService.addIngredient({name: this.nameInputRef.nativeElement.value,
      amount: this.amountInputRef.nativeElement.value});
  }

}
