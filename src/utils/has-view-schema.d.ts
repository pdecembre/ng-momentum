export interface Schema {
    /**
     * Specifies the view to be created with this object.  Overrides the default naming.
     */
    view?: string;
    /**
     * Specifies the view path.
     */
    viewPath?: string;
    /**
     * Specifies the base path.
     */
    basePath?: string;
    /**
     * Skip view generation.
     */
    skipView?: boolean;
}
