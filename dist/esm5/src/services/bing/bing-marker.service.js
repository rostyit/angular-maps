/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapMarkerDirective } from '../../components/map-marker';
import { MapService } from '../../services/map.service';
import { LayerService } from '../../services/layer.service';
import { ClusterService } from '../../services/cluster.service';
import { Marker } from '../../models/marker';
import { BingConversions } from './bing-conversions';
/**
 * Concrete implementation of the MarkerService abstract class for Bing Maps V8.
 *
 * @export
 */
var BingMarkerService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingMarkerService.
     * @param _mapService - {@link MapService} instance. The concrete {@link BingMapService} implementation is expected.
     * @param _layerService - {@link LayerService} instance.
     * The concrete {@link BingLayerService} implementation is expected.
     * @param _clusterService - {@link ClusterService} instance.
     * The concrete {@link BingClusterService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof BingMarkerService
     */
    function BingMarkerService(_mapService, _layerService, _clusterService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._clusterService = _clusterService;
        this._zone = _zone;
        this._markers = new Map();
    }
    /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     *
     * @return {?}
     */
    BingMarkerService.prototype.AddMarker = /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     *
     * @return {?}
     */
    function (marker) {
        /** @type {?} */
        var o = {
            position: { latitude: marker.Latitude, longitude: marker.Longitude },
            title: marker.Title,
            label: marker.Label,
            draggable: marker.Draggable,
            icon: marker.IconUrl,
            iconInfo: marker.IconInfo,
            isFirst: marker.IsFirstInSet,
            isLast: marker.IsLastInSet
        };
        if (marker.Width) {
            o.width = marker.Width;
        }
        if (marker.Height) {
            o.height = marker.Height;
        }
        if (marker.Anchor) {
            o.anchor = marker.Anchor;
        }
        if (marker.Metadata) {
            o.metadata = marker.Metadata;
        }
        /** @type {?} */
        var markerPromise = null;
        if (marker.InClusterLayer) {
            markerPromise = this._clusterService.CreateMarker(marker.LayerId, o);
        }
        else if (marker.InCustomLayer) {
            markerPromise = this._layerService.CreateMarker(marker.LayerId, o);
        }
        else {
            markerPromise = this._mapService.CreateMarker(o);
        }
        this._markers.set(marker, markerPromise);
        if (marker.IconInfo) {
            markerPromise.then(function (m) {
                // update iconInfo to provide hook to do post icon creation activities and
                // also re-anchor the marker
                marker.DynamicMarkerCreated.emit(o.iconInfo);
                /** @type {?} */
                var p = {
                    x: (o.iconInfo.size && o.iconInfo.markerOffsetRatio) ? (o.iconInfo.size.width * o.iconInfo.markerOffsetRatio.x) : 0,
                    y: (o.iconInfo.size && o.iconInfo.markerOffsetRatio) ? (o.iconInfo.size.height * o.iconInfo.markerOffsetRatio.y) : 0,
                };
                m.SetAnchor(p);
            });
        }
    };
    /**
     * Registers an event delegate for a marker.
     *
     * \@memberof BingMarkerService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarker} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    BingMarkerService.prototype.CreateEventObservable = /**
     * Registers an event delegate for a marker.
     *
     * \@memberof BingMarkerService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarker} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, marker) {
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
            _this._markers.get(marker).then(function (m) {
                m.AddListener(eventName, function (e) { return _this._zone.run(function () {
                    return observer.next(e);
                }); });
            });
        });
    };
    /**
     * Deletes a marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - {\@link MapMarker} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     *
     */
    BingMarkerService.prototype.DeleteMarker = /**
     * Deletes a marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - {\@link MapMarker} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     *
     */
    function (marker) {
        var _this = this;
        /** @type {?} */
        var m = this._markers.get(marker);
        /** @type {?} */
        var p = Promise.resolve();
        if (m != null) {
            p = m.then(function (ma) {
                if (marker.InClusterLayer) {
                    _this._clusterService.GetNativeLayer(marker.LayerId).then(function (l) { l.RemoveEntity(ma); });
                }
                if (marker.InCustomLayer) {
                    _this._layerService.GetNativeLayer(marker.LayerId).then(function (l) { l.RemoveEntity(ma); });
                }
                return _this._zone.run(function () {
                    ma.DeleteMarker();
                    _this._markers.delete(marker);
                });
            });
        }
        return p;
    };
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * \@memberof BingMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    BingMarkerService.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the marker on the click location
     *
     * \@memberof BingMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    function (e) {
        if (!e) {
            return null;
        }
        if (!e.primitive) {
            return null;
        }
        if (!(e.primitive instanceof Microsoft.Maps.Pushpin)) {
            return null;
        }
        /** @type {?} */
        var p = e.primitive;
        /** @type {?} */
        var loc = p.getLocation();
        return { latitude: loc.latitude, longitude: loc.longitude };
    };
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - The {\@link MapMarker} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     *
     */
    BingMarkerService.prototype.GetNativeMarker = /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof BingMarkerService
     * @param {?} marker - The {\@link MapMarker} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     *
     */
    function (marker) {
        return this._markers.get(marker);
    };
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * \@memberof BingMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     *
     */
    BingMarkerService.prototype.GetPixelsFromClick = /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * \@memberof BingMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     *
     */
    function (e) {
        /** @type {?} */
        var loc = this.GetCoordinatesFromClick(e);
        if (loc == null) {
            return null;
        }
        /** @type {?} */
        var l = BingConversions.TranslateLocation(loc);
        /** @type {?} */
        var p = /** @type {?} */ ((/** @type {?} */ (this._mapService)).MapInstance.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
        if (p == null) {
            return null;
        }
        return { x: p.x, y: p.y };
    };
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * \@memberof BingMarkerService
     * @param {?} target - Either a {\@link MapMarker} or a {\@link ILatLong} for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarker or ILatLong relative to the map canvas.
     *
     */
    BingMarkerService.prototype.LocationToPoint = /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * \@memberof BingMarkerService
     * @param {?} target - Either a {\@link MapMarker} or a {\@link ILatLong} for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarker or ILatLong relative to the map canvas.
     *
     */
    function (target) {
        var _this = this;
        if (target == null) {
            return Promise.resolve(null);
        }
        if (target instanceof MapMarkerDirective) {
            return this._markers.get(target).then(function (m) {
                /** @type {?} */
                var l = m.Location;
                /** @type {?} */
                var p = _this._mapService.LocationToPoint(l);
                return p;
            });
        }
        return this._mapService.LocationToPoint(target);
    };
    /**
     * Updates the anchor position for the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     *
     */
    BingMarkerService.prototype.UpdateAnchor = /**
     * Updates the anchor position for the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     *
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) {
            m.SetAnchor(marker.Anchor);
        });
    };
    /**
     * Updates whether the marker is draggable.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     *
     */
    BingMarkerService.prototype.UpdateDraggable = /**
     * Updates whether the marker is draggable.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     *
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.SetDraggable(marker.Draggable); });
    };
    /**
     * Updates the Icon on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     *
     */
    BingMarkerService.prototype.UpdateIcon = /**
     * Updates the Icon on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     *
     */
    function (marker) {
        /** @type {?} */
        var payload = function (m, icon, iconInfo) {
            if (icon && icon !== '') {
                m.SetIcon(icon);
                marker.DynamicMarkerCreated.emit(iconInfo);
            }
        };
        return this._markers.get(marker).then(function (m) {
            if (marker.IconInfo) {
                /** @type {?} */
                var s = Marker.CreateMarker(marker.IconInfo);
                if (typeof (s) === 'string') {
                    return (payload(m, s, marker.IconInfo));
                }
                else {
                    return s.then(function (x) {
                        return (payload(m, x.icon, x.iconInfo));
                    });
                }
            }
            else {
                return (m.SetIcon(marker.IconUrl));
            }
        });
    };
    /**
     * Updates the label on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     *
     */
    BingMarkerService.prototype.UpdateLabel = /**
     * Updates the label on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     *
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { m.SetLabel(marker.Label); });
    };
    /**
     * Updates the geo coordinates for the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
     *
     */
    BingMarkerService.prototype.UpdateMarkerPosition = /**
     * Updates the geo coordinates for the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
     *
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.SetPosition({
            latitude: marker.Latitude,
            longitude: marker.Longitude
        }); });
    };
    /**
     * Updates the title on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     *
     */
    BingMarkerService.prototype.UpdateTitle = /**
     * Updates the title on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     *
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.SetTitle(marker.Title); });
    };
    /**
     * Updates the visibility on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the visibility has been updated.
     *
     */
    BingMarkerService.prototype.UpdateVisible = /**
     * Updates the visibility on the marker.
     *
     * \@memberof BingMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the visibility has been updated.
     *
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.SetVisible(marker.Visible); });
    };
    BingMarkerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingMarkerService.ctorParameters = function () { return [
        { type: MapService },
        { type: LayerService },
        { type: ClusterService },
        { type: NgZone }
    ]; };
    return BingMarkerService;
}());
export { BingMarkerService };
if (false) {
    /** @type {?} */
    BingMarkerService.prototype._markers;
    /** @type {?} */
    BingMarkerService.prototype._mapService;
    /** @type {?} */
    BingMarkerService.prototype._layerService;
    /** @type {?} */
    BingMarkerService.prototype._clusterService;
    /** @type {?} */
    BingMarkerService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXJrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBS3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7SUFlakQsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7Ozs7Ozs7T0FVRztJQUNILDJCQUFvQixXQUF1QixFQUN2QixlQUNBLGlCQUNBO1FBSEEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsa0JBQWEsR0FBYixhQUFhO1FBQ2Isb0JBQWUsR0FBZixlQUFlO1FBQ2YsVUFBSyxHQUFMLEtBQUs7d0JBcEJvQyxJQUFJLEdBQUcsRUFBdUM7S0FxQjFHOzs7Ozs7Ozs7SUFhTSxxQ0FBUzs7Ozs7Ozs7Y0FBQyxNQUEwQjs7UUFDdkMsSUFBTSxDQUFDLEdBQW1CO1lBQ3RCLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3BFLEtBQUssRUFBRSxNQUFNLENBQUMs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O0lBWWpGLGdEQUFvQjs7Ozs7Ozs7Y0FBQyxNQUEwQjtRQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNqQyxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztTQUM5QixDQUFDLEVBSGEsQ0FHYixDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFZTCx1Q0FBVzs7Ozs7Ozs7Y0FBQyxNQUEwQjtRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVk1RSx5Q0FBYTs7Ozs7Ozs7Y0FBQyxNQUEwQjtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQzs7O2dCQTVVMUYsVUFBVTs7OztnQkFaRixVQUFVO2dCQUNWLFlBQVk7Z0JBQ1osY0FBYztnQkFWRixNQUFNOzs0QkFBM0I7O1NBcUJhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbWFya2VyJztcclxuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgTWFya2VyU2VydmljZSBhYnN0cmFjdCBjbGFzcyBmb3IgQmluZyBNYXBzIFY4LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nTWFya2VyU2VydmljZSBpbXBsZW1lbnRzIE1hcmtlclNlcnZpY2Uge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9tYXJrZXJzOiBNYXA8TWFwTWFya2VyRGlyZWN0aXZlLCBQcm9taXNlPE1hcmtlcj4+ID0gbmV3IE1hcDxNYXBNYXJrZXJEaXJlY3RpdmUsIFByb21pc2U8TWFya2VyPj4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdNYXJrZXJTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF9jbHVzdGVyU2VydmljZSAtIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdDbHVzdGVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBOZ1pvbmUgaW5zdGFuY2UgdG8gc3VwcG9ydCB6b25lIGF3YXJlIHByb21pc2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9jbHVzdGVyU2VydmljZTogQ2x1c3RlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWVtYmVycyBhbmQgTWFya2VyU2VydmljZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbWFya2VyLiBEZXBlbmRpbmcgb24gdGhlIG1hcmtlciBjb250ZXh0LCB0aGUgbWFya2VyIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYSBjb3JyZWNzcG9uZGluZyBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogSU1hcmtlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IGxhdGl0dWRlOiBtYXJrZXIuTGF0aXR1ZGUsIGxvbmdpdHVkZTogbWFya2VyLkxvbmdpdHVkZSB9LFxyXG4gICAgICAgICAgICB0aXRsZTogbWFya2VyLlRpdGxlLFxyXG4gICAgICAgICAgICBsYWJlbDogbWFya2VyLkxhYmVsLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IG1hcmtlci5EcmFnZ2FibGUsXHJcbiAgICAgICAgICAgIGljb246IG1hcmtlci5JY29uVXJsLFxyXG4gICAgICAgICAgICBpY29uSW5mbzogbWFya2VyLkljb25JbmZvLFxyXG4gICAgICAgICAgICBpc0ZpcnN0OiBtYXJrZXIuSXNGaXJzdEluU2V0LFxyXG4gICAgICAgICAgICBpc0xhc3Q6IG1hcmtlci5Jc0xhc3RJblNldFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKG1hcmtlci5XaWR0aCkgeyBvLndpZHRoID0gbWFya2VyLldpZHRoOyB9XHJcbiAgICAgICAgaWYgKG1hcmtlci5IZWlnaHQpIHsgby5oZWlnaHQgPSBtYXJrZXIuSGVpZ2h0OyB9XHJcbiAgICAgICAgaWYgKG1hcmtlci5BbmNob3IpIHsgby5hbmNob3IgPSBtYXJrZXIuQW5jaG9yOyB9XHJcbiAgICAgICAgaWYgKG1hcmtlci5NZXRhZGF0YSkgeyBvLm1ldGFkYXRhID0gbWFya2VyLk1ldGFkYXRhOyB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBtYXJrZXIgdmlhIHByb21pc2UuXHJcbiAgICAgICAgbGV0IG1hcmtlclByb21pc2U6IFByb21pc2U8TWFya2VyPiA9IG51bGw7XHJcbiAgICAgICAgaWYgKG1hcmtlci5JbkNsdXN0ZXJMYXllcikge1xyXG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlID0gdGhpcy5fY2x1c3RlclNlcnZpY2UuQ3JlYXRlTWFya2VyKG1hcmtlci5MYXllcklkLCBvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWFya2VyLkluQ3VzdG9tTGF5ZXIpIHtcclxuICAgICAgICAgICAgbWFya2VyUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5DcmVhdGVNYXJrZXIobWFya2VyLkxheWVySWQsIG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbWFya2VyUHJvbWlzZSA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlTWFya2VyKG8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbWFya2Vycy5zZXQobWFya2VyLCBtYXJrZXJQcm9taXNlKTtcclxuICAgICAgICBpZiAobWFya2VyLkljb25JbmZvKSB7XHJcbiAgICAgICAgICAgIG1hcmtlclByb21pc2UudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgaWNvbkluZm8gdG8gcHJvdmlkZSBob29rIHRvIGRvIHBvc3QgaWNvbiBjcmVhdGlvbiBhY3Rpdml0aWVzIGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gYWxzbyByZS1hbmNob3IgdGhlIG1hcmtlclxyXG4gICAgICAgICAgICAgICAgbWFya2VyLkR5bmFtaWNNYXJrZXJDcmVhdGVkLmVtaXQoby5pY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBJUG9pbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogKG8uaWNvbkluZm8uc2l6ZSAmJiBvLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChvLmljb25JbmZvLnNpemUud2lkdGggKiBvLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvLngpIDogMCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAoby5pY29uSW5mby5zaXplICYmIG8uaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKG8uaWNvbkluZm8uc2l6ZS5oZWlnaHQgKiBvLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvLnkpIDogMCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBtLlNldEFuY2hvcihwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJ9IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgZW1pdGluZyBhbiBpbnN0YW5jZSBvZiBUIGVhY2ggdGltZSB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGI6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xyXG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnROYW1lID09PSAncmlnaHRjbGljaycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vLyBtb3VzZW1vdmUgYW5kIHJpZ2h0Y2xpY2sgYXJlIG5vdCBzdXBwb3J0ZWQgYnkgYmluZyBwb2x5Z29ucy5cclxuICAgICAgICAvLy9cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtLkFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcmtlciAtIHtAbGluayBNYXBNYXJrZXJ9IHRvIGJlIGRlbGV0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcmtlciBoYXMgYmVlbiBkZWxldGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcik7XHJcbiAgICAgICAgbGV0IHA6IFByb21pc2U8dm9pZD4gPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAobSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHAgPSBtLnRoZW4oKG1hOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtYXJrZXIuSW5DbHVzdGVyTGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbHVzdGVyU2VydmljZS5HZXROYXRpdmVMYXllcihtYXJrZXIuTGF5ZXJJZCkudGhlbihsID0+IHsgbC5SZW1vdmVFbnRpdHkobWEpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtYXJrZXIuSW5DdXN0b21MYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihtYXJrZXIuTGF5ZXJJZCkudGhlbihsID0+IHsgbC5SZW1vdmVFbnRpdHkobWEpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWEuRGVsZXRlTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5kZWxldGUobWFya2VyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlciBvbiB0aGUgY2xpY2sgbG9jYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nIHtcclxuICAgICAgICBpZiAoIWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZS5wcmltaXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKGUucHJpbWl0aXZlIGluc3RhbmNlb2YgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHA6IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSBlLnByaW1pdGl2ZTtcclxuICAgICAgICBjb25zdCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gcC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHJldHVybiB7IGxhdGl0dWRlOiBsb2MubGF0aXR1ZGUsIGxvbmdpdHVkZTogbG9jLmxvbmdpdHVkZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyB0aGUgbWFya2VyIG1vZGVsIGZvciB0aGUgbWFya2VyIGFsbG93aW5nIGFjY2VzcyB0byBuYXRpdmUgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25hdGlsaXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcmtlciAtIFRoZSB7QGxpbmsgTWFwTWFya2VyfSBmb3Igd2hpY2ggdG8gb2J0YWluIHRoZSBtYXJrZXIgbW9kZWwuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIE1hcmtlcn0gaW1wbGVtZW50YXRpb24gb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVNYXJrZXIobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPE1hcmtlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyB0aGUgbWFya2VyIHBpeGVsIGxvY2F0aW9uIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIHBpeGVscyBvZiB0aGUgbWFya2VyIG9uIHRoZSBtYXAgY2FudmFzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UGl4ZWxzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnQgfCBhbnkpOiBJUG9pbnQge1xyXG4gICAgICAgIGNvbnN0IGxvYzogSUxhdExvbmcgPSB0aGlzLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUpO1xyXG4gICAgICAgIGlmIChsb2MgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obG9jKTtcclxuICAgICAgICBjb25zdCBwOiBNaWNyb3NvZnQuTWFwcy5Qb2ludCA9IDxNaWNyb3NvZnQuTWFwcy5Qb2ludD4oPEJpbmdNYXBTZXJ2aWNlPlxyXG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlKS5NYXBJbnN0YW5jZS50cnlMb2NhdGlvblRvUGl4ZWwobCwgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XHJcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgIHJldHVybiB7IHg6IHAueCwgeTogcC55IH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIGdlbyBsb2NhdGlvbiB0byBhIHBpeGVsIGxvY2F0aW9uIHJlbGF0aXZlIHRvIHRoZSBtYXAgY2FudmFzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgLSBFaXRoZXIgYSB7QGxpbmsgTWFwTWFya2VyfSBvciBhIHtAbGluayBJTGF0TG9uZ30gZm9yIHRoZSBiYXNpcyBvZiB0cmFuc2xhdGlvbi5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIGEge0BsaW5rIElQb2ludH1cclxuICAgICAqIHdpdGggdGhlIHBpeGVsIGNvb3JkaW5hdGVzIG9mIHRoZSBNYXBNYXJrZXIgb3IgSUxhdExvbmcgcmVsYXRpdmUgdG8gdGhlIG1hcCBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvblRvUG9pbnQodGFyZ2V0OiBNYXBNYXJrZXJEaXJlY3RpdmUgfCBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PiB7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBNYXBNYXJrZXJEaXJlY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KHRhcmdldCkudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsOiBJTGF0TG9uZyA9IG0uTG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBQcm9taXNlPElQb2ludD4gPSB0aGlzLl9tYXBTZXJ2aWNlLkxvY2F0aW9uVG9Qb2ludChsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBhbmNob3IgcG9zaXRpb24gZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJ9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGFuY2hvci5cclxuICAgICAqIEFuY2hvciBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBhbmNob3IgcG9zaXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZUFuY2hvcihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICBtLlNldEFuY2hvcihtYXJrZXIuQW5jaG9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgd2hldGhlciB0aGUgbWFya2VyIGlzIGRyYWdnYWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlcn0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSBkcmFnYWJpbGl0eS5cclxuICAgICAqIERyYWdhYmlsaXR5IGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIG1hcmtlciBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlRHJhZ2dhYmxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiBtLlNldERyYWdnYWJsZShtYXJrZXIuRHJhZ2dhYmxlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBJY29uIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJ9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGljb24uXHJcbiAgICAgKiBJY29uIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGljb24gaW5mb3JtYXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZUljb24obWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gKG06IE1hcmtlciwgaWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpY29uICYmIGljb24gIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBtLlNldEljb24oaWNvbik7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuRHluYW1pY01hcmtlckNyZWF0ZWQuZW1pdChpY29uSW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFya2VyLkljb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gTWFya2VyLkNyZWF0ZU1hcmtlcihtYXJrZXIuSWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuKHBheWxvYWQobSwgcywgbWFya2VyLkljb25JbmZvKSk7IH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzLnRoZW4oeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybihwYXlsb2FkKG0sIHguaWNvbiwgeC5pY29uSW5mbykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKG0uU2V0SWNvbihtYXJrZXIuSWNvblVybCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBsYWJlbCBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBsYWJlbC5cclxuICAgICAqIExhYmVsIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGxhYmVsIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVMYWJlbChtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4geyBtLlNldExhYmVsKG1hcmtlci5MYWJlbCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBjb29yZGluYXRlcy5cclxuICAgICAqIENvb3JkaW5hdGUgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgcG9zaXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZU1hcmtlclBvc2l0aW9uKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihcclxuICAgICAgICAgICAgKG06IE1hcmtlcikgPT4gbS5TZXRQb3NpdGlvbih7XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogbWFya2VyLkxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBtYXJrZXIuTG9uZ2l0dWRlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpdGxlIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIHRpdGxlLlxyXG4gICAgICogVGl0bGUgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgdGl0bGUgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZVRpdGxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiBtLlNldFRpdGxlKG1hcmtlci5UaXRsZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmlzaWJpbGl0eSBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSB2aXNpYmxpdHkuXHJcbiAgICAgKiBWaXNpYmlsaXR5IGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIHZpc2liaWxpdHkgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZVZpc2libGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uU2V0VmlzaWJsZShtYXJrZXIuVmlzaWJsZSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==