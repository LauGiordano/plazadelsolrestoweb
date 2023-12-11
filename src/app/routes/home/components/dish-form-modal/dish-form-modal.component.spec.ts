import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormModalComponent } from './dish-form-modal.component';

describe('DishFormModalComponent', () => {
  let component: DishFormModalComponent;
  let fixture: ComponentFixture<DishFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishFormModalComponent]
    });
    fixture = TestBed.createComponent(DishFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
