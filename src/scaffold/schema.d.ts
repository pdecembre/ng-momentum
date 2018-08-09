import {Schema as BaseOptions} from '../utils/schema';
import {Schema as HasUiFrameworkOptions} from '../utils/has-ui-framework-schema';

export interface Schema extends BaseOptions, HasUiFrameworkOptions {
    /**
     * The file extension to be used for style files.
     */
    style: string;
    /**
     * Flag to skip the scripts import.
     */
    skipScripts?: boolean;
    /**
     * Flag to include PWA support.
     */
    includePwa?: boolean;
}
