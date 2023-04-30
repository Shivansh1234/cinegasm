import { TestBed } from '@angular/core/testing';

import { CustomComponentsLibService } from './custom-components-lib.service';

describe('CustomComponentsLibService', () => {
  let service: CustomComponentsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomComponentsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
