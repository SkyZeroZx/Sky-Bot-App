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
  @Input() inputStudent: Student;
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
        this.inputStudent.idStudent,
        Validators.compose([Validators.required, Validators.maxLength(35)]),
      ],
      name: [
        this.inputStudent.name,
        Validators.compose([Validators.required, Validators.maxLength(80)]),
      ],
      lastName: [
        this.inputStudent.lastName,
        Validators.compose([Validators.required, Validators.maxLength(120)]),
      ],
      dni: [
        this.inputStudent.dni,
        Validators.compose([Validators.required, Validators.maxLength(8)]),
      ],
      phone: [
        this.inputStudent.phone,
        Validators.compose([Validators.required, Validators.maxLength(9)]),
      ],
      caracterValidation: [
        this.inputStudent.caracterValidation,
        Validators.compose([Validators.required, Validators.maxLength(1)]),
      ],
      email: [
        this.inputStudent.email,
        Validators.compose([
          Validators.required,
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(120),
            Validators.email,
          ]),
        ]),
      ],
    });
  }

  ngAfterViewInit(): void {
    this.modalUpdateStudent.show();
  }

  updateStudent() {
    console.log('Student updated', this.updateStudentForm.value);
    this.studentService.updateStudent(this.updateStudentForm.value).subscribe({
      next: (_res) => {
        this.update.emit();
        this.toastrService.success('Estudiante actualizado exitosamente');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al actualizar al estudiante');
      },
    });
  }

  onHidden() {
    this.close.emit();
    this.updateStudentForm.reset();
  }
}
