import { Injectable, signal } from '@angular/core';
import { Gift } from '../models/gift.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Donor } from '../models/donor';
import { User } from '../models/user';
import { ListGiftwithUser } from '../models/list-giftwith-user.model';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  giftList:Gift[]=[]
apiGiftUrl = 'https://localhost:7124/api/gift';

  constructor(private http: HttpClient) {
  }
  

  getGift(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGiftUrl);
  }

  getGiftById(id: string): Observable<Gift> {
    return this.http.get<Gift>(`${this.apiGiftUrl}/${id}`);
  }

  deleteGift(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiGiftUrl}/${id}`);
    
  }

  addGift(gift: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.apiGiftUrl, gift);
  }

  updateGift(id: string, gift: Gift): Observable<Gift> {
    return this.http.put<Gift>(`${this.apiGiftUrl}/${id}`, gift);
  }


donorList:Donor[]=[]

apiDonorUrl = 'https://localhost:7124/api/donors';

getDonor(): Observable<any[]> {
  return this.http.get<any[]>(this.apiDonorUrl);
}

getDonorById(id: string): Observable<Donor> {
  return this.http.get<Donor>(`${this.apiDonorUrl}/${id}`);
}

deleteDonor(id: string): Observable<any> {
  return this.http.delete(`${this.apiDonorUrl}/${id}`, { observe: 'response' });
  
}


addDonor(donor: Donor): Observable<Donor> {
  return this.http.post<Donor>(this.apiDonorUrl, donor);
}

updateDonor(id: string, donor: Donor): Observable<Donor> {
  return this.http.put<Donor>(`${this.apiDonorUrl}/${id}`, donor);
}

userList:User[]=[]

loginDialogVisible = signal(false);


showLoginDialog() {
  this.loginDialogVisible.set(true);  
}

hideLoginDialog() {
  this.loginDialogVisible.set(false); } 


  payment(request: ListGiftwithUser): Observable<ListGiftwithUser> {
    return this.http.post<ListGiftwithUser>(`${this.apiGiftUrl}/AddGiftsToUser`, request);
  }

getWinners(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiGiftUrl}/Random`); 

}

private hasLotteryRun: boolean = false; 

setLotteryRun(status: boolean): void {
  this.hasLotteryRun = status;
}

getLotteryRun(): boolean {
  return this.hasLotteryRun;
}

resetUsersFromGIfts(): Observable<any>{
  return this.http.delete(`${this.apiGiftUrl}`, { observe: 'response' });
}
}
