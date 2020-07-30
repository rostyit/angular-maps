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
export class GoogleConversions {
    /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateBounds(bounds) {
        /** @type {?} */
        const b = {
            east: bounds.maxLongitude,
            north: bounds.maxLatitude,
            south: bounds.minLatitude,
            west: bounds.minLongitude,
        };
        return b;
    }
    /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateInfoWindowOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._infoWindowOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'htmlContent') {
                o.content = (/** @type {?} */ (options))[k];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        if (o.content == null || o.content === '') {
            if (options.title !== '' && options.description !== '') {
                o.content = `${options.title}: ${options.description}`;
            }
            else if (options.description !== '') {
                o.content = options.description;
            }
            else {
                o.content = options.title;
            }
        }
        return o;
    }
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocation(latlong) {
        /** @type {?} */
        const l = { lat: latlong.latitude, lng: latlong.longitude };
        return l;
    }
    /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLatLng(latlng) {
        /** @type {?} */
        const l = { latitude: latlng.lat, longitude: latlng.lng };
        return l;
    }
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocationObject(latlong) {
        /** @type {?} */
        const l = new google.maps.LatLng(latlong.latitude, latlong.longitude);
        return l;
    }
    /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLatLngObject(latlng) {
        /** @type {?} */
        const l = { latitude: latlng.lat(), longitude: latlng.lng() };
        return l;
    }
    /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocationObjectArray(latlongArray) {
        /** @type {?} */
        const p = new Array();
        for (let i = 0; i < latlongArray.length; i++) {
            p.push(GoogleConversions.TranslateLocationObject(latlongArray[i]));
        }
        return p;
    }
    /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateMapTypeId(mapTypeId) {
        switch (mapTypeId) {
            case MapTypeId.road: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.roadmap];
            case MapTypeId.grayscale: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            case MapTypeId.hybrid: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.hybrid];
            case MapTypeId.ordnanceSurvey: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            default: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.satellite];
        }
    }
    /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    static TranslateMarkerOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._markerOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'position') {
                /** @type {?} */
                const latlng = GoogleConversions.TranslateLocationObject(options[k]);
                o.position = latlng;
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._mapOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
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
    }
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    static TranslatePaths(paths) {
        /** @type {?} */
        const p = new Array();
        if (paths == null || !Array.isArray(paths) || paths.length === 0) {
            p.push(new Array());
        }
        else if (Array.isArray(paths[0])) {
            /** @type {?} */
            const p1 = /** @type {?} */ (paths);
            for (let i = 0; i < p1.length; i++) {
                p.push(GoogleConversions.TranslateLocationObjectArray(p1[i]));
            }
        }
        else {
            // parameter is a simple array....
            p.push(GoogleConversions.TranslateLocationObjectArray(/** @type {?} */ (paths)));
        }
        return p;
    }
    /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolygonOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._polygonOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
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
                    const p1 = /** @type {?} */ (options.paths);
                    for (let i = 0; i < p1.length; i++) {
                        o.paths[i] = new Array();
                        for (let j = 0; j < p1[i].length; j++) {
                            o.paths[i][j] = { lat: p1[i][j].latitude, lng: p1[i][j].longitude };
                        }
                    }
                }
                else {
                    o.paths = new Array();
                    /** @type {?} */
                    const p1 = /** @type {?} */ (options.paths);
                    for (let i = 0; i < p1.length; i++) {
                        o.paths[i] = { lat: p1[i].latitude, lng: p1[i].longitude };
                    }
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolylineOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._polylineOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            o[k] = (/** @type {?} */ (options))[k];
        });
        return o;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNvbnZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLE9BQU8sS0FBSyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7O0FBV3JELE1BQU07Ozs7Ozs7OztJQTJKSyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQVk7O1FBQ3RDLE1BQU0sQ0FBQyxHQUF1QztZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVztZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7U0FDNUIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsMEJBQTBCLENBQUMsT0FBMkI7O1FBQ2hFLE1BQU0sQ0FBQyxHQUEyQyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDN0UsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxtQkFBTSxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFB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QjtJQUN0QixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLGFBQWE7SUFDYixlQUFlO0lBQ2YsU0FBUztJQUNULFFBQVE7Q0FDWDs7Ozs7OzhDQU9vRDtJQUNqRCxXQUFXO0lBQ1gsV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsYUFBYTtJQUNiLFVBQVU7SUFDVixPQUFPO0lBQ1AsYUFBYTtJQUNiLGVBQWU7SUFDZixjQUFjO0lBQ2QsU0FBUztJQUNULFFBQVE7Q0FDWDs7Ozs7OytDQU9xRDtJQUNsRCxXQUFXO0lBQ1gsV0FBVztJQUNYLFVBQVU7SUFDVixVQUFVO0lBQ1YsYUFBYTtJQUNiLGVBQWU7SUFDZixjQUFjO0lBQ2QsU0FBUztJQUNULFFBQVE7Q0FDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pYm94JztcclxuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XHJcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXAtdHlwZS1pZCc7XHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcclxuXHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBjb250YWlucyBoZWxwZXJmdW5jdGlvbnMgdG8gbWFwIHZhcmlvdXMgaW50ZXJmYWNlcyB1c2VkIHRvIHJlcHJlc2VudCBvcHRpb25zIGFuZCBzdHJ1Y3R1cmVzIGludG8gdGhlXHJcbiAqIGNvcnJlc3BvbmRpbmcgR29vZ2xlIE1hcHMgc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlQ29udmVyc2lvbnMge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXAgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdiYWNrZ3JvdW5kQ29sb3InLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICdjbGlja2FibGVJY29ucycsXHJcbiAgICAgICAgJ2N1c3RvbU1hcFN0eWxlR29vZ2xlJyxcclxuICAgICAgICAnZGlzYWJsZURlZmF1bHRVSScsXHJcbiAgICAgICAgJ2Rpc2FibGVEb3VibGVDbGlja1pvb20nLFxyXG4gICAgICAgICdkcmFnZ2FibGUnLFxyXG4gICAgICAgICdkcmFnZ2FibGVDdXJzb3InLFxyXG4gICAgICAgICdkcmFnZ2luZ0N1cnNvcicsXHJcbiAgICAgICAgJ2Rpc2FibGVab29taW5nJyxcclxuICAgICAgICAnZnVsbHNjcmVlbkNvbnRyb2wnLFxyXG4gICAgICAgICdmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMnLFxyXG4gICAgICAgICdnZXN0dXJlSGFuZGxpbmcnLFxyXG4gICAgICAgICdoZWFkaW5nJyxcclxuICAgICAgICAna2V5Ym9hcmRTaG9ydGN1dHMnLFxyXG4gICAgICAgICdtYXBUeXBlQ29udHJvbCcsXHJcbiAgICAgICAgJ21hcFR5cGVDb250cm9sT3B0aW9ucycsXHJcbiAgICAgICAgJ21hcFR5cGVJZCcsXHJcbiAgICAgICAgJ21heFpvb20nLFxyXG4gICAgICAgICdtaW5ab29tJyxcclxuICAgICAgICAnbm9DbGVhcicsXHJcbiAgICAgICAgJ3BhbkNvbnRyb2wnLFxyXG4gICAgICAgICdwYW5Db250cm9sT3B0aW9ucycsXHJcbiAgICAgICAgJ3JvdGF0ZUNvbnRyb2wnLFxyXG4gICAgICAgICdyb3RhdGVDb250cm9sT3B0aW9ucycsXHJcbiAgICAgICAgJ3NjYWxlQ29udHJvbCcsXHJcbiAgICAgICAgJ3NjYWxlQ29udHJvbE9wdGlvbnMnLFxyXG4gICAgICAgICdzY3JvbGx3aGVlbCcsXHJcbiAgICAgICAgJ3Nob3dNYXBUeXBlU2VsZWN0b3InLFxyXG4gICAgICAgICdzdHJlZXRWaWV3JyxcclxuICAgICAgICAnc3RyZWV0Vmlld0NvbnRyb2wnLFxyXG4gICAgICAgICdzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMnLFxyXG4gICAgICAgICdzdHlsZXMnLFxyXG4gICAgICAgICd0aWx0JyxcclxuICAgICAgICAnem9vbScsXHJcbiAgICAgICAgJ3pvb21Db250cm9sJyxcclxuICAgICAgICAnem9vbUNvbnRyb2xPcHRpb25zJ1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZm9XaW5kb3cgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5mb1dpbmRvd09wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnYWN0aW9ucycsXHJcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnaHRtbENvbnRlbnQnLFxyXG4gICAgICAgICdpZCcsXHJcbiAgICAgICAgJ3Bvc2l0aW9uJyxcclxuICAgICAgICAncGl4ZWxPZmZzZXQnLFxyXG4gICAgICAgICdzaG93Q2xvc2VCdXR0b24nLFxyXG4gICAgICAgICdzaG93UG9pbnRlcicsXHJcbiAgICAgICAgJ3B1c2hwaW4nLFxyXG4gICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgJ3RpdGxlQ2xpY2tIYW5kbGVyJyxcclxuICAgICAgICAndHlwZU5hbWUnLFxyXG4gICAgICAgICd2aXNpYmxlJyxcclxuICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICdoZWlnaHQnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFya2VyIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnYW5jaG9yJyxcclxuICAgICAgICAncG9zaXRpb24nLFxyXG4gICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgJ3RleHQnLFxyXG4gICAgICAgICdsYWJlbCcsXHJcbiAgICAgICAgJ2RyYWdnYWJsZScsXHJcbiAgICAgICAgJ2ljb24nLFxyXG4gICAgICAgICd3aWR0aCcsXHJcbiAgICAgICAgJ2hlaWdodCcsXHJcbiAgICAgICAgJ2ljb25JbmZvJyxcclxuICAgICAgICAnbWV0YWRhdGEnLFxyXG4gICAgICAgICd2aXNpYmxlJ1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsdXN0ZXIgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfY2x1c3Rlck9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnY2FsbGJhY2snLFxyXG4gICAgICAgICdjbHVzdGVyZWRQaW5DYWxsYmFjaycsXHJcbiAgICAgICAgJ2NsdXN0ZXJpbmdFbmFibGVkJyxcclxuICAgICAgICAnZ3JpZFNpemUnLFxyXG4gICAgICAgICdsYXllck9mZnNldCcsXHJcbiAgICAgICAgJ3BsYWNlbWVudE1vZGUnLFxyXG4gICAgICAgICd2aXNpYmxlJyxcclxuICAgICAgICAnekluZGV4J1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbHlnb24gb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnY2xpY2thYmxlJyxcclxuICAgICAgICAnZHJhZ2dhYmxlJyxcclxuICAgICAgICAnZWRpdGFibGUnLFxyXG4gICAgICAgICdmaWxsQ29sb3InLFxyXG4gICAgICAgICdmaWxsT3BhY2l0eScsXHJcbiAgICAgICAgJ2dlb2Rlc2ljJyxcclxuICAgICAgICAncGF0aHMnLFxyXG4gICAgICAgICdzdHJva2VDb2xvcicsXHJcbiAgICAgICAgJ3N0cm9rZU9wYWNpdHknLFxyXG4gICAgICAgICdzdHJva2VXZWlnaHQnLFxyXG4gICAgICAgICd2aXNpYmxlJyxcclxuICAgICAgICAnekluZGV4J1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbHlsaW5lIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3BvbHlsaW5lT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdjbGlja2FibGUnLFxyXG4gICAgICAgICdkcmFnZ2FibGUnLFxyXG4gICAgICAgICdlZGl0YWJsZScsXHJcbiAgICAgICAgJ2dlb2Rlc2ljJyxcclxuICAgICAgICAnc3Ryb2tlQ29sb3InLFxyXG4gICAgICAgICdzdHJva2VPcGFjaXR5JyxcclxuICAgICAgICAnc3Ryb2tlV2VpZ2h0JyxcclxuICAgICAgICAndmlzaWJsZScsXHJcbiAgICAgICAgJ3pJbmRleCdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElCb3ggb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTGF0TG5nQm91bmRzTGl0ZXJhbCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGJvdW5kcyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlQm91bmRzKGJvdW5kczogSUJveCk6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kc0xpdGVyYWwge1xyXG4gICAgICAgIGNvbnN0IGI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kc0xpdGVyYWwgPSB7XHJcbiAgICAgICAgICAgIGVhc3Q6IGJvdW5kcy5tYXhMb25naXR1ZGUsXHJcbiAgICAgICAgICAgIG5vcnRoOiBib3VuZHMubWF4TGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIHNvdXRoOiBib3VuZHMubWluTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIHdlc3Q6IGJvdW5kcy5taW5Mb25naXR1ZGUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUluZm9XaW5kb3dPcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlSW5mb1dpbmRvd09wdGlvbnMob3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9pbmZvV2luZG93T3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2h0bWxDb250ZW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uY29udGVudCA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChvLmNvbnRlbnQgPT0gbnVsbCB8fCBvLmNvbnRlbnQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICE9PSAnJyAmJiBvcHRpb25zLmRlc2NyaXB0aW9uICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgby5jb250ZW50ID0gYCR7b3B0aW9ucy50aXRsZX06ICR7b3B0aW9ucy5kZXNjcmlwdGlvbn1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZGVzY3JpcHRpb24gIT09ICcnKSB7IG8uY29udGVudCA9IG9wdGlvbnMuZGVzY3JpcHRpb247IH1cclxuICAgICAgICAgICAgZWxzZSB7IG8uY29udGVudCA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElMYXRMb25nIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRsb25nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMb2NhdGlvbihsYXRsb25nOiBJTGF0TG9uZyk6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwge1xyXG4gICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgPSB7IGxhdDogbGF0bG9uZy5sYXRpdHVkZSwgbG5nOiBsYXRsb25nLmxvbmdpdHVkZSB9O1xyXG4gICAgICAgIHJldHVybiBsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsIG9iamVjdCB0byBhIElMYXRMb25nIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0bG5nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMYXRMbmcobGF0bG5nOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsKTogSUxhdExvbmcge1xyXG4gICAgICAgIGNvbnN0IGw6IElMYXRMb25nID0geyBsYXRpdHVkZTogbGF0bG5nLmxhdCwgbG9uZ2l0dWRlOiBsYXRsbmcubG5nIH07XHJcbiAgICAgICAgcmV0dXJuIGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElMYXRMb25nIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLkxhdExuZyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdGxvbmcgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxhdGxvbmc6IElMYXRMb25nKTogR29vZ2xlTWFwVHlwZXMuTGF0TG5nIHtcclxuICAgICAgICBjb25zdCBsOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdGxvbmcubGF0aXR1ZGUsIGxhdGxvbmcubG9uZ2l0dWRlKTtcclxuICAgICAgICByZXR1cm4gbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gR29vZ2xlTWFwVHlwZXMuTGF0TG5nIG9iamVjdCB0byBhIElMYXRMb25nIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0bG5nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMYXRMbmdPYmplY3QobGF0bG5nOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgY29uc3QgbDogSUxhdExvbmcgPSB7IGxhdGl0dWRlOiBsYXRsbmcubGF0KCksIGxvbmdpdHVkZTogbGF0bG5nLmxuZygpIH07XHJcbiAgICAgICAgcmV0dXJuIGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElMYXRMb25nIGFycmF5IHRvIGEgYXJyYXkgb2YgR29vZ2xlTWFwVHlwZXMuTGF0TG5nIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0bG9uZ0FycmF5IC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMb2NhdGlvbk9iamVjdEFycmF5KGxhdGxvbmdBcnJheTogQXJyYXk8SUxhdExvbmc+KTogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiB7XHJcbiAgICAgICAgLy8gdXNlIGZvciBsb29wIGZvciBwZXJmb3JtYW5jZSBpbiBjYXNlIHdlIGRlYWwgd2l0aCBsYXJnZSBudW1iZXJzIG9mIHBvaW50cyBhbmQgcGF0aHMuLi5cclxuICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhdGxvbmdBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBwLnB1c2goR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobGF0bG9uZ0FycmF5W2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhIE1hcFR5cGVJZCBvYmplY3QgdG8gYSBHb29nbGUgbWFwdHlwZSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcFR5cGVJZCAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTWFwVHlwZUlkKG1hcFR5cGVJZDogTWFwVHlwZUlkKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKG1hcFR5cGVJZCkge1xyXG4gICAgICAgICAgICBjYXNlIE1hcFR5cGVJZC5yb2FkOiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC5yb2FkbWFwXTtcclxuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQuZ3JheXNjYWxlOiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC50ZXJyYWluXTtcclxuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQuaHlicmlkOiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC5oeWJyaWRdO1xyXG4gICAgICAgICAgICBjYXNlIE1hcFR5cGVJZC5vcmRuYW5jZVN1cnZleTogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQudGVycmFpbl07XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnNhdGVsbGl0ZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTWFya2VyT3B0aW9ucyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zIHRoZSBtYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9tYXJrZXJPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAncG9zaXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF0bG5nID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3Qob3B0aW9uc1trXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgby5wb3NpdGlvbiA9IGxhdGxuZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElNYXBPcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmNlbnRlciA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMuY2VudGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdtYXBUeXBlSWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlSWQgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXBUeXBlSWQob3B0aW9ucy5tYXBUeXBlSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ2Rpc2FibGVab29taW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uZ2VzdHVyZUhhbmRsaW5nID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIG8uem9vbUNvbnRyb2wgPSAgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnc2hvd01hcFR5cGVTZWxlY3RvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVDb250cm9sID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnY3VzdG9tTWFwU3R5bGVHb29nbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5zdHlsZXMgPSA8R29vZ2xlTWFwVHlwZXMuTWFwVHlwZVN0eWxlW10+PGFueT4gb3B0aW9ucy5jdXN0b21NYXBTdHlsZUdvb2dsZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+bylba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGVzIGFuIGFycmF5IG9mIGxvY2F0aW9ucyBvciBhbiBhcnJheSBvciBhcnJheXMgb2YgbG9jYXRpb24gdG8gYW5kIGFycmF5IG9mIGFycmF5cyBvZiBCaW5nIE1hcCBMb2NhdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aHMgLSBJTGF0TG9uZyBiYXNlZCBsb2NhdGlvbnMgdG8gY29udmVydC5cclxuICAgICAqIEByZXR1cm5zIC0gY29udmVydGVkIGxvY2F0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQYXRocyhwYXRoczogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8QXJyYXk8SUxhdExvbmc+Pik6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+IHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PiA9IG5ldyBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PigpO1xyXG4gICAgICAgIGlmIChwYXRocyA9PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHBhdGhzKSB8fCBwYXRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcC5wdXNoKG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBhdGhzWzBdKSkge1xyXG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb3IgYXJyYXlzXHJcbiAgICAgICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi4uXHJcbiAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHM7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHAucHVzaChHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdEFycmF5KHAxW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhIHNpbXBsZSBhcnJheS4uLi5cclxuICAgICAgICAgICAgcC5wdXNoKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0QXJyYXkoPEFycmF5PElMYXRMb25nPj5wYXRocykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBNYXBzIGFuIElQb2x5Z29uT3B0aW9ucyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ3BhdGhzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zLnBhdGhzKSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5wYXRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRocyA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRoc1swXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRocyA9IG5ldyBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsPj4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGZvciBsb29wIGZvciBwZXJmb3JtYW5jZSBpbiBjYXNlIHdlIGRlYWwgd2l0aCBsYXJnZSBudW1iZXJzIG9mIHBvaW50cyBhbmQgcGF0aHMuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwMSA9IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+Pm9wdGlvbnMucGF0aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHNbaV0gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbD4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcDFbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzW2ldW2pdID0ge2xhdDogcDFbaV1bal0ubGF0aXR1ZGUsIGxuZzogcDFbaV1bal0ubG9uZ2l0dWRlfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRocyA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlIGluIGNhc2Ugd2UgZGVhbCB3aXRoIGxhcmdlIG51bWJlcnMgb2YgcG9pbnRzIGFuZCBwYXRocy4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PElMYXRMb25nPj5vcHRpb25zLnBhdGhzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzW2ldID0ge2xhdDogcDFbaV0ubGF0aXR1ZGUsIGxuZzogcDFbaV0ubG9uZ2l0dWRlfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgTWFwcyBhbiBJUG9seWxpbmVPcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lT3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lT3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcbn1cclxuIl19