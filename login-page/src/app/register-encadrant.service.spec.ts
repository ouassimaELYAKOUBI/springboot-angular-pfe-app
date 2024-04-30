import { TestBed } from '@angular/core/testing';

import { RegisterEncadrantService } from './register-encadrant.service';

describe('RegisterEncadrantService', () => {
  let service: RegisterEncadrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterEncadrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
