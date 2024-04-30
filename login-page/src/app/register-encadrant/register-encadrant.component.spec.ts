import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEncadrantComponent } from './register-encadrant.component';

describe('RegisterEncadrantComponent', () => {
  let component: RegisterEncadrantComponent;
  let fixture: ComponentFixture<RegisterEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEncadrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
