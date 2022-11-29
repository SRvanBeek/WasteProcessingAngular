import { TestBed } from '@angular/core/testing';

import { WasteService } from './waste.service';

describe('WasteServiceService', () => {
  let service: WasteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
