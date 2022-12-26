import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { QueryParamsPagination, User } from '@core/interfaces';

import { ReporteService, UserService } from '@core/services';
import { QUERY_PARAMS_PAGINATON } from '@core/constants/Constant';

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
    private reporteService: ReporteService,
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
        this.paginator.length = meta.itemCount;
      },
      error: (_err) => {
        this.toastrService.error('Error al listar usuarios');
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
      error: (_err) => {
        this.toastrService.error('Sucedio un error al resetear el usuario');
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
      error: (_err) => {
        this.toastrService.error('Sucedio un error al eliminar el usuario');
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
