import { TestBed } from '@angular/core/testing';

import { SaveInMemoryService } from './save-in-memory.service';

describe('SaveInMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveInMemoryService = TestBed.get(SaveInMemoryService);
    expect(service).toBeTruthy();
  });
});
