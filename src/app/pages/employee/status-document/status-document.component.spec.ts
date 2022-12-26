import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDocumentComponent } from './status-document.component';

describe('StatusDocumentComponent', () => {
  let component: StatusDocumentComponent;
  let fixture: ComponentFixture<StatusDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
