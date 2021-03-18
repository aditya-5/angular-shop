import { Component, OnInit ,OnDestroy} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService } from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})

export class headerComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isAuthenticated : boolean = false;
  constructor(private dataStorageService : DataStorageService, private authService : AuthService){}


  onSave(){
    this.dataStorageService.storeRecipes().subscribe(responseData=>{
      console.log("Data Saved")
    })
  }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !user ? false: true;
    });

  }

  ngOnDestroy(){
    this.userSub .unsubscribe()
  }

  onFetch(){
      this.dataStorageService.fetchRecipes().subscribe();
  }

  logout(){
    this.authService.logout();
  }


}
