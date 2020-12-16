import { Component , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})

export class headerComponent{

  @Output() featureSelected = new EventEmitter<string>();

  // displayRecipes(){
  //   this.navbarClicked.emit('Recipe');
  //   console.log("Clicked recipe");
  // }
  //
  // displayList(){
  //   this.navbarClicked.emit('List');
  //   console.log("Clicked list");
  // }

  onSelect(feature: string){
    this.featureSelected.emit(feature)
  }
  constructor() {
  }



}
