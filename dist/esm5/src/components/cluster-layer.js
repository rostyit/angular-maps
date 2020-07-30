/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ClusterLayerDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ClusterLayerDirective, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of ClusterLayerDirective.
     *
     * @param _layerService - Concreted implementation of a cluster layer service for the underlying maps
     * implementations. Generally provided via injections.
     * @param _containerRef - A reference to the view container of the layer. Generally provided via injection.
     *
     * @memberof ClusterLayerDirective
     */
    function ClusterLayerDirective(_layerService, _containerRef) {
        var _this = _super.call(this, _layerService, _containerRef) || this;
        _this._clusteringEnabled = true;
        _this._clusterPlacementMode = ClusterPlacementMode.MeanValue;
        _this._clusterClickAction = ClusterClickAction.ZoomIntoCluster;
        _this._useDynamicSizeMarker = false;
        _this._dynamicMarkerBaseSize = 18;
        _this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        _this._zoomOnClick = true;
        return _this;
    }
    Object.defineProperty(ClusterLayerDirective.prototype, "ClusterClickAction", {
        ///
        /// Property defintions
        ///
        /**
         * Gets or sets the the Cluster Click Action {@link ClusterClickAction}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._clusterClickAction; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._clusterClickAction = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "ClusteringEnabled", {
        /**
         * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
         * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
         * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._clusteringEnabled; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._clusteringEnabled = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "ClusterPlacementMode", {
        /**
         * Gets or sets the cluster placement mode. {@link ClusterPlacementMode}
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._clusterPlacementMode; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._clusterPlacementMode = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "CustomMarkerCallback", {
        /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
         * you cannot set a custom marker callback.
         *
         * \@memberof ClusterLayerDirective
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
    Object.defineProperty(ClusterLayerDirective.prototype, "DynamicMarkerBaseSize", {
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
    Object.defineProperty(ClusterLayerDirective.prototype, "DynamicMarkerRanges", {
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
    Object.defineProperty(ClusterLayerDirective.prototype, "GridSize", {
        /**
         * Gets or sets the grid size to be used for clustering.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the grid size to be used for clustering.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._gridSize; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._gridSize = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "IconInfo", {
        /**
         * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
         * See {@link IMarkerIconInfo}.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
         * See {\@link IMarkerIconInfo}.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._iconInfo; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._iconInfo = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "LayerOffset", {
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._layerOffset; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._layerOffset = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "MinimumClusterSize", {
        /**
         * Gets or sets the minimum pins required to form a cluster
         *
         * @readonly
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the minimum pins required to form a cluster
         *
         * \@readonly
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._minimumClusterSize; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._minimumClusterSize = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "SpiderClusterOptions", {
        /**
         * Gets or sets the options for spider clustering behavior. See {@link ISpiderClusterOptions}
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the options for spider clustering behavior. See {\@link ISpiderClusterOptions}
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._spiderClusterOptions; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._spiderClusterOptions = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "Styles", {
        /**
         * Gets or sets the cluster styles
         *
         * @readonly
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the cluster styles
         *
         * \@readonly
         * \@memberof ClusterLayerDirective
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
    Object.defineProperty(ClusterLayerDirective.prototype, "UseDynamicSizeMarkers", {
        /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
         * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
         *
         * \@memberof ClusterLayerDirective
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
    Object.defineProperty(ClusterLayerDirective.prototype, "ZIndex", {
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._zIndex; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._zIndex = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClusterLayerDirective.prototype, "ZoomOnClick", {
        /**
         * Gets or sets whether the cluster should zoom in on click
         *
         * @readonly
         * @memberof ClusterLayerDirective
         */
        get: /**
         * Gets or sets whether the cluster should zoom in on click
         *
         * \@readonly
         * \@memberof ClusterLayerDirective
         * @return {?}
         */
        function () { return this._zoomOnClick; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._zoomOnClick = val; },
        enumerable: true,
        configurable: true
    });
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
    ClusterLayerDirective.CreateDynamicSizeMarker = /**
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
    function (size, info, baseMarkerSize, ranges) {
        /** @type {?} */
        var mr = baseMarkerSize;
        /** @type {?} */
        var outline = mr * 0.35;
        /** @type {?} */
        var total = size;
        /** @type {?} */
        var r = Math.log(total) / Math.log(10) * 5 + mr;
        /** @type {?} */
        var d = r * 2;
        /** @type {?} */
        var fillColor;
        ranges.forEach(function (v, k) {
            if (total <= k && !fillColor) {
                fillColor = v;
            }
        });
        if (!fillColor) {
            fillColor = 'rgba(20, 180, 20, 0.5)';
        }
        /** @type {?} */
        var svg = ["<svg xmlns='http://www.w3.org/2000/svg' width='" + d + "' height='" + d + "'>",
            "<circle cx='" + r + "' cy='" + r + "' r='" + r + "' fill='" + fillColor + "'/>",
            "<circle cx='" + r + "' cy='" + r + "' r='" + (r - outline) + "' fill='" + fillColor + "'/>",
            "</svg>"];
        info.size = { width: d, height: d };
        info.markerOffsetRatio = { x: 0.5, y: 0.5 };
        info.textOffset = { x: 0, y: r - 8 };
        return svg.join('');
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ClusterLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['ClusterClickAction']) {
            throw (new Error('You cannot change the ClusterClickAction after the layer has been added to the layerservice.'));
        }
        /** @type {?} */
        var options = { id: this._id };
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
        this._layerService.GetNativeLayer(this).then(function (l) {
            l.SetOptions(options);
        });
    };
    ClusterLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-cluster-layer'
                },] },
    ];
    /** @nocollapse */
    ClusterLayerDirective.ctorParameters = function () { return [
        { type: ClusterService },
        { type: ViewContainerRef }
    ]; };
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
    return ClusterLayerDirective;
}(MapLayerDirective));
export { ClusterLayerDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2NsdXN0ZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUNHLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUlwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQ0wsaURBQWlCO0lBcU94RCxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7Ozs7T0FRRztJQUNILCtCQUFZLGFBQTZCLEVBQUUsYUFBK0I7UUFBMUUsWUFDSSxrQkFBTSxhQUFhLEVBQUUsYUFBYSxDQUFDLFNBQ3RDO21DQS9PNEIsSUFBSTtzQ0FDcUIsb0JBQW9CLENBQUMsU0FBUztvQ0FDbEMsa0JBQWtCLENBQUMsZUFBZTtzQ0FRcEQsS0FBSzt1Q0FDSixFQUFFO3FDQUNpQixJQUFJLEdBQUcsQ0FBaUI7WUFDeEUsQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLENBQUM7WUFDOUIsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUM7WUFDaEMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUcsd0JBQXdCLENBQUM7U0FDdkQsQ0FBQzs2QkFDcUIsSUFBSTs7S0E4TjFCO0lBbE5ELHNCQUNlLHFEQUFrQjtRQVZqQyxHQUFHO1FBQ0gsdUJBQXVCO1FBQ3ZCLEdBQUc7UUFFSDs7OztXQUlHOzs7Ozs7O1FBQ0gsY0FDMkQsTUFBTSxDQUFDLElBQUksQ0FBQyxt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LENBQUM7U0FBRTtRQUU1RCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFRO1lBQ2xELENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekIsQ0FBQyxDQUFDOzs7Z0JBdFJWLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OztnQkFuQ1EsY0FBYztnQkFSSyxnQkFBZ0I7OztxQ0E4RXZDLEtBQUs7b0NBVUwsS0FBSzt1Q0FTTCxLQUFLO3VDQVVMLEtBQUs7d0NBa0JMLEtBQUs7c0NBV0wsS0FBSzsyQkFTTCxLQUFLOzJCQVVMLEtBQUs7OEJBU0wsS0FBSztxQ0FVTCxLQUFLO3VDQVNMLEtBQUs7eUJBVUwsS0FBSzt3Q0FVTCxLQUFLO3lCQWlCTCxLQUFLOzhCQVVMLEtBQUs7O2dDQXhPVjtFQThDMkMsaUJBQWlCO1NBQS9DLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbHVzdGVySWNvbkluZm8gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ljbHVzdGVyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IENsdXN0ZXJQbGFjZW1lbnRNb2RlIH0gZnJvbSAnLi4vbW9kZWxzL2NsdXN0ZXItcGxhY2VtZW50LW1vZGUnO1xyXG5pbXBvcnQgeyBDbHVzdGVyQ2xpY2tBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvY2x1c3Rlci1jbGljay1hY3Rpb24nO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mb30gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNwaWRlckNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc3BpZGVyLWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcE1hcmtlckRpcmVjdGl2ZSB9IGZyb20gJy4vbWFwLW1hcmtlcic7XHJcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbGF5ZXInO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENyZWF0ZXMgYSBjbHVzdGVyIGxheWVyIG9uIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudCwgTWFwTWFya2VyRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgLm1hcC1jb250YWluZXIge1xyXG4gKiAgICAgaGVpZ2h0OiAzMDBweDtcclxuICogICB9XHJcbiAqIGBdLFxyXG4gKiB0ZW1wbGF0ZTogYFxyXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPSdsYXQnIFtMb25naXR1ZGVdPSdsbmcnIFtab29tXT0nem9vbSc+XHJcbiAqICAgICA8eC1jbHVzdGVyLWxheWVyIFtWaXNpYmxlXT0ndmlzaWJsZSc+XHJcbiAqICAgICAgICAgPHgtbWFwLW1hcmtlciBbTGF0aXR1ZGVdPSdsYXQnIFtMb25naXR1ZGVdPSdsbmcnIFtMYWJlbF09JydNJyc+PC94LW1hcC1tYXJrZXI+XHJcbiAqICAgICA8L3gtY2x1c3Rlci1sYXllcj5cclxuICogICA8L3gtbWFwPlxyXG4gKiBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAneC1jbHVzdGVyLWxheWVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2x1c3RlckxheWVyRGlyZWN0aXZlIGV4dGVuZHMgTWFwTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfY2x1c3RlcmluZ0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfY2x1c3RlclBsYWNlbWVudE1vZGU6IENsdXN0ZXJQbGFjZW1lbnRNb2RlID0gQ2x1c3RlclBsYWNlbWVudE1vZGUuTWVhblZhbHVlO1xyXG4gICAgcHJpdmF0ZSBfY2x1c3RlckNsaWNrQWN0aW9uOiBDbHVzdGVyQ2xpY2tBY3Rpb24gPSBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyO1xyXG4gICAgcHJpdmF0ZSBfc3BpZGVyQ2x1c3Rlck9wdGlvbnM6IElTcGlkZXJDbHVzdGVyT3B0aW9ucztcclxuICAgIHByaXZhdGUgX3pJbmRleDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZ3JpZFNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2xheWVyT2Zmc2V0OiBJUG9pbnQ7XHJcbiAgICBwcml2YXRlIF9pY29uSW5mbzogSU1hcmtlckljb25JbmZvO1xyXG4gICAgcHJpdmF0ZSBfbWluaW11bUNsdXN0ZXJTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9zdHlsZXM6IEFycmF5PElDbHVzdGVySWNvbkluZm8+O1xyXG4gICAgcHJpdmF0ZSBfdXNlRHluYW1pY1NpemVNYXJrZXIgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSA9IDE4O1xyXG4gICAgcHJpdmF0ZSBfZHluYW1pY01hcmtlclJhbmdlczogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcclxuICAgICAgICBbMTAsICdyZ2JhKDIwLCAxODAsIDIwLCAwLjUpJ10sXHJcbiAgICAgICAgWzEwMCwgJ3JnYmEoMjU1LCAyMTAsIDQwLCAwLjUpJ10sXHJcbiAgICAgICAgW051bWJlci5NQVhfU0FGRV9JTlRFR0VSICwgJ3JnYmEoMjU1LCA0MCwgNDAsIDAuNSknXVxyXG4gICAgXSk7XHJcbiAgICBwcml2YXRlIF96b29tT25DbGljayA9IHRydWU7XHJcbiAgICBwcml2YXRlIF9pY29uQ3JlYXRpb25DYWxsYmFjazogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlZmludGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aGUgQ2x1c3RlciBDbGljayBBY3Rpb24ge0BsaW5rIENsdXN0ZXJDbGlja0FjdGlvbn0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2x1c3RlckNsaWNrQWN0aW9uKCk6IENsdXN0ZXJDbGlja0FjdGlvbiAgeyByZXR1cm4gdGhpcy5fY2x1c3RlckNsaWNrQWN0aW9uOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBDbHVzdGVyQ2xpY2tBY3Rpb24odmFsOiBDbHVzdGVyQ2xpY2tBY3Rpb24pIHsgdGhpcy5fY2x1c3RlckNsaWNrQWN0aW9uID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgY2x1c3RlcmluZyBsYXllciBlbmFibGVzIGNsdXN0ZXJpbmcuIFdoZW4gc2V0IHRvIGZhbHNlLCB0aGUgbGF5ZXJcclxuICAgICAqIGJlaGF2ZXMgbGlrZSBhIGdlbmVyaWMgbGF5ZXIuIFRoaXMgaXMgaGFuZHkgaWYgeW91IHdhbnQgdG8gcHJldmVudCBjbHVzdGVyaW5nIGF0IGNlcnRhaW4gem9vbSBsZXZlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2x1c3RlcmluZ0VuYWJsZWQoKTogYm9vbGVhbiAgeyByZXR1cm4gdGhpcy5fY2x1c3RlcmluZ0VuYWJsZWQ7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IENsdXN0ZXJpbmdFbmFibGVkKHZhbDogYm9vbGVhbikgeyB0aGlzLl9jbHVzdGVyaW5nRW5hYmxlZCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjbHVzdGVyIHBsYWNlbWVudCBtb2RlLiB7QGxpbmsgQ2x1c3RlclBsYWNlbWVudE1vZGV9XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2x1c3RlclBsYWNlbWVudE1vZGUoKTogQ2x1c3RlclBsYWNlbWVudE1vZGUgIHsgcmV0dXJuIHRoaXMuX2NsdXN0ZXJQbGFjZW1lbnRNb2RlOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBDbHVzdGVyUGxhY2VtZW50TW9kZSh2YWw6IENsdXN0ZXJQbGFjZW1lbnRNb2RlKSB7IHRoaXMuX2NsdXN0ZXJQbGFjZW1lbnRNb2RlID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNhbGxiYWNrIGludm9rZWQgdG8gY3JlYXRlIGEgY3VzdG9tIGNsdXN0ZXIgbWFya2VyLiBOb3RlIHRoYXQgd2hlbiB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfSBpcyBlbmFibGVkLFxyXG4gICAgICogeW91IGNhbm5vdCBzZXQgYSBjdXN0b20gbWFya2VyIGNhbGxiYWNrLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IEN1c3RvbU1hcmtlckNhbGxiYWNrKCk6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZyAgeyByZXR1cm4gdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2s7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1c3RvbU1hcmtlckNhbGxiYWNrKHZhbDogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3coXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKGBZb3UgY2Fubm90IHNldCBhIGN1c3RvbSBtYXJrZXIgY2FsbGJhY2sgd2hlbiBVc2VEeW5hbWljU2l6ZU1hcmtlcnMgaXMgc2V0IHRvIHRydWUuXHJcbiAgICAgICAgICAgICAgICAgICAgU2V0IFVzZUR5bmFtaWNTaXplTWFrZXJzIHRvIGZhbHNlLmApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgYmFzZSBzaXplIG9mIGR5bmFtaWMgbWFya2VycyBpbiBwaXhlbHMuIFRoZSBhY3R1YWx5IHNpemUgb2YgdGhlIGR5bmFtaWMgbWFya2VyIGlzIGJhc2VkIG9uIHRoaXMuXHJcbiAgICAgKiBTZWUge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRHluYW1pY01hcmtlckJhc2VTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBEeW5hbWljTWFya2VyQmFzZVNpemUodmFsOiBudW1iZXIpIHsgdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHJhbmdlcyB0byB1c2UgdG8gY2FsY3VsYXRlIGJyZWFrcG9pbnRzIGFuZCBjb2xvcnMgZm9yIGR5bmFtaWMgbWFya2Vycy5cclxuICAgICAqIFRoZSBtYXAgY29udGFpbnMga2V5L3ZhbHVlIHBhaXJzLCB3aXRoIHRoZSBrZXlzIGJlaW5nXHJcbiAgICAgKiB0aGUgYnJlYWtwb2ludCBzaXplcyBhbmQgdGhlIHZhbHVlcyB0aGUgY29sb3JzIHRvIGJlIHVzZWQgZm9yIHRoZSBkeW5hbWljIG1hcmtlciBpbiB0aGF0IHJhbmdlLiBTZWUge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRHluYW1pY01hcmtlclJhbmdlcygpOiBNYXA8bnVtYmVyLCBzdHJpbmc+ICB7IHJldHVybiB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBEeW5hbWljTWFya2VyUmFuZ2VzKHZhbDogTWFwPG51bWJlciwgc3RyaW5nPikgeyB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGdyaWQgc2l6ZSB0byBiZSB1c2VkIGZvciBjbHVzdGVyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IEdyaWRTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fZ3JpZFNpemU7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IEdyaWRTaXplKHZhbDogbnVtYmVyKSB7IHRoaXMuX2dyaWRTaXplID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIEljb25JbmZvIHRvIGJlIHVzZWQgdG8gY3JlYXRlIGEgY3VzdG9tIGNsdXN0ZXIgbWFya2VyLiBTdXBwb3J0cyBmb250LWJhc2VkLCBTVkcsIGdyYXBoaWNzIGFuZCBtb3JlLlxyXG4gICAgICogU2VlIHtAbGluayBJTWFya2VySWNvbkluZm99LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IEljb25JbmZvKCk6IElNYXJrZXJJY29uSW5mbyAgeyByZXR1cm4gdGhpcy5faWNvbkluZm87IH1cclxuICAgICAgICBwdWJsaWMgc2V0IEljb25JbmZvKHZhbDogSU1hcmtlckljb25JbmZvKSB7IHRoaXMuX2ljb25JbmZvID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgQW4gb2Zmc2V0IGFwcGxpZWQgdG8gdGhlIHBvc2l0aW9uaW5nIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBMYXllck9mZnNldCgpOiBJUG9pbnQgIHsgcmV0dXJuIHRoaXMuX2xheWVyT2Zmc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHNldCBMYXllck9mZnNldCh2YWw6IElQb2ludCkgeyB0aGlzLl9sYXllck9mZnNldCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHBpbnMgcmVxdWlyZWQgdG8gZm9ybSBhIGNsdXN0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IE1pbmltdW1DbHVzdGVyU2l6ZSgpOiBudW1iZXIgIHsgcmV0dXJuIHRoaXMuX21pbmltdW1DbHVzdGVyU2l6ZTsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTWluaW11bUNsdXN0ZXJTaXplKHZhbDogbnVtYmVyKSB7IHRoaXMuX21pbmltdW1DbHVzdGVyU2l6ZSA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBvcHRpb25zIGZvciBzcGlkZXIgY2x1c3RlcmluZyBiZWhhdmlvci4gU2VlIHtAbGluayBJU3BpZGVyQ2x1c3Rlck9wdGlvbnN9XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3BpZGVyQ2x1c3Rlck9wdGlvbnMoKTogSVNwaWRlckNsdXN0ZXJPcHRpb25zIHsgcmV0dXJuIHRoaXMuX3NwaWRlckNsdXN0ZXJPcHRpb25zOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBTcGlkZXJDbHVzdGVyT3B0aW9ucyh2YWw6IElTcGlkZXJDbHVzdGVyT3B0aW9ucykgeyB0aGlzLl9zcGlkZXJDbHVzdGVyT3B0aW9ucyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjbHVzdGVyIHN0eWxlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3R5bGVzKCk6IEFycmF5PElDbHVzdGVySWNvbkluZm8+IHsgcmV0dXJuIHRoaXMuX3N0eWxlczsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgU3R5bGVzKHZhbDogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4pIHsgdGhpcy5fc3R5bGVzID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byB1c2UgZHluYW1pYyBtYXJrZXJzLiBEeW5hbWljIG1hcmtlcnMgY2hhbmdlIGluIHNpemUgYW5kIGNvbG9yIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mXHJcbiAgICAgKiBwaW5zIGluIHRoZSBjbHVzdGVyLiBJZiBzZXQgdG8gdHJ1ZSwgdGhpcyB3aWxsIHRha2UgcHJlY2VuZGVuY2Ugb3ZlciBhbnkgY3VzdG9tIG1hcmtlciBjcmVhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBVc2VEeW5hbWljU2l6ZU1hcmtlcnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlcjsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgVXNlRHluYW1pY1NpemVNYXJrZXJzKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlciA9IHZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2sgPSAobTogQXJyYXk8TWFya2VyPiwgaW5mbzogSU1hcmtlckljb25JbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENsdXN0ZXJMYXllckRpcmVjdGl2ZS5DcmVhdGVEeW5hbWljU2l6ZU1hcmtlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgbS5sZW5ndGgsIGluZm8sIHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSwgdGhpcy5fZHluYW1pY01hcmtlclJhbmdlcyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB6LWluZGV4IG9mIHRoZSBsYXllci4gSWYgbm90IHVzZWQsIGxheWVycyBnZXQgc3RhY2tlZCBpbiB0aGUgb3JkZXIgY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBaSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3pJbmRleDsgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgWkluZGV4KHZhbDogbnVtYmVyKSB7IHRoaXMuX3pJbmRleCA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdGhlIGNsdXN0ZXIgc2hvdWxkIHpvb20gaW4gb24gY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFpvb21PbkNsaWNrKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fem9vbU9uQ2xpY2s7IH1cclxuICAgICAgICBwdWJsaWMgc2V0IFpvb21PbkNsaWNrKHZhbDogYm9vbGVhbikgeyB0aGlzLl96b29tT25DbGljayA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgZHluYW1pYyBzaXplIG1hcmtlciB0byBiZSB1c2VkIGZvciBjbHVzdGVyIG1hcmtlcnMgaWYgVXNlRHluYW1pY1NpemVNYXJrZXJzIGlzIHNldCB0byB0cnVlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzaXplIC0gVGhlIG51bWJlciBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxyXG4gICAgICogQHBhcmFtIGluZm8gIC0gVGhlIGljb24gaW5mbyB0byBiZSB1c2VkLiBUaGlzIHdpbGwgYmUgaHlkcmF0ZWQgd2l0aFxyXG4gICAgICogdGhlIGFjdHVhbHkgZGltZW5zaW9ucyBvZiB0aGUgY3JlYXRlZCBtYXJrZXJzIGFuZCBpcyB1c2VkIGJ5IHRoZSB1bmRlcmx5aW5nIG1vZGVsL3NlcnZpY2VzXHJcbiAgICAgKiB0byBjb3JyZWN0bHkgb2Zmc2V0IHRoZSBtYXJrZXIgZm9yIGNvcnJlY3QgcG9zaXRpb25pbmcuXHJcbiAgICAgKiBAcGFyYW0gYmFzZU1hcmtlclNpemUgLSBUaGUgYmFzZSBzaXplIGZvciBkeW5taWMgbWFya2Vycy5cclxuICAgICAqIEBwYXJhbSByYW5nZXMgLSBUaGUgcmFuZ2VzIHRvIHVzZSB0byBjYWxjdWxhdGUgYnJlYWtwb2ludHMgYW5kIGNvbG9ycyBmb3IgZHluYW1pYyBtYXJrZXJzLlxyXG4gICAgICogVGhlIG1hcCBjb250YWlucyBrZXkvdmFsdWUgcGFpcnMsIHdpdGggdGhlIGtleXMgYmVpbmdcclxuICAgICAqIHRoZSBicmVha3BvaW50IHNpemVzIGFuZCB0aGUgdmFsdWVzIHRoZSBjb2xvcnMgdG8gYmUgdXNlZCBmb3IgdGhlIGR5bmFtaWMgbWFya2VyIGluIHRoYXQgcmFuZ2UuXHJcbiAgICAgKiBAcmV0dXJucyAtIEFuIHN0cmluZyBjb250YWluaW5nIHRoZSBTVkcgZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUR5bmFtaWNTaXplTWFya2VyKHNpemU6IG51bWJlciwgaW5mbzogSU1hcmtlckljb25JbmZvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlTWFya2VyU2l6ZTogbnVtYmVyLCByYW5nZXM6IE1hcDxudW1iZXIsIHN0cmluZz4pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG1yOiBudW1iZXIgPSBiYXNlTWFya2VyU2l6ZTtcclxuICAgICAgICBjb25zdCBvdXRsaW5lOiBudW1iZXIgPSBtciAqIDAuMzU7XHJcbiAgICAgICAgY29uc3QgdG90YWw6IG51bWJlciA9IHNpemU7XHJcbiAgICAgICAgY29uc3QgcjogbnVtYmVyID0gTWF0aC5sb2codG90YWwpIC8gTWF0aC5sb2coMTApICogNSArIG1yO1xyXG4gICAgICAgIGNvbnN0IGQ6IG51bWJlciA9IHIgKiAyO1xyXG4gICAgICAgIGxldCBmaWxsQ29sb3I6IHN0cmluZztcclxuICAgICAgICByYW5nZXMuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodG90YWwgPD0gayAmJiAhZmlsbENvbG9yKSB7IGZpbGxDb2xvciA9IHY7IH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWZpbGxDb2xvcikgeyBmaWxsQ29sb3IgPSAncmdiYSgyMCwgMTgwLCAyMCwgMC41KSc7IH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuIFNWRyBzdHJpbmcgb2YgdHdvIGNpcmNsZXMsIG9uZSBvbiB0b3Agb2YgdGhlIG90aGVyLCB3aXRoIHRoZSBzcGVjaWZpZWQgcmFkaXVzIGFuZCBjb2xvci5cclxuICAgICAgICBjb25zdCBzdmc6IEFycmF5PGFueT4gPSBbYDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nJHtkfScgaGVpZ2h0PScke2R9Jz5gLFxyXG4gICAgICAgICAgICBgPGNpcmNsZSBjeD0nJHtyfScgY3k9JyR7cn0nIHI9JyR7cn0nIGZpbGw9JyR7ZmlsbENvbG9yfScvPmAsXHJcbiAgICAgICAgICAgIGA8Y2lyY2xlIGN4PScke3J9JyBjeT0nJHtyfScgcj0nJHtyIC0gb3V0bGluZX0nIGZpbGw9JyR7ZmlsbENvbG9yfScvPmAsXHJcbiAgICAgICAgICAgIGA8L3N2Zz5gXTtcclxuICAgICAgICBpbmZvLnNpemUgPSB7IHdpZHRoOiBkLCBoZWlnaHQ6IGQgfTtcclxuICAgICAgICBpbmZvLm1hcmtlck9mZnNldFJhdGlvID0geyB4OiAwLjUsIHk6IDAuNSB9O1xyXG4gICAgICAgIGluZm8udGV4dE9mZnNldCA9IHsgeDogMCwgeTogciAtIDggfTtcclxuICAgICAgICByZXR1cm4gc3ZnLmpvaW4oJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0gQ29uY3JldGVkIGltcGxlbWVudGF0aW9uIG9mIGEgY2x1c3RlciBsYXllciBzZXJ2aWNlIGZvciB0aGUgdW5kZXJseWluZyBtYXBzXHJcbiAgICAgKiBpbXBsZW1lbnRhdGlvbnMuIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9ucy5cclxuICAgICAqIEBwYXJhbSBfY29udGFpbmVyUmVmIC0gQSByZWZlcmVuY2UgdG8gdGhlIHZpZXcgY29udGFpbmVyIG9mIHRoZSBsYXllci4gR2VuZXJhbGx5IHByb3ZpZGVkIHZpYSBpbmplY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihfbGF5ZXJTZXJ2aWNlOiBDbHVzdGVyU2VydmljZSwgX2NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgICAgIHN1cGVyKF9sYXllclNlcnZpY2UsIF9jb250YWluZXJSZWYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyB0byBjaGFuZ2VzIGluIGRhdGEtYm91bmQgcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50IGFuZCBhY3R1YXRlcyBwcm9wZXJ0eSBjaGFuZ2VzIGluIHRoZSB1bmRlcmxpbmcgbGF5ZXIgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBjb2xsZWN0aW9uIG9mIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snQ2x1c3RlckNsaWNrQWN0aW9uJ10pIHtcclxuICAgICAgICAgICAgdGhyb3cgKFxyXG4gICAgICAgICAgICAgICAgbmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSB0aGUgQ2x1c3RlckNsaWNrQWN0aW9uIGFmdGVyIHRoZSBsYXllciBoYXMgYmVlbiBhZGRlZCB0byB0aGUgbGF5ZXJzZXJ2aWNlLicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMgPSB7IGlkOiB0aGlzLl9pZCB9O1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydDbHVzdGVyaW5nRW5hYmxlZCddKSB7IG9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQgPSB0aGlzLl9jbHVzdGVyaW5nRW5hYmxlZDsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydHcmlkU2l6ZSddKSB7IG9wdGlvbnMuZ3JpZFNpemUgPSB0aGlzLl9ncmlkU2l6ZTsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydMYXllck9mZnNldCddKSB7IG9wdGlvbnMubGF5ZXJPZmZzZXQgPSB0aGlzLl9sYXllck9mZnNldDsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydTcGlkZXJDbHVzdGVyT3B0aW9ucyddKSB7IG9wdGlvbnMuc3BpZGVyQ2x1c3Rlck9wdGlvbnMgPSB0aGlzLl9zcGlkZXJDbHVzdGVyT3B0aW9uczsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydaSW5kZXgnXSkgeyBvcHRpb25zLnpJbmRleCA9IHRoaXMuX3pJbmRleDsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10pIHsgb3B0aW9ucy52aXNpYmxlID0gdGhpcy5fdmlzaWJsZTsgfVxyXG5cclxuICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIodGhpcykudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgbC5TZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=