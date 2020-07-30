/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, ViewChild, ContentChildren, Input, Output, ElementRef, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { MapServiceFactory } from '../services/mapservicefactory';
import { MapService } from '../services/map.service';
import { MarkerService } from '../services/marker.service';
import { InfoBoxService } from '../services/infobox.service';
import { LayerService } from '../services/layer.service';
import { PolygonService } from '../services/polygon.service';
import { PolylineService } from '../services/polyline.service';
import { ClusterService } from '../services/cluster.service';
import { MapTypeId } from '../models/map-type-id';
import { MapMarkerDirective } from './map-marker';
/**
 * Renders a map based on a given provider.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent} from '...';
 *
 * \@Component({
 *  selector: 'my-map',
 *  styles: [`
 *    .map-container { height: 300px; }
 * `],
 *  template: `
 *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom"></x-map>
 *  `
 * })
 * ```
 *
 * @export
 */
var MapComponent = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapComponent.
     *
     * @param _mapService - Concreted implementation of a map service for the underlying maps implementations.
     *                                   Generally provided via injections.
     * @memberof MapComponent
     */
    function MapComponent(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
        this._longitude = 0;
        this._latitude = 0;
        this._zoom = 0;
        this._options = {};
        this._box = null;
        this._containerClass = true;
        /**
         * This event emitter is fired when the map bounding box changes.
         *
         * \@memberof MapComponent
         */
        this.BoundsChange = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         *
         * \@memberof MapComponent
         */
        this.CenterChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapDblClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseOver = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseOut = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseMove = new EventEmitter();
        /**
         * The event emitter is fired when the map service is available and the maps has been
         * Initialized (but not necessarily created). It contains a Promise that when fullfilled returns
         * the main map object of the underlying platform.
         *
         * \@memberof MapComponent
         */
        this.MapPromise = new EventEmitter();
        /**
         * This event emiiter is fired when the map zoom changes
         *
         * \@memberof MapComponent
         */
        this.ZoomChange = new EventEmitter();
        /**
         * This event emitter is fired when the map service is available and the maps has been
         * Initialized
         * \@memberOf MapComponent
         */
        this.MapService = new EventEmitter();
    }
    Object.defineProperty(MapComponent.prototype, "Box", {
        ///
        /// Property declarations
        ///
        /**
         * Get or sets the maximum and minimum bounding box for map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Get or sets the maximum and minimum bounding box for map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._box; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._box = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Latitude", {
        /**
         * Gets or sets the latitude that sets the center of the map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the latitude that sets the center of the map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._longitude; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._latitude = this.ConvertToDecimal(value);
            this.UpdateCenter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Longitude", {
        /**
         * Gets or sets the longitude that sets the center of the map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the longitude that sets the center of the map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._longitude; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._longitude = this.ConvertToDecimal(value);
            this.UpdateCenter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Options", {
        /**
         * Gets or sets general map Options
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets general map Options
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._options = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Zoom", {
        /**
         * Gets or sets the zoom level of the map. The default value is `8`.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the zoom level of the map. The default value is `8`.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._zoom; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._zoom = this.ConvertToDecimal(value, 8);
            if (typeof this._zoom === 'number') {
                this._mapService.SetZoom(this._zoom);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.ngOnInit = /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        this.MapPromise.emit(this._mapService.MapPromise);
        this.MapService.emit(this._mapService);
    };
    /**
     * Called after Angular has fully initialized a component's view. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.ngAfterViewInit = /**
     * Called after Angular has fully initialized a component's view. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        this.InitMapInstance(this._container.nativeElement);
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapComponent.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (this._mapPromise) {
            if (changes['Box']) {
                if (this._box != null) {
                    this._mapService.SetViewOptions(/** @type {?} */ ({
                        bounds: this._box
                    }));
                }
            }
            if (changes['Options']) {
                this._mapService.SetMapOptions(this._options);
            }
        }
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        this._mapService.DisposeMap();
    };
    /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    MapComponent.prototype.TriggerResize = /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    function () {
        var _this = this;
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () { return _this._mapService.TriggerMapEvent('resize').then(function () { return resolve(); }); });
        });
    };
    /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    MapComponent.prototype.ConvertToDecimal = /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        else if (typeof value === 'number') {
            return /** @type {?} */ (value);
        }
        return defaultValue;
    };
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapClickEvents = /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('click').subscribe(function (e) {
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            ///
            _this._clickTimeout = setTimeout(function () {
                _this.MapClick.emit(/** @type {?} */ (e));
            }, 300);
        });
        this._mapService.SubscribeToMapEvent('dblclick').subscribe(function (e) {
            if (_this._clickTimeout) {
                clearTimeout(/** @type {?} */ (_this._clickTimeout));
            }
            _this.MapDblClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('rightclick').subscribe(function (e) {
            _this.MapRightClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseover').subscribe(function (e) {
            _this.MapMouseOver.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseout').subscribe(function (e) {
            _this.MapMouseOut.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mousemove').subscribe(function (e) {
            _this.MapMouseMove.emit(/** @type {?} */ (e));
        });
    };
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapBoundsChange = /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('boundschanged').subscribe(function () {
            _this._mapService.GetBounds().then(function (bounds) {
                _this.BoundsChange.emit(bounds);
            });
        });
    };
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapCenterChange = /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('centerchanged').subscribe(function () {
            _this._mapService.GetCenter().then(function (center) {
                if (_this._latitude !== center.latitude || _this._longitude !== center.longitude) {
                    _this._latitude = center.latitude;
                    _this._longitude = center.longitude;
                    _this.CenterChange.emit(/** @type {?} */ ({ latitude: _this._latitude, longitude: _this._longitude }));
                }
            });
        });
    };
    /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapZoomChange = /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('zoomchanged').subscribe(function () {
            _this._mapService.GetZoom().then(function (z) {
                if (_this._zoom !== z) {
                    _this._zoom = z;
                    _this.ZoomChange.emit(z);
                }
            });
        });
    };
    /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    MapComponent.prototype.InitMapInstance = /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    function (el) {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            if (_this._options.center == null) {
                _this._options.center = { latitude: _this._latitude, longitude: _this._longitude };
            }
            if (_this._options.zoom == null) {
                _this._options.zoom = _this._zoom;
            }
            if (_this._options.mapTypeId == null) {
                _this._options.mapTypeId = MapTypeId.hybrid;
            }
            if (_this._box != null) {
                _this._options.bounds = _this._box;
            }
            _this._mapPromise = _this._mapService.CreateMap(el, _this._options);
            _this.HandleMapCenterChange();
            _this.HandleMapBoundsChange();
            _this.HandleMapZoomChange();
            _this.HandleMapClickEvents();
        });
    };
    /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.UpdateCenter = /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
            return;
        }
        this._mapService.SetCenter({
            latitude: this._latitude,
            longitude: this._longitude,
        });
    };
    MapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'x-map',
                    providers: [
                        { provide: MapService, deps: [MapServiceFactory], useFactory: MapServiceCreator },
                        { provide: MarkerService, deps: [MapServiceFactory, MapService, LayerService, ClusterService], useFactory: MarkerServiceFactory },
                        {
                            provide: InfoBoxService, deps: [MapServiceFactory, MapService,
                                MarkerService], useFactory: InfoBoxServiceFactory
                        },
                        { provide: LayerService, deps: [MapServiceFactory, MapService], useFactory: LayerServiceFactory },
                        { provide: ClusterService, deps: [MapServiceFactory, MapService], useFactory: ClusterServiceFactory },
                        { provide: PolygonService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolygonServiceFactory },
                        { provide: PolylineService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolylineServiceFactory }
                    ],
                    template: "\n        <div #container class='map-container-inner'></div>\n        <div class='map-content'>\n            <ng-content></ng-content>\n        </div>\n    ",
                    styles: ["\n        .map-container-inner { width: inherit; height: inherit; }\n        .map-container-inner div { background-repeat: no-repeat; }\n        .map-content { display:none; }\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MapComponent.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    MapComponent.propDecorators = {
        _containerClass: [{ type: HostBinding, args: ['class.map-container',] }],
        _container: [{ type: ViewChild, args: ['container',] }],
        _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
        Box: [{ type: Input }],
        Latitude: [{ type: Input }],
        Longitude: [{ type: Input }],
        Options: [{ type: Input }],
        Zoom: [{ type: Input }],
        BoundsChange: [{ type: Output }],
        CenterChange: [{ type: Output }],
        MapClick: [{ type: Output }],
        MapDblClick: [{ type: Output }],
        MapRightClick: [{ type: Output }],
        MapMouseOver: [{ type: Output }],
        MapMouseOut: [{ type: Output }],
        MapMouseMove: [{ type: Output }],
        MapPromise: [{ type: Output }],
        ZoomChange: [{ type: Output }],
        MapService: [{ type: Output }]
    };
    return MapComponent;
}());
export { MapComponent };
if (false) {
    /** @type {?} */
    MapComponent.prototype._longitude;
    /** @type {?} */
    MapComponent.prototype._latitude;
    /** @type {?} */
    MapComponent.prototype._zoom;
    /** @type {?} */
    MapComponent.prototype._clickTimeout;
    /** @type {?} */
    MapComponent.prototype._options;
    /** @type {?} */
    MapComponent.prototype._box;
    /** @type {?} */
    MapComponent.prototype._mapPromise;
    /** @type {?} */
    MapComponent.prototype._containerClass;
    /** @type {?} */
    MapComponent.prototype._container;
    /** @type {?} */
    MapComponent.prototype._markers;
    /**
     * This event emitter is fired when the map bounding box changes.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.BoundsChange;
    /**
     * This event emitter is fired when the map center changes.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.CenterChange;
    /**
     * This event emitter gets emitted when the user clicks on the map (but not when they click on a
     * marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapClick;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapDblClick;
    /**
     * This event emitter gets emitted when the user right-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapRightClick;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseOver;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseOut;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseMove;
    /**
     * The event emitter is fired when the map service is available and the maps has been
     * Initialized (but not necessarily created). It contains a Promise that when fullfilled returns
     * the main map object of the underlying platform.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapPromise;
    /**
     * This event emiiter is fired when the map zoom changes
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.ZoomChange;
    /**
     * This event emitter is fired when the map service is available and the maps has been
     * Initialized
     * \@memberOf MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapService;
    /** @type {?} */
    MapComponent.prototype._mapService;
    /** @type {?} */
    MapComponent.prototype._zone;
}
/**
 * Factory function to generate a cluster service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @return {?} - A concrete instance of a Cluster Service based on the underlying map architecture
 */
