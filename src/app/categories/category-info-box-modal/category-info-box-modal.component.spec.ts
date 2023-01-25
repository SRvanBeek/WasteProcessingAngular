import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInfoBoxModalComponent } from './category-info-box-modal.component';

describe('CategoryInfoBoxModalComponent', () => {
  let component: CategoryInfoBoxModalComponent;
  let fixture: ComponentFixture<CategoryInfoBoxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryInfoBoxModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryInfoBoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
