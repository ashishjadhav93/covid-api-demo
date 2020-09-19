import { TestBed } from '@angular/core/testing';

import { ManageCountryInfoService } from './manage-country-info.service';

describe('ManageCountryInfoService', () => {
  let service: ManageCountryInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCountryInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
