import { TestBed, inject } from '@angular/core/testing';

import { LocalResService } from './local-res.service';

describe('LocalResService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalResService]
    });
  });

  it('should be created', inject([LocalResService], (service: LocalResService) => {
    expect(service).toBeTruthy();
  }));
});
