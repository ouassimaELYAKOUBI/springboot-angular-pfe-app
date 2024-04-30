import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSujetsComponent } from './liste-sujets.component';

describe('ListeSujetsComponent', () => {
  let component: ListeSujetsComponent;
  let fixture: ComponentFixture<ListeSujetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSujetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
