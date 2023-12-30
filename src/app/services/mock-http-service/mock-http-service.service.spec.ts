import {inject, TestBed} from '@angular/core/testing';
import {MockHttpServiceService} from './mock-http-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('MockHttpServiceService', () => {
  let service: MockHttpServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockHttpServiceService,
        {
          provide: 'jsonplaceholder_API',
          useValue: 'https://jsonplaceholder.typicode.com',
        },
      ],
    });

    service = TestBed.inject(MockHttpServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users data from the API', inject(
    [MockHttpServiceService, HttpTestingController, 'jsonplaceholder_API'],
    (mockService: MockHttpServiceService, httpMock: HttpTestingController, apiUrl: string) => {
      let responseReceived = false;

      // HTTP request
      mockService.getUsers().subscribe(() => {
        responseReceived = true;
      });

      // Setting up the mock request with the injected API URL
      const req = httpMock.expectOne(`${apiUrl}/users`);

      expect(req.request.method).toBe('GET');

      // Respond with an empty object or any mock data
      req.flush({});

      // Verify that there are no outstanding requests
      httpMock.verify();

      expect(responseReceived).toBeTruthy();
    }
  ));

});
