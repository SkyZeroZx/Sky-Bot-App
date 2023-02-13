import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { PreviewFileComponent } from './preview-file.component';

fdescribe('PreviewFileComponent', () => {
  let component: PreviewFileComponent;
  let fixture: ComponentFixture<PreviewFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NgxDocViewerModule, SweetAlert2Module.forRoot()],
      declarations: [PreviewFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
