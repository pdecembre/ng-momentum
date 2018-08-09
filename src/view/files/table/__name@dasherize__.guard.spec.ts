import {TestBed, async, inject} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {<%= classify(name) %>Guard} from './<%= dasherize(name) %>.guard';

describe('<%= classify(name) %>Guard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [<%= classify(name) %>Guard]
        });
    });

    it('should ...', inject([<%= classify(name) %>Guard], (guard: <%= classify(name) %>Guard) => {
        expect(guard).toBeTruthy();
    }));

    it('should return true for canActivate', inject([<%= classify(name) %>Guard], (guard: <%= classify(name) %>Guard) => {
        expect(guard.canActivate(null, null)).toBeTruthy();
    }));
});
