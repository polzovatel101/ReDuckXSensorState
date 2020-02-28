import { TestBed } from '@angular/core/testing';

import { KeepInMemoryService } from './keep-in-memory.service';

describe('KeepInMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeepInMemoryService = TestBed.get(KeepInMemoryService);
    expect(service).toBeTruthy();
  });
});
