import { TestBed, inject } from '@angular/core/testing';

import { PrimaryNavigationService } from './primary-navigation.service';

describe('PrimaryNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrimaryNavigationService]
    });
  });

  it('should be created', inject([PrimaryNavigationService], (service: PrimaryNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
