import { TestBed } from '@angular/core/testing';

import { ConnaissancesService } from './connaissances-service';

describe('ConnaissancesService', () => {
  let service: ConnaissancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnaissancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
