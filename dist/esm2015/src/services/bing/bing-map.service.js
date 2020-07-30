/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapAPILoader } from '../mapapiloader';
import { BingConversions } from './bing-conversions';
import { Marker } from '../../models/marker';
import { BingMarker } from '../../models/bing/bing-marker';
import { BingLayer } from '../../models/bing/bing-layer';
import { BingClusterLayer } from '../../models/bing/bing-cluster-layer';
import { BingInfoWindow } from '../../models/bing/bing-info-window';
import { BingPolygon } from '../../models/bing/bing-polygon';
import { BingPolyline } from '../../models/bing/bing-polyline';
import { MixinMapLabelWithOverlayView } from '../../models/bing/bing-label';
import { MixinCanvasOverlay } from '../../models/bing/bing-canvas-overlay';
import { BingCanvasOverlay } from '../../models/bing/bing-canvas-overlay';
import { BingMapEventsLookup } from '../../models/bing/bing-events-lookup';
/**
 * Concrete implementation of the MapService abstract implementing a Bin Map V8 provider
 *
 * @export
 */
export class BingMapService {
    /**
     * Creates an instance of BingMapService.
     * \@memberof BingMapService
     * @param {?} _loader MapAPILoader instance implemented for Bing Maps. This instance will generally be injected.
     * @param {?} _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     */
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._modules = new Map();
        this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    /**
     * Gets an array of loaded Bong modules.
     *
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get LoadedModules() { return this._modules; }
    /**
     * Gets the Bing Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get MapInstance() { return this._mapInstance; }
    /**
     * Gets a Promise for a Bing Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get MapPromise() { return this._map; }
    /**
     * Gets the maps physical size.
     *
     * \@readonly
     * @abstract
     * \@memberof BingMapService
     * @return {?}
     */
    get MapSize() {
        if (this.MapInstance) {
            /** @type {?} */
            const s = { width: this.MapInstance.getWidth(), height: this.MapInstance.getHeight() };
            return s;
        }
        return null;
    }
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof BingMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    CreateCanvasOverlay(drawCallback) {
        return this._map.then((map) => {
            /** @type {?} */
            const overlay = new BingCanvasOverlay(drawCallback);
            map.layers.insert(overlay);
            return overlay;
        });
    }
    /**
     * Creates a Bing map cluster layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.ClusterLayer object.
     *
     */
    CreateClusterLayer(options) {
        return this._map.then((map) => {
            /** @type {?} */
            const p = new Promise(resolve => {
                this.LoadModule('Microsoft.Maps.Clustering', () => {
                    /** @type {?} */
                    const o = BingConversions.TranslateClusterOptions(options);
                    /** @type {?} */
                    const layer = new Microsoft.Maps.ClusterLayer(new Array(), o);
                    /** @type {?} */
                    let bl;
                    map.layers.insert(layer);
                    bl = new BingClusterLayer(layer, this);
                    bl.SetOptions(options);
                    resolve(bl);
                });
            });
            return p;
        });
    }
    /**
     * Creates an information window for a map position
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    CreateInfoWindow(options) {
        return this._map.then((map) => {
            /** @type {?} */
            let loc;
            if (options.position == null) {
                loc = map.getCenter();
            }
            else {
                loc = new Microsoft.Maps.Location(options.position.latitude, options.position.longitude);
            }
            /** @type {?} */
            const infoBox = new Microsoft.Maps.Infobox(loc, BingConversions.TranslateInfoBoxOptions(options));
            infoBox.setMap(map);
            return new BingInfoWindow(infoBox);
        });
    }
    /**
     * Creates a map layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    CreateLayer(options) {
        return this._map.then((map) => {
            /** @type {?} */
            const layer = new Microsoft.Maps.Layer(options.id.toString());
            map.layers.insert(layer);
            return new BingLayer(layer, this);
        });
    }
    /**
     * Creates a map instance
     *
     * \@memberof BingMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    CreateMap(el, mapOptions) {
        return this._loader.Load().then(() => {
            // apply mixins
            MixinMapLabelWithOverlayView();
            MixinCanvasOverlay();
            // map startup...
            if (this._mapInstance != null) {
                this.DisposeMap();
            }
            /** @type {?} */
            const o = BingConversions.TranslateLoadOptions(mapOptions);
            if (!o.credentials) {
                o.credentials = this._config.apiKey;
            }
            /** @type {?} */
            const map = new Microsoft.Maps.Map(el, o);
            this._mapInstance = map;
            this._mapResolver(map);
        });
    }
    /**
     * Creates a Bing map marker within the map context
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    CreateMarker(options = /** @type {?} */ ({})) {
        /** @type {?} */
        const payload = (icon, map) => {
            /** @type {?} */
            const loc = BingConversions.TranslateLocation(options.position);
            /** @type {?} */
            const o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            /** @type {?} */
            const pushpin = new Microsoft.Maps.Pushpin(loc, o);
            /** @type {?} */
            const marker = new BingMarker(pushpin, map, null);
            if (options.metadata) {
                options.metadata.forEach((v, k) => marker.Metadata.set(k, v));
            }
            map.entities.push(pushpin);
            return marker;
        };
        return this._map.then((map) => {
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                const s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, map));
                }
                else {
                    return s.then(x => {
                        return (payload(x.icon, map));
                    });
                }
            }
            else {
                return (payload(null, map));
            }
        });
    }
    /**
     * Creates a polygon within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    CreatePolygon(options) {
        return this._map.then((map) => {
            /** @type {?} */
            const locs = BingConversions.TranslatePaths(options.paths);
            /** @type {?} */
            const o = BingConversions.TranslatePolygonOptions(options);
            /** @type {?} */
            const poly = new Microsoft.Maps.Polygon(locs, o);
            map.entities.push(poly);
            /** @type {?} */
            const p = new BingPolygon(poly, this, null);
            if (options.metadata) {
                options.metadata.forEach((v, k) => p.Metadata.set(k, v));
            }
            if (options.title && options.title !== '') {
                p.Title = options.title;
            }
            if (options.showLabel != null) {
                p.ShowLabel = options.showLabel;
            }
            if (options.showTooltip != null) {
                p.ShowTooltip = options.showTooltip;
            }
            if (options.labelMaxZoom != null) {
                p.LabelMaxZoom = options.labelMaxZoom;
            }
            if (options.labelMinZoom != null) {
                p.LabelMinZoom = options.labelMinZoom;
            }
            if (options.editable) {
                p.SetEditable(options.editable);
            }
            return p;
        });
    }
    /**
     * Creates a polyline within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polygon.
     *
     */
    CreatePolyline(options) {
        /** @type {?} */
        let polyline;
        return this._map.then((map) => {
            /** @type {?} */
            const o = BingConversions.TranslatePolylineOptions(options);
            /** @type {?} */
            const locs = BingConversions.TranslatePaths(options.path);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                map.entities.push(polyline);
                /** @type {?} */
                const pl = new BingPolyline(polyline, map, null);
                if (options.metadata) {
                    options.metadata.forEach((v, k) => pl.Metadata.set(k, v));
                }
                if (options.title && options.title !== '') {
                    pl.Title = options.title;
                }
                if (options.showTooltip != null) {
                    pl.ShowTooltip = options.showTooltip;
                }
                return pl;
            }
            else {
                /** @type {?} */
                const lines = new Array();
                locs.forEach(p => {
                    polyline = new Microsoft.Maps.Polyline(p, o);
                    map.entities.push(polyline);
                    /** @type {?} */
                    const pl = new BingPolyline(polyline, map, null);
                    if (options.metadata) {
                        options.metadata.forEach((v, k) => pl.Metadata.set(k, v));
                    }
                    if (options.title && options.title !== '') {
                        pl.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        pl.ShowTooltip = options.showTooltip;
                    }
                    lines.push(pl);
                });
                return lines;
            }
        });
    }
    /**
     * Deletes a layer from the map.
     *
     * \@memberof BingMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Bing specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    DeleteLayer(layer) {
        return this._map.then((map) => {
            map.layers.remove(layer.NativePrimitve);
        });
    }
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof BingMapService
     * @return {?}
     */
    DisposeMap() {
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance.dispose();
            this._mapInstance = null;
            this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        }
    }
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    GetCenter() {
        return this._map.then((map) => {
            /** @type {?} */
            const center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.latitude,
                longitude: center.longitude
            });
        });
    }
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the bounding box. See {\@link IBox}.
     *
     */
    GetBounds() {
        return this._map.then((map) => {
            /** @type {?} */
            const box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorth(),
                maxLongitude: box.crossesInternationalDateLine() ? box.getWest() : box.getEast(),
                minLatitude: box.getSouth(),
                minLongitude: box.crossesInternationalDateLine() ? box.getEast() : box.getWest(),
                center: { latitude: box.center.latitude, longitude: box.center.longitude },
                padding: 0
            });
        });
    }
    /**
     * Gets a shared or private instance of the map drawing tools.
     *
     * \@memberof BingMapService
     * @param {?=} useSharedInstance
     * @return {?} - Promise that when resolved containst an instance of the drawing tools.
     */
    GetDrawingTools(useSharedInstance = true) {
        return new Promise((resolve, reject) => {
            this.LoadModuleInstance('Microsoft.Maps.DrawingTools', useSharedInstance).then((o) => {
                resolve(o);
            });
        });
    }
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    GetZoom() {
        return this._map.then((map) => map.getZoom());
    }
    /**
     * Loads a module into the Map.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?} callback - Callback to call once loading is complete.
     * @return {?}
     */
    LoadModule(moduleName, callback) {
        if (this._modules.has(moduleName)) {
            callback();
        }
        else {
            Microsoft.Maps.loadModule(moduleName, () => {
                this._modules.set(moduleName, null);
                callback();
            });
        }
    }
    /**
     * Loads a module into the Map and delivers and instance of the module payload.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?=} useSharedInstance
     * @return {?}
     */
    LoadModuleInstance(moduleName, useSharedInstance = true) {
        /** @type {?} */
        const s = moduleName.substr(moduleName.lastIndexOf('.') + 1);
        if (this._modules.has(moduleName)) {
            /** @type {?} */
            let o = null;
            if (!useSharedInstance) {
                o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
            }
            else if (this._modules.get(moduleName) != null) {
                o = this._modules.get(moduleName);
            }
            else {
                o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
                this._modules.set(moduleName, o);
            }
            return Promise.resolve(o);
        }
        else {
            return new Promise((resolve, reject) => {
                try {
                    Microsoft.Maps.loadModule(moduleName, () => {
                        /** @type {?} */
                        const o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
                        if (useSharedInstance) {
                            this._modules.set(moduleName, o);
                        }
                        else {
                            this._modules.set(moduleName, null);
                        }
                        resolve(o);
                    });
                }
                catch (e) {
                    reject('Could not load module or create instance.');
                }
            });
        }
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    LocationToPoint(loc) {
        return this._map.then((m) => {
            /** @type {?} */
            const l = BingConversions.TranslateLocation(loc);
            /** @type {?} */
            const p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            if (p != null) {
                return { x: p.x, y: p.y };
            }
            return null;
        });
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    LocationsToPoints(locs) {
        return this._map.then((m) => {
            /** @type {?} */
            const l = locs.map(loc => BingConversions.TranslateLocation(loc));
            /** @type {?} */
            const p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            return p ? p : new Array();
        });
    }
    /**
     * Centers the map on a geo location.
     *
     * \@memberof BingMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    SetCenter(latLng) {
        return this._map.then((map) => map.setView({
            center: BingConversions.TranslateLocation(latLng)
        }));
    }
    /**
     * Sets the generic map options.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetMapOptions(options) {
        this._map.then((m) => {
            /** @type {?} */
            const o = BingConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    }
    /**
     * Sets the view options of the map.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetViewOptions(options) {
        this._map.then((m) => {
            /** @type {?} */
            const o = BingConversions.TranslateViewOptions(options);
            m.setView(o);
        });
    }
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof BingMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    SetZoom(zoom) {
        return this._map.then((map) => map.setView({
            zoom: zoom
        }));
    }
    /**
     * Creates an event subscription
     *
     * \@memberof BingMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    SubscribeToMapEvent(eventName) {
        /** @type {?} */
        const eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create((observer) => {
            this._map.then((m) => {
                Microsoft.Maps.Events.addHandler(m, eventNameTranslated, (e) => {
                    this._zone.run(() => observer.next(e));
                });
            });
        });
    }
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof BingMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    TriggerMapEvent(eventName) {
        return this._map.then((m) => Microsoft.Maps.Events.invoke(m, eventName, null));
    }
}
BingMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMapService.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    BingMapService.prototype._map;
    /** @type {?} */
    BingMapService.prototype._mapInstance;
    /** @type {?} */
    BingMapService.prototype._mapResolver;
    /** @type {?} */
    BingMapService.prototype._config;
    /** @type {?} */
    BingMapService.prototype._modules;
    /** @type {?} */
    BingMapService.prototype._loader;
    /** @type {?} */
    BingMapService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBWSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQWUxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0FBUTNFLE1BQU07Ozs7Ozs7O0lBaUVGLFlBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUE1QyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsVUFB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QixDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQSxPQUFPLENBQUMsSUFBWTtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzNELElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV0QsbUJBQW1CLENBQUksU0FBaUI7O1FBQzNDLE1BQU0sbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFxQixFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFxQixFQUFFLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtvQkFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQyxDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQSxlQUFlLENBQUMsU0FBaUI7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7O1lBdmpCdEYsVUFBVTs7OztZQXZDRixZQUFZO1lBSkEsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZlciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwQVBJTG9hZGVyIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcclxuaW1wb3J0IHsgQmluZ01hcEFQSUxvYWRlciwgQmluZ01hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgTWFya2VyVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlci10eXBlLWlkJztcclxuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IEJpbmdNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLW1hcmtlcic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgQmluZ0xheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1sYXllcic7XHJcbmltcG9ydCB7IEJpbmdDbHVzdGVyTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWNsdXN0ZXItbGF5ZXInO1xyXG5pbXBvcnQgeyBCaW5nSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWdvbic7XHJcbmltcG9ydCB7IEJpbmdQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1sYWJlbCc7XHJcbmltcG9ydCB7IE1peGluQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBCaW5nQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NhbnZhcy1vdmVybGF5JztcclxuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXNpemUnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lib3gnO1xyXG5cclxuaW1wb3J0IHsgQmluZ01hcEV2ZW50c0xvb2t1cCB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctZXZlbnRzLWxvb2t1cCc7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIE1hcFNlcnZpY2UgYWJzdHJhY3QgaW1wbGVtZW50aW5nIGEgQmluIE1hcCBWOCBwcm92aWRlclxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nTWFwU2VydmljZSBpbXBsZW1lbnRzIE1hcFNlcnZpY2Uge1xyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgRGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICBwcml2YXRlIF9tYXA6IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPjtcclxuICAgIHByaXZhdGUgX21hcEluc3RhbmNlOiBNaWNyb3NvZnQuTWFwcy5NYXA7XHJcbiAgICBwcml2YXRlIF9tYXBSZXNvbHZlcjogKHZhbHVlPzogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlczogTWFwPHN0cmluZywgT2JqZWN0PiA9IG5ldyBNYXA8c3RyaW5nLCBPYmplY3Q+KCk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgRGVmaW5pdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBhcnJheSBvZiBsb2FkZWQgQm9uZyBtb2R1bGVzLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTG9hZGVkTW9kdWxlcygpOiBNYXA8c3RyaW5nLCBPYmplY3Q+IHsgcmV0dXJuIHRoaXMuX21vZHVsZXM7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIEJpbmcgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1hcEluc3RhbmNlKCk6IE1pY3Jvc29mdC5NYXBzLk1hcCB7IHJldHVybiB0aGlzLl9tYXBJbnN0YW5jZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIFByb21pc2UgZm9yIGEgQmluZyBNYXAgY29udHJvbCBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBpbXBsZW1lbnRhdGlvbi4gVXNlIHRoaXMgaW5zdGVhZCBvZiB7QGxpbmsgTWFwSW5zdGFuY2V9IGlmIHlvdVxyXG4gICAgICogYXJlIG5vdCBzdXJlIGlmIGFuZCB3aGVuIHRoZSBpbnN0YW5jZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1hcFByb21pc2UoKTogUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5NYXA+IHsgcmV0dXJuIHRoaXMuX21hcDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFwcyBwaHlzaWNhbCBzaXplLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBNYXBTaXplKCk6IElTaXplIHtcclxuICAgICAgICBpZiAodGhpcy5NYXBJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzOiBJU2l6ZSA9IHsgd2lkdGg6IHRoaXMuTWFwSW5zdGFuY2UuZ2V0V2lkdGgoKSwgaGVpZ2h0OiB0aGlzLk1hcEluc3RhbmNlLmdldEhlaWdodCgpIH07XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBDb25zdHJ1Y3RvclxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdNYXBTZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIF9sb2FkZXIgTWFwQVBJTG9hZGVyIGluc3RhbmNlIGltcGxlbWVudGVkIGZvciBCaW5nIE1hcHMuIFRoaXMgaW5zdGFuY2Ugd2lsbCBnZW5lcmFsbHkgYmUgaW5qZWN0ZWQuXHJcbiAgICAgKiBAcGFyYW0gX3pvbmUgTmdab25lIG9iamVjdCB0byBlbmFibGUgem9uZSBhd2FyZSBwcm9taXNlcy4gVGhpcyB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBBUElMb2FkZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLk1hcD4oKHJlc29sdmU6ICgpID0+IHZvaWQpID0+IHsgdGhpcy5fbWFwUmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSAoPEJpbmdNYXBBUElMb2FkZXI+dGhpcy5fbG9hZGVyKS5Db25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcFNlcnZpY2UgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjYW52YXMgb3ZlcmxheSBsYXllciB0byBwZXJmb3JtIGN1c3RvbSBkcmF3aW5nIG92ZXIgdGhlIG1hcCB3aXRoIG91dFxyXG4gICAgICogc29tZSBvZiB0aGUgb3ZlcmhlYWQgYXNzb2NpYXRlZCB3aXRoIGdvaW5nIHRocm91Z2ggdGhlIE1hcCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIGRyYXdDYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbnZhcyBpcyByZWFkeSB0byBiZVxyXG4gICAgICogcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IG1hcCB2aWV3LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIENhbnZhc092ZXJsYXl9IG9iamVjdC5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKTogUHJvbWlzZTxDYW52YXNPdmVybGF5PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvdmVybGF5OiBCaW5nQ2FudmFzT3ZlcmxheSA9IG5ldyBCaW5nQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydChvdmVybGF5KTtcclxuICAgICAgICAgICAgcmV0dXJuIG92ZXJsYXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQmluZyBtYXAgY2x1c3RlciBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUNsdXN0ZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZUNsdXN0ZXJMYXllcihvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiBQcm9taXNlPExheWVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IG5ldyBQcm9taXNlPExheWVyPihyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZE1vZHVsZSgnTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlcmluZycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVDbHVzdGVyT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXllcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyID0gbmV3IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllcihuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4oKSwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsOiBCaW5nQ2x1c3RlckxheWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5sYXllcnMuaW5zZXJ0KGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBibCA9IG5ldyBCaW5nQ2x1c3RlckxheWVyKGxheWVyLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBibC5TZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYmwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5mb3JtYXRpb24gd2luZG93IGZvciBhIG1hcCBwb3NpdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBbb3B0aW9uc10gLSBJbmZvd2luZG93IG9wdGlvbnMuIFNlZSB7QGxpbmsgSUluZm9XaW5kb3dPcHRpb25zfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIEluZm9XaW5kb3d9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkluZm9ib3ggb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zPzogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTxJbmZvV2luZG93PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbG9jOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9zaXRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbG9jID0gbWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKG9wdGlvbnMucG9zaXRpb24ubGF0aXR1ZGUsIG9wdGlvbnMucG9zaXRpb24ubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpbmZvQm94OiBNaWNyb3NvZnQuTWFwcy5JbmZvYm94ID0gbmV3IE1pY3Jvc29mdC5NYXBzLkluZm9ib3gobG9jLCBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb0JveE9wdGlvbnMob3B0aW9ucykpO1xyXG4gICAgICAgICAgICBpbmZvQm94LnNldE1hcChtYXApO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpbmdJbmZvV2luZG93KGluZm9Cb3gpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUxheWVyT3B0aW9uc31cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuTGF5ZXIgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTGF5ZXIob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5MYXllcihvcHRpb25zLmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydChsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmluZ0xheWVyKGxheWVyLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXAgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWwgLSBIVE1MIGVsZW1lbnQgdG8gaG9zdCB0aGUgbWFwLlxyXG4gICAgICogQHBhcmFtIG1hcE9wdGlvbnMgLSBNYXAgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgbWFwIGhhcyBiZWVuIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVNYXAoZWw6IEhUTUxFbGVtZW50LCBtYXBPcHRpb25zOiBJTWFwT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIuTG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhcHBseSBtaXhpbnNcclxuICAgICAgICAgICAgTWl4aW5NYXBMYWJlbFdpdGhPdmVybGF5VmlldygpO1xyXG4gICAgICAgICAgICBNaXhpbkNhbnZhc092ZXJsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1hcCBzdGFydHVwLi4uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3Bvc2VNYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9hZE9wdGlvbnMobWFwT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmICghby5jcmVkZW50aWFscykge1xyXG4gICAgICAgICAgICAgICAgby5jcmVkZW50aWFscyA9IHRoaXMuX2NvbmZpZy5hcGlLZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbWFwID0gbmV3IE1pY3Jvc29mdC5NYXBzLk1hcChlbCwgbyk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbWFwO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBSZXNvbHZlcihtYXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIEJpbmcgbWFwIG1hcmtlciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtvcHRpb25zPTxJTWFya2VyT3B0aW9ucz57fV0gLSBPcHRpb25zIGZvciB0aGUgbWFya2VyLiBTZWUge0BsaW5rIElNYXJrZXJPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBNYXJrZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLlB1c2hQaW4gb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zID0gPElNYXJrZXJPcHRpb25zPnt9KTogUHJvbWlzZTxNYXJrZXI+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gKGljb246IHN0cmluZywgbWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApOiBCaW5nTWFya2VyID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpY29uICYmIGljb24gIT09ICcnKSB7IG8uaWNvbiA9IGljb247IH1cclxuICAgICAgICAgICAgY29uc3QgcHVzaHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5QdXNocGluKGxvYywgbyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogQmluZ01hcmtlciA9IG5ldyBCaW5nTWFya2VyKHB1c2hwaW4sIG1hcCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gbWFya2VyLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgbWFwLmVudGl0aWVzLnB1c2gocHVzaHBpbik7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmljb25JbmZvICYmIG9wdGlvbnMuaWNvbkluZm8ubWFya2VyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIob3B0aW9ucy5pY29uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzKSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIChwYXlsb2FkKHMsIG1hcCkpOyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBheWxvYWQoeC5pY29uLCBtYXApKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocGF5bG9hZChudWxsLCBtYXApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHBvbHlnb24gd2l0aGluIHRoZSBCaW5nIE1hcHMgVjggbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlnb24uIFNlZSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5Z29ufSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRocyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5Z29uT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgcG9seTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uKGxvY3MsIG8pO1xyXG4gICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwb2x5KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBuZXcgQmluZ1BvbHlnb24ocG9seSwgdGhpcywgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcC5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHAuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dMYWJlbCAhPSBudWxsKSB7IHAuU2hvd0xhYmVsID0gb3B0aW9ucy5zaG93TGFiZWw7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1heFpvb20gIT0gbnVsbCkgeyBwLkxhYmVsTWF4Wm9vbSA9IG9wdGlvbnMubGFiZWxNYXhab29tOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWluWm9vbSAhPSBudWxsKSB7IHAuTGFiZWxNaW5ab29tID0gb3B0aW9ucy5sYWJlbE1pblpvb207IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRpdGFibGUpIHsgcC5TZXRFZGl0YWJsZShvcHRpb25zLmVkaXRhYmxlKTsgfVxyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwb2x5bGluZSB3aXRoaW4gdGhlIEJpbmcgTWFwcyBWOCBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgcG9seWxpbmUuIFNlZSB7QGxpbmsgSVBvbHlsaW5lT3B0aW9uc30uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgUG9seWxpbmV9IG9iamVjdCAob3IgYW4gYXJyYXkgdGhlcmVvZiBmb3IgY29tcGxleCBwYXRocyksXHJcbiAgICAgKiB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIHBvbHlnb24uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lIHwgQXJyYXk8UG9seWxpbmU+PiB7XHJcbiAgICAgICAgbGV0IHBvbHlsaW5lOiBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhdGggJiYgb3B0aW9ucy5wYXRoLmxlbmd0aCA+IDAgJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRoWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUobG9jc1swXSwgbyk7XHJcbiAgICAgICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwb2x5bGluZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCBtYXAsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwbC5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xyXG4gICAgICAgICAgICAgICAgbG9jcy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKHAsIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5lbnRpdGllcy5wdXNoKHBvbHlsaW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCBtYXAsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcGwuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHBsLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChwbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaW5lcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyBhIGxheWVyIGZyb20gdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBMYXllciB0byBkZWxldGUuIFNlZSB7QGxpbmsgTGF5ZXJ9LiBUaGlzIG1ldGhvZCBleHBlY3RzIHRoZSBCaW5nIHNwZWNpZmljIExheWVyIG1vZGVsIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIERlbGV0ZUxheWVyKGxheWVyOiBMYXllcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgbWFwLmxheWVycy5yZW1vdmUobGF5ZXIuTmF0aXZlUHJpbWl0dmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGFvc2UgdGhlIG1hcCBhbmQgYXNzb2NpYXRlZCByZXNvdXJlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIERpc3Bvc2VNYXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcCA9PSBudWxsICYmIHRoaXMuX21hcEluc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbWFwSW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJbnN0YW5jZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGNlbnRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnb2UgbG9jYXRpb24gb2YgdGhlIGNlbnRlci4gU2VlIHtAbGluayBJTGF0TG9uZ30uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRDZW50ZXIoKTogUHJvbWlzZTxJTGF0TG9uZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2VudGVyID0gbWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gPElMYXRMb25nPntcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjZW50ZXIubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGNlbnRlci5sb25naXR1ZGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGJvdW5kaW5nIGJveFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnb2UgbG9jYXRpb24gb2YgdGhlIGJvdW5kaW5nIGJveC4gU2VlIHtAbGluayBJQm94fS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEJvdW5kcygpOiBQcm9taXNlPElCb3g+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IG1hcC5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxJQm94PntcclxuICAgICAgICAgICAgICAgIG1heExhdGl0dWRlOiBib3guZ2V0Tm9ydGgoKSxcclxuICAgICAgICAgICAgICAgIG1heExvbmdpdHVkZTogYm94LmNyb3NzZXNJbnRlcm5hdGlvbmFsRGF0ZUxpbmUoKSA/IGJveC5nZXRXZXN0KCkgOiBib3guZ2V0RWFzdCgpLFxyXG4gICAgICAgICAgICAgICAgbWluTGF0aXR1ZGU6IGJveC5nZXRTb3V0aCgpLFxyXG4gICAgICAgICAgICAgICAgbWluTG9uZ2l0dWRlOiBib3guY3Jvc3Nlc0ludGVybmF0aW9uYWxEYXRlTGluZSgpID8gYm94LmdldEVhc3QoKSA6IGJveC5nZXRXZXN0KCksXHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0aXR1ZGU6IGJveC5jZW50ZXIubGF0aXR1ZGUsIGxvbmdpdHVkZTogYm94LmNlbnRlci5sb25naXR1ZGUgfSxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBzaGFyZWQgb3IgcHJpdmF0ZSBpbnN0YW5jZSBvZiB0aGUgbWFwIGRyYXdpbmcgdG9vbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFt1c2VTaGFyZWRJbnN0YW5jZT10cnVlXSAtIFNldCB0byBmYWxzZSB0byBjcmVhdGUgYSBwcml2YXRlIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIHRoYXQgd2hlbiByZXNvbHZlZCBjb250YWluc3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGRyYXdpbmcgdG9vbHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldERyYXdpbmdUb29scyAodXNlU2hhcmVkSW5zdGFuY2U6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHM+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9hZE1vZHVsZUluc3RhbmNlKCdNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHMnLCB1c2VTaGFyZWRJbnN0YW5jZSkudGhlbigobzogTWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB6b29tIGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Wm9vbSgpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IG1hcC5nZXRab29tKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYSBtb2R1bGUgaW50byB0aGUgTWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtb2R1bGVOYW1lIC0gVGhlIG1vZHVsZSB0byBsb2FkLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gQ2FsbGJhY2sgdG8gY2FsbCBvbmNlIGxvYWRpbmcgaXMgY29tcGxldGUuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvYWRNb2R1bGUobW9kdWxlTmFtZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tb2R1bGVzLmhhcyhtb2R1bGVOYW1lKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMubG9hZE1vZHVsZShtb2R1bGVOYW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVzLnNldChtb2R1bGVOYW1lLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGEgbW9kdWxlIGludG8gdGhlIE1hcCBhbmQgZGVsaXZlcnMgYW5kIGluc3RhbmNlIG9mIHRoZSBtb2R1bGUgcGF5bG9hZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbW9kdWxlTmFtZSAtIFRoZSBtb2R1bGUgdG8gbG9hZC5cclxuICAgICAqIEBwYXJhbSB1c2VTaGFyZWRJbnN0YW5jZS0gVXNlIGEgc2hhcmVkIGluc3RhbmNlIGlmIHRydWUsIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBpZiBmYWxzZS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9hZE1vZHVsZUluc3RhbmNlKG1vZHVsZU5hbWU6IHN0cmluZywgdXNlU2hhcmVkSW5zdGFuY2U6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBjb25zdCBzOiBzdHJpbmcgPSBtb2R1bGVOYW1lLnN1YnN0cihtb2R1bGVOYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxKTtcclxuICAgICAgICBpZiAodGhpcy5fbW9kdWxlcy5oYXMobW9kdWxlTmFtZSkpIHtcclxuICAgICAgICAgICAgbGV0IG86IGFueSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghdXNlU2hhcmVkSW5zdGFuY2UpICB7XHJcbiAgICAgICAgICAgICAgICBvID0gbmV3ICg8YW55Pk1pY3Jvc29mdC5NYXBzKVtzXSh0aGlzLl9tYXBJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fbW9kdWxlcy5nZXQobW9kdWxlTmFtZSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMuX21vZHVsZXMuZ2V0KG1vZHVsZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbyA9IG5ldyAoPGFueT5NaWNyb3NvZnQuTWFwcylbc10odGhpcy5fbWFwSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxPYmplY3Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5sb2FkTW9kdWxlKG1vZHVsZU5hbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvID0gbmV3ICg8YW55Pk1pY3Jvc29mdC5NYXBzKVtzXSh0aGlzLl9tYXBJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZVNoYXJlZEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZXMuc2V0KG1vZHVsZU5hbWUsIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ0NvdWxkIG5vdCBsb2FkIG1vZHVsZSBvciBjcmVhdGUgaW5zdGFuY2UuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgY29udmVyc2lvbiBvZiBnZW8gY29vcmRpbmF0ZXMgdG8gcGl4ZWxzIG9uIHRoZSBtYXAgY29udHJvbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYW4ge0BsaW5rIElQb2ludH0gaW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgcGl4ZWxzLiBUaGlzIHByb21pc2UgcmVzb2x2ZXMgdG8gbnVsbFxyXG4gICAgICogaWYgdGhlIGdvZSBjb29yZGluYXRlcyBhcmUgbm90IGluIHRoZSB2aWV3IHBvcnQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvblRvUG9pbnQobG9jOiBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obG9jKTtcclxuICAgICAgICAgICAgY29uc3QgcDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPSA8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+bS50cnlMb2NhdGlvblRvUGl4ZWwobCwgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XHJcbiAgICAgICAgICAgIGlmIChwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHAueCwgeTogcC55IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFRoZSBnZW8gY29vcmRpbmF0ZXMgdG8gdHJhbnNsYXRlLlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvY2F0aW9uc1RvUG9pbnRzKGxvY3M6IEFycmF5PElMYXRMb25nPik6IFByb21pc2U8QXJyYXk8SVBvaW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGwgPSBsb2NzLm1hcChsb2MgPT4gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKGxvYykpO1xyXG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Qb2ludD4gPSA8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+Pm0udHJ5TG9jYXRpb25Ub1BpeGVsKGwsXHJcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5QaXhlbFJlZmVyZW5jZS5jb250cm9sKTtcclxuICAgICAgICAgICAgcmV0dXJuIHAgPyBwIDogbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENlbnRlcnMgdGhlIG1hcCBvbiBhIGdlbyBsb2NhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0TG5nIC0gR2VvQ29vcmRpbmF0ZXMgYXJvdW5kIHdoaWNoIHRvIGNlbnRlciB0aGUgbWFwLiBTZWUge0BsaW5rIElMYXRMb25nfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBjZW50ZXIgb3BlcmF0aW9ucyBoYXMgYmVlbiBjb21wbGV0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRDZW50ZXIobGF0TG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IG1hcC5zZXRWaWV3KHtcclxuICAgICAgICAgICAgY2VudGVyOiBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obGF0TG5nKVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdlbmVyaWMgbWFwIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE1hcE9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklNYXBPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG0uc2V0T3B0aW9ucyhvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpZXcgb3B0aW9ucyBvZiB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWaWV3T3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVZpZXdPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVZpZXdPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBtLnNldFZpZXcobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHpvb20gLSBab29tIGxldmVsIHRvIHNldC5cclxuICAgICAqIEByZXR1cm5zIC0gQSBQcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSB6b29tIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4gbWFwLnNldFZpZXcoe1xyXG4gICAgICAgICAgICB6b29tOiB6b29tXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBldmVudCBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChlLmcuICdjbGljaycpXHJcbiAgICAgKiBAcmV0dXJucyAtIEFuIG9ic2VydmFibGUgb2YgdHB5ZSBFIHRoYXQgZmlyZXMgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU3Vic2NyaWJlVG9NYXBFdmVudDxFPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8RT4ge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZVRyYW5zbGF0ZWQgPSBCaW5nTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RT4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobSwgZXZlbnROYW1lVHJhbnNsYXRlZCwgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlcnMgdGhlIGdpdmVuIGV2ZW50IG5hbWUgb24gdGhlIG1hcCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gRXZlbnQgdG8gdHJpZ2dlci5cclxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBUcmlnZ2VyTWFwRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG0pID0+IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5pbnZva2UobSwgZXZlbnROYW1lLCBudWxsKSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==