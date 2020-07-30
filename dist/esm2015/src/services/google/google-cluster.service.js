/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Marker } from '../../models/marker';
import { MarkerTypeId } from '../../models/marker-type-id';
import { ClusterClickAction } from '../../models/cluster-click-action';
import { MapService } from '../map.service';
import { GoogleLayerBase } from './google-layer-base';
export class GoogleClusterService extends GoogleLayerBase {
    /**
     * Creates an instance of GoogleClusterService.
     * \@memberof GoogleClusterService
     * @param {?} _mapService
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
        this._layers = new Map();
        this._layerStyles = new Map();
    }
    /**
     * Creates the cluster icon from the styles
     *
     * \@memberof GoogleClusterService
     * @param {?} styles
     * @return {?} - Promise that when resolved contains an Array of IClusterIconInfo objects
     * containing the hydrated cluster icons.
     */
    static CreateClusterIcons(styles) {
        /** @type {?} */
        const i = new Promise((resolve, reject) => {
            /** @type {?} */
            const pa = new Array();
            styles.forEach((style, index) => {
                if (style.iconInfo) {
                    /** @type {?} */
                    const s = Marker.CreateMarker(style.iconInfo);
                    if (typeof (s) === 'string') {
                        style.url = s;
                        if (style.width == null) {
                            style.width = style.iconInfo.size.width;
                            style.height = style.iconInfo.size.height;
                        }
                        if (style.iconInfo.markerOffsetRatio && style.iconInfo.size && style.anchor == null) {
                            /** @type {?} */
                            const o = style.iconInfo;
                            style.anchor = [
                                o.size.width * o.markerOffsetRatio.x,
                                o.size.height * o.markerOffsetRatio.y
                            ];
                        }
                        delete style.iconInfo;
                    }
                    else {
                        s.then(x => {
                            style.url = x.icon;
                            if (style.width == null) {
                                style.width = x.iconInfo.size.width;
                                style.height = x.iconInfo.size.height;
                            }
                            if (x.iconInfo.markerOffsetRatio && x.iconInfo.size && style.anchor == null) {
                                /** @type {?} */
                                const o = x.iconInfo;
                                style.anchor = [
                                    o.size.width * o.markerOffsetRatio.x,
                                    o.size.height * o.markerOffsetRatio.y
                                ];
                            }
                            delete style.iconInfo;
                        });
                        pa.push(s);
                    }
                }
            });
            if (pa.length === 0) {
                resolve(styles);
            }
            else {
                Promise.all(pa).then(() => {
                    resolve(styles);
                });
            }
        });
        return i;
    }
    /**
     * Adds the cluster layer to the map
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    AddLayer(layer) {
        /** @type {?} */
        const options = {
            id: layer.Id,
            visible: layer.Visible,
            clusteringEnabled: layer.ClusteringEnabled,
            zoomOnClick: layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster
        };
        if (layer.GridSize) {
            options.gridSize = layer.GridSize;
        }
        if (layer.MinimumClusterSize) {
            options.minimumClusterSize = layer.MinimumClusterSize;
        }
        if (layer.Styles) {
            options.styles = layer.Styles;
        }
        if (layer.UseDynamicSizeMarkers) {
            options.styles = null;
            // do not to attempt to setup styles here as the dynamic call back will generate them.
        }
        else {
            options.styles = [{
                    height: 30,
                    width: 35,
                    textColor: 'white',
                    textSize: 11,
                    backgroundPosition: 'center',
                    iconInfo: {
                        markerType: MarkerTypeId.FontMarker,
                        fontName: 'FontAwesome',
                        fontSize: 30,
                        color: 'green',
                        text: '\uF111'
                    }
                }];
        }
        /** @type {?} */
        const dynamicClusterCallback = (markers, numStyles, clusterer) => {
            /** @type {?} */
            const styles = this._layerStyles.get(layer.Id);
            /** @type {?} */
            const iconInfo = {
                markerType: MarkerTypeId.None
            };
            /** @type {?} */
            const icon = layer.CustomMarkerCallback(/** @type {?} */ (markers), iconInfo);
            styles[0] = {
                url: `\"data:image/svg+xml;utf8,${icon}\"`,
                height: iconInfo.size.height,
                width: iconInfo.size.width,
                textColor: 'white',
                textSize: 11,
                backgroundPosition: 'center',
            };
            return {
                text: markers.length.toString(),
                index: 1
            };
        };
        /** @type {?} */
        const resetStyles = (clusterer) => {
            if (this._layerStyles.has(layer.Id)) {
                this._layerStyles.get(layer.Id).splice(0);
            }
            else {
                /** @type {?} */
                const styles = new Array();
                styles.push({});
                this._layerStyles.set(layer.Id, styles);
                clusterer.setStyles(styles);
                // this is important for dynamic styles as the pointer to this array gets passed
                // around key objects in the clusterer. Therefore, it must be initialized here in order for
                // updates to the styles to be visible.
                // also, we need to add at least one style to prevent the default styles from being picked up.
            }
        };
        /** @type {?} */
        const layerPromise = this._mapService.CreateClusterLayer(options);
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(l => {
            /** @type {?} */
            const clusterer = /** @type {?} */ (l.NativePrimitve);
            if (options.styles) {
                /** @type {?} */
                const s = GoogleClusterService.CreateClusterIcons(options.styles);
                s.then(x => {
                    clusterer.setStyles(/** @type {?} */ (x));
                });
            }
            else {
                resetStyles(clusterer);
                this._mapService.MapPromise.then((m) => {
                    m.addListener('zoom_changed', () => {
                        resetStyles(clusterer);
                    });
                });
                clusterer.setCalculator((m, n) => {
                    return dynamicClusterCallback(m, n, clusterer);
                });
            }
        });
    }
    /**
     * Create a marker in the cluster
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    CreateMarker(layer, options) {
        /** @type {?} */
        const p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            return this._mapService.CreateMarker(options)
                .then((marker) => {
                marker.IsFirst = options.isFirst;
                marker.IsLast = options.isLast;
                l.AddEntity(marker);
                return marker;
            });
        });
    }
    /**
     * Starts the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    StartClustering(layer) {
        return Promise.resolve();
    }
    /**
     * Stops the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    StopClustering(layer) {
        return Promise.resolve();
    }
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    CreatePolygon(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    CreatePolygons(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
     * array of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    CreatePolylines(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
}
GoogleClusterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleClusterService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    GoogleClusterService.prototype._layers;
    /** @type {?} */
    GoogleClusterService.prototype._layerStyles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUd2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBUXRELE1BQU0sMkJBQTRCLFNBQVEsZUFBZTs7Ozs7OztJQWlGckQsWUFBWSxXQUF1QixFQUFFLEtBQWE7UUFDOUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQzt1QkE3RW1CLElBQUksR0FBRyxFQUEwQjs0QkFDUixJQUFJLEdBQUcsRUFBOEM7S0E2RTlIOzs7Ozs7Ozs7SUEvRE0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQStCOztRQUM1RCxNQUFNLENBQUMsR0FBcUMsSUFBSSxPQUFPLENBQTBCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUNqRyxNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssRUFBc0QsQ0FBQztZQUMzRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7b0JBQ2pCLE1BQU0sQ0FBQyxHQUE4RCxNQUFNLENBQUMsWUFBWSxDQUFDLEtB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Ozs7SUFhN0YsY0FBYyxDQUFDLEtBQWEsRUFBRSxPQUErQjtRQUNoRSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0lBYzdGLGNBQWMsQ0FBQyxLQUFhLEVBQUUsT0FBeUI7UUFDMUQsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYTlGLGVBQWUsQ0FBQyxLQUFhLEVBQUUsT0FBZ0M7UUFDbEUsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQzs7OztZQXpSeEcsVUFBVTs7OztZQVJGLFVBQVU7WUFSRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgTWFya2VyVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlci10eXBlLWlkJztcclxuaW1wb3J0IHsgQ2x1c3RlckNsaWNrQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NsdXN0ZXItY2xpY2stYWN0aW9uJztcclxuaW1wb3J0IHsgQ2x1c3RlckxheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jbHVzdGVyLWxheWVyJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVMYXllckJhc2UgfSBmcm9tICcuL2dvb2dsZS1sYXllci1iYXNlJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVDbHVzdGVyU2VydmljZSBleHRlbmRzIEdvb2dsZUxheWVyQmFzZSBpbXBsZW1lbnRzIENsdXN0ZXJTZXJ2aWNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJvdGVjdGVkIF9sYXllcnM6IE1hcDxudW1iZXIsIFByb21pc2U8TGF5ZXI+PiA9IG5ldyBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4oKTtcclxuICAgIHByb3RlY3RlZCBfbGF5ZXJTdHlsZXM6IE1hcDxudW1iZXIsIEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4+ID0gbmV3IE1hcDxudW1iZXIsIEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gU3RhdGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY2x1c3RlciBpY29uIGZyb20gdGhlIHN0eWxlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzdHlsZXNcclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgYW4gQXJyYXkgb2YgSUNsdXN0ZXJJY29uSW5mbyBvYmplY3RzXHJcbiAgICAgKiBjb250YWluaW5nIHRoZSBoeWRyYXRlZCBjbHVzdGVyIGljb25zLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlQ2x1c3Rlckljb25zKHN0eWxlczogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4pOiBQcm9taXNlPEFycmF5PElDbHVzdGVySWNvbkluZm8+PiB7XHJcbiAgICAgICAgY29uc3QgaTogUHJvbWlzZTxBcnJheTxJQ2x1c3Rlckljb25JbmZvPj4gPSBuZXcgUHJvbWlzZTxBcnJheTxJQ2x1c3Rlckljb25JbmZvPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYSA9IG5ldyBBcnJheTxQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99Pj4oKTtcclxuICAgICAgICAgICAgc3R5bGVzLmZvckVhY2goKHN0eWxlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmljb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgczogc3RyaW5nfFByb21pc2U8e2ljb246IHN0cmluZywgaWNvbkluZm86IElNYXJrZXJJY29uSW5mb30+ID0gTWFya2VyLkNyZWF0ZU1hcmtlcihzdHlsZS5pY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudXJsID0gcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLndpZHRoID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndpZHRoID0gc3R5bGUuaWNvbkluZm8uc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9IHN0eWxlLmljb25JbmZvLnNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbyAmJiBzdHlsZS5pY29uSW5mby5zaXplICYmIHN0eWxlLmFuY2hvciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvOiBJTWFya2VySWNvbkluZm8gPSBzdHlsZS5pY29uSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmFuY2hvciA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnNpemUud2lkdGggKiBvLm1hcmtlck9mZnNldFJhdGlvLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLmhlaWdodCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3R5bGUuaWNvbkluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzLnRoZW4oeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS51cmwgPSB4Lmljb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUud2lkdGggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndpZHRoID0geC5pY29uSW5mby5zaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9IHguaWNvbkluZm8uc2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbyAmJiB4Lmljb25JbmZvLnNpemUgJiYgc3R5bGUuYW5jaG9yID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvOiBJTWFya2VySWNvbkluZm8gPSB4Lmljb25JbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmFuY2hvciA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLndpZHRoICogby5tYXJrZXJPZmZzZXRSYXRpby54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnNpemUuaGVpZ2h0ICogby5tYXJrZXJPZmZzZXRSYXRpby55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdHlsZS5pY29uSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhLnB1c2gocyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHBhLmxlbmd0aCA9PT0gMCkgeyByZXNvbHZlKHN0eWxlcyk7IH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwYSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdHlsZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvcnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVDbHVzdGVyU2VydmljZS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZVxyXG4gICAgICogQHBhcmFtIF96b25lXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF96b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICBzdXBlcihfbWFwU2VydmljZSwgX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgY2x1c3RlciBsYXllciB0byB0aGUgbWFwXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZExheWVyKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiBsYXllci5JZCxcclxuICAgICAgICAgICAgdmlzaWJsZTogbGF5ZXIuVmlzaWJsZSxcclxuICAgICAgICAgICAgY2x1c3RlcmluZ0VuYWJsZWQ6IGxheWVyLkNsdXN0ZXJpbmdFbmFibGVkLFxyXG4gICAgICAgICAgICB6b29tT25DbGljazogbGF5ZXIuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAobGF5ZXIuR3JpZFNpemUpIHsgb3B0aW9ucy5ncmlkU2l6ZSA9IGxheWVyLkdyaWRTaXplOyB9XHJcbiAgICAgICAgaWYgKGxheWVyLk1pbmltdW1DbHVzdGVyU2l6ZSkgeyBvcHRpb25zLm1pbmltdW1DbHVzdGVyU2l6ZSA9IGxheWVyLk1pbmltdW1DbHVzdGVyU2l6ZTsgfVxyXG4gICAgICAgIGlmIChsYXllci5TdHlsZXMpIHsgb3B0aW9ucy5zdHlsZXMgPSBsYXllci5TdHlsZXM7IH1cclxuICAgICAgICBpZiAobGF5ZXIuVXNlRHluYW1pY1NpemVNYXJrZXJzKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3R5bGVzID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gZG8gbm90IHRvIGF0dGVtcHQgdG8gc2V0dXAgc3R5bGVzIGhlcmUgYXMgdGhlIGR5bmFtaWMgY2FsbCBiYWNrIHdpbGwgZ2VuZXJhdGUgdGhlbS5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3R5bGVzID0gW3tcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogMTEsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgaWNvbkluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJUeXBlOiBNYXJrZXJUeXBlSWQuRm9udE1hcmtlcixcclxuICAgICAgICAgICAgICAgICAgICBmb250TmFtZTogJ0ZvbnRBd2Vzb21lJyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdncmVlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1xcdUYxMTEnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkeW5hbWljQ2x1c3RlckNhbGxiYWNrID0gKG1hcmtlcnM6IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4sIG51bVN0eWxlczogbnVtYmVyLFxyXG4gICAgICAgICAgICBjbHVzdGVyZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBkeW5hbWljYWxseSBlbnN1cmUgdGhhdCB0aGUgbmVjZXNzYXJ5IHN0eWxlIGZvciB0aGlzIGNsdXN0ZXIgaWNvbiBleGlzdHMgYW5kXHJcbiAgICAgICAgICAgIC8vIHRoZSBjbHVzdGVyZXIgaXMgYWxyZWFkeSBob29rZWQgdXAgdG8gdGhlIHN0eWxlcyBhcnJheSB2aWEgcG9pbnRlciwgc28gd2Ugb25seVxyXG4gICAgICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSB0aGUgc3R5bGUuIFNpbmNlIHRoZSBjbHVzdGVyZXIgcmUtcmVuZGVycyBhIGNsdXN0ZXIgaWNvbiBpcyB0aGVcclxuICAgICAgICAgICAgLy8gdGhlIG1hcmtlciBjb3VudCBjaGFuZ2VzLCB3ZSB3aWxsIG9ubHkgbmVlZCB0byByZXRhaW4gdGhlIGN1cnJlbnQgaWNvbiBhcyBvcHBvc2VkXHJcbiAgICAgICAgICAgIC8vIHRvIGFsbCBjbHVzdGVyIGljb24uXHJcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlczogQXJyYXk8R29vZ2xlTWFwVHlwZXMuQ2x1c3RlclN0eWxlPiA9IHRoaXMuX2xheWVyU3R5bGVzLmdldChsYXllci5JZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25JbmZvOiBJTWFya2VySWNvbkluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXJUeXBlOiBNYXJrZXJUeXBlSWQuTm9uZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBpY29uOiBzdHJpbmcgPSBsYXllci5DdXN0b21NYXJrZXJDYWxsYmFjayg8YW55Pm1hcmtlcnMsIGljb25JbmZvKTtcclxuICAgICAgICAgICAgc3R5bGVzWzBdID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LCR7aWNvbn1cXFwiYCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaWNvbkluZm8uc2l6ZS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogaWNvbkluZm8uc2l6ZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgICAgIHRleHRTaXplOiAxMSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXJrZXJzLmxlbmd0aC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IDFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlc2V0U3R5bGVzID0gKGNsdXN0ZXJlcjogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXllclN0eWxlcy5oYXMobGF5ZXIuSWQpKSB7IHRoaXMuX2xheWVyU3R5bGVzLmdldChsYXllci5JZCkuc3BsaWNlKDApOyB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzOiBBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4oKTtcclxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKHt9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyU3R5bGVzLnNldChsYXllci5JZCwgc3R5bGVzKTtcclxuICAgICAgICAgICAgICAgIGNsdXN0ZXJlci5zZXRTdHlsZXMoc3R5bGVzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGltcG9ydGFudCBmb3IgZHluYW1pYyBzdHlsZXMgYXMgdGhlIHBvaW50ZXIgdG8gdGhpcyBhcnJheSBnZXRzIHBhc3NlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFyb3VuZCBrZXkgb2JqZWN0cyBpbiB0aGUgY2x1c3RlcmVyLiBUaGVyZWZvcmUsIGl0IG11c3QgYmUgaW5pdGlhbGl6ZWQgaGVyZSBpbiBvcmRlciBmb3JcclxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGVzIHRvIHRoZSBzdHlsZXMgdG8gYmUgdmlzaWJsZS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhbHNvLCB3ZSBuZWVkIHRvIGFkZCBhdCBsZWFzdCBvbmUgc3R5bGUgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBzdHlsZXMgZnJvbSBiZWluZyBwaWNrZWQgdXAuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBsYXllclByb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUNsdXN0ZXJMYXllcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLklkLCBsYXllclByb21pc2UpO1xyXG4gICAgICAgIGxheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbHVzdGVyZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlciA9IDxHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXI+bC5OYXRpdmVQcmltaXR2ZTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3R5bGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzICA9IEdvb2dsZUNsdXN0ZXJTZXJ2aWNlLkNyZWF0ZUNsdXN0ZXJJY29ucyhvcHRpb25zLnN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICBzLnRoZW4oeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlcmVyLnNldFN0eWxlcyg8QXJyYXk8R29vZ2xlTWFwVHlwZXMuQ2x1c3RlclN0eWxlPj54KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZXMoY2x1c3RlcmVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZS50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtLmFkZExpc3RlbmVyKCd6b29tX2NoYW5nZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGVzKGNsdXN0ZXJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNsdXN0ZXJlci5zZXRDYWxjdWxhdG9yKChtLCBuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR5bmFtaWNDbHVzdGVyQ2FsbGJhY2sobSwgbiwgY2x1c3RlcmVyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBtYXJrZXIgaW4gdGhlIGNsdXN0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJcclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IFByb21pc2U8TWFya2VyPiB7XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XHJcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlTWFya2VyKG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigobWFya2VyOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuSXNGaXJzdCA9IG9wdGlvbnMuaXNGaXJzdDtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuSXNMYXN0ID0gb3B0aW9ucy5pc0xhc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgbC5BZGRFbnRpdHkobWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFya2VyO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdGhlIGNsdXN0ZXJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3RhcnRDbHVzdGVyaW5nKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgY2x1c3RlcmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllclxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTdG9wQ2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbi5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWdvbiBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24obGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XHJcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWdvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWdvbnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlnb25zIHRvIGJlIHVzZWQgaW4gYnVsa1xyXG4gICAgICogb3BlcmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29ucy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbnMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlnb25PcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+IHtcclxuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5Z29ucyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbGluZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgbGluZS5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWxpbmUgKG9yIGFuXHJcbiAgICAgKiBhcnJheSBvZiBwb2x5Z29ucyBmb3IgY29tcGxleCBwYXRocykgbW9kZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcclxuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lcy5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlsaW5lIG1vZGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlsaW5lcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcclxuICAgIH1cclxufVxyXG4iXX0=