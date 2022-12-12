import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutWasteInfoBoxComponent } from './cut-waste-info-box.component';

describe('CutWasteInfoBoxComponent', () => {
  let component: CutWasteInfoBoxComponent;
  let fixture: ComponentFixture<CutWasteInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutWasteInfoBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutWasteInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
