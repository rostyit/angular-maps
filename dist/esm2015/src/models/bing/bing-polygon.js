/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polygon } from '../polygon';
import { BingMapLabel } from './bing-label';
/**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
export class BingPolygon extends Polygon {
    /**
     * Creates an instance of BingPolygon.
     * \@memberof BingPolygon
     * @param {?} _polygon - The {\@link Microsoft.Maps.Polygon} underlying the model.
     * @param {?} _mapService Instance of the Map Service.
     * @param {?} _layer - The context layer.
     */
    constructor(_polygon, _mapService, _layer) {
        super();
        this._polygon = _polygon;
        this._mapService = _mapService;
        this._layer = _layer;
        this._map = null;
        this._isEditable = false;
        this._title = '';
        this._maxZoom = -1;
        this._minZoom = -1;
        this._showLabel = false;
        this._showTooltip = false;
        this._label = null;
        this._tooltip = null;
        this._hasToolTipReceiver = false;
        this._tooltipVisible = false;
        this._metadata = new Map();
        this._map = this._mapService.MapInstance;
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
     * \@memberof BingPolygon
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the native primitve implementing the polygon, in this case {\@link Microsoft.Maps.Polygon}
     *
     * \@readonly
     * \@memberof BingPolygon
     * @return {?}
     */
    get NativePrimitve() { return this._polygon; }
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * \@memberof BingPolygon
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
     * \@memberof BingPolygon
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
     * \@memberof BingPolygon
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
     * \@memberof BingPolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    AddListener(eventType, fn) {
        /** @type {?} */
        const supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polygon, eventType, (e) => {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            /** @type {?} */
            let handlerId;
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', e => {
                handlerId = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', m => fn(m));
            });
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', e => {
                if (handlerId) {
                    Microsoft.Maps.Events.removeHandler(handlerId);
                }
            });
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    }
    /**
     * Deleted the polygon.
     *
     * \@memberof BingPolygon
     * @return {?}
     */
    Delete() {
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
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
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    GetDraggable() {
        return false;
    }
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GetEditable() {
        return this._isEditable;
    }
    /**
     * Gets the polygon path.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    GetPath() {
        /** @type {?} */
        const p = this._polygon.getLocations();
        /** @type {?} */
        const path = new Array();
        p.forEach(l => path.push({ latitude: l.latitude, longitude: l.longitude }));
        return path;
    }
    /**
     * Gets the polygon paths.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    GetPaths() {
        /** @type {?} */
        const p = this._polygon.getRings();
        /** @type {?} */
        const paths = new Array();
        p.forEach(x => {
            /** @type {?} */
            const path = new Array();
            x.forEach(y => path.push({ latitude: y.latitude, longitude: y.longitude }));
            paths.push(path);
        });
        return paths;
    }
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._polygon.getVisible();
    }
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof BingPolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        //      ?forum=bingmaps
        throw (new Error('The bing maps implementation currently does not support draggable polygons.'));
    }
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof BingPolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    SetEditable(editable) {
        /** @type {?} */
        const isChanged = this._isEditable !== editable;
        this._isEditable = editable;
        if (!isChanged) {
            return;
        }
        if (this._isEditable) {
            this._originalPath = this.GetPaths();
            this._mapService.GetDrawingTools().then(t => {
                t.edit(this._polygon);
            });
        }
        else {
            this._mapService.GetDrawingTools().then(t => {
                t.finish((editedPolygon) => {
                    if (editedPolygon !== this._polygon || !this._editingCompleteEmitter) {
                        return;
                    }
                    /** @type {?} */
                    const newPath = this.GetPaths();
                    /** @type {?} */
                    const originalPath = this._originalPath;
                    this.SetPaths(newPath);
                    // this is necessary for the new path to persist it appears.
                    this._editingCompleteEmitter({
                        Click: null,
                        Polygon: this,
                        OriginalPath: originalPath,
                        NewPath: newPath
                    });
                });
            });
        }
    }
    /**
     * Sets the polygon options
     *
     * \@memberof Polygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    SetOptions(options) {
        /** @type {?} */
        const o = BingConversions.TranslatePolygonOptions(options);
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
        if (typeof options.editable !== 'undefined') {
            this.SetEditable(options.editable);
        }
    }
    /**
     * Sets the polygon path.
     *
     * \@memberof BingPolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    SetPath(path) {
        /** @type {?} */
        const p = new Array();
        path.forEach(x => p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)));
        this._originalPath = [path];
        this._polygon.setLocations(p);
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    }
    /**
     * Set the polygon path or paths.
     *
     * \@memberof BingPolygon
     * @param {?} paths
     * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
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
            this._polygon.setRings(new Array());
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
                path.forEach(x => _p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)));
                p.push(_p);
            });
            this._originalPath = /** @type {?} */ (paths);
            this._polygon.setRings(p);
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
     * \@memberof BingPolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._polygon.setOptions(/** @type {?} */ ({ visible: visible }));
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    }
    /**
     * Configures the label for the polygon
     * \@memberof Polygon
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
                position: BingConversions.TranslateLocation(this.Centroid)
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
                this._label = new BingMapLabel(o);
                this._label.SetMap(this._map);
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
     * \@memberof Polygon
     * @return {?}
     */
    ManageTooltip() {
        if (this._showTooltip && this._title != null && this._title !== '') {
            /** @type {?} */
            const o = {
                text: this._title,
                align: 'left',
                offset: new Microsoft.Maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                this._tooltip = new BingMapLabel(o);
                this._tooltip.SetMap(this._map);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', (e) => {
                    this._tooltip.Set('position', e.location);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                    this._mouseMoveListener = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', (m) => {
                        if (this._tooltipVisible && m.location && m.primitive === this._polygon) {
                            this._tooltip.Set('position', m.location);
                        }
                    });
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('hidden', true);
                        this._tooltipVisible = false;
                    }
                    if (this._mouseMoveListener) {
                        Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
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
    BingPolygon.prototype._map;
    /** @type {?} */
    BingPolygon.prototype._isEditable;
    /** @type {?} */
    BingPolygon.prototype._title;
    /** @type {?} */
    BingPolygon.prototype._maxZoom;
    /** @type {?} */
    BingPolygon.prototype._minZoom;
    /** @type {?} */
    BingPolygon.prototype._showLabel;
    /** @type {?} */
    BingPolygon.prototype._showTooltip;
    /** @type {?} */
    BingPolygon.prototype._label;
    /** @type {?} */
    BingPolygon.prototype._tooltip;
    /** @type {?} */
    BingPolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    BingPolygon.prototype._tooltipVisible;
    /** @type {?} */
    BingPolygon.prototype._mouseOverListener;
    /** @type {?} */
    BingPolygon.prototype._mouseMoveListener;
    /** @type {?} */
    BingPolygon.prototype._mouseOutListener;
    /** @type {?} */
    BingPolygon.prototype._metadata;
    /** @type {?} */
    BingPolygon.prototype._originalPath;
    /** @type {?} */
    BingPolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    BingPolygon.prototype._polygon;
    /** @type {?} */
    BingPolygon.prototype._mapService;
    /** @type {?} */
    BingPolygon.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9iaW5nL2JpbmctcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBTzVDLE1BQU0sa0JBQW1CLFNBQVEsT0FBTzs7Ozs7Ozs7SUFzSHBDLFlBQ1ksVUFDRSxXQUEyQixFQUMzQixNQUE0QjtRQUV0QyxLQUFLLEVBQUUsQ0FBQztRQUpBLGFBQVEsR0FBUixRQUFRO1FBQ04sZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQXNCO29CQXBIUCxJQUFJOzJCQUNSLEtBQUs7c0JBQ1gsRUFBRTt3QkFDQSxDQUFDLENBQUM7d0JBQ0YsQ0FBQyxDQUFDOzBCQUNDLEtBQUs7NEJBQ0gsS0FBSztzQkFDTixJQUFJO3dCQUNGLElBQUk7bUNBQ0UsS0FBSzsrQkFDVCxLQUFLO3lCQUlGLElBQUksR0FBRyxFQUFlO1FBeUd4RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3hDOzs7Ozs7OztRQTdGVSxZQUFZLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O1FBQzlDLFlBQVksQ0FBQyxHQUFXO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7Ozs7O1FBU1osWUFBWSxLQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxD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QUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzlGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUFFO2dCQUM5RixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2FBQ3BDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUN4QjtTQUNKOztDQUdSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlnb25FdmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tZXZlbnQnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9wb2x5Z29uJztcclxuaW1wb3J0IHsgQmluZ01hcExhYmVsIH0gZnJvbSAnLi9iaW5nLWxhYmVsJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBmb3IgYSBwb2x5Z29uIG1vZGVsIGZvciBCaW5nIE1hcHMgVjguXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nUG9seWdvbiBleHRlbmRzIFBvbHlnb24gaW1wbGVtZW50cyBQb2x5Z29uIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfbWFwOiBNaWNyb3NvZnQuTWFwcy5NYXAgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfaXNFZGl0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfbWF4Wm9vbTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9taW5ab29tOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX3Nob3dMYWJlbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfc2hvd1Rvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2xhYmVsOiBCaW5nTWFwTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogQmluZ01hcExhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2hhc1Rvb2xUaXBSZWNlaXZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX21vdXNlT3Zlckxpc3RlbmVyOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xyXG4gICAgcHJpdmF0ZSBfbW91c2VNb3ZlTGlzdGVuZXI6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICBwcml2YXRlIF9tb3VzZU91dExpc3RlbmVyOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xyXG4gICAgcHJpdmF0ZSBfbWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG4gICAgcHJpdmF0ZSBfb3JpZ2luYWxQYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+O1xyXG4gICAgcHJpdmF0ZSBfZWRpdGluZ0NvbXBsZXRlRW1pdHRlcjogKGV2ZW50OiBJUG9seWdvbkV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTGFiZWxNYXhab29tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXhab29tOyB9XHJcbiAgICBwdWJsaWMgc2V0IExhYmVsTWF4Wm9vbSh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX21heFpvb20gPSB2YWw7XHJcbiAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IExhYmVsTWluWm9vbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWluWm9vbTsgfVxyXG4gICAgcHVibGljIHNldCBMYWJlbE1pblpvb20odmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9taW5ab29tID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBwb2x5Z29uLCBpbiB0aGlzIGNhc2Uge0BsaW5rIE1pY3Jvc29mdC5NYXBzLlBvbHlnb259XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uIHsgcmV0dXJuIHRoaXMuX3BvbHlnb247IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIGxhYmVsXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFNob3dMYWJlbCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dMYWJlbDsgfVxyXG4gICAgcHVibGljIHNldCBTaG93TGFiZWwodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvd0xhYmVsID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICogQHByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgU2hvd1Rvb2x0aXAoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93VG9vbHRpcDsgfVxyXG4gICAgcHVibGljIHNldCBTaG93VG9vbHRpcCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zaG93VG9vbHRpcCA9IHZhbDtcclxuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGl0bGUgb2ZmIHRoZSBwb2x5Z29uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqIEBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90aXRsZTsgfVxyXG4gICAgcHVibGljIHNldCBUaXRsZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBjb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdQb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIF9wb2x5Z29uIC0gVGhlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29ufSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSBJbnN0YW5jZSBvZiB0aGUgTWFwIFNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyIC0gVGhlIGNvbnRleHQgbGF5ZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfcG9seWdvbjogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbixcclxuICAgICAgICBwcm90ZWN0ZWQgX21hcFNlcnZpY2U6IEJpbmdNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBfbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkxheWVyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IHRoaXMuR2V0UGF0aHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBkZWxlZ2F0ZSBmb3IgYW4gZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxyXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcblxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkRXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdkcmFnJywgJ2RyYWdlbmQnLCAnZHJhZ3N0YXJ0JywgJ21vdXNlZG93bicsICdtb3VzZW91dCcsICdtb3VzZW92ZXInLCAnbW91c2V1cCddO1xyXG4gICAgICAgIGlmIChzdXBwb3J0ZWRFdmVudHMuaW5kZXhPZihldmVudFR5cGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9wb2x5Z29uLCBldmVudFR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmbihlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGVySWQ6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlnb24sICdtb3VzZW92ZXInLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJJZCA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX21hcCwgJ21vdXNlbW92ZScsIG0gPT4gZm4obSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcG9seWdvbiwgJ21vdXNlb3V0JywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcklkKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKGhhbmRsZXJJZCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBpZiAoZXZlbnRUeXBlID09PSAncGF0aGNoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIgPSA8KGV2ZW50OiBJUG9seWdvbkV2ZW50KSA9PiB2b2lkPmZuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZWQgdGhlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyKSB7IHRoaXMuX2xheWVyLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTsgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuZW50aXRpZXMucmVtb3ZlKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuRGVsZXRlKCk7IH1cclxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkgeyB0aGlzLl90b29sdGlwLkRlbGV0ZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2dhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgLy8vIFNlZSBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL1xyXG4gICAgICAgIC8vLyAgICAgN2FhYWU3NDgtNGQ1Zi00YmU1LWE3YmItOTA0OThlMDhiNDFjL2hvdy1jYW4taS1tYWtlLXBvbHlnb25wb2x5bGluZS1kcmFnZ2FibGUtaW4tYmluZy1tYXBzLTg/XHJcbiAgICAgICAgLy8vICAgICBmb3J1bT1iaW5nbWFwc1xyXG4gICAgICAgIC8vLyBmb3IgYSBwb3NzaWJsZSBhcHByb2FjaCB0byBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgbW9kZWwuXHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIHBhdGggY2FuIGJlIGVkaXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RWRpdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRWRpdGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWdvbiBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UGF0aCgpOiBBcnJheTxJTGF0TG9uZz4ge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IHRoaXMuX3BvbHlnb24uZ2V0TG9jYXRpb25zKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xyXG4gICAgICAgIHAuZm9yRWFjaChsID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiBsLmxhdGl0dWRlLCBsb25naXR1ZGU6IGwubG9uZ2l0dWRlIH0pKTtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyBtdWx0aXBsZSBwb2x5Z29uIHBhdGhzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UGF0aHMoKTogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IHRoaXMuX3BvbHlnb24uZ2V0UmluZ3MoKTtcclxuICAgICAgICBjb25zdCBwYXRoczogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IG5ldyBBcnJheTxBcnJheTxJTGF0TG9uZz4+KCk7XHJcbiAgICAgICAgcC5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XHJcbiAgICAgICAgICAgIHguZm9yRWFjaCh5ID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiB5LmxhdGl0dWRlLCBsb25naXR1ZGU6IHkubG9uZ2l0dWRlIH0pKTtcclxuICAgICAgICAgICAgcGF0aHMucHVzaChwYXRoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcGF0aHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgdmlzaWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlnb24gaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbi5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFrZSB0aGUgcG9seWdvbiBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgLy8vIFNlZSBodHRwczovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL1xyXG4gICAgICAgIC8vLyAgICAgN2FhYWU3NDgtNGQ1Zi00YmU1LWE3YmItOTA0OThlMDhiNDFjL2hvdy1jYW4taS1tYWtlLXBvbHlnb25wb2x5bGluZS1kcmFnZ2FibGUtaW4tYmluZy1tYXBzLThcclxuICAgICAgICAvLyAgICAgID9mb3J1bT1iaW5nbWFwc1xyXG4gICAgICAgIC8vLyBmb3IgYSBwb3NzaWJsZSBhcHByb2FjaCB0byBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgbW9kZWwuXHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignVGhlIGJpbmcgbWFwcyBpbXBsZW1lbnRhdGlvbiBjdXJyZW50bHkgZG9lcyBub3Qgc3VwcG9ydCBkcmFnZ2FibGUgcG9seWdvbnMuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBpcyBlZGl0YWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWRpdGFibGUgLSBUcnVlIHRvIG1ha2UgcG9seWdvbiBwYXRoIGVkaXRhYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRoaXMuX2lzRWRpdGFibGUgIT09IGVkaXRhYmxlO1xyXG4gICAgICAgIHRoaXMuX2lzRWRpdGFibGUgPSBlZGl0YWJsZTtcclxuICAgICAgICBpZiAoIWlzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNFZGl0YWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0RHJhd2luZ1Rvb2xzKCkudGhlbih0ID0+IHtcclxuICAgICAgICAgICAgICAgIHQuZWRpdCh0aGlzLl9wb2x5Z29uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldERyYXdpbmdUb29scygpLnRoZW4odCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0LmZpbmlzaCgoZWRpdGVkUG9seWdvbjogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlZGl0ZWRQb2x5Z29uICE9PSB0aGlzLl9wb2x5Z29uIHx8ICF0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IHRoaXMuR2V0UGF0aHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFBhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLl9vcmlnaW5hbFBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TZXRQYXRocyhuZXdQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIHRoZSBuZXcgcGF0aCB0byBwZXJzaXN0IGl0IGFwcGVhcnMuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENsaWNrOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb2x5Z29uOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPcmlnaW5hbFBhdGg6IG9yaWdpbmFsUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmV3UGF0aDogbmV3UGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gVGhlIG9wdGlvbnMgYXJlIG1lcmdlZCB3aXRoIGh0ZSBvbmVzXHJcbiAgICAgKiBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5Z29uT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldE9wdGlvbnMobyk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudmlzaWJsZSAhPSBudWxsICYmIHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl9sYWJlbCkgeyB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICFvcHRpb25zLnZpc2libGUpOyB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lZGl0YWJsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRFZGl0YWJsZShvcHRpb25zLmVkaXRhYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhdGggLSBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKTtcclxuICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBwLnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IFtwYXRoXTtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldExvY2F0aW9ucyhwKTtcclxuICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIHBhdGggb3IgcGF0aHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhdGhzXHJcbiAgICAgKiBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGgocykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRQYXRocyhwYXRoczogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChwYXRocyA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXRocykpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFJpbmdzKG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwuRGVsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoc1swXSkpIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9yIGFycmF5c1xyXG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gbmV3IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4oKTtcclxuICAgICAgICAgICAgKDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzKS5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgX3A6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKTtcclxuICAgICAgICAgICAgICAgIHBhdGguZm9yRWFjaCh4ID0+IF9wLnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xyXG4gICAgICAgICAgICAgICAgcC5wdXNoKF9wKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzO1xyXG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFJpbmdzKHApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGEgc2ltcGxlIGFycmF5Li4uLlxyXG4gICAgICAgICAgICB0aGlzLlNldFBhdGgoPEFycmF5PElMYXRMb25nPj5wYXRocyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWdvbiB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldE9wdGlvbnMoPE1pY3Jvc29mdC5NYXBzLklQb2x5Z29uT3B0aW9ucz57IHZpc2libGU6IHZpc2libGUgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl9sYWJlbCkgeyB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICF2aXNpYmxlKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmVzIHRoZSBsYWJlbCBmb3IgdGhlIHBvbHlnb25cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTWFuYWdlTGFiZWwoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuR2V0UGF0aCA9PSBudWxsIHx8IHRoaXMuR2V0UGF0aCgpLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAodGhpcy5fc2hvd0xhYmVsICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24odGhpcy5DZW50cm9pZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKG8ucG9zaXRpb24gPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21pblpvb20gIT09IC0xKSB7IG8ubWluWm9vbSA9IHRoaXMuX21pblpvb207IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21heFpvb20gIT09IC0xKSB7IG8ubWF4Wm9vbSA9IHRoaXMuX21heFpvb207IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbmV3IEJpbmdNYXBMYWJlbChvKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldE1hcCh0aGlzLl9tYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwuU2V0VmFsdWVzKG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldCgnaGlkZGVuJywgIXRoaXMuR2V0VmlzaWJsZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwuU2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlcyB0aGUgdG9vbHRpcCBmb3IgdGhlIHBvbHlnb25cclxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvd1Rvb2x0aXAgJiYgdGhpcy5fdGl0bGUgIT0gbnVsbCAmJiB0aGlzLl90aXRsZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX3RpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KDAsIDI1KSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2Jpc3F1ZScsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbmV3IEJpbmdNYXBMYWJlbChvKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0TWFwKHRoaXMuX21hcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldFZhbHVlcyhvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VPdmVyTGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb2x5Z29uLCAnbW91c2VvdmVyJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBlLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lciA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLCAnbW91c2Vtb3ZlJywgKG06IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSAmJiBtLmxvY2F0aW9uICYmIG0ucHJpbWl0aXZlID09PSB0aGlzLl9wb2x5Z29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIG0ubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VPdXRMaXN0ZW5lciA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb24sICdtb3VzZW91dCcsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lcik7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCghdGhpcy5fc2hvd1Rvb2x0aXAgfHwgdGhpcy5fdGl0bGUgPT09ICcnIHx8IHRoaXMuX3RpdGxlID09IG51bGwpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU91dExpc3RlbmVyKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX21vdXNlT3V0TGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpOyB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19