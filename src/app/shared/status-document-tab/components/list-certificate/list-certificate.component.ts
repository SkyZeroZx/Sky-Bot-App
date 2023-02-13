import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Certificate } from '@core/interfaces';
import { CertificateService } from '@core/services';


@Component({
  selector: 'app-list-certificate',
  templateUrl: './list-certificate.component.html',
  styleUrls: ['./list-certificate.component.scss'],
})
export class ListCertificateComponent {
  @Input() listCertificate: Certificate[] = [];
  displayColumns: string[] = ['registerDate', 'url', 'preview', 'actions'];
  @Output() update = new EventEmitter();
  constructor(
    private certificateService: CertificateService,
    private toastService: ToastrService,
  ) {}

  deleteCertificate(idCertificate: string) {
    this.certificateService.deleteCertificate(idCertificate).subscribe({
      next: (_res) => {
        this.update.emit();
        this.toastService.success('Certificado eliminando exitosamente');
      },
    });
  }
}
