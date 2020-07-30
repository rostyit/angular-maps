/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
import { Polyline } from '../models/polyline';
/** *
 * internal counter to use as ids for polylines.
  @type {?} */
var layerId = 1000000;
/**
 * MapPolylineLayerDirective performantly renders a large set of polyline on a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *   .map-container {
 *     height: 300px;
 *   }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polyline-layer [PolygonOptions]="_polyline"></x-map-polyline-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapPolylineLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolylineLayerDirective.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     * @memberof MapPolylineLayerDirective
     */
    function MapPolylineLayerDirective(_layerService, _mapService, _zone) {
        this._layerService = _layerService;
        this._mapService = _mapService;
        this._zone = _zone;
        this._labels = new Array();
        this._tooltipSubscriptions = new Array();
        this._tooltipVisible = false;
        this._defaultOptions = {
            fontSize: 11,
            fontFamily: 'sans-serif',
            strokeWeight: 2,
            strokeColor: '#000000',
            fontColor: '#ffffff'
        };
        this._streaming = false;
        this._polylines = new Array();
        this._polylinesLast = new Array();
        /**
         * Set the maximum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolylineLayerDirective
         */
        this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
        /**
         * Set the minimum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolylineLayerDirective
         */
        this.LabelMinZoom = -1;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Whether to show the polylines titles as the labels on the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ShowLabels = false;
        /**
         * Whether to show the titles of the polylines as the tooltips on the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ShowTooltips = true;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ZIndex = 0;
        /**
         * This event emitter gets emitted when the user clicks a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineDblClick = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseMove = new EventEmitter();
        /**
         * This event is fired on mouseout on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseOut = new EventEmitter();
        /**
         * This event is fired on mouseover on a polyline in a layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseOver = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapPolylineLayerDirective.prototype, "PolylineOptions", {
        /**
         * An array of polyline options representing the polylines in the layer.
         *
         * @memberof MapPolylineLayerDirective
         */
        get: /**
         * An array of polyline options representing the polylines in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._polylines; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._polylinesLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._polylines).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._polylines = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineLayerDirective.prototype, "TreatNewPolylineOptionsAsStream", {
        /**
         * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
         *
         * @memberof MapPolylineLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._streaming; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._streaming = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the polyline layer.
         *
         * \@readonly
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(function () {
            /** @type {?} */
            var fakeLayerDirective = {
                Id: _this._id,
                Visible: _this.Visible,
                LayerOffset: _this.LayerOffset,
                ZIndex: _this.ZIndex
            };
            _this._layerService.AddLayer(fakeLayerDirective);
            _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
            Promise.all([
                _this._layerPromise,
                _this._mapService.CreateCanvasOverlay(function (el) { return _this.DrawLabels(el); })
            ]).then(function (values) {
                values[0].SetVisible(_this.Visible);
                _this._canvas = values[1];
                _this._canvas._canvasReady.then(function (b) {
                    _this._tooltip = _this._canvas.GetToolTipOverlay();
                    _this.ManageTooltip(_this.ShowTooltips);
                });
                if (_this.PolylineOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdatePolylines(); });
                }
            });
            _this._service = _this._layerService;
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    function () {
        this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._layerPromise.then(function (l) {
            l.Delete();
        });
        if (this._canvas) {
            this._canvas.Delete();
        }
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['PolylineOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdatePolylines();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
        }
        if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
            (changes['LayerOffset'] && !changes['LayerOffset'].firstChange)) {
            throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
        }
        if ((changes['ShowLabels'] && !changes['ShowLabels'].firstChange) ||
            (changes['LabelMinZoom'] && !changes['LabelMinZoom'].firstChange) ||
            (changes['LabelMaxZoom'] && !changes['LabelMaxZoom'].firstChange)) {
            if (this._canvas) {
                this._canvas.Redraw(true);
            }
        }
        if (changes['ShowTooltips'] && this._tooltip) {
            this.ManageTooltip(changes['ShowTooltips'].currentValue);
        }
    };
    /**
     * Obtains a string representation of the Layer Id.
     * \@memberof MapPolylineLayerDirective
     * @return {?} - string representation of the layer id.
     */
    MapPolylineLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Layer Id.
     * \@memberof MapPolylineLayerDirective
     * @return {?} - string representation of the layer id.
     */
    function () { return 'MapPolylineLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} p - the polyline for which to add the event.
     *
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} p - the polyline for which to add the event.
     *
     * @return {?}
     */
    function (p) {
        var _this = this;
        /** @type {?} */
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.PolylineClick.emit({ Polyline: p, Click: ev }); } },
            { name: 'dblclick', handler: function (ev) { return _this.PolylineDblClick.emit({ Polyline: p, Click: ev }); } },
            { name: 'mousemove', handler: function (ev) { return _this.PolylineMouseMove.emit({ Polyline: p, Click: ev }); } },
            { name: 'mouseout', handler: function (ev) { return _this.PolylineMouseOut.emit({ Polyline: p, Click: ev }); } },
            { name: 'mouseover', handler: function (ev) { return _this.PolylineMouseOver.emit({ Polyline: p, Click: ev }); } }
        ];
        handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
    };
    /**
     * Draws the polyline labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.DrawLabels = /**
     * Draws the polyline labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    function (el) {
        var _this = this;
        if (this.ShowLabels) {
            this._mapService.GetZoom().then(function (z) {
                if (_this.LabelMinZoom <= z && _this.LabelMaxZoom >= z) {
                    /** @type {?} */
                    var ctx_1 = el.getContext('2d');
                    /** @type {?} */
                    var labels_1 = _this._labels.map(function (x) { return x.title; });
                    _this._mapService.LocationsToPoints(_this._labels.map(function (x) { return x.loc; })).then(function (locs) {
                        /** @type {?} */
                        var size = _this._mapService.MapSize;
                        for (var i = 0, len = locs.length; i < len; i++) {
                            // Don't draw the point if it is not in view. This greatly improves performance when zoomed in.
                            if (locs[i].x >= 0 && locs[i].y >= 0 && locs[i].x <= size.width && locs[i].y <= size.height) {
                                _this.DrawText(ctx_1, locs[i], labels_1[i]);
                            }
                        }
                    });
                }
            });
        }
    };
    /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.DrawText = /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    function (ctx, loc, text) {
        /** @type {?} */
        var lo = this.LabelOptions;
        if (lo == null && this._tooltip) {
            lo = this._tooltip.DefaultLabelStyle;
        }
        if (lo == null) {
            lo = this._defaultOptions;
        }
        ctx.strokeStyle = lo.strokeColor;
        ctx.font = lo.fontSize + "px " + lo.fontFamily;
        ctx.textAlign = 'center';
        /** @type {?} */
        var strokeWeight = lo.strokeWeight;
        if (text && strokeWeight && strokeWeight > 0) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(text, loc.x, loc.y);
        }
        ctx.fillStyle = lo.fontColor;
        ctx.fillText(text, loc.x, loc.y);
    };
    /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ManageTooltip = /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    function (show) {
        var _this = this;
        if (show && this._canvas) {
            // add tooltip subscriptions
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
            this._tooltipSubscriptions.push(this.PolylineMouseMove.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('position', loc);
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOver.asObservable().subscribe(function (e) {
                if (e.Polyline.Title && e.Polyline.Title.length > 0) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('text', e.Polyline.Title);
                    _this._tooltip.Set('position', loc);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOut.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    _this._tooltip.Set('hidden', true);
                    _this._tooltipVisible = false;
                }
            }));
        }
        else {
            // remove tooltip subscriptions
            this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
            this._tooltipSubscriptions.splice(0);
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
        }
    };
    /**
     * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
     * and register the associated events.
     *
     * \@memberof MapPolylineLayerDirective
     * \@method
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.UpdatePolylines = /**
     * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
     * and register the associated events.
     *
     * \@memberof MapPolylineLayerDirective
     * \@method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(function (l) {
            /** @type {?} */
            var polylines = _this._streaming ? _this._polylinesLast.splice(0) : _this._polylines;
            if (!_this._streaming) {
                _this._labels.splice(0);
            }
            /** @type {?} */
            var lp = _this._service.CreatePolylines(l.GetOptions().id, polylines);
            // set polylines once promises are fullfilled.
            lp.then(function (p) {
                /** @type {?} */
                var y = new Array();
                p.forEach(function (poly) {
                    if (Array.isArray(poly)) {
                        /** @type {?} */
                        var title_1 = '';
                        /** @type {?} */
                        var centroids_1 = new Array();
                        poly.forEach(function (x) {
                            y.push(x);
                            _this.AddEventListeners(x);
                            centroids_1.push(x.Centroid);
                            if (x.Title != null && x.Title.length > 0 && title_1.length === 0) {
                                title_1 = x.Title;
                            }
                        });
                        _this._labels.push({ loc: Polyline.GetPolylineCentroid(centroids_1), title: title_1 });
                    }
                    else {
                        y.push(poly);
                        if (poly.Title != null && poly.Title.length > 0) {
                            _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                        }
                        _this.AddEventListeners(poly);
                    }
                });
                _this._streaming ? l.AddEntities(y) : l.SetEntities(y);
                if (_this._canvas) {
                    _this._canvas.Redraw(!_this._streaming);
                }
            });
        });
    };
    MapPolylineLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polyline-layer'
                },] },
    ];
    /** @nocollapse */
    MapPolylineLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapPolylineLayerDirective.propDecorators = {
        LabelMaxZoom: [{ type: Input }],
        LabelMinZoom: [{ type: Input }],
        LabelOptions: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        PolylineOptions: [{ type: Input }],
        ShowLabels: [{ type: Input }],
        ShowTooltips: [{ type: Input }],
        TreatNewPolylineOptionsAsStream: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        PolylineClick: [{ type: Output }],
        PolylineDblClick: [{ type: Output }],
        PolylineMouseMove: [{ type: Output }],
        PolylineMouseOut: [{ type: Output }],
        PolylineMouseOver: [{ type: Output }]
    };
    return MapPolylineLayerDirective;
}());
export { MapPolylineLayerDirective };
if (false) {
    /** @type {?} */
    MapPolylineLayerDirective.prototype._id;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._service;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._canvas;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._labels;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltip;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltipSubscriptions;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltipVisible;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._defaultOptions;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._streaming;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._polylines;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._polylinesLast;
    /**
     * Set the maximum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelMinZoom;
    /**
     * Sepcifies styleing options for on-map polyline labels.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelOptions;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LayerOffset;
    /**
     * Whether to show the polylines titles as the labels on the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ShowLabels;
    /**
     * Whether to show the titles of the polylines as the tooltips on the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ShowTooltips;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ZIndex;
    /**
     * This event emitter gets emitted when the user clicks a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineClick;
    /**
     * This event is fired when the DOM dblclick event is fired on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineDblClick;
    /**
     * This event is fired when the DOM mousemove event is fired on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseMove;
    /**
     * This event is fired on mouseout on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseOut;
    /**
     * This event is fired on mouseover on a polyline in a layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseOver;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._layerService;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._mapService;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlsaW5lLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBZ0IsS0FBSyxFQUFFLE1BQU0sRUFDdEMsWUFBWSxFQUFvRCxNQUFNLEVBRXpFLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBTzlDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNExsQixHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCxtQ0FDWSxlQUNBLGFBQ0E7UUFGQSxrQkFBYSxHQUFiLGFBQWE7UUFDYixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSzt1QkFuS3dDLElBQUksS0FBSyxFQUFrQztxQ0FFL0MsSUFBSSxLQUFLLEVBQWdCOytCQUMzQyxLQUFLOytCQUNDO1lBQ3JDLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLFlBQVk7WUFDeEIsWUFBWSxFQUFFLENBQUM7WUFDZixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsU0FBUztTQUN2QjswQkFDNkIsS0FBSzswQkFDVyxJQUFJLEtBQUssRUFBb0I7OEJBQ3pCLElBQUksS0FBSyxFQUFvQjs7Ozs7NEJBTXhDLE1BQU0sQ0FBQyxnQkFBZ0I7Ozs7OzRCQU12QixDQUFDLENBQUM7Ozs7OzsyQkFjSCxJQUFJOzs7Ozs7MEJBd0JKLEtBQUs7Ozs7Ozs0QkFPSCxJQUFJOzs7Ozs7c0JBd0JY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LENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQUU7YUFDL0QsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOzs7Z0JBOWFWLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNuQzs7OztnQkF2Q1EsWUFBWTtnQkFDWixVQUFVO2dCQVppRCxNQUFNOzs7K0JBK0VyRSxLQUFLOytCQU1MLEtBQUs7K0JBT0wsS0FBSzs4QkFPTCxLQUFLO2tDQU9MLEtBQUs7NkJBaUJMLEtBQUs7K0JBT0wsS0FBSztrREFRTCxLQUFLOzBCQVNMLEtBQUs7eUJBT0wsS0FBSztnQ0FXTCxNQUFNO21DQU9OLE1BQU07b0NBT04sTUFBTTttQ0FPTixNQUFNO29DQU9OLE1BQU07O29DQW5NWDs7U0FxRGEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSwgU2ltcGxlQ2hhbmdlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyxcclxuICAgIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmUsXHJcbiAgICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElTaXplIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc2l6ZSc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2x5bGluZUV2ZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtZXZlbnQnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhYmVsT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhYmVsLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCB7IE1hcExhYmVsIH0gZnJvbSAnLi4vbW9kZWxzL21hcC1sYWJlbCc7XHJcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xyXG5cclxuLyoqXHJcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgcG9seWxpbmVzLlxyXG4gKi9cclxubGV0IGxheWVySWQgPSAxMDAwMDAwO1xyXG5cclxuLyoqXHJcbiAqIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmUgcGVyZm9ybWFudGx5IHJlbmRlcnMgYSBsYXJnZSBzZXQgb2YgcG9seWxpbmUgb24gYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50fSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgLm1hcC1jb250YWluZXIge1xyXG4gKiAgICAgaGVpZ2h0OiAzMDBweDtcclxuICogICB9XHJcbiAqIGBdLFxyXG4gKiB0ZW1wbGF0ZTogYFxyXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPHgtbWFwLXBvbHlsaW5lLWxheWVyIFtQb2x5Z29uT3B0aW9uc109XCJfcG9seWxpbmVcIj48L3gtbWFwLXBvbHlsaW5lLWxheWVyPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcC1wb2x5bGluZS1sYXllcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2lkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sYXllclByb21pc2U6IFByb21pc2U8TGF5ZXI+O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTGF5ZXJTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfY2FudmFzOiBDYW52YXNPdmVybGF5O1xyXG4gICAgcHJpdmF0ZSBfbGFiZWxzOiBBcnJheTx7bG9jOiBJTGF0TG9uZywgdGl0bGU6IHN0cmluZ30+ID0gbmV3IEFycmF5PHtsb2M6IElMYXRMb25nLCB0aXRsZTogc3RyaW5nfT4oKTtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA6IE1hcExhYmVsO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFN1YnNjcmlwdGlvbnM6IEFycmF5PFN1YnNjcmlwdGlvbj4gPSBuZXcgQXJyYXk8U3Vic2NyaXB0aW9uPigpO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBJTGFiZWxPcHRpb25zID0ge1xyXG4gICAgICAgIGZvbnRTaXplOiAxMSxcclxuICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXHJcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiAyLFxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgZm9udENvbG9yOiAnI2ZmZmZmZidcclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9zdHJlYW1pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3BvbHlsaW5lczogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4gPSBuZXcgQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4oKTtcclxuICAgIHByaXZhdGUgX3BvbHlsaW5lc0xhc3Q6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+ID0gbmV3IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWxpbmUgbGFiZWxzIGFyZSB2aXNpYmxlLiBJZ25vcmVkIGlmIFNob3dMYWJlbCBpcyBmYWxzZS5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1heFpvb206IG51bWJlciA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIHBvbHlsaW5lIGxhYmVscyBhcmUgdmlzaWJsZS4gSWdub3JlZCBpZiBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNaW5ab29tOiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlcGNpZmllcyBzdHlsZWluZyBvcHRpb25zIGZvciBvbi1tYXAgcG9seWxpbmUgbGFiZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE9wdGlvbnM6IElMYWJlbE9wdGlvbnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgQW4gb2Zmc2V0IGFwcGxpZWQgdG8gdGhlIHBvc2l0aW9uaW5nIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGF5ZXJPZmZzZXQ6IElQb2ludCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBvZiBwb2x5bGluZSBvcHRpb25zIHJlcHJlc2VudGluZyB0aGUgcG9seWxpbmVzIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgUG9seWxpbmVPcHRpb25zKCk6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+IHsgcmV0dXJuIHRoaXMuX3BvbHlsaW5lczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgUG9seWxpbmVPcHRpb25zKHZhbDogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0cmVhbWluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVzTGFzdC5wdXNoKC4uLnZhbC5zbGljZSgwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMucHVzaCguLi52YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVzID0gdmFsLnNsaWNlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBwb2x5bGluZXMgdGl0bGVzIGFzIHRoZSBsYWJlbHMgb24gdGhlIHBvbHlsaW5lcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgU2hvd0xhYmVsczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSB0aXRsZXMgb2YgdGhlIHBvbHlsaW5lcyBhcyB0aGUgdG9vbHRpcHMgb24gdGhlIHBvbHlsaW5lcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgU2hvd1Rvb2x0aXBzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgd2hldGhlciB0byB0cmVhdCBjaGFuZ2VzIGluIHRoZSBQb2x5bGluZU9wdGlvbnMgYXMgc3RyZWFtcyBvZiBuZXcgbWFya2Vycy4gSW4gdGhpcyBtb2RlLCBjaGFuZ2luZyB0aGVcclxuICAgICAqIEFycmF5IHN1cHBsaWVkIGluIFBvbHlsaW5lT3B0aW9ucyB3aWxsIGJlIGluY3JlbWVudGFsbHkgZHJhd24gb24gdGhlIG1hcCBhcyBvcHBvc2VkIHRvIHJlcGxhY2UgdGhlIHBvbHlsaW5lcyBvbiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBUcmVhdE5ld1BvbHlsaW5lT3B0aW9uc0FzU3RyZWFtKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RyZWFtaW5nOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBUcmVhdE5ld1BvbHlsaW5lT3B0aW9uc0FzU3RyZWFtKHZhbDogYm9vbGVhbikgeyB0aGlzLl9zdHJlYW1pbmcgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1hcmtlciBsYXllclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB6LWluZGV4IG9mIHRoZSBsYXllci4gSWYgbm90IHVzZWQsIGxheWVycyBnZXQgc3RhY2tlZCBpbiB0aGUgb3JkZXIgY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgWkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIERlbGVnYXRlc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgcG9seWxpbmUgaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgUG9seWxpbmVDbGljazogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiBhIHBvbHlsaW5lIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgUG9seWxpbmVEYmxDbGljazogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gYSBwb2x5bGluZSBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFBvbHlsaW5lTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gbW91c2VvdXQgb24gYSBwb2x5bGluZSBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFBvbHlsaW5lTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBtb3VzZW92ZXIgb24gYSBwb2x5bGluZSBpbiBhIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5bGluZU1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XHJcblxyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgaWQgb2YgdGhlIHBvbHlsaW5lIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmUuXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBMYXllclNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcFNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE5nWm9uZX0gc2VydmljZS5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBsYXllcklkKys7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIENvbXBvbmVudCBjb250ZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgbGF5ZXJPcHRpb25zOiBJTGF5ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5faWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmYWtlTGF5ZXJEaXJlY3RpdmU6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIElkIDogdGhpcy5faWQsXHJcbiAgICAgICAgICAgICAgICBWaXNpYmxlOiB0aGlzLlZpc2libGUsXHJcbiAgICAgICAgICAgICAgICBMYXllck9mZnNldDogdGhpcy5MYXllck9mZnNldCxcclxuICAgICAgICAgICAgICAgIFpJbmRleDogdGhpcy5aSW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkFkZExheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xyXG5cclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUNhbnZhc092ZXJsYXkoZWwgPT4gdGhpcy5EcmF3TGFiZWxzKGVsKSlcclxuICAgICAgICAgICAgICAgIF0pLnRoZW4odmFsdWVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbMF0uU2V0VmlzaWJsZSh0aGlzLlZpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcyA9IHZhbHVlc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuX2NhbnZhc1JlYWR5LnRoZW4oYiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0aGlzLl9jYW52YXMuR2V0VG9vbFRpcE92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKHRoaXMuU2hvd1Rvb2x0aXBzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Qb2x5bGluZU9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLlVwZGF0ZVBvbHlsaW5lcygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IHRoaXMuX2xheWVyU2VydmljZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgIGwuRGVsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcykgeyB0aGlzLl9jYW52YXMuRGVsZXRlKCk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyB0byBjaGFuZ2VzIGluIGRhdGEtYm91bmQgcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50IGFuZCBhY3R1YXRlcyBwcm9wZXJ0eSBjaGFuZ2VzIGluIHRoZSB1bmRlcmxpbmcgbGF5ZXIgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBjb2xsZWN0aW9uIG9mIGNoYW5nZXMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydQb2x5bGluZU9wdGlvbnMnXSkge1xyXG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlUG9seWxpbmVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddICYmICFjaGFuZ2VzWydWaXNpYmxlJ10uZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiBsLlNldFZpc2libGUodGhpcy5WaXNpYmxlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY2hhbmdlc1snWkluZGV4J10gJiYgIWNoYW5nZXNbJ1pJbmRleCddLmZpcnN0Q2hhbmdlKSB8fFxyXG4gICAgICAgICAgICAoY2hhbmdlc1snTGF5ZXJPZmZzZXQnXSAmJiAhY2hhbmdlc1snTGF5ZXJPZmZzZXQnXS5maXJzdENoYW5nZSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignWW91IGNhbm5vdCBjaGFuZ2UgWkluZGV4IG9yIExheWVyT2Zmc2V0IGFmdGVyIHRoZSBsYXllciBoYXMgYmVlbiBjcmVhdGVkLicpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjaGFuZ2VzWydTaG93TGFiZWxzJ10gJiYgIWNoYW5nZXNbJ1Nob3dMYWJlbHMnXS5maXJzdENoYW5nZSkgfHxcclxuICAgICAgICAgICAgKGNoYW5nZXNbJ0xhYmVsTWluWm9vbSddICYmICFjaGFuZ2VzWydMYWJlbE1pblpvb20nXS5maXJzdENoYW5nZSkgfHxcclxuICAgICAgICAgICAgKGNoYW5nZXNbJ0xhYmVsTWF4Wm9vbSddICYmICFjaGFuZ2VzWydMYWJlbE1heFpvb20nXS5maXJzdENoYW5nZSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzLlJlZHJhdyh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snU2hvd1Rvb2x0aXBzJ10gJiYgdGhpcy5fdG9vbHRpcCkge1xyXG4gICAgICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoY2hhbmdlc1snU2hvd1Rvb2x0aXBzJ10uY3VycmVudFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBMYXllciBJZC5cclxuICAgICAqIEByZXR1cm5zIC0gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBsYXllciBpZC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ01hcFBvbHlsaW5lTGF5ZXItJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB2YXJpb3VzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBvbHlsaW5lcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcCAtIHRoZSBwb2x5bGluZSBmb3Igd2hpY2ggdG8gYWRkIHRoZSBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKHA6IFBvbHlsaW5lKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlsaW5lQ2xpY2suZW1pdCh7UG9seWxpbmU6IHAsIENsaWNrOiBldn0pIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlsaW5lRGJsQ2xpY2suZW1pdCh7UG9seWxpbmU6IHAsIENsaWNrOiBldn0pIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5bGluZU1vdXNlTW92ZS5lbWl0KHtQb2x5bGluZTogcCwgQ2xpY2s6IGV2fSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWxpbmVNb3VzZU91dC5lbWl0KHtQb2x5bGluZTogcCwgQ2xpY2s6IGV2fSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlsaW5lTW91c2VPdmVyLmVtaXQoe1BvbHlsaW5lOiBwLCBDbGljazogZXZ9KSB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHAuQWRkTGlzdGVuZXIob2JqLm5hbWUsIG9iai5oYW5kbGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3cyB0aGUgcG9seWxpbmUgbGFiZWxzLiBDYWxsZWQgYnkgdGhlIENhbnZhcyBvdmVybGF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbCAtIFRoZSBjYW52YXMgb24gd2hpY2ggdG8gZHJhdyB0aGUgbGFiZWxzLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBEcmF3TGFiZWxzKGVsOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLlNob3dMYWJlbHMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRab29tKCkudGhlbih6ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkxhYmVsTWluWm9vbSA8PSB6ICYmIHRoaXMuTGFiZWxNYXhab29tID49IHopIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGVsLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWxzID0gdGhpcy5fbGFiZWxzLm1hcCh4ID0+IHgudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuTG9jYXRpb25zVG9Qb2ludHModGhpcy5fbGFiZWxzLm1hcCh4ID0+IHgubG9jKSkudGhlbihsb2NzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2l6ZTogSVNpemUgPSB0aGlzLl9tYXBTZXJ2aWNlLk1hcFNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsb2NzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBkcmF3IHRoZSBwb2ludCBpZiBpdCBpcyBub3QgaW4gdmlldy4gVGhpcyBncmVhdGx5IGltcHJvdmVzIHBlcmZvcm1hbmNlIHdoZW4gem9vbWVkIGluLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY3NbaV0ueCA+PSAwICYmIGxvY3NbaV0ueSA+PSAwICYmIGxvY3NbaV0ueCA8PSBzaXplLndpZHRoICYmIGxvY3NbaV0ueSA8PSBzaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRHJhd1RleHQoY3R4LCBsb2NzW2ldLCBsYWJlbHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdzIHRoZSBsYWJlbCB0ZXh0IGF0IHRoZSBhcHByb3ByaWF0ZSBwbGFjZSBvbiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGN0eCAtIENhbnZhcyBkcmF3aW5nIGNvbnRleHQuXHJcbiAgICAgKiBAcGFyYW0gbG9jIC0gUGl4ZWwgbG9jYXRpb24gb24gdGhlIGNhbnZhcyB3aGVyZSB0byBjZW50ZXIgdGhlIHRleHQuXHJcbiAgICAgKiBAcGFyYW0gdGV4dCAtIFRleHQgdG8gZHJhdy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBEcmF3VGV4dChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgbG9jOiBJUG9pbnQsIHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBsbzogSUxhYmVsT3B0aW9ucyA9IHRoaXMuTGFiZWxPcHRpb25zO1xyXG4gICAgICAgIGlmIChsbyA9PSBudWxsICYmIHRoaXMuX3Rvb2x0aXApIHsgbG8gPSB0aGlzLl90b29sdGlwLkRlZmF1bHRMYWJlbFN0eWxlOyB9XHJcbiAgICAgICAgaWYgKGxvID09IG51bGwpIHsgbG8gPSB0aGlzLl9kZWZhdWx0T3B0aW9uczsgfVxyXG5cclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBsby5zdHJva2VDb2xvcjtcclxuICAgICAgICBjdHguZm9udCA9IGAke2xvLmZvbnRTaXplfXB4ICR7bG8uZm9udEZhbWlseX1gO1xyXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuICAgICAgICBjb25zdCBzdHJva2VXZWlnaHQ6IG51bWJlciA9IGxvLnN0cm9rZVdlaWdodDtcclxuICAgICAgICBpZiAodGV4dCAmJiBzdHJva2VXZWlnaHQgJiYgc3Ryb2tlV2VpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0cm9rZVdlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KHRleHQsIGxvYy54LCBsb2MueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBsby5mb250Q29sb3I7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIGxvYy54LCBsb2MueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYW5hZ2VzIHRoZSB0b29sdGlwIGFuZCB0aGUgYXR0YWNobWVudCBvZiB0aGUgYXNzb2NpYXRlZCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNob3cgLSBUcnVlIHRvIGVuYWJsZSB0aGUgdG9vbHRpcCwgZmFsc2UgdG8gZGlzYWJsZS5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBNYW5hZ2VUb29sdGlwKHNob3c6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2hvdyAmJiB0aGlzLl9jYW52YXMpIHtcclxuICAgICAgICAgICAgLy8gYWRkIHRvb2x0aXAgc3Vic2NyaXB0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnB1c2godGhpcy5Qb2x5bGluZU1vdXNlTW92ZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2M6IElMYXRMb25nID0gdGhpcy5fY2FudmFzLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUuQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGxvYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlsaW5lTW91c2VPdmVyLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlBvbHlsaW5lLlRpdGxlICYmIGUuUG9seWxpbmUuVGl0bGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogSUxhdExvbmcgPSB0aGlzLl9jYW52YXMuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZS5DbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3RleHQnLCBlLlBvbHlsaW5lLlRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBsb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuUG9seWxpbmVNb3VzZU91dC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRvb2x0aXAgc3Vic2NyaXB0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMuc3BsaWNlKDApO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBvciB1cGRhdGVzIHRoZSBwb2x5bGluZXNzIGJhc2VkIG9uIHRoZSBwb2x5bGluZSBvcHRpb25zLiBUaGlzIHdpbGwgcGxhY2UgdGhlIHBvbHlsaW5lcyBvbiB0aGUgbWFwXHJcbiAgICAgKiBhbmQgcmVnaXN0ZXIgdGhlIGFzc29jaWF0ZWQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgVXBkYXRlUG9seWxpbmVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXllclByb21pc2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5bGluZXM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+ID0gdGhpcy5fc3RyZWFtaW5nID8gdGhpcy5fcG9seWxpbmVzTGFzdC5zcGxpY2UoMCkgOiB0aGlzLl9wb2x5bGluZXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc3RyZWFtaW5nKSB7IHRoaXMuX2xhYmVscy5zcGxpY2UoMCk7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBwcm9taXNlIGZvciB0aGUgcG9seWxpbmVzXHJcbiAgICAgICAgICAgIGNvbnN0IGxwOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+ID0gdGhpcy5fc2VydmljZS5DcmVhdGVQb2x5bGluZXMobC5HZXRPcHRpb25zKCkuaWQsIHBvbHlsaW5lcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgcG9seWxpbmVzIG9uY2UgcHJvbWlzZXMgYXJlIGZ1bGxmaWxsZWQuXHJcbiAgICAgICAgICAgIGxwLnRoZW4ocCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5OiBBcnJheTxQb2x5bGluZT4gPSBuZXcgQXJyYXk8UG9seWxpbmU+KCk7XHJcbiAgICAgICAgICAgICAgICBwLmZvckVhY2gocG9seSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocG9seSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VudHJvaWRzOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbHkuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkucHVzaCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50cm9pZHMucHVzaCh4LkNlbnRyb2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4LlRpdGxlICE9IG51bGwgJiYgeC5UaXRsZS5sZW5ndGggPiAwICYmIHRpdGxlLmxlbmd0aCA9PT0gMCkgeyB0aXRsZSA9IHguVGl0bGU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVscy5wdXNoKHtsb2M6IFBvbHlsaW5lLkdldFBvbHlsaW5lQ2VudHJvaWQoY2VudHJvaWRzKSwgdGl0bGU6IHRpdGxlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5LnB1c2gocG9seSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2x5LlRpdGxlICE9IG51bGwgJiYgcG9seS5UaXRsZS5sZW5ndGggPiAwKSB7IHRoaXMuX2xhYmVscy5wdXNoKHtsb2M6IHBvbHkuQ2VudHJvaWQsIHRpdGxlOiBwb2x5LlRpdGxlfSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycyhwb2x5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0cmVhbWluZyA/IGwuQWRkRW50aXRpZXMoeSkgOiBsLlNldEVudGl0aWVzKHkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhbnZhcykgeyB0aGlzLl9jYW52YXMuUmVkcmF3KCF0aGlzLl9zdHJlYW1pbmcpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=