import { TestBed } from '@angular/core/testing';

import { GtpServiceService } from './gtp-service.service';

describe('GtpServiceService', () => {
  let service: GtpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
