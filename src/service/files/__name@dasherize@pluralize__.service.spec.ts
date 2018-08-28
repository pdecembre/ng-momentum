import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { <%= classify(pluralize(name)) %>Service } from './<%= dasherize(pluralize(name)) %>.service';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

describe('<%= classify(pluralize(name)) %>Service', () => {

    const list: <%= classify(singularize(vo)) %>[] = [
        new <%= classify(singularize(vo)) %>(),
        new <%= classify(singularize(vo)) %>(),
        new <%= classify(singularize(vo)) %>()
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                <%= classify(pluralize(name)) %>Service
            ]
        });
    });

    afterEach(inject([<%= classify(pluralize(name)) %>Service, HttpTestingController], (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('is created', inject(
        [<%= classify(pluralize(name)) %>Service, HttpTestingController],
        (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
        expect(service).toBeTruthy();
    }));
<% if(operations.indexOf('l')>-1){ %>
    describe('list', () => {
        it('returns response', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.list().subscribe((results: <%= classify(singularize(vo)) %>[]) => {
                expect(results).toEqual(list);
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %><%= suffix %>`);
            expect(req.request.method).toBe('GET');
            req.flush(list);
        }));

        it('returns error', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.list().subscribe(() => {
            }, err => {
                expect(err.error.message).toBe('error message');
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %><%= suffix %>`);
            expect(req.request.method).toBe('GET');
            req.error(new ErrorEvent('error', {message: 'error message'}));
        }));
    });
<% } %>
<% if(operations.indexOf('r')>-1){ %>
    describe('show', () => {
        it('return response', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.show(1).subscribe((results: <%= classify(singularize(vo)) %>) => {
                expect(results).toEqual(list[0]);
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %>/1<%= suffix %>`);
            expect(req.request.method).toBe('GET');
            req.flush(list[0]);
        }));

        it('return error', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.show(1).subscribe(() => {
            }, err => {
                expect(err.error.message).toBe('error message');
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %>/1<%= suffix %>`);
            expect(req.request.method).toBe('GET');
            req.error(new ErrorEvent('error', {message: 'error message'}));
        }));

    });
<% } %>
<% if(operations.indexOf('c')>-1){ %>
    describe('create', () => {
        it('return response', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.create(list[0]).subscribe((results: <%= classify(singularize(vo)) %>) => {
                expect(results).toEqual(list[0]);
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %><%= suffix %>`);
            expect(req.request.method).toBe('POST');
            req.flush(list[0]);
        }));

        it('return error', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.create(list[0]).subscribe(() => {
            }, err => {
                expect(err.error.message).toBe('error message');
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %><%= suffix %>`);
            expect(req.request.method).toBe('POST');
            req.error(new ErrorEvent('error', {message: 'error message'}));
        }));

    });
<% } %>
<% if(operations.indexOf('u')>-1){ %>
    describe('update', () => {
        it('return response', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            const item = list[0];
            item.id = 1;
            service.update(item).subscribe((results: <%= classify(singularize(vo)) %>) => {
                expect(results).toEqual(item);
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %>/1<%= suffix %>`);
            expect(req.request.method).toBe('PUT');
            req.flush(item);
        }));

        it('return error', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            const item = list[0];
            item.id = 1;
            service.update(item).subscribe(() => {
            }, err => {
                expect(err.error.message).toBe('error message');
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %>/1<%= suffix %>`);
            expect(req.request.method).toBe('PUT');
            req.error(new ErrorEvent('error', {message: 'error message'}));
        }));

    });
<% } %>
<% if(operations.indexOf('d')>-1){ %>
    describe('destroy', () => {
        it('return response', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.destroy(1).subscribe((results: any) => {
                expect(results).toBeNull();
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %>/1<%= suffix %>`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        }));

        it('return error', inject(
            [<%= classify(pluralize(name)) %>Service, HttpTestingController],
            (service: <%= classify(pluralize(name)) %>Service, httpMock: HttpTestingController) => {
            service.destroy(1).subscribe(() => {
            }, err => {
                expect(err.error.message).toBe('error message');
            });
            const req = httpMock.expectOne(`<%= uri %><%= endpoint %>/1<%= suffix %>`);
            expect(req.request.method).toBe('DELETE');
            req.error(new ErrorEvent('error', {message: 'error message'}));
        }));

    });
<% } %>

});
