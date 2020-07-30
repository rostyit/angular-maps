/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { GoogleConversions } from '../../services/google/google-conversions';
import { Polygon } from '../polygon';
import { GoogleMapLabel } from './google-label';
/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
export class GooglePolygon extends Polygon {
    /**
     * Creates an instance of GooglePolygon.
     * \@memberof GooglePolygon
     * @param {?} _polygon - The {\@link GoogleMapTypes.Polygon} underlying the model.
     *
     */
    constructor(_polygon) {
        super();
        this._polygon = _polygon;
        this._title = '';
        this._showLabel = false;
        this._showTooltip = false;
        this._maxZoom = -1;
        this._minZoom = -1;
        this._label = null;
        this._tooltip = null;
        this._tooltipVisible = false;
        this._hasToolTipReceiver = false;
        this._mouseOverListener = null;
        this._mouseOutListener = null;
        this._mouseMoveListener = null;
        this._metadata = new Map();
        this._editingCompleteEmitter = null;
        this._originalPath = this.GetPaths();
    }
    /**
     * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get LabelMaxZoom() { return this._maxZoom; }
    /**
     * @param {?} val
     * @return {?}
     */
    set LabelMaxZoom(val) {
        this._maxZoom = val;
        this.ManageLabel();
    }
    /**
     * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get LabelMinZoom() { return this._minZoom; }
    /**
     * @param {?} val
     * @return {?}
     */
    set LabelMinZoom(val) {
        this._minZoom = val;
        this.ManageLabel();
    }
    /**
     * Gets the polygon metadata.
     *
     * \@readonly
     * \@memberof GoolePolygon
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the native primitve implementing the polygon, in this case {\@link GoogleMapTypes.Polygon}
     *
     * \@readonly
     * \@memberof GooglePolygon
     * @return {?}
     */
    get NativePrimitve() { return this._polygon; }
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get ShowLabel() { return this._showLabel; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ShowLabel(val) {
        this._showLabel = val;
        this.ManageLabel();
    }
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get ShowTooltip() { return this._showTooltip; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ShowTooltip(val) {
        this._showTooltip = val;
        this.ManageTooltip();
    }
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * \@memberof GooglePolygon
     * \@property
     * @return {?}
     */
    get Title() { return this._title; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Title(val) {
        this._title = val;
        this.ManageLabel();
        this.ManageTooltip();
    }
    /**
     * Adds a delegate for an event.
     *
     * \@memberof GooglePolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    AddListener(eventType, fn) {
        /** @type {?} */
        const supportedEvents = [
            'click',
            'dblclick',
            'drag', 'dragend',
            'dragstart',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'rightclick'
        ];
        if (supportedEvents.indexOf(eventType) !== -1) {
            this._polygon.addListener(eventType, fn);
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    }
    /**
     * Deleted the polygon.
     *
     * \@memberof GooglePolygon
     * @return {?}
     */
    Delete() {
        this._polygon.setMap(null);
        if (this._label) {
            this._label.Delete();
        }
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    }
    /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    GetDraggable() {
        return this._polygon.getDraggable();
    }
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GetEditable() {
        return this._polygon.getEditable();
    }
    /**
     * Gets the polygon path.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    GetPath() {
        /** @type {?} */
        const p = this._polygon.getPath();
        /** @type {?} */
        const path = new Array();
        p.forEach(x => path.push({ latitude: x.lat(), longitude: x.lng() }));
        return path;
    }
    /**
     * Gets the polygon paths.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    GetPaths() {
        /** @type {?} */
        const p = this._polygon.getPaths();
        /** @type {?} */
        const paths = new Array();
        p.forEach(x => {
            /** @type {?} */
            const path = new Array();
            x.forEach(y => path.push({ latitude: y.lat(), longitude: y.lng() }));
            paths.push(path);
        });
        return paths;
    }
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._polygon.getVisible();
    }
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof GooglePolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        this._polygon.setDraggable(draggable);
    }
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof GooglePolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    SetEditable(editable) {
        /** @type {?} */
        const previous = this._polygon.getEditable();
        this._polygon.setEditable(editable);
        if (previous && !editable && this._editingCompleteEmitter) {
            this._editingCompleteEmitter({
                Click: null,
                Polygon: this,
                OriginalPath: this._originalPath,
                NewPath: this.GetPaths()
            });
            this._originalPath = this.GetPaths();
        }
    }
    /**
     * Sets the polygon options
     *
     * \@memberof GooglePolygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    SetOptions(options) {
        /** @type {?} */
        const o = GoogleConversions.TranslatePolygonOptions(options);
        if (typeof o.editable !== 'undefined') {
            this.SetEditable(o.editable);
            delete o.editable;
        }
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
    }
    /**
     * Sets the polygon path.
     *
     * \@memberof GooglePolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    SetPath(path) {
        /** @type {?} */
        const p = new Array();
        path.forEach(x => p.push(new google.maps.LatLng(x.latitude, x.longitude)));
        this._polygon.setPath(p);
        this._originalPath = [path];
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    }
    /**
     * Set the polygon path or paths.
     *
     * \@memberof GooglePolygon
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    SetPaths(paths) {
        if (paths == null) {
            return;
        }
        if (!Array.isArray(paths)) {
            return;
        }
        if (paths.length === 0) {
            this._polygon.setPaths(new Array());
            if (this._label) {
                this._label.Delete();
                this._label = null;
            }
            return;
        }
        if (Array.isArray(paths[0])) {
            /** @type {?} */
            const p = new Array();
            (/** @type {?} */ (paths)).forEach(path => {
                /** @type {?} */
                const _p = new Array();
                path.forEach(x => _p.push(new google.maps.LatLng(x.latitude, x.longitude)));
                p.push(_p);
            });
            this._polygon.setPaths(p);
            this._originalPath = /** @type {?} */ (paths);
            if (this._label) {
                this._centroid = null;
                this.ManageLabel();
            }
        }
        else {
            // parameter is a simple array....
            this.SetPath(/** @type {?} */ (paths));
        }
    }
    /**
     * Sets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._polygon.setVisible(visible);
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    }
    /**
     * Configures the label for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    ManageLabel() {
        if (this.GetPath == null || this.GetPath().length === 0) {
            return;
        }
        if (this._showLabel && this._title != null && this._title !== '') {
            /** @type {?} */
            const o = {
                text: this._title,
                position: GoogleConversions.TranslateLocationObject(this.Centroid)
            };
            if (o["position"] == null) {
                return;
            }
            if (this._minZoom !== -1) {
                o["minZoom"] = this._minZoom;
            }
            if (this._maxZoom !== -1) {
                o["maxZoom"] = this._maxZoom;
            }
            if (this._label == null) {
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = this.NativePrimitve.zIndex ? this.NativePrimitve.zIndex + 1 : 100;
                this._label = new GoogleMapLabel(o);
            }
            else {
                this._label.SetValues(o);
            }
            this._label.Set('hidden', !this.GetVisible());
        }
        else {
            if (this._label) {
                this._label.SetMap(null);
                this._label = null;
            }
        }
    }
    /**
     * Configures the tooltip for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    ManageTooltip() {
        if (this._showTooltip && this._title != null && this._title !== '') {
            /** @type {?} */
            const o = {
                text: this._title,
                align: 'left',
                offset: new google.maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = 100000;
                this._tooltip = new GoogleMapLabel(o);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = this.NativePrimitve.addListener('mouseover', (e) => {
                    this._tooltip.Set('position', e.latLng);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('position', e.latLng);
                    }
                });
                this._mouseOutListener = this.NativePrimitve.addListener('mouseout', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('hidden', true);
                        this._tooltipVisible = false;
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) {
                    google.maps.event.removeListener(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    google.maps.event.removeListener(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    google.maps.event.removeListener(this._mouseMoveListener);
                }
                this._hasToolTipReceiver = false;
            }
            if (this._tooltip) {
                this._tooltip.SetMap(null);
                this._tooltip = null;
            }
        }
    }
}
if (false) {
    /** @type {?} */
    GooglePolygon.prototype._title;
    /** @type {?} */
    GooglePolygon.prototype._showLabel;
    /** @type {?} */
    GooglePolygon.prototype._showTooltip;
    /** @type {?} */
    GooglePolygon.prototype._maxZoom;
    /** @type {?} */
    GooglePolygon.prototype._minZoom;
    /** @type {?} */
    GooglePolygon.prototype._label;
    /** @type {?} */
    GooglePolygon.prototype._tooltip;
    /** @type {?} */
    GooglePolygon.prototype._tooltipVisible;
    /** @type {?} */
    GooglePolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    GooglePolygon.prototype._originalPath;
    /** @type {?} */
    GooglePolygon.prototype._mouseOverListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseOutListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseMoveListener;
    /** @type {?} */
    GooglePolygon.prototype._metadata;
    /** @type {?} */
    GooglePolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    GooglePolygon.prototype._polygon;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVVoRCxNQUFNLG9CQUFxQixTQUFRLE9BQU87Ozs7Ozs7SUFnSHRDLFlBQW9CLFFBQWdDO1FBQ2hELEtBQUssRUFBRSxDQUFDO1FBRFEsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7c0JBOUczQixFQUFFOzBCQUNHLEtBQUs7NEJBQ0gsS0FBSzt3QkFDVixDQUFDLENBQUM7d0JBQ0YsQ0FBQyxDQUFDO3NCQUNJLElBQUk7d0JBQ0YsSUFBSTsrQkFDSixLQUFLO21DQUNELEtBQUs7a0NBRW1CLElBQUk7aUNBQ0wsSUFBSTtrQ0FDSCxJQUFJO3lCQUM3QixJQUFJLEdBQUcsRUFBZTt1Q0FDTSxJQUFJO1FBa0dsRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN4Qzs7Ozs7Ozs7UUF2RlUsWUFBWSxLQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7OztRQUM5QyxZQUFZLENBQUMsR0FBVztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Ozs7OztRQVNaLFlBQVksS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7UUFDOUMsWUFBWSxDQUFDLEdBQVc7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcs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LENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7aUJBQUU7Z0JBQ3pGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUFFO2dCQUMzRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDM0YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzthQUNwQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDeEI7U0FDSjs7Q0FHUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcclxuaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBMYWJlbCB9IGZyb20gJy4vZ29vZ2xlLWxhYmVsJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gZm9yIGEgcG9seWdvbiBtb2RlbCBmb3IgR29vZ2xlIE1hcHMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVQb2x5Z29uIGV4dGVuZHMgUG9seWdvbiBpbXBsZW1lbnRzIFBvbHlnb24ge1xyXG5cclxuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgX3Nob3dMYWJlbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfc2hvd1Rvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX21heFpvb206IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfbWluWm9vbTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9sYWJlbDogR29vZ2xlTWFwTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogR29vZ2xlTWFwTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2hhc1Rvb2xUaXBSZWNlaXZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfb3JpZ2luYWxQYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+O1xyXG4gICAgcHJpdmF0ZSBfbW91c2VPdmVyTGlzdGVuZXI6IEdvb2dsZU1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgX21vdXNlT3V0TGlzdGVuZXI6IEdvb2dsZU1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgX21vdXNlTW92ZUxpc3RlbmVyOiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcbiAgICBwcml2YXRlIF9lZGl0aW5nQ29tcGxldGVFbWl0dGVyOiAoZXZlbnQ6IElQb2x5Z29uRXZlbnQpID0+IHZvaWQgPSBudWxsO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTGFiZWxNYXhab29tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXhab29tOyB9XHJcbiAgICBwdWJsaWMgc2V0IExhYmVsTWF4Wm9vbSh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX21heFpvb20gPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExhYmVsTWluWm9vbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWluWm9vbTsgfVxyXG4gICAgcHVibGljIHNldCBMYWJlbE1pblpvb20odmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9taW5ab29tID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB0aGlzLl9tZXRhZGF0YTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgcG9seWdvbiwgaW4gdGhpcyBjYXNlIHtAbGluayBHb29nbGVNYXBUeXBlcy5Qb2x5Z29ufVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uIHsgcmV0dXJuIHRoaXMuX3BvbHlnb247IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIGxhYmVsXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgU2hvd0xhYmVsKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd0xhYmVsOyB9XHJcbiAgICBwdWJsaWMgc2V0IFNob3dMYWJlbCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zaG93TGFiZWwgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gc2hvdyB0aGUgdG9vbHRpcFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1Rvb2x0aXA7IH1cclxuICAgIHB1YmxpYyBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd1Rvb2x0aXAgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWdvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90aXRsZTsgfVxyXG4gICAgcHVibGljIHNldCBUaXRsZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBjb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZVBvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gX3BvbHlnb24gLSBUaGUge0BsaW5rIEdvb2dsZU1hcFR5cGVzLlBvbHlnb259IHVuZGVybHlpbmcgdGhlIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvbHlnb246IEdvb2dsZU1hcFR5cGVzLlBvbHlnb24pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IHRoaXMuR2V0UGF0aHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBkZWxlZ2F0ZSBmb3IgYW4gZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxyXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcblxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRFdmVudHMgPSBbXHJcbiAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICdkYmxjbGljaycsXHJcbiAgICAgICAgICAgICdkcmFnJywgJ2RyYWdlbmQnLFxyXG4gICAgICAgICAgICAnZHJhZ3N0YXJ0JyxcclxuICAgICAgICAgICAgJ21vdXNlZG93bicsXHJcbiAgICAgICAgICAgICdtb3VzZW1vdmUnLFxyXG4gICAgICAgICAgICAnbW91c2VvdXQnLFxyXG4gICAgICAgICAgICAnbW91c2VvdmVyJyxcclxuICAgICAgICAgICAgJ21vdXNldXAnLFxyXG4gICAgICAgICAgICAncmlnaHRjbGljaydcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChzdXBwb3J0ZWRFdmVudHMuaW5kZXhPZihldmVudFR5cGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uLmFkZExpc3RlbmVyKGV2ZW50VHlwZSwgZm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAncGF0aGNoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIgPSA8KGV2ZW50OiBJUG9seWdvbkV2ZW50KSA9PiB2b2lkPmZuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZWQgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldE1hcChudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuRGVsZXRlKCk7IH1cclxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkgeyB0aGlzLl90b29sdGlwLkRlbGV0ZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2dhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXREcmFnZ2FibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlnb24uZ2V0RHJhZ2dhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBjYW4gYmUgZWRpdGVkLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcGF0aCBjYW4gYmUgZWRpdGVkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEVkaXRhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29uLmdldEVkaXRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPiB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiA9IHRoaXMuX3BvbHlnb24uZ2V0UGF0aCgpO1xyXG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IG5ldyBBcnJheTxJTGF0TG9uZz4oKTtcclxuICAgICAgICBwLmZvckVhY2goeCA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogeC5sYXQoKSwgbG9uZ2l0dWRlOiB4LmxuZygpIH0pKTtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyBtdWx0aXBsZSBwb2x5Z29uIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQYXRocygpOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+IHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PiA9IHRoaXMuX3BvbHlnb24uZ2V0UGF0aHMoKTtcclxuICAgICAgICBjb25zdCBwYXRoczogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IG5ldyBBcnJheTxBcnJheTxJTGF0TG9uZz4+KCk7XHJcbiAgICAgICAgcC5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XHJcbiAgICAgICAgICAgIHguZm9yRWFjaCh5ID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiB5LmxhdCgpLCBsb25naXR1ZGU6IHkubG5nKCkgfSkpO1xyXG4gICAgICAgICAgICBwYXRocy5wdXNoKHBhdGgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYXRocztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlnb24uZ2V0VmlzaWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlnb24gZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdldGhlciB0aGUgcG9seWdvbiBwYXRoIGlzIGVkaXRhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlZGl0YWJsZSAtIFRydWUgdG8gbWFrZSBwb2x5Z29uIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuX3BvbHlnb24uZ2V0RWRpdGFibGUoKTtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldEVkaXRhYmxlKGVkaXRhYmxlKTtcclxuICAgICAgICBpZiAocHJldmlvdXMgJiYgIWVkaXRhYmxlICYmIHRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlcih7XHJcbiAgICAgICAgICAgICAgICBDbGljazogbnVsbCxcclxuICAgICAgICAgICAgICAgIFBvbHlnb246IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBPcmlnaW5hbFBhdGg6IHRoaXMuX29yaWdpbmFsUGF0aCxcclxuICAgICAgICAgICAgICAgIE5ld1BhdGg6IHRoaXMuR2V0UGF0aHMoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gdGhpcy5HZXRQYXRocygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gVGhlIG9wdGlvbnMgYXJlIG1lcmdlZCB3aXRoIGh0ZSBvbmVzXHJcbiAgICAgKiBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygby5lZGl0YWJsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRFZGl0YWJsZShvLmVkaXRhYmxlKTtcclxuICAgICAgICAgICAgZGVsZXRlIG8uZWRpdGFibGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudmlzaWJsZSAhPSBudWxsICYmIHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl9sYWJlbCkgeyB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICFvcHRpb25zLnZpc2libGUpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhdGggLSBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFBhdGgocGF0aDogQXJyYXk8SUxhdExvbmc+KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCk7XHJcbiAgICAgICAgcGF0aC5mb3JFYWNoKHggPT4gcC5wdXNoKG5ldyBnb29nbGUubWFwcy5MYXRMbmcoeC5sYXRpdHVkZSwgeC5sb25naXR1ZGUpKSk7XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRQYXRoKHApO1xyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IFtwYXRoXTtcclxuICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIHBhdGggb3IgcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhdGhzIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ31cclxuICAgICAqIChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGgocykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFBhdGhzKHBhdGhzOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+IHwgQXJyYXk8SUxhdExvbmc+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHBhdGhzID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhdGhzKSkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAocGF0aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb24uc2V0UGF0aHMobmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwuRGVsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoc1swXSkpIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9yIGFycmF5c1xyXG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PiA9IG5ldyBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PigpO1xyXG4gICAgICAgICAgICAoPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHMpLmZvckVhY2gocGF0aCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCk7XHJcbiAgICAgICAgICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBfcC5wdXNoKG5ldyBnb29nbGUubWFwcy5MYXRMbmcoeC5sYXRpdHVkZSwgeC5sb25naXR1ZGUpKSk7XHJcbiAgICAgICAgICAgICAgICBwLnB1c2goX3ApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRQYXRocyhwKTtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGEgc2ltcGxlIGFycmF5Li4uLlxyXG4gICAgICAgICAgICB0aGlzLlNldFBhdGgoPEFycmF5PElMYXRMb25nPj5wYXRocyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWdvbiB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0VmlzaWJsZSh2aXNpYmxlKTtcclxuICAgICAgICBpZiAodGhpcy5fc2hvd0xhYmVsICYmIHRoaXMuX2xhYmVsKSB7IHRoaXMuX2xhYmVsLlNldCgnaGlkZGVuJywgIXZpc2libGUpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIGxhYmVsIGZvciB0aGUgcG9seWdvblxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBNYW5hZ2VMYWJlbCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5HZXRQYXRoID09IG51bGwgfHwgdGhpcy5HZXRQYXRoKCkubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fdGl0bGUgIT0gbnVsbCAmJiB0aGlzLl90aXRsZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX3RpdGxlLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KHRoaXMuQ2VudHJvaWQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChvLnBvc2l0aW9uID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9taW5ab29tICE9PSAtMSkgeyBvLm1pblpvb20gPSB0aGlzLl9taW5ab29tOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhab29tICE9PSAtMSkgeyBvLm1heFpvb20gPSB0aGlzLl9tYXhab29tOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvLm1hcCA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuZ2V0TWFwKCk7XHJcbiAgICAgICAgICAgICAgICBvLnpJbmRleCA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuekluZGV4ID8gdGhpcy5OYXRpdmVQcmltaXR2ZS56SW5kZXggKyAxIDogMTAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBuZXcgR29vZ2xlTWFwTGFiZWwobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXRWYWx1ZXMobyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhdGhpcy5HZXRWaXNpYmxlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmVzIHRoZSB0b29sdGlwIGZvciB0aGUgcG9seWdvblxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBNYW5hZ2VUb29sdGlwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG93VG9vbHRpcCAmJiB0aGlzLl90aXRsZSAhPSBudWxsICYmIHRoaXMuX3RpdGxlICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5fdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjUpLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmlzcXVlJyxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG8ubWFwID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5nZXRNYXAoKTtcclxuICAgICAgICAgICAgICAgIG8uekluZGV4ID0gMTAwMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBHb29nbGVNYXBMYWJlbChvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0VmFsdWVzKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lciA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sYXRMbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmFkZExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZTogR29vZ2xlTWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkgeyB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBlLmxhdExuZyk7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VPdXRMaXN0ZW5lciA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuYWRkTGlzdGVuZXIoJ21vdXNlb3V0JywgKGU6IEdvb2dsZU1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKCF0aGlzLl9zaG93VG9vbHRpcCB8fCB0aGlzLl90aXRsZSA9PT0gJycgfHwgdGhpcy5fdGl0bGUgPT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlT3V0TGlzdGVuZXIpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW91c2VPdXRMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lcikgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcikgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=