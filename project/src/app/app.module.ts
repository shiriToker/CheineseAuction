import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormAllGiftsComponent } from './components/form-all-gifts/form-all-gifts.component';
import { MyServiceService } from './services/my-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DragDropModule } from 'primeng/dragdrop';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { Tag, TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Rating, RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {  HttpClientModule } from '@angular/common/http';
import { FormAllDonorsComponent } from './components/form-all-donors/form-all-donors.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { CartComponent } from './components/cart/cart.component';
import { OrderListModule } from 'primeng/orderlist';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { LoginComponent } from './components/login/login.component';
import { LotteryComponent } from './components/lottery/lottery.component';
import { InputMaskModule } from 'primeng/inputmask';
import { CarouselModule } from 'primeng/carousel';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EndingComponent } from './components/ending/ending.component';




@NgModule({
  declarations: [
    AppComponent,
    FormAllGiftsComponent,
    FormAllDonorsComponent,
    PaymentComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    LotteryComponent,
    WelcomeComponent,
    EndingComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,  
    TableModule,
    ButtonModule,
    RatingModule,
    TagModule,
    ToastModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    RippleModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    HttpClientModule,
    DataViewModule,
    SelectButtonModule,
    CardModule,
    DividerModule,
    DragDropModule,
    CalendarModule,
    InputMaskModule
   ],
  providers: [MyServiceService, MessageService, ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
