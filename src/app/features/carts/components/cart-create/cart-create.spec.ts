import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCreate } from './cart-create';

describe('CartCreate', () => {
  let component: CartCreate;
  let fixture: ComponentFixture<CartCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
