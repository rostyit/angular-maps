/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Abstract class defining the contract for a polyline in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export class Polyline {
    /**
     * Gets the polyline's center.
     * \@readonly
     * \@memberof Polyline
     * @return {?}
     */
    get Center() {
        if (this._center == null) {
            this._center = this.GetBoundingCenter();
        }
        return this._center;
    }
    /**
     * Gets the polyline's centroid.
     * \@readonly
     * \@memberof Polyline
     * @return {?}
     */
    get Centroid() {
        if (this._centroid == null) {
            this._centroid = this.GetPolylineCentroid();
        }
        return this._centroid;
    }
    /**
     * Get the centroid of the polyline based on the a path.
     *
     * \@memberof Polyline
     * \@method
     * @param {?} path - the path for which to generate the centroid
     * @return {?} - The centroid coordinates of the polyline.
     */
    static GetPolylineCentroid(path) {
        /** @type {?} */
        let c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        const off = path[0];
        if (off != null) {
            /** @type {?} */
            let twicearea = 0;
            /** @type {?} */
            let x = 0;
            /** @type {?} */
            let y = 0;
            /** @type {?} */
            let p1;
            /** @type {?} */
            let p2;
            /** @type {?} */
            let f;
            for (let i = 0, j = path.length - 1; i < path.length; j = i++) {
                p1 = path[i];
                p2 = path[j];
                f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                    (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                twicearea += f;
                x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
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
    }
    /**
     * Gets the center of the polyline' bounding box.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - {\@link ILatLong} object containing the center of the bounding box.
     */
    GetBoundingCenter() {
        /** @type {?} */
        let c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        let x1 = 90;
        /** @type {?} */
        let x2 = -90;
        /** @type {?} */
        let y1 = 180;
        /** @type {?} */
        let y2 = -180;
        /** @type {?} */
        const path = this.GetPath();
        if (path) {
            path.forEach(p => {
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
            });
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    }
    /**
     * Get the centroid of the polyline based on the polyline path.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polyline.
     */
    GetPolylineCentroid() {
        /** @type {?} */
        const path = this.GetPath();
        /** @type {?} */
        const c = Polyline.GetPolylineCentroid(path);
        return c;
    }
}
if (false) {
    /** @type {?} */
    Polyline.prototype._centroid;
    /** @type {?} */
    Polyline.prototype._center;
    /**
     * Gets the native primitve implementing the polyline.
     *
     * \@readonly
     * \@memberof Polyline
     * @abstract
     * @return {?}
     */
    Polyline.prototype.NativePrimitve = function () { };
    /**
     * Gets the polyline metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Polylin
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Metadata = function () { };
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof Polyline
     * \@property
     * @abstract
     * @return {?}
     */
    Polyline.prototype.ShowTooltip = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polyline.prototype.ShowTooltip = function (val) { };
    /**
     * Gets or sets the title off the polyline
     *
     * @abstract
     * \@memberof Polyline
     * \@property
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Title = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polyline.prototype.Title = function (val) { };
    /**
     * Adds a delegate for an event.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     *
     * @return {?}
     */
    Polyline.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deleted the polyline.
     *
     * @abstract
     *
     * \@memberof Polyline
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Delete = function () { };
    /**
     * Gets whether the polyline is draggable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    Polyline.prototype.GetDraggable = function () { };
    /**
     * Gets whether the polyline path can be edited.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    Polyline.prototype.GetEditable = function () { };
    /**
     * Gets the polyline path.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - Array of ILatLong objects describing the polyline path.
     *
     */
    Polyline.prototype.GetPath = function () { };
    /**
     * Gets whether the polyline is visible.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    Polyline.prototype.GetVisible = function () { };
    /**
     * Sets whether the polyline is dragable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets wether the polyline path is editable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetEditable = function (editable) { };
    /**
     * Sets the polyline options
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    Polyline.prototype.SetOptions = function (options) { };
    /**
     * Sets the polyline path.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    Polyline.prototype.SetPath = function (path) { };
    /**
     * Sets whether the polyline is visible.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL3BvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsTUFBTTs7Ozs7OztRQWdCUyxNQUFNO1FBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDM0M7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7UUFRYixRQUFRO1FBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDL0M7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7Ozs7OztJQW9EbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQXFCOztRQUNuRCxJQUFJLENBQUMsR0FBYSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDOztRQUM5QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQ2QsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDOztZQUMxQixJQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7O1lBQ2xCLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQzs7WUFDbEIsSUFBSSxFQUFFLENBQXlCOztZQUEvQixJQUFrQixFQUFFLENBQVc7O1lBQy9CLElBQUksQ0FBQyxDQUFTO1lBRWQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdB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LEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFBRTthQUM5QyxDQUFDLENBQUM7WUFDSCxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7Ozs7Ozs7OztJQVVTLG1CQUFtQjs7UUFDekIsTUFBTSxJQUFJLEdBQW9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7UUFDN0MsTUFBTSxDQUFDLEdBQWMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjtDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGNsYXNzIGRlZmluaW5nIHRoZSBjb250cmFjdCBmb3IgYSBwb2x5bGluZSBpbiB0aGUgYXJjaGl0ZWN0dXJlIHNwZWNpZmljIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvbHlsaW5lIHtcclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcm90ZWN0ZWQgX2NlbnRyb2lkOiBJTGF0TG9uZztcclxuICAgIHByb3RlY3RlZCBfY2VudGVyOiBJTGF0TG9uZztcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSdzIGNlbnRlci5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQ2VudGVyKCk6IElMYXRMb25nIHtcclxuICAgICAgICBpZiAodGhpcy5fY2VudGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VudGVyID0gdGhpcy5HZXRCb3VuZGluZ0NlbnRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWxpbmUncyBjZW50cm9pZC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQ2VudHJvaWQoKTogSUxhdExvbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9jZW50cm9pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gdGhpcy5HZXRQb2x5bGluZUNlbnRyb2lkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50cm9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIHBvbHlsaW5lLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTmF0aXZlUHJpbWl0dmUoKTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcG9seWxpbmUgbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgU2hvd1Rvb2x0aXAoKTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGl0bGUgb2ZmIHRoZSBwb2x5bGluZVxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKiBAcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBUaXRsZSgpOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IFRpdGxlKHZhbDogc3RyaW5nKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGNlbnRyb2lkIG9mIHRoZSBwb2x5bGluZSBiYXNlZCBvbiB0aGUgYSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gdGhlIHBhdGggZm9yIHdoaWNoIHRvIGdlbmVyYXRlIHRoZSBjZW50cm9pZFxyXG4gICAgICogQHJldHVybnMgLSBUaGUgY2VudHJvaWQgY29vcmRpbmF0ZXMgb2YgdGhlIHBvbHlsaW5lLlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0UG9seWxpbmVDZW50cm9pZChwYXRoOiBBcnJheTxJTGF0TG9uZz4pOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgbGV0IGM6IElMYXRMb25nID0ge2xhdGl0dWRlOiAwLCBsb25naXR1ZGU6IDB9O1xyXG4gICAgICAgIGNvbnN0IG9mZiA9IHBhdGhbMF07XHJcbiAgICAgICAgaWYgKG9mZiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCB0d2ljZWFyZWE6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHAxOiBJTGF0TG9uZywgcDI6IElMYXRMb25nO1xyXG4gICAgICAgICAgICBsZXQgZjogbnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSBwYXRoLmxlbmd0aCAtIDE7IGkgPCBwYXRoLmxlbmd0aDsgaiA9IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcDEgPSBwYXRoW2ldO1xyXG4gICAgICAgICAgICAgICAgcDIgPSBwYXRoW2pdO1xyXG4gICAgICAgICAgICAgICAgZiA9IChwMS5sYXRpdHVkZSAtIG9mZi5sYXRpdHVkZSkgKiAocDIubG9uZ2l0dWRlIC0gb2ZmLmxvbmdpdHVkZSkgLVxyXG4gICAgICAgICAgICAgICAgICAgIChwMi5sYXRpdHVkZSAtIG9mZi5sYXRpdHVkZSkgKiAocDEubG9uZ2l0dWRlIC0gb2ZmLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB0d2ljZWFyZWEgKz0gZjtcclxuICAgICAgICAgICAgICAgIHggKz0gKHAxLmxhdGl0dWRlICsgcDIubGF0aXR1ZGUgLSAyICogb2ZmLmxhdGl0dWRlKSAqIGY7XHJcbiAgICAgICAgICAgICAgICB5ICs9IChwMS5sb25naXR1ZGUgKyBwMi5sb25naXR1ZGUgLSAyICogb2ZmLmxvbmdpdHVkZSkgKiBmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0d2ljZWFyZWEgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIGYgPSB0d2ljZWFyZWEgKiAzO1xyXG4gICAgICAgICAgICAgICAgYy5sYXRpdHVkZSA9IHggLyBmICsgb2ZmLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgYy5sb25naXR1ZGUgPSB5IC8gZiArIG9mZi5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjLmxhdGl0dWRlID0gb2ZmLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgYy5sb25naXR1ZGUgPSBvZmYubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxyXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZWQgdGhlIHBvbHlsaW5lLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWxpbmUgaXMgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldERyYWdnYWJsZSgpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGNhbiBiZSBlZGl0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0RWRpdGFibGUoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIElMYXRMb25nIG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWxpbmUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEdldFBhdGgoKTogQXJyYXk8SUxhdExvbmc+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5bGluZSBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRWaXNpYmxlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFrZSB0aGUgcG9seWxpbmUgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlsaW5lIHBhdGggaXMgZWRpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZWRpdGFibGUgLSBUcnVlIHRvIG1ha2UgcG9seWxpbmUgcGF0aCBlZGl0YWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWxpbmUgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUxhdExvbmd9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBUaGUgb3B0aW9ucyBhcmUgbWVyZ2VkIHdpdGggaHRlIG9uZXNcclxuICAgICAqIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9seWxpbmUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5bGluZXMgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFBhdGgocGF0aDogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8SUxhdExvbmc+KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIHBvbHlsaW5lIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2VudGVyIG9mIHRoZSBwb2x5bGluZScgYm91bmRpbmcgYm94LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgY2VudGVyIG9mIHRoZSBib3VuZGluZyBib3guXHJcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIEdldEJvdW5kaW5nQ2VudGVyKCk6IElMYXRMb25nIHtcclxuICAgICAgICBsZXQgYzogSUxhdExvbmcgPSB7bGF0aXR1ZGU6IDAsIGxvbmdpdHVkZTogMH07XHJcbiAgICAgICAgbGV0IHgxOiBudW1iZXIgPSA5MCwgeDI6IG51bWJlciA9IC05MCwgeTE6IG51bWJlciA9IDE4MCwgeTI6IG51bWJlciA9IC0xODA7XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gdGhpcy5HZXRQYXRoKCk7XHJcbiAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgcGF0aC5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHAubGF0aXR1ZGUgPCB4MSkgeyB4MSA9IHAubGF0aXR1ZGU7IH1cclxuICAgICAgICAgICAgICAgIGlmIChwLmxhdGl0dWRlID4geDIpIHsgeDIgPSBwLmxhdGl0dWRlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sb25naXR1ZGUgPCB5MSkgeyB5MSA9IHAubG9uZ2l0dWRlOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5sb25naXR1ZGUgPiB5MikgeyB5MiA9IHAubG9uZ2l0dWRlOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjLmxhdGl0dWRlID0geDEgKyAoeDIgLSB4MSkgLyAyO1xyXG4gICAgICAgICAgICBjLmxvbmdpdHVkZSA9IHkxICsgKHkyIC0geTEpIC8gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgY2VudHJvaWQgb2YgdGhlIHBvbHlsaW5lIGJhc2VkIG9uIHRoZSBwb2x5bGluZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGNlbnRyb2lkIGNvb3JkaW5hdGVzIG9mIHRoZSBwb2x5bGluZS5cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgR2V0UG9seWxpbmVDZW50cm9pZCgpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gdGhpcy5HZXRQYXRoKCk7XHJcbiAgICAgICAgY29uc3QgYzogSUxhdExvbmcgID0gUG9seWxpbmUuR2V0UG9seWxpbmVDZW50cm9pZChwYXRoKTtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbn1cclxuIl19