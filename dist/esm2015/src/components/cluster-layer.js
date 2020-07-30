/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ClusterPlacementMode } from '../models/cluster-placement-mode';
import { ClusterClickAction } from '../models/cluster-click-action';
import { ClusterService } from '../services/cluster.service';
import { MapLayerDirective } from './map-layer';
/**
 *
 * Creates a cluster layer on a {\@link MapComponent}.
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
 *   <x-map [Latitude]='lat' [Longitude]='lng' [Zoom]='zoom'>
 *     <x-cluster-layer [Visible]='visible'>
 *         <x-map-marker [Latitude]='lat' [Longitude]='lng' [Label]=''M''></x-map-marker>
 *     </x-cluster-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
export class ClusterLayerDirective extends MapLayerDirective {
    /**
     * Creates an instance of ClusterLayerDirective.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} _layerService - Concreted implementation of a cluster layer service for the underlying maps
     * implementations. Generally provided via injections.
     * @param {?} _containerRef - A reference to the view container of the layer. Generally provided via injection.
     *
     */
    constructor(_layerService, _containerRef) {
        super(_layerService, _containerRef);
        this._clusteringEnabled = true;
        this._clusterPlacementMode = ClusterPlacementMode.MeanValue;
        this._clusterClickAction = ClusterClickAction.ZoomIntoCluster;
        this._useDynamicSizeMarker = false;
        this._dynamicMarkerBaseSize = 18;
        this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        this._zoomOnClick = true;
    }
    /**
     * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusterClickAction() { return this._clusterClickAction; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusterClickAction(val) { this._clusterClickAction = val; }
    /**
     * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
     * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusteringEnabled() { return this._clusteringEnabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusteringEnabled(val) { this._clusteringEnabled = val; }
    /**
     * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusterPlacementMode() { return this._clusterPlacementMode; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusterPlacementMode(val) { this._clusterPlacementMode = val; }
    /**
     * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
     * you cannot set a custom marker callback.
     *
     * \@memberof ClusterLayerDirective
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
     * Gets or sets the grid size to be used for clustering.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get GridSize() { return this._gridSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set GridSize(val) { this._gridSize = val; }
    /**
     * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get IconInfo() { return this._iconInfo; }
    /**
     * @param {?} val
     * @return {?}
     */
    set IconInfo(val) { this._iconInfo = val; }
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get LayerOffset() { return this._layerOffset; }
    /**
     * @param {?} val
     * @return {?}
     */
    set LayerOffset(val) { this._layerOffset = val; }
    /**
     * Gets or sets the minimum pins required to form a cluster
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get MinimumClusterSize() { return this._minimumClusterSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set MinimumClusterSize(val) { this._minimumClusterSize = val; }
    /**
     * Gets or sets the options for spider clustering behavior. See {\@link ISpiderClusterOptions}
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get SpiderClusterOptions() { return this._spiderClusterOptions; }
    /**
     * @param {?} val
     * @return {?}
     */
    set SpiderClusterOptions(val) { this._spiderClusterOptions = val; }
    /**
     * Gets or sets the cluster styles
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get Styles() { return this._styles; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Styles(val) { this._styles = val; }
    /**
     * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
     * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
     *
     * \@memberof ClusterLayerDirective
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
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ZIndex() { return this._zIndex; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ZIndex(val) { this._zIndex = val; }
    /**
     * Gets or sets whether the cluster should zoom in on click
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ZoomOnClick() { return this._zoomOnClick; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ZoomOnClick(val) { this._zoomOnClick = val; }
    /**
     * Creates the dynamic size marker to be used for cluster markers if UseDynamicSizeMarkers is set to true.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} size - The number of markers in the cluster.
     * @param {?} info  - The icon info to be used. This will be hydrated with
     * the actualy dimensions of the created markers and is used by the underlying model/services
     * to correctly offset the marker for correct positioning.
     * @param {?} baseMarkerSize - The base size for dynmic markers.
     * @param {?} ranges - The ranges to use to calculate breakpoints and colors for dynamic markers.
     * The map contains key/value pairs, with the keys being
     * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range.
     * @return {?} - An string containing the SVG for the marker.
     *
     */
    static CreateDynamicSizeMarker(size, info, baseMarkerSize, ranges) {
        /** @type {?} */
        const mr = baseMarkerSize;
        /** @type {?} */
        const outline = mr * 0.35;
        /** @type {?} */
        const total = size;
        /** @type {?} */
        const r = Math.log(total) / Math.log(10) * 5 + mr;
        /** @type {?} */
        const d = r * 2;
        /** @type {?} */
        let fillColor;
        ranges.forEach((v, k) => {
            if (total <= k && !fillColor) {
                fillColor = v;
            }
        });
        if (!fillColor) {
            fillColor = 'rgba(20, 180, 20, 0.5)';
        }
        /** @type {?} */
        const svg = [`<svg xmlns='http://www.w3.org/2000/svg' width='${d}' height='${d}'>`,
            `<circle cx='${r}' cy='${r}' r='${r}' fill='${fillColor}'/>`,
            `<circle cx='${r}' cy='${r}' r='${r - outline}' fill='${fillColor}'/>`,
            `</svg>`];
        info.size = { width: d, height: d };
        info.markerOffsetRatio = { x: 0.5, y: 0.5 };
        info.textOffset = { x: 0, y: r - 8 };
        return svg.join('');
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['ClusterClickAction']) {
            throw (new Error('You cannot change the ClusterClickAction after the layer has been added to the layerservice.'));
        }
        /** @type {?} */
        const options = { id: this._id };
        if (changes['ClusteringEnabled']) {
            options.clusteringEnabled = this._clusteringEnabled;
        }
        if (changes['GridSize']) {
            options.gridSize = this._gridSize;
        }
        if (changes['LayerOffset']) {
            options.layerOffset = this._layerOffset;
        }
        if (changes['SpiderClusterOptions']) {
            options.spiderClusterOptions = this._spiderClusterOptions;
        }
        if (changes['ZIndex']) {
            options.zIndex = this._zIndex;
        }
        if (changes['Visible']) {
            options.visible = this._visible;
        }
        this._layerService.GetNativeLayer(this).then((l) => {
            l.SetOptions(options);
        });
    }
}
ClusterLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-cluster-layer'
            },] },
];
/** @nocollapse */
ClusterLayerDirective.ctorParameters = () => [
    { type: ClusterService },
    { type: ViewContainerRef }
];
ClusterLayerDirective.propDecorators = {
    ClusterClickAction: [{ type: Input }],
    ClusteringEnabled: [{ type: Input }],
    ClusterPlacementMode: [{ type: Input }],
    CustomMarkerCallback: [{ type: Input }],
    DynamicMarkerBaseSize: [{ type: Input }],
    DynamicMarkerRanges: [{ type: Input }],
    GridSize: [{ type: Input }],
    IconInfo: [{ type: Input }],
    LayerOffset: [{ type: Input }],
    MinimumClusterSize: [{ type: Input }],
    SpiderClusterOptions: [{ type: Input }],
    Styles: [{ type: Input }],
    UseDynamicSizeMarkers: [{ type: Input }],
    ZIndex: [{ type: Input }],
    ZoomOnClick: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ClusterLayerDirective.prototype._clusteringEnabled;
    /** @type {?} */
    ClusterLayerDirective.prototype._clusterPlacementMode;
    /** @type {?} */
    ClusterLayerDirective.prototype._clusterClickAction;
    /** @type {?} */
    ClusterLayerDirective.prototype._spiderClusterOptions;
    /** @type {?} */
    ClusterLayerDirective.prototype._zIndex;
    /** @type {?} */
    ClusterLayerDirective.prototype._gridSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._layerOffset;
    /** @type {?} */
    ClusterLayerDirective.prototype._iconInfo;
    /** @type {?} */
    ClusterLayerDirective.prototype._minimumClusterSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._styles;
    /** @type {?} */
    ClusterLayerDirective.prototype._useDynamicSizeMarker;
    /** @type {?} */
    ClusterLayerDirective.prototype._dynamicMarkerBaseSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._dynamicMarkerRanges;
    /** @type {?} */
    ClusterLayerDirective.prototype._zoomOnClick;
    /** @type {?} */
    ClusterLayerDirective.prototype._iconCreationCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2NsdXN0ZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQ0csS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBSXBFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNoRCxNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjs7Ozs7Ozs7OztJQWtQeEQsWUFBWSxhQUE2QixFQUFFLGFBQStCO1FBQ3RFLEtBQUssQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7a0NBOU9YLElBQUk7cUNBQ3FCLG9CQUFvQixDQUFDLFNBQVM7bUNBQ2xDLGtCQUFrQixDQUFDLGVBQWU7cUNBUXBELEtBQUs7c0NBQ0osRUFBRTtvQ0FDaUIsSUFBSSxHQUFHLENBQWlCO1lBQ3hFLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDO1lBQzlCLENBQUMsR0FBRyxFQUFFLHlCQUF5QixDQUFDO1lBQ2hDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFHLHdCQUF3QixDQUFDO1NBQ3ZELENBQUM7NEJBQ3FCLElBQUk7S0E4TjFCOzs7Ozs7O0lBbE5ELElBQ2Usa0JBQWtCLEtBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRTs7Ozs7UUFDOUUsa0JBQWtCLENBQUMsR0FBdUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDOzs7Ozs7OztJQVE1RixJQUNlLGlCQUFpQixLQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTs7Ozs7UUFDakUsaUJBQWlCLENBQUMsR0FBWSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7SUFPL0UsSUFDZSxvQkFBb0IsS0FBNEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFOzs7OztRQUNwRixvQkFBb0IsQ0FBQyxHQUF5QixJQUFJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O0lBUWxHLElBQ2Usb0JBQW9CLEtBQXdELE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRTs7Ozs7UUFDaEgsb0JBQW9CLENBQUMsR0FBcUQ7UUFDakYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFLLENBQ0QsSUFBSSxLQUFLLENBQUM7dURBQ3lCLENBQUMsQ0FDdkMsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7O0lBU3pDLElBQ2UscUJBQXFCLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFOzs7OztRQUN4RSxxQkFBcUIsQ0FBQyxHQUFXLElBQUksSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7O0lBU3RGLElBQ2UsbUJBQW1CLEtBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRTs7Ozs7UUFDakYsbUJBQW1CLENBQUMsR0FBd0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDOzs7Ozs7O0lBTy9GLElBQ2UsUUFBUSxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7O1FBQzlDLFFBQVEsQ0FBQyxHQUFXLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O0lBUTVELElBQ2UsUUFBUSxLQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzs7OztRQUN2RCxRQUFRLENBQUMsR0FBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztJQU9yRSxJQUNlLFdBQVcsS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFOzs7OztRQUNwRCxXQUFXLENBQUMsR0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzs7Ozs7OztJQVFsRSxJQUNlLGtCQUFrQixLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRTs7Ozs7UUFDbEUsa0JBQWtCLENBQUMsR0FBVyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7SUFPaEYsSUFDZSxvQkFBb0IsS0FBNEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFOzs7OztRQUNwRixvQkFBb0IsQ0FBQyxHQUEwQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O0lBUW5HLElBQ2UsTUFBTSxLQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzs7OztRQUMxRCxNQUFNLENBQUMsR0FBNEIsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7SUFRekUsSUFDZSxxQkFBcUIsS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Ozs7O1FBQ3ZFLHFCQUFxQixDQUFDLEdBQVk7UUFDekMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBZ0IsRUFBRSxJQUFxQixFQUFFLEVBQUU7Z0JBQ3JFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FDaEQsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQy9FLENBQUM7U0FDTDs7Ozs7Ozs7SUFRVCxJQUNlLE1BQU0sS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzs7OztRQUN6QyxNQUFNLENBQUMsR0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOzs7Ozs7OztJQVF4RCxJQUNlLFdBQVcsS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFOzs7OztRQUNwRCxXQUFXLENBQUMsR0FBWSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0lBaUI1RCxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBWSxFQUFFLElBQXFCLEVBQ2hDLGNBQXNCLEVBQUUsTUFBMkI7O1FBQ3hGLE1BQU0sRUFBRSxHQUFXLGNBQWMsQ0FBQzs7UUFDbEMsTUFBTSxPQUFPLEdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQzs7UUFDbEMsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDOztRQUMzQixNQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7UUFDMUQsTUFBTSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFDeEIsSUFBSSxTQUFTLENBQVM7UUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FDbkQsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDO1NBQUU7O1FBR3pELE1BQU0sR0FBRyxHQUFlLENBQUMsa0RBQWtELENBQUMsYUFBYSxDQUFDLElBQUk7WUFDMUYsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxTQUFTLEtBQUs7WUFDNUQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLFdBQVcsU0FBUyxLQUFLO1lBQ3RFLFFBQVEsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUErQmpCLFdBQVcsQ0FBQyxPQUE2QztRQUM1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7UUFDdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FDRixJQUFJLEtBQUssQ0FBQyw4RkFBOEYsQ0FBQyxDQUM1RyxDQUFDO1NBQ0w7O1FBRUQsTUFBTSxPQUFPLEdBQW9CLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQUU7UUFDMUYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUFFO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FBRTtRQUN4RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQUU7UUFDbkcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUFFO1FBQ3pELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FBRTtRQUU1RCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUN0RCxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQzs7OztZQXRSVixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjthQUM5Qjs7OztZQW5DUSxjQUFjO1lBUkssZ0JBQWdCOzs7aUNBOEV2QyxLQUFLO2dDQVVMLEtBQUs7bUNBU0wsS0FBSzttQ0FVTCxLQUFLO29DQWtCTCxLQUFLO2tDQVdMLEtBQUs7dUJBU0wsS0FBSzt1QkFVTCxLQUFLOzBCQVNMLEtBQUs7aUNBVUwsS0FBSzttQ0FTTCxLQUFLO3FCQVVMLEtBQUs7b0NBVUwsS0FBSztxQkFpQkwsS0FBSzswQkFVTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSxcclxuICAgIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi9tb2RlbHMvY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJDbGlja0FjdGlvbiB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLWNsaWNrLWFjdGlvbic7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzcGlkZXItY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcclxuaW1wb3J0IHsgTWFwTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuL21hcC1sYXllcic7XHJcblxyXG4vKipcclxuICpcclxuICogQ3JlYXRlcyBhIGNsdXN0ZXIgbGF5ZXIgb24gYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmV9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAubWFwLWNvbnRhaW5lciB7XHJcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgIH1cclxuICogYF0sXHJcbiAqIHRlbXBsYXRlOiBgXHJcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW1pvb21dPSd6b29tJz5cclxuICogICAgIDx4LWNsdXN0ZXItbGF5ZXIgW1Zpc2libGVdPSd2aXNpYmxlJz5cclxuICogICAgICAgICA8eC1tYXAtbWFya2VyIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW0xhYmVsXT0nJ00nJz48L3gtbWFwLW1hcmtlcj5cclxuICogICAgIDwveC1jbHVzdGVyLWxheWVyPlxyXG4gKiAgIDwveC1tYXA+XHJcbiAqIGBcclxuICogfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICd4LWNsdXN0ZXItbGF5ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgZXh0ZW5kcyBNYXBMYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9jbHVzdGVyaW5nRW5hYmxlZCA9IHRydWU7XHJcbiAgICBwcml2YXRlIF9jbHVzdGVyUGxhY2VtZW50TW9kZTogQ2x1c3RlclBsYWNlbWVudE1vZGUgPSBDbHVzdGVyUGxhY2VtZW50TW9kZS5NZWFuVmFsdWU7XHJcbiAgICBwcml2YXRlIF9jbHVzdGVyQ2xpY2tBY3Rpb246IENsdXN0ZXJDbGlja0FjdGlvbiA9IENsdXN0ZXJDbGlja0FjdGlvbi5ab29tSW50b0NsdXN0ZXI7XHJcbiAgICBwcml2YXRlIF9zcGlkZXJDbHVzdGVyT3B0aW9uczogSVNwaWRlckNsdXN0ZXJPcHRpb25zO1xyXG4gICAgcHJpdmF0ZSBfekluZGV4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9ncmlkU2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbGF5ZXJPZmZzZXQ6IElQb2ludDtcclxuICAgIHByaXZhdGUgX2ljb25JbmZvOiBJTWFya2VySWNvbkluZm87XHJcbiAgICBwcml2YXRlIF9taW5pbXVtQ2x1c3RlclNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3N0eWxlczogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz47XHJcbiAgICBwcml2YXRlIF91c2VEeW5hbWljU2l6ZU1hcmtlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZHluYW1pY01hcmtlckJhc2VTaXplID0gMTg7XHJcbiAgICBwcml2YXRlIF9keW5hbWljTWFya2VyUmFuZ2VzOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xyXG4gICAgICAgIFsxMCwgJ3JnYmEoMjAsIDE4MCwgMjAsIDAuNSknXSxcclxuICAgICAgICBbMTAwLCAncmdiYSgyNTUsIDIxMCwgNDAsIDAuNSknXSxcclxuICAgICAgICBbTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgLCAncmdiYSgyNTUsIDQwLCA0MCwgMC41KSddXHJcbiAgICBdKTtcclxuICAgIHByaXZhdGUgX3pvb21PbkNsaWNrID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX2ljb25DcmVhdGlvbkNhbGxiYWNrOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmc7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVmaW50aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRoZSBDbHVzdGVyIENsaWNrIEFjdGlvbiB7QGxpbmsgQ2x1c3RlckNsaWNrQWN0aW9ufS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDbHVzdGVyQ2xpY2tBY3Rpb24oKTogQ2x1c3RlckNsaWNrQWN0aW9uICB7IHJldHVybiB0aGlzLl9jbHVzdGVyQ2xpY2tBY3Rpb247IH1cclxuICAgICAgICBwdWJsaWMgc2V0IENsdXN0ZXJDbGlja0FjdGlvbih2YWw6IENsdXN0ZXJDbGlja0FjdGlvbikgeyB0aGlzLl9jbHVzdGVyQ2xpY2tBY3Rpb24gPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoZSBjbHVzdGVyaW5nIGxheWVyIGVuYWJsZXMgY2x1c3RlcmluZy4gV2hlbiBzZXQgdG8gZmFsc2UsIHRoZSBsYXllclxyXG4gICAgICogYmVoYXZlcyBsaWtlIGEgZ2VuZXJpYyBsYXllci4gVGhpcyBpcyBoYW5keSBpZiB5b3Ugd2FudCB0byBwcmV2ZW50IGNsdXN0ZXJpbmcgYXQgY2VydGFpbiB6b29tIGxldmVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDbHVzdGVyaW5nRW5hYmxlZCgpOiBib29sZWFuICB7IHJldHVybiB0aGlzLl9jbHVzdGVyaW5nRW5hYmxlZDsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ2x1c3RlcmluZ0VuYWJsZWQodmFsOiBib29sZWFuKSB7IHRoaXMuX2NsdXN0ZXJpbmdFbmFibGVkID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNsdXN0ZXIgcGxhY2VtZW50IG1vZGUuIHtAbGluayBDbHVzdGVyUGxhY2VtZW50TW9kZX1cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBDbHVzdGVyUGxhY2VtZW50TW9kZSgpOiBDbHVzdGVyUGxhY2VtZW50TW9kZSAgeyByZXR1cm4gdGhpcy5fY2x1c3RlclBsYWNlbWVudE1vZGU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IENsdXN0ZXJQbGFjZW1lbnRNb2RlKHZhbDogQ2x1c3RlclBsYWNlbWVudE1vZGUpIHsgdGhpcy5fY2x1c3RlclBsYWNlbWVudE1vZGUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2FsbGJhY2sgaW52b2tlZCB0byBjcmVhdGUgYSBjdXN0b20gY2x1c3RlciBtYXJrZXIuIE5vdGUgdGhhdCB3aGVuIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9IGlzIGVuYWJsZWQsXHJcbiAgICAgKiB5b3UgY2Fubm90IHNldCBhIGN1c3RvbSBtYXJrZXIgY2FsbGJhY2suXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VzdG9tTWFya2VyQ2FsbGJhY2soKTogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nICB7IHJldHVybiB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjazsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VzdG9tTWFya2VyQ2FsbGJhY2sodmFsOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyhcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoYFlvdSBjYW5ub3Qgc2V0IGEgY3VzdG9tIG1hcmtlciBjYWxsYmFjayB3aGVuIFVzZUR5bmFtaWNTaXplTWFya2VycyBpcyBzZXQgdG8gdHJ1ZS5cclxuICAgICAgICAgICAgICAgICAgICBTZXQgVXNlRHluYW1pY1NpemVNYWtlcnMgdG8gZmFsc2UuYClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2sgPSB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBiYXNlIHNpemUgb2YgZHluYW1pYyBtYXJrZXJzIGluIHBpeGVscy4gVGhlIGFjdHVhbHkgc2l6ZSBvZiB0aGUgZHluYW1pYyBtYXJrZXIgaXMgYmFzZWQgb24gdGhpcy5cclxuICAgICAqIFNlZSB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBEeW5hbWljTWFya2VyQmFzZVNpemUoKTogbnVtYmVyICB7IHJldHVybiB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IER5bmFtaWNNYXJrZXJCYXNlU2l6ZSh2YWw6IG51bWJlcikgeyB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgcmFuZ2VzIHRvIHVzZSB0byBjYWxjdWxhdGUgYnJlYWtwb2ludHMgYW5kIGNvbG9ycyBmb3IgZHluYW1pYyBtYXJrZXJzLlxyXG4gICAgICogVGhlIG1hcCBjb250YWlucyBrZXkvdmFsdWUgcGFpcnMsIHdpdGggdGhlIGtleXMgYmVpbmdcclxuICAgICAqIHRoZSBicmVha3BvaW50IHNpemVzIGFuZCB0aGUgdmFsdWVzIHRoZSBjb2xvcnMgdG8gYmUgdXNlZCBmb3IgdGhlIGR5bmFtaWMgbWFya2VyIGluIHRoYXQgcmFuZ2UuIFNlZSB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBEeW5hbWljTWFya2VyUmFuZ2VzKCk6IE1hcDxudW1iZXIsIHN0cmluZz4gIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IER5bmFtaWNNYXJrZXJSYW5nZXModmFsOiBNYXA8bnVtYmVyLCBzdHJpbmc+KSB7IHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXMgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgZ3JpZCBzaXplIHRvIGJlIHVzZWQgZm9yIGNsdXN0ZXJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgR3JpZFNpemUoKTogbnVtYmVyICB7IHJldHVybiB0aGlzLl9ncmlkU2l6ZTsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgR3JpZFNpemUodmFsOiBudW1iZXIpIHsgdGhpcy5fZ3JpZFNpemUgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgSWNvbkluZm8gdG8gYmUgdXNlZCB0byBjcmVhdGUgYSBjdXN0b20gY2x1c3RlciBtYXJrZXIuIFN1cHBvcnRzIGZvbnQtYmFzZWQsIFNWRywgZ3JhcGhpY3MgYW5kIG1vcmUuXHJcbiAgICAgKiBTZWUge0BsaW5rIElNYXJrZXJJY29uSW5mb30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSWNvbkluZm8oKTogSU1hcmtlckljb25JbmZvICB7IHJldHVybiB0aGlzLl9pY29uSW5mbzsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgSWNvbkluZm8odmFsOiBJTWFya2VySWNvbkluZm8pIHsgdGhpcy5faWNvbkluZm8gPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyBBbiBvZmZzZXQgYXBwbGllZCB0byB0aGUgcG9zaXRpb25pbmcgb2YgdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IExheWVyT2Zmc2V0KCk6IElQb2ludCAgeyByZXR1cm4gdGhpcy5fbGF5ZXJPZmZzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IExheWVyT2Zmc2V0KHZhbDogSVBvaW50KSB7IHRoaXMuX2xheWVyT2Zmc2V0ID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gcGlucyByZXF1aXJlZCB0byBmb3JtIGEgY2x1c3RlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgTWluaW11bUNsdXN0ZXJTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fbWluaW11bUNsdXN0ZXJTaXplOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBNaW5pbXVtQ2x1c3RlclNpemUodmFsOiBudW1iZXIpIHsgdGhpcy5fbWluaW11bUNsdXN0ZXJTaXplID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG9wdGlvbnMgZm9yIHNwaWRlciBjbHVzdGVyaW5nIGJlaGF2aW9yLiBTZWUge0BsaW5rIElTcGlkZXJDbHVzdGVyT3B0aW9uc31cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBTcGlkZXJDbHVzdGVyT3B0aW9ucygpOiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgeyByZXR1cm4gdGhpcy5fc3BpZGVyQ2x1c3Rlck9wdGlvbnM7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFNwaWRlckNsdXN0ZXJPcHRpb25zKHZhbDogSVNwaWRlckNsdXN0ZXJPcHRpb25zKSB7IHRoaXMuX3NwaWRlckNsdXN0ZXJPcHRpb25zID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNsdXN0ZXIgc3R5bGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBTdHlsZXMoKTogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4geyByZXR1cm4gdGhpcy5fc3R5bGVzOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBTdHlsZXModmFsOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPikgeyB0aGlzLl9zdHlsZXMgPSB2YWw7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHVzZSBkeW5hbWljIG1hcmtlcnMuIER5bmFtaWMgbWFya2VycyBjaGFuZ2UgaW4gc2l6ZSBhbmQgY29sb3IgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2ZcclxuICAgICAqIHBpbnMgaW4gdGhlIGNsdXN0ZXIuIElmIHNldCB0byB0cnVlLCB0aGlzIHdpbGwgdGFrZSBwcmVjZW5kZW5jZSBvdmVyIGFueSBjdXN0b20gbWFya2VyIGNyZWF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFVzZUR5bmFtaWNTaXplTWFya2VycygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBVc2VEeW5hbWljU2l6ZU1hcmtlcnModmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyID0gdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjayA9IChtOiBBcnJheTxNYXJrZXI+LCBpbmZvOiBJTWFya2VySWNvbkluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ2x1c3RlckxheWVyRGlyZWN0aXZlLkNyZWF0ZUR5bmFtaWNTaXplTWFya2VyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtLmxlbmd0aCwgaW5mbywgdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplLCB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHotaW5kZXggb2YgdGhlIGxheWVyLiBJZiBub3QgdXNlZCwgbGF5ZXJzIGdldCBzdGFja2VkIGluIHRoZSBvcmRlciBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFpJbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fekluZGV4OyB9XHJcbiAgICAgICAgcHVibGljIHNldCBaSW5kZXgodmFsOiBudW1iZXIpIHsgdGhpcy5fekluZGV4ID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgY2x1c3RlciBzaG91bGQgem9vbSBpbiBvbiBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgWm9vbU9uQ2xpY2soKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl96b29tT25DbGljazsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgWm9vbU9uQ2xpY2sodmFsOiBib29sZWFuKSB7IHRoaXMuX3pvb21PbkNsaWNrID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBkeW5hbWljIHNpemUgbWFya2VyIHRvIGJlIHVzZWQgZm9yIGNsdXN0ZXIgbWFya2VycyBpZiBVc2VEeW5hbWljU2l6ZU1hcmtlcnMgaXMgc2V0IHRvIHRydWUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNpemUgLSBUaGUgbnVtYmVyIG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXHJcbiAgICAgKiBAcGFyYW0gaW5mbyAgLSBUaGUgaWNvbiBpbmZvIHRvIGJlIHVzZWQuIFRoaXMgd2lsbCBiZSBoeWRyYXRlZCB3aXRoXHJcbiAgICAgKiB0aGUgYWN0dWFseSBkaW1lbnNpb25zIG9mIHRoZSBjcmVhdGVkIG1hcmtlcnMgYW5kIGlzIHVzZWQgYnkgdGhlIHVuZGVybHlpbmcgbW9kZWwvc2VydmljZXNcclxuICAgICAqIHRvIGNvcnJlY3RseSBvZmZzZXQgdGhlIG1hcmtlciBmb3IgY29ycmVjdCBwb3NpdGlvbmluZy5cclxuICAgICAqIEBwYXJhbSBiYXNlTWFya2VyU2l6ZSAtIFRoZSBiYXNlIHNpemUgZm9yIGR5bm1pYyBtYXJrZXJzLlxyXG4gICAgICogQHBhcmFtIHJhbmdlcyAtIFRoZSByYW5nZXMgdG8gdXNlIHRvIGNhbGN1bGF0ZSBicmVha3BvaW50cyBhbmQgY29sb3JzIGZvciBkeW5hbWljIG1hcmtlcnMuXHJcbiAgICAgKiBUaGUgbWFwIGNvbnRhaW5zIGtleS92YWx1ZSBwYWlycywgd2l0aCB0aGUga2V5cyBiZWluZ1xyXG4gICAgICogdGhlIGJyZWFrcG9pbnQgc2l6ZXMgYW5kIHRoZSB2YWx1ZXMgdGhlIGNvbG9ycyB0byBiZSB1c2VkIGZvciB0aGUgZHluYW1pYyBtYXJrZXIgaW4gdGhhdCByYW5nZS5cclxuICAgICAqIEByZXR1cm5zIC0gQW4gc3RyaW5nIGNvbnRhaW5pbmcgdGhlIFNWRyBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlRHluYW1pY1NpemVNYXJrZXIoc2l6ZTogbnVtYmVyLCBpbmZvOiBJTWFya2VySWNvbkluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VNYXJrZXJTaXplOiBudW1iZXIsIHJhbmdlczogTWFwPG51bWJlciwgc3RyaW5nPik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbXI6IG51bWJlciA9IGJhc2VNYXJrZXJTaXplO1xyXG4gICAgICAgIGNvbnN0IG91dGxpbmU6IG51bWJlciA9IG1yICogMC4zNTtcclxuICAgICAgICBjb25zdCB0b3RhbDogbnVtYmVyID0gc2l6ZTtcclxuICAgICAgICBjb25zdCByOiBudW1iZXIgPSBNYXRoLmxvZyh0b3RhbCkgLyBNYXRoLmxvZygxMCkgKiA1ICsgbXI7XHJcbiAgICAgICAgY29uc3QgZDogbnVtYmVyID0gciAqIDI7XHJcbiAgICAgICAgbGV0IGZpbGxDb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIHJhbmdlcy5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b3RhbCA8PSBrICYmICFmaWxsQ29sb3IpIHsgZmlsbENvbG9yID0gdjsgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghZmlsbENvbG9yKSB7IGZpbGxDb2xvciA9ICdyZ2JhKDIwLCAxODAsIDIwLCAwLjUpJzsgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYW4gU1ZHIHN0cmluZyBvZiB0d28gY2lyY2xlcywgb25lIG9uIHRvcCBvZiB0aGUgb3RoZXIsIHdpdGggdGhlIHNwZWNpZmllZCByYWRpdXMgYW5kIGNvbG9yLlxyXG4gICAgICAgIGNvbnN0IHN2ZzogQXJyYXk8YW55PiA9IFtgPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScke2R9JyBoZWlnaHQ9JyR7ZH0nPmAsXHJcbiAgICAgICAgICAgIGA8Y2lyY2xlIGN4PScke3J9JyBjeT0nJHtyfScgcj0nJHtyfScgZmlsbD0nJHtmaWxsQ29sb3J9Jy8+YCxcclxuICAgICAgICAgICAgYDxjaXJjbGUgY3g9JyR7cn0nIGN5PScke3J9JyByPScke3IgLSBvdXRsaW5lfScgZmlsbD0nJHtmaWxsQ29sb3J9Jy8+YCxcclxuICAgICAgICAgICAgYDwvc3ZnPmBdO1xyXG4gICAgICAgIGluZm8uc2l6ZSA9IHsgd2lkdGg6IGQsIGhlaWdodDogZCB9O1xyXG4gICAgICAgIGluZm8ubWFya2VyT2Zmc2V0UmF0aW8gPSB7IHg6IDAuNSwgeTogMC41IH07XHJcbiAgICAgICAgaW5mby50ZXh0T2Zmc2V0ID0geyB4OiAwLCB5OiByIC0gOCB9O1xyXG4gICAgICAgIHJldHVybiBzdmcuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBjbHVzdGVyIGxheWVyIHNlcnZpY2UgZm9yIHRoZSB1bmRlcmx5aW5nIG1hcHNcclxuICAgICAqIGltcGxlbWVudGF0aW9ucy4gR2VuZXJhbGx5IHByb3ZpZGVkIHZpYSBpbmplY3Rpb25zLlxyXG4gICAgICogQHBhcmFtIF9jb250YWluZXJSZWYgLSBBIHJlZmVyZW5jZSB0byB0aGUgdmlldyBjb250YWluZXIgb2YgdGhlIGxheWVyLiBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKF9sYXllclNlcnZpY2U6IENsdXN0ZXJTZXJ2aWNlLCBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgc3VwZXIoX2xheWVyU2VydmljZSwgX2NvbnRhaW5lclJlZik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydDbHVzdGVyQ2xpY2tBY3Rpb24nXSkge1xyXG4gICAgICAgICAgICB0aHJvdyAoXHJcbiAgICAgICAgICAgICAgICBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2hhbmdlIHRoZSBDbHVzdGVyQ2xpY2tBY3Rpb24gYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBsYXllcnNlcnZpY2UuJylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHsgaWQ6IHRoaXMuX2lkIH07XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJpbmdFbmFibGVkJ10pIHsgb3B0aW9ucy5jbHVzdGVyaW5nRW5hYmxlZCA9IHRoaXMuX2NsdXN0ZXJpbmdFbmFibGVkOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0dyaWRTaXplJ10pIHsgb3B0aW9ucy5ncmlkU2l6ZSA9IHRoaXMuX2dyaWRTaXplOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0xheWVyT2Zmc2V0J10pIHsgb3B0aW9ucy5sYXllck9mZnNldCA9IHRoaXMuX2xheWVyT2Zmc2V0OyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1NwaWRlckNsdXN0ZXJPcHRpb25zJ10pIHsgb3B0aW9ucy5zcGlkZXJDbHVzdGVyT3B0aW9ucyA9IHRoaXMuX3NwaWRlckNsdXN0ZXJPcHRpb25zOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1pJbmRleCddKSB7IG9wdGlvbnMuekluZGV4ID0gdGhpcy5fekluZGV4OyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSkgeyBvcHRpb25zLnZpc2libGUgPSB0aGlzLl92aXNpYmxlOyB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcih0aGlzKS50aGVuKChsOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgICBsLlNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==