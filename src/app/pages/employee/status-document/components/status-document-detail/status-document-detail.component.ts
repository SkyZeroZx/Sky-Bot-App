import {
  Attachment,
  Certificate,
  StatusDocument,
  StatusDocumentByStudent,
} from '@core/interfaces';
import { StatusDocumentService } from '@core/services';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status-document-detail',
  templateUrl: './status-document-detail.component.html',
  styleUrls: ['./status-document-detail.component.scss'],
})
export class StatusDocumentDetailComponent implements OnInit {
  statusDocumentByStudent: StatusDocumentByStudent;
  statusDocument: StatusDocument[] = [];
  listAttachment: Attachment[] = [];
  listCertificate: Certificate[] = [];
  showCreateStatus: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private statusDocumentService: StatusDocumentService,
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
        this.statusDocumentByStudent = res.statusDocumentByStudent;
        this.statusDocument = res.statusDocument;
        this.listAttachment = res.listAttachment;
        this.listCertificate = res.listCertificate;
      },
    });
  }

  showModalCreateStatus() {
    this.showCreateStatus = true;
  }
}
