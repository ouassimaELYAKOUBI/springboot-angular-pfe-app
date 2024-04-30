import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupSujetComponent } from './view-group-sujet.component';

describe('ViewGroupSujetComponent', () => {
  let component: ViewGroupSujetComponent;
  let fixture: ComponentFixture<ViewGroupSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGroupSujetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGroupSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
