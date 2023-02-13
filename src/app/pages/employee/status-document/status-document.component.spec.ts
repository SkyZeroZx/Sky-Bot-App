import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { StatusDocumentService } from '@core/services';
import { SharedMaterialModule } from '@shared/material/material.module';
import { StatusDocumentTabModule } from '@shared/status-document-tab/status-document.module';
import { StatusDocumentComponent } from './status-document.component';
import { StatusDocumentRoutingModule } from './status-document.routing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { StatusDocumentMock } from './status-document.mock.spec';

fdescribe('StatusDocumentComponent', () => {
  let component: StatusDocumentComponent;
  let fixture: ComponentFixture<StatusDocumentComponent>;
  let statusDocumentService: StatusDocumentService;
  const statusDocumentPagination = StatusDocumentMock.statusDocumentPagination;
  const searchValue = StatusDocumentMock.searchValue;
  const searchStatus = StatusDocumentMock.searchStatus;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        NgxDocViewerModule,
        ModalModule,
        StatusDocumentRoutingModule,
        StatusDocumentTabModule,
      ],
      providers: [StatusDocumentService],
      declarations: [StatusDocumentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    statusDocumentService = TestBed.inject(StatusDocumentService);
    fixture = TestBed.createComponent(StatusDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate ngOnInit', () => {
    const spyCreateFormStatusDocuments = spyOn(component, 'createFormStatusDocuments');
    const spySearchStatusDocumentByFilter = spyOn(
      component,
      'searchStatusDocumentByFilter',
    );
    const spySearchUserByStatus = spyOn(component, 'searchUserByStatus');
    const spyGetStatusDocument = spyOn(component, 'getStatusDocument');
    component.ngOnInit();
    expect(spyCreateFormStatusDocuments).toHaveBeenCalled();
    expect(spySearchStatusDocumentByFilter).toHaveBeenCalled();
    expect(spySearchUserByStatus).toHaveBeenCalled();
    expect(spyGetStatusDocument).toHaveBeenCalled();
  });

  it('validate searchStatusDocumentByFilter', fakeAsync(() => {
    const spyPaginator = spyOn(component.paginator, 'firstPage');
    const spyGetStatusDocument = spyOn(component, 'getStatusDocument');
    component.statusDocumentForm.controls.filter.setValue(searchValue);
    tick(1000);
    expect(spyPaginator).toHaveBeenCalled();
    expect(component.queryParams.search).toEqual(searchValue);
    expect(spyGetStatusDocument).toHaveBeenCalled();
  }));

  it('validate searchUserByStatus', fakeAsync(() => {
    const spyPaginator = spyOn(component.paginator, 'firstPage');
    const spyGetStatusDocument = spyOn(component, 'getStatusDocument');
    component.statusDocumentForm.controls.status.setValue(searchStatus);
    tick(1000);
    expect(spyPaginator).toHaveBeenCalled();
    expect(component.queryParams.optionalSearch).toEqual(searchStatus);
    expect(spyGetStatusDocument).toHaveBeenCalled();
  }));

  it('validate onChangePage', () => {
    const spyGetStatusDocument = spyOn(component, 'getStatusDocument');
    const pageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 0,
      length: 0,
    };
    component.onChangePage(pageEvent);
    expect(component.queryParams.page).toEqual(pageEvent.pageIndex + 1);
    expect(component.queryParams.take).toEqual(pageEvent.pageSize);
    expect(spyGetStatusDocument).toHaveBeenCalled();
  });

  it('validate getStatusDocumentPagination', () => {
    const spyStatusDocumentService = spyOn(
      statusDocumentService,
      'getStatusDocumentPagination',
    ).and.returnValue(of(statusDocumentPagination));
    component.getStatusDocument();
    expect(spyStatusDocumentService).toHaveBeenCalledWith(component.queryParams);
    expect(component.listStatusDocument).toEqual(statusDocumentPagination.data);
    expect(component.paginator.length).toEqual(statusDocumentPagination.meta.itemCount);
  });
});
