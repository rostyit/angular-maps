/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapMarkerDirective } from '../../components/map-marker';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
import { ClusterService } from '../cluster.service';
import { GoogleConversions } from './google-conversions';
/**
 * Concrete implementation of the MarkerService abstract class for Google.
 *
 * @export
 */
var GoogleMarkerService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GoogleMarkerService.
     * @param _mapService - {@link MapService} instance.
     * The concrete {@link GoogleMapService} implementation is expected.
     * @param _layerService - {@link LayerService} instance.
     * The concrete {@link GoogleLayerService} implementation is expected.
     * @param _clusterService - {@link ClusterService} instance.
     * The concrete {@link GoogleClusterService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof GoogleMarkerService
     */
    function GoogleMarkerService(_mapService, _layerService, _clusterService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._clusterService = _clusterService;
        this._zone = _zone;
        this._markers = new Map();
    }
    /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     * @return {?}
     */
    GoogleMarkerService.prototype.AddMarker = /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     * @return {?}
     */
    function (marker) {
        /** @type {?} */
        var o = {
            anchor: marker.Anchor,
            position: { latitude: marker.Latitude, longitude: marker.Longitude },
            title: marker.Title,
            label: marker.Label,
            draggable: marker.Draggable,
            icon: marker.IconUrl,
            iconInfo: marker.IconInfo,
            width: marker.Width,
            height: marker.Height,
            isFirst: marker.IsFirstInSet,
            isLast: marker.IsLastInSet
        };
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
     * \@memberof GoogleMarkerService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarkerDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     */
    GoogleMarkerService.prototype.CreateEventObservable = /**
     * Registers an event delegate for a marker.
     *
     * \@memberof GoogleMarkerService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarkerDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     */
    function (eventName, marker) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._markers.get(marker).then(function (m) {
                m.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes a marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - {\@link MapMarkerDirective} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     */
    GoogleMarkerService.prototype.DeleteMarker = /**
     * Deletes a marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - {\@link MapMarkerDirective} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     */
    function (marker) {
        var _this = this;
        /** @type {?} */
        var m = this._markers.get(marker);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (ma) {
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
    };
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    GoogleMarkerService.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    function (e) {
        if (!e) {
            return null;
        }
        if (!e.latLng) {
            return null;
        }
        if (!e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    };
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     */
    GoogleMarkerService.prototype.GetNativeMarker = /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     */
    function (marker) {
        return this._markers.get(marker);
    };
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     */
    GoogleMarkerService.prototype.GetPixelsFromClick = /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     */
    function (e) {
        if (!e || !e.latLng || !e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        if (this._mapService.MapInstance == null) {
            return null;
        }
        /** @type {?} */
        var crossesDateLine = false;
        /** @type {?} */
        var m = this._mapService.MapInstance;
        /** @type {?} */
        var p = m.getProjection();
        /** @type {?} */
        var s = Math.pow(2, m.getZoom());
        /** @type {?} */
        var b = m.getBounds();
        if (b.getCenter().lng() < b.getSouthWest().lng() ||
            b.getCenter().lng() > b.getNorthEast().lng()) {
            crossesDateLine = true;
        }
        /** @type {?} */
        var offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
        /** @type {?} */
        var offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
        /** @type {?} */
        var point = p.fromLatLngToPoint(e.latLng);
        return {
            x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
            y: Math.floor((point.y - offsetY) * s)
        };
    };
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * \@memberof GoogleMarkerService
     * @param {?} target - Either a {\@link MapMarkerDirective}
     * or a {\@link ILatLong} for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarker or ILatLong relative to the map canvas.
     */
    GoogleMarkerService.prototype.LocationToPoint = /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * \@memberof GoogleMarkerService
     * @param {?} target - Either a {\@link MapMarkerDirective}
     * or a {\@link ILatLong} for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarker or ILatLong relative to the map canvas.
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
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     */
    GoogleMarkerService.prototype.UpdateAnchor = /**
     * Updates the anchor position for the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) {
            m.SetAnchor(marker.Anchor);
        });
    };
    /**
     * Updates whether the marker is draggable.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     */
    GoogleMarkerService.prototype.UpdateDraggable = /**
     * Updates whether the marker is draggable.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.SetDraggable(marker.Draggable); });
    };
    /**
     * Updates the Icon on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     */
    GoogleMarkerService.prototype.UpdateIcon = /**
     * Updates the Icon on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) {
            if (marker.IconInfo) {
                /** @type {?} */
                var x = {
                    position: { latitude: marker.Latitude, longitude: marker.Longitude },
                    iconInfo: marker.IconInfo
                };
                /** @type {?} */
                var o = GoogleConversions.TranslateMarkerOptions(x);
                m.SetIcon(o.icon);
                marker.DynamicMarkerCreated.emit(x.iconInfo);
            }
            else {
                m.SetIcon(marker.IconUrl);
            }
        });
    };
    /**
     * Updates the label on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     */
    GoogleMarkerService.prototype.UpdateLabel = /**
     * Updates the label on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { m.SetLabel(marker.Label); });
    };
    /**
     * Updates the geo coordinates for the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
     */
    GoogleMarkerService.prototype.UpdateMarkerPosition = /**
     * Updates the geo coordinates for the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
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
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    GoogleMarkerService.prototype.UpdateTitle = /**
     * Updates the title on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.SetTitle(marker.Title); });
    };
    /**
     * Updates the visibility on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    GoogleMarkerService.prototype.UpdateVisible = /**
     * Updates the visibility on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.SetVisible(marker.Visible); });
    };
    GoogleMarkerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleMarkerService.ctorParameters = function () { return [
        { type: MapService },
        { type: LayerService },
        { type: ClusterService },
        { type: NgZone }
    ]; };
    return GoogleMarkerService;
}());
export { GoogleMarkerService };
if (false) {
    /** @type {?} */
    GoogleMarkerService.prototype._markers;
    /** @type {?} */
    GoogleMarkerService.prototype._mapService;
    /** @type {?} */
    GoogleMarkerService.prototype._layerService;
    /** @type {?} */
    GoogleMarkerService.prototype._clusterService;
    /** @type {?} */
    GoogleMarkerService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBbUIsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7O0lBZXJELEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsNkJBQW9CLFdBQXVCLEVBQy9CLGVBQ0EsaUJBQ0E7UUFIUSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUMvQixrQkFBYSxHQUFiLGFBQWE7UUFDYixvQkFBZSxHQUFmLGVBQWU7UUFDZixVQUFLLEdBQUwsS0FBSzt3QkFyQjRDLElBQUksR0FBRyxFQUF1QztLQXNCMUc7Ozs7Ozs7O0lBUU0sdUNBQVM7Ozs7Ozs7Y0FBQyxNQUEwQjs7UUFDdkMsSUFBTSxDQUFDLEdBQW1CO1lBQ3RCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUNwRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxZQUFZO1lBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVztTQUM3QixDQUFDOztRQUdGLElBQUksYUFBYSxHQUFvQixJQUFJLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUzs7O2dCQUd6QixNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Z0JBQzdDLElBQU0sQ0FBQyxHQUFXO29CQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkgsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2SCxDQUFDO2dCQUNGLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7O0lBV0UsbURBQXFCOzs7Ozs7Ozs7Y0FBSSxTQUFpQixFQUFFLE1BQTBCOztRQUN6RSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQXFCO1lBQzNDLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVM7Z0JBQ3JDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO2FBQzlFLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVUEsMENBQVk7Ozs7Ozs7Y0FBQyxNQUEwQjs7O1FBQzFDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBVTtZQUNyQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzFGO1lBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN4RjtZQUNELE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQyxDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7Ozs7Ozs7OztJQVVBLHFEQUF1Qjs7Ozs7OztjQUFDLENBQW1CO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7Ozs7Ozs7OztJQVU1RCw2Q0FBZTs7Ozs7OztjQUFDLE1BQTBCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVTlCLGdEQUFrQjs7Ozs7OztjQUFDLENBQW1CO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOztRQUVELElBQUksZUFBZSxHQUFZLEtBQUssQ0FBQzs7UUFDckMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7O1FBQ3ZDLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7UUFDNUIsSUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7O1FBQzNDLElBQU0sQ0FBQyxHQUFnQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDNUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQUU7O1FBRTdFLElBQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ2hFLElBQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ2hFLElBQU0sS0FBSyxHQUF5QixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQztZQUNILENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLGVBQWUsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNGLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZQyw2Q0FBZTs7Ozs7Ozs7O2NBQUMsTUFBcUM7O1FBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUzs7Z0JBQzVDLElBQU0sQ0FBQyxHQUFhLENBQUMsQ0FBQyxRQUFRLENBQUM7O2dCQUMvQixJQUFNLENBQUMsR0FBb0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDWixDQUFDLENBQUM7U0FDTjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVzdDLDBDQUFZOzs7Ozs7O2NBQUMsTUFBMEI7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVM7WUFDNUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFXQSw2Q0FBZTs7Ozs7OztjQUFDLE1BQTBCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFXcEYsd0NBQVU7Ozs7Ozs7Y0FBQyxNQUEwQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUztZQUM1QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2xCLElBQU0sQ0FBQyxHQUFtQjtvQkFDdEIsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQ3BFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtpQkFDNUIsQ0FBQzs7Z0JBQ0YsSUFBTSxDQUFDLEdBQWlDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3QjtTQUVKLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBV0EseUNBQVc7Ozs7Ozs7Y0FBQyxNQUEwQjtRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUyxJQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFXakYsa0RBQW9COzs7Ozs7O2NBQUMsTUFBMEI7UUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDakMsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6QixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7U0FDOUIsQ0FBQyxFQUhhLENBR2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFXTCx5Q0FBVzs7Ozs7OztjQUFDLE1BQTBCO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFXNUUsMkNBQWE7Ozs7Ozs7Y0FBQyxNQUEwQjtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQzs7O2dCQWxUMUYsVUFBVTs7OztnQkFYRixVQUFVO2dCQUNWLFlBQVk7Z0JBQ1osY0FBYztnQkFWRixNQUFNOzs4QkFBM0I7O1NBb0JhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1tYXJrZXInO1xyXG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbWFya2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9jbHVzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XHJcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi9nb29nbGUtY29udmVyc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBNYXJrZXJTZXJ2aWNlIGFic3RyYWN0IGNsYXNzIGZvciBHb29nbGUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcmtlclNlcnZpY2UgaW1wbGVtZW50cyBNYXJrZXJTZXJ2aWNlIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfbWFya2VyczogTWFwPE1hcE1hcmtlckRpcmVjdGl2ZSwgUHJvbWlzZTxNYXJrZXI+PiA9IG5ldyBNYXA8TWFwTWFya2VyRGlyZWN0aXZlLCBQcm9taXNlPE1hcmtlcj4+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVNYXJrZXJTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxyXG4gICAgICogVGhlIGNvbmNyZXRlIHtAbGluayBHb29nbGVNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZC5cclxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXHJcbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEdvb2dsZUxheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX2NsdXN0ZXJTZXJ2aWNlIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cclxuICAgICAqIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlQ2x1c3RlclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxyXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2NsdXN0ZXJTZXJ2aWNlOiBDbHVzdGVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBtYXJrZXIuIERlcGVuZGluZyBvbiB0aGUgbWFya2VyIGNvbnRleHQsIHRoZSBtYXJrZXIgd2lsbCBlaXRoZXIgYnkgYWRkZWQgdG8gdGhlIG1hcCBvciBhIGNvcnJlY3Nwb25kaW5nIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQWRkTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbzogSU1hcmtlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGFuY2hvcjogbWFya2VyLkFuY2hvcixcclxuICAgICAgICAgICAgcG9zaXRpb246IHsgbGF0aXR1ZGU6IG1hcmtlci5MYXRpdHVkZSwgbG9uZ2l0dWRlOiBtYXJrZXIuTG9uZ2l0dWRlIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiBtYXJrZXIuVGl0bGUsXHJcbiAgICAgICAgICAgIGxhYmVsOiBtYXJrZXIuTGFiZWwsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogbWFya2VyLkRyYWdnYWJsZSxcclxuICAgICAgICAgICAgaWNvbjogbWFya2VyLkljb25VcmwsXHJcbiAgICAgICAgICAgIGljb25JbmZvOiBtYXJrZXIuSWNvbkluZm8sXHJcbiAgICAgICAgICAgIHdpZHRoOiBtYXJrZXIuV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogbWFya2VyLkhlaWdodCxcclxuICAgICAgICAgICAgaXNGaXJzdDogbWFya2VyLklzRmlyc3RJblNldCxcclxuICAgICAgICAgICAgaXNMYXN0OiBtYXJrZXIuSXNMYXN0SW5TZXRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgbWFya2VyIHZpYSBwcm9taXNlLlxyXG4gICAgICAgIGxldCBtYXJrZXJQcm9taXNlOiBQcm9taXNlPE1hcmtlcj4gPSBudWxsO1xyXG4gICAgICAgIGlmIChtYXJrZXIuSW5DbHVzdGVyTGF5ZXIpIHtcclxuICAgICAgICAgICAgbWFya2VyUHJvbWlzZSA9IHRoaXMuX2NsdXN0ZXJTZXJ2aWNlLkNyZWF0ZU1hcmtlcihtYXJrZXIuTGF5ZXJJZCwgbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1hcmtlci5JbkN1c3RvbUxheWVyKSB7XHJcbiAgICAgICAgICAgIG1hcmtlclByb21pc2UgPSB0aGlzLl9sYXllclNlcnZpY2UuQ3JlYXRlTWFya2VyKG1hcmtlci5MYXllcklkLCBvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1hcmtlclByb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZU1hcmtlcihvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21hcmtlcnMuc2V0KG1hcmtlciwgbWFya2VyUHJvbWlzZSk7XHJcbiAgICAgICAgaWYgKG1hcmtlci5JY29uSW5mbykge1xyXG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlLnRoZW4oKG06IE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIGljb25JbmZvIHRvIHByb3ZpZGUgaG9vayB0byBkbyBwb3N0IGljb24gY3JlYXRpb24gYWN0aXZpdGllcyBhbmRcclxuICAgICAgICAgICAgICAgIC8vIGFsc28gcmUtYW5jaG9yIHRoZSBtYXJrZXJcclxuICAgICAgICAgICAgICAgIG1hcmtlci5EeW5hbWljTWFya2VyQ3JlYXRlZC5lbWl0KG8uaWNvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcDogSVBvaW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IChvLmljb25JbmZvLnNpemUgJiYgby5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoby5pY29uSW5mby5zaXplLndpZHRoICogby5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpby54KSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogKG8uaWNvbkluZm8uc2l6ZSAmJiBvLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChvLmljb25JbmZvLnNpemUuaGVpZ2h0ICogby5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpby55KSA6IDAsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbS5TZXRBbmNob3IocCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxyXG4gICAgICogQHBhcmFtIG1hcmtlciAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIG0uQWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcmtlciAtIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcmtlciBoYXMgYmVlbiBkZWxldGVkLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZU1hcmtlcihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xyXG4gICAgICAgIGlmIChtID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS50aGVuKChtYTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZXIuSW5DbHVzdGVyTGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsdXN0ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKG1hcmtlci5MYXllcklkKS50aGVuKGwgPT4geyBsLlJlbW92ZUVudGl0eShtYSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXJrZXIuSW5DdXN0b21MYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKG1hcmtlci5MYXllcklkKS50aGVuKGwgPT4geyBsLlJlbW92ZUVudGl0eShtYSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYS5EZWxldGVNYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMuZGVsZXRlKG1hcmtlcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgb24gdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBNb3VzZUV2ZW50IHwgYW55KTogSUxhdExvbmcge1xyXG4gICAgICAgIGlmICghZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFlLmxhdExuZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFlLmxhdExuZy5sYXQgfHwgIWUubGF0TG5nLmxuZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IGUubGF0TG5nLmxhdCgpLCBsb25naXR1ZGU6IGUubGF0TG5nLmxuZygpIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIHRoZSBtYXJrZXIgbW9kZWwgZm9yIHRoZSBtYXJrZXIgYWxsb3dpbmcgYWNjZXNzIHRvIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbmF0aWxpeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIG1hcmtlciBtb2RlbC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgTWFya2VyfSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXROYXRpdmVNYXJrZXIobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPE1hcmtlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyB0aGUgbWFya2VyIHBpeGVsIGxvY2F0aW9uIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIHBpeGVscyBvZiB0aGUgbWFya2VyIG9uIHRoZSBtYXAgY2FudmFzLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFBpeGVsc0Zyb21DbGljayhlOiBNb3VzZUV2ZW50IHwgYW55KTogSVBvaW50IHtcclxuICAgICAgICBpZiAoIWUgfHwgIWUubGF0TG5nIHx8ICFlLmxhdExuZy5sYXQgfHwgIWUubGF0TG5nLmxuZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcFNlcnZpY2UuTWFwSW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjcm9zc2VzRGF0ZUxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZTtcclxuICAgICAgICBjb25zdCBwID0gbS5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgczogbnVtYmVyID0gTWF0aC5wb3coMiwgbS5nZXRab29tKCkpO1xyXG4gICAgICAgIGNvbnN0IGI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kcyA9IG0uZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgaWYgKGIuZ2V0Q2VudGVyKCkubG5nKCkgPCBiLmdldFNvdXRoV2VzdCgpLmxuZygpICB8fFxyXG4gICAgICAgICAgICBiLmdldENlbnRlcigpLmxuZygpID4gYi5nZXROb3J0aEVhc3QoKS5sbmcoKSkgeyBjcm9zc2VzRGF0ZUxpbmUgPSB0cnVlOyB9XHJcblxyXG4gICAgICAgIGNvbnN0IG9mZnNldFk6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXROb3J0aEVhc3QoKSkueTtcclxuICAgICAgICBjb25zdCBvZmZzZXRYOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0U291dGhXZXN0KCkpLng7XHJcbiAgICAgICAgY29uc3QgcG9pbnQ6IEdvb2dsZU1hcFR5cGVzLlBvaW50ID0gcC5mcm9tTGF0TG5nVG9Qb2ludChlLmxhdExuZyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogTWF0aC5mbG9vcigocG9pbnQueCAtIG9mZnNldFggKyAoKGNyb3NzZXNEYXRlTGluZSAmJiBwb2ludC54IDwgb2Zmc2V0WCkgPyAyNTYgOiAwKSkgKiBzKSxcclxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcigocG9pbnQueSAtIG9mZnNldFkpICogcylcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBnZW8gbG9jYXRpb24gdG8gYSBwaXhlbCBsb2NhdGlvbiByZWxhdGl2ZSB0byB0aGUgbWFwIGNhbnZhcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IC0gRWl0aGVyIGEge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX1cclxuICAgICAqIG9yIGEge0BsaW5rIElMYXRMb25nfSBmb3IgdGhlIGJhc2lzIG9mIHRyYW5zbGF0aW9uLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgYSB7QGxpbmsgSVBvaW50fVxyXG4gICAgICogd2l0aCB0aGUgcGl4ZWwgY29vcmRpbmF0ZXMgb2YgdGhlIE1hcE1hcmtlciBvciBJTGF0TG9uZyByZWxhdGl2ZSB0byB0aGUgbWFwIGNhbnZhcy5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvblRvUG9pbnQodGFyZ2V0OiBNYXBNYXJrZXJEaXJlY3RpdmUgfCBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PiB7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBNYXBNYXJrZXJEaXJlY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KHRhcmdldCkudGhlbigobTogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsOiBJTGF0TG9uZyA9IG0uTG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBQcm9taXNlPElQb2ludD4gPSB0aGlzLl9tYXBTZXJ2aWNlLkxvY2F0aW9uVG9Qb2ludChsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBhbmNob3IgcG9zaXRpb24gZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGFuY2hvci5cclxuICAgICAqIEFuY2hvciBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBhbmNob3IgcG9zaXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVBbmNob3IobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgbS5TZXRBbmNob3IobWFya2VyLkFuY2hvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyBkcmFnZ2FibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgZHJhZ2FiaWxpdHkuXHJcbiAgICAgKiBEcmFnYWJpbGl0eSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBtYXJrZXIgaGFzIGJlZW4gdXBkYXRlZC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBVcGRhdGVEcmFnZ2FibGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uU2V0RHJhZ2dhYmxlKG1hcmtlci5EcmFnZ2FibGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIEljb24gb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgaWNvbi4gSWNvbiBpbmZvcm1hdGlvbiBpcyBwcmVzZW50XHJcbiAgICAgKiBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaWNvbiBpbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZUljb24obWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hcmtlci5JY29uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogSU1hcmtlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHsgbGF0aXR1ZGU6IG1hcmtlci5MYXRpdHVkZSwgbG9uZ2l0dWRlOiBtYXJrZXIuTG9uZ2l0dWRlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbkluZm86IG1hcmtlci5JY29uSW5mb1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKHgpO1xyXG4gICAgICAgICAgICAgICAgbS5TZXRJY29uKG8uaWNvbik7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuRHluYW1pY01hcmtlckNyZWF0ZWQuZW1pdCh4Lmljb25JbmZvKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG0uU2V0SWNvbihtYXJrZXIuSWNvblVybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBsYWJlbCBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBsYWJlbC5cclxuICAgICAqIExhYmVsIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGxhYmVsIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlTGFiZWwobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IHsgbS5TZXRMYWJlbChtYXJrZXIuTGFiZWwpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgY29vcmRpbmF0ZXMuXHJcbiAgICAgKiBDb29yZGluYXRlIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIHBvc2l0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlTWFya2VyUG9zaXRpb24obWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKFxyXG4gICAgICAgICAgICAobTogTWFya2VyKSA9PiBtLlNldFBvc2l0aW9uKHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBtYXJrZXIuTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IG1hcmtlci5Mb25naXR1ZGVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdGl0bGUgb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgdGl0bGUuXHJcbiAgICAgKiBUaXRsZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSB0aXRsZSBoYXMgYmVlbiB1cGRhdGVkLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFVwZGF0ZVRpdGxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiBtLlNldFRpdGxlKG1hcmtlci5UaXRsZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmlzaWJpbGl0eSBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSB0aXRsZS5cclxuICAgICAqIFRpdGxlIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIHRpdGxlIGhhcyBiZWVuIHVwZGF0ZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlVmlzaWJsZShtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4gbS5TZXRWaXNpYmxlKG1hcmtlci5WaXNpYmxlKSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==