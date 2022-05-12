import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttentionComponent } from './user-attention.component';

describe('UserAttentionComponent', () => {
  let component: UserAttentionComponent;
  let fixture: ComponentFixture<UserAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
