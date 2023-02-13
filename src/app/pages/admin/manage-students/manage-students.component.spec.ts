import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StudentService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { manageUsersRouter } from '../manage-users/manage-users.routing';
import { ManageStudentComponent } from './manage-students.component';
import { ManageStudentMock } from './manage-student.mock.spec';
import { of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

fdescribe('StudentComponent', () => {
  let component: ManageStudentComponent;
  let fixture: ComponentFixture<ManageStudentComponent>;
  let toastrService: ToastrService;
  let studentService: StudentService;
  const studentsPagination = ManageStudentMock.studentsPagination;
  const student = ManageStudentMock.student;
  const idStudent = '123423432432';
  const searchValue = 'student_search';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedMaterialModule,
        CommonModule,
        RouterModule.forChild(manageUsersRouter),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        StudentService,
        FormBuilder,
        { provide: ToastrService, useClass: ToastrService },
      ],
      declarations: [ManageStudentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    toastrService = TestBed.inject(ToastrService);
    studentService = TestBed.inject(StudentService);
    fixture = TestBed.createComponent(ManageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateFormStudent = spyOn(component, 'createFormStudent');
    const spyGetStudent = spyOn(component, 'getStudents');
    const spySearchStudentByFilter = spyOn(component, 'getStudents');

    component.ngOnInit();
    expect(spySearchStudentByFilter).toHaveBeenCalled();
    expect(spyCreateFormStudent).toHaveBeenCalled();
    expect(spyGetStudent).toHaveBeenCalled();
  });

  it('validate getStudents', () => {
    const spyGetStudent = spyOn(studentService, 'getStudents').and.returnValue(
      of(studentsPagination),
    );
    component.getStudents();
    expect(spyGetStudent).toHaveBeenCalledWith(component.queryParams);
    expect(component.listStudents).toEqual(studentsPagination.data);
    expect(component.paginator.length).toEqual(studentsPagination.meta.itemCount);
  });

  it('validate onChangePage', () => {
    const spyGetStudents = spyOn(component, 'getStudents');
    const pageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 0,
      length: 0,
    };
    component.onChangePage(pageEvent);
    expect(component.queryParams.page).toEqual(pageEvent.pageIndex + 1);
    expect(component.queryParams.take).toEqual(pageEvent.pageSize);
    expect(spyGetStudents).toHaveBeenCalled();
  });

  it('validate showModalUpdateStudent', () => {
    component.showModalUpdateStudent(student);
    expect(component.studentSelected).toEqual(student);
    expect(component.showUpdateStudent).toBeTrue();
  });

  it('validate showModalCreateStudent', () => {
    component.showModalCreateStudent();
    expect(component.showCreateStudent).toBeTrue();
  });

  it('validate searchStudentByFilter', fakeAsync(() => {
    const spyGetStudents = spyOn(component, 'getStudents');
    const spyPaginator = spyOn(component.paginator, 'firstPage');
    component.studentForm.controls.filter.setValue(searchValue);
    tick(1_000);
    expect(component.queryParams.search).toEqual(searchValue);
    expect(spyGetStudents).toHaveBeenCalled();
    expect(spyPaginator).toHaveBeenCalled();
  }));

  it('validate deleteStudent', () => {
    const spyDeleteStudent = spyOn(studentService, 'deleteStudent').and.returnValue(
      of(null),
    );
    const spyGetStudents = spyOn(studentService, 'getStudents').and.returnValue(
      of(studentsPagination),
    );
    const spyToast = spyOn(toastrService, 'success');
    component.deleteStudent(idStudent);
    expect(spyDeleteStudent).toHaveBeenCalledWith(idStudent);
    expect(spyToast).toHaveBeenCalled();
    expect(spyGetStudents).toHaveBeenCalled();
  });
});
