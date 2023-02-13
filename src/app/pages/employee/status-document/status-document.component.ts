import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { QueryParamsPagination, StatusDocumentByStudent } from '@core/interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { StatusDocumentService } from '@core/services';
import { QUERY_PARAMS_PAGINATON } from '@core/constants/general';

@Component({
  selector: 'app-status-document',
  templateUrl: './status-document.component.html',
  styleUrls: ['./status-document.component.scss'],
})
export class StatusDocumentComponent implements OnInit {
  listStatusDocument: StatusDocumentByStudent[] = [];
  queryParams: QueryParamsPagination = QUERY_PARAMS_PAGINATON;
  displayedColumns: string[] = [
    'idStatusDocument',
    'idStudent',
    'studentName',
    'studentLastName',
    'documentName',
    'registerDate',
    'status',
    'actions',
  ];
  statusDocumentForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private statusDocumentService: StatusDocumentService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createFormStatusDocuments();
    this.searchStatusDocumentByFilter();
    this.searchUserByStatus();
    this.getStatusDocument();
  }

  createFormStatusDocuments() {
    this.statusDocumentForm = this.fb.group({
      filter: '',
      status: '',
    });
  }

  searchStatusDocumentByFilter() {
    this.statusDocumentForm.controls.filter.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((search: string) => {
        this.queryParams.search = search;
        this.getStatusDocument();
        this.paginator.firstPage();
      });
  }

  searchUserByStatus() {
    this.statusDocumentForm.controls.status.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((status: string) => {
        this.queryParams.optionalSearch = status;
        this.getStatusDocument();
        this.paginator.firstPage();
      });
  }

  onChangePage({ pageIndex, pageSize }: PageEvent) {
    this.queryParams.page = pageIndex + 1;
    this.queryParams.take = pageSize;

    this.getStatusDocument();
  }

  getStatusDocument() {
    this.statusDocumentService.getStatusDocumentPagination(this.queryParams).subscribe({
      next: ({ data, meta }) => {
        this.listStatusDocument = data;
        this.paginator.length = meta.itemCount;
      },
    });
  }
}
