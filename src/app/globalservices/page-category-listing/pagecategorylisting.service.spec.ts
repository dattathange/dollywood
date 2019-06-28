import { TestBed, inject } from '@angular/core/testing';

import { PageCategoryListingService } from './pagecategorylisting.service';

describe('PageCategoryListingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [PageCategoryListingService]
    });
  });

    it('should be created', inject([PageCategoryListingService], (service: PageCategoryListingService) => {
    expect(service).toBeTruthy();
  }));
});
