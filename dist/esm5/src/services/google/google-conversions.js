/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as GoogleMapTypes from './google-map-types';
import { MapTypeId } from '../../models/map-type-id';
/**
 * This class contains helperfunctions to map various interfaces used to represent options and structures into the
 * corresponding Google Maps specific implementations.
 *
 * @export
 */
var GoogleConversions = /** @class */ (function () {
    function GoogleConversions() {
    }
    /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateBounds = /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (bounds) {
        /** @type {?} */
        var b = {
            east: bounds.maxLongitude,
            north: bounds.maxLatitude,
            south: bounds.minLatitude,
            west: bounds.minLongitude,
        };
        return b;
    };
    /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateInfoWindowOptions = /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._infoWindowOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'htmlContent') {
                o.content = (/** @type {?} */ (options))[k];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        if (o.content == null || o.content === '') {
            if (options.title !== '' && options.description !== '') {
                o.content = options.title + ": " + options.description;
            }
            else if (options.description !== '') {
                o.content = options.description;
            }
            else {
                o.content = options.title;
            }
        }
        return o;
    };
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocation = /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlong) {
        /** @type {?} */
        var l = { lat: latlong.latitude, lng: latlong.longitude };
        return l;
    };
    /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLatLng = /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlng) {
        /** @type {?} */
        var l = { latitude: latlng.lat, longitude: latlng.lng };
        return l;
    };
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocationObject = /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlong) {
        /** @type {?} */
        var l = new google.maps.LatLng(latlong.latitude, latlong.longitude);
        return l;
    };
    /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLatLngObject = /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlng) {
        /** @type {?} */
        var l = { latitude: latlng.lat(), longitude: latlng.lng() };
        return l;
    };
    /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocationObjectArray = /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlongArray) {
        /** @type {?} */
        var p = new Array();
        for (var i = 0; i < latlongArray.length; i++) {
            p.push(GoogleConversions.TranslateLocationObject(latlongArray[i]));
        }
        return p;
    };
    /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateMapTypeId = /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (mapTypeId) {
        switch (mapTypeId) {
            case MapTypeId.road: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.roadmap];
            case MapTypeId.grayscale: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            case MapTypeId.hybrid: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.hybrid];
            case MapTypeId.ordnanceSurvey: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            default: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.satellite];
        }
    };
    /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    GoogleConversions.TranslateMarkerOptions = /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._markerOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'position') {
                /** @type {?} */
                var latlng = GoogleConversions.TranslateLocationObject(options[k]);
                o.position = latlng;
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateOptions = /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._mapOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'center') {
                o.center = GoogleConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = GoogleConversions.TranslateMapTypeId(options.mapTypeId);
            }
            else if (k === 'disableZooming') {
                o.gestureHandling = 'none';
                o.zoomControl = false;
            }
            else if (k === 'showMapTypeSelector') {
                o.mapTypeControl = false;
            }
            else if (k === 'customMapStyleGoogle') {
                o.styles = /** @type {?} */ (/** @type {?} */ (options.customMapStyleGoogle));
            }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    GoogleConversions.TranslatePaths = /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    function (paths) {
        /** @type {?} */
        var p = new Array();
        if (paths == null || !Array.isArray(paths) || paths.length === 0) {
            p.push(new Array());
        }
        else if (Array.isArray(paths[0])) {
            /** @type {?} */
            var p1 = /** @type {?} */ (paths);
            for (var i = 0; i < p1.length; i++) {
                p.push(GoogleConversions.TranslateLocationObjectArray(p1[i]));
            }
        }
        else {
            // parameter is a simple array....
            p.push(GoogleConversions.TranslateLocationObjectArray(/** @type {?} */ (paths)));
        }
        return p;
    };
    /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslatePolygonOptions = /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._polygonOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'paths') {
                if (!Array.isArray(options.paths)) {
                    return;
                }
                if (options.paths.length === 0) {
                    o.paths = new Array();
                }
                else if (Array.isArray(options.paths[0])) {
                    o.paths = new Array();
                    /** @type {?} */
                    var p1 = /** @type {?} */ (options.paths);
                    for (var i = 0; i < p1.length; i++) {
                        o.paths[i] = new Array();
                        for (var j = 0; j < p1[i].length; j++) {
                            o.paths[i][j] = { lat: p1[i][j].latitude, lng: p1[i][j].longitude };
                        }
                    }
                }
                else {
                    o.paths = new Array();
                    /** @type {?} */
                    var p1 = /** @type {?} */ (options.paths);
                    for (var i = 0; i < p1.length; i++) {
                        o.paths[i] = { lat: p1[i].latitude, lng: p1[i].longitude };
                    }
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslatePolylineOptions = /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._polylineOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            o[k] = (/** @type {?} */ (options))[k];
        });
        return o;
    };
    /**
     * Map option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._mapOptionsAttributes = [
        'backgroundColor',
        'center',
        'clickableIcons',
        'customMapStyleGoogle',
        'disableDefaultUI',
        'disableDoubleClickZoom',
        'draggable',
        'draggableCursor',
        'draggingCursor',
        'disableZooming',
        'fullscreenControl',
        'fullscreenControlOptions',
        'gestureHandling',
        'heading',
        'keyboardShortcuts',
        'mapTypeControl',
        'mapTypeControlOptions',
        'mapTypeId',
        'maxZoom',
        'minZoom',
        'noClear',
        'panControl',
        'panControlOptions',
        'rotateControl',
        'rotateControlOptions',
        'scaleControl',
        'scaleControlOptions',
        'scrollwheel',
        'showMapTypeSelector',
        'streetView',
        'streetViewControl',
        'streetViewControlOptions',
        'styles',
        'tilt',
        'zoom',
        'zoomControl',
        'zoomControlOptions'
    ];
    /**
     * InfoWindow option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._infoWindowOptionsAttributes = [
        'actions',
        'description',
        'htmlContent',
        'id',
        'position',
        'pixelOffset',
        'showCloseButton',
        'showPointer',
        'pushpin',
        'title',
        'titleClickHandler',
        'typeName',
        'visible',
        'width',
        'height'
    ];
    /**
     * Marker option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._markerOptionsAttributes = [
        'anchor',
        'position',
        'title',
        'text',
        'label',
        'draggable',
        'icon',
        'width',
        'height',
        'iconInfo',
        'metadata',
        'visible'
    ];
    /**
     * Cluster option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._clusterOptionsAttributes = [
        'callback',
        'clusteredPinCallback',
        'clusteringEnabled',
        'gridSize',
        'layerOffset',
        'placementMode',
        'visible',
        'zIndex'
    ];
    /**
     * Polygon option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._polygonOptionsAttributes = [
        'clickable',
        'draggable',
        'editable',
        'fillColor',
        'fillOpacity',
        'geodesic',
        'paths',
        'strokeColor',
        'strokeOpacity',
        'strokeWeight',
        'visible',
        'zIndex'
    ];
    /**
     * Polyline option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._polylineOptionsAttributes = [
        'clickable',
        'draggable',
        'editable',
        'geodesic',
        'strokeColor',
        'strokeOpacity',
        'strokeWeight',
        'visible',
        'zIndex'
    ];
    return GoogleConversions;
}());
export { GoogleConversions };
if (false) {
    /**
     * Map option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._mapOptionsAttributes;
    /**
     * InfoWindow option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._infoWindowOptionsAttributes;
    /**
     * Marker option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._markerOptionsAttributes;
    /**
     * Cluster option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._clusterOptionsAttributes;
    /**
     * Polygon option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._polygonOptionsAttributes;
    /**
     * Polyline option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._polylineOptionsAttributes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNvbnZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLE9BQU8sS0FBSyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzS25DLGlDQUFlOzs7Ozs7OztjQUFDLE1BQVk7O1FBQ3RDLElBQU0sQ0FBQyxHQUF1QztZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVztZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7U0FDNUIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQyw0Q0FBMEI7Ozs7Ozs7O2NBQUMsT0FBMkI7O1FBQ2hFLElBQU0sQ0FBQyxHQUEyQyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhFLENBQWdFLENBQUM7YUFDN0UsT0FBTyxDQUFDLFVBQUMsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsT0FBTyxHQUFHLG1CQUFNLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFNLE9BQU8sRUFB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ZTtRQUNmLFNBQVM7UUFDVCxRQUFRO0tBQ1g7Ozs7OztrREFPb0Q7UUFDakQsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsV0FBVztRQUNYLGFBQWE7UUFDYixVQUFVO1FBQ1YsT0FBTztRQUNQLGFBQWE7UUFDYixlQUFlO1FBQ2YsY0FBYztRQUNkLFNBQVM7UUFDVCxRQUFRO0tBQ1g7Ozs7OzttREFPcUQ7UUFDbEQsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsVUFBVTtRQUNWLGFBQWE7UUFDYixlQUFlO1FBQ2YsY0FBYztRQUNkLFNBQVM7UUFDVCxRQUFRO0tBQ1g7NEJBcEtMOztTQW1CYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcclxuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWJveCc7XHJcbmltcG9ydCB7IElNYXBPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFwLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5pbXBvcnQgeyBNYXBUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFwLXR5cGUtaWQnO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgY29udGFpbnMgaGVscGVyZnVuY3Rpb25zIHRvIG1hcCB2YXJpb3VzIGludGVyZmFjZXMgdXNlZCB0byByZXByZXNlbnQgb3B0aW9ucyBhbmQgc3RydWN0dXJlcyBpbnRvIHRoZVxyXG4gKiBjb3JyZXNwb25kaW5nIEdvb2dsZSBNYXBzIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUNvbnZlcnNpb25zIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX21hcE9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnYmFja2dyb3VuZENvbG9yJyxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgICAnY2xpY2thYmxlSWNvbnMnLFxyXG4gICAgICAgICdjdXN0b21NYXBTdHlsZUdvb2dsZScsXHJcbiAgICAgICAgJ2Rpc2FibGVEZWZhdWx0VUknLFxyXG4gICAgICAgICdkaXNhYmxlRG91YmxlQ2xpY2tab29tJyxcclxuICAgICAgICAnZHJhZ2dhYmxlJyxcclxuICAgICAgICAnZHJhZ2dhYmxlQ3Vyc29yJyxcclxuICAgICAgICAnZHJhZ2dpbmdDdXJzb3InLFxyXG4gICAgICAgICdkaXNhYmxlWm9vbWluZycsXHJcbiAgICAgICAgJ2Z1bGxzY3JlZW5Db250cm9sJyxcclxuICAgICAgICAnZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zJyxcclxuICAgICAgICAnZ2VzdHVyZUhhbmRsaW5nJyxcclxuICAgICAgICAnaGVhZGluZycsXHJcbiAgICAgICAgJ2tleWJvYXJkU2hvcnRjdXRzJyxcclxuICAgICAgICAnbWFwVHlwZUNvbnRyb2wnLFxyXG4gICAgICAgICdtYXBUeXBlQ29udHJvbE9wdGlvbnMnLFxyXG4gICAgICAgICdtYXBUeXBlSWQnLFxyXG4gICAgICAgICdtYXhab29tJyxcclxuICAgICAgICAnbWluWm9vbScsXHJcbiAgICAgICAgJ25vQ2xlYXInLFxyXG4gICAgICAgICdwYW5Db250cm9sJyxcclxuICAgICAgICAncGFuQ29udHJvbE9wdGlvbnMnLFxyXG4gICAgICAgICdyb3RhdGVDb250cm9sJyxcclxuICAgICAgICAncm90YXRlQ29udHJvbE9wdGlvbnMnLFxyXG4gICAgICAgICdzY2FsZUNvbnRyb2wnLFxyXG4gICAgICAgICdzY2FsZUNvbnRyb2xPcHRpb25zJyxcclxuICAgICAgICAnc2Nyb2xsd2hlZWwnLFxyXG4gICAgICAgICdzaG93TWFwVHlwZVNlbGVjdG9yJyxcclxuICAgICAgICAnc3RyZWV0VmlldycsXHJcbiAgICAgICAgJ3N0cmVldFZpZXdDb250cm9sJyxcclxuICAgICAgICAnc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zJyxcclxuICAgICAgICAnc3R5bGVzJyxcclxuICAgICAgICAndGlsdCcsXHJcbiAgICAgICAgJ3pvb20nLFxyXG4gICAgICAgICd6b29tQ29udHJvbCcsXHJcbiAgICAgICAgJ3pvb21Db250cm9sT3B0aW9ucydcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvV2luZG93IG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luZm9XaW5kb3dPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2FjdGlvbnMnLFxyXG4gICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ2h0bWxDb250ZW50JyxcclxuICAgICAgICAnaWQnLFxyXG4gICAgICAgICdwb3NpdGlvbicsXHJcbiAgICAgICAgJ3BpeGVsT2Zmc2V0JyxcclxuICAgICAgICAnc2hvd0Nsb3NlQnV0dG9uJyxcclxuICAgICAgICAnc2hvd1BvaW50ZXInLFxyXG4gICAgICAgICdwdXNocGluJyxcclxuICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICd0aXRsZUNsaWNrSGFuZGxlcicsXHJcbiAgICAgICAgJ3R5cGVOYW1lJyxcclxuICAgICAgICAndmlzaWJsZScsXHJcbiAgICAgICAgJ3dpZHRoJyxcclxuICAgICAgICAnaGVpZ2h0J1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmtlciBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9tYXJrZXJPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2FuY2hvcicsXHJcbiAgICAgICAgJ3Bvc2l0aW9uJyxcclxuICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICd0ZXh0JyxcclxuICAgICAgICAnbGFiZWwnLFxyXG4gICAgICAgICdkcmFnZ2FibGUnLFxyXG4gICAgICAgICdpY29uJyxcclxuICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICdoZWlnaHQnLFxyXG4gICAgICAgICdpY29uSW5mbycsXHJcbiAgICAgICAgJ21ldGFkYXRhJyxcclxuICAgICAgICAndmlzaWJsZSdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbHVzdGVyIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NsdXN0ZXJPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2NhbGxiYWNrJyxcclxuICAgICAgICAnY2x1c3RlcmVkUGluQ2FsbGJhY2snLFxyXG4gICAgICAgICdjbHVzdGVyaW5nRW5hYmxlZCcsXHJcbiAgICAgICAgJ2dyaWRTaXplJyxcclxuICAgICAgICAnbGF5ZXJPZmZzZXQnLFxyXG4gICAgICAgICdwbGFjZW1lbnRNb2RlJyxcclxuICAgICAgICAndmlzaWJsZScsXHJcbiAgICAgICAgJ3pJbmRleCdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2x5Z29uIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3BvbHlnb25PcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2NsaWNrYWJsZScsXHJcbiAgICAgICAgJ2RyYWdnYWJsZScsXHJcbiAgICAgICAgJ2VkaXRhYmxlJyxcclxuICAgICAgICAnZmlsbENvbG9yJyxcclxuICAgICAgICAnZmlsbE9wYWNpdHknLFxyXG4gICAgICAgICdnZW9kZXNpYycsXHJcbiAgICAgICAgJ3BhdGhzJyxcclxuICAgICAgICAnc3Ryb2tlQ29sb3InLFxyXG4gICAgICAgICdzdHJva2VPcGFjaXR5JyxcclxuICAgICAgICAnc3Ryb2tlV2VpZ2h0JyxcclxuICAgICAgICAndmlzaWJsZScsXHJcbiAgICAgICAgJ3pJbmRleCdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2x5bGluZSBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnY2xpY2thYmxlJyxcclxuICAgICAgICAnZHJhZ2dhYmxlJyxcclxuICAgICAgICAnZWRpdGFibGUnLFxyXG4gICAgICAgICdnZW9kZXNpYycsXHJcbiAgICAgICAgJ3N0cm9rZUNvbG9yJyxcclxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXHJcbiAgICAgICAgJ3N0cm9rZVdlaWdodCcsXHJcbiAgICAgICAgJ3Zpc2libGUnLFxyXG4gICAgICAgICd6SW5kZXgnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJQm94IG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kc0xpdGVyYWwgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBib3VuZHMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUJvdW5kcyhib3VuZHM6IElCb3gpOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHNMaXRlcmFsIHtcclxuICAgICAgICBjb25zdCBiOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHNMaXRlcmFsID0ge1xyXG4gICAgICAgICAgICBlYXN0OiBib3VuZHMubWF4TG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICBub3J0aDogYm91bmRzLm1heExhdGl0dWRlLFxyXG4gICAgICAgICAgICBzb3V0aDogYm91bmRzLm1pbkxhdGl0dWRlLFxyXG4gICAgICAgICAgICB3ZXN0OiBib3VuZHMubWluTG9uZ2l0dWRlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElJbmZvV2luZG93T3B0aW9ucyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93T3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUluZm9XaW5kb3dPcHRpb25zKG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93T3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5faW5mb1dpbmRvd09wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdodG1sQ29udGVudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmNvbnRlbnQgPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBpZiAoby5jb250ZW50ID09IG51bGwgfHwgby5jb250ZW50ID09PSAnJykge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAhPT0gJycgJiYgb3B0aW9ucy5kZXNjcmlwdGlvbiAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIG8uY29udGVudCA9IGAke29wdGlvbnMudGl0bGV9OiAke29wdGlvbnMuZGVzY3JpcHRpb259YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRlc2NyaXB0aW9uICE9PSAnJykgeyBvLmNvbnRlbnQgPSBvcHRpb25zLmRlc2NyaXB0aW9uOyB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBvLmNvbnRlbnQgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTGF0TG9uZyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0bG9uZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9jYXRpb24obGF0bG9uZzogSUxhdExvbmcpOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsIHtcclxuICAgICAgICBjb25zdCBsOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsID0geyBsYXQ6IGxhdGxvbmcubGF0aXR1ZGUsIGxuZzogbGF0bG9uZy5sb25naXR1ZGUgfTtcclxuICAgICAgICByZXR1cm4gbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCBvYmplY3QgdG8gYSBJTGF0TG9uZyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdGxuZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTGF0TG5nKGxhdGxuZzogR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCk6IElMYXRMb25nIHtcclxuICAgICAgICBjb25zdCBsOiBJTGF0TG9uZyA9IHsgbGF0aXR1ZGU6IGxhdGxuZy5sYXQsIGxvbmdpdHVkZTogbGF0bG5nLmxuZyB9O1xyXG4gICAgICAgIHJldHVybiBsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTGF0TG9uZyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5MYXRMbmcgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRsb25nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsYXRsb25nOiBJTGF0TG9uZyk6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyB7XHJcbiAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXRsb25nLmxhdGl0dWRlLCBsYXRsb25nLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgcmV0dXJuIGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIEdvb2dsZU1hcFR5cGVzLkxhdExuZyBvYmplY3QgdG8gYSBJTGF0TG9uZyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdGxuZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTGF0TG5nT2JqZWN0KGxhdGxuZzogR29vZ2xlTWFwVHlwZXMuTGF0TG5nKTogSUxhdExvbmcge1xyXG4gICAgICAgIGNvbnN0IGw6IElMYXRMb25nID0geyBsYXRpdHVkZTogbGF0bG5nLmxhdCgpLCBsb25naXR1ZGU6IGxhdGxuZy5sbmcoKSB9O1xyXG4gICAgICAgIHJldHVybiBsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTGF0TG9uZyBhcnJheSB0byBhIGFycmF5IG9mIEdvb2dsZU1hcFR5cGVzLkxhdExuZyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdGxvbmdBcnJheSAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9jYXRpb25PYmplY3RBcnJheShsYXRsb25nQXJyYXk6IEFycmF5PElMYXRMb25nPik6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4ge1xyXG4gICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi4uXHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXRsb25nQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcC5wdXNoKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxhdGxvbmdBcnJheVtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYSBNYXBUeXBlSWQgb2JqZWN0IHRvIGEgR29vZ2xlIG1hcHR5cGUgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXBUeXBlSWQgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU1hcFR5cGVJZChtYXBUeXBlSWQ6IE1hcFR5cGVJZCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoIChtYXBUeXBlSWQpIHtcclxuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQucm9hZDogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQucm9hZG1hcF07XHJcbiAgICAgICAgICAgIGNhc2UgTWFwVHlwZUlkLmdyYXlzY2FsZTogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQudGVycmFpbl07XHJcbiAgICAgICAgICAgIGNhc2UgTWFwVHlwZUlkLmh5YnJpZDogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQuaHlicmlkXTtcclxuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQub3JkbmFuY2VTdXJ2ZXk6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnRlcnJhaW5dO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC5zYXRlbGxpdGVdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSU1hcmtlck9wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIHRoYXQgd2hlbiByZXNvbHZlZCBjb250YWlucyB0aGUgbWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5fbWFya2VyT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhdGxuZyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KG9wdGlvbnNba10pO1xyXG4gICAgICAgICAgICAgICAgICAgIG8ucG9zaXRpb24gPSBsYXRsbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTWFwT3B0aW9ucyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlT3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gR29vZ2xlQ29udmVyc2lvbnMuX21hcE9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdjZW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5jZW50ZXIgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLmNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFwVHlwZUlkKG9wdGlvbnMubWFwVHlwZUlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdkaXNhYmxlWm9vbWluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmdlc3R1cmVIYW5kbGluZyA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICBvLnpvb21Db250cm9sID0gIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ3Nob3dNYXBUeXBlU2VsZWN0b3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlQ29udHJvbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ2N1c3RvbU1hcFN0eWxlR29vZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uc3R5bGVzID0gPEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVTdHlsZVtdPjxhbnk+IG9wdGlvbnMuY3VzdG9tTWFwU3R5bGVHb29nbGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICg8YW55Pm8pW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlcyBhbiBhcnJheSBvZiBsb2NhdGlvbnMgb3IgYW4gYXJyYXkgb3IgYXJyYXlzIG9mIGxvY2F0aW9uIHRvIGFuZCBhcnJheSBvZiBhcnJheXMgb2YgQmluZyBNYXAgTG9jYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhdGhzIC0gSUxhdExvbmcgYmFzZWQgbG9jYXRpb25zIHRvIGNvbnZlcnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIGNvbnZlcnRlZCBsb2NhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUGF0aHMocGF0aHM6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PEFycmF5PElMYXRMb25nPj4pOiBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PiB7XHJcbiAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4gPSBuZXcgQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4oKTtcclxuICAgICAgICBpZiAocGF0aHMgPT0gbnVsbCB8fCAhQXJyYXkuaXNBcnJheShwYXRocykgfHwgcGF0aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHAucHVzaChuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwYXRoc1swXSkpIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9yIGFycmF5c1xyXG4gICAgICAgICAgICAvLyB1c2UgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlIGluIGNhc2Ugd2UgZGVhbCB3aXRoIGxhcmdlIG51bWJlcnMgb2YgcG9pbnRzIGFuZCBwYXRocy4uLlxyXG4gICAgICAgICAgICBjb25zdCBwMSA9IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwLnB1c2goR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3RBcnJheShwMVtpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYSBzaW1wbGUgYXJyYXkuLi4uXHJcbiAgICAgICAgICAgIHAucHVzaChHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdEFycmF5KDxBcnJheTxJTGF0TG9uZz4+cGF0aHMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgTWFwcyBhbiBJUG9seWdvbk9wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5fcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdwYXRocycpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRocykpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucGF0aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHMgPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHMgPSBuZXcgQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbD4+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcDEgPSA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5vcHRpb25zLnBhdGhzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzW2ldID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWw+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHAxW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRoc1tpXVtqXSA9IHtsYXQ6IHAxW2ldW2pdLmxhdGl0dWRlLCBsbmc6IHAxW2ldW2pdLmxvbmdpdHVkZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHMgPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbD4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGZvciBsb29wIGZvciBwZXJmb3JtYW5jZSBpbiBjYXNlIHdlIGRlYWwgd2l0aCBsYXJnZSBudW1iZXJzIG9mIHBvaW50cyBhbmQgcGF0aHMuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwMSA9IDxBcnJheTxJTGF0TG9uZz4+b3B0aW9ucy5wYXRocztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRoc1tpXSA9IHtsYXQ6IHAxW2ldLmxhdGl0dWRlLCBsbmc6IHAxW2ldLmxvbmdpdHVkZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIE1hcHMgYW4gSVBvbHlsaW5lT3B0aW9ucyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gR29vZ2xlQ29udmVyc2lvbnMuX3BvbHlsaW5lT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==