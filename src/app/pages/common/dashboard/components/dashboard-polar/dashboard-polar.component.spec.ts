import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { DashBoardMock } from '../../dashboard.mock.spec';
import { DashboardRoutingModule } from '../../dashboard.routing';

import { DashboardPolarComponent } from './dashboard-polar.component';

fdescribe('DashboardPolarComponent', () => {
  let component: DashboardPolarComponent;
  let fixture: ComponentFixture<DashboardPolarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        NgChartsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        DashboardRoutingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [DashboardPolarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPolarComponent);
    component = fixture.componentInstance;
    component.statusListChartReport = DashBoardMock.statusListChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadPolarChart = spyOn(component, 'loadPolarChart').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadPolarChart).toHaveBeenCalled();
  });

  it('Validate loadPolarChart', () => {
    const spyChartUpdate = spyOn(component.chart, 'update').and.callThrough();
    component.loadPolarChart();
    expect(spyChartUpdate).toHaveBeenCalled();
    expect(component.polarAreaChartData.datasets[0].data).toEqual([
      DashBoardMock.statusListChartReport.totalObserved,
      DashBoardMock.statusListChartReport.totalFinalized,
      DashBoardMock.statusListChartReport.totalProcessing,
      DashBoardMock.statusListChartReport.totalRegister,
    ]);
  });
});
