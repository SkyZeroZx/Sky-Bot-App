import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StatusDocument } from '@core/interfaces';
import { StatusService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit, AfterViewInit {
  @ViewChild('modalUpdateStatus') readonly modalUpdateStatus: ModalDirective;
  @Output() update = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() statusDocument: StatusDocument;
  updateStatusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private statusService: StatusService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormUpdateStatus();
  }

  ngAfterViewInit(): void {
    this.modalUpdateStatus.show();
  }

  createFormUpdateStatus() {
    this.updateStatusForm = this.fb.group({
      idStatus: this.statusDocument.idStatus,
      status: [this.statusDocument.status, Validators.compose([Validators.required])],
      observations: [
        this.statusDocument.observations,
        Validators.compose([Validators.required]),
      ],
    });
  }

  onHidden() {
    this.updateStatusForm.reset();
    this.close.emit();
  }

  updateStatus() {
    this.statusService.updateStatus(this.updateStatusForm.value).subscribe({
      next: (res) => {
        this.updateStatusForm.reset();
        this.update.emit();
        this.toastService.success('Se actualizo exitosamente el estado');
      },
      error: (err) => {
        this.toastService.error('Sucedio un error al actualizar el estado');
      },
    });
  }
}
