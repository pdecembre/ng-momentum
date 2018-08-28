import {TestBed, async, inject} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {<%= classify(pluralize(name)) %>ListGuard} from './<%= dasherize(pluralize(name)) %>.list.guard';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

describe('<%= classify(pluralize(name)) %>ListGuard', () => {
  beforeEach(() => {
    // mocks!
    const serviceStub = {
      list: (value) => {
        return Promise.resolve([new <%= classify(singularize(vo)) %>()]);
      }
    };
    // set testbed
    TestBed.configureTestingModule({
      providers: [<%= classify(pluralize(name)) %>ListGuard,
        {provide: <%= classify(pluralize(service)) %>Service, useValue: serviceStub}]
    });
  });

  it('should ...', inject([<%= classify(pluralize(name)) %>ListGuard], (guard: <%= classify(pluralize(name)) %>ListGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true for canActivate', inject([<%= classify(pluralize(name)) %>ListGuard], (guard: <%= classify(pluralize(name)) %>ListGuard) => {
    expect(guard.canActivate(null, null)).toBeTruthy();
  }));

  it('should return value for resolve', inject([<%= classify(pluralize(name)) %>ListGuard], (guard: <%= classify(pluralize(name)) %>ListGuard) => {
    const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    expect(guard.resolve(null, null)).not.toBeUndefined();
  }));

});
