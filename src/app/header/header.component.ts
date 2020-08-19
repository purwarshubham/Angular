
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from "../shared/data-storage.service" ;
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit, OnDestroy{

  private usrSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService : DataStorageService,
    private authService: AuthService){}

  ngOnInit(): void {
    this.usrSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      // we can write like this also, its same
      // this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.usrSub.unsubscribe();
  }


}
