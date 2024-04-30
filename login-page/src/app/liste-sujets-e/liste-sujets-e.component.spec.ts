import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSujetsEComponent } from './liste-sujets-e.component';

describe('ListeSujetsEComponent', () => {
  let component: ListeSujetsEComponent;
  let fixture: ComponentFixture<ListeSujetsEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSujetsEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSujetsEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
