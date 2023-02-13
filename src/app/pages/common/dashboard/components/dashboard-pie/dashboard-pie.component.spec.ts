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

import { DashboardPieComponent } from './dashboard-pie.component';

fdescribe('DashboardPieComponent', () => {
  let component: DashboardPieComponent;
  let fixture: ComponentFixture<DashboardPieComponent>;

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
      declarations: [DashboardPieComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPieComponent);
    component = fixture.componentInstance;
    component.statusListChartReport = DashBoardMock.statusListChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadPolarChart = spyOn(component, 'loadPieChart').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadPolarChart).toHaveBeenCalled();
  });

  it('Validate loadPieChart', () => {
    const spyChartUpdate = spyOn(component.chart, 'update').and.callThrough();
    component.loadPieChart();
    expect(spyChartUpdate).toHaveBeenCalled();
    expect(component.pieChartData.datasets[0].data).toEqual([
      DashBoardMock.statusListChartReport.totalObserved,
      DashBoardMock.statusListChartReport.totalFinalized,
      DashBoardMock.statusListChartReport.totalProcessing,
      DashBoardMock.statusListChartReport.totalRegister,
    ]);
  });
});
