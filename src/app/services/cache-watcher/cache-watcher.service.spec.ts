import { TestBed } from '@angular/core/testing';

import { CacheWatcherService } from './cache-watcher.service';

describe('CacheWatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheWatcherService = TestBed.get(CacheWatcherService);
    expect(service).toBeTruthy();
  });
});
