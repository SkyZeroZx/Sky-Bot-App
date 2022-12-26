import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from '@core/config';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {
  DashboardBarComponent,
  DashboardCardsComponent,
  DashboardLinearComponent,
  DashboardPieComponent,
  DashboardPolarComponent,
} from '../dashboard/components';
import { DashboardRoutingModule } from '../dashboard/dashboard.routing';
import { SharedMaterialModule } from '@shared/material/material.module';

defineLocale('es', esLocale);
@NgModule({
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
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedMaterialModule,
    BsDatepickerModule.forRoot(),
    DashboardRoutingModule,
  ],
  providers: [
    DatePipe,
    { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
  ],
})
export class DashboardModule {}
