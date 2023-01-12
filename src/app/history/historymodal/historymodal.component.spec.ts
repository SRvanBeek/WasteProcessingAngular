import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorymodalComponent } from './historymodal.component';

describe('HistorymodalComponent', () => {
  let component: HistorymodalComponent;
  let fixture: ComponentFixture<HistorymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorymodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
