import { TestBed, inject } from '@angular/core/testing';

import { RelatedvideosService } from './relatedvideos.service';

describe('RelatedvideosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatedvideosService]
    });
  });

  it('should be created', inject([RelatedvideosService], (service: RelatedvideosService) => {
    expect(service).toBeTruthy();
  }));
});
