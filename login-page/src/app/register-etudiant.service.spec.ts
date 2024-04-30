import { TestBed } from '@angular/core/testing';

import { RegisterEtudiantService } from './register-etudiant.service';

describe('RegisterEtudiantService', () => {
  let service: RegisterEtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterEtudiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
