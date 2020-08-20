import { TestBed } from '@angular/core/testing';

import { ManageInfoService } from './manage-info.service';

describe('ManageInfoService', () => {
  let service: ManageInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
