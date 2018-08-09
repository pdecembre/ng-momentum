import {Schema as BaseOptions} from '../utils/schema';
import {Schema as HasVoOptions} from '../utils/has-vo-schema';
import {Schema as HasServiceOptions} from '../utils/has-service-schema';
import {MODEL_OPTION} from './index';

export interface Schema extends BaseOptions, HasVoOptions, HasServiceOptions {
    /**
     * Model type for template specification.
     */
    template: MODEL_OPTION;
}
