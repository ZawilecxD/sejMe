import { TestBed } from '@angular/core/testing';

import { InterpellationDataServiceTsService } from './interpellation-data.service.ts.service';

describe('InterpellationDataServiceTsService', () => {
  let service: InterpellationDataServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpellationDataServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
