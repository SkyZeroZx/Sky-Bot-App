import { Component, Input, ViewChild } from '@angular/core';
import { labels, lineChartOptions } from '@core/config';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatusListChartReport } from '@core/interfaces';

@Component({
  selector: 'app-dashboard-linear',
  templateUrl: './dashboard-linear.component.html',
  styleUrls: ['./dashboard-linear.component.scss'],
})
export class DashboardLinearComponent {
  @Input()
  statusListChartReport: StatusListChartReport;
  lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  lineChartOptions: ChartConfiguration['options'] = lineChartOptions;

  ngOnChanges(): void {
    this.loadLinearChart();
  }

  loadLinearChart() {
    this.lineChartData.labels = this.statusListChartReport.listDays;
    this.lineChartData.datasets = [
      {
        data: this.statusListChartReport.listObserved,
        label: labels[0],
        fill: 'origin',
      },
      {
        data: this.statusListChartReport.listFinalized,
        label: labels[1],
        fill: 'origin',
      },
      {
        data: this.statusListChartReport.listProcessing,
        label: labels[2],
        fill: 'origin',
      },
      {
        data: this.statusListChartReport.listRegister,
        label: labels[3],
        fill: 'origin',
      },
    ];
    this.chart?.update();
  }
}
