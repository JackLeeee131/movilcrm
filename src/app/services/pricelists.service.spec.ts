import { TestBed } from '@angular/core/testing';

import { PricelistsService } from './pricelists.service';

describe('PricelistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricelistsService = TestBed.get(PricelistsService);
    expect(service).toBeTruthy();
  });
});
