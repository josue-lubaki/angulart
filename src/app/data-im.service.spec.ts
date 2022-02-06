import { TestBed } from '@angular/core/testing';

import { DataImService } from './data-im.service';

describe('DataImService', () => {
  let service: DataImService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataImService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
