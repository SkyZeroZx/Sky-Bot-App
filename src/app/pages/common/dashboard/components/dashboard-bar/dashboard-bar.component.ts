import { Component, Input, ViewChild } from '@angular/core';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { barChartOptions, labels } from '@core/config';
import { StatusListChartReport } from '@core/interfaces';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-bar',
  templateUrl: './dashboard-bar.component.html',
  styleUrls: ['./dashboard-bar.component.scss'],
})
export class DashboardBarComponent {
  @Input() statusListChartReport: StatusListChartReport;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  barChartPlugins = [DataLabelsPlugin];
  barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration['options'] = barChartOptions;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  ngOnChanges(): void {
    this.loadBarChart();
  }

  loadBarChart() {
    this.barChartData.labels = this.statusListChartReport.listDays;
    this.barChartData.datasets = [
      {
        data: this.statusListChartReport.listObserved,
        label: labels[0],
        borderWidth: 0.8,
      },
      {
        data: this.statusListChartReport.listFinalized,
        label: labels[1],
        borderWidth: 0.8,
      },
      {
        data: this.statusListChartReport.listProcessing,
        label: labels[2],
        borderWidth: 0.8,
      },
      {
        data: this.statusListChartReport.listRegister,
        label: labels[3],
        borderWidth: 0.8,
      },
    ];
    this.chart?.update();
  }
}
