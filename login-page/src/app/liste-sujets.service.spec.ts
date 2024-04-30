import { TestBed } from '@angular/core/testing';

import { ListeSujetsService } from './liste-sujets.service';

describe('ListeSujetsService', () => {
  let service: ListeSujetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeSujetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
