import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService{

 // user = new Subject<User>();

 token : string = null;
 user = new BehaviorSubject<User>(null);
 private tokenExpirationTimer : any ;

  constructor (private http : HttpClient,
    private router : Router){}

  signup(email : string, password : string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtIu93haZcwCNLAd8XH10nKALH_TmJrEw",
        {
          email : email,
          password : password,
          returnSecureToken : true
        }).pipe(
            catchError(this.handleError),
            tap(respData => this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn))
            );
  }

  signin(email : string, password : string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtIu93haZcwCNLAd8XH10nKALH_TmJrEw",
        {
          email : email,
          password : password,
          returnSecureToken : true
        }).pipe(
          catchError(this.handleError),
          tap(respData => this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn))
          );
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn : number){
    const expirationDate  = new Date( new Date().getTime() + expiresIn * 1000 );
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user); // emitter

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes : HttpErrorResponse){
      let errorMessage = 'An unknown error occured';
      console.log(errorRes);
      if ( !errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'The email already exist';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many attempts, Please try after some time';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'The email is inavlid';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The Password is inavlid';
          break;
      }
      return throwError(errorMessage);
    }


    autoLogin(){
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if(!userData){
        return ;
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate) );

      if (loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }

    autoLogout(expirationDuration : number){
      console.log("token expiration duration - " + expirationDuration );
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration);
    }


    logout(){
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }
}

