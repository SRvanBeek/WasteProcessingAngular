import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteProcessingComponent } from './waste-processing.component';

describe('WasteProcessingComponent', () => {
  let component: WasteProcessingComponent;
  let fixture: ComponentFixture<WasteProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
