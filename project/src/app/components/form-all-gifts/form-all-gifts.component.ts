import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, Output } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { Gift } from '../../models/gift.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import { Donor } from '../../models/donor';

@Component({
    selector: 'app-form-all-gifts',
    templateUrl: './form-all-gifts.component.html',
    styleUrl: './form-all-gifts.component.css'
})
export class FormAllGiftsComponent {
    mySrv = inject(MyServiceService)
     checkUnique!:Gift[]
    resDelete: boolean = false

    giftlist: Gift[] = []
    cart:any=[]

    donorList: any[] = [];

    giftDialog: boolean = false;

    errorMessage: string = '';

    gift!: Gift;

    selectedGifts!: Gift[] | null;

    submitted: boolean = false;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { 

        
    }
    ngOnInit() {
        this.mySrv.getGift().subscribe((data) => {
            this.giftlist = data
        });

        this.mySrv.getDonor().subscribe((data: Donor[]) => {
            this.donorList = data.map((donor) => ({
                name: donor.name,
                value: donor.name 
            }));
        });
    }


    openNew() {
        this.gift = { ticketPrice: 10 };
        this.submitted = false;
        this.giftDialog = true;
    }

    // deleteSelectedGifts() {
    //     this.confirmationService.confirm({
    //         message: 'Are you sure you want to delete the selected gifts?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.giftlist = this.giftlist.filter((val) => !this.selectedGifts?.includes(val));
    //             this.selectedGifts = null;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gifts Deleted', life: 3000 });
    //         }
    //     });
    // }

    editGift(gift: Gift) {
        console.log('Editing gift:', gift);
        this.gift = { ...gift };
    
        this.gift.imageUrl = this.gift.imageUrl?.substring(8);
    
        console.log('Modified imageUrl:', this.gift.imageUrl); 
        this.giftDialog = true;
    }
    
    

    deleteGift(gift: Gift) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + gift.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (gift.id) {
                    this.cart = JSON.parse(localStorage.getItem('gifts') || '[]');
                    if (this.cart) {
                        const existGift = this.cart.find((item:any) => item.gift.id == gift.id)
                        if (existGift) {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This gift is in a cart and cannot be deleted.', life: 3000 });                            return;
                        }
                    }
                    if (gift.userNames && gift.userNames.length > 0) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'This gift has already been purchased and cannot be deleted.',
                            life: 3000
                        });
                        return;
                    }
                    this.mySrv.deleteGift(gift.id).subscribe((data) => {

                        this.mySrv.getGift().subscribe((data) => {
                            this.giftlist = data
                        });
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
                    },
                    (error)=>{
                        if(error.status===400){
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This gift has already been purchased and cannot be deleted.', life: 3000 });
                        }
                            
                    })
                }
            }
        });
    }

    hideDialog() {
        this.giftDialog = false;
        this.submitted = false;
    }

    checkUniqueName() { 
      this.checkUnique =this.giftlist.filter(item=>item.name===this.gift.name)
        if(this.checkUnique.length>0){
            this.errorMessage = 'The gift name must be unique.';
    } else {
      this.errorMessage = ''; 
    }

    }
    saveGift() {
        this.submitted = true;
    
        if (this.gift.name?.trim() && this.gift.donor?.trim() && this.gift.ticketPrice && this.gift.imageUrl?.trim() && this.errorMessage == '') {
            if (this.gift.imageUrl && !this.gift.imageUrl.startsWith('assets/')) {
                this.gift.imageUrl = `/assets/${this.gift.imageUrl}`;
            }
    
            if (this.gift.id) {
                
                this.mySrv.updateGift(this.gift.id, this.gift).subscribe((data) => {
                    console.log(data);
                    this.mySrv.getGift().subscribe((data) => {
                        this.giftlist = data;
                    })
                });
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Updated', life: 3000 });
            } else {
                this.gift.id = this.createId();
                this.gift.number = this.giftlist.length + 1;
                this.mySrv.addGift(this.gift).subscribe((data) => {
                    console.log(data);
                    this.mySrv.getGift().subscribe((data) => {
                        this.giftlist = data;
                    })
                });
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Created', life: 3000 });
            }
            this.giftDialog = false;
            this.gift = { ticketPrice: 10 };
        }
    }
    
    
        findIndexById(id: string): number {
            let index = -1;
            for (let i = 0; i < this.giftlist.length; i++) {
                if (this.giftlist[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        createId(): string {
            return uuidv4();
        }
    }






    