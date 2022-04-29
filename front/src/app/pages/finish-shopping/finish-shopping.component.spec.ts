import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishShoppingComponent } from './finish-shopping.component';

describe('FinishShoppingComponent', () => {
  let component: FinishShoppingComponent;
  let fixture: ComponentFixture<FinishShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
