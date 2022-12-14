import { TestBed } from '@angular/core/testing';

import { CutProgramService } from './cut-program.service';

describe('CutProgramService', () => {
  let service: CutProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
