import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormAllDonorsComponent } from './components/form-all-donors/form-all-donors.component';
import { FormAllGiftsComponent } from './components/form-all-gifts/form-all-gifts.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { LotteryComponent } from './components/lottery/lottery.component';
import { MyServiceService } from './services/my-service.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EndingComponent } from './components/ending/ending.component';

const routes: Routes = [
  {
    path: 'gifts',
    component: FormAllGiftsComponent,
    canActivate: [() => {
      const myService = inject(MyServiceService);
      const router = inject(Router);

      if (localStorage.getItem("isAdmin")==="true") {
        return true;
      } else {
       router.navigate(['/shop'])
       return false;

      }
    }]
  },
  {
    path: 'Lottery',
    component: LotteryComponent,
    canActivate: [() => {
      const myService = inject(MyServiceService);
      const router = inject(Router);

      if (localStorage.getItem("isAdmin")==="true") {
        return true; 
      } else {
        router.navigate(['/shop'])
        return false;

      }
    }]
  },
  {
    path: 'donors',
    component: FormAllDonorsComponent,
    canActivate: [() => {
      const myService = inject(MyServiceService);
      const router = inject(Router);

      if (localStorage.getItem("isAdmin")==="true") {
        return true;
      } else {
        router.navigate(['/shop'])
        return false;
      }
    }]
  },
  { path: 'shop', component: HomeComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', component: WelcomeComponent },
  { path: 'ending', component: EndingComponent },
  { path: '**', redirectTo: 'shop' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
