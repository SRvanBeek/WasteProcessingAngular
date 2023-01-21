import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionInputComponent } from './condition-input.component';

describe('ConditionInputComponent', () => {
  let component: ConditionInputComponent;
  let fixture: ComponentFixture<ConditionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
