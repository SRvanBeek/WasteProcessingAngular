import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDisableConfirm} from './user-disable-confirm';

describe('DisableConfirmDialogComponent', () => {
  let component: UserDisableConfirm;
  let fixture: ComponentFixture<UserDisableConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDisableConfirm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDisableConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
