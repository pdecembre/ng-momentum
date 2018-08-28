import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';

import {<%= classify(pluralize(name)) %>Model} from './<%= dasherize(pluralize(name)) %>.model';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import { <%= classify(pluralize(service)) %>Service } from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

describe('<%= classify(pluralize(name)) %>Model', () => {

  const list: <%= classify(singularize(vo)) %>[] = [
      new <%= classify(singularize(vo)) %>(),
      new <%= classify(singularize(vo)) %>(),
      new <%= classify(singularize(vo)) %>()
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [<%= classify(pluralize(name)) %>Model, <%= classify(pluralize(service)) %>Service]
    });
  });

  it('is created', inject([<%= classify(pluralize(name)) %>Model], (model: <%= classify(pluralize(name)) %>Model) => {
    expect(model).toBeTruthy();
  }));

  describe('list', () => {
    it('requests list', inject(
        [<%= classify(pluralize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(pluralize(name)) %>Model, service:<%= classify(pluralize(service)) %>Service) => {
      const spy = spyOn(service, 'list').and.returnValue(of(list));
      model.load().subscribe((results:<%= classify(singularize(vo)) %>[]) => {
        expect(results).toEqual(list);
        expect(spy).toHaveBeenCalled();
        expect(model.list).toEqual(list);
      });
    }));
  });

});
