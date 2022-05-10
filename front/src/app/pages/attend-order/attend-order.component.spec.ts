import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendOrderComponent } from './attend-order.component';

describe('AttendOrderComponent', () => {
  let component: AttendOrderComponent;
  let fixture: ComponentFixture<AttendOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
