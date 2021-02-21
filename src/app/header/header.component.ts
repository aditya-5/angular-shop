import { Component } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})

export class headerComponent{
  constructor(private dataStorageService : DataStorageService){}

  onSave(){
    this.dataStorageService.storeRecipes().subscribe(responseData=>{
      console.log("Data Saved")
    })
  }

  onFetch(){
      this.dataStorageService.fetchRecipes().subscribe();
  }


}
