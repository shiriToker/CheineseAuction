import { Component } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any[];
  gifts!: Gift[];
  visible: boolean = false;
  quantity:number=0
 

  constructor(private router: Router,private messageService: MessageService) {
    this.cart = JSON.parse(localStorage.getItem('gifts') || '[]');
    this.gifts = this.cart.map(item => item.gift);
    this.quantity = this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cart.reduce((acc, item) => acc + item.gift.ticketPrice * item.quantity, 0).toString();
  }

  updateQuantity(gift: any, newQuantity: number) {
    if (newQuantity < 0)
      newQuantity = 1;
  
    if (newQuantity === 0) {
      const index = this.cart.findIndex(item => item.gift.id === gift.gift.id);
      if (index !== -1) {
        this.cart.splice(index, 1);  // מסיר את הפריט אם הכמות 0
      }
    } else {
      gift.quantity = newQuantity;  // מעדכן את כמות הפריט
    }
  
    // עדכן את ה-quantity הכללי על פי סך כל הכמויות בעגלה
    this.quantity = this.cart.reduce((acc, item) => acc + item.quantity, 0);
  
    // עדכון ה-localStorage
    localStorage.setItem('gifts', JSON.stringify(this.cart));
  }
  
  


  paymant() {
    const price = this.getTotalPrice()
    if (price === '0') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'you didnt buy anything', life: 3000 });
    }

    else {
      this.router.navigate(['/payment']);
    }
  }
  
}
