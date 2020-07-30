/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MapLabel } from '../map-label';
import { Extender } from '../extender';
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export class GoogleMapLabel extends MapLabel {
    /**
     * Returns the default label style for the platform
     *
     * \@readonly
     * @abstract
     * \@memberof GoogleMapLabel
     * @return {?}
     */
    get DefaultLabelStyle() {
        return {
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontColor: '#ffffff',
            strokeWeight: 3,
            strokeColor: '#000000'
        };
    }
    /**
     * Creates a new MapLabel
     * @param {?} options Optional properties to set.
     */
    constructor(options) {
        options["fontSize"] = options["fontSize"] || 12;
        options["fontColor"] = options["fontColor"] || '#ffffff';
        options["strokeWeight"] = options["strokeWeight"] || 3;
        options["strokeColor"] = options["strokeColor"] || '#000000';
        super(options);
    }
    /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    Get(key) {
        return (/** @type {?} */ (this)).get(key);
    }
    /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @return {?}
     */
    GetMap() {
        return (/** @type {?} */ (this)).getMap();
    }
    /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    Set(key, val) {
        if (key === 'position' && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new google.maps.LatLng(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (/** @type {?} */ (this)).set(key, val);
        }
    }
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    SetMap(map) {
        (/** @type {?} */ (this)).setMap(map);
    }
    /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    SetValues(options) {
        for (const key in options) {
            if (key !== '') {
                if (key === 'position' && options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                    options[key] = new google.maps.LatLng(options[key].latitude, options[key].longitude);
                }
                if (this.Get(key) === options[key]) {
                    delete options[key];
                }
            }
        }
        (/** @type {?} */ (this)).setValues(options);
    }
    /**
     * Draws the label on the map.
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    Draw() {
        /** @type {?} */
        const projection = (/** @type {?} */ (this)).getProjection();
        /** @type {?} */
        const visibility = this.GetVisible();
        if (!projection) {
            // The map projection is not ready yet so do nothing
            return;
        }
        if (!this._canvas) {
            // onAdd has not been called yet.
            return;
        }
        /** @type {?} */
        const style = this._canvas.style;
        if (visibility !== '') {
            // label is not visible, don't calculate positions etc.
            style['visibility'] = visibility;
            return;
        }
        /** @type {?} */
        let offset = this.Get('offset');
        /** @type {?} */
        let latLng = this.Get('position');
        if (!latLng) {
            return;
        }
        if (!(latLng instanceof google.maps.LatLng)) {
            latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
        }
        if (!offset) {
            offset = new google.maps.Point(0, 0);
        }
        /** @type {?} */
        const pos = projection.fromLatLngToDivPixel(latLng);
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    }
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    OnAdd() {
        this._canvas = document.createElement('canvas');
        /** @type {?} */
        const style = this._canvas.style;
        style.position = 'absolute';
        /** @type {?} */
        const ctx = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        this.DrawCanvas();
        /** @type {?} */
        const panes = (/** @type {?} */ (this)).getPanes();
        if (panes) {
            panes.overlayLayer.appendChild(this._canvas);
            // 4: floatPane (infowindow)
            // 3: overlayMouseTarget (mouse events)
            // 2: markerLayer (marker images)
            // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
            // 0: mapPane (lowest pane above the map tiles)
        }
    }
}
/**
 * Helper function to extend the OverlayView into the MapLabel
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinMapLabelWithOverlayView() {
    new Extender(GoogleMapLabel)
        .Extend(new google.maps.OverlayView)
        .Map('changed', 'Changed')
        .Map('onAdd', 'OnAdd')
        .Map('draw', 'Draw')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQVV2QyxNQUFNLHFCQUFzQixTQUFRLFFBQVE7Ozs7Ozs7OztRQVM3QixpQkFBaUI7UUFDeEIsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsWUFBWTtZQUN4QixTQUFTLEVBQUUsU0FBUztZQUNwQixZQUFZLEVBQUUsQ0FBQztZQUNmLFdBQVcsRUFBRSxTQUFTO1NBQ3pCLENBQUM7Ozs7OztJQVdOLFlBQVksT0FBK0I7UUFDdkMsT0FBTyxlQUFZLE9BQU8sZ0JBQWEsRUFBRSxDQUFDO1FBQzFDLE9BQU8sZ0JBQWEsT0FBTyxpQkFBYyxTQUFTLENBQUM7UUFDbkQsT0FBTyxtQkFBZ0IsT0FBTyxvQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sa0JBQWUsT0FBTyxtQkFBZ0IsU0FBUyxDQUFDO1FBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQjs7Ozs7Ozs7O0lBY00sR0FBRyxDQUFDLEdBQVc7UUFDbEIsTUFBTSxDQUFDLG1CQUFNLElBQUksRUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3pCLE1BQU07UUFDVCxNQUFNLENBQUMsbUJBQU0sSUFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBUTtRQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUks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QyxPQUFPLENBQUMsQ0FBQzs7Ozs7O1NBTWhEO0tBQ0o7Q0FDSjs7Ozs7Ozs7QUFVRCxNQUFNO0lBRUYsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDO1NBQ3ZCLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ25DLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1NBQ3pCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1NBQ3JCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1NBQ25CLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XHJcbmltcG9ydCB7IE1hcExhYmVsIH0gZnJvbSAnLi4vbWFwLWxhYmVsJztcclxuaW1wb3J0IHsgSUxhYmVsT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhYmVsLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBFeHRlbmRlciB9IGZyb20gJy4uL2V4dGVuZGVyJztcclxuXHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIG1hcCBhIGxhYmxlZCB0byBiZSBwbGFjZWQgb24gdGhlIG1hcC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcExhYmVsIGV4dGVuZHMgTWFwTGFiZWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBsYWJlbCBzdHlsZSBmb3IgdGhlIHBsYXRmb3JtXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBMYWJlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IERlZmF1bHRMYWJlbFN0eWxlKCk6IElMYWJlbE9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxyXG4gICAgICAgICAgICBmb250Q29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAzLFxyXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogJyMwMDAwMDAnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE1hcExhYmVsXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbCBwcm9wZXJ0aWVzIHRvIHNldC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgICAgIG9wdGlvbnMuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplIHx8IDEyO1xyXG4gICAgICAgIG9wdGlvbnMuZm9udENvbG9yID0gb3B0aW9ucy5mb250Q29sb3IgfHwgJyNmZmZmZmYnO1xyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlV2VpZ2h0ID0gb3B0aW9ucy5zdHJva2VXZWlnaHQgfHwgMztcclxuICAgICAgICBvcHRpb25zLnN0cm9rZUNvbG9yID0gb3B0aW9ucy5zdHJva2VDb2xvciB8fCAnIzAwMDAwMCc7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHZhbHVlIG9mIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiAoPGFueT50aGlzKS5nZXQoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRNYXAoKTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwIHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHZhbHVlIGZvciBhIHNldHRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGtleSAtIEtleSBzcGVjaWZ5aW5nIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQHBhcmFtIHZhbCAtIFRoZSB2YWx1ZSB0byBzZXQuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldChrZXk6IHN0cmluZywgdmFsOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAncG9zaXRpb24nICYmIHZhbC5oYXNPd25Qcm9wZXJ0eSgnbGF0aXR1ZGUnKSAmJiB2YWwuaGFzT3duUHJvcGVydHkoJ2xvbmdpdHVkZScpKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcodmFsLmxhdGl0dWRlLCB2YWwubG9uZ2l0dWRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuR2V0KGtleSkgIT09IHZhbCkge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzKS5zZXQoa2V5LCB2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcCBmb3IgdGhlIGxhYmVsLiBTZXR0aW5ncyB0aGlzIHRvIG51bGwgcmVtb3ZlIHRoZSBsYWJlbCBmcm9tIGh0ZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcCAtIE1hcCB0byBhc3NvY2lhdGVkIHdpdGggdGhlIGxhYmVsLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRNYXAobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApOiB2b2lkIHtcclxuICAgICAgICAoPGFueT50aGlzKS5zZXRNYXAobWFwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGxpZXMgc2V0dGluZ3MgdG8gdGhlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHNldHRpbmdzIGtleSB2YWx1ZSBwYWlycy5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0VmFsdWVzKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAncG9zaXRpb24nICYmICBvcHRpb25zW2tleV0uaGFzT3duUHJvcGVydHkoJ2xhdGl0dWRlJykgJiYgIG9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnbG9uZ2l0dWRlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCBvcHRpb25zW2tleV0ubGF0aXR1ZGUsICBvcHRpb25zW2tleV0ubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkdldChrZXkpID09PSBvcHRpb25zW2tleV0pIHsgZGVsZXRlIG9wdGlvbnNba2V5XTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICg8YW55PnRoaXMpLnNldFZhbHVlcyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3cyB0aGUgbGFiZWwgb24gdGhlIG1hcC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgRHJhdygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gKDxhbnk+dGhpcykuZ2V0UHJvamVjdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHk6IHN0cmluZyA9IHRoaXMuR2V0VmlzaWJsZSgpO1xyXG4gICAgICAgIGlmICghcHJvamVjdGlvbikge1xyXG4gICAgICAgICAgICAvLyBUaGUgbWFwIHByb2plY3Rpb24gaXMgbm90IHJlYWR5IHlldCBzbyBkbyBub3RoaW5nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW52YXMpIHtcclxuICAgICAgICAgICAgLy8gb25BZGQgaGFzIG5vdCBiZWVuIGNhbGxlZCB5ZXQuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSB0aGlzLl9jYW52YXMuc3R5bGU7XHJcbiAgICAgICAgaWYgKHZpc2liaWxpdHkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIC8vIGxhYmVsIGlzIG5vdCB2aXNpYmxlLCBkb24ndCBjYWxjdWxhdGUgcG9zaXRpb25zIGV0Yy5cclxuICAgICAgICAgICAgc3R5bGVbJ3Zpc2liaWxpdHknXSA9IHZpc2liaWxpdHk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXQ6IEdvb2dsZU1hcFR5cGVzLlBvaW50ID0gdGhpcy5HZXQoJ29mZnNldCcpO1xyXG4gICAgICAgIGxldCBsYXRMbmc6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ3xHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsID0gdGhpcy5HZXQoJ3Bvc2l0aW9uJyk7XHJcbiAgICAgICAgaWYgKCFsYXRMbmcpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKCEobGF0TG5nIGluc3RhbmNlb2YgZ29vZ2xlLm1hcHMuTGF0TG5nKSkgeyBsYXRMbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdExuZy5sYXQsIGxhdExuZy5sbmcpOyB9XHJcbiAgICAgICAgaWYgKCFvZmZzZXQpIHsgb2Zmc2V0ID0gbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApOyB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcyA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwobGF0TG5nKTtcclxuICAgICAgICBzdHlsZVsndG9wJ10gPSAocG9zLnkgKyBvZmZzZXQueSkgKyAncHgnO1xyXG4gICAgICAgIHN0eWxlWydsZWZ0J10gPSAocG9zLnggKyBvZmZzZXQueCkgKyAncHgnO1xyXG4gICAgICAgIHN0eWxlWyd2aXNpYmlsaXR5J10gPSB2aXNpYmlsaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgY2FsbGVkIHdoZW4gdGhlIGxhYmVsIGlzIGFkZGVkIHRvIHRoZSBtYXAuIEdlbmVyYXRlcyBhbmQgY29uZmlndXJlc1xyXG4gICAgICogdGhlIGNhbnZhcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIE9uQWRkKCkge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gdGhpcy5fY2FudmFzLnN0eWxlO1xyXG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHJcbiAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBjdHgubGluZUpvaW4gPSAncm91bmQnO1xyXG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcclxuXHJcbiAgICAgICAgdGhpcy5EcmF3Q2FudmFzKCk7XHJcbiAgICAgICAgY29uc3QgcGFuZXMgPSAoPGFueT50aGlzKS5nZXRQYW5lcygpO1xyXG4gICAgICAgIGlmIChwYW5lcykge1xyXG4gICAgICAgICAgICBwYW5lcy5vdmVybGF5TGF5ZXIuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcclxuICAgICAgICAgICAgICAgIC8vIDQ6IGZsb2F0UGFuZSAoaW5mb3dpbmRvdylcclxuICAgICAgICAgICAgICAgIC8vIDM6IG92ZXJsYXlNb3VzZVRhcmdldCAobW91c2UgZXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgLy8gMjogbWFya2VyTGF5ZXIgKG1hcmtlciBpbWFnZXMpXHJcbiAgICAgICAgICAgICAgICAvLyAxOiBvdmVybGF5TGF5ZXIgKHBvbHlnb25zLCBwb2x5bGluZXMsIGdyb3VuZCBvdmVybGF5cywgdGlsZSBsYXllciBvdmVybGF5cylcclxuICAgICAgICAgICAgICAgIC8vIDA6IG1hcFBhbmUgKGxvd2VzdCBwYW5lIGFib3ZlIHRoZSBtYXAgdGlsZXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGV4dGVuZCB0aGUgT3ZlcmxheVZpZXcgaW50byB0aGUgTWFwTGFiZWxcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAbWV0aG9kXHJcbiAqL1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3KCkge1xyXG5cclxuICAgIG5ldyBFeHRlbmRlcihHb29nbGVNYXBMYWJlbClcclxuICAgICAgICAuRXh0ZW5kKG5ldyBnb29nbGUubWFwcy5PdmVybGF5VmlldylcclxuICAgICAgICAuTWFwKCdjaGFuZ2VkJywgJ0NoYW5nZWQnKVxyXG4gICAgICAgIC5NYXAoJ29uQWRkJywgJ09uQWRkJylcclxuICAgICAgICAuTWFwKCdkcmF3JywgJ0RyYXcnKVxyXG4gICAgICAgIC5NYXAoJ29uUmVtb3ZlJywgJ09uUmVtb3ZlJyk7XHJcbn1cclxuIl19