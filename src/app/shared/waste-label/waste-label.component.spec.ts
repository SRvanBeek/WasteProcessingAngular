import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteLabelComponent } from './waste-label.component';

describe('WasteLabelComponent', () => {
  let component: WasteLabelComponent;
  let fixture: ComponentFixture<WasteLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
