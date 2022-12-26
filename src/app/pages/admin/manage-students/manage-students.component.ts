import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QueryParamsPagination, Student } from '@core/interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs';
 
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { StudentService } from '@core/services';
import { QUERY_PARAMS_PAGINATON } from '@core/constants/Constant';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss'],
})
export class ManageStudentComponent implements OnInit {
  queryParams: QueryParamsPagination = QUERY_PARAMS_PAGINATON;
  displayedColumns: string[] = [
    'idStudent',
    'name',
    'lastName',
    'caracterValidation',
    'phone',
    'email',
    'dni',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listStudents: Student[] = [];
  studentForm: FormGroup;
  studentSelected: Student;
  showCreateStudent: boolean = false;
  showUpdateStudent: boolean = false;

  constructor(
    private studentService: StudentService,
    private toastService: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createFormStudent();
    this.getStudents();
    this.searchStudentByFilter();
  }

  createFormStudent() {
    this.studentForm = this.fb.group({
      filter: null,
    });
  }

  searchStudentByFilter() {
    this.studentForm.controls.filter.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((search: string) => {
        this.queryParams.search = search;
        this.getStudents();
        this.paginator.firstPage();
      });
  }

  getStudents() {
    this.studentService.getStudents(this.queryParams).subscribe({
      next: ({ data, meta }) => {
        this.listStudents = data;
        this.paginator.length = meta.itemCount;
      },
      error: (_err) => {
        this.toastService.error('Sucedio un error al buscar estudiantes');
      },
    });
  }

  onChangePage({ pageIndex, pageSize }: PageEvent) {
    this.queryParams.page = pageIndex + 1;
    this.queryParams.take = pageSize;

    this.getStudents();
  }

  deleteStudent(idStudent: string) {
    this.studentService.deleteStudent(idStudent).subscribe({
      next: (_res) => {
        this.getStudents();
        this.paginator.firstPage();
        this.toastService.success('Estudiante eliminado exitosamente');
      },
      error: (_err) => {
        this.toastService.error('Sucedio un error al eliminar al estudiante');
      },
    });
  }

  showModalCreateStudent() {
    this.showCreateStudent = true;
  }

  showModalUpdateStudent(student: Student) {
    this.studentSelected = student;
    this.showUpdateStudent = true;
  }
}
