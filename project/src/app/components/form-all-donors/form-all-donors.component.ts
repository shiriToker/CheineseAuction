import { Component, inject } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { Donor } from '../../models/donor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import { Gift } from '../../models/gift.model';

@Component({
    selector: 'app-form-all-donors',
    templateUrl: './form-all-donors.component.html',
    styleUrls: ['./form-all-donors.component.css'] // שם הפרופרטי עודכן ל-styleUrls
})
export class FormAllDonorsComponent {
    mySrv = inject(MyServiceService);
    checkUnique!: Donor[];
    resDelete: boolean = false;

    donorlist: Donor[] = [];
    donorDialog: boolean = false;
    giftsDialog: boolean = false; // משתנה למעקב אחרי מצב הדיאלוג של המתנות
    errorMessage: string = '';
    donor!: Donor;
    selectedDonors!: Donor[] | null;
    submitted: boolean = false;
    gifts: Gift[] = [];
    selectedGifts: Gift[] = []; // משתנה לשמירת המתנות של התורם הנבחר

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.mySrv.getDonor().subscribe((data) => {
            this.donorlist = data;
        });
        this.mySrv.getGift().subscribe((data) => {
            this.gifts = data;
        });
    }

    openNew() {
        this.donor = {};
        this.submitted = false;
        this.donorDialog = true;
    }

    editDonor(donor: Donor) {
        this.donor = { ...donor };
        this.donorDialog = true;
    }

    deleteDonor(donor: Donor) {
        
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + donor.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (donor.id) {
                    this.mySrv.deleteDonor(donor.id).subscribe({
                        next: (response) => {
                            if (response.status === 200) {
                                this.mySrv.getDonor().subscribe((data) => {
                                    this.donorlist = data;
                                });
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'Donor Deleted',
                                    life: 3000,
                                });
                            }
                        },
                        error: (err) => {
                            if (err.status === 400) {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: err.error,
                                    life: 3000,
                                });
                            }
                        },
                    });
                }
            },
        });
    }
    

    hideDialog() {
        this.donorDialog = false;
        this.submitted = false;
    }

    checkUniqueName() {
        this.checkUnique = this.donorlist.filter((item) => item.name === this.donor.name);
        this.errorMessage = this.checkUnique.length > 0 ? 'The donor name must be unique.' : '';
    }

    saveDonor() {
        this.submitted = true;
        if (this.donor.name?.trim() && this.donor.city?.trim() && this.errorMessage === '') {
            if (this.donor.id) {
                this.mySrv.updateDonor(this.donor.id, this.donor).subscribe(() => {
                    this.mySrv.getDonor().subscribe((data) => {
                        this.donorlist = data;
                    });
                });
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Donor Updated',
                    life: 3000
                });
            } else {
                this.donor.id = this.createId();
                this.mySrv.addDonor(this.donor).subscribe(() => {
                    this.mySrv.getDonor().subscribe((data) => {
                        this.donorlist = data;
                    });
                });
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Donor Created',
                    life: 3000
                });
            }
            this.donorDialog = false;
            this.donor = {};
        }
    }

    createId(): string {
        return uuidv4();
    }

    allDonorGifts(donor: Donor): Gift[] {
        return this.gifts.filter((item) => item.donor === donor.name);
    }

    showGifts(donor: Donor) {
        this.selectedGifts = this.allDonorGifts(donor); // שליפת המתנות של התורם
        this.giftsDialog = true; // פתיחת הדיאלוג
    }

    hideGiftsDialog() {
        this.giftsDialog = false; // סגירת הדיאלוג
        this.selectedGifts = [];
    }
    
    viewGiftDetails(gift: Gift) {
        this.messageService.add({
            severity: 'info',
            summary: 'Gift Details',
            detail: `
                Name: ${gift.name || 'N/A'}, 
                Number: ${gift.number || 'N/A'}, 
                Ticket Price: $${gift.ticketPrice}
            `
        });
    }
    
    
}
