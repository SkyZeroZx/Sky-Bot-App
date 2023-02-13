import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '@core/services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Student } from '@core/interfaces';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss'],
})
export class UpdateStudentComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  @ViewChild('modalUpdateStudent') readonly modalUpdateStudent: ModalDirective;
  @Input() student: Student;
  updateStudentForm: FormGroup;
  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormUpdateStudent();
  }

  createFormUpdateStudent() {
    this.updateStudentForm = this.fb.group({
      idStudent: [
        this.student.idStudent,
        Validators.compose([Validators.required, Validators.maxLength(35)]),
      ],
      name: [
        this.student.name,
        Validators.compose([Validators.required, Validators.maxLength(80)]),
      ],
      lastName: [
        this.student.lastName,
        Validators.compose([Validators.required, Validators.maxLength(120)]),
      ],
      dni: [
        this.student.dni,
        Validators.compose([Validators.required, Validators.maxLength(8)]),
      ],
      phone: [
        this.student.phone,
        Validators.compose([Validators.required, Validators.maxLength(9)]),
      ],
      caracterValidation: [
        this.student.caracterValidation,
        Validators.compose([Validators.required, Validators.maxLength(1)]),
      ],
      email: [
        this.student.email,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(120),
          Validators.email,
        ]),
      ],
    });
  }

  ngAfterViewInit(): void {
    this.modalUpdateStudent.show();
  }

  updateStudent() {
    this.studentService.updateStudent(this.updateStudentForm.value).subscribe({
      next: (_res) => {
        this.update.emit();
        this.toastrService.success('Estudiante actualizado exitosamente');
      },
    });
  }

  onHidden() {
    this.close.emit();
    this.updateStudentForm.reset();
  }
}
