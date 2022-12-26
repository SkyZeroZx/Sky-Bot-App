import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingLayoutRoutes } from '../loading-layout/loading-layout.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LoadingLayoutRoutes)],
})
export class LoadingLayoutModule {}
