import {Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import { AuthService} from "./auth.service";
import {LoadingSpinnerComponent} from "../shared/loading-spinner.component"
import { Router} from "@angular/router"

@Component({
  selector: "app-auth",
  templateUrl : "./auth.component.html"
})
export class AuthComponent{
  isLoginMode = false;
  isLoading = false;
  err:string = null;

  constructor(private authService : AuthService, private router:Router){

  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    this.isLoading = true;

    if(!this.isLoginMode){
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signup(email, password).subscribe((resData)=>{
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      }, errorMessage=>{
        console.log(errorMessage);
        this.err = errorMessage;
        this.isLoading = false;
      })
      form.reset();
    }
    else{
      //Login
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signin(email, password).subscribe(resData=>{
        this.isLoading = false;
        console.log('sd')
        this.router.navigate(["/recipes"]);
      }, errorMessage=>{
        console.log(errorMessage);
        this.err = errorMessage;
        this.isLoading = false;
        setInterval(()=>{
          this.err = null;
        },5000)
      })
    }

    }
}
