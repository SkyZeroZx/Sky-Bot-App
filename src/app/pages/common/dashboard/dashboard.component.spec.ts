import { CommonModule, DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { getDatepickerConfig } from '@core/config';
import { DocumentService, StatusService } from '@core/services';
import {
  DashboardBarComponent,
  DashboardCardsComponent,
  DashboardLinearComponent,
  DashboardPieComponent,
  DashboardPolarComponent,
} from './components';
import { DashboardComponent } from './dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard.routing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { INIT_DATE, MAX_DATE } from '@core/constants/general';
import { DashBoardMock } from './dashboard.mock.spec';
import { of } from 'rxjs';
import { StatusChart } from '../../../core/interfaces';

defineLocale('es', esLocale);
fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let statusService: StatusService;
  let documentService: DocumentService;
  const listDocuments = DashBoardMock.listDocument;
  const statusListChartReport = DashBoardMock.statusListChartReport;
  const statusChart: StatusChart = DashBoardMock.statusChart;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        DashboardBarComponent,
        DashboardCardsComponent,
        DashboardLinearComponent,
        DashboardPieComponent,
        DashboardPolarComponent,
      ],
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
      providers: [DatePipe, ToastrService, FormBuilder, StatusService, DocumentService],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusService = TestBed.inject(StatusService);
    documentService = TestBed.inject(DocumentService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.initDate).toEqual(INIT_DATE);
    expect(component.maxDate).toEqual(MAX_DATE);
  });

  it('validate ngOnInit', () => {
    const spyCreateFormChart = spyOn(component, 'createFormChart');
    const spyGetDocument = spyOn(component, 'getDocuments');
    const spyGetChartsStatus = spyOn(component, 'getChartsStatus');
    const spySubscribeChangeValuesForm = spyOn(component, 'subscribeChangeValuesForm');
    component.ngOnInit();
    expect(spyCreateFormChart).toHaveBeenCalled();
    expect(spyGetDocument).toHaveBeenCalled();
    expect(spyGetChartsStatus).toHaveBeenCalledWith([
      component.initDate,
      component.maxDate,
    ]);
    expect(spySubscribeChangeValuesForm).toHaveBeenCalled();
  });

  it('validate getDocuments', () => {
    const spyGetDocumentService = spyOn(documentService, 'getDocuments').and.returnValue(
      of(listDocuments),
    );
    component.getDocuments();
    expect(component.listDocuments).toEqual(listDocuments);
    expect(spyGetDocumentService).toHaveBeenCalled();
  });

  it('validate subscribeChangeValuesForm with id control is defined', () => {
    const spyGetChartStatusByIdDocument = spyOn(component, 'getChartStatusByIdDocument');
    component.chartsForm.controls.id.setValue('1');
    const formValue = component.chartsForm.value;
    expect(spyGetChartStatusByIdDocument).toHaveBeenCalledWith(
      formValue.id,
      formValue.dateRange,
    );
  });

  it('validate unsubscribeChangeValuesForm with id control is undefined', () => {
    const spyGetChartStatusByIdDocument = spyOn(component, 'getChartStatusByIdDocument');
    const spyGetChartsStatus = spyOn(component, 'getChartsStatus');
    component.chartsForm.controls.id.setValue(null);
    expect(spyGetChartStatusByIdDocument).not.toHaveBeenCalled();
    expect(spyGetChartsStatus).toHaveBeenCalled();
  });

  it('validate getChartStatusByIdDocument', () => {
    const spyGetChartStatusByIdDocument = spyOn(
      statusService,
      'getChartStatusByIdDocument',
    ).and.returnValue(of(statusListChartReport));
    component.getChartStatusByIdDocument(
      statusChart.id.toString(),
      statusChart.dateRange,
    );
    expect(spyGetChartStatusByIdDocument).toHaveBeenCalledWith(statusChart);
    expect(component.statusListChartReport).toEqual(statusListChartReport);
  });

  it('validate getChartsStatus', () => {
    const spyGetChartStatus = spyOn(statusService, 'getChartStatus').and.returnValue(
      of(statusListChartReport),
    );
    component.getChartsStatus(statusChart.dateRange);
    expect(spyGetChartStatus).toHaveBeenCalledWith({ dateRange: statusChart.dateRange });
    expect(component.statusListChartReport).toEqual(statusListChartReport);
  });
});
