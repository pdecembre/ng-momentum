import {TestBed, async, inject} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {HomeGuard} from './home.guard';

describe('HomeGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HomeGuard]
        });
    });

    it('should ...', inject([HomeGuard], (guard: HomeGuard) => {
        expect(guard).toBeTruthy();
    }));

    it('should return true for canActivate', inject([HomeGuard], (guard: HomeGuard) => {
        expect(guard.canActivate(null, null)).toBeTruthy();
    }));
});
