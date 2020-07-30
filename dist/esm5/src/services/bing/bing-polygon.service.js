/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polygon Service abstract class for Bing Maps V8.
 *
 * @export
 */
var BingPolygonService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingPolygonService.
     * @param _mapService - {@link MapService} instance. The concrete {@link BingMapService} implementation is expected.
     * @param _layerService - {@link BingLayerService} instance.
     * The concrete {@link BingLayerService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof BingPolygonService
     */
    function BingPolygonService(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polygons = new Map();
    }
    /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    BingPolygonService.prototype.AddPolygon = /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    function (polygon) {
        /** @type {?} */
        var o = {
            id: polygon.Id,
            clickable: polygon.Clickable,
            draggable: polygon.Draggable,
            editable: polygon.Editable,
            fillColor: polygon.FillColor,
            fillOpacity: polygon.FillOpacity,
            geodesic: polygon.Geodesic,
            labelMaxZoom: polygon.LabelMaxZoom,
            labelMinZoom: polygon.LabelMinZoom,
            paths: polygon.Paths,
            showLabel: polygon.ShowLabel,
            showTooltip: polygon.ShowTooltip,
            strokeColor: polygon.StrokeColor,
            strokeOpacity: polygon.StrokeOpacity,
            strokeWeight: polygon.StrokeWeight,
            title: polygon.Title,
            visible: polygon.Visible,
            zIndex: polygon.zIndex,
        };
        /** @type {?} */
        var polygonPromise;
        if (polygon.InCustomLayer) {
            polygonPromise = this._layerService.CreatePolygon(polygon.LayerId, o);
        }
        else {
            polygonPromise = this._mapService.CreatePolygon(o);
        }
        this._polygons.set(polygon, polygonPromise);
    };
    /**
     * Registers an event delegate for a polygon.
     *
     * \@memberof BingPolygonService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    BingPolygonService.prototype.CreateEventObservable = /**
     * Registers an event delegate for a polygon.
     *
     * \@memberof BingPolygonService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, polygon) {
        var _this = this;
        /** @type {?} */
        var b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        return Observable.create(function (observer) {
            _this._polygons.get(polygon).then(function (p) {
                p.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes a polygon.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    BingPolygonService.prototype.DeletePolygon = /**
     * Deletes a polygon.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    function (polygon) {
        var _this = this;
        /** @type {?} */
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.Delete();
                _this._polygons.delete(polygon);
            });
        });
    };
    /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof BingPolygonService
     * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    BingPolygonService.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof BingPolygonService
     * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    function (e) {
        /** @type {?} */
        var x = /** @type {?} */ (e);
        return { latitude: x.location.latitude, longitude: x.location.longitude };
    };
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    BingPolygonService.prototype.GetNativePolygon = /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    function (polygon) {
        return this._polygons.get(polygon);
    };
    /**
     * Set the polygon options.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    BingPolygonService.prototype.SetOptions = /**
     * Set the polygon options.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    function (polygon, options) {
        return this._polygons.get(polygon).then(function (l) { l.SetOptions(options); });
    };
    /**
     * Updates the Polygon path
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    BingPolygonService.prototype.UpdatePolygon = /**
     * Updates the Polygon path
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    function (polygon) {
        /** @type {?} */
        var m = this._polygons.get(polygon);
        if (m == null || polygon.Paths == null || !Array.isArray(polygon.Paths) || polygon.Paths.length === 0) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            if (Array.isArray(polygon.Paths[0])) {
                l.SetPaths(polygon.Paths);
            }
            else {
                l.SetPath(/** @type {?} */ (polygon.Paths));
            }
        });
    };
    BingPolygonService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingPolygonService.ctorParameters = function () { return [
        { type: MapService },
        { type: LayerService },
        { type: NgZone }
    ]; };
    return BingPolygonService;
}());
export { BingPolygonService };
if (false) {
    /** @type {?} */
    BingPolygonService.prototype._polygons;
    /** @type {?} */
    BingPolygonService.prototype._mapService;
    /** @type {?} */
    BingPolygonService.prototype._layerService;
    /** @type {?} */
    BingPolygonService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLXBvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFNckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7OztJQWU1QyxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7Ozs7T0FRRztJQUNILDRCQUFvQixXQUF1QixFQUMvQixlQUNBO1FBRlEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2IsVUFBSyxHQUFMLEtBQUs7eUJBakIrQyxJQUFJLEdBQUcsRUFBeUM7S0FrQi9HOzs7Ozs7Ozs7O0lBVU0sdUNBQVU7Ozs7Ozs7OztjQUFDLE9BQTRCOztRQUMxQyxJQUFNLENBQUMsR0FBb0I7WUFDdkIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO1lBQ3BDLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDOztRQUNGLElBQUksY0FBYyxDQUFtQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4QixjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RTtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZekMsa0RBQXFCOzs7Ozs7Ozs7O2NBQUksU0FBaUIsRUFBRSxPQUE0Qjs7O1FBQzNFLElBQU0sQ0FBQyxHQUFlLElBQUksT0FBTyxFQUFLLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMzQjtRQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDM0I7UUFLRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQXFCO1lBQzNDLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVU7Z0JBQ3hDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO2FBQzlFLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVdBLDBDQUFhOzs7Ozs7OztjQUFDLE9BQTRCOzs7UUFDN0MsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFVO1lBQ3JCLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNYLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2xDLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFhQSxvREFBdUI7Ozs7Ozs7OztjQUFDLENBQW1COztRQUM5QyxJQUFNLENBQUMscUJBQW1FLENBQUMsRUFBQztRQUM1RSxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7Ozs7Ozs7SUFXdkUsNkNBQWdCOzs7Ozs7OztjQUFDLE9BQTRCO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYWhDLHVDQUFVOzs7Ozs7Ozs7O2NBQUMsT0FBNEIsRUFBRSxPQUF3QjtRQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBVSxJQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXakYsMENBQWE7Ozs7Ozs7O2NBQUMsT0FBNEI7O1FBQzdDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVU7WUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxPQUFPLG1CQUFrQixPQUFPLENBQUMsS0FBSyxFQUFDLENBQUM7YUFDN0M7U0FDSixDQUFDLENBQUM7OztnQkEvS1YsVUFBVTs7OztnQkFSRixVQUFVO2dCQUNWLFlBQVk7Z0JBUkEsTUFBTTs7NkJBQTNCOztTQWdCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgTWFwUG9seWdvbkRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLXBvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3BvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL2xheWVyLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb2x5Z29uIFNlcnZpY2UgYWJzdHJhY3QgY2xhc3MgZm9yIEJpbmcgTWFwcyBWOC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmluZ1BvbHlnb25TZXJ2aWNlIGltcGxlbWVudHMgUG9seWdvblNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9wb2x5Z29uczogTWFwPE1hcFBvbHlnb25EaXJlY3RpdmUsIFByb21pc2U8UG9seWdvbj4+ID0gbmV3IE1hcDxNYXBQb2x5Z29uRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlnb24+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ1BvbHlnb25TZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0ge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gICAgICogVGhlIGNvbmNyZXRlIHtAbGluayBCaW5nTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gYSBtYXAuIERlcGVuZGluZyBvbiB0aGUgcG9seWdvbiBjb250ZXh0LCB0aGUgcG9seWdvbiB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGFcclxuICAgICAqIGNvcnJlY3Nwb25kaW5nIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSBhZGRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBJUG9seWdvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiBwb2x5Z29uLklkLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHBvbHlnb24uQ2xpY2thYmxlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHBvbHlnb24uRHJhZ2dhYmxlLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogcG9seWdvbi5FZGl0YWJsZSxcclxuICAgICAgICAgICAgZmlsbENvbG9yOiBwb2x5Z29uLkZpbGxDb2xvcixcclxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IHBvbHlnb24uRmlsbE9wYWNpdHksXHJcbiAgICAgICAgICAgIGdlb2Rlc2ljOiBwb2x5Z29uLkdlb2Rlc2ljLFxyXG4gICAgICAgICAgICBsYWJlbE1heFpvb206IHBvbHlnb24uTGFiZWxNYXhab29tLFxyXG4gICAgICAgICAgICBsYWJlbE1pblpvb206IHBvbHlnb24uTGFiZWxNaW5ab29tLFxyXG4gICAgICAgICAgICBwYXRoczogcG9seWdvbi5QYXRocyxcclxuICAgICAgICAgICAgc2hvd0xhYmVsOiBwb2x5Z29uLlNob3dMYWJlbCxcclxuICAgICAgICAgICAgc2hvd1Rvb2x0aXA6IHBvbHlnb24uU2hvd1Rvb2x0aXAsXHJcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwb2x5Z29uLlN0cm9rZUNvbG9yLFxyXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiBwb2x5Z29uLlN0cm9rZU9wYWNpdHksXHJcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogcG9seWdvbi5TdHJva2VXZWlnaHQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBwb2x5Z29uLlRpdGxlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBwb2x5Z29uLlZpc2libGUsXHJcbiAgICAgICAgICAgIHpJbmRleDogcG9seWdvbi56SW5kZXgsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgcG9seWdvblByb21pc2U6IFByb21pc2U8UG9seWdvbj47XHJcbiAgICAgICAgaWYgKHBvbHlnb24uSW5DdXN0b21MYXllcikge1xyXG4gICAgICAgICAgICBwb2x5Z29uUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5DcmVhdGVQb2x5Z29uKHBvbHlnb24uTGF5ZXJJZCwgbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwb2x5Z29uUHJvbWlzZSA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlUG9seWdvbihvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbnMuc2V0KHBvbHlnb24sIHBvbHlnb25Qcm9taXNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgcG9seWdvbi5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAgKiBAcGFyYW0gcG9seWdvbiAtIFRoZSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgZW1pdGluZyBhbiBpbnN0YW5jZSBvZiBUIGVhY2ggdGltZSB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICAqXHJcbiAgICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGI6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnROYW1lID09PSAncmlnaHRjbGljaycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBtb3VzZW1vdmUgYW5kIHJpZ2h0Y2xpY2sgYXJlIG5vdCBzdXBwb3J0ZWQgYnkgYmluZyBwb2x5Z29ucy5cclxuICAgICAgICAvLy9cclxuXHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pLnRoZW4oKHA6IFBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHAuQWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBEZWxldGVzIGEgcG9seWdvbi5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBwb2x5Z29uIC0ge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXHJcbiAgICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5Z29uIGhhcyBiZWVuIGRlbGV0ZWQuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbC5EZWxldGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zLmRlbGV0ZShwb2x5Z29uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBwb2x5Z29uIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuIEV4cGVjdGVkIHRvIGltcGxlbWVudCB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzfS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnQgfCBhbnkpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgY29uc3QgeDogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzID0gPE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncz5lO1xyXG4gICAgICAgIHJldHVybiB7IGxhdGl0dWRlOiB4LmxvY2F0aW9uLmxhdGl0dWRlLCBsb25naXR1ZGU6IHgubG9jYXRpb24ubG9uZ2l0dWRlIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBwb2x5Z29uIG1vZGVsIGZvciB0aGUgcG9seWdvbiBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gb2J0YWluIHRoZSBwb2x5Z29uIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBQb2x5Z29ufSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPFBvbHlnb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElQb2x5Z29uT3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIE9wdGlvbnMgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGVcclxuICAgICAqIG9wdGlvbnMgYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gb3B0aW9ucyBoYXZlIGJlZW4gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKS50aGVuKChsOiBQb2x5Z29uKSA9PiB7IGwuU2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBQb2x5Z29uIHBhdGhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWdvbiAtIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5Z29uIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsIHx8IHBvbHlnb24uUGF0aHMgPT0gbnVsbCB8fCAhQXJyYXkuaXNBcnJheShwb2x5Z29uLlBhdGhzKSB8fCBwb2x5Z29uLlBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlnb24pID0+ICB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBvbHlnb24uUGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBsLlNldFBhdGhzKHBvbHlnb24uUGF0aHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbC5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+cG9seWdvbi5QYXRocyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19