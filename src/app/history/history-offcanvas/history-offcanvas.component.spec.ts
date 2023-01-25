import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOffcanvasComponent } from './history-offcanvas.component';

describe('HistoryOffcanvasComponent', () => {
  let component: HistoryOffcanvasComponent;
  let fixture: ComponentFixture<HistoryOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOffcanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
