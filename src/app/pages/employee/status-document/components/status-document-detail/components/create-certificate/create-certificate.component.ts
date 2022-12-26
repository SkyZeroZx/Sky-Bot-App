import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { StatusDocumentByStudent } from '@core/interfaces';
import { previewUrlFile } from '@core/helpers/helper';
import { CertificateService } from '@core/services';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.scss'],
})
export class CreateCertificateComponent {
  @Input() statusDocumentByStudent: StatusDocumentByStudent;
  @Output() update = new EventEmitter();
  @ViewChild('inputFileCertificate')
  readonly inputFileCertificate: ElementRef;
  @ViewChild('swalUploadCertificate')
  readonly swalUploadCertificate: SwalComponent;
  swalFilePreview: string = '';
  fileCertificate: File;

  constructor(
    private toastService: ToastrService,
    public readonly swalPortalTargets: SwalPortalTargets,
    private certificateService: CertificateService,
  ) {}

  uploadCertificate() {
    console.log('Upload certificate ', this.fileCertificate);
  }

  async certificateSelected(event: any) {
    if (typeof event.target.files[0] !== 'undefined') {
      try {
        this.swalFilePreview = await previewUrlFile(event.target.files[0]);
        this.fileCertificate = event.target.files[0];

        console.log('data processed', this.swalFilePreview);
        console.log('My input', this.statusDocumentByStudent);
        this.swalUploadCertificate.fire();
        this.inputFileCertificate.nativeElement.value = null;
      } catch (error) {
        this.toastService.error('Sucedio un error al seleccionar el certificado');
      }
    }
  }
}
