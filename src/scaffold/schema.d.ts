import {Schema as BaseOptions} from '../utils/schema';
import {Schema as HasUiFrameworkOptions} from '../utils/has-ui-framework-schema';

export interface Schema extends BaseOptions, HasUiFrameworkOptions {
    /**
     * Flag to skip the scripts import.
     */
    skipScripts?: boolean;
    /**
     * Flag to include PWA support.
     */
    includePwa?: boolean;
}
