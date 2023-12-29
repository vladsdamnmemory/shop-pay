import { TestBed } from '@angular/core/testing';

import { MockHttpServiceService } from './mock-http-service.service';

describe('MockHttpServiceService', () => {
  let service: MockHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