export function ClusterServiceFactory(f, m) { return f.CreateClusterService(m); }
/**
 * Factory function to generate a infobox service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} ma
 * @return {?} - A concrete instance of a InfoBox Service based on the underlying map architecture.
 */
export function InfoBoxServiceFactory(f, m, ma) { return f.CreateInfoBoxService(m, ma); }
/**
 * Factory function to generate a layer service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @return {?} - A concrete instance of a Layer Service based on the underlying map architecture.
 */
export function LayerServiceFactory(f, m) { return f.CreateLayerService(m); }
/**
 * Factory function to generate a map service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @return {?} - A concrete instance of a MapService based on the underlying map architecture.
 */
export function MapServiceCreator(f) { return f.Create(); }
/**
 * Factory function to generate a marker service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @param {?} c - A {\@link ClusterService} instance.
 * @return {?} - A concrete instance of a Marker Service based on the underlying map architecture.
 */
export function MarkerServiceFactory(f, m, l, c) {
    return f.CreateMarkerService(m, l, c);
}
/**
 * Factory function to generate a polygon service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @return {?} - A concrete instance of a Polygon Service based on the underlying map architecture.
 */
export function PolygonServiceFactory(f, m, l) {
    return f.CreatePolygonService(m, l);
}
/**
 * Factory function to generate a polyline service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @return {?} - A concrete instance of a Polyline Service based on the underlying map architecture.
 */
