import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEncadrantComponent } from './espace-encadrant.component';

describe('EspaceEncadrantComponent', () => {
  let component: EspaceEncadrantComponent;
  let fixture: ComponentFixture<EspaceEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceEncadrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
