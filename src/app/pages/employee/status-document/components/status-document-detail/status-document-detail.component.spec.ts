import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDocumentDetailComponent } from './status-document-detail.component';

describe('StatusDocumentDetailComponent', () => {
  let component: StatusDocumentDetailComponent;
  let fixture: ComponentFixture<StatusDocumentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDocumentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDocumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
