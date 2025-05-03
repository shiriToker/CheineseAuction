import { Component, inject } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
  providers: [MessageService]
})
export class LotteryComponent {
  srv = inject(MyServiceService);
  messageService = inject(MessageService);

  winners: any[] = [];
  responsiveOptions: any[] = [];
  countdown: number | null = null;
  isSpinning = false;
  isButtonClicked: boolean = false;
  hasLotteryRun: boolean = false;

  ngOnInit() {
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 1 },
      { breakpoint: '768px', numVisible: 1 },
      { breakpoint: '560px', numVisible: 1 }
    ];

    this.hasLotteryRun = this.srv.getLotteryRun();

    if (this.hasLotteryRun) {
      this.loadWinners();
    }
  }

  generateLottery() {
    this.srv.getWinners().subscribe(
      (data) => {
        if (!data || data.length === 0) {
          this.messageService.add({
            severity: 'warn',
            summary: 'No Participants',
            detail: 'There are no participants registered for the lottery yet!'
          });
          return;
        }
  
        if (this.hasLotteryRun) return;
  
        this.isButtonClicked = true;
        this.startCountdown();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load participants. Please try again later.'
        });
        console.error('Error loading participants:', error);
      }
    );
  }
  

  startCountdown() {
    this.countdown = 10;
    const interval = setInterval(() => {
      if (this.countdown !== null && this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.countdown = null;
        this.showWinners();
      }
    }, 1000);
  }

  showWinners() {
    this.isSpinning = true;
    setTimeout(() => {
      this.srv.getWinners().subscribe((data) => {
        if (data && data.length > 0) {
          this.winners = data.filter(winner => winner);
          this.hasLotteryRun = true;
          this.srv.setLotteryRun(true);
        } else {
          this.winners = [];
        }
        this.isSpinning = false;
      });
    }, 3000);
  }

  loadWinners() {
    if (this.winners.length === 0) {
      this.srv.getWinners().subscribe((data) => {
        this.winners = data;
      });
    }
  }
}
