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
import { DashboardCardsComponent } from './dashboard-cards.component';

fdescribe('DashboardCardsComponent', () => {
  let component: DashboardCardsComponent;
  let fixture: ComponentFixture<DashboardCardsComponent>;

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
      declarations: [DashboardCardsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardsComponent);
    component = fixture.componentInstance;
    component.statusListChartReport = DashBoardMock.statusListChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadPolarChart = spyOn(component, 'loadCards').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadPolarChart).toHaveBeenCalled();
  });

  it('Validate loadCards', () => {
    component.loadCards();
    expect(component.cardsStatus).toEqual({
      totalRegister: DashBoardMock.statusListChartReport.totalRegister,
      totalProcessing: DashBoardMock.statusListChartReport.totalProcessing,
      totalObserved: DashBoardMock.statusListChartReport.totalObserved,
      totalFinalized: DashBoardMock.statusListChartReport.totalFinalized,
    });
  });
});
