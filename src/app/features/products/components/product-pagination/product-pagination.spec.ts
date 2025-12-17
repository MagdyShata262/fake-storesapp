import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPagination } from './product-pagination';

describe('ProductPagination', () => {
  let component: ProductPagination;
  let fixture: ComponentFixture<ProductPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
