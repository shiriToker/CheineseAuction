import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListGiftwithUser } from '../../models/list-giftwith-user.model';
import { Gift } from '../../models/gift.model';
import { MyServiceService } from '../../services/my-service.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
payForm!:FormGroup
userWithGifts:ListGiftwithUser=new ListGiftwithUser()
gifts: Gift[]=[];
cart!: any[];
sum:number=0
user:User={};
srv=inject(MyServiceService)
today: Date = new Date();
nextMonth=new Date(this.today.getFullYear(), this.today.getMonth() + 1)
  constructor(private router: Router) {
  this.payForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    validity: new FormControl('', [Validators.required]),
    payments: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
  });
}

ngOnInit(){
  this.sumToPay()
}
sumToPay(){
  this.cart = JSON.parse(localStorage.getItem('gifts') || '[]');
  this.sum=this.cart.reduce((acc, item) => acc + item.gift.ticketPrice * item.quantity, 0);
  }
submit() {
  this.user.fullname = this.payForm.value.fullName;
  this.user.email = this.payForm.value.email;
  this.user.phone = this.payForm.value.phone.toString();
  this.cart = JSON.parse(localStorage.getItem('gifts') || '[]');
  this.cart.forEach(item => {
    for (let index = 0; index < item.quantity; index++) {
      this.gifts.push(item.gift);
    }
  });

  this.userWithGifts.Gifts = this.gifts;
  this.userWithGifts.User = this.user;
  this.srv.payment(this.userWithGifts).subscribe(
    (data) => {
      console.log('Response from server:', data);
      localStorage.removeItem("gifts");
      this.router.navigate(['/ending']);
    },
    (error) => console.error('Error from server:', error)
  );

}
}
