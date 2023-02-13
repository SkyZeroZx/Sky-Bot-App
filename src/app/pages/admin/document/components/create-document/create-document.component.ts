import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DocumentService } from '@core/services';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss'],
})
export class CreateDocumentComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();

  @ViewChild('modalCreateDocument')
  readonly modalCreateDocument: ModalDirective;

  createDocumentForm: FormGroup;

  constructor(
    private documentService: DocumentService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormCreateDocument();
  }

  createFormCreateDocument() {
    this.createDocumentForm = this.fb.group({
      name: [null, Validators.required],
      requirements: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.modalCreateDocument.show();
  }

  createDocument() {
    this.documentService.createDocument(this.createDocumentForm.value).subscribe({
      next: (_res) => {
        this.update.emit();
        this.toastrService.success('Se registro existosamente el documento');
      },
    });
  }

  onHidden() {
    this.createDocumentForm.reset();
    this.close.emit();
  }
}
