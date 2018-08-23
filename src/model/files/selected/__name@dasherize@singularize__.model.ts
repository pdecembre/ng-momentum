import {Injectable} from '@angular/core';
import { <%= classify(pluralize(service)) %>Service } from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {Observable} from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()
/**
 * Selected model for <%= classify(singularize(vo)) %> object.
 */
export class <%= classify(singularize(name)) %>Model {
  /**
   * Constructor.
   * @param {} _service <%= classify(pluralize(service)) %>Service.
   */
  constructor(private _service: <%= classify(pluralize(service)) %>Service) {

  }

  /**
   * Selected <%= classify(singularize(vo)) %>.
   */
  selected: <%= classify(singularize(vo)) %>;

  /**
   * Loads selected <%= classify(singularize(vo)) %> from server.
   * @returns {Observable<<%= classify(singularize(vo)) %>>}
   */
  load(): Observable<<%= classify(singularize(vo)) %>> {
    if (!this.selected) {
      return throwError('no selected value');
    }
    return this._service.show(this.selected.id)
		.pipe(
	        map(
	          (result) => {
	            this.selected = result;
	            return this.selected;
	          }
	        )
		);
  }

  /**
   * Syncs selected <%= classify(singularize(vo)) %> with server.
   * @returns {Observable<<%= classify(singularize(vo)) %>>}
   */
  save(): Observable<<%= classify(singularize(vo)) %>> {
    if (!this.selected) {
      return throwError('no selected value');
    }
    if (this.selected.id && this.selected.id > 0) {
      return this._update();
    } else {
      return this._create();
    }
  }

  /**
   * Calls create service method.
   * @private
   * @returns {Observable<<%= classify(singularize(vo)) %>>}
   */
  private _create(): Observable<<%= classify(singularize(vo)) %>> {
    return this._service.create(this.selected)
      .pipe(map(
        (result) => {
          this.selected = result;
          return this.selected;
        }
      ));
  }

  /**
   * Calls update service method.
   * @private
   * @returns {Observable<<%= classify(singularize(vo)) %>>}
   */
  private _update(): Observable<<%= classify(singularize(vo)) %>> {
    return this._service.update(this.selected)
      .pipe(map(
        (result) => {
          this.selected = result;
          return this.selected;
        }
      ));
  }

  /**
   * Destroys selected <%= classify(singularize(vo)) %> on server.
   * @returns {Observable<any>}
   */
  destroy(): Observable<any> {
    if (!this.selected) {
      return throwError('no selected value');
    }
    if (!this.selected.id) {
      this.selected = null;
      return of(null);
    }
    return this._service.destroy(this.selected.id)
      .pipe(map(
        (result) => {
          this.selected = null;
          return this.selected;
        }
      ));
  }
}
