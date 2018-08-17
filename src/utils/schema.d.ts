import {Path} from "@angular-devkit/core";

export interface Schema {
    /**
     * The name of the project.
     */
    project: string;
    /**
     * The path to create the interface.
     */
    path: Path;
    /**
     * Specifies the name.
     */
    name: string;
    /**
     * Flag to indicate if a dir is created.
     */
    flat?: boolean;
    /**
     * Specifies if a spec file is generated.
     */
    spec?: boolean;
}
