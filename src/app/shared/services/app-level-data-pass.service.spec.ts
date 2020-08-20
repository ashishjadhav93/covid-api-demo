import { TestBed, inject } from '@angular/core/testing';

import { AppLevelDataPassService } from './app-level-data-pass.service';

describe('AppLevelDataPassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLevelDataPassService]
    });
  });

  it('should be created', inject([AppLevelDataPassService], (service: AppLevelDataPassService) => {
    expect(service).toBeTruthy();
  }));
});
