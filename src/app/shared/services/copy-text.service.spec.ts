import { TestBed } from '@angular/core/testing';

import { CopyTextService } from './copy-text.service';

describe('CopyTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopyTextService = TestBed.get(CopyTextService);
    expect(service).toBeTruthy();
  });
});
