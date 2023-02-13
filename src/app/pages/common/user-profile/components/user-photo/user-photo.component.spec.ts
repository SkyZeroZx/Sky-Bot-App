import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SwalPortalTargets, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserPhotoComponent } from './user-photo.component';
import { of, throwError } from 'rxjs';
import * as helper from '@core/helpers/helper';
import { auth0Config } from '@core/config';
import { AuthModule } from '@auth0/auth0-angular';
import { UserService } from '../../../../../core/services';

fdescribe('UserPhotoComponent', () => {
  let component: UserPhotoComponent;
  let fixture: ComponentFixture<UserPhotoComponent>;
  let toastrService: ToastrService;
  let userService: UserService;
  let mockFile: File = null;
  let mockEventFile: any = {
    target: {
      files: [mockFile],
    },
  };
  const previewFile: helper.PreviewFile = {
    result: 'awesome_result',
    isDoc: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPhotoComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        NgOptimizedImage,
        CommonModule,
        AuthModule.forRoot(auth0Config),
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        SweetAlert2Module.forRoot(),
      ],
      providers: [
        ToastrService,
        UserService,
        SwalPortalTargets,
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhotoComponent);
    userService  = TestBed.inject(UserService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('UserPhotoComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate userAvatarSelected OK', async () => {
    const spyHelperPreview = spyOn(helper, 'previewUrlFile').and.returnValue(
      Promise.resolve(previewFile),
    );
    const spySwalFire = spyOn(component.swalUploadPhoto, 'fire');
    await component.userAvatarSelected(mockEventFile);
    expect(component.fileUserAvatar).toEqual(mockEventFile.target.files[0]);
    expect(spyHelperPreview).toHaveBeenCalled();
    expect(spySwalFire).toHaveBeenCalled();
  });

  it('validate certificateSelected', async () => {
    const spyHelperPreview = spyOn(helper, 'previewUrlFile').and.returnValue(
      Promise.reject(new Error()),
    );
    const spyToastError = spyOn(toastrService, 'error');
    await component.userAvatarSelected(mockEventFile);
    expect(spyToastError).toHaveBeenCalled();
    expect(spyHelperPreview).toHaveBeenCalled();
  });

  it('Validate uploadPhoto OK', () => {
    const spyUserService = spyOn(userService, 'uploadPhoto').and.returnValue(of(null));
    component.uploadPhoto();
    expect(spyUserService).toHaveBeenCalled();
    expect(component.inputUserPhoto).toEqual(component.swalPhotoUser);
  });
});
