import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators"
interface AuthResponseData{

}

@Injectable(
  {
    providedIn:'root'
  }
)
export class AuthService{

  constructor(private http: HttpClient){

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
      })
    );

  }
}
