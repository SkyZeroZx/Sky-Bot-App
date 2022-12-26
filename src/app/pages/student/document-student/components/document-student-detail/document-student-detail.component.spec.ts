import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStudentDetailComponent } from './document-student-detail.component';

describe('DocumentStudentDetailComponent', () => {
  let component: DocumentStudentDetailComponent;
  let fixture: ComponentFixture<DocumentStudentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentStudentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
