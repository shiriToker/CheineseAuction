import { Component, inject } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 styleUrl: './login.component.css'
})
export class LoginComponent {
 password: string = '';
  name: string = '';
  isLoginError: boolean = false;


  constructor(private mySrv: MyServiceService, private router: Router) { }

  get visible() {
    return this.mySrv.loginDialogVisible();
  }


  set visible(value: boolean) {
    if (!value) {
      this.hideDialog();
    }
  }

  hideDialog() {
    this.mySrv.hideLoginDialog();
    this.name=""
    this.password=""
    this.isLoginError = false; 

  }

  checkAdmin() {
    if (this.name === 'admin' && this.password === 'shirit782@gmail.com') {
      localStorage.setItem("isAdmin", "true");
      this.router.navigate(['/welcome']);
      this.hideDialog();
      this.isLoginError = false; 
    } else {
      this.isLoginError = true;
    }
  }
  



}
