import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttachmentComponent } from './list-attachment.component';

describe('ListAttachmentComponent', () => {
  let component: ListAttachmentComponent;
  let fixture: ComponentFixture<ListAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAttachmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
