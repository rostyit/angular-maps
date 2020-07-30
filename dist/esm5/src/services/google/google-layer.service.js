/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { GoogleLayer } from '../../models/google/google-layer';
import { GooglePolygon } from '../../models/google/google-polygon';
import { GooglePolyline } from '../../models/google/google-polyline';
import { GoogleLayerBase } from './google-layer-base';
import { MapService } from '../map.service';
import { GoogleConversions } from './google-conversions';
/**
 * Implements the {\@link LayerService} contract for a Google Maps specific implementation.
 *
 * @export
 */
var GoogleLayerService = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleLayerService, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GoogleLayerService.
     * @param _mapService - Instance of the Google Maps Service. Will generally be injected.
     * @param _zone - NgZone instance to provide zone aware promises.
     *
     * @memberof GoogleLayerService
     */
    function GoogleLayerService(_mapService, _zone) {
        var _this = _super.call(this, _mapService, _zone) || this;
        _this._layers = new Map();
        return _this;
    }
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    GoogleLayerService.prototype.AddLayer = /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    function (layer) {
        var _this = this;
        /** @type {?} */
        var p = new Promise(function (resolve, reject) {
            _this._mapService.MapPromise.then(function (m) {
                /** @type {?} */
                var l = new GoogleLayer(m, _this._mapService, layer.Id);
                l.SetVisible(layer.Visible);
                resolve(l);
            });
        });
        this._layers.set(layer.Id, p);
    };
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    GoogleLayerService.prototype.CreatePolygon = /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    function (layer, options) {
        /** @type {?} */
        var p = this._mapService.CreatePolygon(options);
        /** @type {?} */
        var l = this._layers.get(layer);
        Promise.all([p, l]).then(function (x) { return x[1].AddEntity(x[0]); });
        return p;
    };
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    GoogleLayerService.prototype.CreatePolygons = /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    function (layer, options) {
        /** @type {?} */
        var p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            /** @type {?} */
            var polygons = new Promise(function (resolve, reject) {
                /** @type {?} */
                var polys = options.map(function (o) {
                    /** @type {?} */
                    var op = GoogleConversions.TranslatePolygonOptions(o);
                    /** @type {?} */
                    var poly = new google.maps.Polygon(op);
                    /** @type {?} */
                    var polygon = new GooglePolygon(poly);
                    if (o.title && o.title !== '') {
                        polygon.Title = o.title;
                    }
                    if (o.metadata) {
                        o.metadata.forEach(function (val, key) { return polygon.Metadata.set(key, val); });
                    }
                    return polygon;
                });
                resolve(polys);
            });
            return polygons;
        });
    };
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polyline.
     * @param {?} options - Polyline options defining the polyline.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    GoogleLayerService.prototype.CreatePolyline = /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polyline.
     * @param {?} options - Polyline options defining the polyline.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    function (layer, options) {
        /** @type {?} */
        var p = this._mapService.CreatePolyline(options);
        /** @type {?} */
        var l = this._layers.get(layer);
        Promise.all([p, l]).then(function (x) {
            /** @type {?} */
            var p1 = Array.isArray(x[0]) ? /** @type {?} */ (x[0]) : [/** @type {?} */ (x[0])];
            try {
                for (var p1_1 = tslib_1.__values(p1), p1_1_1 = p1_1.next(); !p1_1_1.done; p1_1_1 = p1_1.next()) {
                    var p2 = p1_1_1.value;
                    x[1].AddEntity(p2);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (p1_1_1 && !p1_1_1.done && (_a = p1_1.return)) _a.call(p1_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        });
        return p;
    };
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    GoogleLayerService.prototype.CreatePolylines = /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    function (layer, options) {
        /** @type {?} */
        var p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            /** @type {?} */
            var polylines = new Promise(function (resolve, reject) {
                /** @type {?} */
                var polys = options.map(function (o) {
                    /** @type {?} */
                    var op = GoogleConversions.TranslatePolylineOptions(o);
                    if (o.path && o.path.length > 0 && !Array.isArray(o.path[0])) {
                        op.path = GoogleConversions.TranslatePaths(o.path)[0];
                        /** @type {?} */
                        var poly = new google.maps.Polyline(op);
                        /** @type {?} */
                        var polyline_1 = new GooglePolyline(poly);
                        if (o.title && o.title !== '') {
                            polyline_1.Title = o.title;
                        }
                        if (o.metadata) {
                            o.metadata.forEach(function (v, k) { return polyline_1.Metadata.set(k, v); });
                        }
                        return polyline_1;
                    }
                    else {
                        /** @type {?} */
                        var paths = GoogleConversions.TranslatePaths(o.path);
                        /** @type {?} */
                        var lines_1 = new Array();
                        paths.forEach(function (x) {
                            op.path = x;
                            /** @type {?} */
                            var poly = new google.maps.Polyline(op);
                            /** @type {?} */
                            var polyline = new GooglePolyline(poly);
                            if (o.metadata) {
                                o.metadata.forEach(function (v, k) { return polyline.Metadata.set(k, v); });
                            }
                            if (o.title && o.title !== '') {
                                polyline.Title = o.title;
                            }
                            lines_1.push(polyline);
                        });
                        return lines_1;
                    }
                });
                resolve(polys);
            });
            return polylines;
        });
    };
    GoogleLayerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleLayerService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return GoogleLayerService;
}(GoogleLayerBase));
export { GoogleLayerService };
if (false) {
    /** @type {?} */
    GoogleLayerService.prototype._layers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFHckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7OztJQVdqQiw4Q0FBZTtJQU9uRCxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCw0QkFBWSxXQUF1QixFQUFFLEtBQWE7UUFBbEQsWUFDSSxrQkFBTSxXQUFXLEVBQUUsS0FBSyxDQUFDLFNBQzVCO3dCQWZnRCxJQUFJLEdBQUcsRUFBMEI7O0tBZWpGOzs7Ozs7Ozs7Ozs7SUFZTSxxQ0FBUTs7Ozs7Ozs7Ozs7Y0FBQyxLQUF3Qjs7O1FBQ3BDLElBQU0sQ0FBQyxHQUFtQixJQUFJLE9BQU8sQ0FBUSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3pELEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7O2dCQUM5QixJQUFNLENBQUMsR0FBZ0IsSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RSxD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QUFJLEdBQUcsQ0FBQyxDQUFDOzs0QkFDWixJQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs0QkFDMUMsSUFBTSxRQUFRLEdBQW1CLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQzs2QkFBRTs0QkFDOUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDOzZCQUFFOzRCQUMzRCxPQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUN4QixDQUFDLENBQUM7d0JBQ0gsTUFBTSxDQUFDLE9BQUssQ0FBQztxQkFDaEI7aUJBQ0osQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQixDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ3BCLENBQUMsQ0FBQzs7O2dCQWpLVixVQUFVOzs7O2dCQVhGLFVBQVU7Z0JBZEUsTUFBTTs7NkJBQTNCO0VBMEJ3QyxlQUFlO1NBQTFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IEdvb2dsZUxheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbGF5ZXInO1xyXG5pbXBvcnQgeyBHb29nbGVQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWdvbic7XHJcbmltcG9ydCB7IEdvb2dsZVBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLWxheWVyJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZUxheWVyQmFzZSB9IGZyb20gJy4vZ29vZ2xlLWxheWVyLWJhc2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4vZ29vZ2xlLWNvbnZlcnNpb25zJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwLXR5cGVzJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIHtAbGluayBMYXllclNlcnZpY2V9IGNvbnRyYWN0IGZvciBhIEdvb2dsZSBNYXBzIHNwZWNpZmljIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVMYXllclNlcnZpY2UgZXh0ZW5kcyBHb29nbGVMYXllckJhc2UgaW1wbGVtZW50cyBMYXllclNlcnZpY2UgIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBEZWNsYXJhdGlvbnMuXHJcbiAgICAvLy9cclxuICAgIHByb3RlY3RlZCBfbGF5ZXJzOiBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4gPSBuZXcgTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVMYXllclNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBJbnN0YW5jZSBvZiB0aGUgR29vZ2xlIE1hcHMgU2VydmljZS4gV2lsbCBnZW5lcmFsbHkgYmUgaW5qZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBOZ1pvbmUgaW5zdGFuY2UgdG8gcHJvdmlkZSB6b25lIGF3YXJlIHByb21pc2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF96b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICBzdXBlcihfbWFwU2VydmljZSwgX3pvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0LlxyXG4gICAgICogR2VuZXJhbGx5LCBNYXBMYXllckRpcmVjdGl2ZSB3aWxsIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IG5ldyBQcm9taXNlPExheWVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZS50aGVuKG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbDogR29vZ2xlTGF5ZXIgPSBuZXcgR29vZ2xlTGF5ZXIobSwgdGhpcy5fbWFwU2VydmljZSwgbGF5ZXIuSWQpO1xyXG4gICAgICAgICAgICAgICAgbC5TZXRWaXNpYmxlKGxheWVyLlZpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnNldChsYXllci5JZCwgcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5Z29uIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24obGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XHJcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxQb2x5Z29uPiA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlUG9seWdvbihvcHRpb25zKTtcclxuICAgICAgICBjb25zdCBsOiBQcm9taXNlPExheWVyPiA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIpO1xyXG4gICAgICAgIFByb21pc2UuYWxsKFtwLCBsXSkudGhlbih4ID0+IHhbMV0uQWRkRW50aXR5KHhbMF0pKTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5Z29ucy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWdvbnMgdG8gYmUgdXNlZCBpbiBidWxrXHJcbiAgICAgKiBvcGVyYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5Z29uLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWdvbiBtb2RlbHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbnMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlnb25PcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+IHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIE5vdGU6IHdlIGF0dGVtcHRlZCB1c2luZyBkYXRhLlBvbHlnb25zIGluIGFuIGF0dGVtcHQgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSwgYnV0IGVpdGhlciBkYXRhLlBvbHlnb25cclxuICAgICAgICAvLyBvciBkYXRhLk11bHRpUG9seWdvbiBhY3R1YWxseSBvcGVyYXRlIHNpZ25pZmljYW50bHkgc2xvd2VyIHRoYW4gZ2VuZXJhdGluZyB0aGUgcG9seWdvbnMgdGhpcyB3YXkuXHJcbiAgICAgICAgLy8gdGhlIHNsb3duZXNzIGluIGdvb2dsZSBhcyBvcHBvc2VkIHRvIGJpbmcgcHJvYmFibHkgY29tZXMgZnJvbSB0aGUgcG9pbnQgcmVkdWN0aW9uIGFsZ29yaXRobSB1c2VzLlxyXG4gICAgICAgIC8vIFNpZ25pZ2ljYW50IHBlcmZvcm1hbmNlIGltcHJvdmVtZW50cyBtaWdodCBiZSBwb3NzaWJsZSBpbiBnb29nbGUgd2hlbiB1c2luZyBhIHBpeGVsIGJhc2VkIHJlZHVjdGlvbiBhbGdvcml0aG1cclxuICAgICAgICAvLyBwcmlvciB0byBzZXR0aW5nIHRoZSBwb2x5Z29uIHBhdGguIFRoaXMgd2lsbCBsb3dlciB0byBwcm9jZXNzaW5nIG92ZXJoZWFkIG9mIHRoZSBnb29nbGUgYWxnb3JpdGhtICh3aXRoIGlzIERvdWdsYXMtUGV1Y2tlclxyXG4gICAgICAgIC8vIGFuZCByYXRoZXIgY29tcHV0ZSBpbnRlbnNpdmUpXHJcbiAgICAgICAgLy9cclxuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IHRoaXMuR2V0TGF5ZXJCeUlkKGxheWVyKTtcclxuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHRocm93IChuZXcgRXJyb3IoYExheWVyIHdpdGggaWQgJHtsYXllcn0gbm90IGZvdW5kIGluIExheWVyIE1hcGApKTsgfVxyXG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb25zOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiA9IG5ldyBQcm9taXNlPEFycmF5PFBvbHlnb24+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2x5czogQXJyYXk8R29vZ2xlUG9seWdvbj4gPSBvcHRpb25zLm1hcChvID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcDogR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5OiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlnb24ob3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlnb246IEdvb2dsZVBvbHlnb24gPSBuZXcgR29vZ2xlUG9seWdvbihwb2x5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoby50aXRsZSAmJiBvLnRpdGxlICE9PSAnJykgeyBwb2x5Z29uLlRpdGxlID0gby50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvLm1ldGFkYXRhKSB7IG8ubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBwb2x5Z29uLk1ldGFkYXRhLnNldChrZXksIHZhbCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbHlnb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocG9seXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb25zO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlsaW5lIHRvIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWxpbmUuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlsaW5lIChvciBhbiBhcnJheVxyXG4gICAgICogb2YgcG9seWdvbnMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlUG9seWxpbmUob3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgbDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKTtcclxuICAgICAgICBQcm9taXNlLmFsbChbcCwgbF0pLnRoZW4oeCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAxOiBBcnJheTxQb2x5bGluZT4gPSAgQXJyYXkuaXNBcnJheSh4WzBdKSA/IDxBcnJheTxQb2x5bGluZT4+eFswXSA6IFs8UG9seWxpbmU+eFswXV07XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcDIgb2YgcDEpIHt4WzFdLkFkZEVudGl0eShwMik7IH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5bGluZXMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlsaW5lcyB0byBiZSB1c2VkIGluIGJ1bGtcclxuICAgICAqIG9wZXJhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlsaW5lcy5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWxpbmVzLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWxpbmUgbW9kZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xyXG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XHJcbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9seWxpbmVzOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+ID0gbmV3IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9seXM6IEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4gPSBvcHRpb25zLm1hcChvID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcDogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvLnBhdGggJiYgby5wYXRoLmxlbmd0aCA+IDAgJiYgIUFycmF5LmlzQXJyYXkoby5wYXRoWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcC5wYXRoID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMoby5wYXRoKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seTogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmUgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWxpbmUob3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5bGluZTogR29vZ2xlUG9seWxpbmUgPSBuZXcgR29vZ2xlUG9seWxpbmUocG9seSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnRpdGxlICYmIG8udGl0bGUgIT09ICcnKSB7IHBvbHlsaW5lLlRpdGxlID0gby50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbHlsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aHM6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+ID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMoby5wYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZXM6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wLnBhdGggPSB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5bGluZTogR29vZ2xlUG9seWxpbmUgPSBuZXcgR29vZ2xlUG9seWxpbmUocG9seSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLnRpdGxlICYmIG8udGl0bGUgIT09ICcnKSB7cG9seWxpbmUuVGl0bGUgPSBvLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHBvbHlsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaW5lcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocG9seXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHBvbHlsaW5lcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19