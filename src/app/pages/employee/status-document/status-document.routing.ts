import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusDocumentDetailComponent } from '../../employee/status-document/components/status-document-detail/status-document-detail.component';
import { StatusDocumentComponent } from '../../employee/status-document/status-document.component';

export const statusDocumentRoutes: Routes = [
  {
    path: 'status-document/:id',
    component: StatusDocumentDetailComponent,
    data: { animation: 'status-document-detail' },
  },
  {
    path: 'status-document',
    component: StatusDocumentComponent,
    data: { animation: 'status-document' },
  },
];
@NgModule({
  imports: [RouterModule.forChild(statusDocumentRoutes)],
  exports: [RouterModule],
})
export class StatusDocumentRoutingModule {}
