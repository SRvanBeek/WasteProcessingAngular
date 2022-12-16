import { TestBed } from '@angular/core/testing';

import { LeftoverService } from './leftover.service';

describe('LeftoverService', () => {
  let service: LeftoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
