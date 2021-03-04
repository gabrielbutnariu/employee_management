import { TestBed } from '@angular/core/testing';

import { MockServ1Service } from './mock-serv-1.service';

describe('MockServ1Service', () => {
  let service: MockServ1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockServ1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

