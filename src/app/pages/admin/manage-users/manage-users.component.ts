import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { QueryParamsPagination, User } from '@core/interfaces';
import { UserService } from '@core/services';
import { QUERY_PARAMS_PAGINATON } from '@core/constants/general';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  listUsers: User[] = [];
  queryParams: QueryParamsPagination = QUERY_PARAMS_PAGINATON;
  displayedColumns: string[] = [
    'username',
    'name',
    'fatherLastName',
    'motherLastName',
    'phone',
    'role',
    'status',
    'updateAt',
    'createdAt',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userForm: FormGroup;
  userSelected: User;
  showCreateUser: boolean = false;
  showUpdateUser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.createFormFilterUsers();
    this.searchUserByFilter();
    this.searchUserByStatus();
    this.getUsers();
  }

  createFormFilterUsers() {
    this.userForm = this.fb.group({
      filter: '',
      status: '',
    });
  }

  searchUserByFilter() {
    this.userForm.controls.filter.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((search: string) => {
        this.queryParams.search = search;
        this.getUsers();
        this.paginator.firstPage();
      });
  }

  searchUserByStatus() {
    this.userForm.controls.status.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((status: string) => {
        this.queryParams.optionalSearch = status;
        this.getUsers();
        this.paginator.firstPage();
      });
  }

  getUsers() {
    this.userService.getUsers(this.queryParams).subscribe({
      next: ({ data, meta }) => {
        this.listUsers = data;

        // const listUserMock = data.map((user) => user.username);
        // const blob = new Blob([listUserMock as any], { type: 'text/plain' });
        // const anchor = document.createElement('a');
        // anchor.download = 'some_file_name.txt';
        // anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        // anchor.click();
        this.paginator.length = meta.itemCount;
      },
    });
  }

  onChangePage({ pageIndex, pageSize }: PageEvent) {
    this.queryParams.page = pageIndex + 1;
    this.queryParams.take = pageSize;
    this.getUsers();
  }

  resetUserPassword(username: string) {
    this.userService.resetUserPassword(username).subscribe({
      next: (_res) => {
        this.getUsers();
        this.toastrService.success('Se reseteo exitosamente la contraseña');
      },
    });
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username).subscribe({
      next: (_res) => {
        this.getUsers();
        this.paginator.firstPage();
        this.toastrService.success('Se elimino exitosamente el usuario');
      },
    });
  }

  showModalUpdateUser(user: User) {
    this.userSelected = user;
    this.showUpdateUser = true;
  }

  showModalCreateUser() {
    this.showCreateUser = true;
  }
}
