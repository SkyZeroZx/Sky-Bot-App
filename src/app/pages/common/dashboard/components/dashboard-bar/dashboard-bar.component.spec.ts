import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { labels } from '../../../../../core/config';
import { DashBoardMock } from '../../dashboard.mock.spec';
import { DashboardRoutingModule } from '../../dashboard.routing';

import { DashboardBarComponent } from './dashboard-bar.component';

fdescribe('DashboardBarComponent', () => {
  let component: DashboardBarComponent;
  let fixture: ComponentFixture<DashboardBarComponent>;

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
      declarations: [DashboardBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBarComponent);
    component = fixture.componentInstance;
    component.statusListChartReport = DashBoardMock.statusListChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadBarChart = spyOn(component, 'loadBarChart').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadBarChart).toHaveBeenCalled();
  });

  it('Validate loadLinearChart', () => {
    const spyChartUpdate = spyOn(component.chart, 'update').and.callThrough();
    component.loadBarChart();
    expect(spyChartUpdate).toHaveBeenCalled();
    expect(component.barChartData.datasets).toEqual([
      {
        data: DashBoardMock.statusListChartReport.listObserved,
        label: labels[0],
        borderWidth: 0.8,
      },
      {
        data: DashBoardMock.statusListChartReport.listFinalized,
        label: labels[1],
        borderWidth: 0.8,
      },
      {
        data: DashBoardMock.statusListChartReport.listProcessing,
        label: labels[2],
        borderWidth: 0.8,
      },
      {
        data: DashBoardMock.statusListChartReport.listRegister,
        label: labels[3],
        borderWidth: 0.8,
      },
    ]);
  });
});
