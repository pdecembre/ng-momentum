import {Path} from "@angular-devkit/core";

export interface Schema {
    /**
     * Specifies the service to be created with this object.  Overrides the default naming.
     */
    service?: string;
    /**
     * Specifies the service path.
     */
    servicePath?: Path;
    /**
     * Skip service generation.
     */
    skipService?: boolean;
}
