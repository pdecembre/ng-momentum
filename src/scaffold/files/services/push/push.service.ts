import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/internal/Observable';
import {WindowService} from 'src/app/services/window/window.service';

/**
 * Push Service Configuration for quick changes.
 * @see CoreModule#forRoot
 * @see https://angular.io/guide/dependency-injection#optional-dependencies
 */
export class PushServiceConfig {
    uri = '';
}

@Injectable()
/**
 * Base Push Service to help with Service Workers.
 *
 * @Example <caption>Implements the service worker push connection.</caption>
 *
 * import { SwPush } from '@angular/service-worker';
 * ...
 *
 * // Injecting SwPush dependency
 * constructor(private pushService: PushService, private swPush: SwPush) {}
 *
 * subscribeToPush() {
 *    // Requesting messaging service to subscribe current client (browser)
 *    this.swPush.requestSubscription({
 *      serverPublicKey: <your key>
 *    })
 *    .then(pushSubscription => {
 *      // Passing subscription object to our backend
 *      this.pushService.addSubscriber(pushSubscription)
 *      .subscribe(
 *          res => {
 *            console.log('[App] Add subscriber request answer', res)
 *            let snackBarRef = this.snackBar.open('Now you are subscribed', null, {
 *              duration: this.snackBarDuration
 *            });
 *          },
 *          err => {
 *            console.log('[App] Add subscriber request failed', err)
 *          }
 *      )
 *    })
 *    .catch(err => {
 *      console.error(err);
 *    })
 * }
 *
 */
export class PushService {

    /**
     * Push endpoint url.
     */
    private _uri = '';

    private _endpoint = '/webpush';

    /**
     * Component constructor and DI injection point.
     * @param {HttpClient} http
     * @param {WindowService} windowService
     * @param {PushServiceConfig} config
     */
    constructor(private http: HttpClient,
                private windowService: WindowService,
                @Optional() config: PushServiceConfig) {
        if (config) {
            this._uri = config.uri;
        }
    }

    /**
     * Url Base64 To Uint 8bit Array.
     * @param base64String
     * @returns {Uint8Array}
     */
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData = this.windowService.nativeWindow.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Adds a subscription for push notifications.
     * @param subscription
     * @returns {Observable<any>}
     */
    addSubscriber(subscription) {
        const url = `${this._uri}${this._endpoint}`;
        console.log('[Push Service] Adding subscriber');

        const body = {
            action: 'subscribe',
            subscription: subscription
        };

        return this.http.post(url, body);
    }

    /**
     * Removes a subscription from push notifications.
     * @param subscription
     * @returns {Observable<any>}
     */
    deleteSubscriber(subscription) {
        const url = `${this._uri}${this._endpoint}`;
        console.log('[Push Service] Deleting subscriber');

        const body = {
            action: 'unsubscribe',
            subscription: subscription
        };

        return this.http.post(url, body);
    }

}
