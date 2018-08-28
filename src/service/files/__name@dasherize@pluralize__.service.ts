import { Injectable, Optional } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

/**
 * Config class to be wired into an injector.
 * @see CoreModule#forRoot
 * @see https://angular.io/guide/dependency-injection#optional-dependencies
 */
export class <%= classify(pluralize(name)) %>ServiceConfig {
    uri = '';
}

@Injectable()
/**
 * Service class.
 */
export class <%= classify(pluralize(name)) %>Service {

    /**
     * Path uri.
     * @type {string}
     * @private
     */
     private _uri = '<%= uri %>';

    /**
     * Url to endpoint api.
     * @type {string}
     */
     private endpoint = '<%= endpoint %>';

    /**
     * Endpoint request headers.
     * @type {HttpHeaders}
     */
     private headers = new HttpHeaders({'Content-Type': 'application/json'});

    /**
     * Component constructor and DI injection point.
     * @param {HttpClient} http
     * @param {<%= classify(pluralize(name)) %>ServiceConfig} config
     */
    constructor(private http: HttpClient, @Optional() config: <%= classify(pluralize(name)) %>ServiceConfig) {
        if (config) {
            this._uri = config.uri;
        }
    }
<% if(operations.indexOf('l')>-1){ %>
    /**
     * Pulls a list of <%= classify(singularize(vo)) %> objects.
     * @returns {Observable<<%= classify(singularize(vo)) %>[]>}
     */
    list(): Observable<<%= classify(singularize(vo)) %>[]> {
            return this.http.get<<%= classify(singularize(vo)) %>[]>(`${this._uri}${this.endpoint}<%= suffix %>`);
    }
<% } %>
<% if(operations.indexOf('r')>-1){ %>
    /**
     * Pulls a single <%= classify(singularize(vo)) %> object.
     * @param {number | string} id to retrieve.
     * @returns {Observable<<%= classify(singularize(vo)) %>>}
     */
    show(id: number | string): Observable<<%= classify(singularize(vo)) %>> {
        const url = `${this._uri}${this.endpoint}/${id}<%= suffix %>`;
    return this.http.get<<%= classify(singularize(vo)) %>>(url);
    }
<% } %>
<% if(operations.indexOf('c')>-1){ %>
    /**
     * Creates a single <%= classify(singularize(vo)) %> object.
     * @param {} value to create.
     * @returns {Observable<<%= classify(singularize(vo)) %>>}
     */
    create(value: <%= classify(singularize(vo)) %>): Observable<<%= classify(singularize(vo)) %>> {
        return this.http
            .post<<%= classify(singularize(vo)) %>>(`${this._uri}${this.endpoint}<%= suffix %>`, JSON.stringify(value), {headers: this.headers});
    }
<% } %>
<% if(operations.indexOf('u')>-1){ %>
    /**
     * Updates a single <%= classify(singularize(vo)) %> object.
     * @param {} value to update.
     * @returns {Observable<<%= classify(singularize(vo)) %>>}
     */
    update(value: <%= classify(singularize(vo)) %>): Observable<<%= classify(singularize(vo)) %>> {
        const url = `${this._uri}${this.endpoint}/${value.id}<%= suffix %>`;
    return this.http
        .put<<%= classify(singularize(vo)) %>>(url, JSON.stringify(value), {headers: this.headers});
    }
<% } %>
<% if(operations.indexOf('d')>-1){ %>
    /**
     * Destroys a single <%= classify(singularize(vo)) %> object.
     * @param {number | string} id to destroy.
     * @returns {Observable<void>}
     */
    destroy(id: number | string): Observable<void> {
        const url = `${this._uri}${this.endpoint}/${id}<%= suffix %>`;
        return this.http.delete<void>(url, {headers: this.headers});
    }
<% } %>

}
