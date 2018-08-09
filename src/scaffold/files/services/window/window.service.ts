import {Injectable} from '@angular/core';

/**
 * Returns the real browser window object.
 * @returns {any}
 * @private
 */
function _window(): any {
    return window; // return native window obj
}

@Injectable()
/**
 * Safely pulls the browser window object from injectable classes.
 */
export class WindowService {
    /**
     * Returns an injectable window object.
     * @returns {any}
     */
    get nativeWindow(): any {
        return _window();
    }
}
