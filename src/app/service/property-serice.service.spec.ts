import { TestBed, inject } from '@angular/core/testing';

import { PropertySericeService } from './property-serice.service';

describe('PropertySericeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertySericeService]
    });
  });

  it('should be created', inject([PropertySericeService], (service: PropertySericeService) => {
    expect(service).toBeTruthy();
  }));
});
