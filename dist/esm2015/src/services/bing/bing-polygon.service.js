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
export class BingPolygonService {
    /**
     * Creates an instance of BingPolygonService.
     * \@memberof BingPolygonService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link BingMapService} implementation is expected.
     * @param {?} _layerService - {\@link BingLayerService} instance.
     * The concrete {\@link BingLayerService} implementation is expected.
     * @param {?} _zone - NgZone instance to support zone aware promises.
     *
     */
    constructor(_mapService, _layerService, _zone) {
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
    AddPolygon(polygon) {
        /** @type {?} */
        const o = {
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
        let polygonPromise;
        if (polygon.InCustomLayer) {
            polygonPromise = this._layerService.CreatePolygon(polygon.LayerId, o);
        }
        else {
            polygonPromise = this._mapService.CreatePolygon(o);
        }
        this._polygons.set(polygon, polygonPromise);
    }
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
    CreateEventObservable(eventName, polygon) {
        /** @type {?} */
        const b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        return Observable.create((observer) => {
            this._polygons.get(polygon).then((p) => {
                p.AddListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes a polygon.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    DeletePolygon(polygon) {
        /** @type {?} */
        const m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.Delete();
                this._polygons.delete(polygon);
            });
        });
    }
    /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof BingPolygonService
     * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    GetCoordinatesFromClick(e) {
        /** @type {?} */
        const x = /** @type {?} */ (e);
        return { latitude: x.location.latitude, longitude: x.location.longitude };
    }
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    GetNativePolygon(polygon) {
        return this._polygons.get(polygon);
    }
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
    SetOptions(polygon, options) {
        return this._polygons.get(polygon).then((l) => { l.SetOptions(options); });
    }
    /**
     * Updates the Polygon path
     *
     * \@memberof BingPolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    UpdatePolygon(polygon) {
        /** @type {?} */
        const m = this._polygons.get(polygon);
        if (m == null || polygon.Paths == null || !Array.isArray(polygon.Paths) || polygon.Paths.length === 0) {
            return Promise.resolve();
        }
        return m.then((l) => {
            if (Array.isArray(polygon.Paths[0])) {
                l.SetPaths(polygon.Paths);
            }
            else {
                l.SetPath(/** @type {?} */ (polygon.Paths));
            }
        });
    }
}
BingPolygonService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingPolygonService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLXBvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFNckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBUWhELE1BQU07Ozs7Ozs7Ozs7SUFvQkYsWUFBb0IsV0FBdUIsRUFDL0IsZUFDQTtRQUZRLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQy9CLGtCQUFhLEdBQWIsYUFBYTtRQUNiLFVBQUssR0FBTCxLQUFLO3lCQWpCK0MsSUFBSSxHQUFHLEVBQXlDO0tBa0IvRzs7Ozs7Ozs7OztJQVVNLFVBQVUsQ0FBQyxPQUE0Qjs7UUFDMUMsTUFBTSxDQUFDLEdBQW9CO1lBQ3ZCLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1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bmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgTWFwUG9seWdvbkRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLXBvbHlnb24nO1xyXG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3BvbHlnb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL2xheWVyLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb2x5Z29uIFNlcnZpY2UgYWJzdHJhY3QgY2xhc3MgZm9yIEJpbmcgTWFwcyBWOC5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmluZ1BvbHlnb25TZXJ2aWNlIGltcGxlbWVudHMgUG9seWdvblNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9wb2x5Z29uczogTWFwPE1hcFBvbHlnb25EaXJlY3RpdmUsIFByb21pc2U8UG9seWdvbj4+ID0gbmV3IE1hcDxNYXBQb2x5Z29uRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlnb24+PigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ1BvbHlnb25TZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0ge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9IGluc3RhbmNlLlxyXG4gICAgICogVGhlIGNvbmNyZXRlIHtAbGluayBCaW5nTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gYSBtYXAuIERlcGVuZGluZyBvbiB0aGUgcG9seWdvbiBjb250ZXh0LCB0aGUgcG9seWdvbiB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGFcclxuICAgICAqIGNvcnJlY3Nwb25kaW5nIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSBhZGRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvOiBJUG9seWdvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiBwb2x5Z29uLklkLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHBvbHlnb24uQ2xpY2thYmxlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHBvbHlnb24uRHJhZ2dhYmxlLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogcG9seWdvbi5FZGl0YWJsZSxcclxuICAgICAgICAgICAgZmlsbENvbG9yOiBwb2x5Z29uLkZpbGxDb2xvcixcclxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IHBvbHlnb24uRmlsbE9wYWNpdHksXHJcbiAgICAgICAgICAgIGdlb2Rlc2ljOiBwb2x5Z29uLkdlb2Rlc2ljLFxyXG4gICAgICAgICAgICBsYWJlbE1heFpvb206IHBvbHlnb24uTGFiZWxNYXhab29tLFxyXG4gICAgICAgICAgICBsYWJlbE1pblpvb206IHBvbHlnb24uTGFiZWxNaW5ab29tLFxyXG4gICAgICAgICAgICBwYXRoczogcG9seWdvbi5QYXRocyxcclxuICAgICAgICAgICAgc2hvd0xhYmVsOiBwb2x5Z29uLlNob3dMYWJlbCxcclxuICAgICAgICAgICAgc2hvd1Rvb2x0aXA6IHBvbHlnb24uU2hvd1Rvb2x0aXAsXHJcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwb2x5Z29uLlN0cm9rZUNvbG9yLFxyXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiBwb2x5Z29uLlN0cm9rZU9wYWNpdHksXHJcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogcG9seWdvbi5TdHJva2VXZWlnaHQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBwb2x5Z29uLlRpdGxlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBwb2x5Z29uLlZpc2libGUsXHJcbiAgICAgICAgICAgIHpJbmRleDogcG9seWdvbi56SW5kZXgsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgcG9seWdvblByb21pc2U6IFByb21pc2U8UG9seWdvbj47XHJcbiAgICAgICAgaWYgKHBvbHlnb24uSW5DdXN0b21MYXllcikge1xyXG4gICAgICAgICAgICBwb2x5Z29uUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5DcmVhdGVQb2x5Z29uKHBvbHlnb24uTGF5ZXJJZCwgbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwb2x5Z29uUHJvbWlzZSA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlUG9seWdvbihvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcG9seWdvbnMuc2V0KHBvbHlnb24sIHBvbHlnb25Qcm9taXNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgcG9seWdvbi5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcclxuICAgICAgKiBAcGFyYW0gcG9seWdvbiAtIFRoZSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cclxuICAgICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgZW1pdGluZyBhbiBpbnN0YW5jZSBvZiBUIGVhY2ggdGltZSB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICAqXHJcbiAgICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGI6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnROYW1lID09PSAncmlnaHRjbGljaycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBtb3VzZW1vdmUgYW5kIHJpZ2h0Y2xpY2sgYXJlIG5vdCBzdXBwb3J0ZWQgYnkgYmluZyBwb2x5Z29ucy5cclxuICAgICAgICAvLy9cclxuXHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pLnRoZW4oKHA6IFBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHAuQWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBEZWxldGVzIGEgcG9seWdvbi5cclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSBwb2x5Z29uIC0ge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXHJcbiAgICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5Z29uIGhhcyBiZWVuIGRlbGV0ZWQuXHJcbiAgICAgICpcclxuICAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbC5EZWxldGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zLmRlbGV0ZShwb2x5Z29uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBwb2x5Z29uIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuIEV4cGVjdGVkIHRvIGltcGxlbWVudCB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzfS5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnQgfCBhbnkpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgY29uc3QgeDogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzID0gPE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncz5lO1xyXG4gICAgICAgIHJldHVybiB7IGxhdGl0dWRlOiB4LmxvY2F0aW9uLmxhdGl0dWRlLCBsb25naXR1ZGU6IHgubG9jYXRpb24ubG9uZ2l0dWRlIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBwb2x5Z29uIG1vZGVsIGZvciB0aGUgcG9seWdvbiBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gb2J0YWluIHRoZSBwb2x5Z29uIG1vZGVsLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBQb2x5Z29ufSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPFBvbHlnb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElQb2x5Z29uT3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIE9wdGlvbnMgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGVcclxuICAgICAqIG9wdGlvbnMgYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gb3B0aW9ucyBoYXZlIGJlZW4gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE9wdGlvbnMocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKS50aGVuKChsOiBQb2x5Z29uKSA9PiB7IGwuU2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBQb2x5Z29uIHBhdGhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcG9seWdvbiAtIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5Z29uIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcclxuICAgICAgICBpZiAobSA9PSBudWxsIHx8IHBvbHlnb24uUGF0aHMgPT0gbnVsbCB8fCAhQXJyYXkuaXNBcnJheShwb2x5Z29uLlBhdGhzKSB8fCBwb2x5Z29uLlBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlnb24pID0+ICB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBvbHlnb24uUGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBsLlNldFBhdGhzKHBvbHlnb24uUGF0aHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbC5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+cG9seWdvbi5QYXRocyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19