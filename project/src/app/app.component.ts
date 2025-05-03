import { Component, effect, Signal, signal } from '@angular/core';
import { MyServiceService } from './services/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  items: any[] = [];
  items2: any[] = [];

  constructor(private mySrv: MyServiceService, private router: Router) {
    
  }

  ngOnInit() {
    this.items = [
      { label: 'Gifts', icon: 'pi pi-gift', routerLink: '/gifts' },
      { label: 'Donors', icon: 'pi pi-users', routerLink: '/donors' },
      { label: 'Shop', icon: 'pi pi-gift', routerLink: '/shop' },
      { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/cart' },
      { label: 'Lottery', icon:  'pi pi-star', routerLink: '/Lottery' },
      { label: 'Log Out', icon: 'pi pi-user', command: () => this.logOut()}
    ];

    this.items2 = [
      { label: 'Shop', icon: 'pi pi-gift', routerLink: '/shop' },
      { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/cart' },
      { label: 'Admin', icon: 'pi pi-user', command: () => this.showLoginDialog()}
    ];
  }

  showLoginDialog() {
    this.mySrv.loginDialogVisible.set(true);
  }


  logOut() {
    localStorage.setItem("isAdmin","false")
    this.router.navigate(['/welcome']);
  }
  

  getItems() {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    return isAdmin ? this.items : this.items2;
  }
}

