import { TestBed } from '@angular/core/testing';

import { LanguaServices } from './langua-services';

describe('LanguaServices', () => {
  let service: LanguaServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguaServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
