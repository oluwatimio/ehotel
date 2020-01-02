import { TestBed } from '@angular/core/testing';

import { PostgreService } from './postgre.service';

describe('PostgreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostgreService = TestBed.get(PostgreService);
    expect(service).toBeTruthy();
  });
});
