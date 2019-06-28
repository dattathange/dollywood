import { TestBed, inject } from '@angular/core/testing';

import { LoginsharedService } from './loginshared.service';

describe('LoginsharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginsharedService]
    });
  });

  it('should be created', inject([LoginsharedService], (service: LoginsharedService) => {
    expect(service).toBeTruthy();
  }));
});
