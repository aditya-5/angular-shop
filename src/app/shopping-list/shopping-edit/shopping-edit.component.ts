import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";
import { NgForm, FormGroup } from "@angular/forms";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static:false}) slForm: FormGroup;
  subscription :Subscription;
  editMode = false;
  editingItemIndex : number;
  editedItem : Ingredient;

  constructor(private shoppinglistService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startedEditing.subscribe((index:number)=>
  {
    this.editMode = true;
    this.editingItemIndex = index
    this.editedItem = this.shoppinglistService.getIngredient(index)
    this.slForm.setValue({
      name : this.editedItem.name,
      amount : this.editedItem.amount
    })
  })
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.shoppinglistService.updateIngredient(this.editingItemIndex, newIngredient);
    }
    else{
      this.shoppinglistService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.shoppinglistService.onDeleteIng(this.editingItemIndex);
    this.onClear();
  }


}
