import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetali } from './product-detali';

describe('ProductDetali', () => {
  let component: ProductDetali;
  let fixture: ComponentFixture<ProductDetali>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetali]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetali);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
