import { TestBed, inject } from '@angular/core/testing';

import { PageCategoryService } from './pagecategory.service';

describe('PageCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [PageCategoryService]
    });
  });

    it('should be created', inject([PageCategoryService], (service: PageCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
