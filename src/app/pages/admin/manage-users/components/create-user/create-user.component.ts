import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@core/services';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements AfterViewInit, OnInit {
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  @ViewChild('modalCreateUser') readonly modalCreateUser: ModalDirective;

  createUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormCreateUser();
  }

  ngAfterViewInit(): void {
    this.modalCreateUser.show();
  }

  createFormCreateUser() {
    this.createUserForm = this.fb.group({
      phone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('[0-9]+'),
        ]),
      ],
      dni: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('[0-9]+'),
        ]),
      ],
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(120),
          Validators.email,
        ]),
      ],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
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
      motherLastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ],
      role: ['admin'],
    });
  }

  createUser() {
    this.userService.createUser(this.createUserForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se creo exitosamente el usuario');
        this.createUserForm.reset();
        this.update.emit();
      },
    });
  }

  onHidden() {
    this.createUserForm.reset();
    this.close.emit();
  }
}
