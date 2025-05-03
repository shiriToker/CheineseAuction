import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAllGiftsComponent } from './form-all-gifts.component';

describe('FormAllGiftsComponent', () => {
  let component: FormAllGiftsComponent;
  let fixture: ComponentFixture<FormAllGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAllGiftsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAllGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
