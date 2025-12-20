import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEdit } from './cart-edit';

describe('CartEdit', () => {
  let component: CartEdit;
  let fixture: ComponentFixture<CartEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
