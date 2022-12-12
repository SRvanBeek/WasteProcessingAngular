import { TestBed } from '@angular/core/testing';

import { VoorraadService } from './voorraad.service';

describe('VoorraadService', () => {
  let service: VoorraadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoorraadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
