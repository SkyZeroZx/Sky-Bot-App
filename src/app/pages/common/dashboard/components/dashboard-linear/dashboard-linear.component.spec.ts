import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLinearComponent } from './dashboard-linear.component';

describe('DashboardLinearComponent', () => {
  let component: DashboardLinearComponent;
  let fixture: ComponentFixture<DashboardLinearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLinearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
