import {Schema as BaseOptions} from '../utils/schema';
import {Schema as HasVoOptions} from '../utils/has-vo-schema';
import {Schema as HasServiceOptions} from '../utils/has-service-schema';
import {Schema as HasUiFrameworkOptions} from '../utils/has-ui-framework-schema';
import {Schema as HasImportOptions} from '../utils/has-import-schema';
import {VIEW_OPTION} from './index';
import {Path} from "@angular-devkit/core";

export interface Schema extends BaseOptions, HasVoOptions, HasServiceOptions, HasUiFrameworkOptions, HasImportOptions {
    /**
     * Specifies the view template strategy.
     */
    template: VIEW_OPTION;
    /**
     * value object parameters.
     */
    parameters?: array<string>;
    /**
     * Flag to determine if the view should be eager loaded vs lazy loaded.
     */
    eager?: boolean;
    /**
     * Specifies the base path.
     */
    basePath?: Path;
}
