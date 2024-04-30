import { TestBed } from '@angular/core/testing';

import { LoginEtudiantServiceService } from './login-etudiant-service.service';

describe('LoginEtudiantServiceService', () => {
  let service: LoginEtudiantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEtudiantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
