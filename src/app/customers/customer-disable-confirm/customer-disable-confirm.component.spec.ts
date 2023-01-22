import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDisableConfirmComponent } from './customer-disable-confirm.component';

describe('CustomerDisableConfirmComponent', () => {
  let component: CustomerDisableConfirmComponent;
  let fixture: ComponentFixture<CustomerDisableConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDisableConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDisableConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
