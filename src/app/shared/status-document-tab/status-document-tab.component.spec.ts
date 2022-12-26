import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDocumentTabComponent } from './status-document-tab.component';

describe('StatusDocumentTabComponent', () => {
  let component: StatusDocumentTabComponent;
  let fixture: ComponentFixture<StatusDocumentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDocumentTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDocumentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
