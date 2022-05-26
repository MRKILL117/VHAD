import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGraphicComponent } from './sales-graphic.component';

describe('SalesGraphicComponent', () => {
  let component: SalesGraphicComponent;
  let fixture: ComponentFixture<SalesGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
