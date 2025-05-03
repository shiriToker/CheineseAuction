import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAllDonorsComponent } from './form-all-donors.component';

describe('FormAllDonorsComponent', () => {
  let component: FormAllDonorsComponent;
  let fixture: ComponentFixture<FormAllDonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAllDonorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAllDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
