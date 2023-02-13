import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@core/services';
import { User } from '@core/interfaces';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  @Input() user: User;
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  @ViewChild('modalUpdateUser') readonly modalUpdateUser: ModalDirective;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormUpdateUser();
  }

  ngAfterViewInit(): void {
    this.modalUpdateUser.show();
  }

  createFormUpdateUser(): void {
    this.updateUserForm = this.fb.group({
      id: [this.user.id],
      createdAt: [this.user.createdAt],
      updateAt: [this.user.updateAt],
      dni: [
        this.user.dni,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('[0-9]+'),
        ]),
      ],
      phone: [
        this.user.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[0-9]+'),
        ]),
      ],
      username: [
        this.user.username,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(120),
          Validators.email,
        ]),
      ],
      name: [
        this.user.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ],
      status: [this.user.status, Validators.required],
      fatherLastName: [
        this.user.fatherLastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ],
      motherLastName: [
        this.user.motherLastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ],
      role: this.user.role,
    });
  }

  updateUser() {
    this.userService.updateUser(this.updateUserForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo exitosamente el usuario');
        this.update.emit();
      },
    });
  }

  onHidden() {
    this.updateUserForm.reset();
    this.close.emit();
  }
}
