import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthService, UserService } from '@core/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  photoUser: string;
  userProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.createUserProfileForm();
    this.getProfile();
  }

  createUserProfileForm() {
    this.userProfileForm = this.fb.group({
      id: null,
      username: null,
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ],
      role: null,
      status: null,
      motherLastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ],
      fatherLastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ],
      createAt: null,
      updateAt: null,
      dni: null,
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userProfileForm.patchValue({
          ...res,
          updateAt: this.datePipe.transform(res.updateAt, 'short'),
        });
        this.photoUser = res.photo;
      },
    });
  }

  updateProfile() {
    this.userService.updateUser(this.userProfileForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo exitosamente su perfil');
      },
    });
  }

  changePassword() {
    this.authService.swalChangePassword();
  }

  logOut() {
    this.authService.logOut();
  }
}
