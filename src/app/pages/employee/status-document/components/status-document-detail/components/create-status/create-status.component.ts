import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from '@core/services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { StatusDocumentByStudent } from '@core/interfaces';

@Component({
  selector: 'app-create-status',
  templateUrl: './create-status.component.html',
  styleUrls: ['./create-status.component.scss'],
})
export class CreateStatusComponent implements OnInit, AfterViewInit {
  @ViewChild('modalCreateStatus') readonly modalCreateStatus: ModalDirective;
  @Output() update = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() statusDocumentByStudent: StatusDocumentByStudent;
  createStatusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private statusService: StatusService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormStatus();
  }

  ngAfterViewInit(): void {
    this.modalCreateStatus.show();
  }

  createFormStatus() {
    this.createStatusForm = this.fb.group({
      idStatusDocument: this.statusDocumentByStudent.idStatusDocument,
      status: ['', Validators.compose([Validators.required])],
      observations: ['', Validators.compose([Validators.required])],
    });
  }

  onHidden() {
    this.createStatusForm.reset();
    this.close.emit();
  }

  createStatus() {
    this.statusService.createStatus(this.createStatusForm.value).subscribe({
      next: (_res) => {
        this.update.emit();
        this.createStatusForm.reset();
        this.toastService.success('Nuevo estado registrado exitosamente');
      },
      error: (_err) => {
        this.toastService.error('Sucedio un error al registar nuevo estado');
      },
    });
  }


}
