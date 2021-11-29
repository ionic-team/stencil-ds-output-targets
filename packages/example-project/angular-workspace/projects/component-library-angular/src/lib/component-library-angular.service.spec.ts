import { TestBed } from '@angular/core/testing';

import { ComponentLibraryAngularService } from './component-library-angular.service';

describe('ComponentLibraryAngularService', () => {
  let service: ComponentLibraryAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentLibraryAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
