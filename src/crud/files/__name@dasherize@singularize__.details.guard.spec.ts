import {TestBed, async, inject} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.details.guard';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

describe('<%= classify(singularize(name)) %>Guard', () => {
  beforeEach(() => {
    // mocks!
    const serviceStub = {
      show: (value) => {
        return Promise.resolve(new <%= classify(singularize(vo)) %>());
      }
    };
    // set testbed
    TestBed.configureTestingModule({
      providers: [<%= classify(singularize(name)) %>Guard,
        {provide: <%= classify(pluralize(service)) %>Service, useValue: serviceStub}]
    });
  });

  it('should ...', inject([<%= classify(singularize(name)) %>Guard], (guard: <%= classify(singularize(name)) %>Guard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true for canActivate', inject([<%= classify(singularize(name)) %>Guard], (guard: <%= classify(singularize(name)) %>Guard) => {
    expect(guard.canActivate(null, null)).toBeTruthy();
  }));

  it('should return value for resolve', inject([<%= classify(singularize(name)) %>Guard], (guard: <%= classify(singularize(name)) %>Guard) => {
    const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    route.params = {
      id: 1,
    };
    expect(guard.resolve(route, null)).not.toBeUndefined();
  }));

});
