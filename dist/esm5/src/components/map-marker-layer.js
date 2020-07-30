/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { MarkerService } from '../services/marker.service';
import { LayerService } from '../services/layer.service';
import { ClusterService } from '../services/cluster.service';
import { MapService } from '../services/map.service';
import { ClusterClickAction } from '../models/cluster-click-action';
import { ClusterPlacementMode } from '../models/cluster-placement-mode';
import { ClusterLayerDirective } from './cluster-layer';
/** *
 * internal counter to use as ids for marker.
  @type {?} */
var layerId = 1000000;
/**
 * MapMarkerLayerDirective performantly renders a large set of map marker inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapMarkerDirective} from '...';
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
 *      <x-map-marker-layer [MarkerOptions]="_markers"></x-map-marker-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapMarkerLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapMarkerLayerDirective.
     * @param _markerService - Concreate implementation of a {@link MarkerService}.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _clusterService - Concreate implementation of a {@link ClusterService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     *
     * @memberof MapMarkerLayerDirective
     */
    function MapMarkerLayerDirective(_markerService, _layerService, _clusterService, _mapService, _zone) {
        this._markerService = _markerService;
        this._layerService = _layerService;
        this._clusterService = _clusterService;
        this._mapService = _mapService;
        this._zone = _zone;
        this._useDynamicSizeMarker = false;
        this._dynamicMarkerBaseSize = 18;
        this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        this._streaming = false;
        this._markers = new Array();
        this._markersLast = new Array();
        /**
         * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ClusterClickAction = ClusterClickAction.ZoomIntoCluster;
        /**
         * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ClusterPlacementMode = ClusterPlacementMode.MeanValue;
        /**
         * Determines whether the layer clusters. This property can only be set on creation of the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.EnableClustering = false;
        /**
         * Gets or sets the grid size to be used for clustering.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.GridSize = 150;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ZIndex = 0;
        /**
         * Gets or sets whether the cluster should zoom in on click
         *
         * \@readonly
         * \@memberof MapMarkerLayerDirective
         */
        this.ZoomOnClick = true;
        /**
         * This event emitter gets emitted when the dynamic icon for a marker is being created.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.DynamicMarkerCreated = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks a marker in the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.MarkerClick = new EventEmitter();
        /**
         * This event is fired when the user stops dragging a marker.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.DragEnd = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapMarkerLayerDirective.prototype, "CustomMarkerCallback", {
        /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._iconCreationCallback; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._useDynamicSizeMarker) {
                throw (new Error("You cannot set a custom marker callback when UseDynamicSizeMarkers is set to true.\n                    Set UseDynamicSizeMakers to false."));
            }
            this._iconCreationCallback = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "DynamicMarkerBaseSize", {
        /**
         * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
         * See {@link UseDynamicSizeMarkers}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
         * See {\@link UseDynamicSizeMarkers}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._dynamicMarkerBaseSize; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._dynamicMarkerBaseSize = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "DynamicMarkerRanges", {
        /**
         * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
         * The map contains key/value pairs, with the keys being
         * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {@link UseDynamicSizeMarkers}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
         * The map contains key/value pairs, with the keys being
         * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {\@link UseDynamicSizeMarkers}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._dynamicMarkerRanges; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._dynamicMarkerRanges = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "MarkerOptions", {
        /**
         *  IMarkerOptions array holding the marker info.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         *  IMarkerOptions array holding the marker info.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._markers; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._markersLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._markers).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._markers = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "Styles", {
        /**
         * Gets or sets the cluster styles
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Gets or sets the cluster styles
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._styles; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._styles = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "TreatNewMarkerOptionsAsStream", {
        /**
         * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
         * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
         * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
         *
         * \@memberof MapMarkerLayerDirective
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
    Object.defineProperty(MapMarkerLayerDirective.prototype, "UseDynamicSizeMarkers", {
        /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * @memberof MapMarkerLayerDirective
         */
        get: /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._useDynamicSizeMarker; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            this._useDynamicSizeMarker = val;
            if (val) {
                this._iconCreationCallback = function (m, info) {
                    return ClusterLayerDirective.CreateDynamicSizeMarker(m.length, info, _this._dynamicMarkerBaseSize, _this._dynamicMarkerRanges);
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapMarkerLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the marker layer.
         *
         * \@readonly
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Translates a geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    MapMarkerLayerDirective.prototype.LocationToPixel = /**
     * Translates a geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    function (loc) {
        return this._markerService.LocationToPoint(loc);
    };
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerLayerDirective
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
                Visible: _this.Visible
            };
            if (!_this.EnableClustering) {
                _this._layerService.AddLayer(fakeLayerDirective);
                _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
                _this._service = _this._layerService;
            }
            else {
                fakeLayerDirective.LayerOffset = _this.LayerOffset;
                fakeLayerDirective.ZIndex = _this.ZIndex;
                fakeLayerDirective.ClusteringEnabled = _this.EnableClustering;
                fakeLayerDirective.ClusterPlacementMode = _this.ClusterPlacementMode;
                fakeLayerDirective.GridSize = _this.GridSize;
                fakeLayerDirective.ClusterClickAction = _this.ClusterClickAction;
                fakeLayerDirective.IconInfo = _this.ClusterIconInfo;
                fakeLayerDirective.CustomMarkerCallback = _this.CustomMarkerCallback;
                fakeLayerDirective.UseDynamicSizeMarkers = _this.UseDynamicSizeMarkers;
                _this._clusterService.AddLayer(fakeLayerDirective);
                _this._layerPromise = _this._clusterService.GetNativeLayer(fakeLayerDirective);
                _this._service = _this._clusterService;
            }
            _this._layerPromise.then(function (l) {
                l.SetVisible(_this.Visible);
                if (_this.MarkerOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdateMarkers(); });
                }
            });
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    function () {
        this._layerPromise.then(function (l) {
            l.Delete();
        });
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var shouldSetOptions = false;
        /** @type {?} */
        var o = {
            id: this._id
        };
        if (changes['MarkerOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdateMarkers();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._zone.runOutsideAngular(function () {
                _this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
            });
        }
        if (changes['EnableClustering'] && !changes['EnableClustering'].firstChange) {
            if ('StopClustering' in this._service) {
                o.clusteringEnabled = this.EnableClustering;
                shouldSetOptions = true;
            }
            else {
                throw (new Error('You cannot change EnableClustering after the layer has been created.'));
            }
        }
        if (changes['ClusterPlacementMode'] && !changes['ClusterPlacementMode'].firstChange && 'StopClustering' in this._service) {
            o.placementMode = this.ClusterPlacementMode;
            shouldSetOptions = true;
        }
        if (changes['GridSize'] && !changes['GridSize'].firstChange && 'StopClustering' in this._service) {
            o.gridSize = this.GridSize;
            shouldSetOptions = true;
        }
        if (changes['ClusterClickAction'] && !changes['ClusterClickAction'].firstChange && 'StopClustering' in this._service) {
            o.zoomOnClick = this.ClusterClickAction === ClusterClickAction.ZoomIntoCluster;
            shouldSetOptions = true;
        }
        if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
            (changes['LayerOffset'] && !changes['LayerOffset'].firstChange) ||
            (changes['IconInfo'] && !changes['IconInfo'].firstChange)) {
            throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
        }
        if (shouldSetOptions) {
            this._zone.runOutsideAngular(function () {
                /** @type {?} */
                var fakeLayerDirective = { Id: _this._id };
                _this._layerPromise.then(function (l) { return l.SetOptions(o); });
            });
        }
    };
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerLayerDirective
     * @return {?} - string representation of the marker id.
     */
    MapMarkerLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerLayerDirective
     * @return {?} - string representation of the marker id.
     */
    function () { return 'MapMarkerLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} m - the marker for which to add the event.
     *
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} m - the marker for which to add the event.
     *
     * @return {?}
     */
    function (m) {
        var _this = this;
        m.AddListener('click', function (e) { return _this.MarkerClick.emit({
            Marker: m,
            Click: e,
            Location: _this._markerService.GetCoordinatesFromClick(e),
            Pixels: _this._markerService.GetPixelsFromClick(e)
        }); });
        m.AddListener('dragend', function (e) { return _this.DragEnd.emit({
            Marker: m,
            Click: e,
            Location: _this._markerService.GetCoordinatesFromClick(e),
            Pixels: _this._markerService.GetPixelsFromClick(e)
        }); });
    };
    /**
     * Sets or updates the markers based on the marker options. This will place the markers on the map
     * and register the associated events.
     *
     * \@memberof MapMarkerLayerDirective
     * \@method
     * @return {?}
     */
    MapMarkerLayerDirective.prototype.UpdateMarkers = /**
     * Sets or updates the markers based on the marker options. This will place the markers on the map
     * and register the associated events.
     *
     * \@memberof MapMarkerLayerDirective
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
            var markers = _this._streaming ? _this._markersLast.splice(0) : _this._markers;
            /** @type {?} */
            var mp = _this._service.CreateMarkers(markers, _this.IconInfo);
            // set markers once promises are fullfilled.
            mp.then(function (m) {
                m.forEach(function (marker) {
                    _this.AddEventListeners(marker);
                });
                _this._streaming ? l.AddEntities(m) : l.SetEntities(m);
            });
        });
    };
    MapMarkerLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-marker-layer'
                },] },
    ];
    /** @nocollapse */
    MapMarkerLayerDirective.ctorParameters = function () { return [
        { type: MarkerService },
        { type: LayerService },
        { type: ClusterService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapMarkerLayerDirective.propDecorators = {
        ClusterClickAction: [{ type: Input }],
        ClusterIconInfo: [{ type: Input }],
        ClusterPlacementMode: [{ type: Input }],
        CustomMarkerCallback: [{ type: Input }],
        DynamicMarkerBaseSize: [{ type: Input }],
        DynamicMarkerRanges: [{ type: Input }],
        EnableClustering: [{ type: Input }],
        GridSize: [{ type: Input }],
        IconInfo: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        MarkerOptions: [{ type: Input }],
        Styles: [{ type: Input }],
        TreatNewMarkerOptionsAsStream: [{ type: Input }],
        UseDynamicSizeMarkers: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        ZoomOnClick: [{ type: Input }],
        DynamicMarkerCreated: [{ type: Output }],
        MarkerClick: [{ type: Output }],
        DragEnd: [{ type: Output }]
    };
    return MapMarkerLayerDirective;
}());
export { MapMarkerLayerDirective };
if (false) {
    /** @type {?} */
    MapMarkerLayerDirective.prototype._id;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._service;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._styles;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._useDynamicSizeMarker;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._dynamicMarkerBaseSize;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._dynamicMarkerRanges;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._iconCreationCallback;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._streaming;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markers;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markersLast;
    /**
     * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterClickAction;
    /**
     * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterIconInfo;
    /**
     * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterPlacementMode;
    /**
     * Determines whether the layer clusters. This property can only be set on creation of the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.EnableClustering;
    /**
     * Gets or sets the grid size to be used for clustering.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.GridSize;
    /**
     * Gets or sets the IconInfo to be used to create a custom marker images. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.IconInfo;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.LayerOffset;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ZIndex;
    /**
     * Gets or sets whether the cluster should zoom in on click
     *
     * \@readonly
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ZoomOnClick;
    /**
     * This event emitter gets emitted when the dynamic icon for a marker is being created.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.DynamicMarkerCreated;
    /**
     * This event emitter gets emitted when the user clicks a marker in the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.MarkerClick;
    /**
     * This event is fired when the user stops dragging a marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.DragEnd;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markerService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._layerService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._clusterService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._mapService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLW1hcmtlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL21hcC1tYXJrZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFnQixLQUFLLEVBQUUsTUFBTSxFQUN0QyxZQUFZLEVBQW9ELE1BQU0sRUFDekUsTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBS3hELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaVFsQixHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7Ozs7O09BU0c7SUFDSCxpQ0FDWSxnQkFDQSxlQUNBLGlCQUNBLGFBQ0E7UUFKQSxtQkFBYyxHQUFkLGNBQWM7UUFDZCxrQkFBYSxHQUFiLGFBQWE7UUFDYixvQkFBZSxHQUFmLGVBQWU7UUFDZixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSztxQ0E3T2UsS0FBSztzQ0FDSixFQUFFO29DQUNpQixJQUFJLEdBQUcsQ0FBaUI7WUFDeEUsQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLENBQUM7WUFDOUIsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENB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QUUsb0JBQW9CO2lCQUNqQzs7OztnQkExQ1EsYUFBYTtnQkFDYixZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsVUFBVTtnQkFiaUQsTUFBTTs7O3FDQWdGckUsS0FBSztrQ0FRTCxLQUFLO3VDQU9MLEtBQUs7dUNBUUwsS0FBSzt3Q0FrQkwsS0FBSztzQ0FXTCxLQUFLO21DQVNMLEtBQUs7MkJBT0wsS0FBSzsyQkFRTCxLQUFLOzhCQU9MLEtBQUs7Z0NBT0wsS0FBSzt5QkFpQkwsS0FBSztnREFVTCxLQUFLO3dDQVVMLEtBQUs7MEJBaUJMLEtBQUs7eUJBT0wsS0FBSzs4QkFRTCxLQUFLO3VDQVlMLE1BQU07OEJBT04sTUFBTTswQkFPTixNQUFNOztrQ0EzUVg7O1NBdURhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsIFNpbXBsZUNoYW5nZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsXHJcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgVmlld0NvbnRhaW5lclJlZiwgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSU1hcmtlckV2ZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWV2ZW50JztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElDbHVzdGVySWNvbkluZm8gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ljbHVzdGVyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IENsdXN0ZXJDbGlja0FjdGlvbiB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLWNsaWNrLWFjdGlvbic7XHJcbmltcG9ydCB7IENsdXN0ZXJQbGFjZW1lbnRNb2RlIH0gZnJvbSAnLi4vbW9kZWxzL2NsdXN0ZXItcGxhY2VtZW50LW1vZGUnO1xyXG5pbXBvcnQgeyBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NsdXN0ZXItbGF5ZXInO1xyXG5cclxuLyoqXHJcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgbWFya2VyLlxyXG4gKi9cclxubGV0IGxheWVySWQgPSAxMDAwMDAwO1xyXG5cclxuLyoqXHJcbiAqIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlIHBlcmZvcm1hbnRseSByZW5kZXJzIGEgbGFyZ2Ugc2V0IG9mIG1hcCBtYXJrZXIgaW5zaWRlIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudCwgTWFwTWFya2VyRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgLm1hcC1jb250YWluZXIge1xyXG4gKiAgICAgaGVpZ2h0OiAzMDBweDtcclxuICogICB9XHJcbiAqIGBdLFxyXG4gKiB0ZW1wbGF0ZTogYFxyXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPHgtbWFwLW1hcmtlci1sYXllciBbTWFya2VyT3B0aW9uc109XCJfbWFya2Vyc1wiPjwveC1tYXAtbWFya2VyLWxheWVyPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcC1tYXJrZXItbGF5ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2xheWVyUHJvbWlzZTogUHJvbWlzZTxMYXllcj47XHJcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBMYXllclNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9zdHlsZXM6IEFycmF5PElDbHVzdGVySWNvbkluZm8+O1xyXG4gICAgcHJpdmF0ZSBfdXNlRHluYW1pY1NpemVNYXJrZXIgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSA9IDE4O1xyXG4gICAgcHJpdmF0ZSBfZHluYW1pY01hcmtlclJhbmdlczogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcclxuICAgICAgICBbMTAsICdyZ2JhKDIwLCAxODAsIDIwLCAwLjUpJ10sXHJcbiAgICAgICAgWzEwMCwgJ3JnYmEoMjU1LCAyMTAsIDQwLCAwLjUpJ10sXHJcbiAgICAgICAgW051bWJlci5NQVhfU0FGRV9JTlRFR0VSICwgJ3JnYmEoMjU1LCA0MCwgNDAsIDAuNSknXVxyXG4gICAgXSk7XHJcbiAgICBwcml2YXRlIF9pY29uQ3JlYXRpb25DYWxsYmFjazogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc3RyZWFtaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9tYXJrZXJzOiBBcnJheTxJTWFya2VyT3B0aW9ucz4gPSBuZXcgQXJyYXk8SU1hcmtlck9wdGlvbnM+KCk7XHJcbiAgICBwcml2YXRlIF9tYXJrZXJzTGFzdDogQXJyYXk8SU1hcmtlck9wdGlvbnM+ID0gbmV3IEFycmF5PElNYXJrZXJPcHRpb25zPigpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGhlIENsdXN0ZXIgQ2xpY2sgQWN0aW9uIHtAbGluayBDbHVzdGVyQ2xpY2tBY3Rpb259LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgQ2x1c3RlckNsaWNrQWN0aW9uOiBDbHVzdGVyQ2xpY2tBY3Rpb24gPSAgQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3RlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgSWNvbkluZm8gdG8gYmUgdXNlZCB0byBjcmVhdGUgYSBjdXN0b20gY2x1c3RlciBtYXJrZXIuIFN1cHBvcnRzIGZvbnQtYmFzZWQsIFNWRywgZ3JhcGhpY3MgYW5kIG1vcmUuXHJcbiAgICAgKiBTZWUge0BsaW5rIElNYXJrZXJJY29uSW5mb30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBDbHVzdGVySWNvbkluZm86IElNYXJrZXJJY29uSW5mbztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2x1c3RlciBwbGFjZW1lbnQgbW9kZS4ge0BsaW5rIENsdXN0ZXJQbGFjZW1lbnRNb2RlfVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSAgcHVibGljIENsdXN0ZXJQbGFjZW1lbnRNb2RlOiBDbHVzdGVyUGxhY2VtZW50TW9kZSA9IENsdXN0ZXJQbGFjZW1lbnRNb2RlLk1lYW5WYWx1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2FsbGJhY2sgaW52b2tlZCB0byBjcmVhdGUgYSBjdXN0b20gY2x1c3RlciBtYXJrZXIuIE5vdGUgdGhhdCB3aGVuIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9IGlzIGVuYWJsZWQsXHJcbiAgICAgKiB5b3UgY2Fubm90IHNldCBhIGN1c3RvbSBtYXJrZXIgY2FsbGJhY2suXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDdXN0b21NYXJrZXJDYWxsYmFjaygpOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmcgIHsgcmV0dXJuIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXN0b21NYXJrZXJDYWxsYmFjayh2YWw6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdXNlRHluYW1pY1NpemVNYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93KFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcihgWW91IGNhbm5vdCBzZXQgYSBjdXN0b20gbWFya2VyIGNhbGxiYWNrIHdoZW4gVXNlRHluYW1pY1NpemVNYXJrZXJzIGlzIHNldCB0byB0cnVlLlxyXG4gICAgICAgICAgICAgICAgICAgIFNldCBVc2VEeW5hbWljU2l6ZU1ha2VycyB0byBmYWxzZS5gKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjayA9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGJhc2Ugc2l6ZSBvZiBkeW5hbWljIG1hcmtlcnMgaW4gcGl4ZWxzLiBUaGUgYWN0dWFseSBzaXplIG9mIHRoZSBkeW5hbWljIG1hcmtlciBpcyBiYXNlZCBvbiB0aGlzLlxyXG4gICAgICogU2VlIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IER5bmFtaWNNYXJrZXJCYXNlU2l6ZSgpOiBudW1iZXIgIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZTsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgRHluYW1pY01hcmtlckJhc2VTaXplKHZhbDogbnVtYmVyKSB7IHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSByYW5nZXMgdG8gdXNlIHRvIGNhbGN1bGF0ZSBicmVha3BvaW50cyBhbmQgY29sb3JzIGZvciBkeW5hbWljIG1hcmtlcnMuXHJcbiAgICAgKiBUaGUgbWFwIGNvbnRhaW5zIGtleS92YWx1ZSBwYWlycywgd2l0aCB0aGUga2V5cyBiZWluZ1xyXG4gICAgICogdGhlIGJyZWFrcG9pbnQgc2l6ZXMgYW5kIHRoZSB2YWx1ZXMgdGhlIGNvbG9ycyB0byBiZSB1c2VkIGZvciB0aGUgZHluYW1pYyBtYXJrZXIgaW4gdGhhdCByYW5nZS4gU2VlIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IER5bmFtaWNNYXJrZXJSYW5nZXMoKTogTWFwPG51bWJlciwgc3RyaW5nPiAgeyByZXR1cm4gdGhpcy5fZHluYW1pY01hcmtlclJhbmdlczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgRHluYW1pY01hcmtlclJhbmdlcyh2YWw6IE1hcDxudW1iZXIsIHN0cmluZz4pIHsgdGhpcy5fZHluYW1pY01hcmtlclJhbmdlcyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBsYXllciBjbHVzdGVycy4gVGhpcyBwcm9wZXJ0eSBjYW4gb25seSBiZSBzZXQgb24gY3JlYXRpb24gb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgRW5hYmxlQ2x1c3RlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBncmlkIHNpemUgdG8gYmUgdXNlZCBmb3IgY2x1c3RlcmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEdyaWRTaXplOiBudW1iZXIgPSAxNTA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIEljb25JbmZvIHRvIGJlIHVzZWQgdG8gY3JlYXRlIGEgY3VzdG9tIG1hcmtlciBpbWFnZXMuIFN1cHBvcnRzIGZvbnQtYmFzZWQsIFNWRywgZ3JhcGhpY3MgYW5kIG1vcmUuXHJcbiAgICAgKiBTZWUge0BsaW5rIElNYXJrZXJJY29uSW5mb30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBJY29uSW5mbzogSU1hcmtlckljb25JbmZvO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIEFuIG9mZnNldCBhcHBsaWVkIHRvIHRoZSBwb3NpdGlvbmluZyBvZiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXllck9mZnNldDogSVBvaW50ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBJTWFya2VyT3B0aW9ucyBhcnJheSBob2xkaW5nIHRoZSBtYXJrZXIgaW5mby5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IE1hcmtlck9wdGlvbnMoKTogQXJyYXk8SU1hcmtlck9wdGlvbnM+IHsgcmV0dXJuIHRoaXMuX21hcmtlcnM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IE1hcmtlck9wdGlvbnModmFsOiBBcnJheTxJTWFya2VyT3B0aW9ucz4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0cmVhbWluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vyc0xhc3QucHVzaCguLi52YWwuc2xpY2UoMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKC4uLnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzID0gdmFsLnNsaWNlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjbHVzdGVyIHN0eWxlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3R5bGVzKCk6IEFycmF5PElDbHVzdGVySWNvbkluZm8+IHsgcmV0dXJuIHRoaXMuX3N0eWxlczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgU3R5bGVzKHZhbDogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4pIHsgdGhpcy5fc3R5bGVzID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHdoZXRoZXIgdG8gdHJlYXQgY2hhbmdlcyBpbiB0aGUgTWFya2VyT3B0aW9ucyBhcyBzdHJlYW1zIG9mIG5ldyBtYXJrZXJzLiBJbiB0aHNpIG1vZGUsIGNoYW5naW5nIHRoZVxyXG4gICAgICogQXJyYXkgc3VwcGxpZWQgaW4gTWFya2VyT3B0aW9ucyB3aWxsIGJlIGluY3JlbWVudGFsbHkgZHJhd24gb24gdGhlIG1hcCBhcyBvcHBvc2VkIHRvIHJlcGxhY2UgdGhlIG1hcmtlcnMgb24gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFRyZWF0TmV3TWFya2VyT3B0aW9uc0FzU3RyZWFtKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RyZWFtaW5nOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBUcmVhdE5ld01hcmtlck9wdGlvbnNBc1N0cmVhbSh2YWw6IGJvb2xlYW4pIHsgdGhpcy5fc3RyZWFtaW5nID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byB1c2UgZHluYW1pYyBtYXJrZXJzLiBEeW5hbWljIG1hcmtlcnMgY2hhbmdlIGluIHNpemUgYW5kIGNvbG9yIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mXHJcbiAgICAgKiBwaW5zIGluIHRoZSBjbHVzdGVyLiBJZiBzZXQgdG8gdHJ1ZSwgdGhpcyB3aWxsIHRha2UgcHJlY2VuZGVuY2Ugb3ZlciBhbnkgY3VzdG9tIG1hcmtlciBjcmVhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFVzZUR5bmFtaWNTaXplTWFya2VycygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBVc2VEeW5hbWljU2l6ZU1hcmtlcnModmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyID0gdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjayA9IChtOiBBcnJheTxNYXJrZXI+LCBpbmZvOiBJTWFya2VySWNvbkluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ2x1c3RlckxheWVyRGlyZWN0aXZlLkNyZWF0ZUR5bmFtaWNTaXplTWFya2VyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtLmxlbmd0aCwgaW5mbywgdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplLCB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtYXJrZXIgbGF5ZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHotaW5kZXggb2YgdGhlIGxheWVyLiBJZiBub3QgdXNlZCwgbGF5ZXJzIGdldCBzdGFja2VkIGluIHRoZSBvcmRlciBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgWkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdGhlIGNsdXN0ZXIgc2hvdWxkIHpvb20gaW4gb24gY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgWm9vbU9uQ2xpY2s6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBEZWxlZ2F0ZXNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSBkeW5hbWljIGljb24gZm9yIGEgbWFya2VyIGlzIGJlaW5nIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgRHluYW1pY01hcmtlckNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxJTWFya2VySWNvbkluZm8+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VySWNvbkluZm8+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgbWFya2VyIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBNYXJrZXJDbGljazogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyBhIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgaWQgb2YgdGhlIG1hcmtlciBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmUuXHJcbiAgICAgKiBAcGFyYW0gX21hcmtlclNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTWFya2VyU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBMYXllclNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF9jbHVzdGVyU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBDbHVzdGVyU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTWFwU2VydmljZX0uXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTmdab25lfSBzZXJ2aWNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9tYXJrZXJTZXJ2aWNlOiBNYXJrZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2NsdXN0ZXJTZXJ2aWNlOiBDbHVzdGVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgYSBnZW8gbG9jYXRpb24gdG8gYSBwaXhlbCBsb2NhdGlvbiByZWxhdGl2ZSB0byB0aGUgbWFwIHZpZXdwb3J0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbbG9jXSAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgYW4ge0BsaW5rIElQb2ludH0gcmVwcmVzZW50aW5nIHRoZSBwaXhlbCBjb29yZGluYXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvY2F0aW9uVG9QaXhlbChsb2M6IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VyU2VydmljZS5Mb2NhdGlvblRvUG9pbnQobG9jKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBDb21wb25lbnQgY29udGVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBsYXllck9wdGlvbnM6IElMYXllck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLl9pZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZha2VMYXllckRpcmVjdGl2ZTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgSWQgOiB0aGlzLl9pZCxcclxuICAgICAgICAgICAgICAgIFZpc2libGU6IHRoaXMuVmlzaWJsZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuRW5hYmxlQ2x1c3RlcmluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkFkZExheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UgPSB0aGlzLl9sYXllclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSB0aGlzLl9sYXllclNlcnZpY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuTGF5ZXJPZmZzZXQgPSB0aGlzLkxheWVyT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLlpJbmRleCA9IHRoaXMuWkluZGV4O1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkNsdXN0ZXJpbmdFbmFibGVkID0gdGhpcy5FbmFibGVDbHVzdGVyaW5nO1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkNsdXN0ZXJQbGFjZW1lbnRNb2RlID0gdGhpcy5DbHVzdGVyUGxhY2VtZW50TW9kZTtcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5HcmlkU2l6ZSA9IHRoaXMuR3JpZFNpemU7XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuQ2x1c3RlckNsaWNrQWN0aW9uID0gdGhpcy5DbHVzdGVyQ2xpY2tBY3Rpb247XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuSWNvbkluZm8gPSB0aGlzLkNsdXN0ZXJJY29uSW5mbztcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5DdXN0b21NYXJrZXJDYWxsYmFjayA9IHRoaXMuQ3VzdG9tTWFya2VyQ2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuVXNlRHluYW1pY1NpemVNYXJrZXJzID0gdGhpcy5Vc2VEeW5hbWljU2l6ZU1hcmtlcnM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbHVzdGVyU2VydmljZS5BZGRMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlID0gdGhpcy5fY2x1c3RlclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSB0aGlzLl9jbHVzdGVyU2VydmljZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgICAgIGwuU2V0VmlzaWJsZSh0aGlzLlZpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTWFya2VyT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5VcGRhdGVNYXJrZXJzKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgbC5EZWxldGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyB0byBjaGFuZ2VzIGluIGRhdGEtYm91bmQgcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50IGFuZCBhY3R1YXRlcyBwcm9wZXJ0eSBjaGFuZ2VzIGluIHRoZSB1bmRlcmxpbmcgbGF5ZXIgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBjb2xsZWN0aW9uIG9mIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICAgICAgbGV0IHNob3VsZFNldE9wdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBvOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLl9pZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ01hcmtlck9wdGlvbnMnXSkge1xyXG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlTWFya2VycygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSAmJiAhY2hhbmdlc1snVmlzaWJsZSddLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiBsLlNldFZpc2libGUodGhpcy5WaXNpYmxlKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snRW5hYmxlQ2x1c3RlcmluZyddICYmICFjaGFuZ2VzWydFbmFibGVDbHVzdGVyaW5nJ10uZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICAgICAgaWYgKCdTdG9wQ2x1c3RlcmluZycgaW4gdGhpcy5fc2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgby5jbHVzdGVyaW5nRW5hYmxlZCA9IHRoaXMuRW5hYmxlQ2x1c3RlcmluZztcclxuICAgICAgICAgICAgICAgIHNob3VsZFNldE9wdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignWW91IGNhbm5vdCBjaGFuZ2UgRW5hYmxlQ2x1c3RlcmluZyBhZnRlciB0aGUgbGF5ZXIgaGFzIGJlZW4gY3JlYXRlZC4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJQbGFjZW1lbnRNb2RlJ10gJiYgIWNoYW5nZXNbJ0NsdXN0ZXJQbGFjZW1lbnRNb2RlJ10uZmlyc3RDaGFuZ2UgJiYgJ1N0b3BDbHVzdGVyaW5nJyBpbiB0aGlzLl9zZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIG8ucGxhY2VtZW50TW9kZSA9IHRoaXMuQ2x1c3RlclBsYWNlbWVudE1vZGU7XHJcbiAgICAgICAgICAgIHNob3VsZFNldE9wdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snR3JpZFNpemUnXSAmJiAhY2hhbmdlc1snR3JpZFNpemUnXS5maXJzdENoYW5nZSAmJiAnU3RvcENsdXN0ZXJpbmcnIGluIHRoaXMuX3NlcnZpY2UpIHtcclxuICAgICAgICAgICAgby5ncmlkU2l6ZSA9IHRoaXMuR3JpZFNpemU7XHJcbiAgICAgICAgICAgIHNob3VsZFNldE9wdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snQ2x1c3RlckNsaWNrQWN0aW9uJ10gJiYgIWNoYW5nZXNbJ0NsdXN0ZXJDbGlja0FjdGlvbiddLmZpcnN0Q2hhbmdlICYmICdTdG9wQ2x1c3RlcmluZycgaW4gdGhpcy5fc2VydmljZSkge1xyXG4gICAgICAgICAgICBvLnpvb21PbkNsaWNrID0gdGhpcy5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5ab29tSW50b0NsdXN0ZXI7XHJcbiAgICAgICAgICAgIHNob3VsZFNldE9wdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNoYW5nZXNbJ1pJbmRleCddICYmICFjaGFuZ2VzWydaSW5kZXgnXS5maXJzdENoYW5nZSkgfHxcclxuICAgICAgICAgICAgKGNoYW5nZXNbJ0xheWVyT2Zmc2V0J10gJiYgIWNoYW5nZXNbJ0xheWVyT2Zmc2V0J10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydJY29uSW5mbyddICYmICFjaGFuZ2VzWydJY29uSW5mbyddLmZpcnN0Q2hhbmdlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSBaSW5kZXggb3IgTGF5ZXJPZmZzZXQgYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGNyZWF0ZWQuJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNob3VsZFNldE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWtlTGF5ZXJEaXJlY3RpdmU6IGFueSA9IHtJZCA6IHRoaXMuX2lkfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4gbC5TZXRPcHRpb25zKG8pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgTWFya2VyIElkLlxyXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hcmtlciBpZC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuICdNYXBNYXJrZXJMYXllci0nICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHZhcmlvdXMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtIC0gdGhlIG1hcmtlciBmb3Igd2hpY2ggdG8gYWRkIHRoZSBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBBZGRFdmVudExpc3RlbmVycyhtOiBNYXJrZXIpOiB2b2lkIHtcclxuICAgICAgICBtLkFkZExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1hcmtlckNsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgTWFya2VyOiBtLFxyXG4gICAgICAgICAgICAgICAgQ2xpY2s6IGUsXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbjogdGhpcy5fbWFya2VyU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlKSxcclxuICAgICAgICAgICAgICAgIFBpeGVsczogdGhpcy5fbWFya2VyU2VydmljZS5HZXRQaXhlbHNGcm9tQ2xpY2soZSlcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIG0uQWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnRW5kLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgTWFya2VyOiBtLFxyXG4gICAgICAgICAgICAgICAgQ2xpY2s6IGUsXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbjogdGhpcy5fbWFya2VyU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlKSxcclxuICAgICAgICAgICAgICAgIFBpeGVsczogdGhpcy5fbWFya2VyU2VydmljZS5HZXRQaXhlbHNGcm9tQ2xpY2soZSlcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBvciB1cGRhdGVzIHRoZSBtYXJrZXJzIGJhc2VkIG9uIHRoZSBtYXJrZXIgb3B0aW9ucy4gVGhpcyB3aWxsIHBsYWNlIHRoZSBtYXJrZXJzIG9uIHRoZSBtYXBcclxuICAgICAqIGFuZCByZWdpc3RlciB0aGUgYXNzb2NpYXRlZCBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgVXBkYXRlTWFya2VycygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbGF5ZXJQcm9taXNlID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiA9IHRoaXMuX3N0cmVhbWluZyA/IHRoaXMuX21hcmtlcnNMYXN0LnNwbGljZSgwKSA6IHRoaXMuX21hcmtlcnM7XHJcblxyXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgcHJvbWlzZSBmb3IgdGhlIG1hcmtlcnNcclxuICAgICAgICAgICAgY29uc3QgbXA6IFByb21pc2U8QXJyYXk8TWFya2VyPj4gPSB0aGlzLl9zZXJ2aWNlLkNyZWF0ZU1hcmtlcnMobWFya2VycywgdGhpcy5JY29uSW5mbyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgbWFya2VycyBvbmNlIHByb21pc2VzIGFyZSBmdWxsZmlsbGVkLlxyXG4gICAgICAgICAgICBtcC50aGVuKG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgbS5mb3JFYWNoKG1hcmtlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMobWFya2VyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RyZWFtaW5nID8gbC5BZGRFbnRpdGllcyhtKSA6IGwuU2V0RW50aXRpZXMobSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=