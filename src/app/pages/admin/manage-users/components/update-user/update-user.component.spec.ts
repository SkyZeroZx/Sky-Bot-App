import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '@core/services';
import { ManageUsersMock } from '../../manage-users.mock.spec';
import { manageUsersRouter } from '../../manage-users.routing';
import { UpdateUserComponent } from './update-user.component';
import { of } from 'rxjs';

fdescribe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let userService: UserService;
  let toastrService: ToastrService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(manageUsersRouter),
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        UserService,
        FormBuilder,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    component.user = ManageUsersMock.userMock;
    userService = TestBed.inject(UserService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('UpdateUserComponent Create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateFormUpdateUser = spyOn(component, 'createFormUpdateUser');
    component.ngOnInit();
    expect(spyCreateFormUpdateUser).toHaveBeenCalled();
  });

  it('validate ngAfterViewInit', () => {
    const spyModalUpdateUser = spyOn(component.modalUpdateUser, 'show');
    component.ngAfterViewInit();
    expect(spyModalUpdateUser).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyResetForm = spyOn(component.updateUserForm, 'reset');
    const spyCloseEmit = spyOn(component.close, 'emit');
    component.onHidden();
    expect(spyCloseEmit).toHaveBeenCalled();
    expect(spyResetForm).toHaveBeenCalled();
  });

  it('validate updateUser', () => {
    const spyUpdateUser = spyOn(userService, 'updateUser').and.returnValue(of(null));
    const spyToastService = spyOn(toastrService, 'success');
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const formValues = component.updateUserForm.value;
    component.updateUser();
    expect(spyUpdateUser).toHaveBeenCalledWith(formValues);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyUpdateEmit).toHaveBeenCalled();
  });
});
