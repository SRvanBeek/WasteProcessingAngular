import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableConfirmDialogComponent } from './disable-confirm-dialog.component';

describe('DisableConfirmDialogComponent', () => {
  let component: DisableConfirmDialogComponent;
  let fixture: ComponentFixture<DisableConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
