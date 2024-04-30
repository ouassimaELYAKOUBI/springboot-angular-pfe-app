import { TestBed } from '@angular/core/testing';

import { LoginEncadrantServiceService } from './login-encadrant-service.service';

describe('LoginEncadrantServiceService', () => {
  let service: LoginEncadrantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEncadrantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
