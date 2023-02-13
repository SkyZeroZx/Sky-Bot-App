import { Component, Input, OnChanges } from '@angular/core';
import { CardsStatus, StatusListChartReport } from '@core/interfaces';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnChanges {
  @Input()
  statusListChartReport: StatusListChartReport;
  cardsStatus: CardsStatus = {
    totalRegister: 0,
    totalProcessing: 0,
    totalObserved: 0,
    totalFinalized: 0,
  };

  ngOnChanges(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardsStatus = {
      totalRegister: this.statusListChartReport.totalRegister,
      totalProcessing: this.statusListChartReport.totalProcessing,
      totalObserved: this.statusListChartReport.totalObserved,
      totalFinalized: this.statusListChartReport.totalFinalized,
    };
  }
}
