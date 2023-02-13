import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '@shared/material/material.module';
import { StatusDocumentTabModule } from '@shared/status-document-tab/status-document.module';
import { StatusDocumentService } from '@core/services';
import { DocumentStudentComponent } from './document-student.component';
import { DocumentStudentRoutingModule } from './document-student.routing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';

fdescribe('DocumentStudentComponent', () => {
  let component: DocumentStudentComponent;
  let statusDocumentService: StatusDocumentService;
  let fixture: ComponentFixture<DocumentStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        DocumentStudentRoutingModule,
        StatusDocumentTabModule,
      ],
      providers: [StatusDocumentService],
      declarations: [DocumentStudentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusDocumentService = TestBed.inject(StatusDocumentService);
    fixture = TestBed.createComponent(DocumentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateDocumentStudentForm = spyOn(component, 'createDocumentStudentForm');
    const spyGetStatusDocumentByStudent = spyOn(component, 'getStatusDocumentByStudent');
    const spyOnChangeFilter = spyOn(component, 'onChangeFilter');
    component.ngOnInit();
    expect(spyCreateDocumentStudentForm).toHaveBeenCalled();
    expect(spyGetStatusDocumentByStudent).toHaveBeenCalled();
    expect(spyOnChangeFilter).toHaveBeenCalled();
  });

  it('validate onChangeFilter when emit values', () => {
    const textSearch = 'awesome filter search';
    component.dataSource = new MatTableDataSource([]);
    component.documentStudentForm.controls.filter.setValue(textSearch);
    expect(component.dataSource.filter).toEqual(textSearch);
  });

  it('validate getStatusDocumentByStudent', () => {
    const spyStatusDocumentService = spyOn(
      statusDocumentService,
      'getStatusDocumentByStudent',
    ).and.returnValue(of([]));
    component.getStatusDocumentByStudent();

    expect(component.dataSource).toBeDefined();
    expect(component.dataSource.paginator).toEqual(component.paginator);
    expect(spyStatusDocumentService).toHaveBeenCalled();
  });
});
