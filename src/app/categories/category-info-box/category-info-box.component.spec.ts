import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInfoBoxComponent } from './category-info-box.component';

describe('CategoryInfoBoxComponent', () => {
  let component: CategoryInfoBoxComponent;
  let fixture: ComponentFixture<CategoryInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryInfoBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
