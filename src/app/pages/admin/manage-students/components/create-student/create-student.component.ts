import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '@core/services';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  @ViewChild('modalCreateStudent') readonly modalCreateStudent: ModalDirective;
  createStudentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormStudent();
  }

  ngAfterViewInit(): void {
    this.modalCreateStudent.show();
  }

  createFormStudent() {
    this.createStudentForm = this.fb.group({
      idStudent: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(35)]),
      ],
      name: [null, Validators.compose([Validators.required, Validators.maxLength(80)])],
      lastName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(120)]),
      ],
      dni: [null, Validators.compose([Validators.required, Validators.maxLength(8)])],
      phone: [null, Validators.compose([Validators.required, Validators.maxLength(9)])],
      caracterValidation: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(1)]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(120),
          Validators.email,
        ]),
      ],
    });
  }

  createStudent() {
    this.studentService.createStudent(this.createStudentForm.value).subscribe({
      next: (_res) => {
        this.update.emit();
        this.toastrService.success('Estudiante registrado exitosamente');
      },
    });
  }

  onHidden() {
    this.close.emit();
    this.createStudentForm.reset();
  }
}
