import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoModalComponent } from './to-do-modal.component';

describe('ToDoModalComponent', () => {
  let component: ToDoModalComponent;
  let fixture: ComponentFixture<ToDoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
