import { TestBed, inject } from '@angular/core/testing';

import { OnlineResService } from './online-res.service';

describe('OnlineResService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineResService]
    });
  });

  it('should be created', inject([OnlineResService], (service: OnlineResService) => {
    expect(service).toBeTruthy();
  }));
});
