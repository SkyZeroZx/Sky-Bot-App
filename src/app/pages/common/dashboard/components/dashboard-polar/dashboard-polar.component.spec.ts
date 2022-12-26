import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPolarComponent } from './dashboard-polar.component';

describe('DashboardPolarComponent', () => {
  let component: DashboardPolarComponent;
  let fixture: ComponentFixture<DashboardPolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPolarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
