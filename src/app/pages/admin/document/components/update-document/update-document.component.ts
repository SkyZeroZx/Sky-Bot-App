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
import { ToastrService } from 'ngx-toastr';
import { Document as IDocument } from '@core/interfaces';
import { DocumentService } from '@core/services';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss'],
})
export class UpdateDocumentComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() inputDocument: IDocument;
  @ViewChild('modalUpdateDocument')
  readonly modalUpdateDocument: ModalDirective;

  updateDocumentForm: FormGroup;

  constructor(
    private documentService: DocumentService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormUpdateDocument();
  }

  createFormUpdateDocument(): void {
    this.updateDocumentForm = this.fb.group({
      idDocument: [this.inputDocument.idDocument],
      name: [this.inputDocument.name, Validators.required],
      requirements: [this.inputDocument.requirements, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.modalUpdateDocument.show();
  }

  updateDocument(): void {
    this.documentService.updateDocument(this.updateDocumentForm.value).subscribe({
      next: (_res) => {
        this.update.emit();
        this.toastrService.success('Documento actualizado exitosamente');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al actualizar el documento');
      },
    });
  }

  onHidden() {
    this.updateDocumentForm.reset();
    this.close.emit();
  }
}