export function PolylineServiceFactory(f, m, l) {
    return f.CreatePolylineService(m, l);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFLWixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtPOUMsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsc0JBQW9CLFdBQXVCLEVBQVUsS0FBYTtRQUE5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7MEJBbkw3QyxDQUFDO3lCQUNGLENBQUM7cUJBQ0wsQ0FBQzt3QkFFZSxFQUFF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dmVudEVtaXR0ZXIsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBTaW1wbGVDaGFuZ2UsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBIb3N0QmluZGluZyxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBOZ1pvbmUsXHJcclxuICAgIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi4vc2VydmljZXMvbWFwc2VydmljZWZhY3RvcnknO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2luZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlsaW5lLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lib3gnO1xyXG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwVHlwZUlkIH0gZnJvbSAnLi4vbW9kZWxzL21hcC10eXBlLWlkJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGEgbWFwIGJhc2VkIG9uIGEgZ2l2ZW4gcHJvdmlkZXIuXHJcbiAqICoqSW1wb3J0YW50IG5vdGUqKjogVG8gYmUgYWJsZSBzZWUgYSBtYXAgaW4gdGhlIGJyb3dzZXIsIHlvdSBoYXZlIHRvIGRlZmluZSBhIGhlaWdodCBmb3IgdGhlIENTU1xyXG4gKiBjbGFzcyBgbWFwLWNvbnRhaW5lcmAuXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudH0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxyXG4gKiBgXSxcclxuICogIHRlbXBsYXRlOiBgXHJcbiAqICAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+PC94LW1hcD5cclxuICogIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd4LW1hcCcsXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IE1hcFNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeV0sIHVzZUZhY3Rvcnk6IE1hcFNlcnZpY2VDcmVhdG9yIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBNYXJrZXJTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2UsIExheWVyU2VydmljZSwgQ2x1c3RlclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBNYXJrZXJTZXJ2aWNlRmFjdG9yeSB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogSW5mb0JveFNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE1hcmtlclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBJbmZvQm94U2VydmljZUZhY3RvcnlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogTGF5ZXJTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2VdLCB1c2VGYWN0b3J5OiBMYXllclNlcnZpY2VGYWN0b3J5IH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBDbHVzdGVyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlXSwgdXNlRmFjdG9yeTogQ2x1c3RlclNlcnZpY2VGYWN0b3J5IH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBQb2x5Z29uU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBQb2x5Z29uU2VydmljZUZhY3RvcnkgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IFBvbHlsaW5lU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBQb2x5bGluZVNlcnZpY2VGYWN0b3J5IH1cclxuICAgIF0sXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz0nbWFwLWNvbnRhaW5lci1pbm5lcic+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0nbWFwLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5tYXAtY29udGFpbmVyLWlubmVyIHsgd2lkdGg6IGluaGVyaXQ7IGhlaWdodDogaW5oZXJpdDsgfVxyXG4gICAgICAgIC5tYXAtY29udGFpbmVyLWlubmVyIGRpdiB7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IH1cclxuICAgICAgICAubWFwLWNvbnRlbnQgeyBkaXNwbGF5Om5vbmU7IH1cclxuICAgIGBdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfbG9uZ2l0dWRlID0gMDtcclxuICAgIHByaXZhdGUgX2xhdGl0dWRlID0gMDtcclxuICAgIHByaXZhdGUgX3pvb20gPSAwO1xyXG4gICAgcHJpdmF0ZSBfY2xpY2tUaW1lb3V0OiBudW1iZXIgfCBOb2RlSlMuVGltZXI7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBJTWFwT3B0aW9ucyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfYm94OiBJQm94ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX21hcFByb21pc2U6IFByb21pc2U8dm9pZD47XHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1hcC1jb250YWluZXInKSBwdWJsaWMgX2NvbnRhaW5lckNsYXNzID0gdHJ1ZTtcclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIHByaXZhdGUgX2NvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWFwTWFya2VyRGlyZWN0aXZlKSBwcml2YXRlIF9tYXJrZXJzOiBBcnJheTxNYXBNYXJrZXJEaXJlY3RpdmU+O1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgb3Igc2V0cyB0aGUgbWF4aW11bSBhbmQgbWluaW11bSBib3VuZGluZyBib3ggZm9yIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IEJveCgpOiBJQm94IHsgcmV0dXJuIHRoaXMuX2JveDsgfVxyXG4gICAgcHVibGljIHNldCBCb3godmFsOiBJQm94KSB7IHRoaXMuX2JveCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBsYXRpdHVkZSB0aGF0IHNldHMgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgTGF0aXR1ZGUoKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvbmdpdHVkZTsgfVxyXG4gICAgcHVibGljIHNldCBMYXRpdHVkZSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSB0aGlzLkNvbnZlcnRUb0RlY2ltYWwodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGxvbmdpdHVkZSB0aGF0IHNldHMgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgTG9uZ2l0dWRlKCk6IG51bWJlciB8IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb25naXR1ZGU7IH1cclxuICAgIHB1YmxpYyBzZXQgTG9uZ2l0dWRlKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSB0aGlzLkNvbnZlcnRUb0RlY2ltYWwodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgZ2VuZXJhbCBtYXAgT3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgT3B0aW9ucygpOiBJTWFwT3B0aW9ucyB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XHJcbiAgICBwdWJsaWMgc2V0IE9wdGlvbnModmFsOiBJTWFwT3B0aW9ucykgeyB0aGlzLl9vcHRpb25zID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgYDhgLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgWm9vbSgpOiBudW1iZXIgfCBzdHJpbmcgeyByZXR1cm4gdGhpcy5fem9vbTsgfVxyXG4gICAgcHVibGljIHNldCBab29tKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl96b29tID0gdGhpcy5Db252ZXJ0VG9EZWNpbWFsKHZhbHVlLCA4KTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3pvb20gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0Wm9vbSh0aGlzLl96b29tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGJvdW5kaW5nIGJveCBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBCb3VuZHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJQm94PiA9IG5ldyBFdmVudEVtaXR0ZXI8SUJveD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgY2VudGVyIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIENlbnRlckNoYW5nZTogRXZlbnRFbWl0dGVyPElMYXRMb25nPiA9IG5ldyBFdmVudEVtaXR0ZXI8SUxhdExvbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrIG9uIGFcclxuICAgICAqIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciByaWdodC1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xyXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcE1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBNb3VzZU91dDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBNb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBzZXJ2aWNlIGlzIGF2YWlsYWJsZSBhbmQgdGhlIG1hcHMgaGFzIGJlZW5cclxuICAgICAqIEluaXRpYWxpemVkIChidXQgbm90IG5lY2Vzc2FyaWx5IGNyZWF0ZWQpLiBJdCBjb250YWlucyBhIFByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgcmV0dXJuc1xyXG4gICAgICogdGhlIG1haW4gbWFwIG9iamVjdCBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwUHJvbWlzZTogRXZlbnRFbWl0dGVyPFByb21pc2U8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyPFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1paXRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgem9vbSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIFpvb21DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOdW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxOdW1iZXI+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIHNlcnZpY2UgaXMgYXZhaWxhYmxlIGFuZCB0aGUgbWFwcyBoYXMgYmVlblxyXG4gICAgICogSW5pdGlhbGl6ZWRcclxuICAgICAqIEBtZW1iZXJPZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBTZXJ2aWNlOiBFdmVudEVtaXR0ZXI8TWFwU2VydmljZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFNlcnZpY2U+KCk7XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwQ29tcG9uZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZXRlZCBpbXBsZW1lbnRhdGlvbiBvZiBhIG1hcCBzZXJ2aWNlIGZvciB0aGUgdW5kZXJseWluZyBtYXBzIGltcGxlbWVudGF0aW9ucy5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIENvbXBvbmVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLk1hcFByb21pc2UuZW1pdCh0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UpO1xyXG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5lbWl0KHRoaXMuX21hcFNlcnZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIEFuZ3VsYXIgaGFzIGZ1bGx5IGluaXRpYWxpemVkIGEgY29tcG9uZW50J3Mgdmlldy4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5Jbml0TWFwSW5zdGFuY2UodGhpcy5fY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gY2hhbmdlcyB0byB0aGUgZGF0YWJvdWQgcHJvcGVydGllcyBvY2N1ci4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBDaGFuZ2VzIHRoYXQgaGF2ZSBvY2N1cmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzWydCb3gnXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2JveCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TZXRWaWV3T3B0aW9ucyg8SU1hcE9wdGlvbnM+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZHM6IHRoaXMuX2JveFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzWydPcHRpb25zJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0TWFwT3B0aW9ucyh0aGlzLl9vcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkRpc3Bvc2VNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXJzIGEgcmVzaXplIGV2ZW50IG9uIHRoZSBtYXAgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBnZXRzIHJlc29sdmVkIGFmdGVyIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIFRyaWdnZXJSZXNpemUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gTm90ZTogV2hlbiB3ZSB3b3VsZCB0cmlnZ2VyIHRoZSByZXNpemUgZXZlbnQgYW5kIHNob3cgdGhlIG1hcCBpbiB0aGUgc2FtZSB0dXJuICh3aGljaCBpcyBhXHJcbiAgICAgICAgLy8gY29tbW9uIGNhc2UgZm9yIHRyaWdnZXJpbmcgYSByZXNpemUgZXZlbnQpLCB0aGVuIHRoZSByZXNpemUgZXZlbnQgd291bGQgbm90XHJcbiAgICAgICAgLy8gd29yayAodG8gc2hvdyB0aGUgbWFwKSwgc28gd2UgdHJpZ2dlciB0aGUgZXZlbnQgaW4gYSB0aW1lb3V0LlxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhpcy5fbWFwU2VydmljZS5UcmlnZ2VyTWFwRXZlbnQoJ3Jlc2l6ZScpLnRoZW4oKCkgPT4gcmVzb2x2ZSgpKTsgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzLlxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIG51bWJlci1pc2ggdmFsdWUgdG8gYSBudW1iZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNvbnZlcnQuXHJcbiAgICAgKiBAcGFyYW0gW2RlZmF1bHRWYWx1ZT1udWxsXSAtIERlZmF1bHQgdmFsdWUgdG8gdXNlIGlmIHRoZSBjb252ZXJzaW9uIGNhbm5vdCBiZSBwZXJmb3JtZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIENvbnZlcnRlZCBudW1iZXIgb2YgdGhlIGRlZmF1bHQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIENvbnZlcnRUb0RlY2ltYWwodmFsdWU6IHN0cmluZyB8IG51bWJlciwgZGVmYXVsdFZhbHVlOiBudW1iZXIgPSBudWxsKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8bnVtYmVyPnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgdGhlIG1hcCBjbGljayBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEhhbmRsZU1hcENsaWNrRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdjbGljaycpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3Nhcnkgc2luY2UgYmluZyB3aWxsIHRyZWF0IGEgZG91YmxlY2xpY2sgZmlyc3QgYXMgdHdvIGNsaWNrcy4uLidcclxuICAgICAgICAgICAgLy8vXHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYXBDbGljay5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdkYmxjbGljaycpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NsaWNrVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KDxOb2RlSlMuVGltZXI+dGhpcy5fY2xpY2tUaW1lb3V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1hcERibENsaWNrLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ3JpZ2h0Y2xpY2snKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFwUmlnaHRDbGljay5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdtb3VzZW92ZXInKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFwTW91c2VPdmVyLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ21vdXNlb3V0Jykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLk1hcE1vdXNlT3V0LmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ21vdXNlbW92ZScpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5NYXBNb3VzZU1vdmUuZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIG1hcCBjZW50ZXIgY2hhbmdlIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGFuZGxlTWFwQm91bmRzQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignYm91bmRzY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Qm91bmRzKCkudGhlbigoYm91bmRzOiBJQm94KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJvdW5kc0NoYW5nZS5lbWl0KGJvdW5kcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgbWFwIGNlbnRlciBjaGFuZ2UgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBIYW5kbGVNYXBDZW50ZXJDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdjZW50ZXJjaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRDZW50ZXIoKS50aGVuKChjZW50ZXI6IElMYXRMb25nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGF0aXR1ZGUgIT09IGNlbnRlci5sYXRpdHVkZSB8fCB0aGlzLl9sb25naXR1ZGUgIT09IGNlbnRlci5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXRpdHVkZSA9IGNlbnRlci5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSBjZW50ZXIubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2VudGVyQ2hhbmdlLmVtaXQoPElMYXRMb25nPnsgbGF0aXR1ZGU6IHRoaXMuX2xhdGl0dWRlLCBsb25naXR1ZGU6IHRoaXMuX2xvbmdpdHVkZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyBtYXAgem9vbSBjaGFuZ2UgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBIYW5kbGVNYXBab29tQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignem9vbWNoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldFpvb20oKS50aGVuKCh6OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl96b29tICE9PSB6KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9vbSA9IHo7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ab29tQ2hhbmdlLmVtaXQoeik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWwgLSBIdG1sIGVsZW1lbnRzIHdoaWNoIHdpbGwgaG9zdCB0aGUgbWFwIGNhbnZhcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSW5pdE1hcEluc3RhbmNlKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jZW50ZXIgPT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLmNlbnRlciA9IHsgbGF0aXR1ZGU6IHRoaXMuX2xhdGl0dWRlLCBsb25naXR1ZGU6IHRoaXMuX2xvbmdpdHVkZSB9OyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnpvb20gPT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLnpvb20gPSB0aGlzLl96b29tOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm1hcFR5cGVJZCA9PSBudWxsKSB7IHRoaXMuX29wdGlvbnMubWFwVHlwZUlkID0gTWFwVHlwZUlkLmh5YnJpZDsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYm94ICE9IG51bGwpIHsgdGhpcy5fb3B0aW9ucy5ib3VuZHMgPSB0aGlzLl9ib3g7IH1cclxuICAgICAgICAgICAgdGhpcy5fbWFwUHJvbWlzZSA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlTWFwKGVsLCB0aGlzLl9vcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5IYW5kbGVNYXBDZW50ZXJDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5IYW5kbGVNYXBCb3VuZHNDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5IYW5kbGVNYXBab29tQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwQ2xpY2tFdmVudHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1hcCBjZW50ZXIgYmFzZWQgb24gdGhlIGdlbyBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFVwZGF0ZUNlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2xhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5fbG9uZ2l0dWRlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0Q2VudGVyKHtcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMuX2xhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuX2xvbmdpdHVkZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBjbHVzdGVyIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBDbHVzdGVyIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIENsdXN0ZXJTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSk6IENsdXN0ZXJTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlQ2x1c3RlclNlcnZpY2UobSk7IH1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgaW5mb2JveCBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXJrZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgSW5mb0JveCBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gSW5mb0JveFNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlLFxyXG4gICAgbWE6IE1hcmtlclNlcnZpY2UpOiBJbmZvQm94U2VydmljZSB7IHJldHVybiBmLkNyZWF0ZUluZm9Cb3hTZXJ2aWNlKG0sIG1hKTsgfVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBsYXllciBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgTGF5ZXIgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIExheWVyU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UpOiBMYXllclNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGVMYXllclNlcnZpY2UobSk7IH1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgbWFwIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBNYXBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTWFwU2VydmljZUNyZWF0b3IoZjogTWFwU2VydmljZUZhY3RvcnkpOiBNYXBTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlKCk7IH1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgbWFya2VyIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gbCAtIEEge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBjIC0gQSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBNYXJrZXIgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1hcmtlclNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlLCBsOiBMYXllclNlcnZpY2UsIGM6IENsdXN0ZXJTZXJ2aWNlKTogTWFya2VyU2VydmljZSB7XHJcbiAgICByZXR1cm4gZi5DcmVhdGVNYXJrZXJTZXJ2aWNlKG0sIGwsIGMpO1xyXG59XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIHBvbHlnb24gc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBsIC0gQSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgUG9seWdvbiBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gUG9seWdvblNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlLCBsOiBMYXllclNlcnZpY2UpOiBQb2x5Z29uU2VydmljZSB7XHJcbiAgICByZXR1cm4gZi5DcmVhdGVQb2x5Z29uU2VydmljZShtLCBsKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBwb2x5bGluZSBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGwgLSBBIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBQb2x5bGluZSBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gUG9seWxpbmVTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSwgbDogTGF5ZXJTZXJ2aWNlKTogUG9seWxpbmVTZXJ2aWNlIHtcclxuICAgIHJldHVybiBmLkNyZWF0ZVBvbHlsaW5lU2VydmljZShtLCBsKTtcclxufVxyXG4iXX0=