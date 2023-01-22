import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCustomerComponent } from './change-customer.component';

describe('ChangeCustomerComponent', () => {
  let component: ChangeCustomerComponent;
  let fixture: ComponentFixture<ChangeCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
