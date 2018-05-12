import { TestBed, inject } from '@angular/core/testing';

import { NgPluggablesService } from './ng-pluggables.service';

describe('NgPluggablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgPluggablesService]
    });
  });

  it('should be created', inject([NgPluggablesService], (service: NgPluggablesService) => {
    expect(service).toBeTruthy();
  }));
});
