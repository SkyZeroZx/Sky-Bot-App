import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { labels, pieChartOptions } from '@core/config';
import { StatusListChartReport } from '@core/interfaces';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-pie',
  templateUrl: './dashboard-pie.component.html',
  styleUrls: ['./dashboard-pie.component.scss'],
})
export class DashboardPieComponent {
  @Input()
  statusListChartReport: StatusListChartReport;
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  pieChartType: ChartType = 'pie';
  pieChartPlugins = [DatalabelsPlugin];
  pieChartOptions: ChartConfiguration['options'] = pieChartOptions;
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: labels,
    datasets: [
      {
        data: [],
      },
    ],
  };

  ngOnChanges(): void {
    this.loadPieChart();
  }

  loadPieChart() {
    this.pieChartData.datasets[0].data = [
      this.statusListChartReport.totalObserved,
      this.statusListChartReport.totalFinalized,
      this.statusListChartReport.totalProcessing,
      this.statusListChartReport.totalRegister,
    ];
    this.chart?.update();
  }
}
