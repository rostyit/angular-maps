/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MapLabel } from '../map-label';
import { Extender } from '../extender';
/** @type {?} */
let id = 0;
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export class BingMapLabel extends MapLabel {
    /**
     * Returns the default label style for the platform
     *
     * \@readonly
     * @abstract
     * \@memberof BingMapLabel
     * @return {?}
     */
    get DefaultLabelStyle() {
        return {
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontColor: '#ffffff',
            strokeWeight: 2,
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
        options["strokeWeight"] = options["strokeWeight"] || 2;
        options["strokeColor"] = options["strokeColor"] || '#000000';
        super(options);
        (/** @type {?} */ (this))._options.beneathLabels = false;
    }
    /**
     * Gets the value of a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    Get(key) {
        return (/** @type {?} */ (this))[key];
    }
    /**
     * Gets the map associted with the label.
     *
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    GetMap() {
        return (/** @type {?} */ (this)).getMap();
    }
    /**
     * Set the value for a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    Set(key, val) {
        if (key === 'position' && !val.hasOwnProperty('altitude') && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new Microsoft.Maps.Location(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (/** @type {?} */ (this))[key] = val;
            this.Changed(key);
        }
    }
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    SetMap(map) {
        /** @type {?} */
        const m = this.GetMap();
        if (map === m) {
            return;
        }
        if (m) {
            m.layers.remove(this);
        }
        if (map != null) {
            map.layers.insert(this);
        }
    }
    /**
     * Applies settings to the object
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    SetValues(options) {
        /** @type {?} */
        const p = new Array();
        for (const key in options) {
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
    }
    /**
     * Draws the label on the map.
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    Draw() {
        /** @type {?} */
        const visibility = this.GetVisible();
        /** @type {?} */
        const m = this.GetMap();
        if (!this._canvas) {
            return;
        }
        if (!m) {
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
        const latLng = this.Get('position');
        if (!latLng) {
            return;
        }
        if (!offset) {
            offset = new Microsoft.Maps.Point(0, 0);
        }
        /** @type {?} */
        const pos = /** @type {?} */ (m.tryLocationToPixel(latLng, Microsoft.Maps.PixelReference.control));
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    }
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    OnAdd() {
        this._canvas = document.createElement('canvas');
        this._canvas.id = `xMapLabel${id++}`;
        /** @type {?} */
        const style = this._canvas.style;
        style.position = 'absolute';
        /** @type {?} */
        const ctx = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        (/** @type {?} */ (this)).setHtmlElement(this._canvas);
    }
    /**
     * Delegate callled when the label is loaded
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    OnLoad() {
        Microsoft.Maps.Events.addHandler(this.GetMap(), 'viewchange', () => {
            this.Changed('position');
        });
        this.DrawCanvas();
        this.Draw();
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRXZDLElBQUksRUFBRSxHQUFXLENBQUMsQ0FBQzs7Ozs7O0FBT25CLE1BQU0sbUJBQW9CLFNBQVEsUUFBUTs7Ozs7Ozs7O1FBUzNCLGlCQUFpQjtRQUN4QixNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLFNBQVM7U0FDekIsQ0FBQzs7Ozs7O0lBV04sWUFBWSxPQUErQjtRQUN2QyxPQUFPLGVBQVksT0FBTyxnQkFBYSxFQUFFLENBQUM7UUFDMUMsT0FBTyxnQkFBYSxPQUFPLGlCQUFjLFNBQVMsQ0FBQztRQUNuRCxPQUFPLG1CQUFnQixPQUFPLG9CQUFpQixDQUFDLENBQUM7UUFDakQsT0FBTyxrQkFBZSxPQUFPLG1CQUFnQixTQUFTLENBQUM7UUFDdkQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsbUJBQU0sSUFBSSxFQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7S0FDOUM7Ozs7Ozs7OztJQWNNLEdBQUcsQ0FBQyxHQUFXO1FBQ2xCLE1BQU0sQ0FBQyxtQkFBTSxJQUFJLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3JCLE1BQU07UUFDVCxNQUFNLENBQUMsbUJBQU0sSUFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBUTtRQUM1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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IElMYWJlbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYWJlbC1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tYXAtbGFiZWwnO1xyXG5pbXBvcnQgeyBFeHRlbmRlciB9IGZyb20gJy4uL2V4dGVuZGVyJztcclxuXHJcbmxldCBpZDogbnVtYmVyID0gMDtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIG1hcCBhIGxhYmxlZCB0byBiZSBwbGFjZWQgb24gdGhlIG1hcC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpbmdNYXBMYWJlbCBleHRlbmRzIE1hcExhYmVsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgbGFiZWwgc3R5bGUgZm9yIHRoZSBwbGF0Zm9ybVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgRGVmYXVsdExhYmVsU3R5bGUoKTogSUxhYmVsT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgIGZvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDIsXHJcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAnIzAwMDAwMCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgTWFwTGFiZWxcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsIHByb3BlcnRpZXMgdG8gc2V0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemUgfHwgMTI7XHJcbiAgICAgICAgb3B0aW9ucy5mb250Q29sb3IgPSBvcHRpb25zLmZvbnRDb2xvciB8fCAnI2ZmZmZmZic7XHJcbiAgICAgICAgb3B0aW9ucy5zdHJva2VXZWlnaHQgPSBvcHRpb25zLnN0cm9rZVdlaWdodCB8fCAyO1xyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlQ29sb3IgPSBvcHRpb25zLnN0cm9rZUNvbG9yIHx8ICcjMDAwMDAwJztcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICAoPGFueT50aGlzKS5fb3B0aW9ucy5iZW5lYXRoTGFiZWxzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHZhbHVlIG9mIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0KGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcylba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TWFwKCk6IE1pY3Jvc29mdC5NYXBzLk1hcCB7XHJcbiAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLmdldE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB2YWx1ZSBmb3IgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEBwYXJhbSB2YWwgLSBUaGUgdmFsdWUgdG8gc2V0LlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgIXZhbC5oYXNPd25Qcm9wZXJ0eSgnYWx0aXR1ZGUnKSAmJiB2YWwuaGFzT3duUHJvcGVydHkoJ2xhdGl0dWRlJykgJiYgdmFsLmhhc093blByb3BlcnR5KCdsb25naXR1ZGUnKSkge1xyXG4gICAgICAgICAgICB2YWwgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24odmFsLmxhdGl0dWRlLCB2YWwubG9uZ2l0dWRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuR2V0KGtleSkgIT09IHZhbCkge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzKVtrZXldID0gdmFsO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZWQoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXAgZm9yIHRoZSBsYWJlbC4gU2V0dGluZ3MgdGhpcyB0byBudWxsIHJlbW92ZSB0aGUgbGFiZWwgZnJvbSBodGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSBNYXAgdG8gYXNzb2NpYXRlZCB3aXRoIHRoZSBsYWJlbC5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE1hcChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG06IE1pY3Jvc29mdC5NYXBzLk1hcCA9IHRoaXMuR2V0TWFwKCk7XHJcbiAgICAgICAgaWYgKG1hcCA9PT0gbSkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAobSkge1xyXG4gICAgICAgICAgICBtLmxheWVycy5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWVzIHNldHRpbmdzIHRvIHRoZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBzZXR0aW5ncyBrZXkgdmFsdWUgcGFpcnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWYWx1ZXMob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGtleSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgIW9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnYWx0aXR1ZGUnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnbGF0aXR1ZGUnKSAmJiBvcHRpb25zW2tleV0uaGFzT3duUHJvcGVydHkoJ2xvbmdpdHVkZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKG9wdGlvbnNba2V5XS5sYXRpdHVkZSwgb3B0aW9uc1trZXldLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5HZXQoa2V5KSAhPT0gb3B0aW9uc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+dGhpcylba2V5XSA9IG9wdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBwLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocC5sZW5ndGggPiAwKSB7IHRoaXMuQ2hhbmdlZChwKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdzIHRoZSBsYWJlbCBvbiB0aGUgbWFwLlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgRHJhdygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB2aXNpYmlsaXR5OiBzdHJpbmcgPSB0aGlzLkdldFZpc2libGUoKTtcclxuICAgICAgICBjb25zdCBtOiBNaWNyb3NvZnQuTWFwcy5NYXAgPSB0aGlzLkdldE1hcCgpO1xyXG4gICAgICAgIGlmICghdGhpcy5fY2FudmFzKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICghbSkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcclxuICAgICAgICBpZiAodmlzaWJpbGl0eSAhPT0gJycpIHtcclxuICAgICAgICAgICAgLy8gbGFiZWwgaXMgbm90IHZpc2libGUsIGRvbid0IGNhbGN1bGF0ZSBwb3NpdGlvbnMgZXRjLlxyXG4gICAgICAgICAgICBzdHlsZVsndmlzaWJpbGl0eSddID0gdmlzaWJpbGl0eTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9mZnNldDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPSB0aGlzLkdldCgnb2Zmc2V0Jyk7XHJcbiAgICAgICAgY29uc3QgbGF0TG5nOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IHRoaXMuR2V0KCdwb3NpdGlvbicpO1xyXG4gICAgICAgIGlmICghbGF0TG5nKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICghb2Zmc2V0KSB7IG9mZnNldCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludCgwLCAwKTsgfVxyXG5cclxuICAgICAgICBjb25zdCBwb3M6IE1pY3Jvc29mdC5NYXBzLlBvaW50ID0gPE1pY3Jvc29mdC5NYXBzLlBvaW50Pm0udHJ5TG9jYXRpb25Ub1BpeGVsKFxyXG4gICAgICAgICAgICBsYXRMbmcsXHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xyXG4gICAgICAgIHN0eWxlWyd0b3AnXSA9IChwb3MueSArIG9mZnNldC55KSArICdweCc7XHJcbiAgICAgICAgc3R5bGVbJ2xlZnQnXSA9IChwb3MueCArIG9mZnNldC54KSArICdweCc7XHJcbiAgICAgICAgc3R5bGVbJ3Zpc2liaWxpdHknXSA9IHZpc2liaWxpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBjYWxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgYWRkZWQgdG8gdGhlIG1hcC4gR2VuZXJhdGVzIGFuZCBjb25maWd1cmVzXHJcbiAgICAgKiB0aGUgY2FudmFzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIE9uQWRkKCkge1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5pZCA9IGB4TWFwTGFiZWwke2lkKyt9YDtcclxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcclxuICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcclxuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XHJcblxyXG4gICAgICAgICg8YW55PnRoaXMpLnNldEh0bWxFbGVtZW50KHRoaXMuX2NhbnZhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGNhbGxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgbG9hZGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgT25Mb2FkKCkge1xyXG4gICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuR2V0TWFwKCksICd2aWV3Y2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZWQoJ3Bvc2l0aW9uJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5EcmF3Q2FudmFzKCk7XHJcbiAgICAgICAgdGhpcy5EcmF3KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHRoZSBDdXN0b21PdmVybGF5IGludG8gdGhlIE1hcExhYmVsXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQG1ldGhvZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKSB7XHJcbiAgICBuZXcgRXh0ZW5kZXIoQmluZ01hcExhYmVsKVxyXG4gICAgLkV4dGVuZChuZXcgTWljcm9zb2Z0Lk1hcHMuQ3VzdG9tT3ZlcmxheSgpKVxyXG4gICAgLk1hcCgnb25BZGQnLCAnT25BZGQnKVxyXG4gICAgLk1hcCgnb25Mb2FkJywgJ09uTG9hZCcpXHJcbiAgICAuTWFwKCdvblJlbW92ZScsICdPblJlbW92ZScpO1xyXG59XHJcbiJdfQ==