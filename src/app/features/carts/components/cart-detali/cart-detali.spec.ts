import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetali } from './cart-detali';

describe('CartDetali', () => {
  let component: CartDetali;
  let fixture: ComponentFixture<CartDetali>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDetali]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetali);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
