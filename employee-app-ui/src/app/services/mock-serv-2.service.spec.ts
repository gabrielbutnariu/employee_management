import { TestBed } from '@angular/core/testing';

import { MockServ2Service } from './mock-serv-2.service';

describe('MockServ2Service', () => {
  let service: MockServ2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockServ2Service);
  });

  it('should be  created', () => {
    expect(service).toBeTruthy();
  });
});
