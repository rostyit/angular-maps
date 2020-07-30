/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Abstract class to implement map api. A concrete implementation should be created for each
 * Map provider supported (e.g. Bing, Goolge, ESRI)
 *
 * @export
 * @abstract
 * @abstract
 */
export class MapService {
    /**
     * Gets a random geo locations filling the bounding box.
     *
     * \@memberof MapService
     * @param {?} count - number of locations to return
     * @param {?} bounds  - bounding box.
     * @return {?} - Array of geo locations.
     */
    static GetRandonLocations(count, bounds) {
        /** @type {?} */
        const a = [];
        /** @type {?} */
        const _getRandomLocation = (b) => {
            /** @type {?} */
            const lat = Math.random() * (b.maxLatitude - b.minLatitude) + b.minLatitude;
            /** @type {?} */
            let lng = 0;
            if (crossesDateLine) {
                lng = Math.random() * (b.minLongitude + 360 - b.maxLongitude) + b.maxLongitude;
                if (lng > 180) {
                    lng = lng - 360;
                }
            }
            else {
                lng = Math.random() * (b.maxLongitude - b.minLongitude) + b.minLongitude;
            }
            /** @type {?} */
            const p = { latitude: lat, longitude: lng };
            return p;
        };
        /** @type {?} */
        let crossesDateLine = false;
        if (bounds == null) {
            bounds = /** @type {?} */ ({
                maxLatitude: 360,
                minLatitude: 0,
                maxLongitude: 170,
                minLongitude: 0
            });
        }
        if (bounds.center.longitude < bounds.minLongitude || bounds.center.longitude > bounds.maxLongitude) {
            crossesDateLine = true;
        }
        if (!count || count <= 0) {
            return [_getRandomLocation(bounds)];
        }
        for (let r = 0; r < count; r++) {
            a.push(_getRandomLocation(bounds));
        }
        return a;
    }
}
MapService.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * Gets the Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapInstance = function () { };
    /**
     * Gets a Promise for a Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapPromise = function () { };
    /**
     * Gets the maps physical size.
     *
     * \@readonly
     * @abstract
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapSize = function () { };
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof MapService
     * @abstract
     * @abstract
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    MapService.prototype.CreateCanvasOverlay = function (drawCallback) { };
    /**
     * Creates a map cluster layer within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying native layer object.
     *
     */
    MapService.prototype.CreateClusterLayer = function (options) { };
    /**
     * Creates an information window for a map position
     *
     * \@memberof MapService
     * @abstract
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying natvie infobox object.
     *
     */
    MapService.prototype.CreateInfoWindow = function (options) { };
    /**
     * Creates a map layer within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying native layer object.
     *
     */
    MapService.prototype.CreateLayer = function (options) { };
    /**
     * Creates a map instance
     *
     * \@memberof MapService
     * @abstract
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    MapService.prototype.CreateMap = function (el, mapOptions) { };
    /**
     * Creates a map marker within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying native pushpin object.
     *
     */
    MapService.prototype.CreateMarker = function (options) { };
    /**
     * Creates a polygon within the map context
     *
     * @abstract
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    MapService.prototype.CreatePolygon = function (options) { };
    /**
     * Creates a polyline within the map context
     *
     * @abstract
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polyline.
     *
     */
    MapService.prototype.CreatePolyline = function (options) { };
    /**
     * Deletes a layer from the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} layer - Layer to delete. See {\@link Layer}.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    MapService.prototype.DeleteLayer = function (layer) { };
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.DisposeMap = function () { };
    /**
     * Gets the geo coordinates of the map bounds
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the bounding box of the screen. See {\@link IBox}.
     *
     */
    MapService.prototype.GetBounds = function () { };
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    MapService.prototype.GetCenter = function () { };
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    MapService.prototype.GetZoom = function () { };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    MapService.prototype.LocationToPoint = function (loc) { };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    MapService.prototype.LocationsToPoints = function (locs) { };
    /**
     * Centers the map on a geo location.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    MapService.prototype.SetCenter = function (latLng) { };
    /**
     * Sets the generic map options.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    MapService.prototype.SetMapOptions = function (options) { };
    /**
     * Sets the view options of the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    MapService.prototype.SetViewOptions = function (options) { };
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    MapService.prototype.SetZoom = function (zoom) { };
    /**
     * Creates an event subscription
     *
     * \@memberof MapService
     * @abstract
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    MapService.prototype.SubscribeToMapEvent = function (eventName) { };
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    MapService.prototype.TriggerMapEvent = function (eventName) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQTJCbkQsTUFBTTs7Ozs7Ozs7O0lBNENLLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsTUFBWTs7UUFDeEQsTUFBTSxDQUFDLEdBQW9CLEVBQUUsQ0FBQzs7UUFDOUIsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQU8sRUFBRSxFQUFFOztZQUNuQyxNQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDOztZQUNwRixJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUMvRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFBRTthQUN0QztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2FBQzVFOztZQUNELE1BQU0sQ0FBQyxHQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNaLENBQUM7O1FBQ0YsSUFBSSxlQUFlLEdBQVksS0FBSyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxxQkFBUztnQkFDN0IsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLFdBQVcsRUFBRSxDQUFDO2dCQUNkLFlBQVksRUFBRSxHQUFHO2dCQUNqQixZQUFZLEVBQUUsQ0FBQzthQUNsQixDQUFBLENBQUM7U0FDTDtRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDaEksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7O1lBMUVoQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNpemUnO1xyXG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pYm94JztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL21vZGVscy9pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGNsYXNzIHRvIGltcGxlbWVudCBtYXAgYXBpLiBBIGNvbmNyZXRlIGltcGxlbWVudGF0aW9uIHNob3VsZCBiZSBjcmVhdGVkIGZvciBlYWNoXHJcbiAqIE1hcCBwcm92aWRlciBzdXBwb3J0ZWQgKGUuZy4gQmluZywgR29vbGdlLCBFU1JJKVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwU2VydmljZSB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIHByb3BlcnRpZXNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldCBNYXBJbnN0YW5jZSgpOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgUHJvbWlzZSBmb3IgYSBNYXAgY29udHJvbCBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBpbXBsZW1lbnRhdGlvbi4gVXNlIHRoaXMgaW5zdGVhZCBvZiB7QGxpbmsgTWFwSW5zdGFuY2V9IGlmIHlvdVxyXG4gICAgICogYXJlIG5vdCBzdXJlIGlmIGFuZCB3aGVuIHRoZSBpbnN0YW5jZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldCBNYXBQcm9taXNlKCk6IFByb21pc2U8YW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcHMgcGh5c2ljYWwgc2l6ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0IE1hcFNpemUoKTogSVNpemU7XHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgcmFuZG9tIGdlbyBsb2NhdGlvbnMgZmlsbGluZyB0aGUgYm91bmRpbmcgYm94LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjb3VudCAtIG51bWJlciBvZiBsb2NhdGlvbnMgdG8gcmV0dXJuXHJcbiAgICAgKiBAcGFyYW0gYm91bmRzICAtIGJvdW5kaW5nIGJveC5cclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgZ2VvIGxvY2F0aW9ucy5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0UmFuZG9uTG9jYXRpb25zKGNvdW50OiBudW1iZXIsIGJvdW5kczogSUJveCk6IEFycmF5PElMYXRMb25nPiB7XHJcbiAgICAgICAgY29uc3QgYTogQXJyYXk8SUxhdExvbmc+ID0gW107XHJcbiAgICAgICAgY29uc3QgX2dldFJhbmRvbUxvY2F0aW9uID0gKGI6IElCb3gpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGF0OiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogKGIubWF4TGF0aXR1ZGUgLSBiLm1pbkxhdGl0dWRlKSArIGIubWluTGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIGxldCBsbmc6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGlmIChjcm9zc2VzRGF0ZUxpbmUpIHtcclxuICAgICAgICAgICAgICAgIGxuZyA9IE1hdGgucmFuZG9tKCkgKiAoYi5taW5Mb25naXR1ZGUgKyAzNjAgLSBiLm1heExvbmdpdHVkZSkgKyBiLm1heExvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgIGlmIChsbmcgPiAxODApIHsgbG5nID0gbG5nIC0gMzYwOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsbmcgPSBNYXRoLnJhbmRvbSgpICogKGIubWF4TG9uZ2l0dWRlIC0gYi5taW5Mb25naXR1ZGUpICsgYi5taW5Mb25naXR1ZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcDogSUxhdExvbmcgPSB7IGxhdGl0dWRlOiBsYXQsIGxvbmdpdHVkZTogbG5nIH07XHJcbiAgICAgICAgICAgIHJldHVybiBwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGNyb3NzZXNEYXRlTGluZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoYm91bmRzID09IG51bGwpIHsgYm91bmRzID0gPElCb3g+e1xyXG4gICAgICAgICAgICAgICAgbWF4TGF0aXR1ZGU6IDM2MCxcclxuICAgICAgICAgICAgICAgIG1pbkxhdGl0dWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlOiAxNzAsXHJcbiAgICAgICAgICAgICAgICBtaW5Mb25naXR1ZGU6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvdW5kcy5jZW50ZXIubG9uZ2l0dWRlIDwgYm91bmRzLm1pbkxvbmdpdHVkZSAgfHwgYm91bmRzLmNlbnRlci5sb25naXR1ZGUgPiBib3VuZHMubWF4TG9uZ2l0dWRlKSB7IGNyb3NzZXNEYXRlTGluZSA9IHRydWU7IH1cclxuICAgICAgICBpZiAoIWNvdW50IHx8IGNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtfZ2V0UmFuZG9tTG9jYXRpb24oYm91bmRzKV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgY291bnQ7IHIrKykgeyBhLnB1c2goX2dldFJhbmRvbUxvY2F0aW9uKGJvdW5kcykpOyB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY2FudmFzIG92ZXJsYXkgbGF5ZXIgdG8gcGVyZm9ybSBjdXN0b20gZHJhd2luZyBvdmVyIHRoZSBtYXAgd2l0aCBvdXRcclxuICAgICAqIHNvbWUgb2YgdGhlIG92ZXJoZWFkIGFzc29jaWF0ZWQgd2l0aCBnb2luZyB0aHJvdWdoIHRoZSBNYXAgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcclxuICAgICAqIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtYXAgdmlldy5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBDYW52YXNPdmVybGF5fSBvYmplY3QuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVDYW52YXNPdmVybGF5KGRyYXdDYWxsYmFjazogKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpID0+IHZvaWQpOiBQcm9taXNlPENhbnZhc092ZXJsYXk+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBjbHVzdGVyIGxheWVyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJQ2x1c3Rlck9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIExheWVyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgbGF5ZXIgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IENyZWF0ZUNsdXN0ZXJMYXllcihvcHRpb25zOiBJTGF5ZXJPcHRpb25zKTogUHJvbWlzZTxMYXllcj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluZm9ybWF0aW9uIHdpbmRvdyBmb3IgYSBtYXAgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW29wdGlvbnNdIC0gSW5mb3dpbmRvdyBvcHRpb25zLiBTZWUge0BsaW5rIElJbmZvV2luZG93T3B0aW9uc31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBJbmZvV2luZG93fSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXR2aWUgaW5mb2JveCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zPzogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTxJbmZvV2luZG93PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXAgbGF5ZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGxheWVyLiBTZWUge0BsaW5rIElMYXllck9wdGlvbnN9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTGF5ZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBsYXllciBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlTGF5ZXIob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbCAtIEhUTUwgZWxlbWVudCB0byBob3N0IHRoZSBtYXAuXHJcbiAgICAgKiBAcGFyYW0gbWFwT3B0aW9ucyAtIE1hcCBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBtYXAgaGFzIGJlZW4gY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVNYXAoZWw6IEhUTUxFbGVtZW50LCBtYXBPcHRpb25zOiBJTWFwT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFwIG1hcmtlciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtvcHRpb25zPTxJTWFya2VyT3B0aW9ucz57fV0gLSBPcHRpb25zIGZvciB0aGUgbWFya2VyLiBTZWUge0BsaW5rIElNYXJrZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBNYXJrZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwdXNocGluIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVNYXJrZXIob3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiBQcm9taXNlPE1hcmtlcj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgcG9seWdvbiB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5Z29uLiBTZWUge0BsaW5rIElQb2x5Z29uT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgUG9seWdvbn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgQ3JlYXRlUG9seWdvbihvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHBvbHlsaW5lIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlsaW5lLiBTZWUge0BsaW5rIElQb2x5bGluZU9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIFBvbHlsaW5lfSBvYmplY3QgKG9yIGFuIGFycmF5IHRoZXJlb2YgZm9yIGNvbXBsZXggcGF0aHMpLFxyXG4gICAgICogd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5bGluZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBDcmVhdGVQb2x5bGluZShvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIGxheWVyIGZyb20gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBMYXllciB0byBkZWxldGUuIFNlZSB7QGxpbmsgTGF5ZXJ9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBEZWxldGVMYXllcihsYXllcjogTGF5ZXIpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGFvc2UgdGhlIG1hcCBhbmQgYXNzb2NpYXRlZCByZXNvdXJlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBEaXNwb3NlTWFwKCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIG1hcCBib3VuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBzY3JlZW4uIFNlZSB7QGxpbmsgSUJveH0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgR2V0Qm91bmRzKCk6IFByb21pc2U8SUJveD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIG1hcCBjZW50ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgZ29lIGxvY2F0aW9uIG9mIHRoZSBjZW50ZXIuIFNlZSB7QGxpbmsgSUxhdExvbmd9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IEdldENlbnRlcigpOiBQcm9taXNlPElMYXRMb25nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB6b29tIGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IEdldFpvb20oKTogUHJvbWlzZTxudW1iZXI+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBjb252ZXJzaW9uIG9mIGdlbyBjb29yZGluYXRlcyB0byBwaXhlbHMgb24gdGhlIG1hcCBjb250cm9sLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2MgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIHRvIHRyYW5zbGF0ZS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhbiB7QGxpbmsgSVBvaW50fSBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSBwaXhlbHMuIFRoaXMgcHJvbWlzZSByZXNvbHZlcyB0byBudWxsXHJcbiAgICAgKiBpZiB0aGUgZ29lIGNvb3JkaW5hdGVzIGFyZSBub3QgaW4gdGhlIHZpZXcgcG9ydC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBMb2NhdGlvblRvUG9pbnQobG9jOiBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgY29udmVyc2lvbiBvZiBnZW8gY29vcmRpbmF0ZXMgdG8gcGl4ZWxzIG9uIHRoZSBtYXAgY29udHJvbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYW4ge0BsaW5rIElQb2ludH0gaW50ZXJmYWNlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgcGl4ZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IExvY2F0aW9uc1RvUG9pbnRzKGxvY3M6IEFycmF5PElMYXRMb25nPik6IFByb21pc2U8QXJyYXk8SVBvaW50Pj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDZW50ZXJzIHRoZSBtYXAgb24gYSBnZW8gbG9jYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdExuZyAtIEdlb0Nvb3JkaW5hdGVzIGFyb3VuZCB3aGljaCB0byBjZW50ZXIgdGhlIG1hcC4gU2VlIHtAbGluayBJTGF0TG9uZ31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgY2VudGVyIG9wZXJhdGlvbnMgaGFzIGJlZW4gY29tcGxldGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IFNldENlbnRlcihsYXRMbmc6IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdlbmVyaWMgbWFwIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBTZXRNYXBPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpZXcgb3B0aW9ucyBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgU2V0Vmlld09wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB6b29tIC0gWm9vbSBsZXZlbCB0byBzZXQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgb25jZSB0aGUgem9vbSBvcGVyYXRpb24gaXMgY29tcGxldGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgU2V0Wm9vbSh6b29tOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBldmVudCBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChlLmcuICdjbGljaycpXHJcbiAgICAgKiBAcmV0dXJucyAtIEFuIG9ic2VydmFibGUgb2YgdHB5ZSBFIHRoYXQgZmlyZXMgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IFN1YnNjcmliZVRvTWFwRXZlbnQ8RT4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEU+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlcnMgdGhlIGdpdmVuIGV2ZW50IG5hbWUgb24gdGhlIG1hcCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gRXZlbnQgdG8gdHJpZ2dlci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgVHJpZ2dlck1hcEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcclxufVxyXG4iXX0=