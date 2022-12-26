import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusDocument } from '@core/interfaces';
import { ToastrService } from 'ngx-toastr';
import { StatusService } from '@core/services';

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.scss'],
})
export class ListStatusComponent {
  @Input() statusDocument: StatusDocument[] = [];
  @Output() update = new EventEmitter();
  showUpdateStatus: boolean = false;
  statusDocumentSelected: StatusDocument;
  displayColumns: string[] = ['observations', 'registerDate', 'status', 'actions'];
  constructor(
    private statusService: StatusService,
    private toastService: ToastrService,
  ) {}

  updateStatus(row: StatusDocument) {
    this.statusDocumentSelected = row;
    this.showUpdateStatus = true;
  }

  onUpdate() {
    this.showUpdateStatus = false;
    this.update.emit();
  }

  deleteStatus({ idStatus }: StatusDocument) {
    this.statusService.deleteStatus(idStatus).subscribe({
      next: (_res) => {
        this.update.emit();
        this.toastService.success('Estado eliminado exitosamente');
      },
      error: (_err) => {
        this.toastService.error('Sucedio un error al eliminar el estado');
      },
    });
  }
}
