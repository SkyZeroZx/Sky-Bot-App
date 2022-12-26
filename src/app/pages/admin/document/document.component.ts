import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '@core/services';
import { Document as IDocument } from '@core/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  documentForm: FormGroup;
  displayedColumns: string[] = ['idDocument', 'name', 'requirements', 'actions'];
  dataSource: MatTableDataSource<IDocument>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showCreateDocument: boolean = false;
  showUpdateDocument: boolean = false;
  documentSelected: IDocument;

  constructor(
    private documentService: DocumentService,
    private fb: FormBuilder,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createDocumentForm();
    this.getDocuments();
    this.onChangeFilter();
  }

  createDocumentForm() {
    this.documentForm = this.fb.group({
      filter: null,
    });
  }

  onChangeFilter() {
    this.documentForm.valueChanges.subscribe(({ filter }) => {
      this.dataSource.filter = filter.trim().toLowerCase();
    });
  }

  getDocuments() {
    this.documentService.getDocuments().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  deleteDocument(idDocument: number) {
    this.documentService.deleteDocument(idDocument).subscribe({
      next: (_res) => {
        this.toastService.success('Documento eliminado exitosamente');
        this.getDocuments();
      },
      error: (_err) => {
        this.toastService.error('Sucedio un error al eliminar el documento');
      },
    });
  }

  showModalCreateDocument() {
    this.showCreateDocument = true;
  }

  shoModalUpdateDocument(document: IDocument) {
    this.documentSelected = document;
    this.showUpdateDocument = true;
  }
}
