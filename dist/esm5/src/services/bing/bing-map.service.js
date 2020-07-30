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
var BingMapService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingMapService.
     * @param _loader MapAPILoader instance implemented for Bing Maps. This instance will generally be injected.
     * @param _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     * @memberof BingMapService
     */
    function BingMapService(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._modules = new Map();
        this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    Object.defineProperty(BingMapService.prototype, "LoadedModules", {
        get: /**
         * Gets an array of loaded Bong modules.
         *
         * \@readonly
         * \@memberof BingMapService
         * @return {?}
         */
        function () { return this._modules; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMapService.prototype, "MapInstance", {
        get: /**
         * Gets the Bing Map control instance underlying the implementation
         *
         * \@readonly
         * \@memberof BingMapService
         * @return {?}
         */
        function () { return this._mapInstance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMapService.prototype, "MapPromise", {
        get: /**
         * Gets a Promise for a Bing Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
         * are not sure if and when the instance will be created.
         * \@readonly
         * \@memberof BingMapService
         * @return {?}
         */
        function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMapService.prototype, "MapSize", {
        get: /**
         * Gets the maps physical size.
         *
         * \@readonly
         * @abstract
         * \@memberof BingMapService
         * @return {?}
         */
        function () {
            if (this.MapInstance) {
                /** @type {?} */
                var s = { width: this.MapInstance.getWidth(), height: this.MapInstance.getHeight() };
                return s;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof BingMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    BingMapService.prototype.CreateCanvasOverlay = /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof BingMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    function (drawCallback) {
        return this._map.then(function (map) {
            /** @type {?} */
            var overlay = new BingCanvasOverlay(drawCallback);
            map.layers.insert(overlay);
            return overlay;
        });
    };
    /**
     * Creates a Bing map cluster layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.ClusterLayer object.
     *
     */
    BingMapService.prototype.CreateClusterLayer = /**
     * Creates a Bing map cluster layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.ClusterLayer object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            /** @type {?} */
            var p = new Promise(function (resolve) {
                _this.LoadModule('Microsoft.Maps.Clustering', function () {
                    /** @type {?} */
                    var o = BingConversions.TranslateClusterOptions(options);
                    /** @type {?} */
                    var layer = new Microsoft.Maps.ClusterLayer(new Array(), o);
                    /** @type {?} */
                    var bl;
                    map.layers.insert(layer);
                    bl = new BingClusterLayer(layer, _this);
                    bl.SetOptions(options);
                    resolve(bl);
                });
            });
            return p;
        });
    };
    /**
     * Creates an information window for a map position
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    BingMapService.prototype.CreateInfoWindow = /**
     * Creates an information window for a map position
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    function (options) {
        return this._map.then(function (map) {
            /** @type {?} */
            var loc;
            if (options.position == null) {
                loc = map.getCenter();
            }
            else {
                loc = new Microsoft.Maps.Location(options.position.latitude, options.position.longitude);
            }
            /** @type {?} */
            var infoBox = new Microsoft.Maps.Infobox(loc, BingConversions.TranslateInfoBoxOptions(options));
            infoBox.setMap(map);
            return new BingInfoWindow(infoBox);
        });
    };
    /**
     * Creates a map layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    BingMapService.prototype.CreateLayer = /**
     * Creates a map layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            /** @type {?} */
            var layer = new Microsoft.Maps.Layer(options.id.toString());
            map.layers.insert(layer);
            return new BingLayer(layer, _this);
        });
    };
    /**
     * Creates a map instance
     *
     * \@memberof BingMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    BingMapService.prototype.CreateMap = /**
     * Creates a map instance
     *
     * \@memberof BingMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    function (el, mapOptions) {
        var _this = this;
        return this._loader.Load().then(function () {
            // apply mixins
            MixinMapLabelWithOverlayView();
            MixinCanvasOverlay();
            // map startup...
            if (_this._mapInstance != null) {
                _this.DisposeMap();
            }
            /** @type {?} */
            var o = BingConversions.TranslateLoadOptions(mapOptions);
            if (!o.credentials) {
                o.credentials = _this._config.apiKey;
            }
            /** @type {?} */
            var map = new Microsoft.Maps.Map(el, o);
            _this._mapInstance = map;
            _this._mapResolver(map);
        });
    };
    /**
     * Creates a Bing map marker within the map context
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    BingMapService.prototype.CreateMarker = /**
     * Creates a Bing map marker within the map context
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    function (options) {
        if (options === void 0) { options = /** @type {?} */ ({}); }
        /** @type {?} */
        var payload = function (icon, map) {
            /** @type {?} */
            var loc = BingConversions.TranslateLocation(options.position);
            /** @type {?} */
            var o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            /** @type {?} */
            var pushpin = new Microsoft.Maps.Pushpin(loc, o);
            /** @type {?} */
            var marker = new BingMarker(pushpin, map, null);
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
            }
            map.entities.push(pushpin);
            return marker;
        };
        return this._map.then(function (map) {
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                var s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, map));
                }
                else {
                    return s.then(function (x) {
                        return (payload(x.icon, map));
                    });
                }
            }
            else {
                return (payload(null, map));
            }
        });
    };
    /**
     * Creates a polygon within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    BingMapService.prototype.CreatePolygon = /**
     * Creates a polygon within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            /** @type {?} */
            var locs = BingConversions.TranslatePaths(options.paths);
            /** @type {?} */
            var o = BingConversions.TranslatePolygonOptions(options);
            /** @type {?} */
            var poly = new Microsoft.Maps.Polygon(locs, o);
            map.entities.push(poly);
            /** @type {?} */
            var p = new BingPolygon(poly, _this, null);
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return p.Metadata.set(k, v); });
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
    };
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
    BingMapService.prototype.CreatePolyline = /**
     * Creates a polyline within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polygon.
     *
     */
    function (options) {
        /** @type {?} */
        var polyline;
        return this._map.then(function (map) {
            /** @type {?} */
            var o = BingConversions.TranslatePolylineOptions(options);
            /** @type {?} */
            var locs = BingConversions.TranslatePaths(options.path);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                map.entities.push(polyline);
                /** @type {?} */
                var pl_1 = new BingPolyline(polyline, map, null);
                if (options.metadata) {
                    options.metadata.forEach(function (v, k) { return pl_1.Metadata.set(k, v); });
                }
                if (options.title && options.title !== '') {
                    pl_1.Title = options.title;
                }
                if (options.showTooltip != null) {
                    pl_1.ShowTooltip = options.showTooltip;
                }
                return pl_1;
            }
            else {
                /** @type {?} */
                var lines_1 = new Array();
                locs.forEach(function (p) {
                    polyline = new Microsoft.Maps.Polyline(p, o);
                    map.entities.push(polyline);
                    /** @type {?} */
                    var pl = new BingPolyline(polyline, map, null);
                    if (options.metadata) {
                        options.metadata.forEach(function (v, k) { return pl.Metadata.set(k, v); });
                    }
                    if (options.title && options.title !== '') {
                        pl.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        pl.ShowTooltip = options.showTooltip;
                    }
                    lines_1.push(pl);
                });
                return lines_1;
            }
        });
    };
    /**
     * Deletes a layer from the map.
     *
     * \@memberof BingMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Bing specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    BingMapService.prototype.DeleteLayer = /**
     * Deletes a layer from the map.
     *
     * \@memberof BingMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Bing specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    function (layer) {
        return this._map.then(function (map) {
            map.layers.remove(layer.NativePrimitve);
        });
    };
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof BingMapService
     * @return {?}
     */
    BingMapService.prototype.DisposeMap = /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof BingMapService
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance.dispose();
            this._mapInstance = null;
            this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
    };
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    BingMapService.prototype.GetCenter = /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    function () {
        return this._map.then(function (map) {
            /** @type {?} */
            var center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.latitude,
                longitude: center.longitude
            });
        });
    };
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the bounding box. See {\@link IBox}.
     *
     */
    BingMapService.prototype.GetBounds = /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the bounding box. See {\@link IBox}.
     *
     */
    function () {
        return this._map.then(function (map) {
            /** @type {?} */
            var box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorth(),
                maxLongitude: box.crossesInternationalDateLine() ? box.getWest() : box.getEast(),
                minLatitude: box.getSouth(),
                minLongitude: box.crossesInternationalDateLine() ? box.getEast() : box.getWest(),
                center: { latitude: box.center.latitude, longitude: box.center.longitude },
                padding: 0
            });
        });
    };
    /**
     * Gets a shared or private instance of the map drawing tools.
     *
     * \@memberof BingMapService
     * @param {?=} useSharedInstance
     * @return {?} - Promise that when resolved containst an instance of the drawing tools.
     */
    BingMapService.prototype.GetDrawingTools = /**
     * Gets a shared or private instance of the map drawing tools.
     *
     * \@memberof BingMapService
     * @param {?=} useSharedInstance
     * @return {?} - Promise that when resolved containst an instance of the drawing tools.
     */
    function (useSharedInstance) {
        var _this = this;
        if (useSharedInstance === void 0) { useSharedInstance = true; }
        return new Promise(function (resolve, reject) {
            _this.LoadModuleInstance('Microsoft.Maps.DrawingTools', useSharedInstance).then(function (o) {
                resolve(o);
            });
        });
    };
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    BingMapService.prototype.GetZoom = /**
     * Gets the current zoom level of the map.
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    function () {
        return this._map.then(function (map) { return map.getZoom(); });
    };
    /**
     * Loads a module into the Map.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?} callback - Callback to call once loading is complete.
     * @return {?}
     */
    BingMapService.prototype.LoadModule = /**
     * Loads a module into the Map.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?} callback - Callback to call once loading is complete.
     * @return {?}
     */
    function (moduleName, callback) {
        var _this = this;
        if (this._modules.has(moduleName)) {
            callback();
        }
        else {
            Microsoft.Maps.loadModule(moduleName, function () {
                _this._modules.set(moduleName, null);
                callback();
            });
        }
    };
    /**
     * Loads a module into the Map and delivers and instance of the module payload.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?=} useSharedInstance
     * @return {?}
     */
    BingMapService.prototype.LoadModuleInstance = /**
     * Loads a module into the Map and delivers and instance of the module payload.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?=} useSharedInstance
     * @return {?}
     */
    function (moduleName, useSharedInstance) {
        var _this = this;
        if (useSharedInstance === void 0) { useSharedInstance = true; }
        /** @type {?} */
        var s = moduleName.substr(moduleName.lastIndexOf('.') + 1);
        if (this._modules.has(moduleName)) {
            /** @type {?} */
            var o = null;
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
            return new Promise(function (resolve, reject) {
                try {
                    Microsoft.Maps.loadModule(moduleName, function () {
                        /** @type {?} */
                        var o = new (/** @type {?} */ (Microsoft.Maps))[s](_this._mapInstance);
                        if (useSharedInstance) {
                            _this._modules.set(moduleName, o);
                        }
                        else {
                            _this._modules.set(moduleName, null);
                        }
                        resolve(o);
                    });
                }
                catch (e) {
                    reject('Could not load module or create instance.');
                }
            });
        }
    };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    BingMapService.prototype.LocationToPoint = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    function (loc) {
        return this._map.then(function (m) {
            /** @type {?} */
            var l = BingConversions.TranslateLocation(loc);
            /** @type {?} */
            var p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            if (p != null) {
                return { x: p.x, y: p.y };
            }
            return null;
        });
    };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    BingMapService.prototype.LocationsToPoints = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    function (locs) {
        return this._map.then(function (m) {
            /** @type {?} */
            var l = locs.map(function (loc) { return BingConversions.TranslateLocation(loc); });
            /** @type {?} */
            var p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            return p ? p : new Array();
        });
    };
    /**
     * Centers the map on a geo location.
     *
     * \@memberof BingMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    BingMapService.prototype.SetCenter = /**
     * Centers the map on a geo location.
     *
     * \@memberof BingMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    function (latLng) {
        return this._map.then(function (map) { return map.setView({
            center: BingConversions.TranslateLocation(latLng)
        }); });
    };
    /**
     * Sets the generic map options.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    BingMapService.prototype.SetMapOptions = /**
     * Sets the generic map options.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            /** @type {?} */
            var o = BingConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    };
    /**
     * Sets the view options of the map.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    BingMapService.prototype.SetViewOptions = /**
     * Sets the view options of the map.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            /** @type {?} */
            var o = BingConversions.TranslateViewOptions(options);
            m.setView(o);
        });
    };
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof BingMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    BingMapService.prototype.SetZoom = /**
     * Sets the zoom level of the map.
     *
     * \@memberof BingMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    function (zoom) {
        return this._map.then(function (map) { return map.setView({
            zoom: zoom
        }); });
    };
    /**
     * Creates an event subscription
     *
     * \@memberof BingMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    BingMapService.prototype.SubscribeToMapEvent = /**
     * Creates an event subscription
     *
     * \@memberof BingMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    function (eventName) {
        var _this = this;
        /** @type {?} */
        var eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._map.then(function (m) {
                Microsoft.Maps.Events.addHandler(m, eventNameTranslated, function (e) {
                    _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof BingMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    BingMapService.prototype.TriggerMapEvent = /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof BingMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    function (eventName) {
        return this._map.then(function (m) { return Microsoft.Maps.Events.invoke(m, eventName, null); });
    };
    BingMapService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingMapService.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return BingMapService;
}());
export { BingMapService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBWSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQWUxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7OztJQThEdkUsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsd0JBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUFo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O2dCQXZqQnRGLFVBQVU7Ozs7Z0JBdkNGLFlBQVk7Z0JBSkEsTUFBTTs7eUJBQTNCOztTQTRDYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBBUElMb2FkZXIgfSBmcm9tICcuLi9tYXBhcGlsb2FkZXInO1xyXG5pbXBvcnQgeyBCaW5nTWFwQVBJTG9hZGVyLCBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnIH0gZnJvbSAnLi9iaW5nLW1hcC5hcGktbG9hZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuL2JpbmctY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZm8td2luZG93JztcclxuaW1wb3J0IHsgQmluZ01hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctbWFya2VyJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbGF5ZXInO1xyXG5pbXBvcnQgeyBCaW5nTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWxheWVyJztcclxuaW1wb3J0IHsgQmluZ0NsdXN0ZXJMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctY2x1c3Rlci1sYXllcic7XHJcbmltcG9ydCB7IEJpbmdJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1pbmZvLXdpbmRvdyc7XHJcbmltcG9ydCB7IEJpbmdQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1wb2x5Z29uJztcclxuaW1wb3J0IHsgQmluZ1BvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1wb2x5bGluZSc7XHJcbmltcG9ydCB7IE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWxhYmVsJztcclxuaW1wb3J0IHsgTWl4aW5DYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1jYW52YXMtb3ZlcmxheSc7XHJcbmltcG9ydCB7IEJpbmdDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1jYW52YXMtb3ZlcmxheSc7XHJcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXBPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFwLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElTaXplIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pc2l6ZSc7XHJcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWJveCc7XHJcblxyXG5pbXBvcnQgeyBCaW5nTWFwRXZlbnRzTG9va3VwIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1ldmVudHMtbG9va3VwJztcclxuXHJcbi8qKlxyXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgTWFwU2VydmljZSBhYnN0cmFjdCBpbXBsZW1lbnRpbmcgYSBCaW4gTWFwIFY4IHByb3ZpZGVyXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdNYXBTZXJ2aWNlIGltcGxlbWVudHMgTWFwU2VydmljZSB7XHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBEZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIHByaXZhdGUgX21hcDogUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5NYXA+O1xyXG4gICAgcHJpdmF0ZSBfbWFwSW5zdGFuY2U6IE1pY3Jvc29mdC5NYXBzLk1hcDtcclxuICAgIHByaXZhdGUgX21hcFJlc29sdmVyOiAodmFsdWU/OiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEJpbmdNYXBBUElMb2FkZXJDb25maWc7XHJcbiAgICBwcml2YXRlIF9tb2R1bGVzOiBNYXA8c3RyaW5nLCBPYmplY3Q+ID0gbmV3IE1hcDxzdHJpbmcsIE9iamVjdD4oKTtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBEZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGFycmF5IG9mIGxvYWRlZCBCb25nIG1vZHVsZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBMb2FkZWRNb2R1bGVzKCk6IE1hcDxzdHJpbmcsIE9iamVjdD4geyByZXR1cm4gdGhpcy5fbW9kdWxlczsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgQmluZyBNYXAgY29udHJvbCBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBpbXBsZW1lbnRhdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWFwSW5zdGFuY2UoKTogTWljcm9zb2Z0Lk1hcHMuTWFwIHsgcmV0dXJuIHRoaXMuX21hcEluc3RhbmNlOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgUHJvbWlzZSBmb3IgYSBCaW5nIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uLiBVc2UgdGhpcyBpbnN0ZWFkIG9mIHtAbGluayBNYXBJbnN0YW5jZX0gaWYgeW91XHJcbiAgICAgKiBhcmUgbm90IHN1cmUgaWYgYW5kIHdoZW4gdGhlIGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTWFwUHJvbWlzZSgpOiBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLk1hcD4geyByZXR1cm4gdGhpcy5fbWFwOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXBzIHBoeXNpY2FsIHNpemUuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE1hcFNpemUoKTogSVNpemUge1xyXG4gICAgICAgIGlmICh0aGlzLk1hcEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHM6IElTaXplID0geyB3aWR0aDogdGhpcy5NYXBJbnN0YW5jZS5nZXRXaWR0aCgpLCBoZWlnaHQ6IHRoaXMuTWFwSW5zdGFuY2UuZ2V0SGVpZ2h0KCkgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ01hcFNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gX2xvYWRlciBNYXBBUElMb2FkZXIgaW5zdGFuY2UgaW1wbGVtZW50ZWQgZm9yIEJpbmcgTWFwcy4gVGhpcyBpbnN0YW5jZSB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cclxuICAgICAqIEBwYXJhbSBfem9uZSBOZ1pvbmUgb2JqZWN0IHRvIGVuYWJsZSB6b25lIGF3YXJlIHByb21pc2VzLiBUaGlzIHdpbGwgZ2VuZXJhbGx5IGJlIGluamVjdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2FkZXI6IE1hcEFQSUxvYWRlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwID0gbmV3IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9ICg8QmluZ01hcEFQSUxvYWRlcj50aGlzLl9sb2FkZXIpLkNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kcyBhbmQgTWFwU2VydmljZSBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNhbnZhcyBvdmVybGF5IGxheWVyIHRvIHBlcmZvcm0gY3VzdG9tIGRyYXdpbmcgb3ZlciB0aGUgbWFwIHdpdGggb3V0XHJcbiAgICAgKiBzb21lIG9mIHRoZSBvdmVyaGVhZCBhc3NvY2lhdGVkIHdpdGggZ29pbmcgdGhyb3VnaCB0aGUgTWFwIG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gZHJhd0NhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FudmFzIGlzIHJlYWR5IHRvIGJlXHJcbiAgICAgKiByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbWFwIHZpZXcuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgQ2FudmFzT3ZlcmxheX0gb2JqZWN0LlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVDYW52YXNPdmVybGF5KGRyYXdDYWxsYmFjazogKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpID0+IHZvaWQpOiBQcm9taXNlPENhbnZhc092ZXJsYXk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXk6IEJpbmdDYW52YXNPdmVybGF5ID0gbmV3IEJpbmdDYW52YXNPdmVybGF5KGRyYXdDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIG1hcC5sYXllcnMuaW5zZXJ0KG92ZXJsYXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gb3ZlcmxheTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBCaW5nIG1hcCBjbHVzdGVyIGxheWVyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJQ2x1c3Rlck9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIExheWVyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlQ2x1c3RlckxheWVyKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gbmV3IFByb21pc2U8TGF5ZXI+KHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2FkTW9kdWxlKCdNaWNyb3NvZnQuTWFwcy5DbHVzdGVyaW5nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklDbHVzdGVyTGF5ZXJPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUNsdXN0ZXJPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxheWVyOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyKG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPigpLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmw6IEJpbmdDbHVzdGVyTGF5ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmxheWVycy5pbnNlcnQobGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsID0gbmV3IEJpbmdDbHVzdGVyTGF5ZXIobGF5ZXIsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsLlNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShibCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbmZvcm1hdGlvbiB3aW5kb3cgZm9yIGEgbWFwIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFtvcHRpb25zXSAtIEluZm93aW5kb3cgb3B0aW9ucy4gU2VlIHtAbGluayBJSW5mb1dpbmRvd09wdGlvbnN9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgSW5mb1dpbmRvd30gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVJbmZvV2luZG93KG9wdGlvbnM/OiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPEluZm9XaW5kb3c+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wb3NpdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsb2MgPSBtYXAuZ2V0Q2VudGVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2MgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24ob3B0aW9ucy5wb3NpdGlvbi5sYXRpdHVkZSwgb3B0aW9ucy5wb3NpdGlvbi5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm9Cb3g6IE1pY3Jvc29mdC5NYXBzLkluZm9ib3ggPSBuZXcgTWljcm9zb2Z0Lk1hcHMuSW5mb2JveChsb2MsIEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVJbmZvQm94T3B0aW9ucyhvcHRpb25zKSk7XHJcbiAgICAgICAgICAgIGluZm9Cb3guc2V0TWFwKG1hcCk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmluZ0luZm9XaW5kb3coaW5mb0JveCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFwIGxheWVyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJTGF5ZXJPcHRpb25zfVxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIExheWVyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5MYXllciBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVMYXllcihvcHRpb25zOiBJTGF5ZXJPcHRpb25zKTogUHJvbWlzZTxMYXllcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkxheWVyID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxheWVyKG9wdGlvbnMuaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIG1hcC5sYXllcnMuaW5zZXJ0KGxheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaW5nTGF5ZXIobGF5ZXIsIHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbCAtIEhUTUwgZWxlbWVudCB0byBob3N0IHRoZSBtYXAuXHJcbiAgICAgKiBAcGFyYW0gbWFwT3B0aW9ucyAtIE1hcCBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBtYXAgaGFzIGJlZW4gY3JlYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIENyZWF0ZU1hcChlbDogSFRNTEVsZW1lbnQsIG1hcE9wdGlvbnM6IElNYXBPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5Mb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFwcGx5IG1peGluc1xyXG4gICAgICAgICAgICBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3KCk7XHJcbiAgICAgICAgICAgIE1peGluQ2FudmFzT3ZlcmxheSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFwIHN0YXJ0dXAuLi5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcEluc3RhbmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcG9zZU1hcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklNYXBMb2FkT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2FkT3B0aW9ucyhtYXBPcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKCFvLmNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgICAgICAgICBvLmNyZWRlbnRpYWxzID0gdGhpcy5fY29uZmlnLmFwaUtleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTWFwKGVsLCBvKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSBtYXA7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFJlc29sdmVyKG1hcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQmluZyBtYXAgbWFya2VyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW29wdGlvbnM9PElNYXJrZXJPcHRpb25zPnt9XSAtIE9wdGlvbnMgZm9yIHRoZSBtYXJrZXIuIFNlZSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIE1hcmtlcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuUHVzaFBpbiBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXIob3B0aW9uczogSU1hcmtlck9wdGlvbnMgPSA8SU1hcmtlck9wdGlvbnM+e30pOiBQcm9taXNlPE1hcmtlcj4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAoaWNvbjogc3RyaW5nLCBtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCk6IEJpbmdNYXJrZXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGljb24gJiYgaWNvbiAhPT0gJycpIHsgby5pY29uID0gaWNvbjsgfVxyXG4gICAgICAgICAgICBjb25zdCBwdXNocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gbmV3IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4obG9jLCBvKTtcclxuICAgICAgICAgICAgY29uc3QgbWFya2VyOiBCaW5nTWFya2VyID0gbmV3IEJpbmdNYXJrZXIocHVzaHBpbiwgbWFwLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxyXG4gICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwdXNocGluKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcmtlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaWNvbkluZm8gJiYgb3B0aW9ucy5pY29uSW5mby5tYXJrZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gTWFya2VyLkNyZWF0ZU1hcmtlcihvcHRpb25zLmljb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHMpID09PSAnc3RyaW5nJykgeyByZXR1cm4gKHBheWxvYWQocywgbWFwKSk7IH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzLnRoZW4oeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocGF5bG9hZCh4Lmljb24sIG1hcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChwYXlsb2FkKG51bGwsIG1hcCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgcG9seWdvbiB3aXRoaW4gdGhlIEJpbmcgTWFwcyBWOCBtYXAgY29udGV4dFxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgcG9seWdvbi4gU2VlIHtAbGluayBJUG9seWdvbk9wdGlvbnN9LlxyXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIFBvbHlnb259IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5Z29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uKG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8UG9seWdvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGhzKTtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlnb25PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBwb2x5OiBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24obG9jcywgbyk7XHJcbiAgICAgICAgICAgIG1hcC5lbnRpdGllcy5wdXNoKHBvbHkpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcCA9IG5ldyBCaW5nUG9seWdvbihwb2x5LCB0aGlzLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0xhYmVsICE9IG51bGwpIHsgcC5TaG93TGFiZWwgPSBvcHRpb25zLnNob3dMYWJlbDsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHAuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWF4Wm9vbSAhPSBudWxsKSB7IHAuTGFiZWxNYXhab29tID0gb3B0aW9ucy5sYWJlbE1heFpvb207IH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNaW5ab29tICE9IG51bGwpIHsgcC5MYWJlbE1pblpvb20gPSBvcHRpb25zLmxhYmVsTWluWm9vbTsgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lZGl0YWJsZSkgeyBwLlNldEVkaXRhYmxlKG9wdGlvbnMuZWRpdGFibGUpOyB9XHJcbiAgICAgICAgICAgIHJldHVybiBwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHBvbHlsaW5lIHdpdGhpbiB0aGUgQmluZyBNYXBzIFY4IG1hcCBjb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5bGluZS4gU2VlIHtAbGluayBJUG9seWxpbmVPcHRpb25zfS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5bGluZX0gb2JqZWN0IChvciBhbiBhcnJheSB0aGVyZW9mIGZvciBjb21wbGV4IHBhdGhzKSxcclxuICAgICAqIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWdvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmUob3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmUgfCBBcnJheTxQb2x5bGluZT4+IHtcclxuICAgICAgICBsZXQgcG9seWxpbmU6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRoKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGF0aCAmJiBvcHRpb25zLnBhdGgubGVuZ3RoID4gMCAmJiAhQXJyYXkuaXNBcnJheShvcHRpb25zLnBhdGhbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShsb2NzWzBdLCBvKTtcclxuICAgICAgICAgICAgICAgIG1hcC5lbnRpdGllcy5wdXNoKHBvbHlsaW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwbCA9IG5ldyBCaW5nUG9seWxpbmUocG9seWxpbmUsIG1hcCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBsLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHBsLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwbC5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzOiBBcnJheTxQb2x5bGluZT4gPSBuZXcgQXJyYXk8UG9seWxpbmU+KCk7XHJcbiAgICAgICAgICAgICAgICBsb2NzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUocCwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLmVudGl0aWVzLnB1c2gocG9seWxpbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbCA9IG5ldyBCaW5nUG9seWxpbmUocG9seWxpbmUsIG1hcCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwbC5NZXRhZGF0YS5zZXQoaywgdikpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcGwuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwbC5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cclxuICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHBsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgbGF5ZXIgZnJvbSB0aGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXllciAtIExheWVyIHRvIGRlbGV0ZS4gU2VlIHtAbGluayBMYXllcn0uIFRoaXMgbWV0aG9kIGV4cGVjdHMgdGhlIEJpbmcgc3BlY2lmaWMgTGF5ZXIgbW9kZWwgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYXllciBoYXMgYmVlbiByZW1vdmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVsZXRlTGF5ZXIobGF5ZXI6IExheWVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAubGF5ZXJzLnJlbW92ZShsYXllci5OYXRpdmVQcmltaXR2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwYW9zZSB0aGUgbWFwIGFuZCBhc3NvY2lhdGVkIHJlc291cmVzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGlzcG9zZU1hcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwID09IG51bGwgJiYgdGhpcy5fbWFwSW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5NYXA+KChyZXNvbHZlOiAoKSA9PiB2b2lkKSA9PiB7IHRoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgY2VudGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdvZSBsb2NhdGlvbiBvZiB0aGUgY2VudGVyLiBTZWUge0BsaW5rIElMYXRMb25nfS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENlbnRlcigpOiBQcm9taXNlPElMYXRMb25nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjZW50ZXIgPSBtYXAuZ2V0Q2VudGVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8SUxhdExvbmc+e1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGNlbnRlci5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogY2VudGVyLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgYm91bmRpbmcgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdvZSBsb2NhdGlvbiBvZiB0aGUgYm91bmRpbmcgYm94LiBTZWUge0BsaW5rIElCb3h9LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0Qm91bmRzKCk6IFByb21pc2U8SUJveD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm94ID0gbWFwLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gPElCb3g+e1xyXG4gICAgICAgICAgICAgICAgbWF4TGF0aXR1ZGU6IGJveC5nZXROb3J0aCgpLFxyXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlOiBib3guY3Jvc3Nlc0ludGVybmF0aW9uYWxEYXRlTGluZSgpID8gYm94LmdldFdlc3QoKSA6IGJveC5nZXRFYXN0KCksXHJcbiAgICAgICAgICAgICAgICBtaW5MYXRpdHVkZTogYm94LmdldFNvdXRoKCksXHJcbiAgICAgICAgICAgICAgICBtaW5Mb25naXR1ZGU6IGJveC5jcm9zc2VzSW50ZXJuYXRpb25hbERhdGVMaW5lKCkgPyBib3guZ2V0RWFzdCgpIDogYm94LmdldFdlc3QoKSxcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogeyBsYXRpdHVkZTogYm94LmNlbnRlci5sYXRpdHVkZSwgbG9uZ2l0dWRlOiBib3guY2VudGVyLmxvbmdpdHVkZSB9LFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIHNoYXJlZCBvciBwcml2YXRlIGluc3RhbmNlIG9mIHRoZSBtYXAgZHJhd2luZyB0b29scy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW3VzZVNoYXJlZEluc3RhbmNlPXRydWVdIC0gU2V0IHRvIGZhbHNlIHRvIGNyZWF0ZSBhIHByaXZhdGUgaW5zdGFuY2UuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zdCBhbiBpbnN0YW5jZSBvZiB0aGUgZHJhd2luZyB0b29scy5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RHJhd2luZ1Rvb2xzICh1c2VTaGFyZWRJbnN0YW5jZTogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLkRyYXdpbmdUb29scz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Mb2FkTW9kdWxlSW5zdGFuY2UoJ01pY3Jvc29mdC5NYXBzLkRyYXdpbmdUb29scycsIHVzZVNoYXJlZEluc3RhbmNlKS50aGVuKChvOiBNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB6b29tIGxldmVsIG9mIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHpvb20gbGV2ZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRab29tKCk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4gbWFwLmdldFpvb20oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhIG1vZHVsZSBpbnRvIHRoZSBNYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1vZHVsZU5hbWUgLSBUaGUgbW9kdWxlIHRvIGxvYWQuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBDYWxsYmFjayB0byBjYWxsIG9uY2UgbG9hZGluZyBpcyBjb21wbGV0ZS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9hZE1vZHVsZShtb2R1bGVOYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vZHVsZXMuaGFzKG1vZHVsZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5sb2FkTW9kdWxlKG1vZHVsZU5hbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZXMuc2V0KG1vZHVsZU5hbWUsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYSBtb2R1bGUgaW50byB0aGUgTWFwIGFuZCBkZWxpdmVycyBhbmQgaW5zdGFuY2Ugb2YgdGhlIG1vZHVsZSBwYXlsb2FkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtb2R1bGVOYW1lIC0gVGhlIG1vZHVsZSB0byBsb2FkLlxyXG4gICAgICogQHBhcmFtIHVzZVNoYXJlZEluc3RhbmNlLSBVc2UgYSBzaGFyZWQgaW5zdGFuY2UgaWYgdHJ1ZSwgY3JlYXRlIGEgbmV3IGluc3RhbmNlIGlmIGZhbHNlLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2FkTW9kdWxlSW5zdGFuY2UobW9kdWxlTmFtZTogc3RyaW5nLCB1c2VTaGFyZWRJbnN0YW5jZTogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHM6IHN0cmluZyA9IG1vZHVsZU5hbWUuc3Vic3RyKG1vZHVsZU5hbWUubGFzdEluZGV4T2YoJy4nKSArIDEpO1xyXG4gICAgICAgIGlmICh0aGlzLl9tb2R1bGVzLmhhcyhtb2R1bGVOYW1lKSkge1xyXG4gICAgICAgICAgICBsZXQgbzogYW55ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKCF1c2VTaGFyZWRJbnN0YW5jZSkgIHtcclxuICAgICAgICAgICAgICAgIG8gPSBuZXcgKDxhbnk+TWljcm9zb2Z0Lk1hcHMpW3NdKHRoaXMuX21hcEluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9tb2R1bGVzLmdldChtb2R1bGVOYW1lKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5fbW9kdWxlcy5nZXQobW9kdWxlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvID0gbmV3ICg8YW55Pk1pY3Jvc29mdC5NYXBzKVtzXSh0aGlzLl9tYXBJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVzLnNldChtb2R1bGVOYW1lLCBvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPE9iamVjdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLmxvYWRNb2R1bGUobW9kdWxlTmFtZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG8gPSBuZXcgKDxhbnk+TWljcm9zb2Z0Lk1hcHMpW3NdKHRoaXMuX21hcEluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlU2hhcmVkSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVzLnNldChtb2R1bGVOYW1lLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgnQ291bGQgbm90IGxvYWQgbW9kdWxlIG9yIGNyZWF0ZSBpbnN0YW5jZS4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBjb252ZXJzaW9uIG9mIGdlbyBjb29yZGluYXRlcyB0byBwaXhlbHMgb24gdGhlIG1hcCBjb250cm9sLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2MgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIHRvIHRyYW5zbGF0ZS5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhbiB7QGxpbmsgSVBvaW50fSBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSBwaXhlbHMuIFRoaXMgcHJvbWlzZSByZXNvbHZlcyB0byBudWxsXHJcbiAgICAgKiBpZiB0aGUgZ29lIGNvb3JkaW5hdGVzIGFyZSBub3QgaW4gdGhlIHZpZXcgcG9ydC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvY2F0aW9uVG9Qb2ludChsb2M6IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBwOiBNaWNyb3NvZnQuTWFwcy5Qb2ludCA9IDxNaWNyb3NvZnQuTWFwcy5Qb2ludD5tLnRyeUxvY2F0aW9uVG9QaXhlbChsLCBNaWNyb3NvZnQuTWFwcy5QaXhlbFJlZmVyZW5jZS5jb250cm9sKTtcclxuICAgICAgICAgICAgaWYgKHAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogcC54LCB5OiBwLnkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgY29udmVyc2lvbiBvZiBnZW8gY29vcmRpbmF0ZXMgdG8gcGl4ZWxzIG9uIHRoZSBtYXAgY29udHJvbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYW4ge0BsaW5rIElQb2ludH0gaW50ZXJmYWNlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgcGl4ZWxzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9jYXRpb25zVG9Qb2ludHMobG9jczogQXJyYXk8SUxhdExvbmc+KTogUHJvbWlzZTxBcnJheTxJUG9pbnQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbCA9IGxvY3MubWFwKGxvYyA9PiBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obG9jKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlBvaW50PiA9IDxBcnJheTxNaWNyb3NvZnQuTWFwcy5Qb2ludD4+bS50cnlMb2NhdGlvblRvUGl4ZWwobCxcclxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xyXG4gICAgICAgICAgICByZXR1cm4gcCA/IHAgOiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2VudGVycyB0aGUgbWFwIG9uIGEgZ2VvIGxvY2F0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW9Db29yZGluYXRlcyBhcm91bmQgd2hpY2ggdG8gY2VudGVyIHRoZSBtYXAuIFNlZSB7QGxpbmsgSUxhdExvbmd9XHJcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGNlbnRlciBvcGVyYXRpb25zIGhhcyBiZWVuIGNvbXBsZXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldENlbnRlcihsYXRMbmc6IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4gbWFwLnNldFZpZXcoe1xyXG4gICAgICAgICAgICBjZW50ZXI6IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsYXRMbmcpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2VuZXJpYyBtYXAgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0TWFwT3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSU1hcE9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgbS5zZXRPcHRpb25zKG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlldyBvcHRpb25zIG9mIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFZpZXdPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JVmlld09wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlVmlld09wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG0uc2V0VmlldyhvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gem9vbSAtIFpvb20gbGV2ZWwgdG8gc2V0LlxyXG4gICAgICogQHJldHVybnMgLSBBIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIHpvb20gb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0Wm9vbSh6b29tOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiBtYXAuc2V0Vmlldyh7XHJcbiAgICAgICAgICAgIHpvb206IHpvb21cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGV2ZW50IHN1YnNjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgKGUuZy4gJ2NsaWNrJylcclxuICAgICAqIEByZXR1cm5zIC0gQW4gb2JzZXJ2YWJsZSBvZiB0cHllIEUgdGhhdCBmaXJlcyB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTdWJzY3JpYmVUb01hcEV2ZW50PEU+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxFPiB7XHJcbiAgICAgICAgY29uc3QgZXZlbnROYW1lVHJhbnNsYXRlZCA9IEJpbmdNYXBFdmVudHNMb29rdXBbZXZlbnROYW1lXTtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxFPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihtLCBldmVudE5hbWVUcmFuc2xhdGVkLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VycyB0aGUgZ2l2ZW4gZXZlbnQgbmFtZSBvbiB0aGUgbWFwIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBFdmVudCB0byB0cmlnZ2VyLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIFRyaWdnZXJNYXBFdmVudChldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobSkgPT4gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmludm9rZShtLCBldmVudE5hbWUsIG51bGwpKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19