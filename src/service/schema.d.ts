import {Schema as BaseOptions} from '../utils/schema';
import {Schema as HasVoOptions} from '../utils/has-vo-schema';

export interface Schema extends BaseOptions, HasVoOptions {
    /**
     * Specifies the service strategy (clrud).
     */
    operations?: string;
    /**
     * Specifies the service uri to hit.
     */
    uri?: string;
    /**
     * Specifies the service endpoint to hit.
     */
    endpoint?: string;
    /**
     * Allows specification of the declaring module.
     */
    module?: string;
    /**
     * Adds a suffix to your service endpoint.
     */
    suffix?: string;
}