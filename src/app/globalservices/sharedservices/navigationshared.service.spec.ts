import { TestBed, inject } from '@angular/core/testing';

import { NavigationsharedService } from './navigationshared.service';

describe('NavigationsharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationsharedService]
    });
  });

  it('should be created', inject([NavigationsharedService], (service: NavigationsharedService) => {
    expect(service).toBeTruthy();
  }));
});
