import { Component, OnInit, ViewChild , Output, EventEmitter, ElementRef} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", {static: true}) nameInputRef : ElementRef;
  @ViewChild("amountInput", {static: true}) amountInputRef : ElementRef;

  constructor() { }

  @Output() ingredient = new EventEmitter< Ingredient >()

  ngOnInit(): void {
  }

  add(){
    this.ingredient.emit({name: this.nameInputRef.nativeElement.value,
      amount: this.amountInputRef.nativeElement.value});
  }

}
