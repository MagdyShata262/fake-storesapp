import { TestBed } from '@angular/core/testing';

import { AppinitializerServices } from './appinitializer-services';

describe('AppinitializerServices', () => {
  let service: AppinitializerServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppinitializerServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
