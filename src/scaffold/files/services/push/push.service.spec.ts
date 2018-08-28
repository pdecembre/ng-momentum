import {TestBed, inject} from '@angular/core/testing';
import {PushService} from './push.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {WindowService} from 'src/app/services/window/window.service';

describe('PushService', () => {

    const result = 'a';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                PushService,
                WindowService
            ]
        });
    });

    it('is created', inject(
      [PushService, HttpTestingController, WindowService],
      (service: PushService, httpMock: HttpTestingController, windowService: WindowService) => {
        expect(service).toBeTruthy();
    }));

    describe('urlBase64ToUint8Array', () => {

        it('returns value', inject([PushService, WindowService], (service: PushService, windowService: WindowService) => {
            expect(service.urlBase64ToUint8Array('YQ==').toString()).toEqual('97');
        }));

    });

    describe('addSubscriber', () => {

        afterEach(inject([PushService, HttpTestingController], (service: PushService, httpMock: HttpTestingController) => {
            httpMock.verify();
        }));

        it('returns values', inject([PushService, HttpTestingController], (service: PushService, httpMock: HttpTestingController) => {
            service.addSubscriber('a').subscribe((results) => {
                expect(results).toEqual(result);
            });
            const req = httpMock.expectOne(`/webpush`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({
                action: 'subscribe',
                subscription: 'a'
            });
            req.flush(result);
        }));

        it('returns error', inject([PushService, HttpTestingController], (service: PushService, httpMock: HttpTestingController) => {
            service.addSubscriber('a').subscribe(() => {
            }, err => {
                expect(err.error.message).toBe('error message');
            });
            const req = httpMock.expectOne(`/webpush`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({
                action: 'subscribe',
                subscription: 'a'
            });
            req.error(new ErrorEvent('error', {message: 'error message'}));
        }));

    });

    describe('deleteSubscriber', () => {

        afterEach(inject([PushService, HttpTestingController], (service: PushService, httpMock: HttpTestingController) => {
            httpMock.verify();
        }));

        it('returns values', inject([PushService, HttpTestingController], (service: PushService, httpMock: HttpTestingController) => {
            service.deleteSubscriber('a').subscribe((results) => {
                expect(results).toEqual(result);
            });
            const req = httpMock.expectOne(`/webpush`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({
                action: 'unsubscribe',
                subscription: 'a'
            });
            req.flush(result);
        }));

        it('returns error', inject([PushService, HttpTestingController], (service: PushService, httpMock: HttpTestingController) => {
            service.deleteSubscriber('a').subscribe(() => {
            }, err => {
                expect(err.error.message).toBe('error message');
            });
            const req = httpMock.expectOne(`/webpush`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({
                action: 'unsubscribe',
                subscription: 'a'
            });
            req.error(new ErrorEvent('error', {message: 'error message'}));
        }));

    });

});
