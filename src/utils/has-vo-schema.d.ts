export interface Schema {
    /**
     * Specifies the vo to be created with this object.  Overrides the default naming.
     */
    vo?: string;
    /**
     * Specifies the vo path.
     */
    voPath?: string;
    /**
     * Skip vo generation.
     */
    skipVo?: boolean;
    /**
     * Object string for the value object.
     */
    obj?: string;
}
