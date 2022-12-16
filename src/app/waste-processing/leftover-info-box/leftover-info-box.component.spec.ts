import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftoverInfoBoxComponent } from './leftover-info-box.component';

describe('LeftoverInfoBoxComponent', () => {
  let component: LeftoverInfoBoxComponent;
  let fixture: ComponentFixture<LeftoverInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftoverInfoBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftoverInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
