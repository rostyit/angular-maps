/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { MapLabel } from '../map-label';
import { Extender } from '../extender';
/** @type {?} */
var id = 0;
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
var /**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
BingMapLabel = /** @class */ (function (_super) {
    tslib_1.__extends(BingMapLabel, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates a new MapLabel
     * @param options Optional properties to set.
     */
    function BingMapLabel(options) {
        var _this = this;
        options["fontSize"] = options["fontSize"] || 12;
        options["fontColor"] = options["fontColor"] || '#ffffff';
        options["strokeWeight"] = options["strokeWeight"] || 2;
        options["strokeColor"] = options["strokeColor"] || '#000000';
        _this = _super.call(this, options) || this;
        (/** @type {?} */ (_this))._options.beneathLabels = false;
        return _this;
    }
    Object.defineProperty(BingMapLabel.prototype, "DefaultLabelStyle", {
        get: /**
         * Returns the default label style for the platform
         *
         * \@readonly
         * @abstract
         * \@memberof BingMapLabel
         * @return {?}
         */
        function () {
            return {
                fontSize: 12,
                fontFamily: 'sans-serif',
                fontColor: '#ffffff',
                strokeWeight: 2,
                strokeColor: '#000000'
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the value of a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    BingMapLabel.prototype.Get = /**
     * Gets the value of a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    function (key) {
        return (/** @type {?} */ (this))[key];
    };
    /**
     * Gets the map associted with the label.
     *
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    BingMapLabel.prototype.GetMap = /**
     * Gets the map associted with the label.
     *
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this)).getMap();
    };
    /**
     * Set the value for a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    BingMapLabel.prototype.Set = /**
     * Set the value for a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    function (key, val) {
        if (key === 'position' && !val.hasOwnProperty('altitude') && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new Microsoft.Maps.Location(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (/** @type {?} */ (this))[key] = val;
            this.Changed(key);
        }
    };
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    BingMapLabel.prototype.SetMap = /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    function (map) {
        /** @type {?} */
        var m = this.GetMap();
        if (map === m) {
            return;
        }
        if (m) {
            m.layers.remove(this);
        }
        if (map != null) {
            map.layers.insert(this);
        }
    };
    /**
     * Applies settings to the object
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    BingMapLabel.prototype.SetValues = /**
     * Applies settings to the object
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var p = new Array();
        for (var key in options) {
            if (key !== '') {
                if (key === 'position' && !options[key].hasOwnProperty('altitude') &&
                    options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                    options[key] = new Microsoft.Maps.Location(options[key].latitude, options[key].longitude);
                }
                if (this.Get(key) !== options[key]) {
                    (/** @type {?} */ (this))[key] = options[key];
                    p.push(key);
                }
            }
        }
        if (p.length > 0) {
            this.Changed(p);
        }
    };
    ///
    /// Protected methods
    ///
    /**
     * Draws the label on the map.
     * @memberof BingMapLabel
     * @method
     * @protected
     */
    /**
     * Draws the label on the map.
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    BingMapLabel.prototype.Draw = /**
     * Draws the label on the map.
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var visibility = this.GetVisible();
        /** @type {?} */
        var m = this.GetMap();
        if (!this._canvas) {
            return;
        }
        if (!m) {
            return;
        }
        /** @type {?} */
        var style = this._canvas.style;
        if (visibility !== '') {
            // label is not visible, don't calculate positions etc.
            style['visibility'] = visibility;
            return;
        }
        /** @type {?} */
        var offset = this.Get('offset');
        /** @type {?} */
        var latLng = this.Get('position');
        if (!latLng) {
            return;
        }
        if (!offset) {
            offset = new Microsoft.Maps.Point(0, 0);
        }
        /** @type {?} */
        var pos = /** @type {?} */ (m.tryLocationToPixel(latLng, Microsoft.Maps.PixelReference.control));
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    };
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * @memberof BingMapLabel
     * @method
     * @protected
     */
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    BingMapLabel.prototype.OnAdd = /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        this._canvas = document.createElement('canvas');
        this._canvas.id = "xMapLabel" + id++;
        /** @type {?} */
        var style = this._canvas.style;
        style.position = 'absolute';
        /** @type {?} */
        var ctx = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        (/** @type {?} */ (this)).setHtmlElement(this._canvas);
    };
    /**
     * Delegate callled when the label is loaded
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    BingMapLabel.prototype.OnLoad = /**
     * Delegate callled when the label is loaded
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    function () {
        var _this = this;
        Microsoft.Maps.Events.addHandler(this.GetMap(), 'viewchange', function () {
            _this.Changed('position');
        });
        this.DrawCanvas();
        this.Draw();
    };
    return BingMapLabel;
}(MapLabel));
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export { BingMapLabel };
/**
 * Helper function to extend the CustomOverlay into the MapLabel
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinMapLabelWithOverlayView() {
    new Extender(BingMapLabel)
        .Extend(new Microsoft.Maps.CustomOverlay())
        .Map('onAdd', 'OnAdd')
        .Map('onLoad', 'OnLoad')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUV2QyxJQUFJLEVBQUUsR0FBVyxDQUFDLENBQUM7Ozs7OztBQU9uQjs7Ozs7QUFBQTtJQUFrQyx3Q0FBUTtJQW1CdEMsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7OztPQUdHO0lBQ0gsc0JBQVksT0FBK0I7UUFBM0MsaUJBT0M7UUFORyxPQUFPLGVBQVksT0FBTyxnQkFBYSxFQUFFLENBQUM7UUFDMUMsT0FBTyxnQkFBYSxPQUFPLGlCQUFjLFNBQVMsQ0FBQztRQUNuRCxPQUFPLG1CQUFnQixPQUFPLG9CQUFpQixDQUFDLENBQUM7UUFDakQsT0FBTyxrQkFBZSxPQUFPLG1CQUFnQixTQUFTLENBQUM7UUFDdkQsUUFBQSxrQkFBTSxPQUFPLENBQUMsU0FBQztRQUNmLG1CQUFNLEtBQUksRUFBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDOztLQUM5QzswQkF6QlUsMkNBQWlCOzs7Ozs7Ozs7O1lBQ3hCLE1BQU0sQ0FBQztnQkFDSCxRQUFRLEVBQUUsRUFBRTtnQkFDWixVQUFVLEVBQUUsWUFBWTtnQkFDeEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFlBQVksRUFBRSxDQUFDO2dCQUNmLFdBQVcsRUFBRSxTQUFTO2FBQ3pCLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFnQ0MsMEJBQUc7Ozs7Ozs7O2NBQUMsR0FBVztRQUNsQixNQUFNLENBQUMsbUJBQU0sSUFBSSxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7OztJQVNyQiw2QkFBTTs7Ozs7Ozs7UUFDVCxNQUFNLENBQUMs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TUM7Ozs7Ozs7O0FBUUQsTUFBTTtJQUNGLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQztTQUN6QixNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1NBQ3JCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQ3ZCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IElMYWJlbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYWJlbC1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tYXAtbGFiZWwnO1xyXG5pbXBvcnQgeyBFeHRlbmRlciB9IGZyb20gJy4uL2V4dGVuZGVyJztcclxuXHJcbmxldCBpZDogbnVtYmVyID0gMDtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIG1hcCBhIGxhYmxlZCB0byBiZSBwbGFjZWQgb24gdGhlIG1hcC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpbmdNYXBMYWJlbCBleHRlbmRzIE1hcExhYmVsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgbGFiZWwgc3R5bGUgZm9yIHRoZSBwbGF0Zm9ybVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgRGVmYXVsdExhYmVsU3R5bGUoKTogSUxhYmVsT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgIGZvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDIsXHJcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAnIzAwMDAwMCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgTWFwTGFiZWxcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsIHByb3BlcnRpZXMgdG8gc2V0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemUgfHwgMTI7XHJcbiAgICAgICAgb3B0aW9ucy5mb250Q29sb3IgPSBvcHRpb25zLmZvbnRDb2xvciB8fCAnI2ZmZmZmZic7XHJcbiAgICAgICAgb3B0aW9ucy5zdHJva2VXZWlnaHQgPSBvcHRpb25zLnN0cm9rZVdlaWdodCB8fCAyO1xyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlQ29sb3IgPSBvcHRpb25zLnN0cm9rZUNvbG9yIHx8ICcjMDAwMDAwJztcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICAoPGFueT50aGlzKS5fb3B0aW9ucy5iZW5lYXRoTGFiZWxzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHZhbHVlIG9mIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0KGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcylba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TWFwKCk6IE1pY3Jvc29mdC5NYXBzLk1hcCB7XHJcbiAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLmdldE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB2YWx1ZSBmb3IgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEBwYXJhbSB2YWwgLSBUaGUgdmFsdWUgdG8gc2V0LlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgIXZhbC5oYXNPd25Qcm9wZXJ0eSgnYWx0aXR1ZGUnKSAmJiB2YWwuaGFzT3duUHJvcGVydHkoJ2xhdGl0dWRlJykgJiYgdmFsLmhhc093blByb3BlcnR5KCdsb25naXR1ZGUnKSkge1xyXG4gICAgICAgICAgICB2YWwgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24odmFsLmxhdGl0dWRlLCB2YWwubG9uZ2l0dWRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuR2V0KGtleSkgIT09IHZhbCkge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzKVtrZXldID0gdmFsO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZWQoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXAgZm9yIHRoZSBsYWJlbC4gU2V0dGluZ3MgdGhpcyB0byBudWxsIHJlbW92ZSB0aGUgbGFiZWwgZnJvbSBodGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSBNYXAgdG8gYXNzb2NpYXRlZCB3aXRoIHRoZSBsYWJlbC5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE1hcChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG06IE1pY3Jvc29mdC5NYXBzLk1hcCA9IHRoaXMuR2V0TWFwKCk7XHJcbiAgICAgICAgaWYgKG1hcCA9PT0gbSkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAobSkge1xyXG4gICAgICAgICAgICBtLmxheWVycy5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWVzIHNldHRpbmdzIHRvIHRoZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBzZXR0aW5ncyBrZXkgdmFsdWUgcGFpcnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWYWx1ZXMob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGtleSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgIW9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnYWx0aXR1ZGUnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnbGF0aXR1ZGUnKSAmJiBvcHRpb25zW2tleV0uaGFzT3duUHJvcGVydHkoJ2xvbmdpdHVkZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKG9wdGlvbnNba2V5XS5sYXRpdHVkZSwgb3B0aW9uc1trZXldLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5HZXQoa2V5KSAhPT0gb3B0aW9uc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+dGhpcylba2V5XSA9IG9wdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBwLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocC5sZW5ndGggPiAwKSB7IHRoaXMuQ2hhbmdlZChwKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdzIHRoZSBsYWJlbCBvbiB0aGUgbWFwLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgRHJhdygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB2aXNpYmlsaXR5OiBzdHJpbmcgPSB0aGlzLkdldFZpc2libGUoKTtcclxuICAgICAgICBjb25zdCBtOiBNaWNyb3NvZnQuTWFwcy5NYXAgPSB0aGlzLkdldE1hcCgpO1xyXG4gICAgICAgIGlmICghdGhpcy5fY2FudmFzKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICghbSkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcclxuICAgICAgICBpZiAodmlzaWJpbGl0eSAhPT0gJycpIHtcclxuICAgICAgICAgICAgLy8gbGFiZWwgaXMgbm90IHZpc2libGUsIGRvbid0IGNhbGN1bGF0ZSBwb3NpdGlvbnMgZXRjLlxyXG4gICAgICAgICAgICBzdHlsZVsndmlzaWJpbGl0eSddID0gdmlzaWJpbGl0eTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9mZnNldDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPSB0aGlzLkdldCgnb2Zmc2V0Jyk7XHJcbiAgICAgICAgY29uc3QgbGF0TG5nOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IHRoaXMuR2V0KCdwb3NpdGlvbicpO1xyXG4gICAgICAgIGlmICghbGF0TG5nKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICghb2Zmc2V0KSB7IG9mZnNldCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludCgwLCAwKTsgfVxyXG5cclxuICAgICAgICBjb25zdCBwb3M6IE1pY3Jvc29mdC5NYXBzLlBvaW50ID0gPE1pY3Jvc29mdC5NYXBzLlBvaW50Pm0udHJ5TG9jYXRpb25Ub1BpeGVsKFxyXG4gICAgICAgICAgICBsYXRMbmcsXHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xyXG4gICAgICAgIHN0eWxlWyd0b3AnXSA9IChwb3MueSArIG9mZnNldC55KSArICdweCc7XHJcbiAgICAgICAgc3R5bGVbJ2xlZnQnXSA9IChwb3MueCArIG9mZnNldC54KSArICdweCc7XHJcbiAgICAgICAgc3R5bGVbJ3Zpc2liaWxpdHknXSA9IHZpc2liaWxpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBjYWxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgYWRkZWQgdG8gdGhlIG1hcC4gR2VuZXJhdGVzIGFuZCBjb25maWd1cmVzXHJcbiAgICAgKiB0aGUgY2FudmFzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIE9uQWRkKCkge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5pZCA9IGB4TWFwTGFiZWwke2lkKyt9YDtcclxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcclxuICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcclxuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XHJcblxyXG4gICAgICAgICg8YW55PnRoaXMpLnNldEh0bWxFbGVtZW50KHRoaXMuX2NhbnZhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGNhbGxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgbG9hZGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgT25Mb2FkKCkge1xyXG4gICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuR2V0TWFwKCksICd2aWV3Y2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZWQoJ3Bvc2l0aW9uJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5EcmF3Q2FudmFzKCk7XHJcbiAgICAgICAgdGhpcy5EcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHRoZSBDdXN0b21PdmVybGF5IGludG8gdGhlIE1hcExhYmVsXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQG1ldGhvZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKSB7XHJcbiAgICBuZXcgRXh0ZW5kZXIoQmluZ01hcExhYmVsKVxyXG4gICAgLkV4dGVuZChuZXcgTWljcm9zb2Z0Lk1hcHMuQ3VzdG9tT3ZlcmxheSgpKVxyXG4gICAgLk1hcCgnb25BZGQnLCAnT25BZGQnKVxyXG4gICAgLk1hcCgnb25Mb2FkJywgJ09uTG9hZCcpXHJcbiAgICAuTWFwKCdvblJlbW92ZScsICdPblJlbW92ZScpO1xyXG59XHJcbiJdfQ==