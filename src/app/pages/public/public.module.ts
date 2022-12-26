import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { publicRoutes } from './public.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(publicRoutes)],
})
export class PublicModule {}
