export interface Schema {
    /**
     * Flag to skip the module import.
     */
    skipImport?: boolean;
    /**
     * Specifies if declaring module exports the directive.
     */
    export?: boolean;
    /**
     * Allows specification of the declaring module.
     */
    module?: string;
}
