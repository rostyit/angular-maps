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
export class MapComponent {
    /**
     * Creates an instance of MapComponent.
     *
     * \@memberof MapComponent
     * @param {?} _mapService - Concreted implementation of a map service for the underlying maps implementations.
     *                                   Generally provided via injections.
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
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
    /**
     * Get or sets the maximum and minimum bounding box for map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Box() { return this._box; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Box(val) { this._box = val; }
    /**
     * Gets or sets the latitude that sets the center of the map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Latitude() { return this._longitude; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Latitude(value) {
        this._latitude = this.ConvertToDecimal(value);
        this.UpdateCenter();
    }
    /**
     * Gets or sets the longitude that sets the center of the map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Longitude() { return this._longitude; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Longitude(value) {
        this._longitude = this.ConvertToDecimal(value);
        this.UpdateCenter();
    }
    /**
     * Gets or sets general map Options
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Options() { return this._options; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Options(val) { this._options = val; }
    /**
     * Gets or sets the zoom level of the map. The default value is `8`.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Zoom() { return this._zoom; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Zoom(value) {
        this._zoom = this.ConvertToDecimal(value, 8);
        if (typeof this._zoom === 'number') {
            this._mapService.SetZoom(this._zoom);
        }
    }
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    ngOnInit() {
        this.MapPromise.emit(this._mapService.MapPromise);
        this.MapService.emit(this._mapService);
    }
    /**
     * Called after Angular has fully initialized a component's view. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    ngAfterViewInit() {
        this.InitMapInstance(this._container.nativeElement);
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    ngOnDestroy() {
        this._mapService.DisposeMap();
    }
    /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    TriggerResize() {
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise((resolve) => {
            setTimeout(() => { return this._mapService.TriggerMapEvent('resize').then(() => resolve()); });
        });
    }
    /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    ConvertToDecimal(value, defaultValue = null) {
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        else if (typeof value === 'number') {
            return /** @type {?} */ (value);
        }
        return defaultValue;
    }
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapClickEvents() {
        this._mapService.SubscribeToMapEvent('click').subscribe(e => {
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            this._clickTimeout = setTimeout(() => {
                this.MapClick.emit(/** @type {?} */ (e));
            }, 300);
        });
        this._mapService.SubscribeToMapEvent('dblclick').subscribe(e => {
            if (this._clickTimeout) {
                clearTimeout(/** @type {?} */ (this._clickTimeout));
            }
            this.MapDblClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('rightclick').subscribe(e => {
            this.MapRightClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseover').subscribe(e => {
            this.MapMouseOver.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseout').subscribe(e => {
            this.MapMouseOut.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mousemove').subscribe(e => {
            this.MapMouseMove.emit(/** @type {?} */ (e));
        });
    }
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapBoundsChange() {
        this._mapService.SubscribeToMapEvent('boundschanged').subscribe(() => {
            this._mapService.GetBounds().then((bounds) => {
                this.BoundsChange.emit(bounds);
            });
        });
    }
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapCenterChange() {
        this._mapService.SubscribeToMapEvent('centerchanged').subscribe(() => {
            this._mapService.GetCenter().then((center) => {
                if (this._latitude !== center.latitude || this._longitude !== center.longitude) {
                    this._latitude = center.latitude;
                    this._longitude = center.longitude;
                    this.CenterChange.emit(/** @type {?} */ ({ latitude: this._latitude, longitude: this._longitude }));
                }
            });
        });
    }
    /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapZoomChange() {
        this._mapService.SubscribeToMapEvent('zoomchanged').subscribe(() => {
            this._mapService.GetZoom().then((z) => {
                if (this._zoom !== z) {
                    this._zoom = z;
                    this.ZoomChange.emit(z);
                }
            });
        });
    }
    /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    InitMapInstance(el) {
        this._zone.runOutsideAngular(() => {
            if (this._options.center == null) {
                this._options.center = { latitude: this._latitude, longitude: this._longitude };
            }
            if (this._options.zoom == null) {
                this._options.zoom = this._zoom;
            }
            if (this._options.mapTypeId == null) {
                this._options.mapTypeId = MapTypeId.hybrid;
            }
            if (this._box != null) {
                this._options.bounds = this._box;
            }
            this._mapPromise = this._mapService.CreateMap(el, this._options);
            this.HandleMapCenterChange();
            this.HandleMapBoundsChange();
            this.HandleMapZoomChange();
            this.HandleMapClickEvents();
        });
    }
    /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    UpdateCenter() {
        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
            return;
        }
        this._mapService.SetCenter({
            latitude: this._latitude,
            longitude: this._longitude,
        });
    }
}
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
                template: `
        <div #container class='map-container-inner'></div>
        <div class='map-content'>
            <ng-content></ng-content>
        </div>
    `,
                styles: [`
        .map-container-inner { width: inherit; height: inherit; }
        .map-container-inner div { background-repeat: no-repeat; }
        .map-content { display:none; }
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MapComponent.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFLWixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcURsRCxNQUFNOzs7Ozs7Ozs7SUF3TEYsWUFBb0IsV0FBdUIsRUFBVSxLQUFhO1FBQTlDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTswQkFuTDdDLENBQUM7eUJBQ0YsQ0FBQztxQkFDTCxDQUFDO3dCQUVlLEVBQUU7b0JBQ2IsSUFBSTsrQkFFb0MsSUFBSTs7Ozs7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ckUsRUFBaUIsSUFBb0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7OztBQVdoRixNQUFNLDhCQUE4QixDQUFvQixFQUFFLENBQWEsSUFBa0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7Ozs7Ozs7QUFVMUgsTUFBTSw0QkFBNEIsQ0FBb0IsSUFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7QUFhMUYsTUFBTSwrQkFBK0IsQ0FBb0IsRUFBRSxDQUFhLEVBQUUsQ0FBZSxFQUFFLENBQWlCO0lBQ3hHLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN6Qzs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLGdDQUFnQyxDQUFvQixFQUFFLENBQWEsRUFBRSxDQUFlO0lBQ3RGLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDOzs7Ozs7Ozs7OztBQVlELE1BQU0saUNBQWlDLENBQW9CLEVBQUUsQ0FBYSxFQUFFLENBQWU7SUFDdkYsTUFBTSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgU2ltcGxlQ2hhbmdlLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgQ29udGVudENoaWxkcmVuLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgSG9zdEJpbmRpbmcsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgTmdab25lLFxyXHJcbiAgICBBZnRlclZpZXdJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcHNlcnZpY2VmYWN0b3J5JztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbmZvYm94LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9seWdvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wb2x5bGluZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pYm94JztcclxuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4uL21vZGVscy9tYXAtdHlwZS1pZCc7XHJcbmltcG9ydCB7IE1hcE1hcmtlckRpcmVjdGl2ZSB9IGZyb20gJy4vbWFwLW1hcmtlcic7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhIG1hcCBiYXNlZCBvbiBhIGdpdmVuIHByb3ZpZGVyLlxyXG4gKiAqKkltcG9ydGFudCBub3RlKio6IFRvIGJlIGFibGUgc2VlIGEgbWFwIGluIHRoZSBicm93c2VyLCB5b3UgaGF2ZSB0byBkZWZpbmUgYSBoZWlnaHQgZm9yIHRoZSBDU1NcclxuICogY2xhc3MgYG1hcC1jb250YWluZXJgLlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnR9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgICAubWFwLWNvbnRhaW5lciB7IGhlaWdodDogMzAwcHg7IH1cclxuICogYF0sXHJcbiAqICB0ZW1wbGF0ZTogYFxyXG4gKiAgICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPjwveC1tYXA+XHJcbiAqICBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAneC1tYXAnLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBNYXBTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnldLCB1c2VGYWN0b3J5OiBNYXBTZXJ2aWNlQ3JlYXRvciB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogTWFya2VyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2UsIENsdXN0ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogTWFya2VyU2VydmljZUZhY3RvcnkgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IEluZm9Cb3hTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBNYXJrZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogSW5mb0JveFNlcnZpY2VGYWN0b3J5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IExheWVyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlXSwgdXNlRmFjdG9yeTogTGF5ZXJTZXJ2aWNlRmFjdG9yeSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogQ2x1c3RlclNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZV0sIHVzZUZhY3Rvcnk6IENsdXN0ZXJTZXJ2aWNlRmFjdG9yeSB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogUG9seWdvblNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSwgTGF5ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogUG9seWdvblNlcnZpY2VGYWN0b3J5IH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBQb2x5bGluZVNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSwgTGF5ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogUG9seWxpbmVTZXJ2aWNlRmFjdG9yeSB9XHJcbiAgICBdLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICNjb250YWluZXIgY2xhc3M9J21hcC1jb250YWluZXItaW5uZXInPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9J21hcC1jb250ZW50Jz5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAubWFwLWNvbnRhaW5lci1pbm5lciB7IHdpZHRoOiBpbmhlcml0OyBoZWlnaHQ6IGluaGVyaXQ7IH1cclxuICAgICAgICAubWFwLWNvbnRhaW5lci1pbm5lciBkaXYgeyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyB9XHJcbiAgICAgICAgLm1hcC1jb250ZW50IHsgZGlzcGxheTpub25lOyB9XHJcbiAgICBgXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2xvbmdpdHVkZSA9IDA7XHJcbiAgICBwcml2YXRlIF9sYXRpdHVkZSA9IDA7XHJcbiAgICBwcml2YXRlIF96b29tID0gMDtcclxuICAgIHByaXZhdGUgX2NsaWNrVGltZW91dDogbnVtYmVyIHwgTm9kZUpTLlRpbWVyO1xyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogSU1hcE9wdGlvbnMgPSB7fTtcclxuICAgIHByaXZhdGUgX2JveDogSUJveCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tYXBQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXAtY29udGFpbmVyJykgcHVibGljIF9jb250YWluZXJDbGFzcyA9IHRydWU7XHJcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBwcml2YXRlIF9jb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgICBAQ29udGVudENoaWxkcmVuKE1hcE1hcmtlckRpcmVjdGl2ZSkgcHJpdmF0ZSBfbWFya2VyczogQXJyYXk8TWFwTWFya2VyRGlyZWN0aXZlPjtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG9yIHNldHMgdGhlIG1heGltdW0gYW5kIG1pbmltdW0gYm91bmRpbmcgYm94IGZvciBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBCb3goKTogSUJveCB7IHJldHVybiB0aGlzLl9ib3g7IH1cclxuICAgIHB1YmxpYyBzZXQgQm94KHZhbDogSUJveCkgeyB0aGlzLl9ib3ggPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbGF0aXR1ZGUgdGhhdCBzZXRzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IExhdGl0dWRlKCk6IG51bWJlciB8IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb25naXR1ZGU7IH1cclxuICAgIHB1YmxpYyBzZXQgTGF0aXR1ZGUodmFsdWU6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2xhdGl0dWRlID0gdGhpcy5Db252ZXJ0VG9EZWNpbWFsKHZhbHVlKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNlbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBsb25naXR1ZGUgdGhhdCBzZXRzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IExvbmdpdHVkZSgpOiBudW1iZXIgfCBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9uZ2l0dWRlOyB9XHJcbiAgICBwdWJsaWMgc2V0IExvbmdpdHVkZSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gdGhpcy5Db252ZXJ0VG9EZWNpbWFsKHZhbHVlKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNlbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIGdlbmVyYWwgbWFwIE9wdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IE9wdGlvbnMoKTogSU1hcE9wdGlvbnMgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxyXG4gICAgcHVibGljIHNldCBPcHRpb25zKHZhbDogSU1hcE9wdGlvbnMpIHsgdGhpcy5fb3B0aW9ucyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGA4YC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZ2V0IFpvb20oKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3pvb207IH1cclxuICAgIHB1YmxpYyBzZXQgWm9vbSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fem9vbSA9IHRoaXMuQ29udmVydFRvRGVjaW1hbCh2YWx1ZSwgOCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl96b29tID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldFpvb20odGhpcy5fem9vbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBib3VuZGluZyBib3ggY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgQm91bmRzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SUJveD4gPSBuZXcgRXZlbnRFbWl0dGVyPElCb3g+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGNlbnRlciBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBDZW50ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJTGF0TG9uZz4gPSBuZXcgRXZlbnRFbWl0dGVyPElMYXRMb25nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGljayBvbiBhXHJcbiAgICAgKiBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xyXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcERibENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgcmlnaHQtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcclxuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBNYXBNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXHJcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgc2VydmljZSBpcyBhdmFpbGFibGUgYW5kIHRoZSBtYXBzIGhhcyBiZWVuXHJcbiAgICAgKiBJbml0aWFsaXplZCAoYnV0IG5vdCBuZWNlc3NhcmlseSBjcmVhdGVkKS4gSXQgY29udGFpbnMgYSBQcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIHJldHVybnNcclxuICAgICAqIHRoZSBtYWluIG1hcCBvYmplY3Qgb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIE1hcFByb21pc2U6IEV2ZW50RW1pdHRlcjxQcm9taXNlPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaWl0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIHpvb20gY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBab29tQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8TnVtYmVyPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBzZXJ2aWNlIGlzIGF2YWlsYWJsZSBhbmQgdGhlIG1hcHMgaGFzIGJlZW5cclxuICAgICAqIEluaXRpYWxpemVkXHJcbiAgICAgKiBAbWVtYmVyT2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgTWFwU2VydmljZTogRXZlbnRFbWl0dGVyPE1hcFNlcnZpY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBTZXJ2aWNlPigpO1xyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcENvbXBvbmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBtYXAgc2VydmljZSBmb3IgdGhlIHVuZGVybHlpbmcgbWFwcyBpbXBsZW1lbnRhdGlvbnMuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2VuZXJhbGx5IHByb3ZpZGVkIHZpYSBpbmplY3Rpb25zLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBDb21wb25lbnQgaW5pdGlhbGl6YXRpb24uIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5NYXBQcm9taXNlLmVtaXQodGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlKTtcclxuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuZW1pdCh0aGlzLl9tYXBTZXJ2aWNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBBbmd1bGFyIGhhcyBmdWxseSBpbml0aWFsaXplZCBhIGNvbXBvbmVudCdzIHZpZXcuIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuSW5pdE1hcEluc3RhbmNlKHRoaXMuX2NvbnRhaW5lci5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gQ2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwUHJvbWlzZSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc1snQm94J10pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ib3ggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0Vmlld09wdGlvbnMoPElNYXBPcHRpb25zPntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRzOiB0aGlzLl9ib3hcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc1snT3B0aW9ucyddKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldE1hcE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5EaXNwb3NlTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VycyBhIHJlc2l6ZSBldmVudCBvbiB0aGUgbWFwIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgZ2V0cyByZXNvbHZlZCBhZnRlciB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBUcmlnZ2VyUmVzaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIE5vdGU6IFdoZW4gd2Ugd291bGQgdHJpZ2dlciB0aGUgcmVzaXplIGV2ZW50IGFuZCBzaG93IHRoZSBtYXAgaW4gdGhlIHNhbWUgdHVybiAod2hpY2ggaXMgYVxyXG4gICAgICAgIC8vIGNvbW1vbiBjYXNlIGZvciB0cmlnZ2VyaW5nIGEgcmVzaXplIGV2ZW50KSwgdGhlbiB0aGUgcmVzaXplIGV2ZW50IHdvdWxkIG5vdFxyXG4gICAgICAgIC8vIHdvcmsgKHRvIHNob3cgdGhlIG1hcCksIHNvIHdlIHRyaWdnZXIgdGhlIGV2ZW50IGluIGEgdGltZW91dC5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuVHJpZ2dlck1hcEV2ZW50KCdyZXNpemUnKS50aGVuKCgpID0+IHJlc29sdmUoKSk7IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kcy5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBudW1iZXItaXNoIHZhbHVlIHRvIGEgbnVtYmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxyXG4gICAgICogQHBhcmFtIFtkZWZhdWx0VmFsdWU9bnVsbF0gLSBEZWZhdWx0IHZhbHVlIHRvIHVzZSBpZiB0aGUgY29udmVyc2lvbiBjYW5ub3QgYmUgcGVyZm9ybWVkLlxyXG4gICAgICogQHJldHVybnMgLSBDb252ZXJ0ZWQgbnVtYmVyIG9mIHRoZSBkZWZhdWx0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBDb252ZXJ0VG9EZWNpbWFsKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGRlZmF1bHRWYWx1ZTogbnVtYmVyID0gbnVsbCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gPG51bWJlcj52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIHRoZSBtYXAgY2xpY2sgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBIYW5kbGVNYXBDbGlja0V2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignY2xpY2snKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IHNpbmNlIGJpbmcgd2lsbCB0cmVhdCBhIGRvdWJsZWNsaWNrIGZpcnN0IGFzIHR3byBjbGlja3MuLi4nXHJcbiAgICAgICAgICAgIC8vL1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFwQ2xpY2suZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignZGJsY2xpY2snKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jbGlja1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCg8Tm9kZUpTLlRpbWVyPnRoaXMuX2NsaWNrVGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5NYXBEYmxDbGljay5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdyaWdodGNsaWNrJykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLk1hcFJpZ2h0Q2xpY2suZW1pdCg8TW91c2VFdmVudD5lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignbW91c2VvdmVyJykuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLk1hcE1vdXNlT3Zlci5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdtb3VzZW91dCcpLnN1YnNjcmliZShlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5NYXBNb3VzZU91dC5lbWl0KDxNb3VzZUV2ZW50PmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFwTW91c2VNb3ZlLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyBtYXAgY2VudGVyIGNoYW5nZSBldmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEhhbmRsZU1hcEJvdW5kc0NoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ2JvdW5kc2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldEJvdW5kcygpLnRoZW4oKGJvdW5kczogSUJveCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Cb3VuZHNDaGFuZ2UuZW1pdChib3VuZHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIG1hcCBjZW50ZXIgY2hhbmdlIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignY2VudGVyY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Q2VudGVyKCkudGhlbigoY2VudGVyOiBJTGF0TG9uZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xhdGl0dWRlICE9PSBjZW50ZXIubGF0aXR1ZGUgfHwgdGhpcy5fbG9uZ2l0dWRlICE9PSBjZW50ZXIubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSBjZW50ZXIubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gY2VudGVyLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNlbnRlckNoYW5nZS5lbWl0KDxJTGF0TG9uZz57IGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSwgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgbWFwIHpvb20gY2hhbmdlIGV2ZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgSGFuZGxlTWFwWm9vbUNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ3pvb21jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRab29tKCkudGhlbigoejogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fem9vbSAhPT0geikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvb20gPSB6O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuWm9vbUNoYW5nZS5lbWl0KHopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVsIC0gSHRtbCBlbGVtZW50cyB3aGljaCB3aWxsIGhvc3QgdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEluaXRNYXBJbnN0YW5jZShlbDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2VudGVyID09IG51bGwpIHsgdGhpcy5fb3B0aW9ucy5jZW50ZXIgPSB7IGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSwgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUgfTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy56b29tID09IG51bGwpIHsgdGhpcy5fb3B0aW9ucy56b29tID0gdGhpcy5fem9vbTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5tYXBUeXBlSWQgPT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLm1hcFR5cGVJZCA9IE1hcFR5cGVJZC5oeWJyaWQ7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2JveCAhPSBudWxsKSB7IHRoaXMuX29wdGlvbnMuYm91bmRzID0gdGhpcy5fYm94OyB9XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFByb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZU1hcChlbCwgdGhpcy5fb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwQm91bmRzQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwWm9vbUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcENsaWNrRXZlbnRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBtYXAgY2VudGVyIGJhc2VkIG9uIHRoZSBnZW8gcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBVcGRhdGVDZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9sYXRpdHVkZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHRoaXMuX2xvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldENlbnRlcih7XHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgY2x1c3RlciBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgQ2x1c3RlciBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBDbHVzdGVyU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZSB7IHJldHVybiBmLkNyZWF0ZUNsdXN0ZXJTZXJ2aWNlKG0pOyB9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGluZm9ib3ggc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFya2VyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIEluZm9Cb3ggU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEluZm9Cb3hTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSxcclxuICAgIG1hOiBNYXJrZXJTZXJ2aWNlKTogSW5mb0JveFNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGVJbmZvQm94U2VydmljZShtLCBtYSk7IH1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgbGF5ZXIgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIExheWVyIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBMYXllclNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlKTogTGF5ZXJTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlTGF5ZXJTZXJ2aWNlKG0pOyB9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIG1hcCBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgTWFwU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1hcFNlcnZpY2VDcmVhdG9yKGY6IE1hcFNlcnZpY2VGYWN0b3J5KTogTWFwU2VydmljZSB7IHJldHVybiBmLkNyZWF0ZSgpOyB9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIG1hcmtlciBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcclxuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cclxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGwgLSBBIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gYyAtIEEge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgTWFya2VyIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNYXJrZXJTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSwgbDogTGF5ZXJTZXJ2aWNlLCBjOiBDbHVzdGVyU2VydmljZSk6IE1hcmtlclNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIGYuQ3JlYXRlTWFya2VyU2VydmljZShtLCBsLCBjKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBwb2x5Z29uIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xyXG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gbCAtIEEge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIFBvbHlnb24gU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFBvbHlnb25TZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSwgbDogTGF5ZXJTZXJ2aWNlKTogUG9seWdvblNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIGYuQ3JlYXRlUG9seWdvblNlcnZpY2UobSwgbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgcG9seWxpbmUgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XHJcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBsIC0gQSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgUG9seWxpbmUgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFBvbHlsaW5lU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsIGw6IExheWVyU2VydmljZSk6IFBvbHlsaW5lU2VydmljZSB7XHJcbiAgICByZXR1cm4gZi5DcmVhdGVQb2x5bGluZVNlcnZpY2UobSwgbCk7XHJcbn1cclxuIl19