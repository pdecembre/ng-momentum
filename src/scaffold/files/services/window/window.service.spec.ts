import {TestBed, inject} from '@angular/core/testing';
import {WindowService} from './window.service';

describe('WindowService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                WindowService
            ]
        });
    });

    it('is created', inject([WindowService], (service: WindowService) => {
        expect(service).toBeTruthy();
    }));

    describe('nativeWindow', () => {

        it('returns window', inject([WindowService], (service: WindowService) => {
            expect(service.nativeWindow).toBeDefined();
        }));

    });

});
