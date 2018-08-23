import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { <%= classify(pluralize(service)) %>Service } from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

@Injectable()
/**
 * List model for <%= classify(singularize(vo)) %> objects.
 */
export class <%= classify(pluralize(name)) %>Model {
  /**
   * Constructor.
   * @param {} _service <%= classify(pluralize(service)) %>Service.
   */
  constructor(private _service: <%= classify(pluralize(service)) %>Service) {

  }

  /**
   * List of <%= classify(singularize(vo)) %> objects.
   */
  list: <%= classify(singularize(vo)) %>[];

  /**
   * Loads the list.
   * @returns {Observable<<%= classify(singularize(vo)) %>[]>}
   */
  load(): Observable<<%= classify(singularize(vo)) %>[]> {
    return this._service.list()
      .pipe(
	  	map((result) => {
        	this.list = result;
        	return this.list;
      	})
	  );
  }

}
