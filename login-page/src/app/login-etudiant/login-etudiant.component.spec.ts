import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEtudiantComponent } from './login-etudiant.component';

describe('LoginEtudiantComponent', () => {
  let component: LoginEtudiantComponent;
  let fixture: ComponentFixture<LoginEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEtudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
