import { TestBed } from '@angular/core/testing';

import { StoreHelperService } from './store-helper.service';

describe('StoreServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreHelperService = TestBed.get(StoreHelperService);
    expect(service).toBeTruthy();
  });
});
