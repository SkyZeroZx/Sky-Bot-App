import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableResponsiveModule } from '@core/directives';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [MatTabsModule, MatPaginatorModule, MatTableResponsiveModule, MatTableModule],
})
export class SharedMaterialModule {}
