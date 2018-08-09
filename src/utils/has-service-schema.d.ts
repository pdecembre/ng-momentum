export interface Schema {
    /**
     * Specifies the service to be created with this object.  Overrides the default naming.
     */
    service?: string;
    /**
     * Specifies the service path.
     */
    servicePath?: string;
    /**
     * Skip service generation.
     */
    skipService?: boolean;
}
