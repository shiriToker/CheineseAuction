import { Component, inject } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { Gift } from '../../models/gift.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  layout: 'list' | 'grid'= 'grid';

    mySrv = inject(MyServiceService)
        constructor(private messageService: MessageService) { 
        }
    giftlist: Gift[] = []
    cart: any[] = [];
    ngOnInit(){
    this.mySrv.getGift().subscribe((data) => {
       this.giftlist = data
  });

}
addGiftToCart(gift: Gift) {
  this.cart = JSON.parse(localStorage.getItem('gifts') || '[]');
  const existingItem = this.cart.find(item => item.gift.id === gift.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    this.cart.push({ gift, quantity: 1 });
  }
  localStorage.setItem('gifts', JSON.stringify(this.cart));
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gift added to cart' });
}


}



