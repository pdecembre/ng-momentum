import {Schema as BaseOptions} from '../utils/schema';
import {Schema as HasVoOptions} from '../utils/has-vo-schema';
import {Schema as HasServiceOptions} from '../utils/has-service-schema';
import {Schema as HasViewOptions} from '../utils/has-view-schema';
import {Schema as HasUiFrameworkOptions} from '../utils/has-ui-framework-schema';
import {Schema as HasImportOptions} from '../utils/has-import-schema';

export interface Schema extends BaseOptions, HasVoOptions, HasServiceOptions, HasViewOptions, HasUiFrameworkOptions, HasImportOptions {
    /**
     * Url to get object parameters.
     */
    url?: string;
    /**
     * value object parameters.
     */
    parameters: array<string>;
    /**
     * Flag to determine if the view should be eager loaded vs lazy loaded.
     */
    eager?: boolean;
}
