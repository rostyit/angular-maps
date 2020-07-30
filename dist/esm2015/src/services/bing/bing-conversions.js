/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MapTypeId } from '../../models/map-type-id';
import { ClusterPlacementMode } from '../../models/cluster-placement-mode';
/**
 * This class contains helperfunctions to map various interfaces used to represent options and structures into the
 * corresponding Bing Maps V8 specific implementations.
 *
 * @export
 */
export class BingConversions {
    /**
     * Maps an IInfoWindowAction to a Microsoft.Maps.IInfoboxActions
     *
     * \@memberof BingConversions
     * @param {?} action - Object to be mapped.
     * @return {?} - Navtive mapped object.
     *
     */
    static TranslateAction(action) {
        /** @type {?} */
        const a = {
            eventHandler: action.eventHandler,
            label: action.label
        };
        return a;
    }
    /**
     * Maps an Array of IInfoWindowAction to an Array of Microsoft.Maps.IInfoboxActions
     *
     * \@memberof BingConversions
     * @param {?} actions - Array of objects to be mapped.
     * @return {?} - Array of mapped objects.
     *
     */
    static TranslateActions(actions) {
        /** @type {?} */
        const a = new Array();
        actions.forEach(x => a.push(BingConversions.TranslateAction(x)));
        return a;
    }
    /**
     * Maps an IBox object to a Microsoft.Maps.LocationRect object.
     *
     * \@memberof BingConversions
     * @param {?} box - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateBounds(box) {
        /** @type {?} */
        const r = Microsoft.Maps.LocationRect.fromEdges(box.maxLatitude, box.minLongitude, box.minLatitude, box.maxLongitude);
        return r;
    }
    /**
     * Maps an IClusterOptions object to a Microsoft.Maps.IClusterLayerOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateClusterOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._clusterOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'layerOffset') {
                o.layerOffset = BingConversions.TranslatePoint(options.layerOffset);
            }
            if (k === 'placementMode') {
                if (options.placementMode === ClusterPlacementMode.FirstPin) {
                    o.placementMode = Microsoft.Maps.ClusterPlacementType.FirstLocation;
                }
                else {
                    o.placementMode = Microsoft.Maps.ClusterPlacementType.MeanAverage;
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IInfoWindowOptions object to a Microsoft.Maps.IInfoboxOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateInfoBoxOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._infoWindowOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'pixelOffset') {
                o.offset = BingConversions.TranslatePoint(options.pixelOffset);
            }
            else if (k === 'position') {
                o.location = BingConversions.TranslateLocation(options.position);
            }
            else if (k === 'actions') {
                o.actions = BingConversions.TranslateActions(options.actions);
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IMapLoadOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLoadOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => {
            return BingConversions._mapOptionsAttributes.indexOf(k) !== -1 || BingConversions._viewOptionsAttributes.indexOf(k) !== -1;
        })
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                if (options.mapTypeId === MapTypeId.hybrid) {
                    o.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
                    o.labelOverlay = Microsoft.Maps.LabelOverlay.visible;
                }
                else if (options.mapTypeId === MapTypeId.aerial) {
                    o.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
                    o.labelOverlay = Microsoft.Maps.LabelOverlay.hidden;
                }
                else {
                    o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
                }
            }
            else if (k === 'bounds') {
                o.bounds = BingConversions.TranslateBounds(options.bounds);
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an ILatLong object to a Microsoft.Maps.Location object.
     *
     * \@memberof BingConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocation(latlong) {
        /** @type {?} */
        const l = new Microsoft.Maps.Location(latlong.latitude, latlong.longitude);
        return l;
    }
    /**
     * Maps an IMarkerOptions object to a Microsoft.Maps.IPushpinOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - The mapped object.
     *
     */
    static TranslateMarkerOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._markerOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'anchor') {
                o.anchor = BingConversions.TranslatePoint(options.anchor);
            }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IMapOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._mapOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof BingConversions
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
                /** @type {?} */
                const _p = new Array();
                for (let j = 0; j < p1[i].length; j++) {
                    _p.push(new Microsoft.Maps.Location(p1[i][j].latitude, p1[i][j].longitude));
                }
                p.push(_p);
            }
        }
        else {
            /** @type {?} */
            const y = new Array();
            /** @type {?} */
            const p1 = /** @type {?} */ (paths);
            for (let i = 0; i < p1.length; i++) {
                y.push(new Microsoft.Maps.Location(p1[i].latitude, p1[i].longitude));
            }
            p.push(y);
        }
        return p;
    }
    /**
     *  Maps an IPoint object to a Microsoft.Maps.Point object.
     *
     * \@memberof BingConversions
     * @param {?} point - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePoint(point) {
        /** @type {?} */
        const p = new Microsoft.Maps.Point(point.x, point.y);
        return p;
    }
    /**
     *  Maps an IPolygonOptions object to a Microsoft.Maps.IPolygonOptions.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolygonOptions(options) {
        /** @type {?} */
        const o = {};
        /** @type {?} */
        const f = (s, a) => {
            /** @type {?} */
            const m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
            if (m && m.length > 3) {
                a = a > 1 ? (a / 100) : a;
                return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
            }
            else if (s[0] === '#') {
                /** @type {?} */
                const x = a > 1 ? a : Math.floor(a * 255);
                /** @type {?} */
                const z = s.substr(1);
                /** @type {?} */
                const r = parseInt(z.substr(0, 2), 16);
                /** @type {?} */
                const g = parseInt(z.substr(2, 2), 16);
                /** @type {?} */
                const b = parseInt(z.substr(4, 2), 16);
                return 'rgba(' + [r, g, b, a].join(',') + ')';
            }
            else {
                return s;
            }
        };
        Object.keys(options)
            .filter(k => BingConversions._polygonOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'strokeWeight') {
                o.strokeThickness = options.strokeWeight;
            }
            else if (k === 'strokeColor') {
                if (options.strokeOpacity) {
                    o.strokeColor = f(options.strokeColor, options.strokeOpacity);
                }
                else {
                    o.strokeColor = options.strokeColor;
                }
            }
            else if (k === 'strokeOpacity') { }
            else if (k === 'fillColor') {
                if (options.fillOpacity) {
                    o.fillColor = f(options.fillColor, options.fillOpacity);
                }
                else {
                    o.fillColor = options.fillColor;
                }
            }
            else if (k === 'fillOpacity') { }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     *  Maps an IPolylineOptions object to a Microsoft.Maps.IPolylineOptions.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolylineOptions(options) {
        /** @type {?} */
        const o = {};
        /** @type {?} */
        const f = (s, a) => {
            /** @type {?} */
            const m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
            if (m && m.length > 3) {
                a = a > 1 ? (a / 100) : a;
                return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
            }
            else if (s[0] === '#') {
                /** @type {?} */
                const x = a > 1 ? a : Math.floor(a * 255);
                /** @type {?} */
                const z = s.substr(1);
                /** @type {?} */
                const r = parseInt(z.substr(0, 2), 16);
                /** @type {?} */
                const g = parseInt(z.substr(2, 2), 16);
                /** @type {?} */
                const b = parseInt(z.substr(4, 2), 16);
                return 'rgba(' + [r, g, b, a].join(',') + ')';
            }
            else {
                return s;
            }
        };
        Object.keys(options)
            .filter(k => BingConversions._polylineOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'strokeWeight') {
                o.strokeThickness = options.strokeWeight;
            }
            else if (k === 'strokeColor') {
                if (options.strokeOpacity) {
                    o.strokeColor = f(options.strokeColor, options.strokeOpacity);
                }
                else {
                    o.strokeColor = options.strokeColor;
                }
            }
            else if (k === 'strokeOpacity') {
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IViewOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateViewOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._viewOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'bounds') {
                o.bounds = BingConversions.TranslateBounds(options.bounds);
            }
            else if (k === 'centerOffset') {
                o.centerOffset = BingConversions.TranslatePoint(options.centerOffset);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
}
/**
 * Map option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._mapOptionsAttributes = [
    'backgroundColor',
    'credentials',
    'customizeOverlays',
    'customMapStyle',
    'disableBirdseye',
    'disableKeyboardInput',
    'disableMouseInput',
    'disablePanning',
    'disableTouchInput',
    'disableUserInput',
    'disableZooming',
    'disableStreetside',
    'enableClickableLogo',
    'enableSearchLogo',
    'fixedMapPosition',
    'height',
    'inertiaIntensity',
    'navigationBarMode',
    'showBreadcrumb',
    'showCopyright',
    'showDashboard',
    'showMapTypeSelector',
    'showScalebar',
    'theme',
    'tileBuffer',
    'useInertia',
    'width',
    'center',
    'zoom',
    'mapTypeId',
    'liteMode'
];
/**
 * View option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._viewOptionsAttributes = [
    'animate',
    'bounds',
    'center',
    'centerOffset',
    'heading',
    'labelOverlay',
    'mapTypeId',
    'padding',
    'zoom'
];
/**
 * InfoWindow option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._infoWindowOptionsAttributes = [
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
 * Marker option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._markerOptionsAttributes = [
    'anchor',
    'draggable',
    'height',
    'htmlContent',
    'icon',
    'infobox',
    'state',
    'title',
    'textOffset',
    'typeName',
    'visible',
    'width',
    'zIndex'
];
/**
 * Polygon option attributes that are supported for conversion to Bing Map Polygon properties
 *
 * \@memberof BingConversions
 */
BingConversions._polygonOptionsAttributes = [
    'cursor',
    'fillColor',
    'fillOpacity',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'visible'
];
/**
 * Polyline option attributes that are supported for conversion to Bing Map Polyline properties
 *
 * \@memberof BingConversions
 */
BingConversions._polylineOptionsAttributes = [
    'cursor',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'visible'
];
/**
 * Cluster option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._clusterOptionsAttributes = [
    'callback',
    'clusteredPinCallback',
    'clusteringEnabled',
    'gridSize',
    'layerOffset',
    'placementMode',
    'visible',
    'zIndex'
];
if (false) {
    /**
     * Map option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._mapOptionsAttributes;
    /**
     * View option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._viewOptionsAttributes;
    /**
     * InfoWindow option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._infoWindowOptionsAttributes;
    /**
     * Marker option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._markerOptionsAttributes;
    /**
     * Polygon option attributes that are supported for conversion to Bing Map Polygon properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._polygonOptionsAttributes;
    /**
     * Polyline option attributes that are supported for conversion to Bing Map Polyline properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._polylineOptionsAttributes;
    /**
     * Cluster option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._clusterOptionsAttributes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jb252ZXJzaW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVdBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7OztBQVMzRSxNQUFNOzs7Ozs7Ozs7SUFrS0ssTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUF5Qjs7UUFDbkQsTUFBTSxDQUFDLEdBQW1DO1lBQ3RDLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTtZQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7U0FDdEIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBaUM7O1FBQzVELE1BQU0sQ0FBQyxHQUEwQyxJQUFJLEtBQUssRUFBa0MsQ0FBQztRQUM3RixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV04sTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFTOztRQUNuQyxNQUFNLENBQUMsR0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hILE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsdUJBQXVCLENBQUMsT0FBd0I7O1FB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QUFRO0lBQ1IsYUFBYTtJQUNiLE1BQU07SUFDTixTQUFTO0lBQ1QsT0FBTztJQUNQLE9BQU87SUFDUCxZQUFZO0lBQ1osVUFBVTtJQUNWLFNBQVM7SUFDVCxPQUFPO0lBQ1AsUUFBUTtDQUNYOzs7Ozs7NENBT29EO0lBQ2pELFFBQVE7SUFDUixXQUFXO0lBQ1gsYUFBYTtJQUNiLGFBQWE7SUFDYixlQUFlO0lBQ2YsY0FBYztJQUNkLFNBQVM7Q0FDWjs7Ozs7OzZDQU9xRDtJQUNsRCxRQUFRO0lBQ1IsYUFBYTtJQUNiLGVBQWU7SUFDZixjQUFjO0lBQ2QsU0FBUztDQUNaOzs7Ozs7NENBT29EO0lBQ2pELFVBQVU7SUFDVixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixhQUFhO0lBQ2IsZUFBZTtJQUNmLFNBQVM7SUFDVCxRQUFRO0NBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcclxuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWJveCc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93QWN0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctYWN0aW9uJztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXAtdHlwZS1pZCc7XHJcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgY29udGFpbnMgaGVscGVyZnVuY3Rpb25zIHRvIG1hcCB2YXJpb3VzIGludGVyZmFjZXMgdXNlZCB0byByZXByZXNlbnQgb3B0aW9ucyBhbmQgc3RydWN0dXJlcyBpbnRvIHRoZVxyXG4gKiBjb3JyZXNwb25kaW5nIEJpbmcgTWFwcyBWOCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nQ29udmVyc2lvbnMge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXAgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEJpbmcgTWFwIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2JhY2tncm91bmRDb2xvcicsXHJcbiAgICAgICAgJ2NyZWRlbnRpYWxzJyxcclxuICAgICAgICAnY3VzdG9taXplT3ZlcmxheXMnLFxyXG4gICAgICAgICdjdXN0b21NYXBTdHlsZScsXHJcbiAgICAgICAgJ2Rpc2FibGVCaXJkc2V5ZScsXHJcbiAgICAgICAgJ2Rpc2FibGVLZXlib2FyZElucHV0JyxcclxuICAgICAgICAnZGlzYWJsZU1vdXNlSW5wdXQnLFxyXG4gICAgICAgICdkaXNhYmxlUGFubmluZycsXHJcbiAgICAgICAgJ2Rpc2FibGVUb3VjaElucHV0JyxcclxuICAgICAgICAnZGlzYWJsZVVzZXJJbnB1dCcsXHJcbiAgICAgICAgJ2Rpc2FibGVab29taW5nJyxcclxuICAgICAgICAnZGlzYWJsZVN0cmVldHNpZGUnLFxyXG4gICAgICAgICdlbmFibGVDbGlja2FibGVMb2dvJyxcclxuICAgICAgICAnZW5hYmxlU2VhcmNoTG9nbycsXHJcbiAgICAgICAgJ2ZpeGVkTWFwUG9zaXRpb24nLFxyXG4gICAgICAgICdoZWlnaHQnLFxyXG4gICAgICAgICdpbmVydGlhSW50ZW5zaXR5JyxcclxuICAgICAgICAnbmF2aWdhdGlvbkJhck1vZGUnLFxyXG4gICAgICAgICdzaG93QnJlYWRjcnVtYicsXHJcbiAgICAgICAgJ3Nob3dDb3B5cmlnaHQnLFxyXG4gICAgICAgICdzaG93RGFzaGJvYXJkJyxcclxuICAgICAgICAnc2hvd01hcFR5cGVTZWxlY3RvcicsXHJcbiAgICAgICAgJ3Nob3dTY2FsZWJhcicsXHJcbiAgICAgICAgJ3RoZW1lJyxcclxuICAgICAgICAndGlsZUJ1ZmZlcicsXHJcbiAgICAgICAgJ3VzZUluZXJ0aWEnLFxyXG4gICAgICAgICd3aWR0aCcsXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICAgJ3pvb20nLFxyXG4gICAgICAgICdtYXBUeXBlSWQnLFxyXG4gICAgICAgICdsaXRlTW9kZSdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaWV3IG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfdmlld09wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnYW5pbWF0ZScsXHJcbiAgICAgICAgJ2JvdW5kcycsXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICAgJ2NlbnRlck9mZnNldCcsXHJcbiAgICAgICAgJ2hlYWRpbmcnLFxyXG4gICAgICAgICdsYWJlbE92ZXJsYXknLFxyXG4gICAgICAgICdtYXBUeXBlSWQnLFxyXG4gICAgICAgICdwYWRkaW5nJyxcclxuICAgICAgICAnem9vbSdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvV2luZG93IG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5mb1dpbmRvd09wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnYWN0aW9ucycsXHJcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnaHRtbENvbnRlbnQnLFxyXG4gICAgICAgICdpZCcsXHJcbiAgICAgICAgJ3Bvc2l0aW9uJyxcclxuICAgICAgICAncGl4ZWxPZmZzZXQnLFxyXG4gICAgICAgICdzaG93Q2xvc2VCdXR0b24nLFxyXG4gICAgICAgICdzaG93UG9pbnRlcicsXHJcbiAgICAgICAgJ3B1c2hwaW4nLFxyXG4gICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgJ3RpdGxlQ2xpY2tIYW5kbGVyJyxcclxuICAgICAgICAndHlwZU5hbWUnLFxyXG4gICAgICAgICd2aXNpYmxlJyxcclxuICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICdoZWlnaHQnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFya2VyIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbWFya2VyT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdhbmNob3InLFxyXG4gICAgICAgICdkcmFnZ2FibGUnLFxyXG4gICAgICAgICdoZWlnaHQnLFxyXG4gICAgICAgICdodG1sQ29udGVudCcsXHJcbiAgICAgICAgJ2ljb24nLFxyXG4gICAgICAgICdpbmZvYm94JyxcclxuICAgICAgICAnc3RhdGUnLFxyXG4gICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgJ3RleHRPZmZzZXQnLFxyXG4gICAgICAgICd0eXBlTmFtZScsXHJcbiAgICAgICAgJ3Zpc2libGUnLFxyXG4gICAgICAgICd3aWR0aCcsXHJcbiAgICAgICAgJ3pJbmRleCdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2x5Z29uIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBQb2x5Z29uIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdjdXJzb3InLFxyXG4gICAgICAgICdmaWxsQ29sb3InLFxyXG4gICAgICAgICdmaWxsT3BhY2l0eScsXHJcbiAgICAgICAgJ3N0cm9rZUNvbG9yJyxcclxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXHJcbiAgICAgICAgJ3N0cm9rZVdlaWdodCcsXHJcbiAgICAgICAgJ3Zpc2libGUnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9seWxpbmUgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEJpbmcgTWFwIFBvbHlsaW5lIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnY3Vyc29yJyxcclxuICAgICAgICAnc3Ryb2tlQ29sb3InLFxyXG4gICAgICAgICdzdHJva2VPcGFjaXR5JyxcclxuICAgICAgICAnc3Ryb2tlV2VpZ2h0JyxcclxuICAgICAgICAndmlzaWJsZSdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbHVzdGVyIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfY2x1c3Rlck9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnY2FsbGJhY2snLFxyXG4gICAgICAgICdjbHVzdGVyZWRQaW5DYWxsYmFjaycsXHJcbiAgICAgICAgJ2NsdXN0ZXJpbmdFbmFibGVkJyxcclxuICAgICAgICAnZ3JpZFNpemUnLFxyXG4gICAgICAgICdsYXllck9mZnNldCcsXHJcbiAgICAgICAgJ3BsYWNlbWVudE1vZGUnLFxyXG4gICAgICAgICd2aXNpYmxlJyxcclxuICAgICAgICAnekluZGV4J1xyXG4gICAgXTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElJbmZvV2luZG93QWN0aW9uIHRvIGEgTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGFjdGlvbiAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE5hdnRpdmUgbWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlQWN0aW9uKGFjdGlvbjogSUluZm9XaW5kb3dBY3Rpb24pOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveEFjdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IGE6IE1pY3Jvc29mdC5NYXBzLklJbmZvYm94QWN0aW9ucyA9IHtcclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyOiBhY3Rpb24uZXZlbnRIYW5kbGVyLFxyXG4gICAgICAgICAgICBsYWJlbDogYWN0aW9uLmxhYmVsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gQXJyYXkgb2YgSUluZm9XaW5kb3dBY3Rpb24gdG8gYW4gQXJyYXkgb2YgTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGFjdGlvbnMgLSBBcnJheSBvZiBvYmplY3RzIHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgbWFwcGVkIG9iamVjdHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUFjdGlvbnMoYWN0aW9uczogQXJyYXk8SUluZm9XaW5kb3dBY3Rpb24+KTogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zPiB7XHJcbiAgICAgICAgY29uc3QgYTogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5JSW5mb2JveEFjdGlvbnM+KCk7XHJcbiAgICAgICAgYWN0aW9ucy5mb3JFYWNoKHggPT4gYS5wdXNoKEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVBY3Rpb24oeCkpKTtcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUJveCBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3Qgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBib3ggLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVCb3VuZHMoYm94OiBJQm94KTogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb25SZWN0IHtcclxuICAgICAgICBjb25zdCByOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3QgPVxyXG4gICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3QuZnJvbUVkZ2VzKGJveC5tYXhMYXRpdHVkZSwgYm94Lm1pbkxvbmdpdHVkZSwgYm94Lm1pbkxhdGl0dWRlLCBib3gubWF4TG9uZ2l0dWRlKTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUNsdXN0ZXJPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklDbHVzdGVyTGF5ZXJPcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUNsdXN0ZXJPcHRpb25zKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IE1pY3Jvc29mdC5NYXBzLklDbHVzdGVyTGF5ZXJPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX2NsdXN0ZXJPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnbGF5ZXJPZmZzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5sYXllck9mZnNldCA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2ludChvcHRpb25zLmxheWVyT2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAncGxhY2VtZW50TW9kZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5wbGFjZW1lbnRNb2RlID09PSBDbHVzdGVyUGxhY2VtZW50TW9kZS5GaXJzdFBpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnBsYWNlbWVudE1vZGUgPSBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUGxhY2VtZW50VHlwZS5GaXJzdExvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5wbGFjZW1lbnRNb2RlID0gTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclBsYWNlbWVudFR5cGUuTWVhbkF2ZXJhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUluZm9XaW5kb3dPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklJbmZvYm94T3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVJbmZvQm94T3B0aW9ucyhvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklJbmZvYm94T3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX2luZm9XaW5kb3dPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAncGl4ZWxPZmZzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5vZmZzZXQgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9pbnQob3B0aW9ucy5waXhlbE9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAncG9zaXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5sb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdhY3Rpb25zJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uYWN0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVBY3Rpb25zKG9wdGlvbnMuYWN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTWFwT3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9hZE9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklNYXBMb2FkT3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmluZ0NvbnZlcnNpb25zLl9tYXBPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSB8fCBCaW5nQ29udmVyc2lvbnMuX3ZpZXdPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnY2VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uY2VudGVyID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMuY2VudGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdtYXBUeXBlSWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWFwVHlwZUlkID09PSBNYXBUeXBlSWQuaHlicmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gTWljcm9zb2Z0Lk1hcHMuTWFwVHlwZUlkLmFlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5sYWJlbE92ZXJsYXkgPSBNaWNyb3NvZnQuTWFwcy5MYWJlbE92ZXJsYXkudmlzaWJsZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5tYXBUeXBlSWQgPT09IE1hcFR5cGVJZC5hZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlSWQgPSBNaWNyb3NvZnQuTWFwcy5NYXBUeXBlSWQuYWVyaWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLmxhYmVsT3ZlcmxheSA9IE1pY3Jvc29mdC5NYXBzLkxhYmVsT3ZlcmxheS5oaWRkZW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVJZCA9IE1pY3Jvc29mdC5NYXBzLk1hcFR5cGVJZFsoPGFueT5NYXBUeXBlSWQpW29wdGlvbnMubWFwVHlwZUlkXV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ2JvdW5kcycpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmJvdW5kcyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVCb3VuZHMob3B0aW9ucy5ib3VuZHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUxhdExvbmcgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRsb25nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9jYXRpb24obGF0bG9uZzogSUxhdExvbmcpOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiB7XHJcbiAgICAgICAgY29uc3QgbDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24obGF0bG9uZy5sYXRpdHVkZSwgbGF0bG9uZy5sb25naXR1ZGUpO1xyXG4gICAgICAgIHJldHVybiBsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTWFya2VyT3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIG1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdhbmNob3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5hbmNob3IgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9pbnQob3B0aW9ucy5hbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+bylba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElNYXBPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklNYXBPcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JTWFwT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSU1hcE9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl9tYXBPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnY2VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uY2VudGVyID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMuY2VudGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdtYXBUeXBlSWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlSWQgPSBNaWNyb3NvZnQuTWFwcy5NYXBUeXBlSWRbKDxhbnk+TWFwVHlwZUlkKVtvcHRpb25zLm1hcFR5cGVJZF1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgYW4gYXJyYXkgb2YgbG9jYXRpb25zIG9yIGFuIGFycmF5IG9yIGFycmF5cyBvZiBsb2NhdGlvbiB0byBhbmQgYXJyYXkgb2YgYXJyYXlzIG9mIEJpbmcgTWFwIExvY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRocyAtIElMYXRMb25nIGJhc2VkIGxvY2F0aW9ucyB0byBjb252ZXJ0LlxyXG4gICAgICogQHJldHVybnMgLSBjb252ZXJ0ZWQgbG9jYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQYXRocyhwYXRoczogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8QXJyYXk8SUxhdExvbmc+Pik6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBuZXcgQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PigpO1xyXG4gICAgICAgIGlmIChwYXRocyA9PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHBhdGhzKSB8fCBwYXRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcC5wdXNoKG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcclxuICAgICAgICAgICAgLy8gdXMgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHM7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9wOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHAxW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3AucHVzaChuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24ocDFbaV1bal0ubGF0aXR1ZGUsIHAxW2ldW2pdLmxvbmdpdHVkZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcC5wdXNoKF9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGEgc2ltcGxlIGFycmF5Li4uLlxyXG4gICAgICAgICAgICBjb25zdCB5OiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PElMYXRMb25nPj5wYXRocztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgeS5wdXNoKG5ldyBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbihwMVtpXS5sYXRpdHVkZSwgcDFbaV0ubG9uZ2l0dWRlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcC5wdXNoKHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBNYXBzIGFuIElQb2ludCBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5Qb2ludCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBvaW50IC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUG9pbnQocG9pbnQ6IElQb2ludCk6IE1pY3Jvc29mdC5NYXBzLlBvaW50IHtcclxuICAgICAgICBjb25zdCBwOiBNaWNyb3NvZnQuTWFwcy5Qb2ludCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBNYXBzIGFuIElQb2x5Z29uT3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5Z29uT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGY6IChzOiBzdHJpbmcsIGE6IG51bWJlcikgPT4gc3RyaW5nID0gKHMsIGEpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbSA9IC9yZ2JhP1xcKChcXGQrKVxccyosXFxzKihcXGQrKVxccyosXFxzKihcXGQrKVxccyooLFxccypcXGQrW1xcLlxcZCtdKikqXFwpL2cuZXhlYyhzKTtcclxuICAgICAgICAgICAgaWYgKG0gJiYgbS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYSA+IDEgPyAoYSAvIDEwMCkgOiBhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBbbVsxXSwgbVsyXSwgbVszXSwgYV0uam9pbignLCcpICsgJyknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNbMF0gPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogbnVtYmVyID0gYSA+IDEgPyBhIDogTWF0aC5mbG9vcihhICogMjU1KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHo6IHN0cmluZyA9IHMuc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcjogbnVtYmVyID0gcGFyc2VJbnQoei5zdWJzdHIoMCwgMiksIDE2KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGc6IG51bWJlciA9IHBhcnNlSW50KHouc3Vic3RyKDIsIDIpLCAxNik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiOiBudW1iZXIgPSBwYXJzZUludCh6LnN1YnN0cig0LCAyKSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBbciAsIGcsIGIsIGFdLmpvaW4oJywnKSArICcpJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEJpbmdDb252ZXJzaW9ucy5fcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdzdHJva2VXZWlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5zdHJva2VUaGlja25lc3MgPSBvcHRpb25zLnN0cm9rZVdlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdzdHJva2VDb2xvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zdHJva2VPcGFjaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlQ29sb3IgPSBmKG9wdGlvbnMuc3Ryb2tlQ29sb3IsIG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnN0cm9rZUNvbG9yID0gb3B0aW9ucy5zdHJva2VDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnc3Ryb2tlT3BhY2l0eScpIHt9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnZmlsbENvbG9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbGxPcGFjaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uZmlsbENvbG9yID0gZihvcHRpb25zLmZpbGxDb2xvciwgb3B0aW9ucy5maWxsT3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLmZpbGxDb2xvciA9IG9wdGlvbnMuZmlsbENvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdmaWxsT3BhY2l0eScpIHt9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAoPGFueT5vKVtrXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBNYXBzIGFuIElQb2x5bGluZU9wdGlvbnMgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyB8IGFueSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGY6IChzOiBzdHJpbmcsIGE6IG51bWJlcikgPT4gc3RyaW5nID0gKHMsIGEpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbSA9IC9yZ2JhP1xcKChcXGQrKVxccyosXFxzKihcXGQrKVxccyosXFxzKihcXGQrKVxccyooLFxccypcXGQrW1xcLlxcZCtdKikqXFwpL2cuZXhlYyhzKTtcclxuICAgICAgICAgICAgaWYgKG0gJiYgbS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYSA+IDEgPyAoYSAvIDEwMCkgOiBhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBbbVsxXSwgbVsyXSwgbVszXSwgYV0uam9pbignLCcpICsgJyknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNbMF0gPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogbnVtYmVyID0gYSA+IDEgPyBhIDogTWF0aC5mbG9vcihhICogMjU1KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHo6IHN0cmluZyA9IHMuc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcjogbnVtYmVyID0gcGFyc2VJbnQoei5zdWJzdHIoMCwgMiksIDE2KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGc6IG51bWJlciA9IHBhcnNlSW50KHouc3Vic3RyKDIsIDIpLCAxNik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiOiBudW1iZXIgPSBwYXJzZUludCh6LnN1YnN0cig0LCAyKSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBbciAsIGcsIGIsIGFdLmpvaW4oJywnKSArICcpJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdzdHJva2VXZWlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5zdHJva2VUaGlja25lc3MgPSBvcHRpb25zLnN0cm9rZVdlaWdodDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PT0gJ3N0cm9rZUNvbG9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnN0cm9rZU9wYWNpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5zdHJva2VDb2xvciA9IGYob3B0aW9ucy5zdHJva2VDb2xvciwgb3B0aW9ucy5zdHJva2VPcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlQ29sb3IgPSBvcHRpb25zLnN0cm9rZUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdzdHJva2VPcGFjaXR5Jykge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSU1hcE9wdGlvbnMgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuSVZpZXdPcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVZpZXdPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSVZpZXdPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JVmlld09wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl92aWV3T3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmNlbnRlciA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLmNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT09ICdib3VuZHMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5ib3VuZHMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQm91bmRzKG9wdGlvbnMuYm91bmRzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PT0gJ2NlbnRlck9mZnNldCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmNlbnRlck9mZnNldCA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2ludChvcHRpb25zLmNlbnRlck9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT09ICdtYXBUeXBlSWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlSWQgPSBNaWNyb3NvZnQuTWFwcy5NYXBUeXBlSWRbKDxhbnk+TWFwVHlwZUlkKVtvcHRpb25zLm1hcFR5cGVJZF1dO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=