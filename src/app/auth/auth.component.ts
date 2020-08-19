
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'

})

export class AuthComponent{

  isLoginMode = true ;
  isLoading = false ;
  error : string = null;


  constructor(private authService: AuthService,
    private router : Router){}

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }

  onSubmit(authForm : NgForm){

    const email = authForm.value.email ;
    const password = authForm.value.password ;

    let authObs: Observable<AuthResponseData>;

    if (!authForm.valid){
      return ;
    }

    this.isLoading = true ;

    if(this.isLoginMode){
      authObs = this.authService.signin(email, password);
    }
    else{
      authObs = this.authService.signup(email, password);
    }

      authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading= false;
          this.router.navigate(['/recipes']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading= false;
        }
        );

      authForm.reset();
    }
}
