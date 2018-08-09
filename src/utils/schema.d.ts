export interface Schema {
    /**
     * The name of the project.
     */
    project: string;
    /**
     * The path to create the interface.
     */
    path: string;
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
