/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
let layerId = 1000000;
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
export class MapMarkerLayerDirective {
    /**
     * Creates an instance of MapMarkerLayerDirective.
     * \@memberof MapMarkerLayerDirective
     * @param {?} _markerService - Concreate implementation of a {\@link MarkerService}.
     * @param {?} _layerService - Concreate implementation of a {\@link LayerService}.
     * @param {?} _clusterService - Concreate implementation of a {\@link ClusterService}.
     * @param {?} _mapService - Concreate implementation of a {\@link MapService}.
     * @param {?} _zone - Concreate implementation of a {\@link NgZone} service.
     *
     */
    constructor(_markerService, _layerService, _clusterService, _mapService, _zone) {
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
    /**
     * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
     * you cannot set a custom marker callback.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get CustomMarkerCallback() { return this._iconCreationCallback; }
    /**
     * @param {?} val
     * @return {?}
     */
    set CustomMarkerCallback(val) {
        if (this._useDynamicSizeMarker) {
            throw (new Error(`You cannot set a custom marker callback when UseDynamicSizeMarkers is set to true.
                    Set UseDynamicSizeMakers to false.`));
        }
        this._iconCreationCallback = val;
    }
    /**
     * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
     * See {\@link UseDynamicSizeMarkers}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get DynamicMarkerBaseSize() { return this._dynamicMarkerBaseSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set DynamicMarkerBaseSize(val) { this._dynamicMarkerBaseSize = val; }
    /**
     * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
     * The map contains key/value pairs, with the keys being
     * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {\@link UseDynamicSizeMarkers}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get DynamicMarkerRanges() { return this._dynamicMarkerRanges; }
    /**
     * @param {?} val
     * @return {?}
     */
    set DynamicMarkerRanges(val) { this._dynamicMarkerRanges = val; }
    /**
     *  IMarkerOptions array holding the marker info.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get MarkerOptions() { return this._markers; }
    /**
     * @param {?} val
     * @return {?}
     */
    set MarkerOptions(val) {
        if (this._streaming) {
            this._markersLast.push(...val.slice(0));
            this._markers.push(...val);
        }
        else {
            this._markers = val.slice(0);
        }
    }
    /**
     * Gets or sets the cluster styles
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get Styles() { return this._styles; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Styles(val) { this._styles = val; }
    /**
     * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
     * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get TreatNewMarkerOptionsAsStream() { return this._streaming; }
    /**
     * @param {?} val
     * @return {?}
     */
    set TreatNewMarkerOptionsAsStream(val) { this._streaming = val; }
    /**
     * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
     * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get UseDynamicSizeMarkers() { return this._useDynamicSizeMarker; }
    /**
     * @param {?} val
     * @return {?}
     */
    set UseDynamicSizeMarkers(val) {
        this._useDynamicSizeMarker = val;
        if (val) {
            this._iconCreationCallback = (m, info) => {
                return ClusterLayerDirective.CreateDynamicSizeMarker(m.length, info, this._dynamicMarkerBaseSize, this._dynamicMarkerRanges);
            };
        }
    }
    /**
     * Gets the id of the marker layer.
     *
     * \@readonly
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Translates a geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    LocationToPixel(loc) {
        return this._markerService.LocationToPoint(loc);
    }
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(() => {
            /** @type {?} */
            const fakeLayerDirective = {
                Id: this._id,
                Visible: this.Visible
            };
            if (!this.EnableClustering) {
                this._layerService.AddLayer(fakeLayerDirective);
                this._layerPromise = this._layerService.GetNativeLayer(fakeLayerDirective);
                this._service = this._layerService;
            }
            else {
                fakeLayerDirective.LayerOffset = this.LayerOffset;
                fakeLayerDirective.ZIndex = this.ZIndex;
                fakeLayerDirective.ClusteringEnabled = this.EnableClustering;
                fakeLayerDirective.ClusterPlacementMode = this.ClusterPlacementMode;
                fakeLayerDirective.GridSize = this.GridSize;
                fakeLayerDirective.ClusterClickAction = this.ClusterClickAction;
                fakeLayerDirective.IconInfo = this.ClusterIconInfo;
                fakeLayerDirective.CustomMarkerCallback = this.CustomMarkerCallback;
                fakeLayerDirective.UseDynamicSizeMarkers = this.UseDynamicSizeMarkers;
                this._clusterService.AddLayer(fakeLayerDirective);
                this._layerPromise = this._clusterService.GetNativeLayer(fakeLayerDirective);
                this._service = this._clusterService;
            }
            this._layerPromise.then(l => {
                l.SetVisible(this.Visible);
                if (this.MarkerOptions) {
                    this._zone.runOutsideAngular(() => this.UpdateMarkers());
                }
            });
        });
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._layerPromise.then(l => {
            l.Delete();
        });
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let shouldSetOptions = false;
        /** @type {?} */
        const o = {
            id: this._id
        };
        if (changes['MarkerOptions']) {
            this._zone.runOutsideAngular(() => {
                this.UpdateMarkers();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._zone.runOutsideAngular(() => {
                this._layerPromise.then(l => l.SetVisible(this.Visible));
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
            this._zone.runOutsideAngular(() => {
                /** @type {?} */
                const fakeLayerDirective = { Id: this._id };
                this._layerPromise.then(l => l.SetOptions(o));
            });
        }
    }
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerLayerDirective
     * @return {?} - string representation of the marker id.
     */
    toString() { return 'MapMarkerLayer-' + this._id.toString(); }
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} m - the marker for which to add the event.
     *
     * @return {?}
     */
    AddEventListeners(m) {
        m.AddListener('click', (e) => this.MarkerClick.emit({
            Marker: m,
            Click: e,
            Location: this._markerService.GetCoordinatesFromClick(e),
            Pixels: this._markerService.GetPixelsFromClick(e)
        }));
        m.AddListener('dragend', (e) => this.DragEnd.emit({
            Marker: m,
            Click: e,
            Location: this._markerService.GetCoordinatesFromClick(e),
            Pixels: this._markerService.GetPixelsFromClick(e)
        }));
    }
    /**
     * Sets or updates the markers based on the marker options. This will place the markers on the map
     * and register the associated events.
     *
     * \@memberof MapMarkerLayerDirective
     * \@method
     * @return {?}
     */
    UpdateMarkers() {
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(l => {
            /** @type {?} */
            const markers = this._streaming ? this._markersLast.splice(0) : this._markers;
            /** @type {?} */
            const mp = this._service.CreateMarkers(markers, this.IconInfo);
            // set markers once promises are fullfilled.
            mp.then(m => {
                m.forEach(marker => {
                    this.AddEventListeners(marker);
                });
                this._streaming ? l.AddEntities(m) : l.SetEntities(m);
            });
        });
    }
}
MapMarkerLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-marker-layer'
            },] },
];
/** @nocollapse */
MapMarkerLayerDirective.ctorParameters = () => [
    { type: MarkerService },
    { type: LayerService },
    { type: ClusterService },
    { type: MapService },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLW1hcmtlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL21hcC1tYXJrZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBb0QsTUFBTSxFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQVN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLeEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCdEIsTUFBTTs7Ozs7Ozs7Ozs7SUFpUEYsWUFDWSxnQkFDQSxlQUNBLGlCQUNBLGFBQ0E7UUFKQSxtQkFBYyxHQUFkLGNBQWM7UUFDZCxrQkFBYSxHQUFiLGFBQWE7UUFDYixvQkFBZSxHQUFmLGVBQWU7UUFDZixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSztxQ0E3T2UsS0FBSztzQ0FDSixFQUFFO29DQUNpQixJQUFJLEdBQUcsQ0FBaUI7WUFDeEUsQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLENBQUM7WUFDOUIsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUM7WUFDaEMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdC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LEtBQUs7b0NBVUwsS0FBSztzQkFpQkwsS0FBSztxQkFPTCxLQUFLOzBCQVFMLEtBQUs7bUNBWUwsTUFBTTswQkFPTixNQUFNO3NCQU9OLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLCBTaW1wbGVDaGFuZ2UsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLFxyXG4gICAgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElNYXJrZXJFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1ldmVudCc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBJQ2x1c3Rlckljb25JbmZvIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBDbHVzdGVyQ2xpY2tBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvY2x1c3Rlci1jbGljay1hY3Rpb24nO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcclxuaW1wb3J0IHsgQ2x1c3RlckxheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jbHVzdGVyLWxheWVyJztcclxuXHJcbi8qKlxyXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIG1hcmtlci5cclxuICovXHJcbmxldCBsYXllcklkID0gMTAwMDAwMDtcclxuXHJcbi8qKlxyXG4gKiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZSBwZXJmb3JtYW50bHkgcmVuZGVycyBhIGxhcmdlIHNldCBvZiBtYXAgbWFya2VyIGluc2lkZSBhIHtAbGluayBNYXBDb21wb25lbnR9LlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcclxuICogICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDx4LW1hcC1tYXJrZXItbGF5ZXIgW01hcmtlck9wdGlvbnNdPVwiX21hcmtlcnNcIj48L3gtbWFwLW1hcmtlci1sYXllcj5cclxuICogICA8L3gtbWFwPlxyXG4gKiBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAneC1tYXAtbWFya2VyLWxheWVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2lkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sYXllclByb21pc2U6IFByb21pc2U8TGF5ZXI+O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTGF5ZXJTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfc3R5bGVzOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPjtcclxuICAgIHByaXZhdGUgX3VzZUR5bmFtaWNTaXplTWFya2VyID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9keW5hbWljTWFya2VyQmFzZVNpemUgPSAxODtcclxuICAgIHByaXZhdGUgX2R5bmFtaWNNYXJrZXJSYW5nZXM6IE1hcDxudW1iZXIsIHN0cmluZz4gPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXHJcbiAgICAgICAgWzEwLCAncmdiYSgyMCwgMTgwLCAyMCwgMC41KSddLFxyXG4gICAgICAgIFsxMDAsICdyZ2JhKDI1NSwgMjEwLCA0MCwgMC41KSddLFxyXG4gICAgICAgIFtOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiAsICdyZ2JhKDI1NSwgNDAsIDQwLCAwLjUpJ11cclxuICAgIF0pO1xyXG4gICAgcHJpdmF0ZSBfaWNvbkNyZWF0aW9uQ2FsbGJhY2s6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZztcclxuICAgIHByaXZhdGUgX3N0cmVhbWluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbWFya2VyczogQXJyYXk8SU1hcmtlck9wdGlvbnM+ID0gbmV3IEFycmF5PElNYXJrZXJPcHRpb25zPigpO1xyXG4gICAgcHJpdmF0ZSBfbWFya2Vyc0xhc3Q6IEFycmF5PElNYXJrZXJPcHRpb25zPiA9IG5ldyBBcnJheTxJTWFya2VyT3B0aW9ucz4oKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRoZSBDbHVzdGVyIENsaWNrIEFjdGlvbiB7QGxpbmsgQ2x1c3RlckNsaWNrQWN0aW9ufS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIENsdXN0ZXJDbGlja0FjdGlvbjogQ2x1c3RlckNsaWNrQWN0aW9uID0gIENsdXN0ZXJDbGlja0FjdGlvbi5ab29tSW50b0NsdXN0ZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIEljb25JbmZvIHRvIGJlIHVzZWQgdG8gY3JlYXRlIGEgY3VzdG9tIGNsdXN0ZXIgbWFya2VyLiBTdXBwb3J0cyBmb250LWJhc2VkLCBTVkcsIGdyYXBoaWNzIGFuZCBtb3JlLlxyXG4gICAgICogU2VlIHtAbGluayBJTWFya2VySWNvbkluZm99LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgQ2x1c3Rlckljb25JbmZvOiBJTWFya2VySWNvbkluZm87XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNsdXN0ZXIgcGxhY2VtZW50IG1vZGUuIHtAbGluayBDbHVzdGVyUGxhY2VtZW50TW9kZX1cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgIHB1YmxpYyBDbHVzdGVyUGxhY2VtZW50TW9kZTogQ2x1c3RlclBsYWNlbWVudE1vZGUgPSBDbHVzdGVyUGxhY2VtZW50TW9kZS5NZWFuVmFsdWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNhbGxiYWNrIGludm9rZWQgdG8gY3JlYXRlIGEgY3VzdG9tIGNsdXN0ZXIgbWFya2VyLiBOb3RlIHRoYXQgd2hlbiB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfSBpcyBlbmFibGVkLFxyXG4gICAgICogeW91IGNhbm5vdCBzZXQgYSBjdXN0b20gbWFya2VyIGNhbGxiYWNrLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VzdG9tTWFya2VyQ2FsbGJhY2soKTogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nICB7IHJldHVybiB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjazsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VzdG9tTWFya2VyQ2FsbGJhY2sodmFsOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyhcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoYFlvdSBjYW5ub3Qgc2V0IGEgY3VzdG9tIG1hcmtlciBjYWxsYmFjayB3aGVuIFVzZUR5bmFtaWNTaXplTWFya2VycyBpcyBzZXQgdG8gdHJ1ZS5cclxuICAgICAgICAgICAgICAgICAgICBTZXQgVXNlRHluYW1pY1NpemVNYWtlcnMgdG8gZmFsc2UuYClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2sgPSB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBiYXNlIHNpemUgb2YgZHluYW1pYyBtYXJrZXJzIGluIHBpeGVscy4gVGhlIGFjdHVhbHkgc2l6ZSBvZiB0aGUgZHluYW1pYyBtYXJrZXIgaXMgYmFzZWQgb24gdGhpcy5cclxuICAgICAqIFNlZSB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBEeW5hbWljTWFya2VyQmFzZVNpemUoKTogbnVtYmVyICB7IHJldHVybiB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IER5bmFtaWNNYXJrZXJCYXNlU2l6ZSh2YWw6IG51bWJlcikgeyB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgcmFuZ2VzIHRvIHVzZSB0byBjYWxjdWxhdGUgYnJlYWtwb2ludHMgYW5kIGNvbG9ycyBmb3IgZHluYW1pYyBtYXJrZXJzLlxyXG4gICAgICogVGhlIG1hcCBjb250YWlucyBrZXkvdmFsdWUgcGFpcnMsIHdpdGggdGhlIGtleXMgYmVpbmdcclxuICAgICAqIHRoZSBicmVha3BvaW50IHNpemVzIGFuZCB0aGUgdmFsdWVzIHRoZSBjb2xvcnMgdG8gYmUgdXNlZCBmb3IgdGhlIGR5bmFtaWMgbWFya2VyIGluIHRoYXQgcmFuZ2UuIFNlZSB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBEeW5hbWljTWFya2VyUmFuZ2VzKCk6IE1hcDxudW1iZXIsIHN0cmluZz4gIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IER5bmFtaWNNYXJrZXJSYW5nZXModmFsOiBNYXA8bnVtYmVyLCBzdHJpbmc+KSB7IHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXMgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgbGF5ZXIgY2x1c3RlcnMuIFRoaXMgcHJvcGVydHkgY2FuIG9ubHkgYmUgc2V0IG9uIGNyZWF0aW9uIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEVuYWJsZUNsdXN0ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZ3JpZCBzaXplIHRvIGJlIHVzZWQgZm9yIGNsdXN0ZXJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBHcmlkU2l6ZTogbnVtYmVyID0gMTUwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBJY29uSW5mbyB0byBiZSB1c2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBtYXJrZXIgaW1hZ2VzLiBTdXBwb3J0cyBmb250LWJhc2VkLCBTVkcsIGdyYXBoaWNzIGFuZCBtb3JlLlxyXG4gICAgICogU2VlIHtAbGluayBJTWFya2VySWNvbkluZm99LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgSWNvbkluZm86IElNYXJrZXJJY29uSW5mbztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyBBbiBvZmZzZXQgYXBwbGllZCB0byB0aGUgcG9zaXRpb25pbmcgb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGF5ZXJPZmZzZXQ6IElQb2ludCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgSU1hcmtlck9wdGlvbnMgYXJyYXkgaG9sZGluZyB0aGUgbWFya2VyIGluZm8uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBNYXJrZXJPcHRpb25zKCk6IEFycmF5PElNYXJrZXJPcHRpb25zPiB7IHJldHVybiB0aGlzLl9tYXJrZXJzOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBNYXJrZXJPcHRpb25zKHZhbDogQXJyYXk8SU1hcmtlck9wdGlvbnM+KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdHJlYW1pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnNMYXN0LnB1c2goLi4udmFsLnNsaWNlKDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaCguLi52YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VycyA9IHZhbC5zbGljZSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2x1c3RlciBzdHlsZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFN0eWxlcygpOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPiB7IHJldHVybiB0aGlzLl9zdHlsZXM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFN0eWxlcyh2YWw6IEFycmF5PElDbHVzdGVySWNvbkluZm8+KSB7IHRoaXMuX3N0eWxlcyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRvIHRyZWF0IGNoYW5nZXMgaW4gdGhlIE1hcmtlck9wdGlvbnMgYXMgc3RyZWFtcyBvZiBuZXcgbWFya2Vycy4gSW4gdGhzaSBtb2RlLCBjaGFuZ2luZyB0aGVcclxuICAgICAqIEFycmF5IHN1cHBsaWVkIGluIE1hcmtlck9wdGlvbnMgd2lsbCBiZSBpbmNyZW1lbnRhbGx5IGRyYXduIG9uIHRoZSBtYXAgYXMgb3Bwb3NlZCB0byByZXBsYWNlIHRoZSBtYXJrZXJzIG9uIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBUcmVhdE5ld01hcmtlck9wdGlvbnNBc1N0cmVhbSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0cmVhbWluZzsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgVHJlYXROZXdNYXJrZXJPcHRpb25zQXNTdHJlYW0odmFsOiBib29sZWFuKSB7IHRoaXMuX3N0cmVhbWluZyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gdXNlIGR5bmFtaWMgbWFya2Vycy4gRHluYW1pYyBtYXJrZXJzIGNoYW5nZSBpbiBzaXplIGFuZCBjb2xvciBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZlxyXG4gICAgICogcGlucyBpbiB0aGUgY2x1c3Rlci4gSWYgc2V0IHRvIHRydWUsIHRoaXMgd2lsbCB0YWtlIHByZWNlbmRlbmNlIG92ZXIgYW55IGN1c3RvbSBtYXJrZXIgY3JlYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBVc2VEeW5hbWljU2l6ZU1hcmtlcnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlcjsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgVXNlRHluYW1pY1NpemVNYXJrZXJzKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlciA9IHZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2sgPSAobTogQXJyYXk8TWFya2VyPiwgaW5mbzogSU1hcmtlckljb25JbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENsdXN0ZXJMYXllckRpcmVjdGl2ZS5DcmVhdGVEeW5hbWljU2l6ZU1hcmtlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgbS5sZW5ndGgsIGluZm8sIHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSwgdGhpcy5fZHluYW1pY01hcmtlclJhbmdlcyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWFya2VyIGxheWVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB6LWluZGV4IG9mIHRoZSBsYXllci4gSWYgbm90IHVzZWQsIGxheWVycyBnZXQgc3RhY2tlZCBpbiB0aGUgb3JkZXIgY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFpJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoZSBjbHVzdGVyIHNob3VsZCB6b29tIGluIG9uIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFpvb21PbkNsaWNrOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRGVsZWdhdGVzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgZHluYW1pYyBpY29uIGZvciBhIG1hcmtlciBpcyBiZWluZyBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIER5bmFtaWNNYXJrZXJDcmVhdGVkOiBFdmVudEVtaXR0ZXI8SU1hcmtlckljb25JbmZvPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckljb25JbmZvPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIG1hcmtlciBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgTWFya2VyQ2xpY2s6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgYSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgRHJhZ0VuZDogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGlkIG9mIHRoZSBtYXJrZXIgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlLlxyXG4gICAgICogQHBhcmFtIF9tYXJrZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcmtlclNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfY2x1c3RlclNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcFNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE5nWm9uZX0gc2VydmljZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfbWFya2VyU2VydmljZTogTWFya2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jbHVzdGVyU2VydmljZTogQ2x1c3RlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGxheWVySWQrKztcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGVzIGEgZ2VvIGxvY2F0aW9uIHRvIGEgcGl4ZWwgbG9jYXRpb24gcmVsYXRpdmUgdG8gdGhlIG1hcCB2aWV3cG9ydC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW2xvY10gLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIGFuIHtAbGluayBJUG9pbnR9IHJlcHJlc2VudGluZyB0aGUgcGl4ZWwgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvblRvUGl4ZWwobG9jOiBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlclNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KGxvYyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgQ29tcG9uZW50IGNvbnRlbnQgaW5pdGlhbGl6YXRpb24uIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgbGF5ZXJPcHRpb25zOiBJTGF5ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5faWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmYWtlTGF5ZXJEaXJlY3RpdmU6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIElkIDogdGhpcy5faWQsXHJcbiAgICAgICAgICAgICAgICBWaXNpYmxlOiB0aGlzLlZpc2libGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLkVuYWJsZUNsdXN0ZXJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5BZGRMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkxheWVyT2Zmc2V0ID0gdGhpcy5MYXllck9mZnNldDtcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5aSW5kZXggPSB0aGlzLlpJbmRleDtcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5DbHVzdGVyaW5nRW5hYmxlZCA9IHRoaXMuRW5hYmxlQ2x1c3RlcmluZztcclxuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5DbHVzdGVyUGxhY2VtZW50TW9kZSA9IHRoaXMuQ2x1c3RlclBsYWNlbWVudE1vZGU7XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuR3JpZFNpemUgPSB0aGlzLkdyaWRTaXplO1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkNsdXN0ZXJDbGlja0FjdGlvbiA9IHRoaXMuQ2x1c3RlckNsaWNrQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkljb25JbmZvID0gdGhpcy5DbHVzdGVySWNvbkluZm87XHJcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuQ3VzdG9tTWFya2VyQ2FsbGJhY2sgPSB0aGlzLkN1c3RvbU1hcmtlckNhbGxiYWNrO1xyXG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLlVzZUR5bmFtaWNTaXplTWFya2VycyA9IHRoaXMuVXNlRHluYW1pY1NpemVNYXJrZXJzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2x1c3RlclNlcnZpY2UuQWRkTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSA9IHRoaXMuX2NsdXN0ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gdGhpcy5fY2x1c3RlclNlcnZpY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsLlNldFZpc2libGUodGhpcy5WaXNpYmxlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLk1hcmtlck9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuVXBkYXRlTWFya2VycygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgIGwuRGVsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgdG8gY2hhbmdlcyBpbiBkYXRhLWJvdW5kIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudCBhbmQgYWN0dWF0ZXMgcHJvcGVydHkgY2hhbmdlcyBpbiB0aGUgdW5kZXJsaW5nIGxheWVyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xyXG4gICAgICAgIGxldCBzaG91bGRTZXRPcHRpb25zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgbzogSUNsdXN0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5faWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydNYXJrZXJPcHRpb25zJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZU1hcmtlcnMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10gJiYgIWNoYW5nZXNbJ1Zpc2libGUnXS5maXJzdENoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4gbC5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0VuYWJsZUNsdXN0ZXJpbmcnXSAmJiAhY2hhbmdlc1snRW5hYmxlQ2x1c3RlcmluZyddLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgIGlmICgnU3RvcENsdXN0ZXJpbmcnIGluIHRoaXMuX3NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgIG8uY2x1c3RlcmluZ0VuYWJsZWQgPSB0aGlzLkVuYWJsZUNsdXN0ZXJpbmc7XHJcbiAgICAgICAgICAgICAgICBzaG91bGRTZXRPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2hhbmdlIEVuYWJsZUNsdXN0ZXJpbmcgYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGNyZWF0ZWQuJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydDbHVzdGVyUGxhY2VtZW50TW9kZSddICYmICFjaGFuZ2VzWydDbHVzdGVyUGxhY2VtZW50TW9kZSddLmZpcnN0Q2hhbmdlICYmICdTdG9wQ2x1c3RlcmluZycgaW4gdGhpcy5fc2VydmljZSkge1xyXG4gICAgICAgICAgICBvLnBsYWNlbWVudE1vZGUgPSB0aGlzLkNsdXN0ZXJQbGFjZW1lbnRNb2RlO1xyXG4gICAgICAgICAgICBzaG91bGRTZXRPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0dyaWRTaXplJ10gJiYgIWNoYW5nZXNbJ0dyaWRTaXplJ10uZmlyc3RDaGFuZ2UgJiYgJ1N0b3BDbHVzdGVyaW5nJyBpbiB0aGlzLl9zZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIG8uZ3JpZFNpemUgPSB0aGlzLkdyaWRTaXplO1xyXG4gICAgICAgICAgICBzaG91bGRTZXRPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJDbGlja0FjdGlvbiddICYmICFjaGFuZ2VzWydDbHVzdGVyQ2xpY2tBY3Rpb24nXS5maXJzdENoYW5nZSAmJiAnU3RvcENsdXN0ZXJpbmcnIGluIHRoaXMuX3NlcnZpY2UpIHtcclxuICAgICAgICAgICAgby56b29tT25DbGljayA9IHRoaXMuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyO1xyXG4gICAgICAgICAgICBzaG91bGRTZXRPcHRpb25zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChjaGFuZ2VzWydaSW5kZXgnXSAmJiAhY2hhbmdlc1snWkluZGV4J10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYXllck9mZnNldCddICYmICFjaGFuZ2VzWydMYXllck9mZnNldCddLmZpcnN0Q2hhbmdlKSB8fFxyXG4gICAgICAgICAgICAoY2hhbmdlc1snSWNvbkluZm8nXSAmJiAhY2hhbmdlc1snSWNvbkluZm8nXS5maXJzdENoYW5nZSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignWW91IGNhbm5vdCBjaGFuZ2UgWkluZGV4IG9yIExheWVyT2Zmc2V0IGFmdGVyIHRoZSBsYXllciBoYXMgYmVlbiBjcmVhdGVkLicpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaG91bGRTZXRPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFrZUxheWVyRGlyZWN0aXZlOiBhbnkgPSB7SWQgOiB0aGlzLl9pZH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IGwuU2V0T3B0aW9ucyhvKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIE1hcmtlciBJZC5cclxuICAgICAqIEByZXR1cm5zIC0gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXJrZXIgaWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnTWFwTWFya2VyTGF5ZXItJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB2YXJpb3VzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbSAtIHRoZSBtYXJrZXIgZm9yIHdoaWNoIHRvIGFkZCB0aGUgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQWRkRXZlbnRMaXN0ZW5lcnMobTogTWFya2VyKTogdm9pZCB7XHJcbiAgICAgICAgbS5BZGRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5NYXJrZXJDbGljay5lbWl0KHtcclxuICAgICAgICAgICAgICAgIE1hcmtlcjogbSxcclxuICAgICAgICAgICAgICAgIENsaWNrOiBlLFxyXG4gICAgICAgICAgICAgICAgTG9jYXRpb246IHRoaXMuX21hcmtlclNlcnZpY2UuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZSksXHJcbiAgICAgICAgICAgICAgICBQaXhlbHM6IHRoaXMuX21hcmtlclNlcnZpY2UuR2V0UGl4ZWxzRnJvbUNsaWNrKGUpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICBtLkFkZExpc3RlbmVyKCdkcmFnZW5kJywgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMuRHJhZ0VuZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgIE1hcmtlcjogbSxcclxuICAgICAgICAgICAgICAgIENsaWNrOiBlLFxyXG4gICAgICAgICAgICAgICAgTG9jYXRpb246IHRoaXMuX21hcmtlclNlcnZpY2UuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZSksXHJcbiAgICAgICAgICAgICAgICBQaXhlbHM6IHRoaXMuX21hcmtlclNlcnZpY2UuR2V0UGl4ZWxzRnJvbUNsaWNrKGUpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgb3IgdXBkYXRlcyB0aGUgbWFya2VycyBiYXNlZCBvbiB0aGUgbWFya2VyIG9wdGlvbnMuIFRoaXMgd2lsbCBwbGFjZSB0aGUgbWFya2VycyBvbiB0aGUgbWFwXHJcbiAgICAgKiBhbmQgcmVnaXN0ZXIgdGhlIGFzc29jaWF0ZWQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFVwZGF0ZU1hcmtlcnMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyUHJvbWlzZSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtYXJrZXJzOiBBcnJheTxJTWFya2VyT3B0aW9ucz4gPSB0aGlzLl9zdHJlYW1pbmcgPyB0aGlzLl9tYXJrZXJzTGFzdC5zcGxpY2UoMCkgOiB0aGlzLl9tYXJrZXJzO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgdGhlIHByb21pc2UgZm9yIHRoZSBtYXJrZXJzXHJcbiAgICAgICAgICAgIGNvbnN0IG1wOiBQcm9taXNlPEFycmF5PE1hcmtlcj4+ID0gdGhpcy5fc2VydmljZS5DcmVhdGVNYXJrZXJzKG1hcmtlcnMsIHRoaXMuSWNvbkluZm8pO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IG1hcmtlcnMgb25jZSBwcm9taXNlcyBhcmUgZnVsbGZpbGxlZC5cclxuICAgICAgICAgICAgbXAudGhlbihtID0+IHtcclxuICAgICAgICAgICAgICAgIG0uZm9yRWFjaChtYXJrZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLkFkZEV2ZW50TGlzdGVuZXJzKG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0cmVhbWluZyA/IGwuQWRkRW50aXRpZXMobSkgOiBsLlNldEVudGl0aWVzKG0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19