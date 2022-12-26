import { TestBed } from '@angular/core/testing';

import { StatusDocumentService } from './status-document.service';

describe('StatusDocumentService', () => {
  let service: StatusDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
