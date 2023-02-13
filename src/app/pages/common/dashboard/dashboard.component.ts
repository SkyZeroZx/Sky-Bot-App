import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { MAX_DATE, INIT_DATE } from '@core/constants/general';
import {
  StatusChart,
  StatusListChartReport,
  Document as IDocument,
} from '@core/interfaces';
import { DocumentService, StatusService } from '@core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  chartsForm: FormGroup;
  maxDate = MAX_DATE;
  initDate = INIT_DATE;
  listDocuments: IDocument[] = [];

  statusListChartReport: StatusListChartReport = {
    listDays: [],
    listRegister: [],
    listProcessing: [],
    listObserved: [],
    listFinalized: [],
    totalRegister: 0,
    totalProcessing: 0,
    totalObserved: 0,
    totalFinalized: 0,
  };

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private statusService: StatusService,
    private documentService: DocumentService,
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.createFormChart();
    this.getDocuments();
    this.getChartsStatus([this.initDate, this.maxDate]);
    this.subscribeChangeValuesForm();
  }

  createFormChart() {
    this.chartsForm = this.fb.group({
      dateRange: [
        [this.initDate, this.maxDate],
        Validators.compose([Validators.required]),
      ],
      id: [null],
    });
  }

  getDocuments() {
    this.documentService.getDocuments().subscribe((res) => {
      this.listDocuments = res;
    });
  }

  subscribeChangeValuesForm() {
    this.chartsForm.valueChanges.subscribe(({ id, dateRange }) => {
      if (id) {
        this.getChartStatusByIdDocument(id, dateRange);
      } else {
        this.getChartsStatus(dateRange);
      }
    });
  }

  getChartStatusByIdDocument(id: string, dateRange: Date[] | string[]) {
    const statusChart: StatusChart = {
      dateRange,
      id,
    };
    this.statusService.getChartStatusByIdDocument(statusChart).subscribe({
      next: (res) => {
        this.statusListChartReport = res;
      },
    });
  }

  getChartsStatus(dateRange: Date[] | string[]) {
    const statusChart: StatusChart = {
      dateRange,
    };
    this.statusService.getChartStatus(statusChart).subscribe({
      next: (res) => {
        this.statusListChartReport = res;
      },
    });
  }
}
