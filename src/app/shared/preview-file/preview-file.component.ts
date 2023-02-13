import { Component, Input } from '@angular/core';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss'],
})
export class PreviewFileComponent {
  @Input() url :string ='';
  constructor(public readonly swalPortalTargets: SwalPortalTargets) {}
}
