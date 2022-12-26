import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStudentComponent } from './document-student.component';

describe('DocumentStudentComponent', () => {
  let component: DocumentStudentComponent;
  let fixture: ComponentFixture<DocumentStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
