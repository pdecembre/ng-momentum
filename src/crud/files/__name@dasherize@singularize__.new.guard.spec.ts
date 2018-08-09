import {TestBed, async, inject} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {New<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.new.guard';

describe('New<%= classify(singularize(name)) %>Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [New<%= classify(singularize(name)) %>Guard]
    });
  });

  it('should ...', inject([New<%= classify(singularize(name)) %>Guard], (guard: New<%= classify(singularize(name)) %>Guard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true for canActivate', inject([New<%= classify(singularize(name)) %>Guard], (guard: New<%= classify(singularize(name)) %>Guard) => {
    expect(guard.canActivate(null, null)).toBeTruthy();
  }));
});
