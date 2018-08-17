import {Path} from "@angular-devkit/core";

export interface Schema {
    /**
     * Specifies the view to be created with this object.  Overrides the default naming.
     */
    view?: string;
    /**
     * Specifies the view path.
     */
    viewPath?: Path;
    /**
     * Specifies the base path.
     */
    basePath?: Path;
    /**
     * Skip view generation.
     */
    skipView?: boolean;
}
