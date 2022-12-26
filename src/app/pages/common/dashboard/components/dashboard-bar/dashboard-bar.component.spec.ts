import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBarComponent } from './dashboard-bar.component';

describe('DashboardBarComponent', () => {
  let component: DashboardBarComponent;
  let fixture: ComponentFixture<DashboardBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
