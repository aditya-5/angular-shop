import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { BehaviorSubject} from "rxjs";
import { User} from "./user.model"
import { Router } from '@angular/router';

interface AuthResponseData{

}

@Injectable(
  {
    providedIn:'root'
  }
)
export class AuthService{
  tokenExpirationTimer:any;
  user = new BehaviorSubject<User>( null);
  constructor(private http: HttpClient, private router: Router){

  }

  signup(email: string, password: string){
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGztpF4cUTU7XmTR843O-oBr2pCvHQIJk", {email:email, password:password, returnSecureToken	: true}).pipe(
      catchError(errorRes => {
        let errorMessage = "An Unknown Error Occurred";
        if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
          case "EMAIL_EXISTS": errorMessage = 'The email already exists';
        }
        return throwError(errorMessage);
      }), tap(resData => {
        this.handleAuthentication(resData);
      })
    )
  }


  signin(email: string, password: string){
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGztpF4cUTU7XmTR843O-oBr2pCvHQIJk",{email:email, password:password,returnSecureToken:true}).pipe(
      catchError(errorRes => {
        let errorMessage = "An Unknown Error Occurred";
        if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
          case "EMAIL_NOT_FOUND": {errorMessage = 'The email couldn"t be found';
          break;}
          case "INVALID_PASSWORD": {errorMessage = 'Incorrect Password';
          break;

          }
        }
        return throwError(errorMessage);
      }), tap(resData => {
        this.handleAuthentication(resData);
      })
    );

  }

  logout(){
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData){
      return;
    }
    else{
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if(loadedUser.token){
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        console.log(userData._tokenExpirationDate);
        console.log(new Date().getTime());
        console.log(new Date(userData._tokenExpirationDate).getTime());
        this.user.next(loadedUser);
        this.autoLogout(expirationDuration);
      }

    }
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(()=>{this.logout()},expirationDuration)
  }


    handleAuthentication(resData){
      const expirationDate = new Date(new Date().getTime()+ +resData.expiresIn*1000);
      const user = new User(resData.email,resData.localId,resData.idToken, expirationDate);
      this.user.next(user);
      this.autoLogout(+resData.expiresIn*1000)
      localStorage.setItem("userData", JSON.stringify(user))
    }
}
