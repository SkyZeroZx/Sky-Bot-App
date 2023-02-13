import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedMaterialModule } from '@shared/material/material.module';
import { ManageUsersMock } from '../../manage-users.mock.spec';
import { manageUsersRouter } from '../../manage-users.routing';
import { CreateUserComponent } from './create-user.component';
import { UserService } from '@core/services';
import { of } from 'rxjs';

fdescribe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let toastrService: ToastrService;
  let userService: UserService;
  const user = ManageUsersMock.userMock;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
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
        FormBuilder,
        UserService,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('CreateUserComponent Create', () => {
    expect(component).toBeTruthy();
  });

  it('validate createUser', () => {
    const spyResetForm = spyOn(component.createUserForm, 'reset');
    const spyCreateUser = spyOn(userService, 'createUser').and.returnValue(of(null));
    const spyToastService = spyOn(toastrService, 'success');
    const spyUpdateEmit = spyOn(component.update, 'emit');
    const formValues = component.createUserForm.value
    component.createUser();
    expect(spyCreateUser).toHaveBeenCalledWith(formValues);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyUpdateEmit).toHaveBeenCalled();
    expect(spyResetForm).toHaveBeenCalled();
  });

  it('validate onHidden', () => {
    const spyResetForm = spyOn(component.createUserForm, 'reset');
    const spyCloseEmit = spyOn(component.close, 'emit');
    component.onHidden();
    expect(spyCloseEmit).toHaveBeenCalled();
    expect(spyResetForm).toHaveBeenCalled();
  });
});
