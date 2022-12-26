import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatusDocumentService } from '@core/services';
import {
  Attachment,
  Certificate,
  StatusDocument,
  StatusDocumentByStudent,
} from '@core/interfaces';

@Component({
  selector: 'app-document-student-detail',
  templateUrl: './document-student-detail.component.html',
  styleUrls: ['./document-student-detail.component.scss'],
})
export class DocumentStudentDetailComponent implements OnInit {
  statusDocumentByStudent: StatusDocumentByStudent;
  statusDocument: StatusDocument[] = [];
  listAttachment: Attachment[] = [];
  listCertificate: Certificate[] = [];
  status: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private statusDocumentService: StatusDocumentService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      const idStatusDocument = res.get('id');
      this.getStatusDocumentById(idStatusDocument);
    });
  }

  getStatusDocumentById(idStatusDocument: string) {
    this.statusDocumentService.getStatusDocumentById(idStatusDocument).subscribe({
      next: (res) => {
        console.log('Student Info ', res);
        this.statusDocumentByStudent = res.statusDocumentByStudent;
        this.statusDocument = res.statusDocument;
        this.listAttachment = res.listAttachment;
        this.listCertificate = res.listCertificate;
        this.status = res.statusDocument[0].status;
      },
      error: (_err) => {
        this.toastService.error('Sucedio un error al obtener datos del tramite');
      },
    });
  }
}
