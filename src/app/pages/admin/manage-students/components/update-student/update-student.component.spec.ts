import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StudentService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { manageUsersRouter } from '../../../manage-users/manage-users.routing';
import { UpdateStudentComponent } from './update-student.component';
import { ManageStudentMock } from '../../manage-student.mock.spec';
import { of } from 'rxjs';

fdescribe('UpdateStudentComponent', () => {
  let component: UpdateStudentComponent;
  let fixture: ComponentFixture<UpdateStudentComponent>;
  let toastrService: ToastrService;
  let studentService: StudentService;
  const student = ManageStudentMock.student;

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
      providers: [ToastrService, StudentService],
      declarations: [UpdateStudentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    toastrService = TestBed.inject(ToastrService);
    studentService = TestBed.inject(StudentService);
    fixture = TestBed.createComponent(UpdateStudentComponent);
    component = fixture.componentInstance;
    component.student = student;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateForm = spyOn(component, 'createFormUpdateStudent');
    component.ngOnInit();
    expect(spyCreateForm).toHaveBeenCalled();
  });

  it('validate ngAfterViewInit', () => {
    const spyShowModal = spyOn(component.modalUpdateStudent, 'show');
    component.ngAfterViewInit();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyResetForm = spyOn(component.updateStudentForm, 'reset');
    const spyCloseEmit = spyOn(component.close, 'emit');
    component.onHidden();
    expect(spyCloseEmit).toHaveBeenCalled();
    expect(spyResetForm).toHaveBeenCalled();
  });

  it('validate updateStudent', () => {
    const spyToast = spyOn(toastrService, 'success');
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const spyUpdateStudent = spyOn(studentService, 'updateStudent').and.returnValue(
      of(null),
    );
    component.updateStudent();
    expect(spyToast).toHaveBeenCalled();
    expect(spyUpdateStudent).toHaveBeenCalledWith(component.updateStudentForm.value);
    expect(spyUpdateEmit).toHaveBeenCalled();
  });
});
