import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { UserService } from '@core/services';
import { ManageUsersComponent } from './manage-users.component';
import { ManageUsersMock } from './manage-users.mock.spec';
import { manageUsersRouter } from './manage-users.routing';
import { SharedMaterialModule } from '../../../shared/material/material.module';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';

fdescribe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;
  let toastrService: ToastrService;
  let userService: UserService;
  const searchValue = 'search';
  const searchStatus = 'status';
  const user = ManageUsersMock.userMock;
  const usersPagination = ManageUsersMock.usersPagination;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUsersComponent],
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
        UserService,
        FormBuilder,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersComponent);
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ManageUsersComponent Create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateFormFilterUsers = spyOn(component, 'createFormFilterUsers');
    const spySearchUserByFilter = spyOn(component, 'searchUserByFilter');
    const spySearchUserByStatus = spyOn(component, 'searchUserByStatus');
    const spyGetUsers = spyOn(component, 'getUsers');
    component.ngOnInit();
    expect(spyCreateFormFilterUsers).toHaveBeenCalled();
    expect(spySearchUserByFilter).toHaveBeenCalled();
    expect(spySearchUserByStatus).toHaveBeenCalled();
    expect(spyGetUsers).toHaveBeenCalled();
  });

  it('validate searchUserByFilter', fakeAsync(() => {
    const spyGetUsers = spyOn(component, 'getUsers');
    const spyPaginator = spyOn(component.paginator, 'firstPage');
    component.userForm.controls.filter.setValue(searchValue);
    tick(1000);
    expect(component.queryParams.search).toEqual(searchValue);
    expect(spyPaginator).toHaveBeenCalled();
    expect(spyGetUsers).toHaveBeenCalled();
  }));

  it('validate searchUserByStatus', fakeAsync(() => {
    const spyPaginator = spyOn(component.paginator, 'firstPage');
    const spyGetUsers = spyOn(component, 'getUsers');
    component.userForm.controls.status.setValue(searchStatus);
    tick(1000);
    expect(spyPaginator).toHaveBeenCalled();
    expect(component.queryParams.optionalSearch).toEqual(searchStatus);
    expect(spyGetUsers).toHaveBeenCalled();
  }));

  it('validate onChangePage', () => {
    const spyGetUsers = spyOn(component, 'getUsers');
    const pageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 0,
      length: 0,
    };
    component.onChangePage(pageEvent);
    expect(component.queryParams.page).toEqual(pageEvent.pageIndex + 1);
    expect(component.queryParams.take).toEqual(pageEvent.pageSize);
    expect(spyGetUsers).toHaveBeenCalled();
  });

  it('validate showModalCreateUser', () => {
    component.showModalCreateUser();
    expect(component.showCreateUser).toBeTrue();
  });

  it('validate showModalUpdateUser', () => {
    component.showModalUpdateUser(user);
    expect(component.userSelected).toEqual(user);
    expect(component.showUpdateUser).toBeTrue();
  });

  it('validate resetUserPassword', () => {
    const spyGetUsers = spyOn(component, 'getUsers');
    const spyToastService = spyOn(toastrService, 'success');
    const spyUserService = spyOn(userService, 'resetUserPassword').and.returnValue(
      of(null),
    );
    component.resetUserPassword(user.username);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyGetUsers).toHaveBeenCalled();
    expect(spyUserService).toHaveBeenCalledWith(user.username);
  });

  it('validate getUser', () => {
    const spyUserService = spyOn(userService, 'getUsers').and.returnValue(
      of(usersPagination),
    );
    component.getUsers();
    expect(component.listUsers).toEqual(usersPagination.data);
    expect(component.paginator.length).toEqual(usersPagination.meta.itemCount);
    expect(spyUserService).toHaveBeenCalled();
  });

  it('validate deleteUser', () => {
    const spyPaginator = spyOn(component.paginator, 'firstPage');
    const spyGetUsers = spyOn(component, 'getUsers');
    const spyUserService = spyOn(userService, 'deleteUser').and.returnValue(of(null));
    component.deleteUser(user.username);
    expect(spyGetUsers).toHaveBeenCalled();
    expect(spyUserService).toHaveBeenCalledWith(user.username);
    expect(spyPaginator).toHaveBeenCalled();
  });
});
