import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { previewUrlFile } from '@core/helpers/helper';
import { UserService } from '@core/services';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss'],
})
export class UserPhotoComponent {
  @Input()
  inputUserPhoto: string;
  @ViewChild('userAvatarFile')
  readonly inputFileAvatarUser: ElementRef;
  @ViewChild('swalUploadPhoto')
  readonly swalUploadPhoto: SwalComponent;
  swalPhotoUser: string;
  fileUserAvatar: File;

  constructor(
    public readonly swalPortalTargets: SwalPortalTargets,
    private userService: UserService,
    private toastrService: ToastrService,
  ) {}

  async userAvatarSelected(event: any) {
    if (typeof event.target.files[0] !== 'undefined') {
      try {
        this.swalPhotoUser = (await previewUrlFile(event.target.files[0]))
          .result as string;
        this.fileUserAvatar = event.target.files[0];
        this.swalUploadPhoto.fire();
      } catch (error) {
        this.toastrService.error('Sucedio un error al seleccionar su foto');
      }
    }
  }

  uploadPhoto() {
    this.userService.uploadPhoto(this.fileUserAvatar).subscribe({
      next: (_res) => {
        this.inputUserPhoto = this.swalPhotoUser;
      },
    });
  }
}
