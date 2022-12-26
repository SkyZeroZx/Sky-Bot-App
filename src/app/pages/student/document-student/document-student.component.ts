import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusDocumentService } from '@core/services';
import { StatusDocumentByStudent } from '@core/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-student',
  templateUrl: './document-student.component.html',
  styleUrls: ['./document-student.component.scss'],
})
export class DocumentStudentComponent implements OnInit {
  dataSource: MatTableDataSource<StatusDocumentByStudent>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'idStatusDocument',
    'registerDate',
    'status',
    'documentName',
    'actions',
  ];
  documentStudentForm: FormGroup;

  constructor(
    private statusDocumentService: StatusDocumentService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createDocumentStudentForm();
    this.getStatusDocumentByStudent();
    this.onChangeFilter();
  }

  createDocumentStudentForm() {
    this.documentStudentForm = this.fb.group({
      filter: '',
    });
  }

  onChangeFilter() {
    this.documentStudentForm.valueChanges.subscribe(({ filter }) => {
      this.dataSource.filter = filter.trim().toLowerCase();
    });
  }

  getStatusDocumentByStudent() {
    this.statusDocumentService.getStatusDocumentByStudent().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log('mis tramites estudiante son ', res);
      },
    });
  }
}
