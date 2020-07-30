/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
Polygon = /** @class */ (function () {
    function Polygon() {
    }
    Object.defineProperty(Polygon.prototype, "Center", {
        get: /**
         * Gets the polygon's center.
         * \@readonly
         * \@memberof Polygon
         * @return {?}
         */
        function () {
            if (this._center == null) {
                this._center = this.GetBoundingCenter();
            }
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Polygon.prototype, "Centroid", {
        get: /**
         * Gets the polygon's centroid.
         * \@readonly
         * \@memberof Polygon
         * @return {?}
         */
        function () {
            if (this._centroid == null) {
                this._centroid = this.GetPolygonCentroid();
            }
            return this._centroid;
        },
        enumerable: true,
        configurable: true
    });
    ///
    /// Protected methods
    ///
    /**
     * Gets the center of the polygons' bounding box.
     *
     * @returns - ILatLong object containing the center of the bounding box.
     * @memberof Polygon
     * @method
     * @protected
     */
    /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
     */
    Polygon.prototype.GetBoundingCenter = /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
     */
    function () {
        /** @type {?} */
        var c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        var x1 = 90;
        /** @type {?} */
        var x2 = -90;
        /** @type {?} */
        var y1 = 180;
        /** @type {?} */
        var y2 = -180;
        /** @type {?} */
        var path = this.GetPaths();
        if (path) {
            path.forEach(function (inner) { return inner.forEach(function (p) {
                if (p.latitude < x1) {
                    x1 = p.latitude;
                }
                if (p.latitude > x2) {
                    x2 = p.latitude;
                }
                if (p.longitude < y1) {
                    y1 = p.longitude;
                }
                if (p.longitude > y2) {
                    y2 = p.longitude;
                }
            }); });
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    };
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * @returns - The centroid coordinates of the polygon.
     * @memberof Polygon
     * @method
     * @protected
     */
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    Polygon.prototype.GetPolygonCentroid = /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    function () {
        /** @type {?} */
        var c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        var path = this.GetPaths();
        /** @type {?} */
        var off = path[0][0];
        if (off != null) {
            /** @type {?} */
            var twicearea = 0;
            /** @type {?} */
            var x = 0;
            /** @type {?} */
            var y = 0;
            /** @type {?} */
            var p1 = void 0;
            /** @type {?} */
            var p2 = void 0;
            /** @type {?} */
            var f = void 0;
            for (var k = 0; k < path.length; k++) {
                for (var i = 0, j = path[k].length - 1; i < path[k].length; j = i++) {
                    p1 = path[k][i];
                    p2 = path[k][j];
                    f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                        (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                    twicearea += f;
                    x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                    y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
                }
            }
            if (twicearea !== 0) {
                f = twicearea * 3;
                c.latitude = x / f + off.latitude;
                c.longitude = y / f + off.longitude;
            }
            else {
                c.latitude = off.latitude;
                c.longitude = off.longitude;
            }
        }
        else {
            c = null;
        }
        return c;
    };
    return Polygon;
}());
/**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export { Polygon };
if (false) {
    /** @type {?} */
    Polygon.prototype._centroid;
    /** @type {?} */
    Polygon.prototype._center;
    /**
     * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.LabelMaxZoom = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.LabelMaxZoom = function (val) { };
    /**
     * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.LabelMinZoom = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.LabelMinZoom = function (val) { };
    /**
     * Gets the polygon metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Metadata = function () { };
    /**
     * Gets the native primitve implementing the polygon.
     *
     * \@readonly
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.NativePrimitve = function () { };
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.ShowLabel = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.ShowLabel = function (val) { };
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.ShowTooltip = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.ShowTooltip = function (val) { };
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Title = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.Title = function (val) { };
    /**
     * Adds a delegate for an event.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    Polygon.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deleted the polygon.
     *
     * @abstract
     *
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Delete = function () { };
    /**
     * Gets whether the polygon is draggable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    Polygon.prototype.GetDraggable = function () { };
    /**
     * Gets whether the polygon path can be edited.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    Polygon.prototype.GetEditable = function () { };
    /**
     * Gets the polygon path.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - Array of ILatLong objects describing the polygon path.
     *
     */
    Polygon.prototype.GetPath = function () { };
    /**
     * Gets the polygon paths.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - Array of Array of ILatLong objects describing multiple polygon paths.
     *
     */
    Polygon.prototype.GetPaths = function () { };
    /**
     * Gets whether the polygon is visible.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    Polygon.prototype.GetVisible = function () { };
    /**
     * Sets whether the polygon is dragable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets wether the polygon path is editable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetEditable = function (editable) { };
    /**
     * Sets the polygon options
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    Polygon.prototype.SetOptions = function (options) { };
    /**
     * Sets the polygon path.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    Polygon.prototype.SetPath = function (path) { };
    /**
     * Set the polygon path or paths.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    Polygon.prototype.SetPaths = function (paths) { };
    /**
     * Sets whether the polygon is visible.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBOzs7Ozs7O0FBQUE7OzswQkFnQmUsMkJBQU07Ozs7Ozs7O1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzNDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7OzBCQVFiLDZCQUFROzs7Ozs7OztZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUM5QztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OztJQTZNMUIsR0FBRztJQUNILHFCQUFxQjtJQUNyQixHQUFHO0lBRUg7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ08sbUNBQWlCOzs7Ozs7OztJQUEzQjs7UUFDSSxJQUFJLENBQUMsR0FBYSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDOztRQUM5QyxJQUFJLEVBQUUsR0FBVyxFQUFFLENBQXdEOztRQUEzRSxJQUFxQixFQUFFLEdBQVcsQ0FBQyxFQUFFLENBQXNDOztRQUEzRSxJQUF1QyxFQUFFLEdBQVcsR0FBRyxDQUFvQjs7UUFBM0UsSUFBeUQsRUFBRSxHQUFXLENBQUMsR0FBRyxDQUFDOztRQUMzRSxJQUFNLElBQUksR0FBMkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7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Q0FBQyxDQUFDO29CQUNsRSxTQUFTLElBQUksQ0FBQyxDQUFDO29CQUNmLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEQsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM5RDthQUNKO1lBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDdkM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixDQUFDLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUMvQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7a0JBalVMO0lBa1VDLENBQUE7Ozs7Ozs7O0FBelRELG1CQXlUQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgY2xhc3MgZGVmaW5pbmcgdGhlIGNvbnRyYWN0IGZvciBhIHBvbHlnb24gaW4gdGhlIGFyY2hpdGVjdHVyZSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQb2x5Z29uIHtcclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcm90ZWN0ZWQgX2NlbnRyb2lkOiBJTGF0TG9uZztcclxuICAgIHByb3RlY3RlZCBfY2VudGVyOiBJTGF0TG9uZztcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uJ3MgY2VudGVyLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IENlbnRlcigpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlciA9IHRoaXMuR2V0Qm91bmRpbmdDZW50ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24ncyBjZW50cm9pZC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBDZW50cm9pZCgpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRyb2lkID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSB0aGlzLkdldFBvbHlnb25DZW50cm9pZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2VudHJvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBMYWJlbE1heFpvb20oKTogbnVtYmVyO1xyXG4gICAgcHVibGljIGFic3RyYWN0IHNldCBMYWJlbE1heFpvb20odmFsOiBudW1iZXIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTGFiZWxNaW5ab29tKCk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgTGFiZWxNaW5ab29tKHZhbDogbnVtYmVyKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIGxhYmVsXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgU2hvd0xhYmVsKCk6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IFNob3dMYWJlbCh2YWw6IGJvb2xlYW4pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gc2hvdyB0aGUgdG9vbHRpcFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IFNob3dUb29sdGlwKHZhbDogYm9vbGVhbik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWdvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IFRpdGxlKCk6IHN0cmluZztcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgVGl0bGUodmFsOiBzdHJpbmcpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBkZWxlZ2F0ZSBmb3IgYW4gZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZWQgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IERlbGV0ZSgpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXREcmFnZ2FibGUoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBwYXRoIGNhbiBiZSBlZGl0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRFZGl0YWJsZSgpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBJTGF0TG9uZyBvYmplY3RzIGRlc2NyaWJpbmcgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UGF0aCgpOiBBcnJheTxJTGF0TG9uZz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBBcnJheSBvZiBJTGF0TG9uZyBvYmplY3RzIGRlc2NyaWJpbmcgbXVsdGlwbGUgcG9seWdvbiBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UGF0aHMoKTogQXJyYXk8QXJyYXk8SUxhdExvbmc+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0VmlzaWJsZSgpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFrZSB0aGUgcG9seWdvbiBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5Z29uIHBhdGggaXMgZWRpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZWRpdGFibGUgLSBUcnVlIHRvIG1ha2UgcG9seWdvbiBwYXRoIGVkaXRhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUxhdExvbmd9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBUaGUgb3B0aW9ucyBhcmUgbWVyZ2VkIHdpdGggaHRlIG9uZXNcclxuICAgICAqIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldE9wdGlvbnMob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHBvbHlnb24gcGF0aCBvciBwYXRocy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBwYXRocyBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9XHJcbiAgICAgKiAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoKHMpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRQYXRocyhwYXRoczogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIHBvbHlnb24gdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNlbnRlciBvZiB0aGUgcG9seWdvbnMnIGJvdW5kaW5nIGJveC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIElMYXRMb25nIG9iamVjdCBjb250YWluaW5nIHRoZSBjZW50ZXIgb2YgdGhlIGJvdW5kaW5nIGJveC5cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBHZXRCb3VuZGluZ0NlbnRlcigpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgbGV0IGM6IElMYXRMb25nID0ge2xhdGl0dWRlOiAwLCBsb25naXR1ZGU6IDB9O1xyXG4gICAgICAgIGxldCB4MTogbnVtYmVyID0gOTAsIHgyOiBudW1iZXIgPSAtOTAsIHkxOiBudW1iZXIgPSAxODAsIHkyOiBudW1iZXIgPSAtMTgwO1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgcGF0aC5mb3JFYWNoKGlubmVyID0+IGlubmVyLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sYXRpdHVkZSA8IHgxKSB7IHgxID0gcC5sYXRpdHVkZTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHAubGF0aXR1ZGUgPiB4MikgeyB4MiA9IHAubGF0aXR1ZGU7IH1cclxuICAgICAgICAgICAgICAgIGlmIChwLmxvbmdpdHVkZSA8IHkxKSB7IHkxID0gcC5sb25naXR1ZGU7IH1cclxuICAgICAgICAgICAgICAgIGlmIChwLmxvbmdpdHVkZSA+IHkyKSB7IHkyID0gcC5sb25naXR1ZGU7IH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBjLmxhdGl0dWRlID0geDEgKyAoeDIgLSB4MSkgLyAyO1xyXG4gICAgICAgICAgICBjLmxvbmdpdHVkZSA9IHkxICsgKHkyIC0geTEpIC8gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgY2VudHJvaWQgb2YgdGhlIHBvbHlnb24gYmFzZWQgb24gdGhlIHBvbHlnb24gcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBjZW50cm9pZCBjb29yZGluYXRlcyBvZiB0aGUgcG9seWdvbi5cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBHZXRQb2x5Z29uQ2VudHJvaWQoKTogSUxhdExvbmcge1xyXG4gICAgICAgIGxldCBjOiBJTGF0TG9uZyA9IHtsYXRpdHVkZTogMCwgbG9uZ2l0dWRlOiAwfTtcclxuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gdGhpcy5HZXRQYXRocygpO1xyXG4gICAgICAgIGNvbnN0IG9mZiA9IHBhdGhbMF1bMF07XHJcbiAgICAgICAgaWYgKG9mZiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCB0d2ljZWFyZWE6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHAxOiBJTGF0TG9uZywgcDI6IElMYXRMb25nO1xyXG4gICAgICAgICAgICBsZXQgZjogbnVtYmVyO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHBhdGgubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gcGF0aFtrXS5sZW5ndGggLSAxOyBpIDwgcGF0aFtrXS5sZW5ndGg7IGogPSBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwMSA9IHBhdGhba11baV07XHJcbiAgICAgICAgICAgICAgICAgICAgcDIgPSBwYXRoW2tdW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGYgPSAocDEubGF0aXR1ZGUgLSBvZmYubGF0aXR1ZGUpICogKHAyLmxvbmdpdHVkZSAtIG9mZi5sb25naXR1ZGUpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKHAyLmxhdGl0dWRlIC0gb2ZmLmxhdGl0dWRlKSAqIChwMS5sb25naXR1ZGUgLSBvZmYubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICB0d2ljZWFyZWEgKz0gZjtcclxuICAgICAgICAgICAgICAgICAgICB4ICs9IChwMS5sYXRpdHVkZSArIHAyLmxhdGl0dWRlIC0gMiAqIG9mZi5sYXRpdHVkZSkgKiBmO1xyXG4gICAgICAgICAgICAgICAgICAgIHkgKz0gKHAxLmxvbmdpdHVkZSArIHAyLmxvbmdpdHVkZSAtIDIgKiBvZmYubG9uZ2l0dWRlKSAqIGY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR3aWNlYXJlYSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZiA9IHR3aWNlYXJlYSAqIDM7XHJcbiAgICAgICAgICAgICAgICBjLmxhdGl0dWRlID0geCAvIGYgKyBvZmYubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICBjLmxvbmdpdHVkZSA9IHkgLyBmICsgb2ZmLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGMubGF0aXR1ZGUgPSBvZmYubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICBjLmxvbmdpdHVkZSA9IG9mZi5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxufVxyXG4iXX0=