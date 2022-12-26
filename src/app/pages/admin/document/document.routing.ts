import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from '../document/document.component';

export const documentRoutes: Routes = [
  {
    path: '',
    component: DocumentComponent,
    data: { animation: 'document' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(documentRoutes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}