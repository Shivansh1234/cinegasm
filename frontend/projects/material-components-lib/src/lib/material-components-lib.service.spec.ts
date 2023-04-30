import { TestBed } from '@angular/core/testing';

import { MaterialComponentsLibService } from './material-components-lib.service';

describe('MaterialComponentsLibService', () => {
  let service: MaterialComponentsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialComponentsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
