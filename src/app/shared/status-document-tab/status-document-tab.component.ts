import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { StatusDocument, Attachment, Certificate } from '@core/interfaces';
import { take } from 'rxjs';
import { IS_ADMINSITRATIVE_ROLE } from '@core/constants/general';
import { ListCertificateComponent, ListStatusComponent } from './components';

@Component({
  selector: 'app-status-document-tab',
  templateUrl: './status-document-tab.component.html',
  styleUrls: ['./status-document-tab.component.scss'],
})
export class StatusDocumentTabComponent implements OnInit {
  @Input() statusDocument: StatusDocument[] = [];
  @Input() listAttachment: Attachment[] = [];
  @Input() listCertificate: Certificate[] = [];
  @Output() update = new EventEmitter();
  @ViewChild('listCertificateComponent')
  listCertificateComponent: ListCertificateComponent;
  @ViewChild('listStatusComponent')
  listStatusComponent: ListStatusComponent;

  constructor(private auth0Service: Auth0Service) {}

  ngOnInit(): void {
    this.auth0Service.user$.pipe(take(1)).subscribe({
      next: ({ role }) => {
        if (!IS_ADMINSITRATIVE_ROLE(role)) {
          this.listCertificateComponent.displayColumns.pop();
          this.listStatusComponent.displayColumns.pop();
        }
      },
    });
  }

  onUpdate() {
    this.update.emit();
  }
}
