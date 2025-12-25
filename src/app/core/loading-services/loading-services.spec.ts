import { TestBed } from '@angular/core/testing';

import { LoadingServices } from './loading-services';

describe('LoadingServices', () => {
  let service: LoadingServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
