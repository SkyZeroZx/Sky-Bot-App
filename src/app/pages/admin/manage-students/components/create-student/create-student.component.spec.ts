import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedMaterialModule } from '@shared/material/material.module';
import { manageUsersRouter } from '../../../manage-users/manage-users.routing';
import { CreateStudentComponent } from './create-student.component';
import { StudentService } from '@core/services';
import { of } from 'rxjs';

fdescribe('CreateStudentComponent', () => {
  let component: CreateStudentComponent;
  let fixture: ComponentFixture<CreateStudentComponent>;
  let toastrService: ToastrService;
  let studentService: StudentService;

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
      declarations: [CreateStudentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    toastrService = TestBed.inject(ToastrService);
    studentService = TestBed.inject(StudentService);
    fixture = TestBed.createComponent(CreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateForm = spyOn(component, 'createFormStudent');
    component.ngOnInit();
    expect(spyCreateForm).toHaveBeenCalled();
  });

  it('validate ngAfterViewInit', () => {
    const spyShowModal = spyOn(component.modalCreateStudent, 'show');
    component.ngAfterViewInit();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyResetForm = spyOn(component.createStudentForm, 'reset');
    const spyCloseEmit = spyOn(component.close, 'emit');
    component.onHidden();
    expect(spyCloseEmit).toHaveBeenCalled();
    expect(spyResetForm).toHaveBeenCalled();
  });

  it('validate createStudent', () => {
    const spyCreateStudent = spyOn(studentService, 'createStudent').and.returnValue(
      of(null),
    );
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const toastSuccess = spyOn(toastrService, 'success');
    component.createStudent();
    expect(spyCreateStudent).toHaveBeenCalled();
    expect(toastSuccess).toHaveBeenCalled();
    expect(spyUpdateEmit).toHaveBeenCalled();
  });
});
