import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIdentityModalComponent } from './verify-identity-modal.component';

describe('VerifyIdentityModalComponent', () => {
  let component: VerifyIdentityModalComponent;
  let fixture: ComponentFixture<VerifyIdentityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyIdentityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyIdentityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
