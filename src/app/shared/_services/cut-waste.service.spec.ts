import { TestBed } from '@angular/core/testing';

import { CutWasteService } from './cut-waste.service';

describe('CutWasteService', () => {
  let service: CutWasteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutWasteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
