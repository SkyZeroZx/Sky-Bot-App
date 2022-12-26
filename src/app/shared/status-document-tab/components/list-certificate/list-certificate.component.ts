import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Certificate } from '@core/interfaces';
import { CertificateService } from '@core/services';

@Component({
  selector: 'app-list-certificate',
  templateUrl: './list-certificate.component.html',
  styleUrls: ['./list-certificate.component.scss'],
})
export class ListCertificateComponent {
  @Input() listCertificate: Certificate[] = [];
  displayColumns: string[] = ['registerDate', 'url', 'actions'];
  @Output() update = new EventEmitter();
  constructor(private certificateService: CertificateService) {}

  deleteCertificate(idCertificate: string) {
    console.log('deleteCertificate', idCertificate);
    this.update.emit();
  }
}
