import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCertificateComponent } from './list-certificate.component';

describe('CertificateComponent', () => {
  let component: ListCertificateComponent;
  let fixture: ComponentFixture<ListCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
