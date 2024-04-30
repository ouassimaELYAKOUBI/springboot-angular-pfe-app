import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSujetPublicComponent } from './list-sujet-public.component';

describe('ListSujetPublicComponent', () => {
  let component: ListSujetPublicComponent;
  let fixture: ComponentFixture<ListSujetPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSujetPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSujetPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
