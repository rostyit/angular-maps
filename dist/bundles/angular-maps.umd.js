(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('async'), require('@angular/core'), require('rxjs'), require('@angular/common'), require('bingmaps')) :
    typeof define === 'function' && define.amd ? define('angular-maps', ['exports', 'async', '@angular/core', 'rxjs', '@angular/common', 'bingmaps'], factory) :
    (factory((global['angular-maps'] = {}),null,global.ng.core,global.rxjs,global.ng.common));
}(this, (function (exports,async,core,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ InfoWindow = (function () {
        function InfoWindow() {
        }
        return InfoWindow;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var MarkerTypeId = {
        None: 0,
        FontMarker: 1,
        CanvasMarker: 2,
        DynamicCircleMarker: 3,
        RotatedImageMarker: 4,
        RoundedImageMarker: 5,
        ScaledImageMarker: 6,
        Custom: 7,
    };
    MarkerTypeId[MarkerTypeId.None] = 'None';
    MarkerTypeId[MarkerTypeId.FontMarker] = 'FontMarker';
    MarkerTypeId[MarkerTypeId.CanvasMarker] = 'CanvasMarker';
    MarkerTypeId[MarkerTypeId.DynamicCircleMarker] = 'DynamicCircleMarker';
    MarkerTypeId[MarkerTypeId.RotatedImageMarker] = 'RotatedImageMarker';
    MarkerTypeId[MarkerTypeId.RoundedImageMarker] = 'RoundedImageMarker';
    MarkerTypeId[MarkerTypeId.ScaledImageMarker] = 'ScaledImageMarker';
    MarkerTypeId[MarkerTypeId.Custom] = 'Custom';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This class defines the contract for a marker.
     *
     * @export
     * @abstract
     * @abstract
     */
    var Marker = (function () {
        function Marker() {
        }
        /**
         * Creates a marker based on the marker info. In turn calls a number of internal members to
         * create the actual marker.
         *
         * \@memberof Marker
         * @param {?} iconInfo - icon information. Depending on the marker type, various properties
         * need to be present. For performance, it is recommended to use an id for markers that are common to facilitate
         * reuse.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image.
         */
        Marker.CreateMarker = /**
         * Creates a marker based on the marker info. In turn calls a number of internal members to
         * create the actual marker.
         *
         * \@memberof Marker
         * @param {?} iconInfo - icon information. Depending on the marker type, various properties
         * need to be present. For performance, it is recommended to use an id for markers that are common to facilitate
         * reuse.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image.
         */
            function (iconInfo) {
                switch (iconInfo.markerType) {
                    case MarkerTypeId.CanvasMarker: return Marker.CreateCanvasMarker(iconInfo);
                    case MarkerTypeId.DynamicCircleMarker: return Marker.CreateDynamicCircleMarker(iconInfo);
                    case MarkerTypeId.FontMarker: return Marker.CreateFontBasedMarker(iconInfo);
                    case MarkerTypeId.RotatedImageMarker: return Marker.CreateRotatedImageMarker(iconInfo);
                    case MarkerTypeId.RoundedImageMarker: return Marker.CreateRoundedImageMarker(iconInfo);
                    case MarkerTypeId.ScaledImageMarker: return Marker.CreateScaledImageMarker(iconInfo);
                    case MarkerTypeId.Custom: throw Error('Custom Marker Creators are not currently supported.');
                }
                throw Error('Unsupported marker type: ' + iconInfo.markerType);
            };
        /**
         * Obtains a shared img element for a marker icon to prevent unecessary creation of
         * DOM items. This has sped up large scale makers on Bing Maps by about 70%
         * \@memberof Marker
         * @param {?} icon - The icon string (url, data url, svg) for which to obtain the image.
         * @return {?} - The obtained image element.
         */
        Marker.GetImageForMarker = /**
         * Obtains a shared img element for a marker icon to prevent unecessary creation of
         * DOM items. This has sped up large scale makers on Bing Maps by about 70%
         * \@memberof Marker
         * @param {?} icon - The icon string (url, data url, svg) for which to obtain the image.
         * @return {?} - The obtained image element.
         */
            function (icon) {
                if (icon == null || icon === '') {
                    return null;
                }
                /** @type {?} */
                var img = null;
                img = Marker.ImageElementCache.get(icon);
                if (img != null) {
                    return img;
                }
                if (typeof (document) !== 'undefined' && document != null) {
                    img = document.createElement('img');
                    img.src = icon;
                    Marker.ImageElementCache.set(icon, img);
                }
                return img;
            };
        /**
         * Creates a canvased based marker using the point collection contained in the iconInfo parameter.
         *
         * @protected
         * @param iconInfo - {@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @returns - String with the data url for the marker image.
         *
         * @memberof Marker
         */
        /**
         * Creates a canvased based marker using the point collection contained in the iconInfo parameter.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - String with the data url for the marker image.
         *
         */
        Marker.CreateCanvasMarker = /**
         * Creates a canvased based marker using the point collection contained in the iconInfo parameter.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - String with the data url for the marker image.
         *
         */
            function (iconInfo) {
                if (document == null) {
                    throw Error('Document context (window.document) is required for canvas markers.');
                }
                if (iconInfo == null || iconInfo.size == null || iconInfo.points == null) {
                    throw Error('IMarkerIconInfo.size, and IMarkerIConInfo.points are required for canvas markers.');
                }
                if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
                    /** @type {?} */
                    var mi = Marker.MarkerCache.get(iconInfo.id);
                    iconInfo.size = mi.markerSize;
                    return mi.markerIconString;
                }
                /** @type {?} */
                var c = document.createElement('canvas');
                /** @type {?} */
                var ctx = c.getContext('2d');
                c.width = iconInfo.size.width;
                c.height = iconInfo.size.height;
                if (iconInfo.rotation) {
                    // Offset the canvas such that we will rotate around the center of our arrow
                    ctx.translate(c.width * 0.5, c.height * 0.5);
                    // Rotate the canvas by the desired heading
                    ctx.rotate(iconInfo.rotation * Math.PI / 180);
                    // Return the canvas offset back to it's original position
                    ctx.translate(-c.width * 0.5, -c.height * 0.5);
                }
                ctx.fillStyle = iconInfo.color || 'red';
                // Draw a path in the shape of an arrow.
                ctx.beginPath();
                if (iconInfo.drawingOffset) {
                    ctx.moveTo(iconInfo.drawingOffset.x, iconInfo.drawingOffset.y);
                }
                iconInfo.points.forEach(function (p) { ctx.lineTo(p.x, p.y); });
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                /** @type {?} */
                var s = c.toDataURL();
                if (iconInfo.id != null) {
                    Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                }
                return s;
            };
        /**
         * Creates a circle marker image using information contained in the iconInfo parameter.
         *
         * @protected
         * @param iconInfo - {@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @returns - String with the data url for the marker image.
         *
         * @memberof Marker
         */
        /**
         * Creates a circle marker image using information contained in the iconInfo parameter.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - String with the data url for the marker image.
         *
         */
        Marker.CreateDynamicCircleMarker = /**
         * Creates a circle marker image using information contained in the iconInfo parameter.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - String with the data url for the marker image.
         *
         */
            function (iconInfo) {
                if (document == null) {
                    throw Error('Document context (window.document) is required for dynamic circle markers.');
                }
                if (iconInfo == null || iconInfo.size == null) {
                    throw Error('IMarkerIconInfo.size is required for dynamic circle markers.');
                }
                if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
                    /** @type {?} */
                    var mi = Marker.MarkerCache.get(iconInfo.id);
                    iconInfo.size = mi.markerSize;
                    return mi.markerIconString;
                }
                /** @type {?} */
                var strokeWidth = iconInfo.strokeWidth || 0;
                /** @type {?} */
                var svg = [
                    '<svg xmlns="http://www.w3.org/2000/svg" width="',
                    iconInfo.size.width.toString(),
                    '" height="',
                    iconInfo.size.width.toString(),
                    '"><circle cx="',
                    (iconInfo.size.width / 2).toString(),
                    '" cy="',
                    (iconInfo.size.width / 2).toString(),
                    '" r="',
                    ((iconInfo.size.width / 2) - strokeWidth).toString(),
                    '" stroke="',
                    iconInfo.color || 'red',
                    '" stroke-width="',
                    strokeWidth.toString(),
                    '" fill="',
                    iconInfo.color || 'red',
                    '"/></svg>'
                ];
                /** @type {?} */
                var s = svg.join('');
                if (iconInfo.id != null) {
                    Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                }
                return s;
            };
        /**
         * Creates a font based marker image (such as Font-Awesome), by using information supplied in the parameters (such as Font-Awesome).
         *
         * @protected
         * @param iconInfo - {@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @returns - String with the data url for the marker image.
         *
         * @memberof Marker
         */
        /**
         * Creates a font based marker image (such as Font-Awesome), by using information supplied in the parameters (such as Font-Awesome).
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - String with the data url for the marker image.
         *
         */
        Marker.CreateFontBasedMarker = /**
         * Creates a font based marker image (such as Font-Awesome), by using information supplied in the parameters (such as Font-Awesome).
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - String with the data url for the marker image.
         *
         */
            function (iconInfo) {
                if (document == null) {
                    throw Error('Document context (window.document) is required for font based markers');
                }
                if (iconInfo == null || iconInfo.fontName == null || iconInfo.fontSize == null) {
                    throw Error('IMarkerIconInfo.fontName, IMarkerIconInfo.fontSize and IMarkerIConInfo.text are required for font based markers.');
                }
                if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
                    /** @type {?} */
                    var mi = Marker.MarkerCache.get(iconInfo.id);
                    iconInfo.size = mi.markerSize;
                    return mi.markerIconString;
                }
                /** @type {?} */
                var c = document.createElement('canvas');
                /** @type {?} */
                var ctx = c.getContext('2d');
                /** @type {?} */
                var font = iconInfo.fontSize + 'px ' + iconInfo.fontName;
                ctx.font = font;
                /** @type {?} */
                var size = ctx.measureText(iconInfo.text);
                c.width = size.width;
                c.height = iconInfo.fontSize;
                if (iconInfo.rotation) {
                    // Offset the canvas such that we will rotate around the center of our arrow
                    ctx.translate(c.width * 0.5, c.height * 0.5);
                    // Rotate the canvas by the desired heading
                    ctx.rotate(iconInfo.rotation * Math.PI / 180);
                    // Return the canvas offset back to it's original position
                    ctx.translate(-c.width * 0.5, -c.height * 0.5);
                }
                // Reset font as it will be cleared by the resize.
                ctx.font = font;
                ctx.textBaseline = 'top';
                ctx.fillStyle = iconInfo.color || 'red';
                ctx.fillText(iconInfo.text, 0, 0);
                iconInfo.size = { width: c.width, height: c.height };
                /** @type {?} */
                var s = c.toDataURL();
                if (iconInfo.id != null) {
                    Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                }
                return s;
            };
        /**
         * Creates an image marker by applying a roation to a supplied image.
         *
         * @protected
         * @param iconInfo - {@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @returns - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         * @memberof Marker
         */
        /**
         * Creates an image marker by applying a roation to a supplied image.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         */
        Marker.CreateRotatedImageMarker = /**
         * Creates an image marker by applying a roation to a supplied image.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         */
            function (iconInfo) {
                if (document == null) {
                    throw Error('Document context (window.document) is required for rotated image markers');
                }
                if (iconInfo == null || iconInfo.rotation == null || iconInfo.url == null) {
                    throw Error('IMarkerIconInfo.rotation, IMarkerIconInfo.url are required for rotated image markers.');
                }
                if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
                    /** @type {?} */
                    var mi = Marker.MarkerCache.get(iconInfo.id);
                    iconInfo.size = mi.markerSize;
                    return mi.markerIconString;
                }
                /** @type {?} */
                var image = new Image();
                /** @type {?} */
                var promise = new Promise(function (resolve, reject) {
                    // Allow cross domain image editting.
                    image.crossOrigin = 'anonymous';
                    image.src = iconInfo.url;
                    if (iconInfo.size) {
                        image.width = iconInfo.size.width;
                        image.height = iconInfo.size.height;
                    }
                    image.onload = function () {
                        /** @type {?} */
                        var c = document.createElement('canvas');
                        /** @type {?} */
                        var ctx = c.getContext('2d');
                        /** @type {?} */
                        var rads = iconInfo.rotation * Math.PI / 180;
                        // Calculate rotated image size.
                        c.width = Math.ceil(Math.abs(image.width * Math.cos(rads)) + Math.abs(image.height * Math.sin(rads)));
                        c.height = Math.ceil(Math.abs(image.width * Math.sin(rads)) + Math.abs(image.height * Math.cos(rads)));
                        // Move to the center of the canvas.
                        ctx.translate(c.width / 2, c.height / 2);
                        // Rotate the canvas to the specified angle in degrees.
                        ctx.rotate(rads);
                        // Draw the image, since the context is rotated, the image will be rotated also.
                        ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
                        iconInfo.size = { width: c.width, height: c.height };
                        /** @type {?} */
                        var s = c.toDataURL();
                        if (iconInfo.id != null) {
                            Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                        }
                        resolve({ icon: s, iconInfo: iconInfo });
                    };
                });
                return promise;
            };
        /**
         * Creates a rounded image marker by applying a circle mask to a supplied image.
         *
         * @protected
         * @param iconInfo - {@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @param iconInfo - Callback invoked once marker generation is complete. The callback
         * parameters are the data uri and the IMarkerIconInfo.
         * @returns - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         * @memberof Marker
         */
        /**
         * Creates a rounded image marker by applying a circle mask to a supplied image.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         */
        Marker.CreateRoundedImageMarker = /**
         * Creates a rounded image marker by applying a circle mask to a supplied image.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         */
            function (iconInfo) {
                if (document == null) {
                    throw Error('Document context (window.document) is required for rounded image markers');
                }
                if (iconInfo == null || iconInfo.size == null || iconInfo.url == null) {
                    throw Error('IMarkerIconInfo.size, IMarkerIconInfo.url are required for rounded image markers.');
                }
                if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
                    /** @type {?} */
                    var mi = Marker.MarkerCache.get(iconInfo.id);
                    iconInfo.size = mi.markerSize;
                    return mi.markerIconString;
                }
                /** @type {?} */
                var promise = new Promise(function (resolve, reject) {
                    /** @type {?} */
                    var radius = iconInfo.size.width / 2;
                    /** @type {?} */
                    var image = new Image();
                    /** @type {?} */
                    var offset = iconInfo.drawingOffset || { x: 0, y: 0 };
                    // Allow cross domain image editting.
                    image.crossOrigin = 'anonymous';
                    image.src = iconInfo.url;
                    image.onload = function () {
                        /** @type {?} */
                        var c = document.createElement('canvas');
                        /** @type {?} */
                        var ctx = c.getContext('2d');
                        c.width = iconInfo.size.width;
                        c.height = iconInfo.size.width;
                        // Draw a circle which can be used to clip the image, then draw the image.
                        ctx.beginPath();
                        ctx.arc(radius, radius, radius, 0, 2 * Math.PI, false);
                        ctx.fill();
                        ctx.clip();
                        ctx.drawImage(image, offset.x, offset.y, iconInfo.size.width, iconInfo.size.width);
                        iconInfo.size = { width: c.width, height: c.height };
                        /** @type {?} */
                        var s = c.toDataURL();
                        if (iconInfo.id != null) {
                            Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                        }
                        resolve({ icon: s, iconInfo: iconInfo });
                    };
                });
                return promise;
            };
        /**
         * Creates a scaled image marker by scaling a supplied image by a factor using a canvas.
         *
         * @protected
         * @param iconInfo - {@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @param iconInfo - Callback invoked once marker generation is complete. The callback
         * parameters are the data uri and the IMarkerIconInfo.
         * @returns - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         * @memberof Marker
         */
        /**
         * Creates a scaled image marker by scaling a supplied image by a factor using a canvas.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         */
        Marker.CreateScaledImageMarker = /**
         * Creates a scaled image marker by scaling a supplied image by a factor using a canvas.
         *
         * @protected
         * \@memberof Marker
         * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
         * @return {?} - a string or a promise for a string containing
         * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
         *
         */
            function (iconInfo) {
                if (document == null) {
                    throw Error('Document context (window.document) is required for scaled image markers');
                }
                if (iconInfo == null || iconInfo.scale == null || iconInfo.url == null) {
                    throw Error('IMarkerIconInfo.scale, IMarkerIconInfo.url are required for scaled image markers.');
                }
                if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
                    /** @type {?} */
                    var mi = Marker.MarkerCache.get(iconInfo.id);
                    iconInfo.size = mi.markerSize;
                    return mi.markerIconString;
                }
                /** @type {?} */
                var promise = new Promise(function (resolve, reject) {
                    /** @type {?} */
                    var image = new Image();
                    // Allow cross domain image editting.
                    image.crossOrigin = 'anonymous';
                    image.src = iconInfo.url;
                    image.onload = function () {
                        /** @type {?} */
                        var c = document.createElement('canvas');
                        /** @type {?} */
                        var ctx = c.getContext('2d');
                        c.width = image.width * iconInfo.scale;
                        c.height = image.height * iconInfo.scale;
                        // Draw a circle which can be used to clip the image, then draw the image.
                        ctx.drawImage(image, 0, 0, c.width, c.height);
                        iconInfo.size = { width: c.width, height: c.height };
                        /** @type {?} */
                        var s = c.toDataURL();
                        if (iconInfo.id != null) {
                            Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                        }
                        resolve({ icon: s, iconInfo: iconInfo });
                    };
                });
                return promise;
            };
        /**
         * Caches concrete img elements for marker icons to accelerate patining.
         *
         * \@memberof Marker
         */
        Marker.ImageElementCache = new Map();
        /**
         * Used to cache generated markers for performance and reusability.
         *
         * \@memberof Marker
         */
        Marker.MarkerCache = new Map();
        return Marker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var MapTypeId = {
        /** The aerial map type which uses top-down satellite & airplane imagery. */
        aerial: 0,
        /** A darker version of the road maps. */
        canvasDark: 1,
        /** A lighter version of the road maps which also has some of the details such as hill shading disabled. */
        canvasLight: 2,
        /** A grayscale version of the road maps. */
        grayscale: 3,
        /** The aerial map type including lables */
        hybrid: 4,
        /** Displays a blank canvas that uses the mercator map project. It basically removed the base maps layer. */
        mercator: 5,
        /** Ordnance survey map type (en-gb only). */
        ordnanceSurvey: 6,
        /** Road map type. */
        road: 7,
        /** Provides streetside panoramas from the street level. */
        streetside: 8,
    };
    MapTypeId[MapTypeId.aerial] = 'aerial';
    MapTypeId[MapTypeId.canvasDark] = 'canvasDark';
    MapTypeId[MapTypeId.canvasLight] = 'canvasLight';
    MapTypeId[MapTypeId.grayscale] = 'grayscale';
    MapTypeId[MapTypeId.hybrid] = 'hybrid';
    MapTypeId[MapTypeId.mercator] = 'mercator';
    MapTypeId[MapTypeId.ordnanceSurvey] = 'ordnanceSurvey';
    MapTypeId[MapTypeId.road] = 'road';
    MapTypeId[MapTypeId.streetside] = 'streetside';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
     * to provide concrete layer functionality for the map.
     *
     * @export
     * @abstract
     * @abstract
     */
    var /**
     * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
     * to provide concrete layer functionality for the map.
     *
     * @export
     * @abstract
     * @abstract
     */ Layer = (function () {
        function Layer() {
        }
        return Layer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract class defining the contract for a polygon in the architecture specific implementation.
     *
     * @export
     * @abstract
     * @abstract
     */
    var /**
     * Abstract class defining the contract for a polygon in the architecture specific implementation.
     *
     * @export
     * @abstract
     * @abstract
     */ Polygon = (function () {
        function Polygon() {
        }
        Object.defineProperty(Polygon.prototype, "Center", {
            get: /**
             * Gets the polygon's center.
             * \@readonly
             * \@memberof Polygon
             * @return {?}
             */ function () {
                if (this._center == null) {
                    this._center = this.GetBoundingCenter();
                }
                return this._center;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Polygon.prototype, "Centroid", {
            get: /**
             * Gets the polygon's centroid.
             * \@readonly
             * \@memberof Polygon
             * @return {?}
             */ function () {
                if (this._centroid == null) {
                    this._centroid = this.GetPolygonCentroid();
                }
                return this._centroid;
            },
            enumerable: true,
            configurable: true
        });
        ///
        /// Protected methods
        ///
        /**
         * Gets the center of the polygons' bounding box.
         *
         * @returns - ILatLong object containing the center of the bounding box.
         * @memberof Polygon
         * @method
         * @protected
         */
        /**
         * Gets the center of the polygons' bounding box.
         *
         * \@memberof Polygon
         * \@method
         * @protected
         * @return {?} - ILatLong object containing the center of the bounding box.
         */
        Polygon.prototype.GetBoundingCenter = /**
         * Gets the center of the polygons' bounding box.
         *
         * \@memberof Polygon
         * \@method
         * @protected
         * @return {?} - ILatLong object containing the center of the bounding box.
         */
            function () {
                /** @type {?} */
                var c = { latitude: 0, longitude: 0 };
                /** @type {?} */
                var x1 = 90;
                /** @type {?} */
                var x2 = -90;
                /** @type {?} */
                var y1 = 180;
                /** @type {?} */
                var y2 = -180;
                /** @type {?} */
                var path = this.GetPaths();
                if (path) {
                    path.forEach(function (inner) {
                        return inner.forEach(function (p) {
                            if (p.latitude < x1) {
                                x1 = p.latitude;
                            }
                            if (p.latitude > x2) {
                                x2 = p.latitude;
                            }
                            if (p.longitude < y1) {
                                y1 = p.longitude;
                            }
                            if (p.longitude > y2) {
                                y2 = p.longitude;
                            }
                        });
                    });
                    c.latitude = x1 + (x2 - x1) / 2;
                    c.longitude = y1 + (y2 - y1) / 2;
                }
                else {
                    c = null;
                }
                return c;
            };
        /**
         * Get the centroid of the polygon based on the polygon path.
         *
         * @returns - The centroid coordinates of the polygon.
         * @memberof Polygon
         * @method
         * @protected
         */
        /**
         * Get the centroid of the polygon based on the polygon path.
         *
         * \@memberof Polygon
         * \@method
         * @protected
         * @return {?} - The centroid coordinates of the polygon.
         */
        Polygon.prototype.GetPolygonCentroid = /**
         * Get the centroid of the polygon based on the polygon path.
         *
         * \@memberof Polygon
         * \@method
         * @protected
         * @return {?} - The centroid coordinates of the polygon.
         */
            function () {
                /** @type {?} */
                var c = { latitude: 0, longitude: 0 };
                /** @type {?} */
                var path = this.GetPaths();
                /** @type {?} */
                var off = path[0][0];
                if (off != null) {
                    /** @type {?} */
                    var twicearea = 0;
                    /** @type {?} */
                    var x = 0;
                    /** @type {?} */
                    var y = 0;
                    /** @type {?} */
                    var p1 = void 0;
                    /** @type {?} */
                    var p2 = void 0;
                    /** @type {?} */
                    var f = void 0;
                    for (var k = 0; k < path.length; k++) {
                        for (var i = 0, j = path[k].length - 1; i < path[k].length; j = i++) {
                            p1 = path[k][i];
                            p2 = path[k][j];
                            f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                                (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                            twicearea += f;
                            x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                            y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
                        }
                    }
                    if (twicearea !== 0) {
                        f = twicearea * 3;
                        c.latitude = x / f + off.latitude;
                        c.longitude = y / f + off.longitude;
                    }
                    else {
                        c.latitude = off.latitude;
                        c.longitude = off.longitude;
                    }
                }
                else {
                    c = null;
                }
                return c;
            };
        return Polygon;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract class defining the contract for a polyline in the architecture specific implementation.
     *
     * @export
     * @abstract
     * @abstract
     */
    var /**
     * Abstract class defining the contract for a polyline in the architecture specific implementation.
     *
     * @export
     * @abstract
     * @abstract
     */ Polyline = (function () {
        function Polyline() {
        }
        Object.defineProperty(Polyline.prototype, "Center", {
            get: /**
             * Gets the polyline's center.
             * \@readonly
             * \@memberof Polyline
             * @return {?}
             */ function () {
                if (this._center == null) {
                    this._center = this.GetBoundingCenter();
                }
                return this._center;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Polyline.prototype, "Centroid", {
            get: /**
             * Gets the polyline's centroid.
             * \@readonly
             * \@memberof Polyline
             * @return {?}
             */ function () {
                if (this._centroid == null) {
                    this._centroid = this.GetPolylineCentroid();
                }
                return this._centroid;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Get the centroid of the polyline based on the a path.
         *
         * \@memberof Polyline
         * \@method
         * @param {?} path - the path for which to generate the centroid
         * @return {?} - The centroid coordinates of the polyline.
         */
        Polyline.GetPolylineCentroid = /**
         * Get the centroid of the polyline based on the a path.
         *
         * \@memberof Polyline
         * \@method
         * @param {?} path - the path for which to generate the centroid
         * @return {?} - The centroid coordinates of the polyline.
         */
            function (path) {
                /** @type {?} */
                var c = { latitude: 0, longitude: 0 };
                /** @type {?} */
                var off = path[0];
                if (off != null) {
                    /** @type {?} */
                    var twicearea = 0;
                    /** @type {?} */
                    var x = 0;
                    /** @type {?} */
                    var y = 0;
                    /** @type {?} */
                    var p1 = void 0;
                    /** @type {?} */
                    var p2 = void 0;
                    /** @type {?} */
                    var f = void 0;
                    for (var i = 0, j = path.length - 1; i < path.length; j = i++) {
                        p1 = path[i];
                        p2 = path[j];
                        f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                            (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                        twicearea += f;
                        x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                        y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
                    }
                    if (twicearea !== 0) {
                        f = twicearea * 3;
                        c.latitude = x / f + off.latitude;
                        c.longitude = y / f + off.longitude;
                    }
                    else {
                        c.latitude = off.latitude;
                        c.longitude = off.longitude;
                    }
                }
                else {
                    c = null;
                }
                return c;
            };
        ///
        /// Protected methods
        ///
        /**
         * Gets the center of the polyline' bounding box.
         *
         * @returns - {@link ILatLong} object containing the center of the bounding box.
         * @memberof Polyline
         * @method
         * @protected
         */
        /**
         * Gets the center of the polyline' bounding box.
         *
         * \@memberof Polyline
         * \@method
         * @protected
         * @return {?} - {\@link ILatLong} object containing the center of the bounding box.
         */
        Polyline.prototype.GetBoundingCenter = /**
         * Gets the center of the polyline' bounding box.
         *
         * \@memberof Polyline
         * \@method
         * @protected
         * @return {?} - {\@link ILatLong} object containing the center of the bounding box.
         */
            function () {
                /** @type {?} */
                var c = { latitude: 0, longitude: 0 };
                /** @type {?} */
                var x1 = 90;
                /** @type {?} */
                var x2 = -90;
                /** @type {?} */
                var y1 = 180;
                /** @type {?} */
                var y2 = -180;
                /** @type {?} */
                var path = this.GetPath();
                if (path) {
                    path.forEach(function (p) {
                        if (p.latitude < x1) {
                            x1 = p.latitude;
                        }
                        if (p.latitude > x2) {
                            x2 = p.latitude;
                        }
                        if (p.longitude < y1) {
                            y1 = p.longitude;
                        }
                        if (p.longitude > y2) {
                            y2 = p.longitude;
                        }
                    });
                    c.latitude = x1 + (x2 - x1) / 2;
                    c.longitude = y1 + (y2 - y1) / 2;
                }
                else {
                    c = null;
                }
                return c;
            };
        /**
         * Get the centroid of the polyline based on the polyline path.
         *
         * @returns - The centroid coordinates of the polyline.
         * @memberof Polyline
         * @method
         * @protected
         */
        /**
         * Get the centroid of the polyline based on the polyline path.
         *
         * \@memberof Polyline
         * \@method
         * @protected
         * @return {?} - The centroid coordinates of the polyline.
         */
        Polyline.prototype.GetPolylineCentroid = /**
         * Get the centroid of the polyline based on the polyline path.
         *
         * \@memberof Polyline
         * \@method
         * @protected
         * @return {?} - The centroid coordinates of the polyline.
         */
            function () {
                /** @type {?} */
                var path = this.GetPath();
                /** @type {?} */
                var c = Polyline.GetPolylineCentroid(path);
                return c;
            };
        return Polyline;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ SpiderClusterMarker = (function (_super) {
        __extends(SpiderClusterMarker, _super);
        function SpiderClusterMarker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SpiderClusterMarker;
    }(Marker));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ClusterPlacementMode = {
        None: 0,
        MeanValue: 1,
        FirstPin: 2,
    };
    ClusterPlacementMode[ClusterPlacementMode.None] = 'None';
    ClusterPlacementMode[ClusterPlacementMode.MeanValue] = 'MeanValue';
    ClusterPlacementMode[ClusterPlacementMode.FirstPin] = 'FirstPin';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ClusterClickAction = {
        None: 0,
        ZoomIntoCluster: 1,
        Spider: 2,
    };
    ClusterClickAction[ClusterClickAction.None] = 'None';
    ClusterClickAction[ClusterClickAction.ZoomIntoCluster] = 'ZoomIntoCluster';
    ClusterClickAction[ClusterClickAction.Spider] = 'Spider';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var id = 0;
    /**
     * Abstract base implementing a canvas overlay to be placed on the map.
     *
     * @export
     * @abstract
     * @abstract
     */
    var /**
     * Abstract base implementing a canvas overlay to be placed on the map.
     *
     * @export
     * @abstract
     * @abstract
     */ CanvasOverlay = (function () {
        /**
         * Creates a new instance of the CanvasOverlay class.
         */
        function CanvasOverlay(drawCallback) {
            var _this = this;
            this._canvasReady = new Promise(function (resolve, reject) { _this._readyResolver = resolve; });
            this._drawCallback = drawCallback;
            id++;
        }
        Object.defineProperty(CanvasOverlay.prototype, "CanvasReady", {
            get: /**
             * Returns a promise that gets resolved when the canvas overlay is ready for interaction.
             * @return {?}
             */ function () { return this._canvasReady; },
            enumerable: true,
            configurable: true
        });
        /**
         * Deletes the canvas overlay.
         * @return {?}
         */
        CanvasOverlay.prototype.Delete = /**
         * Deletes the canvas overlay.
         * @return {?}
         */
            function () {
                this.SetMap(null);
            };
        /**
         * CanvasOverlay added to map, load canvas.
         * @return {?}
         */
        CanvasOverlay.prototype.OnAdd = /**
         * CanvasOverlay added to map, load canvas.
         * @return {?}
         */
            function () {
                this._canvas = document.createElement('canvas');
                this._canvas.style.position = 'absolute';
                this._canvas.style.left = '0px';
                this._canvas.style.top = '0px';
                this._canvas.id = "xMapOverlay" + id;
                // Add the canvas to the overlay.
                this.SetCanvasElement(this._canvas);
            };
        /**
         * When the CanvasLayer is removed from the map, release resources.
         * \@memberof CanvasOverlay
         * \@method
         * @return {?}
         */
        CanvasOverlay.prototype.OnRemove = /**
         * When the CanvasLayer is removed from the map, release resources.
         * \@memberof CanvasOverlay
         * \@method
         * @return {?}
         */
            function () {
                this.SetCanvasElement(null);
                this.RemoveEventHandlers();
                this._canvas = null;
            };
        /**
         * Redraws the canvas for the current map view.
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} clear - True to clear the canvas before drawing.
         * @return {?}
         */
        CanvasOverlay.prototype.Redraw = /**
         * Redraws the canvas for the current map view.
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} clear - True to clear the canvas before drawing.
         * @return {?}
         */
            function (clear) {
                if (this._canvas == null) {
                    return;
                }
                // Clear canvas by updating dimensions. This also ensures canvas stays the same size as the map.
                if (clear) {
                    this.Resize();
                }
                // Call the drawing callback function if specified.
                if (this._drawCallback) {
                    this._drawCallback(this._canvas);
                }
            };
        /**
         * Simple function for updating the CSS position and dimensions of the canvas.
         * @param x The horizontal offset position of the canvas.
         * @param y The vertical offset position of the canvas.
         * @param w The width of the canvas.
         * @param h The height of the canvas.
         * @memberof CanvasOverlay
         * @method
         * @protected
         */
        /**
         * Simple function for updating the CSS position and dimensions of the canvas.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @param {?} x The horizontal offset position of the canvas.
         * @param {?} y The vertical offset position of the canvas.
         * @param {?} w The width of the canvas.
         * @param {?} h The height of the canvas.
         * @return {?}
         */
        CanvasOverlay.prototype.UpdatePosition = /**
         * Simple function for updating the CSS position and dimensions of the canvas.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @param {?} x The horizontal offset position of the canvas.
         * @param {?} y The vertical offset position of the canvas.
         * @param {?} w The width of the canvas.
         * @param {?} h The height of the canvas.
         * @return {?}
         */
            function (x, y, w, h) {
                // Update CSS position.
                this._canvas.style.left = x + 'px';
                this._canvas.style.top = y + 'px';
                // Update CSS dimensions.
                this._canvas.style.width = w + 'px';
                this._canvas.style.height = h + 'px';
            };
        return CanvasOverlay;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of a map layer for the Bing Map Provider.
     *
     * @export
     */
    var /**
     * Concrete implementation of a map layer for the Bing Map Provider.
     *
     * @export
     */ BingLayer = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates a new instance of the BingClusterLayer class.
         *
         * @param _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
         * @param _maps MapService. MapService implementation to leverage for the layer.
         *
         * @memberof BingLayer
         */
        function BingLayer(_layer, _maps) {
            this._layer = _layer;
            this._maps = _maps;
            this._pendingEntities = new Array();
        }
        Object.defineProperty(BingLayer.prototype, "NativePrimitve", {
            get: /**
             * Get the native primitive underneath the abstraction layer.
             *
             * \@memberof BingLayer
             * @return {?} Microsoft.Maps.Layer.
             *
             */ function () {
                return this._layer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener for the layer.
         *
         * \@memberof BingLayer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
        BingLayer.prototype.AddListener = /**
         * Adds an event listener for the layer.
         *
         * \@memberof BingLayer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                Microsoft.Maps.Events.addHandler(this._layer, eventType, function (e) {
                    fn(e);
                });
            };
        /**
         * Adds an entity to the layer.
         *
         * \@memberof BingLayer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
         *
         * @return {?}
         */
        BingLayer.prototype.AddEntity = /**
         * Adds an entity to the layer.
         *
         * \@memberof BingLayer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
         *
         * @return {?}
         */
            function (entity) {
                if (entity && entity.NativePrimitve) {
                    if (this.GetVisible()) {
                        this._layer.add(entity.NativePrimitve);
                    }
                    else {
                        this._pendingEntities.push(entity);
                    }
                }
            };
        /**
         * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
         * as marker, infowindow, polyline, polygon, etc..)
         *
         * \@memberof BingLayer
         * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
         *
         * @return {?}
         */
        BingLayer.prototype.AddEntities = /**
         * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
         * as marker, infowindow, polyline, polygon, etc..)
         *
         * \@memberof BingLayer
         * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
         *
         * @return {?}
         */
            function (entities) {
                var _this = this;
                //
                // use eachSeries as opposed to _layer.add([]) to provide a non-blocking experience for larger data sets.
                //
                if (entities != null && Array.isArray(entities) && entities.length !== 0) {
                    async.eachSeries(__spread(entities), function (e, next) {
                        if (_this.GetVisible()) {
                            _this._layer.add(e.NativePrimitve);
                        }
                        else {
                            _this._pendingEntities.push(e);
                        }
                        async.nextTick(function () { return next(); });
                    });
                }
            };
        /**
         * Deletes the layer.
         *
         * \@memberof BingLayer
         * @return {?}
         */
        BingLayer.prototype.Delete = /**
         * Deletes the layer.
         *
         * \@memberof BingLayer
         * @return {?}
         */
            function () {
                this._maps.DeleteLayer(this);
            };
        /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof BingLayer
         * @return {?} IClusterOptions. The layer options.
         *
         */
        BingLayer.prototype.GetOptions = /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof BingLayer
         * @return {?} IClusterOptions. The layer options.
         *
         */
            function () {
                /** @type {?} */
                var o = {
                    id: Number(this._layer.getId())
                };
                return o;
            };
        /**
         * Returns the visibility state of the layer.
         *
         * \@memberof BingLayer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
        BingLayer.prototype.GetVisible = /**
         * Returns the visibility state of the layer.
         *
         * \@memberof BingLayer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
            function () {
                return this._layer.getVisible();
            };
        /**
         * Removes an entity from the cluster layer.
         *
         * \@memberof BingLayer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline to be removed from the layer.
         *
         * @return {?}
         */
        BingLayer.prototype.RemoveEntity = /**
         * Removes an entity from the cluster layer.
         *
         * \@memberof BingLayer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline to be removed from the layer.
         *
         * @return {?}
         */
            function (entity) {
                if (entity.NativePrimitve) {
                    this._layer.remove(entity.NativePrimitve);
                }
            };
        /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof BingLayer
         * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
         * This replaces any existing entities.
         *
         * @return {?}
         */
        BingLayer.prototype.SetEntities = /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof BingLayer
         * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
         * This replaces any existing entities.
         *
         * @return {?}
         */
            function (entities) {
                //
                // we are using removal and add as opposed to set as for large number of objects it yields a non-blocking, smoother performance...
                //
                this._layer.setPrimitives([]);
                this.AddEntities(entities);
            };
        /**
         * Sets the options for the cluster layer.
         *
         * \@memberof BingLayer
         * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
        BingLayer.prototype.SetOptions = /**
         * Sets the options for the cluster layer.
         *
         * \@memberof BingLayer
         * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
            function (options) {
                this._layer.metadata.id = options.id.toString();
            };
        /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof BingLayer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
        BingLayer.prototype.SetVisible = /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof BingLayer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
            function (visible) {
                this._layer.setVisible(visible);
                if (visible && this._pendingEntities.length > 0) {
                    this.AddEntities(this._pendingEntities.splice(0));
                }
            };
        return BingLayer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This class contains helperfunctions to map various interfaces used to represent options and structures into the
     * corresponding Bing Maps V8 specific implementations.
     *
     * @export
     */
    var BingConversions = (function () {
        function BingConversions() {
        }
        /**
         * Maps an IInfoWindowAction to a Microsoft.Maps.IInfoboxActions
         *
         * \@memberof BingConversions
         * @param {?} action - Object to be mapped.
         * @return {?} - Navtive mapped object.
         *
         */
        BingConversions.TranslateAction = /**
         * Maps an IInfoWindowAction to a Microsoft.Maps.IInfoboxActions
         *
         * \@memberof BingConversions
         * @param {?} action - Object to be mapped.
         * @return {?} - Navtive mapped object.
         *
         */
            function (action) {
                /** @type {?} */
                var a = {
                    eventHandler: action.eventHandler,
                    label: action.label
                };
                return a;
            };
        /**
         * Maps an Array of IInfoWindowAction to an Array of Microsoft.Maps.IInfoboxActions
         *
         * \@memberof BingConversions
         * @param {?} actions - Array of objects to be mapped.
         * @return {?} - Array of mapped objects.
         *
         */
        BingConversions.TranslateActions = /**
         * Maps an Array of IInfoWindowAction to an Array of Microsoft.Maps.IInfoboxActions
         *
         * \@memberof BingConversions
         * @param {?} actions - Array of objects to be mapped.
         * @return {?} - Array of mapped objects.
         *
         */
            function (actions) {
                /** @type {?} */
                var a = new Array();
                actions.forEach(function (x) { return a.push(BingConversions.TranslateAction(x)); });
                return a;
            };
        /**
         * Maps an IBox object to a Microsoft.Maps.LocationRect object.
         *
         * \@memberof BingConversions
         * @param {?} box - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslateBounds = /**
         * Maps an IBox object to a Microsoft.Maps.LocationRect object.
         *
         * \@memberof BingConversions
         * @param {?} box - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (box) {
                /** @type {?} */
                var r = Microsoft.Maps.LocationRect.fromEdges(box.maxLatitude, box.minLongitude, box.minLatitude, box.maxLongitude);
                return r;
            };
        /**
         * Maps an IClusterOptions object to a Microsoft.Maps.IClusterLayerOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslateClusterOptions = /**
         * Maps an IClusterOptions object to a Microsoft.Maps.IClusterLayerOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                Object.keys(options)
                    .filter(function (k) { return BingConversions._clusterOptionsAttributes.indexOf(k) !== -1; })
                    .forEach(function (k) {
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
                        o[k] = ((options))[k];
                    }
                });
                return o;
            };
        /**
         * Maps an IInfoWindowOptions object to a Microsoft.Maps.IInfoboxOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslateInfoBoxOptions = /**
         * Maps an IInfoWindowOptions object to a Microsoft.Maps.IInfoboxOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                Object.keys(options)
                    .filter(function (k) { return BingConversions._infoWindowOptionsAttributes.indexOf(k) !== -1; })
                    .forEach(function (k) {
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
                        o[k] = ((options))[k];
                    }
                });
                return o;
            };
        /**
         * Maps an IMapOptions object to a Microsoft.Maps.IMapLoadOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslateLoadOptions = /**
         * Maps an IMapOptions object to a Microsoft.Maps.IMapLoadOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                Object.keys(options)
                    .filter(function (k) {
                    return BingConversions._mapOptionsAttributes.indexOf(k) !== -1 || BingConversions._viewOptionsAttributes.indexOf(k) !== -1;
                })
                    .forEach(function (k) {
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
                            o.mapTypeId = Microsoft.Maps.MapTypeId[((MapTypeId))[options.mapTypeId]];
                        }
                    }
                    else if (k === 'bounds') {
                        o.bounds = BingConversions.TranslateBounds(options.bounds);
                    }
                    else {
                        o[k] = ((options))[k];
                    }
                });
                return o;
            };
        /**
         * Maps an ILatLong object to a Microsoft.Maps.Location object.
         *
         * \@memberof BingConversions
         * @param {?} latlong - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslateLocation = /**
         * Maps an ILatLong object to a Microsoft.Maps.Location object.
         *
         * \@memberof BingConversions
         * @param {?} latlong - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (latlong) {
                /** @type {?} */
                var l = new Microsoft.Maps.Location(latlong.latitude, latlong.longitude);
                return l;
            };
        /**
         * Maps an IMarkerOptions object to a Microsoft.Maps.IPushpinOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - The mapped object.
         *
         */
        BingConversions.TranslateMarkerOptions = /**
         * Maps an IMarkerOptions object to a Microsoft.Maps.IPushpinOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - The mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                Object.keys(options)
                    .filter(function (k) { return BingConversions._markerOptionsAttributes.indexOf(k) !== -1; })
                    .forEach(function (k) {
                    if (k === 'anchor') {
                        o.anchor = BingConversions.TranslatePoint(options.anchor);
                    }
                    else {
                        ((o))[k] = ((options))[k];
                    }
                });
                return o;
            };
        /**
         * Maps an IMapOptions object to a Microsoft.Maps.IMapOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslateOptions = /**
         * Maps an IMapOptions object to a Microsoft.Maps.IMapOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                Object.keys(options)
                    .filter(function (k) { return BingConversions._mapOptionsAttributes.indexOf(k) !== -1; })
                    .forEach(function (k) {
                    if (k === 'center') {
                        o.center = BingConversions.TranslateLocation(options.center);
                    }
                    else if (k === 'mapTypeId') {
                        o.mapTypeId = Microsoft.Maps.MapTypeId[((MapTypeId))[options.mapTypeId]];
                    }
                    else {
                        o[k] = ((options))[k];
                    }
                });
                return o;
            };
        /**
         * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
         *
         * \@memberof BingConversions
         * @param {?} paths - ILatLong based locations to convert.
         * @return {?} - converted locations.
         *
         */
        BingConversions.TranslatePaths = /**
         * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
         *
         * \@memberof BingConversions
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
                    var p1 = (paths);
                    for (var i = 0; i < p1.length; i++) {
                        /** @type {?} */
                        var _p = new Array();
                        for (var j = 0; j < p1[i].length; j++) {
                            _p.push(new Microsoft.Maps.Location(p1[i][j].latitude, p1[i][j].longitude));
                        }
                        p.push(_p);
                    }
                }
                else {
                    /** @type {?} */
                    var y = new Array();
                    /** @type {?} */
                    var p1 = (paths);
                    for (var i = 0; i < p1.length; i++) {
                        y.push(new Microsoft.Maps.Location(p1[i].latitude, p1[i].longitude));
                    }
                    p.push(y);
                }
                return p;
            };
        /**
         *  Maps an IPoint object to a Microsoft.Maps.Point object.
         *
         * \@memberof BingConversions
         * @param {?} point - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslatePoint = /**
         *  Maps an IPoint object to a Microsoft.Maps.Point object.
         *
         * \@memberof BingConversions
         * @param {?} point - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (point) {
                /** @type {?} */
                var p = new Microsoft.Maps.Point(point.x, point.y);
                return p;
            };
        /**
         *  Maps an IPolygonOptions object to a Microsoft.Maps.IPolygonOptions.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslatePolygonOptions = /**
         *  Maps an IPolygonOptions object to a Microsoft.Maps.IPolygonOptions.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                /** @type {?} */
                var f = function (s, a) {
                    /** @type {?} */
                    var m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
                    if (m && m.length > 3) {
                        a = a > 1 ? (a / 100) : a;
                        return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
                    }
                    else if (s[0] === '#') {
                        /** @type {?} */
                        var z = s.substr(1);
                        /** @type {?} */
                        var r = parseInt(z.substr(0, 2), 16);
                        /** @type {?} */
                        var g = parseInt(z.substr(2, 2), 16);
                        /** @type {?} */
                        var b = parseInt(z.substr(4, 2), 16);
                        return 'rgba(' + [r, g, b, a].join(',') + ')';
                    }
                    else {
                        return s;
                    }
                };
                Object.keys(options)
                    .filter(function (k) { return BingConversions._polygonOptionsAttributes.indexOf(k) !== -1; })
                    .forEach(function (k) {
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
                    else if (k === 'strokeOpacity') ;
                    else if (k === 'fillColor') {
                        if (options.fillOpacity) {
                            o.fillColor = f(options.fillColor, options.fillOpacity);
                        }
                        else {
                            o.fillColor = options.fillColor;
                        }
                    }
                    else if (k === 'fillOpacity') ;
                    else {
                        ((o))[k] = ((options))[k];
                    }
                });
                return o;
            };
        /**
         *  Maps an IPolylineOptions object to a Microsoft.Maps.IPolylineOptions.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslatePolylineOptions = /**
         *  Maps an IPolylineOptions object to a Microsoft.Maps.IPolylineOptions.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                /** @type {?} */
                var f = function (s, a) {
                    /** @type {?} */
                    var m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
                    if (m && m.length > 3) {
                        a = a > 1 ? (a / 100) : a;
                        return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
                    }
                    else if (s[0] === '#') {
                        /** @type {?} */
                        var z = s.substr(1);
                        /** @type {?} */
                        var r = parseInt(z.substr(0, 2), 16);
                        /** @type {?} */
                        var g = parseInt(z.substr(2, 2), 16);
                        /** @type {?} */
                        var b = parseInt(z.substr(4, 2), 16);
                        return 'rgba(' + [r, g, b, a].join(',') + ')';
                    }
                    else {
                        return s;
                    }
                };
                Object.keys(options)
                    .filter(function (k) { return BingConversions._polylineOptionsAttributes.indexOf(k) !== -1; })
                    .forEach(function (k) {
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
                    else if (k === 'strokeOpacity') ;
                    else {
                        o[k] = ((options))[k];
                    }
                });
                return o;
            };
        /**
         * Maps an IMapOptions object to a Microsoft.Maps.IViewOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
        BingConversions.TranslateViewOptions = /**
         * Maps an IMapOptions object to a Microsoft.Maps.IViewOptions object.
         *
         * \@memberof BingConversions
         * @param {?} options - Object to be mapped.
         * @return {?} - Mapped object.
         *
         */
            function (options) {
                /** @type {?} */
                var o = {};
                Object.keys(options)
                    .filter(function (k) { return BingConversions._viewOptionsAttributes.indexOf(k) !== -1; })
                    .forEach(function (k) {
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
                        o.mapTypeId = Microsoft.Maps.MapTypeId[((MapTypeId))[options.mapTypeId]];
                    }
                    else {
                        o[k] = ((options))[k];
                    }
                });
                return o;
            };
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
        return BingConversions;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
     *
     * @export
     */
    var /**
     * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
     *
     * @export
     */ BingMarker = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of BingMarker.
         * @param _pushpin - The {@link Microsoft.Maps.Pushpin} underlying the model.
         * @param _map - The context map.
         * @param _layer - The context layer.
         *
         * @memberof BingMarker
         */
        function BingMarker(_pushpin, _map, _layer) {
            this._pushpin = _pushpin;
            this._map = _map;
            this._layer = _layer;
            this._metadata = new Map();
            this._isFirst = false;
            this._isLast = true;
        }
        Object.defineProperty(BingMarker.prototype, "IsFirst", {
            get: /**
             * Indicates that the marker is the first marker in a set.
             *
             * \@memberof Marker
             * @return {?}
             */ function () { return this._isFirst; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._isFirst = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingMarker.prototype, "IsLast", {
            get: /**
             * Indicates that the marker is the last marker in the set.
             *
             * \@memberof Marker
             * @return {?}
             */ function () { return this._isLast; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._isLast = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingMarker.prototype, "Location", {
            get: /**
             * Gets the Location of the marker
             *
             * \@readonly
             * \@memberof BingMarker
             * @return {?}
             */ function () {
                /** @type {?} */
                var l = this._pushpin.getLocation();
                return {
                    latitude: l.latitude,
                    longitude: l.longitude
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingMarker.prototype, "Metadata", {
            get: /**
             * Gets the marker metadata.
             *
             * \@readonly
             * \@memberof BingMarker
             * @return {?}
             */ function () { return this._metadata; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingMarker.prototype, "NativePrimitve", {
            get: /**
             * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
             *
             * \@readonly
             * \@memberof BingMarker
             * @return {?}
             */ function () { return this._pushpin; },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener to the marker.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
        BingMarker.prototype.AddListener = /**
         * Adds an event listener to the marker.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                Microsoft.Maps.Events.addHandler(this._pushpin, eventType, function (e) {
                    fn(e);
                });
            };
        /**
         * Deletes the marker.
         *
         * @abstract
         *
         * \@memberof BingMarker
         * @return {?}
         */
        BingMarker.prototype.DeleteMarker = /**
         * Deletes the marker.
         *
         * @abstract
         *
         * \@memberof BingMarker
         * @return {?}
         */
            function () {
                if (!this._map && !this._layer) {
                    return;
                }
                if (this._layer) {
                    this._layer.remove(this.NativePrimitve);
                }
                else {
                    this._map.entities.remove(this.NativePrimitve);
                }
            };
        /**
         * Gets the marker label
         *
         * @abstract
         *
         * \@memberof BingMarker
         * @return {?}
         */
        BingMarker.prototype.GetLabel = /**
         * Gets the marker label
         *
         * @abstract
         *
         * \@memberof BingMarker
         * @return {?}
         */
            function () {
                return this._pushpin.getText();
            };
        /**
         * Gets whether the marker is visible.
         *
         * \@memberof BingMarker
         * @return {?} - True if the marker is visible, false otherwise.
         *
         */
        BingMarker.prototype.GetVisible = /**
         * Gets whether the marker is visible.
         *
         * \@memberof BingMarker
         * @return {?} - True if the marker is visible, false otherwise.
         *
         */
            function () {
                return this._pushpin.getVisible();
            };
        /**
         * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} anchor - Point coordinates for the marker anchor.
         *
         * @return {?}
         */
        BingMarker.prototype.SetAnchor = /**
         * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} anchor - Point coordinates for the marker anchor.
         *
         * @return {?}
         */
            function (anchor) {
                /** @type {?} */
                var o = {};
                o.anchor = new Microsoft.Maps.Point(anchor.x, anchor.y);
                this._pushpin.setOptions(o);
            };
        /**
         * Sets the draggability of a marker.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} draggable - True to mark the marker as draggable, false otherwise.
         *
         * @return {?}
         */
        BingMarker.prototype.SetDraggable = /**
         * Sets the draggability of a marker.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} draggable - True to mark the marker as draggable, false otherwise.
         *
         * @return {?}
         */
            function (draggable) {
                /** @type {?} */
                var o = {};
                o.draggable = draggable;
                this._pushpin.setOptions(o);
            };
        /**
         * Sets the icon for the marker.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
         *
         * @return {?}
         */
        BingMarker.prototype.SetIcon = /**
         * Sets the icon for the marker.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
         *
         * @return {?}
         */
            function (icon) {
                /** @type {?} */
                var o = {};
                o.icon = icon;
                this._pushpin.setOptions(o);
            };
        /**
         * Sets the marker label.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} label - String containing the label to set.
         *
         * @return {?}
         */
        BingMarker.prototype.SetLabel = /**
         * Sets the marker label.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} label - String containing the label to set.
         *
         * @return {?}
         */
            function (label) {
                /** @type {?} */
                var o = {};
                o.text = label;
                this._pushpin.setOptions(o);
            };
        /**
         * Sets the marker position.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} latLng - Geo coordinates to set the marker position to.
         *
         * @return {?}
         */
        BingMarker.prototype.SetPosition = /**
         * Sets the marker position.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} latLng - Geo coordinates to set the marker position to.
         *
         * @return {?}
         */
            function (latLng) {
                /** @type {?} */
                var p = BingConversions.TranslateLocation(latLng);
                this._pushpin.setLocation(p);
            };
        /**
         * Sets the marker title.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} title - String containing the title to set.
         *
         * @return {?}
         */
        BingMarker.prototype.SetTitle = /**
         * Sets the marker title.
         *
         * @abstract
         * \@memberof BingMarker
         * @param {?} title - String containing the title to set.
         *
         * @return {?}
         */
            function (title) {
                /** @type {?} */
                var o = {};
                o.title = title;
                this._pushpin.setOptions(o);
            };
        /**
         * Sets the marker options.
         *
         * @abstract
         * \@memberof Marker
         * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
         * merged with the underlying marker options.
         * @return {?}
         */
        BingMarker.prototype.SetOptions = /**
         * Sets the marker options.
         *
         * @abstract
         * \@memberof Marker
         * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
         * merged with the underlying marker options.
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = BingConversions.TranslateMarkerOptions(options);
                this._pushpin.setOptions(o);
            };
        /**
         * Sets whether the marker is visible.
         *
         * \@memberof Marker
         * @param {?} visible - True to set the marker visible, false otherwise.
         *
         * @return {?}
         */
        BingMarker.prototype.SetVisible = /**
         * Sets whether the marker is visible.
         *
         * \@memberof Marker
         * @param {?} visible - True to set the marker visible, false otherwise.
         *
         * @return {?}
         */
            function (visible) {
                /** @type {?} */
                var o = {};
                o.visible = visible;
                this._pushpin.setOptions(o);
            };
        return BingMarker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var BingSpiderClusterMarker = (function (_super) {
        __extends(BingSpiderClusterMarker, _super);
        function BingSpiderClusterMarker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BingSpiderClusterMarker;
    }(BingMarker));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of a clustering layer for the Bing Map Provider.
     *
     * @export
     */
    var /**
     * Concrete implementation of a clustering layer for the Bing Map Provider.
     *
     * @export
     */ BingClusterLayer = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates a new instance of the BingClusterLayer class.
         *
         * @param _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
         * @param _maps MapService. MapService implementation to leverage for the layer.
         *
         * @memberof BingClusterLayer
         */
        function BingClusterLayer(_layer, _maps) {
            this._layer = _layer;
            this._maps = _maps;
            this._isClustering = true;
            this._markers = new Array();
            this._markerLookup = new Map();
            this._pendingMarkers = new Array();
            this._spiderMarkers = new Array();
            this._spiderMarkerLookup = new Map();
            this._useSpiderCluster = false;
            this._mapclicks = 0;
            this._events = new Array();
            this._currentZoom = 0;
            this._spiderOptions = {
                circleSpiralSwitchover: 9,
                collapseClusterOnMapChange: false,
                collapseClusterOnNthClick: 1,
                invokeClickOnHover: true,
                minCircleLength: 60,
                minSpiralAngleSeperation: 25,
                spiralDistanceFactor: 5,
                stickStyle: {
                    strokeColor: 'black',
                    strokeThickness: 2
                },
                stickHoverStyle: { strokeColor: 'red' },
                markerSelected: null,
                markerUnSelected: null
            };
            this._currentCluster = null;
        }
        Object.defineProperty(BingClusterLayer.prototype, "NativePrimitve", {
            get: /**
             * Get the native primitive underneath the abstraction layer.
             *
             * \@memberof BingClusterLayer
             * @return {?} Microsoft.Maps.ClusterLayer.
             *
             */ function () {
                return this._layer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener for the layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.AddListener = /**
         * Adds an event listener for the layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                Microsoft.Maps.Events.addHandler(this._layer, eventType, function (e) {
                    fn(e);
                });
            };
        /**
         * Adds an entity to the layer. Use this method with caution as it will
         * trigger a recaluation of the clusters (and associated markers if approprite) for
         * each invocation. If you use this method to add many markers to the cluster, use
         *
         * \@memberof BingClusterLayer
         * @param {?} entity Marker. Entity to add to the layer.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.AddEntity = /**
         * Adds an entity to the layer. Use this method with caution as it will
         * trigger a recaluation of the clusters (and associated markers if approprite) for
         * each invocation. If you use this method to add many markers to the cluster, use
         *
         * \@memberof BingClusterLayer
         * @param {?} entity Marker. Entity to add to the layer.
         *
         * @return {?}
         */
            function (entity) {
                /** @type {?} */
                var isMarker = entity instanceof Marker;
                isMarker = entity instanceof BingMarker || isMarker;
                if (isMarker) {
                    if (entity.IsFirst) {
                        this.StopClustering();
                    }
                }
                if (entity.NativePrimitve && entity.Location) {
                    if (this._isClustering) {
                        /** @type {?} */
                        var p = this._layer.getPushpins();
                        p.push(entity.NativePrimitve);
                        this._layer.setPushpins(p);
                        this._markers.push(entity);
                    }
                    else {
                        this._pendingMarkers.push(entity);
                    }
                    this._markerLookup.set(entity.NativePrimitve, entity);
                }
                if (isMarker) {
                    if (entity.IsLast) {
                        this.StartClustering();
                    }
                }
            };
        /**
         * Adds a number of markers to the layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} entities Array<Marker>. Entities to add to the layer.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.AddEntities = /**
         * Adds a number of markers to the layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} entities Array<Marker>. Entities to add to the layer.
         *
         * @return {?}
         */
            function (entities) {
                var _this = this;
                if (entities != null && Array.isArray(entities) && entities.length !== 0) {
                    /** @type {?} */
                    var e = entities.map(function (p) {
                        _this._markerLookup.set(p.NativePrimitve, p);
                        return p.NativePrimitve;
                    });
                    if (this._isClustering) {
                        /** @type {?} */
                        var p = this._layer.getPushpins();
                        p.push.apply(p, __spread(e));
                        this._layer.setPushpins(p);
                        (_a = this._markers).push.apply(_a, __spread(entities));
                    }
                    else {
                        (_b = this._pendingMarkers).push.apply(_b, __spread(entities));
                    }
                }
                var _a, _b;
            };
        /**
         * Initializes spider behavior for the clusering layer (when a cluster maker is clicked, it explodes into a spider of the
         * individual underlying pins.
         *
         * \@memberof BingClusterLayer
         * @param {?=} options ISpiderClusterOptions. Optional. Options governing the behavior of the spider.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.InitializeSpiderClusterSupport = /**
         * Initializes spider behavior for the clusering layer (when a cluster maker is clicked, it explodes into a spider of the
         * individual underlying pins.
         *
         * \@memberof BingClusterLayer
         * @param {?=} options ISpiderClusterOptions. Optional. Options governing the behavior of the spider.
         *
         * @return {?}
         */
            function (options) {
                var _this = this;
                if (this._useSpiderCluster) {
                    return;
                }
                /** @type {?} */
                var m = ((this._maps)).MapInstance;
                this._useSpiderCluster = true;
                this._spiderLayer = new Microsoft.Maps.Layer();
                this._currentZoom = m.getZoom();
                this.SetSpiderOptions(options);
                m.layers.insert(this._spiderLayer);
                this._events.push(Microsoft.Maps.Events.addHandler(m, 'click', function (e) { return _this.OnMapClick(e); }));
                this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangestart', function (e) { return _this.OnMapViewChangeStart(e); }));
                this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangeend', function (e) { return _this.OnMapViewChangeEnd(e); }));
                this._events.push(Microsoft.Maps.Events.addHandler(this._layer, 'click', function (e) { return _this.OnLayerClick(e); }));
                this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'click', function (e) { return _this.OnLayerClick(e); }));
                this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseover', function (e) { return _this.OnSpiderMouseOver(e); }));
                this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseout', function (e) { return _this.OnSpiderMouseOut(e); }));
            };
        /**
         * Deletes the clustering layer.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
        BingClusterLayer.prototype.Delete = /**
         * Deletes the clustering layer.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._useSpiderCluster) {
                    this._spiderLayer.clear();
                    ((this._maps)).MapPromise.then(function (m) {
                        m.layers.remove(_this._spiderLayer);
                        _this._spiderLayer = null;
                    });
                    this._events.forEach(function (e) { return Microsoft.Maps.Events.removeHandler(e); });
                    this._events.splice(0);
                    this._useSpiderCluster = false;
                }
                this._markers.splice(0);
                this._spiderMarkers.splice(0);
                this._pendingMarkers.splice(0);
                this._markerLookup.clear();
                this._maps.DeleteLayer(this);
            };
        /**
         * Returns the abstract marker used to wrap the Bing Pushpin.
         *
         * \@memberof BingClusterLayer
         * @param {?} pin
         * @return {?} Marker. The abstract marker object representing the pushpin.
         *
         */
        BingClusterLayer.prototype.GetMarkerFromBingMarker = /**
         * Returns the abstract marker used to wrap the Bing Pushpin.
         *
         * \@memberof BingClusterLayer
         * @param {?} pin
         * @return {?} Marker. The abstract marker object representing the pushpin.
         *
         */
            function (pin) {
                /** @type {?} */
                var m = this._markerLookup.get(pin);
                return m;
            };
        /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof BingClusterLayer
         * @return {?} IClusterOptions. The layer options.
         *
         */
        BingClusterLayer.prototype.GetOptions = /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof BingClusterLayer
         * @return {?} IClusterOptions. The layer options.
         *
         */
            function () {
                /** @type {?} */
                var o = this._layer.getOptions();
                /** @type {?} */
                var options = {
                    id: 0,
                    gridSize: o.gridSize,
                    layerOffset: o.layerOffset,
                    clusteringEnabled: o.clusteringEnabled,
                    callback: o.callback,
                    clusteredPinCallback: o.clusteredPinCallback,
                    visible: o.visible,
                    zIndex: o.zIndex
                };
                return options;
            };
        /**
         * Returns the visibility state of the layer.
         *
         * \@memberof BingClusterLayer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
        BingClusterLayer.prototype.GetVisible = /**
         * Returns the visibility state of the layer.
         *
         * \@memberof BingClusterLayer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
            function () {
                return this._layer.getOptions().visible;
            };
        /**
         * Returns the abstract marker used to wrap the Bing Pushpin.
         *
         * \@memberof BingClusterLayer
         * @param {?} pin
         * @return {?} - The abstract marker object representing the pushpin.
         *
         */
        BingClusterLayer.prototype.GetSpiderMarkerFromBingMarker = /**
         * Returns the abstract marker used to wrap the Bing Pushpin.
         *
         * \@memberof BingClusterLayer
         * @param {?} pin
         * @return {?} - The abstract marker object representing the pushpin.
         *
         */
            function (pin) {
                /** @type {?} */
                var m = this._spiderMarkerLookup.get(pin);
                return m;
            };
        /**
         * Removes an entity from the cluster layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} entity Marker - Entity to be removed from the layer.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.RemoveEntity = /**
         * Removes an entity from the cluster layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} entity Marker - Entity to be removed from the layer.
         *
         * @return {?}
         */
            function (entity) {
                if (entity.NativePrimitve && entity.Location) {
                    /** @type {?} */
                    var j = this._markers.indexOf(entity);
                    /** @type {?} */
                    var k = this._pendingMarkers.indexOf(entity);
                    if (j > -1) {
                        this._markers.splice(j, 1);
                    }
                    if (k > -1) {
                        this._pendingMarkers.splice(k, 1);
                    }
                    if (this._isClustering) {
                        /** @type {?} */
                        var p = this._layer.getPushpins();
                        /** @type {?} */
                        var i = p.indexOf(entity.NativePrimitve);
                        if (i > -1) {
                            p.splice(i, 1);
                            this._layer.setPushpins(p);
                        }
                    }
                    this._markerLookup.delete(entity.NativePrimitve);
                }
            };
        /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} entities Array<Marker> containing
         * the entities to add to the cluster. This replaces any existing entities.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.SetEntities = /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} entities Array<Marker> containing
         * the entities to add to the cluster. This replaces any existing entities.
         *
         * @return {?}
         */
            function (entities) {
                var _this = this;
                /** @type {?} */
                var p = new Array();
                this._markers.splice(0);
                this._markerLookup.clear();
                entities.forEach(function (e) {
                    if (e.NativePrimitve && e.Location) {
                        _this._markers.push(e);
                        _this._markerLookup.set(e.NativePrimitve, e);
                        p.push(/** @type {?} */ (e.NativePrimitve));
                    }
                });
                this._layer.setPushpins(p);
            };
        /**
         * Sets the options for the cluster layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.SetOptions = /**
         * Sets the options for the cluster layer.
         *
         * \@memberof BingClusterLayer
         * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = BingConversions.TranslateClusterOptions(options);
                this._layer.setOptions(o);
                if (options.spiderClusterOptions) {
                    this.SetSpiderOptions(options.spiderClusterOptions);
                }
            };
        /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof BingClusterLayer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.SetVisible = /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof BingClusterLayer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
            function (visible) {
                /** @type {?} */
                var o = this._layer.getOptions();
                o.visible = visible;
                this._layer.setOptions(o);
            };
        /**
         * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
         * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
        BingClusterLayer.prototype.StartClustering = /**
         * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
         * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
            function () {
                if (this._isClustering) {
                    return;
                }
                /** @type {?} */
                var p = new Array();
                this._markers.forEach(function (e) {
                    if (e.NativePrimitve && e.Location) {
                        p.push(/** @type {?} */ (e.NativePrimitve));
                    }
                });
                this._pendingMarkers.forEach(function (e) {
                    if (e.NativePrimitve && e.Location) {
                        p.push(/** @type {?} */ (e.NativePrimitve));
                    }
                });
                this._layer.setPushpins(p);
                this._markers = this._markers.concat(this._pendingMarkers.splice(0));
                this._isClustering = true;
            };
        /**
         * Stop to actually cluster the entities in a cluster layer.
         * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
        BingClusterLayer.prototype.StopClustering = /**
         * Stop to actually cluster the entities in a cluster layer.
         * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
            function () {
                if (!this._isClustering) {
                    return;
                }
                this._isClustering = false;
            };
        /**
         * Creates a copy of a pushpins basic options.
         *
         * \@memberof BingClusterLayer
         * @param {?} pin Pushpin to copy options from.
         * @return {?} - A copy of a pushpins basic options.
         *
         */
        BingClusterLayer.prototype.GetBasicPushpinOptions = /**
         * Creates a copy of a pushpins basic options.
         *
         * \@memberof BingClusterLayer
         * @param {?} pin Pushpin to copy options from.
         * @return {?} - A copy of a pushpins basic options.
         *
         */
            function (pin) {
                return /** @type {?} */ ({
                    anchor: pin.getAnchor(),
                    color: pin.getColor(),
                    cursor: pin.getCursor(),
                    icon: pin.getIcon(),
                    roundClickableArea: pin.getRoundClickableArea(),
                    subTitle: pin.getSubTitle(),
                    text: pin.getText(),
                    textOffset: pin.getTextOffset(),
                    title: pin.getTitle()
                });
            };
        /**
         * Hides the spider cluster and resotres the original pin.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
        BingClusterLayer.prototype.HideSpiderCluster = /**
         * Hides the spider cluster and resotres the original pin.
         *
         * \@memberof BingClusterLayer
         * @return {?}
         */
            function () {
                this._mapclicks = 0;
                if (this._currentCluster) {
                    this._spiderLayer.clear();
                    this._spiderMarkers.splice(0);
                    this._spiderMarkerLookup.clear();
                    this._currentCluster = null;
                    this._mapclicks = -1;
                    if (this._spiderOptions.markerUnSelected) {
                        this._spiderOptions.markerUnSelected();
                    }
                }
            };
        /**
         * Click event handler for when a shape in the cluster layer is clicked.
         *
         * \@memberof BingClusterLayer
         * @param {?} e The mouse event argurment from the click event.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.OnLayerClick = /**
         * Click event handler for when a shape in the cluster layer is clicked.
         *
         * \@memberof BingClusterLayer
         * @param {?} e The mouse event argurment from the click event.
         *
         * @return {?}
         */
            function (e) {
                if (e.primitive instanceof Microsoft.Maps.ClusterPushpin) {
                    /** @type {?} */
                    var cp = (e.primitive);
                    /** @type {?} */
                    var showNewCluster = cp !== this._currentCluster;
                    this.HideSpiderCluster();
                    if (showNewCluster) {
                        this.ShowSpiderCluster(/** @type {?} */ (e.primitive));
                    }
                }
                else {
                    /** @type {?} */
                    var pin = (e.primitive);
                    if (pin.metadata && pin.metadata.isClusterMarker) {
                        /** @type {?} */
                        var m = this.GetSpiderMarkerFromBingMarker(pin);
                        /** @type {?} */
                        var p = m.ParentMarker;
                        /** @type {?} */
                        var ppin = p.NativePrimitve;
                        if (this._spiderOptions.markerSelected) {
                            this._spiderOptions.markerSelected(p, new BingMarker(this._currentCluster, null, null));
                        }
                        if (Microsoft.Maps.Events.hasHandler(ppin, 'click')) {
                            Microsoft.Maps.Events.invoke(ppin, 'click', e);
                        }
                        this._mapclicks = 0;
                    }
                    else {
                        if (this._spiderOptions.markerSelected) {
                            this._spiderOptions.markerSelected(this.GetMarkerFromBingMarker(pin), null);
                        }
                        if (Microsoft.Maps.Events.hasHandler(pin, 'click')) {
                            Microsoft.Maps.Events.invoke(pin, 'click', e);
                        }
                    }
                }
            };
        /**
         * Delegate handling the click event on the map (outside a spider cluster). Depending on the
         * spider options, closes the cluster or increments the click counter.
         *
         * \@memberof BingClusterLayer
         * @param {?} e - Mouse event
         *
         * @return {?}
         */
        BingClusterLayer.prototype.OnMapClick = /**
         * Delegate handling the click event on the map (outside a spider cluster). Depending on the
         * spider options, closes the cluster or increments the click counter.
         *
         * \@memberof BingClusterLayer
         * @param {?} e - Mouse event
         *
         * @return {?}
         */
            function (e) {
                if (this._mapclicks === -1) {
                    return;
                }
                else if (++this._mapclicks >= this._spiderOptions.collapseClusterOnNthClick) {
                    this.HideSpiderCluster();
                }
            };
        /**
         * Delegate handling the map view changed end event. Hides the spider cluster if the zoom level has changed.
         *
         * \@memberof BingClusterLayer
         * @param {?} e - Mouse event.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.OnMapViewChangeEnd = /**
         * Delegate handling the map view changed end event. Hides the spider cluster if the zoom level has changed.
         *
         * \@memberof BingClusterLayer
         * @param {?} e - Mouse event.
         *
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var z = ((e.target)).getZoom();
                /** @type {?} */
                var hasZoomChanged = (z !== this._currentZoom);
                this._currentZoom = z;
                if (hasZoomChanged) {
                    this.HideSpiderCluster();
                }
            };
        /**
         * Delegate handling the map view change start event. Depending on the spider options, hides the
         * the exploded spider or does nothing.
         *
         * \@memberof BingClusterLayer
         * @param {?} e - Mouse event.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.OnMapViewChangeStart = /**
         * Delegate handling the map view change start event. Depending on the spider options, hides the
         * the exploded spider or does nothing.
         *
         * \@memberof BingClusterLayer
         * @param {?} e - Mouse event.
         *
         * @return {?}
         */
            function (e) {
                if (this._spiderOptions.collapseClusterOnMapChange) {
                    this.HideSpiderCluster();
                }
            };
        /**
         * Delegate invoked on mouse out on an exploded spider marker. Resets the hover style on the stick.
         *
         * @param {?} e - Mouse event.
         * @return {?}
         */
        BingClusterLayer.prototype.OnSpiderMouseOut = /**
         * Delegate invoked on mouse out on an exploded spider marker. Resets the hover style on the stick.
         *
         * @param {?} e - Mouse event.
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var pin = (e.primitive);
                if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
                    /** @type {?} */
                    var m = this.GetSpiderMarkerFromBingMarker(pin);
                    m.Stick.setOptions(this._spiderOptions.stickStyle);
                }
            };
        /**
         * Invoked on mouse over on an exploded spider marker. Sets the hover style on the stick. Also invokes the click event
         * on the underlying original marker dependent on the spider options.
         *
         * @param {?} e - Mouse event.
         * @return {?}
         */
        BingClusterLayer.prototype.OnSpiderMouseOver = /**
         * Invoked on mouse over on an exploded spider marker. Sets the hover style on the stick. Also invokes the click event
         * on the underlying original marker dependent on the spider options.
         *
         * @param {?} e - Mouse event.
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var pin = (e.primitive);
                if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
                    /** @type {?} */
                    var m = this.GetSpiderMarkerFromBingMarker(pin);
                    m.Stick.setOptions(this._spiderOptions.stickHoverStyle);
                    if (this._spiderOptions.invokeClickOnHover) {
                        /** @type {?} */
                        var p = m.ParentMarker;
                        /** @type {?} */
                        var ppin = p.NativePrimitve;
                        if (Microsoft.Maps.Events.hasHandler(ppin, 'click')) {
                            Microsoft.Maps.Events.invoke(ppin, 'click', e);
                        }
                    }
                }
            };
        /**
         * Sets the options for spider behavior.
         *
         * \@memberof BingClusterLayer
         * @param {?} options ISpiderClusterOptions containing the options enumeration controlling the spider cluster behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
        BingClusterLayer.prototype.SetSpiderOptions = /**
         * Sets the options for spider behavior.
         *
         * \@memberof BingClusterLayer
         * @param {?} options ISpiderClusterOptions containing the options enumeration controlling the spider cluster behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
            function (options) {
                if (options) {
                    if (typeof options.circleSpiralSwitchover === 'number') {
                        this._spiderOptions.circleSpiralSwitchover = options.circleSpiralSwitchover;
                    }
                    if (typeof options.collapseClusterOnMapChange === 'boolean') {
                        this._spiderOptions.collapseClusterOnMapChange = options.collapseClusterOnMapChange;
                    }
                    if (typeof options.collapseClusterOnNthClick === 'number') {
                        this._spiderOptions.collapseClusterOnNthClick = options.collapseClusterOnNthClick;
                    }
                    if (typeof options.invokeClickOnHover === 'boolean') {
                        this._spiderOptions.invokeClickOnHover = options.invokeClickOnHover;
                    }
                    if (typeof options.minSpiralAngleSeperation === 'number') {
                        this._spiderOptions.minSpiralAngleSeperation = options.minSpiralAngleSeperation;
                    }
                    if (typeof options.spiralDistanceFactor === 'number') {
                        this._spiderOptions.spiralDistanceFactor = options.spiralDistanceFactor;
                    }
                    if (typeof options.minCircleLength === 'number') {
                        this._spiderOptions.minCircleLength = options.minCircleLength;
                    }
                    if (options.stickHoverStyle) {
                        this._spiderOptions.stickHoverStyle = options.stickHoverStyle;
                    }
                    if (options.stickStyle) {
                        this._spiderOptions.stickStyle = options.stickStyle;
                    }
                    if (options.markerSelected) {
                        this._spiderOptions.markerSelected = options.markerSelected;
                    }
                    if (options.markerUnSelected) {
                        this._spiderOptions.markerUnSelected = options.markerUnSelected;
                    }
                    if (typeof options.visible === 'boolean') {
                        this._spiderOptions.visible = options.visible;
                    }
                    this.SetOptions(/** @type {?} */ (options));
                }
            };
        /**
         * Expands a cluster into it's open spider layout.
         *
         * \@memberof BingClusterLayer
         * @param {?} cluster The cluster to show in it's open spider layout..
         *
         * @return {?}
         */
        BingClusterLayer.prototype.ShowSpiderCluster = /**
         * Expands a cluster into it's open spider layout.
         *
         * \@memberof BingClusterLayer
         * @param {?} cluster The cluster to show in it's open spider layout..
         *
         * @return {?}
         */
            function (cluster) {
                this.HideSpiderCluster();
                this._currentCluster = cluster;
                if (cluster && cluster.containedPushpins) {
                    /** @type {?} */
                    var m = ((this._maps)).MapInstance;
                    /** @type {?} */
                    var pins = cluster.containedPushpins;
                    /** @type {?} */
                    var center = cluster.getLocation();
                    /** @type {?} */
                    var centerPoint = (m.tryLocationToPixel(center, Microsoft.Maps.PixelReference.control));
                    /** @type {?} */
                    var stick = void 0;
                    /** @type {?} */
                    var angle = 0;
                    /** @type {?} */
                    var makeSpiral = pins.length > this._spiderOptions.circleSpiralSwitchover;
                    /** @type {?} */
                    var legPixelLength = void 0;
                    /** @type {?} */
                    var stepAngle = void 0;
                    /** @type {?} */
                    var stepLength = void 0;
                    if (makeSpiral) {
                        legPixelLength = this._spiderOptions.minCircleLength / Math.PI;
                        stepLength = 2 * Math.PI * this._spiderOptions.spiralDistanceFactor;
                    }
                    else {
                        stepAngle = 2 * Math.PI / pins.length;
                        legPixelLength = (this._spiderOptions.spiralDistanceFactor / stepAngle / Math.PI / 2) * pins.length;
                        if (legPixelLength < this._spiderOptions.minCircleLength) {
                            legPixelLength = this._spiderOptions.minCircleLength;
                        }
                    }
                    for (var i = 0, len = pins.length; i < len; i++) {
                        // Calculate spider pin location.
                        if (!makeSpiral) {
                            angle = stepAngle * i;
                        }
                        else {
                            angle += this._spiderOptions.minSpiralAngleSeperation / legPixelLength + i * 0.0005;
                            legPixelLength += stepLength / angle;
                        }
                        /** @type {?} */
                        var point = new Microsoft.Maps.Point(centerPoint.x + legPixelLength * Math.cos(angle), centerPoint.y + legPixelLength * Math.sin(angle));
                        /** @type {?} */
                        var loc = (m.tryPixelToLocation(point, Microsoft.Maps.PixelReference.control));
                        // Create stick to pin.
                        stick = new Microsoft.Maps.Polyline([center, loc], this._spiderOptions.stickStyle);
                        this._spiderLayer.add(stick);
                        /** @type {?} */
                        var pin = new Microsoft.Maps.Pushpin(loc);
                        pin.metadata = pins[i].metadata || {};
                        pin.metadata.isClusterMarker = true;
                        pin.setOptions(this.GetBasicPushpinOptions(pins[i]));
                        this._spiderLayer.add(pin);
                        /** @type {?} */
                        var spiderMarker = new BingSpiderClusterMarker(pin, null, this._spiderLayer);
                        spiderMarker.Stick = stick;
                        spiderMarker.ParentMarker = /** @type {?} */ (this.GetMarkerFromBingMarker(pins[i]));
                        this._spiderMarkers.push(spiderMarker);
                        this._spiderMarkerLookup.set(pin, spiderMarker);
                    }
                    this._mapclicks = 0;
                }
            };
        return BingClusterLayer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
     *
     * @export
     */
    var /**
     * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
     *
     * @export
     */ BingInfoWindow = (function () {
        /**
         * Creates an instance of BingInfoWindow.
         * @param _infoBox - A {@link Microsoft.Maps.Infobox} instance underlying the model
         * @memberof BingInfoWindow
         */
        function BingInfoWindow(_infoBox) {
            this._infoBox = _infoBox;
            this._isOpen = false;
        }
        Object.defineProperty(BingInfoWindow.prototype, "IsOpen", {
            get: /**
             * Gets whether the info box is currently open.
             *
             * \@readonly
             * \@memberof BingInfoWindow
             * @return {?}
             */ function () {
                if (this._infoBox && this._infoBox.getOptions().visible === true) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingInfoWindow.prototype, "NativePrimitve", {
            get: /**
             * Gets native primitve underlying the model.
             *
             * \@memberof BingInfoWindow
             * \@property
             * \@readonly
             * @return {?}
             */ function () {
                return this._infoBox;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener to the InfoWindow.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
        BingInfoWindow.prototype.AddListener = /**
         * Adds an event listener to the InfoWindow.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                var _this = this;
                Microsoft.Maps.Events.addHandler(this._infoBox, eventType, function (e) {
                    if (e.eventName === 'infoboxChanged') {
                        if (_this._infoBox.getOptions().visible === true) {
                            _this._isOpen = true;
                        }
                        else {
                            if (_this._infoBox.getOptions().visible === false && _this._isOpen === true) {
                                _this._isOpen = false;
                                fn(e);
                            }
                        }
                    }
                    else {
                        fn(e);
                    }
                });
            };
        /**
         * Closes the info window.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @return {?}
         */
        BingInfoWindow.prototype.Close = /**
         * Closes the info window.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @return {?}
         */
            function () {
                /** @type {?} */
                var o = {};
                o.visible = false;
                this._infoBox.setOptions(o);
            };
        /**
         * Gets the position of the info window.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @return {?} - Returns the geo coordinates of the info window.
         */
        BingInfoWindow.prototype.GetPosition = /**
         * Gets the position of the info window.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @return {?} - Returns the geo coordinates of the info window.
         */
            function () {
                /** @type {?} */
                var p = {
                    latitude: this._infoBox.getLocation().latitude,
                    longitude: this._infoBox.getLocation().longitude
                };
                return p;
            };
        /**
         * Opens the info window.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @return {?}
         */
        BingInfoWindow.prototype.Open = /**
         * Opens the info window.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @return {?}
         */
            function () {
                /** @type {?} */
                var o = {};
                o.visible = true;
                this._infoBox.setOptions(o);
            };
        /**
         * Sets the info window options.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @param {?} options - Info window options to set. The options will be merged with any existing options.
         *
         * @return {?}
         */
        BingInfoWindow.prototype.SetOptions = /**
         * Sets the info window options.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @param {?} options - Info window options to set. The options will be merged with any existing options.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = BingConversions.TranslateInfoBoxOptions(options);
                this._infoBox.setOptions(o);
            };
        /**
         * Sets the info window position.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @param {?} position - Geo coordinates to move the anchor of the info window to.
         *
         * @return {?}
         */
        BingInfoWindow.prototype.SetPosition = /**
         * Sets the info window position.
         *
         * \@memberof BingInfoWindow
         * \@method
         * @param {?} position - Geo coordinates to move the anchor of the info window to.
         *
         * @return {?}
         */
            function (position) {
                /** @type {?} */
                var l = BingConversions.TranslateLocation(position);
                this._infoBox.setLocation(l);
            };
        return BingInfoWindow;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract base implementing a label to be placed on the map.
     *
     * @export
     * @abstract
     * @abstract
     */
    var /**
     * Abstract base implementing a label to be placed on the map.
     *
     * @export
     * @abstract
     * @abstract
     */ MapLabel = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates a new MapLabel
         * @param options Optional properties to set.
         */
        function MapLabel(options) {
            this.Set('fontFamily', 'sans-serif');
            this.Set('fontSize', 12);
            this.Set('fontColor', '#ffffff');
            this.Set('strokeWeight', 4);
            this.Set('strokeColor', '#000000');
            this.Set('align', 'center');
            this.SetValues(options);
        }
        /**
         * Deletes the label from the map. This method does not atually delete the label itself, so
         * it can be readded to map later.
         * \@memberof MapLabel
         * \@method
         * @return {?}
         */
        MapLabel.prototype.Delete = /**
         * Deletes the label from the map. This method does not atually delete the label itself, so
         * it can be readded to map later.
         * \@memberof MapLabel
         * \@method
         * @return {?}
         */
            function () {
                this.SetMap(null);
            };
        /**
         * Delegate called when underlying properties change.
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} prop - The property or properties that have changed.
         * @return {?}
         */
        MapLabel.prototype.Changed = /**
         * Delegate called when underlying properties change.
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} prop - The property or properties that have changed.
         * @return {?}
         */
            function (prop) {
                /** @type {?} */
                var shouldRunDrawCanvas = false;
                /** @type {?} */
                var shouldRunDraw = false;
                if (!Array.isArray(prop)) {
                    prop = [prop];
                }
                prop.forEach(function (p) {
                    switch (p) {
                        case 'fontFamily':
                        case 'fontSize':
                        case 'fontColor':
                        case 'strokeWeight':
                        case 'strokeColor':
                        case 'align':
                        case 'text':
                            shouldRunDrawCanvas = true;
                            break;
                        case 'maxZoom':
                        case 'minZoom':
                        case 'offset':
                        case 'hidden':
                        case 'position':
                            shouldRunDraw = true;
                            break;
                    }
                });
                if (shouldRunDrawCanvas) {
                    this.DrawCanvas();
                }
                if (shouldRunDraw) {
                    this.Draw();
                }
            };
        ///
        /// Protected methods
        ///
        /**
         * Get the visibility of the label. Visibility depends on Zoom settings.
         * @returns - blank string if visible, 'hidden' if invisible.
         * @protected
         */
        /**
         * Get the visibility of the label. Visibility depends on Zoom settings.
         * @protected
         * @return {?} - blank string if visible, 'hidden' if invisible.
         */
        MapLabel.prototype.GetVisible = /**
         * Get the visibility of the label. Visibility depends on Zoom settings.
         * @protected
         * @return {?} - blank string if visible, 'hidden' if invisible.
         */
            function () {
                /** @type {?} */
                var minZoom = this.Get('minZoom');
                /** @type {?} */
                var maxZoom = this.Get('maxZoom');
                /** @type {?} */
                var hidden = this.Get('hidden');
                if (hidden) {
                    return 'hidden';
                }
                if (minZoom === undefined && maxZoom === undefined) {
                    return '';
                }
                if (!this.GetMap()) {
                    return '';
                }
                /** @type {?} */
                var mapZoom = this.GetMap().getZoom();
                if (mapZoom < minZoom || mapZoom > maxZoom) {
                    return 'hidden';
                }
                return '';
            };
        /**
         * Draws the label to the canvas 2d context.
         * @memberof MapLabel
         * @method
         * @protected
         */
        /**
         * Draws the label to the canvas 2d context.
         * \@memberof MapLabel
         * \@method
         * @protected
         * @return {?}
         */
        MapLabel.prototype.DrawCanvas = /**
         * Draws the label to the canvas 2d context.
         * \@memberof MapLabel
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                if (!this._canvas) {
                    return;
                }
                /** @type {?} */
                var style = this._canvas.style;
                style.zIndex = this.Get('zIndex');
                /** @type {?} */
                var ctx = this._canvas.getContext('2d');
                ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
                ctx.strokeStyle = this.Get('strokeColor');
                ctx.font = this.Get('fontSize') + 'px ' + this.Get('fontFamily');
                /** @type {?} */
                var backgroundColor = this.Get('backgroundColor');
                /** @type {?} */
                var strokeWeight = Number(this.Get('strokeWeight'));
                /** @type {?} */
                var text = this.Get('text');
                /** @type {?} */
                var textMeasure = ctx.measureText(text);
                /** @type {?} */
                var textWidth = textMeasure.width;
                if (text && strokeWeight && strokeWeight > 0) {
                    ctx.lineWidth = strokeWeight;
                    ctx.strokeText(text, 4, 4);
                }
                if (backgroundColor && backgroundColor !== '') {
                    ctx.fillStyle = backgroundColor;
                    ctx.fillRect(0, 0, textWidth + 8, (parseInt(ctx.font, 10) * 2) - 2);
                }
                ctx.fillStyle = this.Get('fontColor');
                ctx.fillText(text, 4, 4);
                style.marginLeft = this.GetMarginLeft(textWidth) + 'px';
                style.marginTop = '-0.4em';
                style.pointerEvents = 'none';
                // Bring actual text top in line with desired latitude.
                // Cheaper than calculating height of text.
            };
        /**
         * Gets the appropriate margin-left for the canvas.
         * @param textWidth  - The width of the text, in pixels.
         * @returns - The margin-left, in pixels.
         * @protected
         * @method
         * @memberof MapLabel
         */
        /**
         * Gets the appropriate margin-left for the canvas.
         * @protected
         * \@method
         * \@memberof MapLabel
         * @param {?} textWidth  - The width of the text, in pixels.
         * @return {?} - The margin-left, in pixels.
         */
        MapLabel.prototype.GetMarginLeft = /**
         * Gets the appropriate margin-left for the canvas.
         * @protected
         * \@method
         * \@memberof MapLabel
         * @param {?} textWidth  - The width of the text, in pixels.
         * @return {?} - The margin-left, in pixels.
         */
            function (textWidth) {
                switch (this.Get('align')) {
                    case 'left': return 0;
                    case 'right': return -textWidth;
                }
                return textWidth / -2;
            };
        /**
         * Called when the label is removed from the map.
         * @method
         * @protected
         * @memberof MapLabel
         */
        /**
         * Called when the label is removed from the map.
         * \@method
         * @protected
         * \@memberof MapLabel
         * @return {?}
         */
        MapLabel.prototype.OnRemove = /**
         * Called when the label is removed from the map.
         * \@method
         * @protected
         * \@memberof MapLabel
         * @return {?}
         */
            function () {
                if (this._canvas && this._canvas.parentNode) {
                    this._canvas.parentNode.removeChild(this._canvas);
                }
            };
        return MapLabel;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Extender = (function () {
        function Extender(obj) {
            this._obj = obj;
            this._proto = obj.prototype;
        }
        /**
         * @param {?} newObj
         * @return {?}
         */
        Extender.prototype.Extend = /**
         * @param {?} newObj
         * @return {?}
         */
            function (newObj) {
                this.Set('prototype', newObj, this._obj);
                for (var y in this._proto) {
                    if (((this._proto))[y] != null) {
                        this.Set(y, (this._proto)[y], ((this._obj.prototype))[y]);
                    }
                }
                return this;
            };
        /**
         * @param {?} property
         * @param {?} newObj
         * @param {?=} obj
         * @return {?}
         */
        Extender.prototype.Set = /**
         * @param {?} property
         * @param {?} newObj
         * @param {?=} obj
         * @return {?}
         */
            function (property, newObj, obj) {
                if (typeof newObj === 'undefined') {
                    return this;
                }
                if (typeof obj === 'undefined') {
                    obj = this._proto;
                }
                Object.defineProperty(obj, property, newObj);
            };
        /**
         * @param {?} property
         * @param {?} newProperty
         * @return {?}
         */
        Extender.prototype.Map = /**
         * @param {?} property
         * @param {?} newProperty
         * @return {?}
         */
            function (property, newProperty) {
                this.Set(property, this._proto[newProperty], this._obj.prototype);
                return this;
            };
        return Extender;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var id$1 = 0;
    /**
     * Implements map a labled to be placed on the map.
     *
     * @export
     */
    var /**
     * Implements map a labled to be placed on the map.
     *
     * @export
     */ BingMapLabel = (function (_super) {
        __extends(BingMapLabel, _super);
        ///
        /// Constructor
        ///
        /**
         * Creates a new MapLabel
         * @param options Optional properties to set.
         */
        function BingMapLabel(options) {
            var _this = this;
            options["fontSize"] = options["fontSize"] || 12;
            options["fontColor"] = options["fontColor"] || '#ffffff';
            options["strokeWeight"] = options["strokeWeight"] || 2;
            options["strokeColor"] = options["strokeColor"] || '#000000';
            _this = _super.call(this, options) || this;
            ((_this))._options.beneathLabels = false;
            return _this;
        }
        Object.defineProperty(BingMapLabel.prototype, "DefaultLabelStyle", {
            get: /**
             * Returns the default label style for the platform
             *
             * \@readonly
             * @abstract
             * \@memberof BingMapLabel
             * @return {?}
             */ function () {
                return {
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: '#ffffff',
                    strokeWeight: 2,
                    strokeColor: '#000000'
                };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets the value of a setting.
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @return {?} - The value of the setting.
         */
        BingMapLabel.prototype.Get = /**
         * Gets the value of a setting.
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @return {?} - The value of the setting.
         */
            function (key) {
                return ((this))[key];
            };
        /**
         * Gets the map associted with the label.
         *
         * \@memberof BingMapLabel
         * \@method
         * @return {?}
         */
        BingMapLabel.prototype.GetMap = /**
         * Gets the map associted with the label.
         *
         * \@memberof BingMapLabel
         * \@method
         * @return {?}
         */
            function () {
                return ((this)).getMap();
            };
        /**
         * Set the value for a setting.
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @param {?} val - The value to set.
         * @return {?}
         */
        BingMapLabel.prototype.Set = /**
         * Set the value for a setting.
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @param {?} val - The value to set.
         * @return {?}
         */
            function (key, val) {
                if (key === 'position' && !val.hasOwnProperty('altitude') && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
                    val = new Microsoft.Maps.Location(val.latitude, val.longitude);
                }
                if (this.Get(key) !== val) {
                    ((this))[key] = val;
                    this.Changed(key);
                }
            };
        /**
         * Sets the map for the label. Settings this to null remove the label from hte map.
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} map - Map to associated with the label.
         * @return {?}
         */
        BingMapLabel.prototype.SetMap = /**
         * Sets the map for the label. Settings this to null remove the label from hte map.
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} map - Map to associated with the label.
         * @return {?}
         */
            function (map) {
                /** @type {?} */
                var m = this.GetMap();
                if (map === m) {
                    return;
                }
                if (m) {
                    m.layers.remove(this);
                }
                if (map != null) {
                    map.layers.insert(this);
                }
            };
        /**
         * Applies settings to the object
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} options - An object containing the settings key value pairs.
         * @return {?}
         */
        BingMapLabel.prototype.SetValues = /**
         * Applies settings to the object
         *
         * \@memberof BingMapLabel
         * \@method
         * @param {?} options - An object containing the settings key value pairs.
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var p = new Array();
                for (var key in options) {
                    if (key !== '') {
                        if (key === 'position' && !options[key].hasOwnProperty('altitude') &&
                            options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                            options[key] = new Microsoft.Maps.Location(options[key].latitude, options[key].longitude);
                        }
                        if (this.Get(key) !== options[key]) {
                            ((this))[key] = options[key];
                            p.push(key);
                        }
                    }
                }
                if (p.length > 0) {
                    this.Changed(p);
                }
            };
        ///
        /// Protected methods
        ///
        /**
         * Draws the label on the map.
         * @memberof BingMapLabel
         * @method
         * @protected
         */
        /**
         * Draws the label on the map.
         * \@memberof BingMapLabel
         * \@method
         * @protected
         * @return {?}
         */
        BingMapLabel.prototype.Draw = /**
         * Draws the label on the map.
         * \@memberof BingMapLabel
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                /** @type {?} */
                var visibility = this.GetVisible();
                /** @type {?} */
                var m = this.GetMap();
                if (!this._canvas) {
                    return;
                }
                if (!m) {
                    return;
                }
                /** @type {?} */
                var style = this._canvas.style;
                if (visibility !== '') {
                    // label is not visible, don't calculate positions etc.
                    style['visibility'] = visibility;
                    return;
                }
                /** @type {?} */
                var offset = this.Get('offset');
                /** @type {?} */
                var latLng = this.Get('position');
                if (!latLng) {
                    return;
                }
                if (!offset) {
                    offset = new Microsoft.Maps.Point(0, 0);
                }
                /** @type {?} */
                var pos = (m.tryLocationToPixel(latLng, Microsoft.Maps.PixelReference.control));
                style['top'] = (pos.y + offset.y) + 'px';
                style['left'] = (pos.x + offset.x) + 'px';
                style['visibility'] = visibility;
            };
        /**
         * Delegate called when the label is added to the map. Generates and configures
         * the canvas.
         *
         * @memberof BingMapLabel
         * @method
         * @protected
         */
        /**
         * Delegate called when the label is added to the map. Generates and configures
         * the canvas.
         *
         * \@memberof BingMapLabel
         * \@method
         * @protected
         * @return {?}
         */
        BingMapLabel.prototype.OnAdd = /**
         * Delegate called when the label is added to the map. Generates and configures
         * the canvas.
         *
         * \@memberof BingMapLabel
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                this._canvas = document.createElement('canvas');
                this._canvas.id = "xMapLabel" + id$1++;
                /** @type {?} */
                var style = this._canvas.style;
                style.position = 'absolute';
                /** @type {?} */
                var ctx = this._canvas.getContext('2d');
                ctx.lineJoin = 'round';
                ctx.textBaseline = 'top';
                ((this)).setHtmlElement(this._canvas);
            };
        /**
         * Delegate callled when the label is loaded
         * \@memberof BingMapLabel
         * \@method
         * @return {?}
         */
        BingMapLabel.prototype.OnLoad = /**
         * Delegate callled when the label is loaded
         * \@memberof BingMapLabel
         * \@method
         * @return {?}
         */
            function () {
                var _this = this;
                Microsoft.Maps.Events.addHandler(this.GetMap(), 'viewchange', function () {
                    _this.Changed('position');
                });
                this.DrawCanvas();
                this.Draw();
            };
        return BingMapLabel;
    }(MapLabel));
    /**
     * Helper function to extend the CustomOverlay into the MapLabel
     *
     * @export
     * \@method
     * @return {?}
     */
    function MixinMapLabelWithOverlayView() {
        new Extender(BingMapLabel)
            .Extend(new Microsoft.Maps.CustomOverlay())
            .Map('onAdd', 'OnAdd')
            .Map('onLoad', 'OnLoad')
            .Map('onRemove', 'OnRemove');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation for a polygon model for Bing Maps V8.
     *
     * @export
     */
    var /**
     * Concrete implementation for a polygon model for Bing Maps V8.
     *
     * @export
     */ BingPolygon = (function (_super) {
        __extends(BingPolygon, _super);
        ///
        /// constructor
        ///
        /**
         * Creates an instance of BingPolygon.
         * @param _polygon - The {@link Microsoft.Maps.Polygon} underlying the model.
         * @param _mapService Instance of the Map Service.
         * @param _layer - The context layer.
         * @memberof BingPolygon
         */
        function BingPolygon(_polygon, _mapService, _layer) {
            var _this = _super.call(this) || this;
            _this._polygon = _polygon;
            _this._mapService = _mapService;
            _this._layer = _layer;
            _this._map = null;
            _this._isEditable = false;
            _this._title = '';
            _this._maxZoom = -1;
            _this._minZoom = -1;
            _this._showLabel = false;
            _this._showTooltip = false;
            _this._label = null;
            _this._tooltip = null;
            _this._hasToolTipReceiver = false;
            _this._tooltipVisible = false;
            _this._metadata = new Map();
            _this._map = _this._mapService.MapInstance;
            _this._originalPath = _this.GetPaths();
            return _this;
        }
        Object.defineProperty(BingPolygon.prototype, "LabelMaxZoom", {
            get: /**
             * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
             *
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._maxZoom; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._maxZoom = val;
                this.ManageLabel();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolygon.prototype, "LabelMinZoom", {
            get: /**
             * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
             *
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._minZoom; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._minZoom = val;
                this.ManageLabel();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolygon.prototype, "Metadata", {
            get: /**
             * Gets the polygon metadata.
             *
             * \@readonly
             * \@memberof BingPolygon
             * @return {?}
             */ function () { return this._metadata; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolygon.prototype, "NativePrimitve", {
            get: /**
             * Gets the native primitve implementing the polygon, in this case {\@link Microsoft.Maps.Polygon}
             *
             * \@readonly
             * \@memberof BingPolygon
             * @return {?}
             */ function () { return this._polygon; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolygon.prototype, "ShowLabel", {
            get: /**
             * Gets or sets whether to show the label
             *
             * @abstract
             * \@memberof BingPolygon
             * \@property
             * @return {?}
             */ function () { return this._showLabel; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._showLabel = val;
                this.ManageLabel();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolygon.prototype, "ShowTooltip", {
            get: /**
             * Gets or sets whether to show the tooltip
             *
             * @abstract
             * \@memberof BingPolygon
             * \@property
             * @return {?}
             */ function () { return this._showTooltip; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._showTooltip = val;
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolygon.prototype, "Title", {
            get: /**
             * Gets or sets the title off the polygon
             *
             * @abstract
             * \@memberof BingPolygon
             * \@property
             * @return {?}
             */ function () { return this._title; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._title = val;
                this.ManageLabel();
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a delegate for an event.
         *
         * \@memberof BingPolygon
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
        BingPolygon.prototype.AddListener = /**
         * Adds a delegate for an event.
         *
         * \@memberof BingPolygon
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
            function (eventType, fn) {
                var _this = this;
                /** @type {?} */
                var supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
                if (supportedEvents.indexOf(eventType) !== -1) {
                    Microsoft.Maps.Events.addHandler(this._polygon, eventType, function (e) {
                        fn(e);
                    });
                }
                if (eventType === 'mousemove') {
                    /** @type {?} */
                    var handlerId_1 = void 0;
                    Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', function (e) {
                        handlerId_1 = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) { return fn(m); });
                    });
                    Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', function (e) {
                        if (handlerId_1) {
                            Microsoft.Maps.Events.removeHandler(handlerId_1);
                        }
                    });
                }
                if (eventType === 'pathchanged') {
                    this._editingCompleteEmitter = /** @type {?} */ (fn);
                }
            };
        /**
         * Deleted the polygon.
         *
         * \@memberof BingPolygon
         * @return {?}
         */
        BingPolygon.prototype.Delete = /**
         * Deleted the polygon.
         *
         * \@memberof BingPolygon
         * @return {?}
         */
            function () {
                if (this._layer) {
                    this._layer.remove(this.NativePrimitve);
                }
                else {
                    this._map.entities.remove(this.NativePrimitve);
                }
                if (this._label) {
                    this._label.Delete();
                }
                if (this._tooltip) {
                    this._tooltip.Delete();
                }
            };
        /**
         * Gets whether the polygon is draggable.
         *
         * \@memberof BingPolygon
         * @return {?} - True if the polygon is dragable, false otherwise.
         *
         */
        BingPolygon.prototype.GetDraggable = /**
         * Gets whether the polygon is draggable.
         *
         * \@memberof BingPolygon
         * @return {?} - True if the polygon is dragable, false otherwise.
         *
         */
            function () {
                return false;
            };
        /**
         * Gets whether the polygon path can be edited.
         *
         * \@memberof BingPolygon
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
        BingPolygon.prototype.GetEditable = /**
         * Gets whether the polygon path can be edited.
         *
         * \@memberof BingPolygon
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
            function () {
                return this._isEditable;
            };
        /**
         * Gets the polygon path.
         *
         * \@memberof BingPolygon
         * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
         *
         */
        BingPolygon.prototype.GetPath = /**
         * Gets the polygon path.
         *
         * \@memberof BingPolygon
         * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
         *
         */
            function () {
                /** @type {?} */
                var p = this._polygon.getLocations();
                /** @type {?} */
                var path = new Array();
                p.forEach(function (l) { return path.push({ latitude: l.latitude, longitude: l.longitude }); });
                return path;
            };
        /**
         * Gets the polygon paths.
         *
         * \@memberof BingPolygon
         * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
         *
         */
        BingPolygon.prototype.GetPaths = /**
         * Gets the polygon paths.
         *
         * \@memberof BingPolygon
         * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
         *
         */
            function () {
                /** @type {?} */
                var p = this._polygon.getRings();
                /** @type {?} */
                var paths = new Array();
                p.forEach(function (x) {
                    /** @type {?} */
                    var path = new Array();
                    x.forEach(function (y) { return path.push({ latitude: y.latitude, longitude: y.longitude }); });
                    paths.push(path);
                });
                return paths;
            };
        /**
         * Gets whether the polygon is visible.
         *
         * \@memberof BingPolygon
         * @return {?} - True if the polygon is visible, false otherwise.
         *
         */
        BingPolygon.prototype.GetVisible = /**
         * Gets whether the polygon is visible.
         *
         * \@memberof BingPolygon
         * @return {?} - True if the polygon is visible, false otherwise.
         *
         */
            function () {
                return this._polygon.getVisible();
            };
        /**
         * Sets whether the polygon is dragable.
         *
         * \@memberof BingPolygon
         * @param {?} draggable - True to make the polygon dragable, false otherwise.
         *
         * @return {?}
         */
        BingPolygon.prototype.SetDraggable = /**
         * Sets whether the polygon is dragable.
         *
         * \@memberof BingPolygon
         * @param {?} draggable - True to make the polygon dragable, false otherwise.
         *
         * @return {?}
         */
            function (draggable) {
                //      ?forum=bingmaps
                throw (new Error('The bing maps implementation currently does not support draggable polygons.'));
            };
        /**
         * Sets wether the polygon path is editable.
         *
         * \@memberof BingPolygon
         * @param {?} editable - True to make polygon path editable, false otherwise.
         *
         * @return {?}
         */
        BingPolygon.prototype.SetEditable = /**
         * Sets wether the polygon path is editable.
         *
         * \@memberof BingPolygon
         * @param {?} editable - True to make polygon path editable, false otherwise.
         *
         * @return {?}
         */
            function (editable) {
                var _this = this;
                /** @type {?} */
                var isChanged = this._isEditable !== editable;
                this._isEditable = editable;
                if (!isChanged) {
                    return;
                }
                if (this._isEditable) {
                    this._originalPath = this.GetPaths();
                    this._mapService.GetDrawingTools().then(function (t) {
                        t.edit(_this._polygon);
                    });
                }
                else {
                    this._mapService.GetDrawingTools().then(function (t) {
                        t.finish(function (editedPolygon) {
                            if (editedPolygon !== _this._polygon || !_this._editingCompleteEmitter) {
                                return;
                            }
                            /** @type {?} */
                            var newPath = _this.GetPaths();
                            /** @type {?} */
                            var originalPath = _this._originalPath;
                            _this.SetPaths(newPath);
                            // this is necessary for the new path to persist it appears.
                            // this is necessary for the new path to persist it appears.
                            _this._editingCompleteEmitter({
                                Click: null,
                                Polygon: _this,
                                OriginalPath: originalPath,
                                NewPath: newPath
                            });
                        });
                    });
                }
            };
        /**
         * Sets the polygon options
         *
         * \@memberof Polygon
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
        BingPolygon.prototype.SetOptions = /**
         * Sets the polygon options
         *
         * \@memberof Polygon
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = BingConversions.TranslatePolygonOptions(options);
                this._polygon.setOptions(o);
                if (options.visible != null && this._showLabel && this._label) {
                    this._label.Set('hidden', !options.visible);
                }
                if (typeof options.editable !== 'undefined') {
                    this.SetEditable(options.editable);
                }
            };
        /**
         * Sets the polygon path.
         *
         * \@memberof BingPolygon
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
         *
         * @return {?}
         */
        BingPolygon.prototype.SetPath = /**
         * Sets the polygon path.
         *
         * \@memberof BingPolygon
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
         *
         * @return {?}
         */
            function (path) {
                /** @type {?} */
                var p = new Array();
                path.forEach(function (x) { return p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
                this._originalPath = [path];
                this._polygon.setLocations(p);
                if (this._label) {
                    this._centroid = null;
                    this.ManageLabel();
                }
            };
        /**
         * Set the polygon path or paths.
         *
         * \@memberof BingPolygon
         * @param {?} paths
         * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
         *
         * @return {?}
         */
        BingPolygon.prototype.SetPaths = /**
         * Set the polygon path or paths.
         *
         * \@memberof BingPolygon
         * @param {?} paths
         * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
         *
         * @return {?}
         */
            function (paths) {
                if (paths == null) {
                    return;
                }
                if (!Array.isArray(paths)) {
                    return;
                }
                if (paths.length === 0) {
                    this._polygon.setRings(new Array());
                    if (this._label) {
                        this._label.Delete();
                        this._label = null;
                    }
                    return;
                }
                if (Array.isArray(paths[0])) {
                    /** @type {?} */
                    var p_1 = new Array();
                    ((paths)).forEach(function (path) {
                        /** @type {?} */
                        var _p = new Array();
                        path.forEach(function (x) { return _p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
                        p_1.push(_p);
                    });
                    this._originalPath = /** @type {?} */ (paths);
                    this._polygon.setRings(p_1);
                    if (this._label) {
                        this._centroid = null;
                        this.ManageLabel();
                    }
                }
                else {
                    // parameter is a simple array....
                    this.SetPath(/** @type {?} */ (paths));
                }
            };
        /**
         * Sets whether the polygon is visible.
         *
         * \@memberof BingPolygon
         * @param {?} visible - True to set the polygon visible, false otherwise.
         *
         * @return {?}
         */
        BingPolygon.prototype.SetVisible = /**
         * Sets whether the polygon is visible.
         *
         * \@memberof BingPolygon
         * @param {?} visible - True to set the polygon visible, false otherwise.
         *
         * @return {?}
         */
            function (visible) {
                this._polygon.setOptions(/** @type {?} */ ({ visible: visible }));
                if (this._showLabel && this._label) {
                    this._label.Set('hidden', !visible);
                }
            };
        /**
         * Configures the label for the polygon
         * \@memberof Polygon
         * @return {?}
         */
        BingPolygon.prototype.ManageLabel = /**
         * Configures the label for the polygon
         * \@memberof Polygon
         * @return {?}
         */
            function () {
                if (this.GetPath == null || this.GetPath().length === 0) {
                    return;
                }
                if (this._showLabel && this._title != null && this._title !== '') {
                    /** @type {?} */
                    var o = {
                        text: this._title,
                        position: BingConversions.TranslateLocation(this.Centroid)
                    };
                    if (o["position"] == null) {
                        return;
                    }
                    if (this._minZoom !== -1) {
                        o["minZoom"] = this._minZoom;
                    }
                    if (this._maxZoom !== -1) {
                        o["maxZoom"] = this._maxZoom;
                    }
                    if (this._label == null) {
                        this._label = new BingMapLabel(o);
                        this._label.SetMap(this._map);
                    }
                    else {
                        this._label.SetValues(o);
                    }
                    this._label.Set('hidden', !this.GetVisible());
                }
                else {
                    if (this._label) {
                        this._label.SetMap(null);
                        this._label = null;
                    }
                }
            };
        /**
         * Configures the tooltip for the polygon
         * \@memberof Polygon
         * @return {?}
         */
        BingPolygon.prototype.ManageTooltip = /**
         * Configures the tooltip for the polygon
         * \@memberof Polygon
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._showTooltip && this._title != null && this._title !== '') {
                    /** @type {?} */
                    var o = {
                        text: this._title,
                        align: 'left',
                        offset: new Microsoft.Maps.Point(0, 25),
                        backgroundColor: 'bisque',
                        hidden: true,
                        fontSize: 12,
                        fontColor: '#000000',
                        strokeWeight: 0
                    };
                    if (this._tooltip == null) {
                        this._tooltip = new BingMapLabel(o);
                        this._tooltip.SetMap(this._map);
                    }
                    else {
                        this._tooltip.SetValues(o);
                    }
                    if (!this._hasToolTipReceiver) {
                        this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', function (e) {
                            _this._tooltip.Set('position', e.location);
                            if (!_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', false);
                                _this._tooltipVisible = true;
                            }
                            _this._mouseMoveListener = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) {
                                if (_this._tooltipVisible && m.location && m.primitive === _this._polygon) {
                                    _this._tooltip.Set('position', m.location);
                                }
                            });
                        });
                        this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', function (e) {
                            if (_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', true);
                                _this._tooltipVisible = false;
                            }
                            if (_this._mouseMoveListener) {
                                Microsoft.Maps.Events.removeHandler(_this._mouseMoveListener);
                            }
                        });
                        this._hasToolTipReceiver = true;
                    }
                }
                if ((!this._showTooltip || this._title === '' || this._title == null)) {
                    if (this._hasToolTipReceiver) {
                        if (this._mouseOutListener) {
                            Microsoft.Maps.Events.removeHandler(this._mouseOutListener);
                        }
                        if (this._mouseOverListener) {
                            Microsoft.Maps.Events.removeHandler(this._mouseOverListener);
                        }
                        if (this._mouseMoveListener) {
                            Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
                        }
                        this._hasToolTipReceiver = false;
                    }
                    if (this._tooltip) {
                        this._tooltip.SetMap(null);
                        this._tooltip = null;
                    }
                }
            };
        return BingPolygon;
    }(Polygon));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation for a polyline model for Bing Maps V8.
     *
     * @export
     */
    var /**
     * Concrete implementation for a polyline model for Bing Maps V8.
     *
     * @export
     */ BingPolyline = (function (_super) {
        __extends(BingPolyline, _super);
        ///
        /// constructor
        ///
        /**
         * Creates an instance of BingPolygon.
         * @param _polyline - The {@link Microsoft.Maps.Polyline} underlying the model.
         * @param _map - The context map.
         * @param _layer - The context layer.
         * @memberof BingPolyline
         */
        function BingPolyline(_polyline, _map, _layer) {
            var _this = _super.call(this) || this;
            _this._polyline = _polyline;
            _this._map = _map;
            _this._layer = _layer;
            _this._isEditable = true;
            _this._title = '';
            _this._showTooltip = false;
            _this._tooltip = null;
            _this._hasToolTipReceiver = false;
            _this._tooltipVisible = false;
            _this._metadata = new Map();
            return _this;
        }
        Object.defineProperty(BingPolyline.prototype, "Metadata", {
            get: /**
             * Gets the polyline metadata.
             *
             * \@readonly
             * \@memberof BingPolyline
             * @return {?}
             */ function () { return this._metadata; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolyline.prototype, "NativePrimitve", {
            get: /**
             * Gets the Navitve Polyline underlying the model
             *
             * \@readonly
             * \@memberof BingPolyline
             * @return {?}
             */ function () { return this._polyline; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolyline.prototype, "ShowTooltip", {
            get: /**
             * Gets or sets whether to show the tooltip
             *
             * @abstract
             * \@memberof BingPolyline
             * \@property
             * @return {?}
             */ function () { return this._showTooltip; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._showTooltip = val;
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BingPolyline.prototype, "Title", {
            get: /**
             * Gets or sets the title off the polyline
             *
             * @abstract
             * \@memberof BingPolyline
             * \@property
             * @return {?}
             */ function () { return this._title; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._title = val;
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a delegate for an event.
         *
         * \@memberof BingPolyline
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
        BingPolyline.prototype.AddListener = /**
         * Adds a delegate for an event.
         *
         * \@memberof BingPolyline
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
            function (eventType, fn) {
                var _this = this;
                /** @type {?} */
                var supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
                if (supportedEvents.indexOf(eventType) !== -1) {
                    Microsoft.Maps.Events.addHandler(this._polyline, eventType, function (e) {
                        fn(e);
                    });
                }
                if (eventType === 'mousemove') {
                    /** @type {?} */
                    var handlerId_1 = void 0;
                    Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', function (e) {
                        handlerId_1 = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) { return fn(m); });
                    });
                    Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', function (e) {
                        if (handlerId_1) {
                            Microsoft.Maps.Events.removeHandler(handlerId_1);
                        }
                    });
                }
            };
        /**
         * Deleted the polyline.
         *
         * \@memberof BingPolyline
         * @return {?}
         */
        BingPolyline.prototype.Delete = /**
         * Deleted the polyline.
         *
         * \@memberof BingPolyline
         * @return {?}
         */
            function () {
                if (this._layer) {
                    this._layer.remove(this.NativePrimitve);
                }
                else {
                    this._map.entities.remove(this.NativePrimitve);
                }
                if (this._tooltip) {
                    this._tooltip.Delete();
                }
            };
        /**
         * Gets whether the polyline is draggable.
         *
         * \@memberof BingPolyline
         * @return {?} - True if the polyline is dragable, false otherwise.
         *
         */
        BingPolyline.prototype.GetDraggable = /**
         * Gets whether the polyline is draggable.
         *
         * \@memberof BingPolyline
         * @return {?} - True if the polyline is dragable, false otherwise.
         *
         */
            function () {
                return false;
            };
        /**
         * Gets whether the polyline path can be edited.
         *
         * \@memberof BingPolyline
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
        BingPolyline.prototype.GetEditable = /**
         * Gets whether the polyline path can be edited.
         *
         * \@memberof BingPolyline
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
            function () {
                return this._isEditable;
            };
        /**
         * Gets the polyline path.
         *
         * \@memberof BingPolyline
         * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
         *
         */
        BingPolyline.prototype.GetPath = /**
         * Gets the polyline path.
         *
         * \@memberof BingPolyline
         * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
         *
         */
            function () {
                /** @type {?} */
                var p = this._polyline.getLocations();
                /** @type {?} */
                var path = new Array();
                p.forEach(function (l) { return path.push({ latitude: l.latitude, longitude: l.longitude }); });
                return path;
            };
        /**
         * Gets whether the polyline is visible.
         *
         * \@memberof BingPolyline
         * @return {?} - True if the polyline is visible, false otherwise.
         *
         */
        BingPolyline.prototype.GetVisible = /**
         * Gets whether the polyline is visible.
         *
         * \@memberof BingPolyline
         * @return {?} - True if the polyline is visible, false otherwise.
         *
         */
            function () {
                return this._polyline.getVisible();
            };
        /**
         * Sets whether the polyline is dragable.
         *
         * \@memberof BingPolyline
         * @param {?} draggable - True to make the polyline dragable, false otherwise.
         *
         * @return {?}
         */
        BingPolyline.prototype.SetDraggable = /**
         * Sets whether the polyline is dragable.
         *
         * \@memberof BingPolyline
         * @param {?} draggable - True to make the polyline dragable, false otherwise.
         *
         * @return {?}
         */
            function (draggable) {
                throw (new Error('The bing maps implementation currently does not support draggable polylines.'));
            };
        /**
         * Sets wether the polyline path is editable.
         *
         * \@memberof BingPolyline
         * @param {?} editable - True to make polyline path editable, false otherwise.
         *
         * @return {?}
         */
        BingPolyline.prototype.SetEditable = /**
         * Sets wether the polyline path is editable.
         *
         * \@memberof BingPolyline
         * @param {?} editable - True to make polyline path editable, false otherwise.
         *
         * @return {?}
         */
            function (editable) {
                this._isEditable = editable;
            };
        /**
         * Sets the polyline options
         *
         * \@memberof BingPolyline
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
        BingPolyline.prototype.SetOptions = /**
         * Sets the polyline options
         *
         * \@memberof BingPolyline
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = BingConversions.TranslatePolylineOptions(options);
                this._polyline.setOptions(o);
                if (options.path) {
                    this.SetPath(/** @type {?} */ (options.path));
                }
            };
        /**
         * Sets the polyline path.
         *
         * \@memberof BingPolyline
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
         *
         * @return {?}
         */
        BingPolyline.prototype.SetPath = /**
         * Sets the polyline path.
         *
         * \@memberof BingPolyline
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
         *
         * @return {?}
         */
            function (path) {
                /** @type {?} */
                var p = new Array();
                path.forEach(function (x) { return p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
                this._polyline.setLocations(p);
            };
        /**
         * Sets whether the polyline is visible.
         *
         * \@memberof BingPolyline
         * @param {?} visible - True to set the polyline visible, false otherwise.
         *
         * @return {?}
         */
        BingPolyline.prototype.SetVisible = /**
         * Sets whether the polyline is visible.
         *
         * \@memberof BingPolyline
         * @param {?} visible - True to set the polyline visible, false otherwise.
         *
         * @return {?}
         */
            function (visible) {
                this._polyline.setOptions(/** @type {?} */ ({ visible: visible }));
            };
        /**
         * Configures the tooltip for the polygon
         * \@memberof Polygon
         * @return {?}
         */
        BingPolyline.prototype.ManageTooltip = /**
         * Configures the tooltip for the polygon
         * \@memberof Polygon
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._showTooltip && this._title != null && this._title !== '') {
                    /** @type {?} */
                    var o = {
                        text: this._title,
                        align: 'left',
                        offset: new Microsoft.Maps.Point(0, 25),
                        backgroundColor: 'bisque',
                        hidden: true,
                        fontSize: 12,
                        fontColor: '#000000',
                        strokeWeight: 0
                    };
                    if (this._tooltip == null) {
                        this._tooltip = new BingMapLabel(o);
                        this._tooltip.SetMap(this._map);
                    }
                    else {
                        this._tooltip.SetValues(o);
                    }
                    if (!this._hasToolTipReceiver) {
                        this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', function (e) {
                            _this._tooltip.Set('position', e.location);
                            if (!_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', false);
                                _this._tooltipVisible = true;
                            }
                        });
                        this._mouseMoveListener = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', function (e) {
                            if (_this._tooltipVisible && e.location && e.primitive === _this._polyline) {
                                _this._tooltip.Set('position', e.location);
                            }
                        });
                        this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', function (e) {
                            if (_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', true);
                                _this._tooltipVisible = false;
                            }
                        });
                        this._hasToolTipReceiver = true;
                    }
                }
                if ((!this._showTooltip || this._title === '' || this._title == null)) {
                    if (this._hasToolTipReceiver) {
                        if (this._mouseOutListener) {
                            Microsoft.Maps.Events.removeHandler(this._mouseOutListener);
                        }
                        if (this._mouseOverListener) {
                            Microsoft.Maps.Events.removeHandler(this._mouseOverListener);
                        }
                        if (this._mouseMoveListener) {
                            Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
                        }
                        this._hasToolTipReceiver = false;
                    }
                    if (this._tooltip) {
                        this._tooltip.SetMap(null);
                        this._tooltip = null;
                    }
                }
            };
        return BingPolyline;
    }(Polyline));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * This contstant translates the abstract map events into their corresponding bing map
     * equivalents.
      @type {?} */
    var BingMapEventsLookup = {
        click: 'click',
        dblclick: 'dblclick',
        rightclick: 'rightclick',
        resize: 'resize',
        boundschanged: 'viewchangeend',
        centerchanged: 'viewchangeend',
        zoomchanged: 'viewchangeend',
        mouseover: 'mouseover',
        mouseout: 'mouseout',
        mousemove: 'mousemove',
        infowindowclose: 'infoboxChanged'
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementing a canvas overlay to be placed on the map for Bing Maps.
     *
     * @export
     */
    var /**
     * Concrete implementing a canvas overlay to be placed on the map for Bing Maps.
     *
     * @export
     */ BingCanvasOverlay = (function (_super) {
        __extends(BingCanvasOverlay, _super);
        /**
         * Creates a new instance of the BingCanvasOverlay class.
         * @param drawCallback A callback function that is triggered when the canvas is ready to be
         * rendered for the current map view.
         * @memberof BingCanvasOverlay
         */
        function BingCanvasOverlay(drawCallback) {
            return _super.call(this, drawCallback) || this;
        }
        /**
         * Obtains geo coordinates for the click location
         *
         * @abstract
         * \@memberof BingCanvasOverlay
         * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
         */
        BingCanvasOverlay.prototype.GetCoordinatesFromClick = /**
         * Obtains geo coordinates for the click location
         *
         * @abstract
         * \@memberof BingCanvasOverlay
         * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
         */
            function (e) {
                return { latitude: e.location.latitude, longitude: e.location.longitude };
            };
        /**
         * Gets the map associted with the label.
         *
         * \@memberof BingCanvasOverlay
         * \@method
         * @return {?}
         */
        BingCanvasOverlay.prototype.GetMap = /**
         * Gets the map associted with the label.
         *
         * \@memberof BingCanvasOverlay
         * \@method
         * @return {?}
         */
            function () {
                return ((this)).getMap();
            };
        /**
         * Returns a MapLabel instance for the current platform that can be used as a tooltip.
         * This method only generates the map label. Content and placement is the responsibility
         * of the caller. Note that this method returns null until OnLoad has been called.
         *
         * \@memberof BingCanvasOverlay
         * \@method
         * @return {?} - The label to be used for the tooltip.
         */
        BingCanvasOverlay.prototype.GetToolTipOverlay = /**
         * Returns a MapLabel instance for the current platform that can be used as a tooltip.
         * This method only generates the map label. Content and placement is the responsibility
         * of the caller. Note that this method returns null until OnLoad has been called.
         *
         * \@memberof BingCanvasOverlay
         * \@method
         * @return {?} - The label to be used for the tooltip.
         */
            function () {
                /** @type {?} */
                var o = {
                    align: 'left',
                    offset: new Microsoft.Maps.Point(0, 25),
                    backgroundColor: 'bisque',
                    hidden: true,
                    fontSize: 12,
                    fontColor: '#000000',
                    strokeWeight: 0
                };
                /** @type {?} */
                var label = new BingMapLabel(o);
                label.SetMap(this.GetMap());
                return label;
            };
        /**
         * CanvasOverlay loaded, attach map events for updating canvas.
         * @abstract
         * \@method
         * \@memberof BingCanvasOverlay
         * @return {?}
         */
        BingCanvasOverlay.prototype.OnLoad = /**
         * CanvasOverlay loaded, attach map events for updating canvas.
         * @abstract
         * \@method
         * \@memberof BingCanvasOverlay
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var map = ((this)).getMap();
                // Get the current map view information.
                this._zoomStart = map.getZoom();
                this._centerStart = /** @type {?} */ (map.getCenter());
                // Redraw the canvas.
                this.Redraw(true);
                // When the map moves, move the canvas accordingly.
                this._viewChangeEvent = Microsoft.Maps.Events.addHandler(map, 'viewchange', function (e) {
                    if (map.getMapTypeId() === Microsoft.Maps.MapTypeId.streetside) {
                        // Don't show the canvas if the map is in Streetside mode.
                        // Don't show the canvas if the map is in Streetside mode.
                        _this._canvas.style.display = 'none';
                    }
                    else {
                        /** @type {?} */
                        var zoomCurrent = map.getZoom();
                        /** @type {?} */
                        var centerCurrent = map.getCenter();
                        /** @type {?} */
                        var scale = Math.pow(2, zoomCurrent - _this._zoomStart);
                        /** @type {?} */
                        var newWidth = map.getWidth() * scale;
                        /** @type {?} */
                        var newHeight = map.getHeight() * scale;
                        /** @type {?} */
                        var pixelPoints = (map.tryLocationToPixel([
                            BingConversions.TranslateLocation(_this._centerStart),
                            centerCurrent
                        ], Microsoft.Maps.PixelReference.control));
                        /** @type {?} */
                        var centerOffsetX = pixelPoints[1].x - pixelPoints[0].x;
                        /** @type {?} */
                        var centerOffsetY = pixelPoints[1].y - pixelPoints[0].y;
                        /** @type {?} */
                        var x = (-(newWidth - map.getWidth()) / 2) - centerOffsetX;
                        /** @type {?} */
                        var y = (-(newHeight - map.getHeight()) / 2) - centerOffsetY;
                        // Update the canvas CSS position and dimensions.
                        // Update the canvas CSS position and dimensions.
                        _this.UpdatePosition(x, y, newWidth, newHeight);
                    }
                });
                // When the map stops moving, render new data on the canvas.
                this._viewChangeEndEvent = Microsoft.Maps.Events.addHandler(map, 'viewchangeend', function (e) {
                    _this.UpdateCanvas();
                });
                // Update the position of the overlay when the map is resized.
                this._mapResizeEvent = Microsoft.Maps.Events.addHandler(map, 'mapresize', function (e) {
                    _this.UpdateCanvas();
                });
                // set the overlay to ready state
                this._readyResolver(true);
            };
        /**
         * Sets the map for the label. Settings this to null remove the label from hte map.
         *
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} map - Map to associated with the label.
         * @return {?}
         */
        BingCanvasOverlay.prototype.SetMap = /**
         * Sets the map for the label. Settings this to null remove the label from hte map.
         *
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} map - Map to associated with the label.
         * @return {?}
         */
            function (map) {
                /** @type {?} */
                var m = this.GetMap();
                if (map === m) {
                    return;
                }
                if (m) {
                    m.layers.remove(this);
                }
                if (map != null) {
                    map.layers.insert(this);
                }
            };
        ///
        /// Protected methods
        ///
        /**
         * Attaches the canvas to the map.
         * @memberof CanvasOverlay
         * @method
         */
        /**
         * Attaches the canvas to the map.
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} el
         * @return {?}
         */
        BingCanvasOverlay.prototype.SetCanvasElement = /**
         * Attaches the canvas to the map.
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} el
         * @return {?}
         */
            function (el) {
                ((this)).setHtmlElement(el);
            };
        /**
         * Remove the map event handlers.
         * @memberof CanvasOverlay
         * @method
         * @protected
         */
        /**
         * Remove the map event handlers.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
        BingCanvasOverlay.prototype.RemoveEventHandlers = /**
         * Remove the map event handlers.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                // Remove all event handlers from the map.
                Microsoft.Maps.Events.removeHandler(this._viewChangeEvent);
                Microsoft.Maps.Events.removeHandler(this._viewChangeEndEvent);
                Microsoft.Maps.Events.removeHandler(this._mapResizeEvent);
            };
        /**
         * Updates the Canvas size based on the map size.
         * @memberof CanvasOverlay
         * @method
         * @protected
         */
        /**
         * Updates the Canvas size based on the map size.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
        BingCanvasOverlay.prototype.Resize = /**
         * Updates the Canvas size based on the map size.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                /** @type {?} */
                var map = ((this)).getMap();
                // Clear canvas by updating dimensions. This also ensures canvas stays the same size as the map.
                this._canvas.width = map.getWidth();
                this._canvas.height = map.getHeight();
            };
        /**
         * Updates the Canvas.
         * @memberof CanvasOverlay
         * @method
         * @protected
         */
        /**
         * Updates the Canvas.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
        BingCanvasOverlay.prototype.UpdateCanvas = /**
         * Updates the Canvas.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                /** @type {?} */
                var map = ((this)).getMap();
                // Only render the canvas if it isn't in streetside mode.
                if (map.getMapTypeId() !== Microsoft.Maps.MapTypeId.streetside) {
                    this._canvas.style.display = '';
                    // Reset CSS position and dimensions of canvas.
                    this.UpdatePosition(0, 0, map.getWidth(), map.getHeight());
                    // Redraw the canvas.
                    this.Redraw(true);
                    // Get the current map view information.
                    this._zoomStart = map.getZoom();
                    this._centerStart = /** @type {?} */ (map.getCenter());
                }
            };
        return BingCanvasOverlay;
    }(CanvasOverlay));
    /**
     * Helper function to extend the OverlayView into the CanvasOverlay
     *
     * @export
     * \@method
     * @return {?}
     */
    function MixinCanvasOverlay() {
        new Extender(BingCanvasOverlay)
            .Extend(new Microsoft.Maps.CustomOverlay())
            .Map('onAdd', 'OnAdd')
            .Map('onLoad', 'OnLoad')
            .Map('onRemove', 'OnRemove');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var MapTypeId$1 = {
        /** This map type displays a transparent layer of major streets on satellite images. */
        hybrid: 0,
        /** This map type displays a normal street map. */
        roadmap: 1,
        /** This map type displays satellite images. */
        satellite: 2,
        /** This map type displays maps with physical features such as terrain and vegetation. */
        terrain: 3,
    };
    MapTypeId$1[MapTypeId$1.hybrid] = 'hybrid';
    MapTypeId$1[MapTypeId$1.roadmap] = 'roadmap';
    MapTypeId$1[MapTypeId$1.satellite] = 'satellite';
    MapTypeId$1[MapTypeId$1.terrain] = 'terrain';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This class contains helperfunctions to map various interfaces used to represent options and structures into the
     * corresponding Google Maps specific implementations.
     *
     * @export
     */
    var GoogleConversions = (function () {
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
                        o.content = ((options))[k];
                    }
                    else {
                        o[k] = ((options))[k];
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
                    case MapTypeId.road: return MapTypeId$1[MapTypeId$1.roadmap];
                    case MapTypeId.grayscale: return MapTypeId$1[MapTypeId$1.terrain];
                    case MapTypeId.hybrid: return MapTypeId$1[MapTypeId$1.hybrid];
                    case MapTypeId.ordnanceSurvey: return MapTypeId$1[MapTypeId$1.terrain];
                    default: return MapTypeId$1[MapTypeId$1.satellite];
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
                        o[k] = ((options))[k];
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
                        o.styles = /** @type {?} */ ((options.customMapStyleGoogle));
                    }
                    else {
                        ((o))[k] = ((options))[k];
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
                    var p1 = (paths);
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
                            var p1 = (options.paths);
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
                            var p1 = (options.paths);
                            for (var i = 0; i < p1.length; i++) {
                                o.paths[i] = { lat: p1[i].latitude, lng: p1[i].longitude };
                            }
                        }
                    }
                    else {
                        o[k] = ((options))[k];
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
                    o[k] = ((options))[k];
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
     *
     * @export
     */
    var /**
     * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
     *
     * @export
     */ GoogleInfoWindow = (function () {
        ///
        /// constructor
        ///
        /**
         * Creates an instance of GoogleInfoWindow.
         * @param _infoWindow - A {@link GoogleMapTypes.InfoWindow} instance underlying the model.
         * @param _mapService - An instance of the {@link GoogleMapService}.
         * @memberof GoogleInfoWindow
         */
        function GoogleInfoWindow(_infoWindow, _mapService) {
            this._infoWindow = _infoWindow;
            this._mapService = _mapService;
        }
        Object.defineProperty(GoogleInfoWindow.prototype, "IsOpen", {
            get: /**
             * Gets whether the info box is currently open.
             *
             * \@readonly
             * \@memberof InfoWGoogleInfoWindowindow
             * @return {?}
             */ function () {
                if (this._isOpen === true) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleInfoWindow.prototype, "NativePrimitve", {
            get: /**
             * Gets the underlying native object.
             *
             * \@property
             * \@readonly
             * @return {?}
             */ function () {
                return this._infoWindow;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener to the InfoWindow.
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
        GoogleInfoWindow.prototype.AddListener = /**
         * Adds an event listener to the InfoWindow.
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                var _this = this;
                this._infoWindow.addListener(eventType, function (e) {
                    if (eventType === 'closeclick') {
                        _this._isOpen = false;
                    }
                    fn(e);
                });
            };
        /**
         *
         * Closes the info window.
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @return {?}
         */
        GoogleInfoWindow.prototype.Close = /**
         *
         * Closes the info window.
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @return {?}
         */
            function () {
                this._isOpen = false;
                this._infoWindow.close();
            };
        /**
         * Gets the position of the info window
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @return {?} - The geo coordinates of the info window.
         *
         */
        GoogleInfoWindow.prototype.GetPosition = /**
         * Gets the position of the info window
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @return {?} - The geo coordinates of the info window.
         *
         */
            function () {
                return GoogleConversions.TranslateLatLngObject(this._infoWindow.getPosition());
            };
        /**
         * Opens the info window
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?=} anchor
         * @return {?}
         */
        GoogleInfoWindow.prototype.Open = /**
         * Opens the info window
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?=} anchor
         * @return {?}
         */
            function (anchor) {
                var _this = this;
                this._mapService.MapPromise.then(function (m) {
                    _this._isOpen = true;
                    _this._infoWindow.open(m, anchor);
                });
            };
        /**
         * Sets the info window options
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?} options - The options to set. This object will be merged with the existing options.
         *
         * @return {?}
         */
        GoogleInfoWindow.prototype.SetOptions = /**
         * Sets the info window options
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?} options - The options to set. This object will be merged with the existing options.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = GoogleConversions.TranslateInfoWindowOptions(options);
                this._infoWindow.setOptions(o);
            };
        /**
         * Sets the info window position
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?} position - Geo coordinates at which to anchor the info window.
         *
         * @return {?}
         */
        GoogleInfoWindow.prototype.SetPosition = /**
         * Sets the info window position
         *
         * \@memberof GoogleInfoWindow
         * \@method
         * @param {?} position - Geo coordinates at which to anchor the info window.
         *
         * @return {?}
         */
            function (position) {
                /** @type {?} */
                var l = GoogleConversions.TranslateLocation(position);
                this._infoWindow.setPosition(l);
            };
        return GoogleInfoWindow;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
     *
     * @export
     */
    var /**
     * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
     *
     * @export
     */ GoogleMarker = (function () {
        ///
        /// Constructors
        ///
        /**
         * Creates an instance of GoogleMarker.
         * @param _marker
         *
         * @memberof GoogleMarker
         */
        function GoogleMarker(_marker) {
            this._marker = _marker;
            this._metadata = new Map();
            this._isFirst = false;
            this._isLast = true;
        }
        Object.defineProperty(GoogleMarker.prototype, "IsFirst", {
            get: /**
             * Indicates that the marker is the first marker in a set.
             *
             * \@memberof Marker
             * @return {?}
             */ function () { return this._isFirst; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._isFirst = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleMarker.prototype, "IsLast", {
            get: /**
             * Indicates that the marker is the last marker in the set.
             *
             * \@memberof Marker
             * @return {?}
             */ function () { return this._isLast; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._isLast = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleMarker.prototype, "Metadata", {
            get: /**
             * Gets the marker metadata.
             *
             * \@readonly
             * \@memberof BingMarker
             * @return {?}
             */ function () { return this._metadata; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleMarker.prototype, "NativePrimitve", {
            get: /**
             * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
             *
             * \@readonly
             * @abstract
             * \@memberof BingMarker
             * @return {?}
             */ function () { return this._marker; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleMarker.prototype, "Location", {
            get: /**
             * Gets the Location of the marker
             *
             * \@readonly
             * @abstract
             * \@memberof BingMarker
             * @return {?}
             */ function () {
                /** @type {?} */
                var l = this._marker.getPosition();
                return {
                    latitude: l.lat(),
                    longitude: l.lng()
                };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener to the marker.
         *
         * \@memberof GoogleMarker
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
        GoogleMarker.prototype.AddListener = /**
         * Adds an event listener to the marker.
         *
         * \@memberof GoogleMarker
         * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
         * @param {?} fn - Delegate invoked when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                this._marker.addListener(eventType, fn);
            };
        /**
         * Deletes the marker.
         *
         *
         * \@memberof GoogleMarker
         * @return {?}
         */
        GoogleMarker.prototype.DeleteMarker = /**
         * Deletes the marker.
         *
         *
         * \@memberof GoogleMarker
         * @return {?}
         */
            function () {
                this._marker.setMap(null);
            };
        /**
         * Gets the marker label
         *
         * \@memberof GoogleMarker
         * @return {?}
         */
        GoogleMarker.prototype.GetLabel = /**
         * Gets the marker label
         *
         * \@memberof GoogleMarker
         * @return {?}
         */
            function () {
                return this._marker.getLabel().text;
            };
        /**
         * Gets whether the marker is visible.
         *
         * \@memberof GoogleMarker
         * @return {?} - True if the marker is visible, false otherwise.
         *
         */
        GoogleMarker.prototype.GetVisible = /**
         * Gets whether the marker is visible.
         *
         * \@memberof GoogleMarker
         * @return {?} - True if the marker is visible, false otherwise.
         *
         */
            function () {
                return this._marker.getVisible();
            };
        /**
         * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
         *
         * \@memberof GoogleMarker
         * @param {?} anchor - Point coordinates for the marker anchor.
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetAnchor = /**
         * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
         *
         * \@memberof GoogleMarker
         * @param {?} anchor - Point coordinates for the marker anchor.
         *
         * @return {?}
         */
            function (anchor) {
                // not implemented
                // TODO: we need to switch the model to complex icons for google to
                // support anchors, sizes and origins.
                // https://developers.google.com/maps/documentation/javascript/markers
            };
        /**
         * Sets the draggability of a marker.
         *
         * \@memberof GoogleMarker
         * @param {?} draggable - True to mark the marker as draggable, false otherwise.
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetDraggable = /**
         * Sets the draggability of a marker.
         *
         * \@memberof GoogleMarker
         * @param {?} draggable - True to mark the marker as draggable, false otherwise.
         *
         * @return {?}
         */
            function (draggable) {
                this._marker.setDraggable(draggable);
            };
        /**
         * Sets the icon for the marker.
         *
         * \@memberof GoogleMarker
         * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetIcon = /**
         * Sets the icon for the marker.
         *
         * \@memberof GoogleMarker
         * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
         *
         * @return {?}
         */
            function (icon) {
                this._marker.setIcon(icon);
            };
        /**
         * Sets the marker label.
         *
         * \@memberof GoogleMarker
         * @param {?} label - String containing the label to set.
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetLabel = /**
         * Sets the marker label.
         *
         * \@memberof GoogleMarker
         * @param {?} label - String containing the label to set.
         *
         * @return {?}
         */
            function (label) {
                this._marker.setLabel(label);
            };
        /**
         * Sets the marker position.
         *
         * \@memberof GoogleMarker
         * @param {?} latLng - Geo coordinates to set the marker position to.
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetPosition = /**
         * Sets the marker position.
         *
         * \@memberof GoogleMarker
         * @param {?} latLng - Geo coordinates to set the marker position to.
         *
         * @return {?}
         */
            function (latLng) {
                /** @type {?} */
                var p = GoogleConversions.TranslateLocationObject(latLng);
                this._marker.setPosition(p);
            };
        /**
         * Sets the marker title.
         *
         * \@memberof GoogleMarker
         * @param {?} title - String containing the title to set.
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetTitle = /**
         * Sets the marker title.
         *
         * \@memberof GoogleMarker
         * @param {?} title - String containing the title to set.
         *
         * @return {?}
         */
            function (title) {
                this._marker.setTitle(title);
            };
        /**
         * Sets the marker options.
         *
         * \@memberof GoogleMarker
         * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
         * merged with the underlying marker options.
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetOptions = /**
         * Sets the marker options.
         *
         * \@memberof GoogleMarker
         * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
         * merged with the underlying marker options.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = GoogleConversions.TranslateMarkerOptions(options);
                this._marker.setOptions(o);
            };
        /**
         * Sets whether the marker is visible.
         *
         * \@memberof GoogleMarker
         * @param {?} visible - True to set the marker visible, false otherwise.
         *
         * @return {?}
         */
        GoogleMarker.prototype.SetVisible = /**
         * Sets whether the marker is visible.
         *
         * \@memberof GoogleMarker
         * @param {?} visible - True to set the marker visible, false otherwise.
         *
         * @return {?}
         */
            function (visible) {
                this._marker.setVisible(visible);
            };
        return GoogleMarker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Implements map a labled to be placed on the map.
     *
     * @export
     */
    var /**
     * Implements map a labled to be placed on the map.
     *
     * @export
     */ GoogleMapLabel = (function (_super) {
        __extends(GoogleMapLabel, _super);
        ///
        /// Constructor
        ///
        /**
         * Creates a new MapLabel
         * @param options Optional properties to set.
         */
        function GoogleMapLabel(options) {
            var _this = this;
            options["fontSize"] = options["fontSize"] || 12;
            options["fontColor"] = options["fontColor"] || '#ffffff';
            options["strokeWeight"] = options["strokeWeight"] || 3;
            options["strokeColor"] = options["strokeColor"] || '#000000';
            _this = _super.call(this, options) || this;
            return _this;
        }
        Object.defineProperty(GoogleMapLabel.prototype, "DefaultLabelStyle", {
            get: /**
             * Returns the default label style for the platform
             *
             * \@readonly
             * @abstract
             * \@memberof GoogleMapLabel
             * @return {?}
             */ function () {
                return {
                    fontSize: 12,
                    fontFamily: 'sans-serif',
                    fontColor: '#ffffff',
                    strokeWeight: 3,
                    strokeColor: '#000000'
                };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets the value of a setting.
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @return {?} - The value of the setting.
         */
        GoogleMapLabel.prototype.Get = /**
         * Gets the value of a setting.
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @return {?} - The value of the setting.
         */
            function (key) {
                return ((this)).get(key);
            };
        /**
         * Gets the map associted with the label.
         *
         * \@memberof GoogleMapLabel
         * \@method
         * @return {?}
         */
        GoogleMapLabel.prototype.GetMap = /**
         * Gets the map associted with the label.
         *
         * \@memberof GoogleMapLabel
         * \@method
         * @return {?}
         */
            function () {
                return ((this)).getMap();
            };
        /**
         * Set the value for a setting.
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @param {?} val - The value to set.
         * @return {?}
         */
        GoogleMapLabel.prototype.Set = /**
         * Set the value for a setting.
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} key - Key specifying the setting.
         * @param {?} val - The value to set.
         * @return {?}
         */
            function (key, val) {
                if (key === 'position' && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
                    val = new google.maps.LatLng(val.latitude, val.longitude);
                }
                if (this.Get(key) !== val) {
                    ((this)).set(key, val);
                }
            };
        /**
         * Sets the map for the label. Settings this to null remove the label from hte map.
         *
         * \@memberof GoogleMapLabel
         * \@method
         * @param {?} map - Map to associated with the label.
         * @return {?}
         */
        GoogleMapLabel.prototype.SetMap = /**
         * Sets the map for the label. Settings this to null remove the label from hte map.
         *
         * \@memberof GoogleMapLabel
         * \@method
         * @param {?} map - Map to associated with the label.
         * @return {?}
         */
            function (map) {
                ((this)).setMap(map);
            };
        /**
         * Applies settings to the object
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} options - An object containing the settings key value pairs.
         * @return {?}
         */
        GoogleMapLabel.prototype.SetValues = /**
         * Applies settings to the object
         *
         * \@memberof MapLabel
         * \@method
         * @param {?} options - An object containing the settings key value pairs.
         * @return {?}
         */
            function (options) {
                for (var key in options) {
                    if (key !== '') {
                        if (key === 'position' && options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                            options[key] = new google.maps.LatLng(options[key].latitude, options[key].longitude);
                        }
                        if (this.Get(key) === options[key]) {
                            delete options[key];
                        }
                    }
                }
                ((this)).setValues(options);
            };
        ///
        /// Protected methods
        ///
        /**
         * Draws the label on the map.
         * @memberof GoogleMapLabel
         * @method
         * @protected
         */
        /**
         * Draws the label on the map.
         * \@memberof GoogleMapLabel
         * \@method
         * @protected
         * @return {?}
         */
        GoogleMapLabel.prototype.Draw = /**
         * Draws the label on the map.
         * \@memberof GoogleMapLabel
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                /** @type {?} */
                var projection = ((this)).getProjection();
                /** @type {?} */
                var visibility = this.GetVisible();
                if (!projection) {
                    // The map projection is not ready yet so do nothing
                    return;
                }
                if (!this._canvas) {
                    // onAdd has not been called yet.
                    return;
                }
                /** @type {?} */
                var style = this._canvas.style;
                if (visibility !== '') {
                    // label is not visible, don't calculate positions etc.
                    style['visibility'] = visibility;
                    return;
                }
                /** @type {?} */
                var offset = this.Get('offset');
                /** @type {?} */
                var latLng = this.Get('position');
                if (!latLng) {
                    return;
                }
                if (!(latLng instanceof google.maps.LatLng)) {
                    latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
                }
                if (!offset) {
                    offset = new google.maps.Point(0, 0);
                }
                /** @type {?} */
                var pos = projection.fromLatLngToDivPixel(latLng);
                style['top'] = (pos.y + offset.y) + 'px';
                style['left'] = (pos.x + offset.x) + 'px';
                style['visibility'] = visibility;
            };
        /**
         * Delegate called when the label is added to the map. Generates and configures
         * the canvas.
         *
         * @memberof GoogleMapLabel
         * @method
         * @protected
         */
        /**
         * Delegate called when the label is added to the map. Generates and configures
         * the canvas.
         *
         * \@memberof GoogleMapLabel
         * \@method
         * @protected
         * @return {?}
         */
        GoogleMapLabel.prototype.OnAdd = /**
         * Delegate called when the label is added to the map. Generates and configures
         * the canvas.
         *
         * \@memberof GoogleMapLabel
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                this._canvas = document.createElement('canvas');
                /** @type {?} */
                var style = this._canvas.style;
                style.position = 'absolute';
                /** @type {?} */
                var ctx = this._canvas.getContext('2d');
                ctx.lineJoin = 'round';
                ctx.textBaseline = 'top';
                this.DrawCanvas();
                /** @type {?} */
                var panes = ((this)).getPanes();
                if (panes) {
                    panes.overlayLayer.appendChild(this._canvas);
                    // 4: floatPane (infowindow)
                    // 3: overlayMouseTarget (mouse events)
                    // 2: markerLayer (marker images)
                    // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
                    // 0: mapPane (lowest pane above the map tiles)
                }
            };
        return GoogleMapLabel;
    }(MapLabel));
    /**
     * Helper function to extend the OverlayView into the MapLabel
     *
     * @export
     * \@method
     * @return {?}
     */
    function MixinMapLabelWithOverlayView$1() {
        new Extender(GoogleMapLabel)
            .Extend(new google.maps.OverlayView)
            .Map('changed', 'Changed')
            .Map('onAdd', 'OnAdd')
            .Map('draw', 'Draw')
            .Map('onRemove', 'OnRemove');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation for a polygon model for Google Maps.
     *
     * @export
     */
    var /**
     * Concrete implementation for a polygon model for Google Maps.
     *
     * @export
     */ GooglePolygon = (function (_super) {
        __extends(GooglePolygon, _super);
        ///
        /// constructor
        ///
        /**
         * Creates an instance of GooglePolygon.
         * @param _polygon - The {@link GoogleMapTypes.Polygon} underlying the model.
         *
         * @memberof GooglePolygon
         */
        function GooglePolygon(_polygon) {
            var _this = _super.call(this) || this;
            _this._polygon = _polygon;
            _this._title = '';
            _this._showLabel = false;
            _this._showTooltip = false;
            _this._maxZoom = -1;
            _this._minZoom = -1;
            _this._label = null;
            _this._tooltip = null;
            _this._tooltipVisible = false;
            _this._hasToolTipReceiver = false;
            _this._mouseOverListener = null;
            _this._mouseOutListener = null;
            _this._mouseMoveListener = null;
            _this._metadata = new Map();
            _this._editingCompleteEmitter = null;
            _this._originalPath = _this.GetPaths();
            return _this;
        }
        Object.defineProperty(GooglePolygon.prototype, "LabelMaxZoom", {
            get: /**
             * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
             *
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._maxZoom; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._maxZoom = val;
                this.ManageLabel();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolygon.prototype, "LabelMinZoom", {
            get: /**
             * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
             *
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._minZoom; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._minZoom = val;
                this.ManageLabel();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolygon.prototype, "Metadata", {
            get: /**
             * Gets the polygon metadata.
             *
             * \@readonly
             * \@memberof GoolePolygon
             * @return {?}
             */ function () { return this._metadata; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolygon.prototype, "NativePrimitve", {
            get: /**
             * Gets the native primitve implementing the polygon, in this case {\@link GoogleMapTypes.Polygon}
             *
             * \@readonly
             * \@memberof GooglePolygon
             * @return {?}
             */ function () { return this._polygon; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolygon.prototype, "ShowLabel", {
            get: /**
             * Gets or sets whether to show the label
             *
             * @abstract
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._showLabel; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._showLabel = val;
                this.ManageLabel();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolygon.prototype, "ShowTooltip", {
            get: /**
             * Gets or sets whether to show the tooltip
             *
             * @abstract
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._showTooltip; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._showTooltip = val;
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolygon.prototype, "Title", {
            get: /**
             * Gets or sets the title off the polygon
             *
             * @abstract
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._title; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._title = val;
                this.ManageLabel();
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a delegate for an event.
         *
         * \@memberof GooglePolygon
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
        GooglePolygon.prototype.AddListener = /**
         * Adds a delegate for an event.
         *
         * \@memberof GooglePolygon
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
            function (eventType, fn) {
                /** @type {?} */
                var supportedEvents = [
                    'click',
                    'dblclick',
                    'drag', 'dragend',
                    'dragstart',
                    'mousedown',
                    'mousemove',
                    'mouseout',
                    'mouseover',
                    'mouseup',
                    'rightclick'
                ];
                if (supportedEvents.indexOf(eventType) !== -1) {
                    this._polygon.addListener(eventType, fn);
                }
                if (eventType === 'pathchanged') {
                    this._editingCompleteEmitter = /** @type {?} */ (fn);
                }
            };
        /**
         * Deleted the polygon.
         *
         * \@memberof GooglePolygon
         * @return {?}
         */
        GooglePolygon.prototype.Delete = /**
         * Deleted the polygon.
         *
         * \@memberof GooglePolygon
         * @return {?}
         */
            function () {
                this._polygon.setMap(null);
                if (this._label) {
                    this._label.Delete();
                }
                if (this._tooltip) {
                    this._tooltip.Delete();
                }
            };
        /**
         * Gets whether the polygon is draggable.
         *
         * \@memberof GooglePolygon
         * @return {?} - True if the polygon is dragable, false otherwise.
         *
         */
        GooglePolygon.prototype.GetDraggable = /**
         * Gets whether the polygon is draggable.
         *
         * \@memberof GooglePolygon
         * @return {?} - True if the polygon is dragable, false otherwise.
         *
         */
            function () {
                return this._polygon.getDraggable();
            };
        /**
         * Gets whether the polygon path can be edited.
         *
         * \@memberof GooglePolygon
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
        GooglePolygon.prototype.GetEditable = /**
         * Gets whether the polygon path can be edited.
         *
         * \@memberof GooglePolygon
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
            function () {
                return this._polygon.getEditable();
            };
        /**
         * Gets the polygon path.
         *
         * \@memberof GooglePolygon
         * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
         *
         */
        GooglePolygon.prototype.GetPath = /**
         * Gets the polygon path.
         *
         * \@memberof GooglePolygon
         * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
         *
         */
            function () {
                /** @type {?} */
                var p = this._polygon.getPath();
                /** @type {?} */
                var path = new Array();
                p.forEach(function (x) { return path.push({ latitude: x.lat(), longitude: x.lng() }); });
                return path;
            };
        /**
         * Gets the polygon paths.
         *
         * \@memberof GooglePolygon
         * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
         *
         */
        GooglePolygon.prototype.GetPaths = /**
         * Gets the polygon paths.
         *
         * \@memberof GooglePolygon
         * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
         *
         */
            function () {
                /** @type {?} */
                var p = this._polygon.getPaths();
                /** @type {?} */
                var paths = new Array();
                p.forEach(function (x) {
                    /** @type {?} */
                    var path = new Array();
                    x.forEach(function (y) { return path.push({ latitude: y.lat(), longitude: y.lng() }); });
                    paths.push(path);
                });
                return paths;
            };
        /**
         * Gets whether the polygon is visible.
         *
         * \@memberof GooglePolygon
         * @return {?} - True if the polygon is visible, false otherwise.
         *
         */
        GooglePolygon.prototype.GetVisible = /**
         * Gets whether the polygon is visible.
         *
         * \@memberof GooglePolygon
         * @return {?} - True if the polygon is visible, false otherwise.
         *
         */
            function () {
                return this._polygon.getVisible();
            };
        /**
         * Sets whether the polygon is dragable.
         *
         * \@memberof GooglePolygon
         * @param {?} draggable - True to make the polygon dragable, false otherwise.
         *
         * @return {?}
         */
        GooglePolygon.prototype.SetDraggable = /**
         * Sets whether the polygon is dragable.
         *
         * \@memberof GooglePolygon
         * @param {?} draggable - True to make the polygon dragable, false otherwise.
         *
         * @return {?}
         */
            function (draggable) {
                this._polygon.setDraggable(draggable);
            };
        /**
         * Sets wether the polygon path is editable.
         *
         * \@memberof GooglePolygon
         * @param {?} editable - True to make polygon path editable, false otherwise.
         *
         * @return {?}
         */
        GooglePolygon.prototype.SetEditable = /**
         * Sets wether the polygon path is editable.
         *
         * \@memberof GooglePolygon
         * @param {?} editable - True to make polygon path editable, false otherwise.
         *
         * @return {?}
         */
            function (editable) {
                /** @type {?} */
                var previous = this._polygon.getEditable();
                this._polygon.setEditable(editable);
                if (previous && !editable && this._editingCompleteEmitter) {
                    this._editingCompleteEmitter({
                        Click: null,
                        Polygon: this,
                        OriginalPath: this._originalPath,
                        NewPath: this.GetPaths()
                    });
                    this._originalPath = this.GetPaths();
                }
            };
        /**
         * Sets the polygon options
         *
         * \@memberof GooglePolygon
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
        GooglePolygon.prototype.SetOptions = /**
         * Sets the polygon options
         *
         * \@memberof GooglePolygon
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = GoogleConversions.TranslatePolygonOptions(options);
                if (typeof o.editable !== 'undefined') {
                    this.SetEditable(o.editable);
                    delete o.editable;
                }
                this._polygon.setOptions(o);
                if (options.visible != null && this._showLabel && this._label) {
                    this._label.Set('hidden', !options.visible);
                }
            };
        /**
         * Sets the polygon path.
         *
         * \@memberof GooglePolygon
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
         *
         * @return {?}
         */
        GooglePolygon.prototype.SetPath = /**
         * Sets the polygon path.
         *
         * \@memberof GooglePolygon
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
         *
         * @return {?}
         */
            function (path) {
                /** @type {?} */
                var p = new Array();
                path.forEach(function (x) { return p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
                this._polygon.setPath(p);
                this._originalPath = [path];
                if (this._label) {
                    this._centroid = null;
                    this.ManageLabel();
                }
            };
        /**
         * Set the polygon path or paths.
         *
         * \@memberof GooglePolygon
         * @param {?} paths An Array of {\@link ILatLong}
         * (or array of arrays) describing the polygons path(s).
         *
         * @return {?}
         */
        GooglePolygon.prototype.SetPaths = /**
         * Set the polygon path or paths.
         *
         * \@memberof GooglePolygon
         * @param {?} paths An Array of {\@link ILatLong}
         * (or array of arrays) describing the polygons path(s).
         *
         * @return {?}
         */
            function (paths) {
                if (paths == null) {
                    return;
                }
                if (!Array.isArray(paths)) {
                    return;
                }
                if (paths.length === 0) {
                    this._polygon.setPaths(new Array());
                    if (this._label) {
                        this._label.Delete();
                        this._label = null;
                    }
                    return;
                }
                if (Array.isArray(paths[0])) {
                    /** @type {?} */
                    var p_1 = new Array();
                    ((paths)).forEach(function (path) {
                        /** @type {?} */
                        var _p = new Array();
                        path.forEach(function (x) { return _p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
                        p_1.push(_p);
                    });
                    this._polygon.setPaths(p_1);
                    this._originalPath = /** @type {?} */ (paths);
                    if (this._label) {
                        this._centroid = null;
                        this.ManageLabel();
                    }
                }
                else {
                    // parameter is a simple array....
                    this.SetPath(/** @type {?} */ (paths));
                }
            };
        /**
         * Sets whether the polygon is visible.
         *
         * \@memberof GooglePolygon
         * @param {?} visible - True to set the polygon visible, false otherwise.
         *
         * @return {?}
         */
        GooglePolygon.prototype.SetVisible = /**
         * Sets whether the polygon is visible.
         *
         * \@memberof GooglePolygon
         * @param {?} visible - True to set the polygon visible, false otherwise.
         *
         * @return {?}
         */
            function (visible) {
                this._polygon.setVisible(visible);
                if (this._showLabel && this._label) {
                    this._label.Set('hidden', !visible);
                }
            };
        /**
         * Configures the label for the polygon
         * \@memberof GooglePolygon
         * @return {?}
         */
        GooglePolygon.prototype.ManageLabel = /**
         * Configures the label for the polygon
         * \@memberof GooglePolygon
         * @return {?}
         */
            function () {
                if (this.GetPath == null || this.GetPath().length === 0) {
                    return;
                }
                if (this._showLabel && this._title != null && this._title !== '') {
                    /** @type {?} */
                    var o = {
                        text: this._title,
                        position: GoogleConversions.TranslateLocationObject(this.Centroid)
                    };
                    if (o["position"] == null) {
                        return;
                    }
                    if (this._minZoom !== -1) {
                        o["minZoom"] = this._minZoom;
                    }
                    if (this._maxZoom !== -1) {
                        o["maxZoom"] = this._maxZoom;
                    }
                    if (this._label == null) {
                        o["map"] = this.NativePrimitve.getMap();
                        o["zIndex"] = this.NativePrimitve.zIndex ? this.NativePrimitve.zIndex + 1 : 100;
                        this._label = new GoogleMapLabel(o);
                    }
                    else {
                        this._label.SetValues(o);
                    }
                    this._label.Set('hidden', !this.GetVisible());
                }
                else {
                    if (this._label) {
                        this._label.SetMap(null);
                        this._label = null;
                    }
                }
            };
        /**
         * Configures the tooltip for the polygon
         * \@memberof GooglePolygon
         * @return {?}
         */
        GooglePolygon.prototype.ManageTooltip = /**
         * Configures the tooltip for the polygon
         * \@memberof GooglePolygon
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._showTooltip && this._title != null && this._title !== '') {
                    /** @type {?} */
                    var o = {
                        text: this._title,
                        align: 'left',
                        offset: new google.maps.Point(0, 25),
                        backgroundColor: 'bisque',
                        hidden: true,
                        fontSize: 12,
                        fontColor: '#000000',
                        strokeWeight: 0
                    };
                    if (this._tooltip == null) {
                        o["map"] = this.NativePrimitve.getMap();
                        o["zIndex"] = 100000;
                        this._tooltip = new GoogleMapLabel(o);
                    }
                    else {
                        this._tooltip.SetValues(o);
                    }
                    if (!this._hasToolTipReceiver) {
                        this._mouseOverListener = this.NativePrimitve.addListener('mouseover', function (e) {
                            _this._tooltip.Set('position', e.latLng);
                            if (!_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', false);
                                _this._tooltipVisible = true;
                            }
                        });
                        this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', function (e) {
                            if (_this._tooltipVisible) {
                                _this._tooltip.Set('position', e.latLng);
                            }
                        });
                        this._mouseOutListener = this.NativePrimitve.addListener('mouseout', function (e) {
                            if (_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', true);
                                _this._tooltipVisible = false;
                            }
                        });
                        this._hasToolTipReceiver = true;
                    }
                }
                if ((!this._showTooltip || this._title === '' || this._title == null)) {
                    if (this._hasToolTipReceiver) {
                        if (this._mouseOutListener) {
                            google.maps.event.removeListener(this._mouseOutListener);
                        }
                        if (this._mouseOverListener) {
                            google.maps.event.removeListener(this._mouseOverListener);
                        }
                        if (this._mouseMoveListener) {
                            google.maps.event.removeListener(this._mouseMoveListener);
                        }
                        this._hasToolTipReceiver = false;
                    }
                    if (this._tooltip) {
                        this._tooltip.SetMap(null);
                        this._tooltip = null;
                    }
                }
            };
        return GooglePolygon;
    }(Polygon));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation for a polyline model for Google Maps.
     *
     * @export
     */
    var /**
     * Concrete implementation for a polyline model for Google Maps.
     *
     * @export
     */ GooglePolyline = (function (_super) {
        __extends(GooglePolyline, _super);
        ///
        /// constructor
        ///
        /**
        * Creates an instance of GooglePolygon.
        * @param _polyline - The {@link GoogleMApTypes.Polyline} underlying the model.
        *
        * @memberof GooglePolyline
        */
        function GooglePolyline(_polyline) {
            var _this = _super.call(this) || this;
            _this._polyline = _polyline;
            _this._title = '';
            _this._showTooltip = false;
            _this._tooltip = null;
            _this._tooltipVisible = false;
            _this._hasToolTipReceiver = false;
            _this._mouseOverListener = null;
            _this._mouseOutListener = null;
            _this._mouseMoveListener = null;
            _this._metadata = new Map();
            return _this;
        }
        Object.defineProperty(GooglePolyline.prototype, "Metadata", {
            get: /**
             * Gets the polyline metadata.
             *
             * \@readonly
             * \@memberof GooglePolyline
             * @return {?}
             */ function () { return this._metadata; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolyline.prototype, "NativePrimitve", {
            get: /**
             * Gets the native primitve implementing the marker, in this case {\@link GoogleMApTypes.Polyline}
             *
             * \@readonly
             * \@memberof GooglePolygon
             * @return {?}
             */ function () { return this._polyline; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolyline.prototype, "ShowTooltip", {
            get: /**
             * Gets or sets whether to show the tooltip
             *
             * @abstract
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._showTooltip; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._showTooltip = val;
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GooglePolyline.prototype, "Title", {
            get: /**
             * Gets or sets the title off the polygon
             *
             * @abstract
             * \@memberof GooglePolygon
             * \@property
             * @return {?}
             */ function () { return this._title; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._title = val;
                this.ManageTooltip();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a delegate for an event.
         *
         * \@memberof Polyline
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
        GooglePolyline.prototype.AddListener = /**
         * Adds a delegate for an event.
         *
         * \@memberof Polyline
         * @param {?} eventType - String containing the event name.
         * @param {?} fn - Delegate function to execute when the event occurs.
         * @return {?}
         */
            function (eventType, fn) {
                /** @type {?} */
                var supportedEvents = [
                    'click',
                    'dblclick',
                    'drag', 'dragend',
                    'dragstart',
                    'mousedown',
                    'mousemove',
                    'mouseout',
                    'mouseover',
                    'mouseup',
                    'rightclick'
                ];
                if (supportedEvents.indexOf(eventType) !== -1) {
                    this._polyline.addListener(eventType, fn);
                }
            };
        /**
         * Deleted the polyline.
         *
         *
         * \@memberof Polyline
         * @return {?}
         */
        GooglePolyline.prototype.Delete = /**
         * Deleted the polyline.
         *
         *
         * \@memberof Polyline
         * @return {?}
         */
            function () {
                this._polyline.setMap(null);
                if (this._tooltip) {
                    this._tooltip.Delete();
                }
            };
        /**
         * Gets whether the polyline is draggable.
         *
         * \@memberof Polyline
         * @return {?} - True if the polyline is dragable, false otherwise.
         *
         */
        GooglePolyline.prototype.GetDraggable = /**
         * Gets whether the polyline is draggable.
         *
         * \@memberof Polyline
         * @return {?} - True if the polyline is dragable, false otherwise.
         *
         */
            function () {
                return this._polyline.getDraggable();
            };
        /**
         * Gets whether the polyline path can be edited.
         *
         * \@memberof Polyline
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
        GooglePolyline.prototype.GetEditable = /**
         * Gets whether the polyline path can be edited.
         *
         * \@memberof Polyline
         * @return {?} - True if the path can be edited, false otherwise.
         *
         */
            function () {
                return this._polyline.getEditable();
            };
        /**
         * Gets the polyline path.
         *
         * \@memberof Polyline
         * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
         *
         */
        GooglePolyline.prototype.GetPath = /**
         * Gets the polyline path.
         *
         * \@memberof Polyline
         * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
         *
         */
            function () {
                /** @type {?} */
                var p = this._polyline.getPath();
                /** @type {?} */
                var path = new Array();
                p.forEach(function (x) { return path.push({ latitude: x.lat(), longitude: x.lng() }); });
                return path;
            };
        /**
         * Gets whether the polyline is visible.
         *
         * \@memberof Polyline
         * @return {?} - True if the polyline is visible, false otherwise.
         *
         */
        GooglePolyline.prototype.GetVisible = /**
         * Gets whether the polyline is visible.
         *
         * \@memberof Polyline
         * @return {?} - True if the polyline is visible, false otherwise.
         *
         */
            function () {
                return this._polyline.getVisible();
            };
        /**
         * Sets whether the polyline is dragable.
         *
         * \@memberof Polyline
         * @param {?} draggable - True to make the polyline dragable, false otherwise.
         *
         * @return {?}
         */
        GooglePolyline.prototype.SetDraggable = /**
         * Sets whether the polyline is dragable.
         *
         * \@memberof Polyline
         * @param {?} draggable - True to make the polyline dragable, false otherwise.
         *
         * @return {?}
         */
            function (draggable) {
                this._polyline.setDraggable(draggable);
            };
        /**
         * Sets wether the polyline path is editable.
         *
         * \@memberof Polyline
         * @param {?} editable - True to make polyline path editable, false otherwise.
         *
         * @return {?}
         */
        GooglePolyline.prototype.SetEditable = /**
         * Sets wether the polyline path is editable.
         *
         * \@memberof Polyline
         * @param {?} editable - True to make polyline path editable, false otherwise.
         *
         * @return {?}
         */
            function (editable) {
                this._polyline.setEditable(editable);
            };
        /**
         * Sets the polyline options
         *
         * \@memberof Polyline
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
        GooglePolyline.prototype.SetOptions = /**
         * Sets the polyline options
         *
         * \@memberof Polyline
         * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
         * already on the underlying model.
         *
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var o = GoogleConversions.TranslatePolylineOptions(options);
                this._polyline.setOptions(o);
                if (options.path) {
                    this.SetPath(/** @type {?} */ (options.path));
                }
            };
        /**
         * Sets the polyline path.
         *
         * \@memberof Polyline
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
         *
         * @return {?}
         */
        GooglePolyline.prototype.SetPath = /**
         * Sets the polyline path.
         *
         * \@memberof Polyline
         * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
         *
         * @return {?}
         */
            function (path) {
                /** @type {?} */
                var p = new Array();
                path.forEach(function (x) { return p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
                this._polyline.setPath(p);
            };
        /**
         * Sets whether the polyline is visible.
         *
         * \@memberof Polyline
         * @param {?} visible - True to set the polyline visible, false otherwise.
         *
         * @return {?}
         */
        GooglePolyline.prototype.SetVisible = /**
         * Sets whether the polyline is visible.
         *
         * \@memberof Polyline
         * @param {?} visible - True to set the polyline visible, false otherwise.
         *
         * @return {?}
         */
            function (visible) {
                this._polyline.setVisible(visible);
            };
        /**
         * Configures the tooltip for the polyline
         * \@memberof GooglePolyline
         * @return {?}
         */
        GooglePolyline.prototype.ManageTooltip = /**
         * Configures the tooltip for the polyline
         * \@memberof GooglePolyline
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._showTooltip && this._title != null && this._title !== '') {
                    /** @type {?} */
                    var o = {
                        text: this._title,
                        align: 'left',
                        offset: new google.maps.Point(0, 25),
                        backgroundColor: 'bisque',
                        hidden: true,
                        fontSize: 12,
                        fontColor: '#000000',
                        strokeWeight: 0
                    };
                    if (this._tooltip == null) {
                        o["map"] = this.NativePrimitve.getMap();
                        o["zIndex"] = 100000;
                        this._tooltip = new GoogleMapLabel(o);
                    }
                    else {
                        this._tooltip.SetValues(o);
                    }
                    if (!this._hasToolTipReceiver) {
                        this._mouseOverListener = this.NativePrimitve.addListener('mouseover', function (e) {
                            _this._tooltip.Set('position', e.latLng);
                            if (!_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', false);
                                _this._tooltipVisible = true;
                            }
                        });
                        this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', function (e) {
                            if (_this._tooltipVisible) {
                                _this._tooltip.Set('position', e.latLng);
                            }
                        });
                        this._mouseOutListener = this.NativePrimitve.addListener('mouseout', function (e) {
                            if (_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', true);
                                _this._tooltipVisible = false;
                            }
                        });
                        this._hasToolTipReceiver = true;
                    }
                }
                if ((!this._showTooltip || this._title === '' || this._title == null)) {
                    if (this._hasToolTipReceiver) {
                        if (this._mouseOutListener) {
                            google.maps.event.removeListener(this._mouseOutListener);
                        }
                        if (this._mouseOverListener) {
                            google.maps.event.removeListener(this._mouseOverListener);
                        }
                        if (this._mouseMoveListener) {
                            google.maps.event.removeListener(this._mouseMoveListener);
                        }
                        this._hasToolTipReceiver = false;
                    }
                    if (this._tooltip) {
                        this._tooltip.SetMap(null);
                        this._tooltip = null;
                    }
                }
            };
        return GooglePolyline;
    }(Polyline));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * This contstant translates the abstract map events into their corresponding google map
     * equivalents.
      @type {?} */
    var GoogleMapEventsLookup = {
        click: 'click',
        dblclick: 'dblclick',
        rightclick: 'rightclick',
        resize: 'resize',
        boundschanged: 'bounds_changed',
        centerchanged: 'center_changed',
        zoomchanged: 'zoom_changed',
        mouseover: 'mouseover',
        mouseout: 'mouseout',
        mousemove: 'mousemove',
        infowindowclose: 'closeclick'
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementing a canvas overlay to be placed on the map for Google Maps.
     *
     * @export
     */
    var /**
     * Concrete implementing a canvas overlay to be placed on the map for Google Maps.
     *
     * @export
     */ GoogleCanvasOverlay = (function (_super) {
        __extends(GoogleCanvasOverlay, _super);
        /**
         * Creates a new instance of the GoogleCanvasOverlay class.
         * @param drawCallback A callback function that is triggered when the canvas is ready to be
         * rendered for the current map view.
         * @memberof GoogleCanvasOverlay
         */
        function GoogleCanvasOverlay(drawCallback) {
            return _super.call(this, drawCallback) || this;
        }
        /**
         * Obtains geo coordinates for the click location
         *
         * \@memberof GoogleCanvasOverlay
         * @param {?} e - The mouse event.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
         */
        GoogleCanvasOverlay.prototype.GetCoordinatesFromClick = /**
         * Obtains geo coordinates for the click location
         *
         * \@memberof GoogleCanvasOverlay
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
         * Gets the map associted with the label.
         *
         * \@memberof GoogleCanvasOverlay
         * \@method
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.GetMap = /**
         * Gets the map associted with the label.
         *
         * \@memberof GoogleCanvasOverlay
         * \@method
         * @return {?}
         */
            function () {
                return ((this)).getMap();
            };
        /**
         * Returns a MapLabel instance for the current platform that can be used as a tooltip.
         * This method only generates the map label. Content and placement is the responsibility
         * of the caller.
         *
         * \@memberof GoogleCanvasOverlay
         * \@method
         * @return {?} - The label to be used for the tooltip.
         */
        GoogleCanvasOverlay.prototype.GetToolTipOverlay = /**
         * Returns a MapLabel instance for the current platform that can be used as a tooltip.
         * This method only generates the map label. Content and placement is the responsibility
         * of the caller.
         *
         * \@memberof GoogleCanvasOverlay
         * \@method
         * @return {?} - The label to be used for the tooltip.
         */
            function () {
                /** @type {?} */
                var o = {
                    align: 'left',
                    offset: new google.maps.Point(0, 25),
                    backgroundColor: 'bisque',
                    hidden: true,
                    fontSize: 12,
                    fontColor: '#000000',
                    strokeWeight: 0
                };
                o["zIndex"] = 100000;
                /** @type {?} */
                var label = new GoogleMapLabel(o);
                label.SetMap(this.GetMap());
                return label;
            };
        /**
         * Called when the custom overlay is added to the map. Triggers Onload....
         * \@memberof GoogleCanvasOverlay
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.OnAdd = /**
         * Called when the custom overlay is added to the map. Triggers Onload....
         * \@memberof GoogleCanvasOverlay
         * @return {?}
         */
            function () {
                _super.prototype.OnAdd.call(this);
                this.OnLoad();
                this._canvas.style.zIndex = '100';
                // move the canvas above primitives such as polygons.
                // set the overlay to ready state
                this._readyResolver(true);
            };
        /**
         * Called whenever the canvas needs to be redrawn. This method does not do the actual
         * update, it simply scales the canvas. The actual redraw happens once the map is idle.
         * \@memberof GoogleCanvasOverly
         * \@method
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.OnDraw = /**
         * Called whenever the canvas needs to be redrawn. This method does not do the actual
         * update, it simply scales the canvas. The actual redraw happens once the map is idle.
         * \@memberof GoogleCanvasOverly
         * \@method
         * @return {?}
         */
            function () {
                /** @type {?} */
                var map = this.GetMap();
                {
                    /** @type {?} */
                    var zoomCurrent = map.getZoom();
                    /** @type {?} */
                    var centerCurrent = map.getCenter();
                    /** @type {?} */
                    var scale = Math.pow(2, zoomCurrent - this._zoomStart);
                    /** @type {?} */
                    var el = map.getDiv();
                    /** @type {?} */
                    var w = el.offsetWidth;
                    /** @type {?} */
                    var h = el.offsetHeight;
                    /** @type {?} */
                    var newWidth = w * scale;
                    /** @type {?} */
                    var newHeight = h * scale;
                    /** @type {?} */
                    var projection = ((this)).getProjection();
                    /** @type {?} */
                    var cc = projection.fromLatLngToDivPixel(centerCurrent);
                    // Update the canvas CSS position and dimensions.
                    this.UpdatePosition(cc.x - newWidth / 2, cc.y - newHeight / 2, newWidth, newHeight);
                }
            };
        /**
         * CanvasOverlay loaded, attach map events for updating canvas.
         * \@method
         * \@memberof GoogleCanvasOverlay
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.OnLoad = /**
         * CanvasOverlay loaded, attach map events for updating canvas.
         * \@method
         * \@memberof GoogleCanvasOverlay
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var map = ((this)).getMap();
                // Get the current map view information.
                this._zoomStart = map.getZoom();
                /** @type {?} */
                var c = map.getCenter();
                this._centerStart = {
                    latitude: c.lat(),
                    longitude: c.lng()
                };
                // When the map stops moving, render new data on the canvas.
                this._viewChangeEndEvent = google.maps.event.addListener(map, 'idle', function (e) {
                    _this.UpdateCanvas();
                });
                // Update the position of the overlay when the map is resized.
                this._mapResizeEvent = google.maps.event.addListener(map, 'resize', function (e) {
                    _this.UpdateCanvas();
                });
            };
        /**
         * Associates the cnavas overlay with a map.
         * \@method
         * \@memberof GoogleCanvasOverlay
         * @param {?} map
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.SetMap = /**
         * Associates the cnavas overlay with a map.
         * \@method
         * \@memberof GoogleCanvasOverlay
         * @param {?} map
         * @return {?}
         */
            function (map) {
                ((this)).setMap(map);
            };
        ///
        /// Protected methods
        ///
        /**
         * Attaches the canvas to the map.
         * @memberof CanvasOverlay
         * @method
         */
        /**
         * Attaches the canvas to the map.
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} el
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.SetCanvasElement = /**
         * Attaches the canvas to the map.
         * \@memberof CanvasOverlay
         * \@method
         * @param {?} el
         * @return {?}
         */
            function (el) {
                /** @type {?} */
                var panes = ((this)).getPanes();
                if (panes) {
                    if (el != null) {
                        panes.overlayLayer.appendChild(el);
                        // 4: floatPane (infowindow)
                        // 3: overlayMouseTarget (mouse events)
                        // 2: markerLayer (marker images)
                        // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
                        // 0: mapPane (lowest pane above the map tiles)
                    }
                    else {
                        panes.overlayLayer.removeChild(this._canvas);
                    }
                }
            };
        /**
         * Remove the map event handlers.
         * @memberof CanvasOverlay
         * @method
         * @protected
         */
        /**
         * Remove the map event handlers.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.RemoveEventHandlers = /**
         * Remove the map event handlers.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                // Remove all event handlers from the map.
                if (this._viewChangeEndEvent) {
                    google.maps.event.removeListener(this._viewChangeEndEvent);
                }
                if (this._mapResizeEvent) {
                    google.maps.event.removeListener(this._mapResizeEvent);
                }
            };
        /**
         * Updates the Canvas size based on the map size.
         * @memberof CanvasOverlay
         * @method
         * @protected
         */
        /**
         * Updates the Canvas size based on the map size.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.Resize = /**
         * Updates the Canvas size based on the map size.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                /** @type {?} */
                var map = ((this)).getMap();
                /** @type {?} */
                var el = map.getDiv();
                this._canvas.width = el.offsetWidth;
                this._canvas.height = el.offsetHeight;
            };
        /**
         * Updates the Canvas.
         * @memberof CanvasOverlay
         * @method
         * @protected
         */
        /**
         * Updates the Canvas.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
        GoogleCanvasOverlay.prototype.UpdateCanvas = /**
         * Updates the Canvas.
         * \@memberof CanvasOverlay
         * \@method
         * @protected
         * @return {?}
         */
            function () {
                /** @type {?} */
                var map = ((this)).getMap();
                // Only render the canvas if it isn't in streetside mode.
                {
                    this._canvas.style.display = '';
                    /** @type {?} */
                    var el = map.getDiv();
                    /** @type {?} */
                    var w = el.offsetWidth;
                    /** @type {?} */
                    var h = el.offsetHeight;
                    /** @type {?} */
                    var centerPoint = ((this)).getProjection().fromLatLngToDivPixel(map.getCenter());
                    this.UpdatePosition((centerPoint.x - w / 2), (centerPoint.y - h / 2), w, h);
                    // Redraw the canvas.
                    this.Redraw(true);
                    // Get the current map view information.
                    this._zoomStart = map.getZoom();
                    /** @type {?} */
                    var c = map.getCenter();
                    this._centerStart = {
                        latitude: c.lat(),
                        longitude: c.lng()
                    };
                }
            };
        return GoogleCanvasOverlay;
    }(CanvasOverlay));
    /**
     * Helper function to extend the OverlayView into the CanvasOverlay
     *
     * @export
     * \@method
     * @return {?}
     */
    function MixinCanvasOverlay$1() {
        new Extender(GoogleCanvasOverlay)
            .Extend(new google.maps.OverlayView)
            .Map('onAdd', 'OnAdd')
            .Map('draw', 'OnDraw')
            .Map('onRemove', 'OnRemove');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Implements a factory to create all the implementation specifc services for a map implementation
     *
     * @export
     * @abstract
     * @abstract
     */
    var MapServiceFactory = (function () {
        function MapServiceFactory() {
        }
        MapServiceFactory.decorators = [
            { type: core.Injectable },
        ];
        return MapServiceFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract class to implement map api. A concrete implementation should be created for each
     * Map provider supported (e.g. Bing, Goolge, ESRI)
     *
     * @export
     * @abstract
     * @abstract
     */
    var MapService = (function () {
        function MapService() {
        }
        /**
         * Gets a random geo locations filling the bounding box.
         *
         * \@memberof MapService
         * @param {?} count - number of locations to return
         * @param {?} bounds  - bounding box.
         * @return {?} - Array of geo locations.
         */
        MapService.GetRandonLocations = /**
         * Gets a random geo locations filling the bounding box.
         *
         * \@memberof MapService
         * @param {?} count - number of locations to return
         * @param {?} bounds  - bounding box.
         * @return {?} - Array of geo locations.
         */
            function (count, bounds) {
                /** @type {?} */
                var a = [];
                /** @type {?} */
                var _getRandomLocation = function (b) {
                    /** @type {?} */
                    var lat = Math.random() * (b.maxLatitude - b.minLatitude) + b.minLatitude;
                    /** @type {?} */
                    var lng = 0;
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
                    var p = { latitude: lat, longitude: lng };
                    return p;
                };
                /** @type {?} */
                var crossesDateLine = false;
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
                for (var r = 0; r < count; r++) {
                    a.push(_getRandomLocation(bounds));
                }
                return a;
            };
        MapService.decorators = [
            { type: core.Injectable },
        ];
        return MapService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * The abstract class represents the contract defintions for a marker service to be implemented by an acutaly underlying
     * map architecture.
     *
     * @export
     * @abstract
     * @abstract
     */
    var MarkerService = (function () {
        function MarkerService() {
        }
        MarkerService.decorators = [
            { type: core.Injectable },
        ];
        return MarkerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This class defines the contract for an InfoBoxService. Each Map Architecture provider is expected the furnish a concrete implementation.
     *
     * @export
     * @abstract
     * @abstract
     */
    var InfoBoxService = (function () {
        function InfoBoxService() {
        }
        InfoBoxService.decorators = [
            { type: core.Injectable },
        ];
        return InfoBoxService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract class to to define the layer service contract. Must be realized by implementing provider.
     *
     * @export
     * @abstract
     * @abstract
     */
    var LayerService = (function () {
        function LayerService() {
        }
        LayerService.decorators = [
            { type: core.Injectable },
        ];
        return LayerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * The abstract class represents the contract defintions for a polygon service to be implemented by an acutaly underlying
     * map architecture.
     *
     * @export
     * @abstract
     * @abstract
     */
    var PolygonService = (function () {
        function PolygonService() {
        }
        PolygonService.decorators = [
            { type: core.Injectable },
        ];
        return PolygonService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * The abstract class represents the contract defintions for a polyline service to be implemented by an acutaly underlying
     * map architecture.
     *
     * @export
     * @abstract
     * @abstract
     */
    var PolylineService = (function () {
        function PolylineService() {
        }
        PolylineService.decorators = [
            { type: core.Injectable },
        ];
        return PolylineService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract class to to define teh cluster layer service contract. Must be realized by implementing provider.
     *
     * @export
     * @abstract
     * @abstract
     */
    var ClusterService = (function (_super) {
        __extends(ClusterService, _super);
        function ClusterService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClusterService.decorators = [
            { type: core.Injectable },
        ];
        return ClusterService;
    }(LayerService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * InfoBoxAction renders an action in an info window {\@link InfoBox}
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapMarkerDirective, InfoBoxComponent, InfoBoxActionDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .map-container { height: 300px; }
     *  `],
     *  template: `
     *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'">
     *        <x-info-box>
     *          <x-info-box-action [Label]="actionlabel" (ActionClicked)="actionClicked(this)"></x-info-box-action>
     *        </x-info-box>
     *      </x-map-marker>
     *    </x-map>
     *  `
     * })
     * ```
     *
     * @export
     */
    var InfoBoxActionDirective = (function () {
        function InfoBoxActionDirective() {
            /**
             * Emits an event when the action has been clicked
             *
             * \@memberof InfoBoxActionDirective
             */
            this.ActionClicked = new core.EventEmitter();
        }
        InfoBoxActionDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-info-box-action'
                    },] },
        ];
        InfoBoxActionDirective.propDecorators = {
            Label: [{ type: core.Input }],
            ActionClicked: [{ type: core.Output }]
        };
        return InfoBoxActionDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * internal counter to use as ids for multiple infoboxes.
      @type {?} */
    var infoBoxId = 0;
    /**
     * InfoBox renders a info window inside a {\@link MapMarkerDirective} or standalone.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapMarkerDirective, InfoBoxComponent, InfoBoxActionDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .map-container { height: 300px; }
     * `],
     *  template: `
     *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'">
     *        <x-info-box [DisableAutoPan]="true">
     *          Hi, this is the content of the <strong>info window</strong>
     *         </x-info-box>
     *       </x-map-marker>
     *     </x-map>
     *  `
     * })
     * ```
     *
     * @export
     */
    var InfoBoxComponent = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of InfoBoxComponent.
         * @param _infoBoxService - Concrete {@link InfoBoxService} implementation for underlying Map architecture.
         *
         * @memberof InfoBoxComponent
         */
        function InfoBoxComponent(_infoBoxService) {
            this._infoBoxService = _infoBoxService;
            this._infoBoxAddedToManager = false;
            this._id = (infoBoxId++).toString();
            /**
             * Determine whether only one infobox can be open at a time. Note that ANY info box settings.
             *
             * \@memberof InfoBoxComponent
             */
            this.Modal = true;
            /**
             * Determines visibility of infobox
             *
             * \@memberof InfoBoxComponent
             */
            this.Visible = false;
            /**
             * Determines if other info boxes should be closed before opening this one
             *
             * \@memberof InfoBoxComponent
             */
            this.CloseInfoBoxesOnOpen = true;
            /**
             * Emits an event when the info window is closed.
             *
             * \@memberof InfoBoxComponent
             */
            this.InfoBoxClose = new core.EventEmitter();
        }
        Object.defineProperty(InfoBoxComponent.prototype, "HtmlContent", {
            get: /**
             * Gets the HTML content of the info box.
             *
             * \@readonly
             * \@memberof InfoBoxComponent
             * @return {?}
             */ function () {
                if (this._content.nativeElement && this._content.nativeElement.innerText && this._content.nativeElement.innerText.trim() !== '') {
                    return this._content.nativeElement.outerHTML;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InfoBoxComponent.prototype, "Id", {
            get: /**
             * Gets the Id of the info box as a string.
             *
             * \@readonly
             * \@memberof InfoBoxComponent
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        /**
         * Closes the Infobox.
         *
         * \@memberof InfoBoxComponent
         * @return {?}
         */
        InfoBoxComponent.prototype.Close = /**
         * Closes the Infobox.
         *
         * \@memberof InfoBoxComponent
         * @return {?}
         */
            function () {
                var _this = this;
                return this._infoBoxService.Close(this).then(function () {
                    _this.InfoBoxClose.emit(_this._id);
                });
            };
        /**
         * Called on after component view as been initialized. Part of the ng Component life cycle.
         *
         * \@memberof Map
         * @return {?}
         */
        InfoBoxComponent.prototype.ngAfterViewInit = /**
         * Called on after component view as been initialized. Part of the ng Component life cycle.
         *
         * \@memberof Map
         * @return {?}
         */
            function () {
                this._infoBoxService.AddInfoWindow(this);
                this._infoBoxAddedToManager = true;
                this.HandleEvents();
            };
        /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof Map
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
        InfoBoxComponent.prototype.ngOnChanges = /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof Map
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
            function (changes) {
                if (!this._infoBoxAddedToManager) {
                    return;
                }
                if ((changes['latitude'] || changes['longitude']) && typeof this.Latitude === 'number' &&
                    typeof this.Longitude === 'number') {
                    this._infoBoxService.SetPosition(this, {
                        latitude: changes['latitude'].currentValue,
                        longitude: changes['longitude'].currentValue
                    });
                }
                this.SetInfoWindowOptions(changes);
            };
        /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof Map
         * @return {?}
         */
        InfoBoxComponent.prototype.ngOnDestroy = /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof Map
         * @return {?}
         */
            function () { this._infoBoxService.DeleteInfoWindow(this); };
        /**
         * Opens a closed info window.
         *
         * \@memberof InfoBoxComponent
         * @param {?=} loc
         * @return {?} - Promise that is fullfilled when the infobox has been opened.
         *
         */
        InfoBoxComponent.prototype.Open = /**
         * Opens a closed info window.
         *
         * \@memberof InfoBoxComponent
         * @param {?=} loc
         * @return {?} - Promise that is fullfilled when the infobox has been opened.
         *
         */
            function (loc) {
                return this._infoBoxService.Open(this, loc);
            };
        /**
         * Returns a string representation of the info box.
         *
         * \@memberof InfoBoxComponent
         * @return {?} - string representation of the info box.
         *
         */
        InfoBoxComponent.prototype.ToString = /**
         * Returns a string representation of the info box.
         *
         * \@memberof InfoBoxComponent
         * @return {?} - string representation of the info box.
         *
         */
            function () { return 'InfoBoxComponent-' + this._id; };
        /**
         * Delegate handling the map click events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        InfoBoxComponent.prototype.HandleEvents = /**
         * Delegate handling the map click events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                var _this = this;
                this._infoBoxService.CreateEventObservable('infowindowclose', this).subscribe(function (e) {
                    _this.InfoBoxClose.emit(_this._id);
                });
            };
        /**
         * Sets the info window options
         *
         * \@memberof InfoBoxComponent
         * @param {?} changes
         *
         * @return {?}
         */
        InfoBoxComponent.prototype.SetInfoWindowOptions = /**
         * Sets the info window options
         *
         * \@memberof InfoBoxComponent
         * @param {?} changes
         *
         * @return {?}
         */
            function (changes) {
                /** @type {?} */
                var options = {};
                if (changes['title']) {
                    options.title = this.Title;
                }
                if (changes['description']) {
                    options.description = this.Description;
                }
                if (changes['disableAutoPan']) {
                    options.disableAutoPan = this.DisableAutoPan;
                }
                if (changes['visible']) {
                    options.visible = this.Visible;
                }
                if (changes['xOffset'] || changes['yOffset']) {
                    if (options.pixelOffset == null) {
                        options.pixelOffset = { x: 0, y: 0 };
                    }
                    options.pixelOffset.x = this.xOffset;
                    options.pixelOffset.y = this.yOffset;
                }
                this._infoBoxService.SetOptions(this, options);
            };
        InfoBoxComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'x-info-box',
                        template: "\n        <div #infoBoxContent class='info-box-content'>\n            <ng-content></ng-content>\n        </div>",
                        styles: ["\n        x-map .MicrosoftMap .Infobox .infobox-title { padding: 10px 10px 5px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-info { padding: 3px 10px 10px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-actions { height: auto }\n    "],
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        InfoBoxComponent.ctorParameters = function () {
            return [
                { type: InfoBoxService }
            ];
        };
        InfoBoxComponent.propDecorators = {
            _content: [{ type: core.ViewChild, args: ['infoBoxContent',] }],
            InfoWindowActions: [{ type: core.ContentChildren, args: [InfoBoxActionDirective,] }],
            Latitude: [{ type: core.Input }],
            Longitude: [{ type: core.Input }],
            Title: [{ type: core.Input }],
            Description: [{ type: core.Input }],
            DisableAutoPan: [{ type: core.Input }],
            MaxWidth: [{ type: core.Input }],
            Modal: [{ type: core.Input }],
            HostMarker: [{ type: core.Input }],
            Visible: [{ type: core.Input }],
            xOffset: [{ type: core.Input }],
            yOffset: [{ type: core.Input }],
            CloseInfoBoxesOnOpen: [{ type: core.Input }],
            InfoBoxClose: [{ type: core.Output }]
        };
        return InfoBoxComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * internal counter to use as ids for marker.
      @type {?} */
    var markerId = 0;
    /**
     * MapMarkerDirective renders a map marker inside a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapMarkerDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *   .map-container {
     *     height: 300px;
     *   }
     * `],
     * template: `
     *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'"></x-map-marker>
     *   </x-map>
     * `
     * })
     * ```
     *
     * @export
     */
    var MapMarkerDirective = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapMarkerDirective.
         * @param _markerService - Concreate implementation of a {@link MarkerService}.
         * @param _containerRef - View container hosting the marker.
         * Used to determine parent layer through markup.
         *
         * @memberof MapMarkerDirective
         */
        function MapMarkerDirective(_markerService, _containerRef) {
            this._markerService = _markerService;
            this._containerRef = _containerRef;
            this._clickTimeout = null;
            this._events = [];
            this._inClusterLayer = false;
            this._inCustomLayer = false;
            this._markerAddedToManger = false;
            /**
             * This event is fired when the DOM dblclick event is fired on the marker.
             *
             * \@memberof MapMarkerDirective
             */
            this.DblClick = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the marker.
             *
             * \@memberof MapMarkerDirective
             */
            this.Drag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the marker.
             *
             * \@memberof MapMarkerDirective
             */
            this.DragEnd = new core.EventEmitter();
            /**
             * If true, the marker can be dragged. Default value is false.
             *
             * \@memberof MapMarkerDirective
             */
            this.Draggable = false;
            /**
             * This event is fired when the user starts dragging the marker.
             *
             * \@memberof MapMarkerDirective
             */
            this.DragStart = new core.EventEmitter();
            /**
             * This event emitter gets emitted when a marker icon is being created.
             *
             * \@memberof MapMarkerDirective
             */
            this.DynamicMarkerCreated = new core.EventEmitter();
            /**
             * True to indiciate whether this is the first marker in a set.
             * Use this for bulk operations (particularily clustering) to ensure performance.
             *
             * \@memberof MapMarkerDirective
             */
            this.IsFirstInSet = false;
            /**
             * True to indiciate whether this is the last marker in a set.
             * Use this for bulk operations (particularily clustering) to ensure performance.
             *
             * \@memberof MapMarkerDirective
             */
            this.IsLastInSet = true;
            /**
             * This event emitter gets emitted when the user clicks on the marker.
             *
             * \@memberof MapMarkerDirective
             */
            this.MarkerClick = new core.EventEmitter();
            /**
             * Arbitary metadata to assign to the Marker. This is useful for events
             *
             * \@memberof MapMarkerDirective
             */
            this.Metadata = new Map();
            /**
             * This event is fired when the DOM mousedown event is fired on the marker.
             *
             * \@memberof MapMarkerDirective
             */
            this.MouseDown = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the marker.
             *
             * \@memberof MapMarkerDirective
             */
            this.MouseMove = new core.EventEmitter();
            /**
             * This event is fired on marker mouseout.
             *
             * \@memberof MapMarkerDirective
             */
            this.MouseOut = new core.EventEmitter();
            /**
             * This event is fired on marker mouseover.
             *
             * \@memberof MapMarkerDirective
             */
            this.MouseOver = new core.EventEmitter();
            /**
             * This event is fired whe the DOM mouseup event is fired on the marker
             *
             * \@memberof MapMarkerDirective
             */
            this.MouseUp = new core.EventEmitter();
            /**
             * This even is fired when the marker is right-clicked on.
             *
             * \@memberof MapMarkerDirective
             */
            this.RightClick = new core.EventEmitter();
            this._id = (markerId++).toString();
        }
        Object.defineProperty(MapMarkerDirective.prototype, "AddedToManager", {
            get: /**
             * Getswhether the marker has already been added to the marker service and is ready for use.
             *
             * \@readonly
             * \@memberof MapMarkerDirective
             * @return {?}
             */ function () { return this._markerAddedToManger; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerDirective.prototype, "Id", {
            get: /**
             * Gets the id of the marker as a string.
             *
             * \@readonly
             * \@memberof MapMarkerDirective
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerDirective.prototype, "InClusterLayer", {
            get: /**
             * Gets whether the marker is in a cluster layer. See {\@link ClusterLayer}.
             *
             * \@readonly
             * \@memberof MapMarkerDirective
             * @return {?}
             */ function () { return this._inClusterLayer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerDirective.prototype, "InCustomLayer", {
            get: /**
             * Gets whether the marker is in a custom layer. See {\@link MapLayer}.
             *
             * \@readonly
             * \@memberof MapMarkerDirective
             * @return {?}
             */ function () { return this._inCustomLayer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerDirective.prototype, "LayerId", {
            get: /**
             * gets the id of the Layer the marker belongs to.
             *
             * \@readonly
             * \@memberof MapMarkerDirective
             * @return {?}
             */ function () { return this._layerId; },
            enumerable: true,
            configurable: true
        });
        /**
         * Translates a marker geo location to a pixel location relative to the map viewport.
         *
         * \@memberof MapMarkerDirective
         * @param {?=} loc
         * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
         *
         */
        MapMarkerDirective.prototype.LocationToPixel = /**
         * Translates a marker geo location to a pixel location relative to the map viewport.
         *
         * \@memberof MapMarkerDirective
         * @param {?=} loc
         * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
         *
         */
            function (loc) {
                return this._markerService.LocationToPoint(loc ? loc : this);
            };
        /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapMarkerDirective
         * @return {?}
         */
        MapMarkerDirective.prototype.ngAfterContentInit = /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapMarkerDirective
         * @return {?}
         */
            function () {
                if (this._infoBox != null) {
                    this._infoBox.HostMarker = this;
                }
                if (this._containerRef.element.nativeElement.parentElement) {
                    /** @type {?} */
                    var parentName = this._containerRef.element.nativeElement.parentElement.tagName;
                    if (parentName.toLowerCase() === 'x-cluster-layer') {
                        this._inClusterLayer = true;
                    }
                    else if (parentName.toLowerCase() === 'x-map-layer') {
                        this._inCustomLayer = true;
                    }
                    this._layerId = Number(this._containerRef.element.nativeElement.parentElement.attributes['layerId']);
                }
                if (!this._markerAddedToManger) {
                    this._markerService.AddMarker(this);
                    this._markerAddedToManger = true;
                    this.AddEventListeners();
                }
            };
        /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapMarkerDirective
         * @param {?} changes - collection of changes.
         *
         * @return {?}
         */
        MapMarkerDirective.prototype.ngOnChanges = /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapMarkerDirective
         * @param {?} changes - collection of changes.
         *
         * @return {?}
         */
            function (changes) {
                if (typeof this.Latitude !== 'number' || typeof this.Longitude !== 'number') {
                    return;
                }
                if (!this._markerAddedToManger) {
                    return;
                }
                if (changes['Latitude'] || changes['Longitude']) {
                    this._markerService.UpdateMarkerPosition(this);
                }
                if (changes['Title']) {
                    this._markerService.UpdateTitle(this);
                }
                if (changes['Label']) {
                    this._markerService.UpdateLabel(this);
                }
                if (changes['Draggable']) {
                    this._markerService.UpdateDraggable(this);
                }
                if (changes['IconUrl'] || changes['IconInfo']) {
                    this._markerService.UpdateIcon(this);
                }
                if (changes['Anchor']) {
                    this._markerService.UpdateAnchor(this);
                }
                if (changes['Visible']) {
                    this._markerService.UpdateVisible(this);
                }
            };
        /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         *
         * \@memberof MapMarkerDirective
         * @return {?}
         */
        MapMarkerDirective.prototype.ngOnDestroy = /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         *
         * \@memberof MapMarkerDirective
         * @return {?}
         */
            function () {
                this._markerService.DeleteMarker(this);
                this._events.forEach(function (s) { return s.unsubscribe(); });
            };
        /**
         * Obtains a string representation of the Marker Id.
         * \@memberof MapMarkerDirective
         * @return {?} - string representation of the marker id.
         */
        MapMarkerDirective.prototype.toString = /**
         * Obtains a string representation of the Marker Id.
         * \@memberof MapMarkerDirective
         * @return {?} - string representation of the marker id.
         */
            function () { return 'MapMarker-' + this._id.toString(); };
        /**
         * Adds various event listeners for the marker.
         *
         * \@memberof MapMarkerDirective
         * @return {?}
         */
        MapMarkerDirective.prototype.AddEventListeners = /**
         * Adds various event listeners for the marker.
         *
         * \@memberof MapMarkerDirective
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var _getEventArg = function (e) {
                    return {
                        Marker: _this,
                        Click: e,
                        Location: _this._markerService.GetCoordinatesFromClick(e),
                        Pixels: _this._markerService.GetPixelsFromClick(e)
                    };
                };
                this._events.push(this._markerService.CreateEventObservable('click', this).subscribe(function (e) {
                    ///
                    /// this is necessary since map will treat a doubleclick first as two clicks...'
                    ///
                    _this._clickTimeout = rxjs.timer(300).subscribe(function (n) {
                        if (_this._infoBox != null) {
                            _this._infoBox.Open(_this._markerService.GetCoordinatesFromClick(e));
                        }
                        _this.MarkerClick.emit(_getEventArg(e));
                    });
                }));
                this._events.push(this._markerService.CreateEventObservable('dblclick', this).subscribe(function (e) {
                    if (_this._clickTimeout) {
                        _this._clickTimeout.unsubscribe();
                        _this._clickTimeout = null;
                    }
                    _this.DblClick.emit(_getEventArg(e));
                }));
                /** @type {?} */
                var handlers = [
                    { name: 'drag', handler: function (ev) { return _this.Drag.emit(_getEventArg(ev)); } },
                    { name: 'dragend', handler: function (ev) { return _this.DragEnd.emit(_getEventArg(ev)); } },
                    { name: 'dragstart', handler: function (ev) { return _this.DragStart.emit(_getEventArg(ev)); } },
                    { name: 'mousedown', handler: function (ev) { return _this.MouseDown.emit(_getEventArg(ev)); } },
                    { name: 'mousemove', handler: function (ev) { return _this.MouseMove.emit(_getEventArg(ev)); } },
                    { name: 'mouseout', handler: function (ev) { return _this.MouseOut.emit(_getEventArg(ev)); } },
                    { name: 'mouseover', handler: function (ev) { return _this.MouseOver.emit(_getEventArg(ev)); } },
                    { name: 'mouseup', handler: function (ev) { return _this.MouseUp.emit(_getEventArg(ev)); } },
                    { name: 'rightclick', handler: function (ev) { return _this.RightClick.emit(_getEventArg(ev)); } },
                ];
                handlers.forEach(function (obj) {
                    /** @type {?} */
                    var os = _this._markerService.CreateEventObservable(obj.name, _this).subscribe(obj.handler);
                    _this._events.push(os);
                });
            };
        MapMarkerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-map-marker'
                    },] },
        ];
        /** @nocollapse */
        MapMarkerDirective.ctorParameters = function () {
            return [
                { type: MarkerService },
                { type: core.ViewContainerRef }
            ];
        };
        MapMarkerDirective.propDecorators = {
            _infoBox: [{ type: core.ContentChild, args: [InfoBoxComponent,] }],
            Anchor: [{ type: core.Input }],
            DblClick: [{ type: core.Output }],
            Drag: [{ type: core.Output }],
            DragEnd: [{ type: core.Output }],
            Draggable: [{ type: core.Input }],
            DragStart: [{ type: core.Output }],
            DynamicMarkerCreated: [{ type: core.Output }],
            Height: [{ type: core.Input }],
            IconInfo: [{ type: core.Input }],
            IconUrl: [{ type: core.Input }],
            IsFirstInSet: [{ type: core.Input }],
            IsLastInSet: [{ type: core.Input }],
            Label: [{ type: core.Input }],
            Latitude: [{ type: core.Input }],
            Longitude: [{ type: core.Input }],
            MarkerClick: [{ type: core.Output }],
            Metadata: [{ type: core.Input }],
            MouseDown: [{ type: core.Output }],
            MouseMove: [{ type: core.Output }],
            MouseOut: [{ type: core.Output }],
            MouseOver: [{ type: core.Output }],
            MouseUp: [{ type: core.Output }],
            RightClick: [{ type: core.Output }],
            Title: [{ type: core.Input }],
            Visible: [{ type: core.Input }],
            Width: [{ type: core.Input }]
        };
        return MapMarkerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Renders a map based on a given provider.
     * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
     * class `map-container`.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent} from '...';
     *
     * \@Component({
     *  selector: 'my-map',
     *  styles: [`
     *    .map-container { height: 300px; }
     * `],
     *  template: `
     *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom"></x-map>
     *  `
     * })
     * ```
     *
     * @export
     */
    var MapComponent = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapComponent.
         *
         * @param _mapService - Concreted implementation of a map service for the underlying maps implementations.
         *                                   Generally provided via injections.
         * @memberof MapComponent
         */
        function MapComponent(_mapService, _zone) {
            this._mapService = _mapService;
            this._zone = _zone;
            this._longitude = 0;
            this._latitude = 0;
            this._zoom = 0;
            this._options = {};
            this._box = null;
            this._containerClass = true;
            /**
             * This event emitter is fired when the map bounding box changes.
             *
             * \@memberof MapComponent
             */
            this.BoundsChange = new core.EventEmitter();
            /**
             * This event emitter is fired when the map center changes.
             *
             * \@memberof MapComponent
             */
            this.CenterChange = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the map (but not when they click on a
             * marker or infoWindow).
             *
             * \@memberof MapComponent
             */
            this.MapClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user double-clicks on the map (but not when they click
             * on a marker or infoWindow).
             *
             * \@memberof MapComponent
             */
            this.MapDblClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user right-clicks on the map (but not when they click
             * on a marker or infoWindow).
             *
             * \@memberof MapComponent
             */
            this.MapRightClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user double-clicks on the map (but not when they click
             * on a marker or infoWindow).
             *
             * \@memberof MapComponent
             */
            this.MapMouseOver = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user double-clicks on the map (but not when they click
             * on a marker or infoWindow).
             *
             * \@memberof MapComponent
             */
            this.MapMouseOut = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user double-clicks on the map (but not when they click
             * on a marker or infoWindow).
             *
             * \@memberof MapComponent
             */
            this.MapMouseMove = new core.EventEmitter();
            /**
             * The event emitter is fired when the map service is available and the maps has been
             * Initialized (but not necessarily created). It contains a Promise that when fullfilled returns
             * the main map object of the underlying platform.
             *
             * \@memberof MapComponent
             */
            this.MapPromise = new core.EventEmitter();
            /**
             * This event emiiter is fired when the map zoom changes
             *
             * \@memberof MapComponent
             */
            this.ZoomChange = new core.EventEmitter();
            /**
             * This event emitter is fired when the map service is available and the maps has been
             * Initialized
             * \@memberOf MapComponent
             */
            this.MapService = new core.EventEmitter();
        }
        Object.defineProperty(MapComponent.prototype, "Box", {
            ///
            /// Property declarations
            ///
            /**
             * Get or sets the maximum and minimum bounding box for map.
             *
             * @memberof MapComponent
             */
            get: /**
             * Get or sets the maximum and minimum bounding box for map.
             *
             * \@memberof MapComponent
             * @return {?}
             */ function () { return this._box; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._box = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapComponent.prototype, "Latitude", {
            /**
             * Gets or sets the latitude that sets the center of the map.
             *
             * @memberof MapComponent
             */
            get: /**
             * Gets or sets the latitude that sets the center of the map.
             *
             * \@memberof MapComponent
             * @return {?}
             */ function () { return this._longitude; },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._latitude = this.ConvertToDecimal(value);
                this.UpdateCenter();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapComponent.prototype, "Longitude", {
            /**
             * Gets or sets the longitude that sets the center of the map.
             *
             * @memberof MapComponent
             */
            get: /**
             * Gets or sets the longitude that sets the center of the map.
             *
             * \@memberof MapComponent
             * @return {?}
             */ function () { return this._longitude; },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._longitude = this.ConvertToDecimal(value);
                this.UpdateCenter();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapComponent.prototype, "Options", {
            /**
             * Gets or sets general map Options
             *
             * @memberof MapComponent
             */
            get: /**
             * Gets or sets general map Options
             *
             * \@memberof MapComponent
             * @return {?}
             */ function () { return this._options; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._options = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapComponent.prototype, "Zoom", {
            /**
             * Gets or sets the zoom level of the map. The default value is `8`.
             *
             * @memberof MapComponent
             */
            get: /**
             * Gets or sets the zoom level of the map. The default value is `8`.
             *
             * \@memberof MapComponent
             * @return {?}
             */ function () { return this._zoom; },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._zoom = this.ConvertToDecimal(value, 8);
                if (typeof this._zoom === 'number') {
                    this._mapService.SetZoom(this._zoom);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Called on Component initialization. Part of ng Component life cycle.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.ngOnInit = /**
         * Called on Component initialization. Part of ng Component life cycle.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                this.MapPromise.emit(this._mapService.MapPromise);
                this.MapService.emit(this._mapService);
            };
        /**
         * Called after Angular has fully initialized a component's view. Part of ng Component life cycle.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.ngAfterViewInit = /**
         * Called after Angular has fully initialized a component's view. Part of ng Component life cycle.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                this.InitMapInstance(this._container.nativeElement);
            };
        /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapComponent
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
        MapComponent.prototype.ngOnChanges = /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapComponent
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
            function (changes) {
                if (this._mapPromise) {
                    if (changes['Box']) {
                        if (this._box != null) {
                            this._mapService.SetViewOptions(/** @type {?} */ ({
                                bounds: this._box
                            }));
                        }
                    }
                    if (changes['Options']) {
                        this._mapService.SetMapOptions(this._options);
                    }
                }
            };
        /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.ngOnDestroy = /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                this._mapService.DisposeMap();
            };
        /**
         * Triggers a resize event on the map instance.
         *
         * \@memberof MapComponent
         * @return {?} - A promise that gets resolved after the event was triggered.
         *
         */
        MapComponent.prototype.TriggerResize = /**
         * Triggers a resize event on the map instance.
         *
         * \@memberof MapComponent
         * @return {?} - A promise that gets resolved after the event was triggered.
         *
         */
            function () {
                var _this = this;
                // Note: When we would trigger the resize event and show the map in the same turn (which is a
                // common case for triggering a resize event), then the resize event would not
                // work (to show the map), so we trigger the event in a timeout.
                return new Promise(function (resolve) {
                    setTimeout(function () { return _this._mapService.TriggerMapEvent('resize').then(function () { return resolve(); }); });
                });
            };
        /**
         * Converts a number-ish value to a number.
         *
         * \@memberof MapComponent
         * @param {?} value - The value to convert.
         * @param {?=} defaultValue
         * @return {?} - Converted number of the default.
         *
         */
        MapComponent.prototype.ConvertToDecimal = /**
         * Converts a number-ish value to a number.
         *
         * \@memberof MapComponent
         * @param {?} value - The value to convert.
         * @param {?=} defaultValue
         * @return {?} - Converted number of the default.
         *
         */
            function (value, defaultValue) {
                if (defaultValue === void 0) {
                    defaultValue = null;
                }
                if (typeof value === 'string') {
                    return parseFloat(value);
                }
                else if (typeof value === 'number') {
                    return /** @type {?} */ (value);
                }
                return defaultValue;
            };
        /**
         * Delegate handling the map click events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.HandleMapClickEvents = /**
         * Delegate handling the map click events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                var _this = this;
                this._mapService.SubscribeToMapEvent('click').subscribe(function (e) {
                    //
                    // this is necessary since bing will treat a doubleclick first as two clicks...'
                    //
                    // this is necessary since bing will treat a doubleclick first as two clicks...'
                    ///
                    _this._clickTimeout = setTimeout(function () {
                        _this.MapClick.emit(/** @type {?} */ (e));
                    }, 300);
                });
                this._mapService.SubscribeToMapEvent('dblclick').subscribe(function (e) {
                    if (_this._clickTimeout) {
                        clearTimeout(/** @type {?} */ (_this._clickTimeout));
                    }
                    _this.MapDblClick.emit(/** @type {?} */ (e));
                });
                this._mapService.SubscribeToMapEvent('rightclick').subscribe(function (e) {
                    _this.MapRightClick.emit(/** @type {?} */ (e));
                });
                this._mapService.SubscribeToMapEvent('mouseover').subscribe(function (e) {
                    _this.MapMouseOver.emit(/** @type {?} */ (e));
                });
                this._mapService.SubscribeToMapEvent('mouseout').subscribe(function (e) {
                    _this.MapMouseOut.emit(/** @type {?} */ (e));
                });
                this._mapService.SubscribeToMapEvent('mousemove').subscribe(function (e) {
                    _this.MapMouseMove.emit(/** @type {?} */ (e));
                });
            };
        /**
         * Delegate handling map center change events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.HandleMapBoundsChange = /**
         * Delegate handling map center change events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                var _this = this;
                this._mapService.SubscribeToMapEvent('boundschanged').subscribe(function () {
                    _this._mapService.GetBounds().then(function (bounds) {
                        _this.BoundsChange.emit(bounds);
                    });
                });
            };
        /**
         * Delegate handling map center change events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.HandleMapCenterChange = /**
         * Delegate handling map center change events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                var _this = this;
                this._mapService.SubscribeToMapEvent('centerchanged').subscribe(function () {
                    _this._mapService.GetCenter().then(function (center) {
                        if (_this._latitude !== center.latitude || _this._longitude !== center.longitude) {
                            _this._latitude = center.latitude;
                            _this._longitude = center.longitude;
                            _this.CenterChange.emit(/** @type {?} */ ({ latitude: _this._latitude, longitude: _this._longitude }));
                        }
                    });
                });
            };
        /**
         * Delegate handling map zoom change events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.HandleMapZoomChange = /**
         * Delegate handling map zoom change events.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                var _this = this;
                this._mapService.SubscribeToMapEvent('zoomchanged').subscribe(function () {
                    _this._mapService.GetZoom().then(function (z) {
                        if (_this._zoom !== z) {
                            _this._zoom = z;
                            _this.ZoomChange.emit(z);
                        }
                    });
                });
            };
        /**
         * Initializes the map.
         *
         * \@memberof MapComponent
         * @param {?} el - Html elements which will host the map canvas.
         *
         * @return {?}
         */
        MapComponent.prototype.InitMapInstance = /**
         * Initializes the map.
         *
         * \@memberof MapComponent
         * @param {?} el - Html elements which will host the map canvas.
         *
         * @return {?}
         */
            function (el) {
                var _this = this;
                this._zone.runOutsideAngular(function () {
                    if (_this._options.center == null) {
                        _this._options.center = { latitude: _this._latitude, longitude: _this._longitude };
                    }
                    if (_this._options.zoom == null) {
                        _this._options.zoom = _this._zoom;
                    }
                    if (_this._options.mapTypeId == null) {
                        _this._options.mapTypeId = MapTypeId.hybrid;
                    }
                    if (_this._box != null) {
                        _this._options.bounds = _this._box;
                    }
                    _this._mapPromise = _this._mapService.CreateMap(el, _this._options);
                    _this.HandleMapCenterChange();
                    _this.HandleMapBoundsChange();
                    _this.HandleMapZoomChange();
                    _this.HandleMapClickEvents();
                });
            };
        /**
         * Updates the map center based on the geo properties of the component.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        MapComponent.prototype.UpdateCenter = /**
         * Updates the map center based on the geo properties of the component.
         *
         * \@memberof MapComponent
         * @return {?}
         */
            function () {
                if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
                    return;
                }
                this._mapService.SetCenter({
                    latitude: this._latitude,
                    longitude: this._longitude,
                });
            };
        MapComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'x-map',
                        providers: [
                            { provide: MapService, deps: [MapServiceFactory], useFactory: MapServiceCreator },
                            { provide: MarkerService, deps: [MapServiceFactory, MapService, LayerService, ClusterService], useFactory: MarkerServiceFactory },
                            {
                                provide: InfoBoxService, deps: [MapServiceFactory, MapService,
                                    MarkerService], useFactory: InfoBoxServiceFactory
                            },
                            { provide: LayerService, deps: [MapServiceFactory, MapService], useFactory: LayerServiceFactory },
                            { provide: ClusterService, deps: [MapServiceFactory, MapService], useFactory: ClusterServiceFactory },
                            { provide: PolygonService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolygonServiceFactory },
                            { provide: PolylineService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolylineServiceFactory }
                        ],
                        template: "\n        <div #container class='map-container-inner'></div>\n        <div class='map-content'>\n            <ng-content></ng-content>\n        </div>\n    ",
                        styles: ["\n        .map-container-inner { width: inherit; height: inherit; }\n        .map-container-inner div { background-repeat: no-repeat; }\n        .map-content { display:none; }\n    "],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        MapComponent.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        MapComponent.propDecorators = {
            _containerClass: [{ type: core.HostBinding, args: ['class.map-container',] }],
            _container: [{ type: core.ViewChild, args: ['container',] }],
            _markers: [{ type: core.ContentChildren, args: [MapMarkerDirective,] }],
            Box: [{ type: core.Input }],
            Latitude: [{ type: core.Input }],
            Longitude: [{ type: core.Input }],
            Options: [{ type: core.Input }],
            Zoom: [{ type: core.Input }],
            BoundsChange: [{ type: core.Output }],
            CenterChange: [{ type: core.Output }],
            MapClick: [{ type: core.Output }],
            MapDblClick: [{ type: core.Output }],
            MapRightClick: [{ type: core.Output }],
            MapMouseOver: [{ type: core.Output }],
            MapMouseOut: [{ type: core.Output }],
            MapMouseMove: [{ type: core.Output }],
            MapPromise: [{ type: core.Output }],
            ZoomChange: [{ type: core.Output }],
            MapService: [{ type: core.Output }]
        };
        return MapComponent;
    }());
    /**
     * Factory function to generate a cluster service instance. This is necessary because of constraints with AOT that do no allow
     * us to use lamda functions inline.
     *
     * @export
     * @param {?} f - The {\@link MapServiceFactory} implementation.
     * @param {?} m - A {\@link MapService} instance.
     * @return {?} - A concrete instance of a Cluster Service based on the underlying map architecture
     */
    function ClusterServiceFactory(f, m) { return f.CreateClusterService(m); }
    /**
     * Factory function to generate a infobox service instance. This is necessary because of constraints with AOT that do no allow
     * us to use lamda functions inline.
     *
     * @export
     * @param {?} f - The {\@link MapServiceFactory} implementation.
     * @param {?} m - A {\@link MapService} instance.
     * @param {?} ma
     * @return {?} - A concrete instance of a InfoBox Service based on the underlying map architecture.
     */
    function InfoBoxServiceFactory(f, m, ma) { return f.CreateInfoBoxService(m, ma); }
    /**
     * Factory function to generate a layer service instance. This is necessary because of constraints with AOT that do no allow
     * us to use lamda functions inline.
     *
     * @export
     * @param {?} f - The {\@link MapServiceFactory} implementation.
     * @param {?} m - A {\@link MapService} instance.
     * @return {?} - A concrete instance of a Layer Service based on the underlying map architecture.
     */
    function LayerServiceFactory(f, m) { return f.CreateLayerService(m); }
    /**
     * Factory function to generate a map service instance. This is necessary because of constraints with AOT that do no allow
     * us to use lamda functions inline.
     *
     * @export
     * @param {?} f - The {\@link MapServiceFactory} implementation.
     * @return {?} - A concrete instance of a MapService based on the underlying map architecture.
     */
    function MapServiceCreator(f) { return f.Create(); }
    /**
     * Factory function to generate a marker service instance. This is necessary because of constraints with AOT that do no allow
     * us to use lamda functions inline.
     *
     * @export
     * @param {?} f - The {\@link MapServiceFactory} implementation.
     * @param {?} m - A {\@link MapService} instance.
     * @param {?} l - A {\@link LayerService} instance.
     * @param {?} c - A {\@link ClusterService} instance.
     * @return {?} - A concrete instance of a Marker Service based on the underlying map architecture.
     */
    function MarkerServiceFactory(f, m, l, c) {
        return f.CreateMarkerService(m, l, c);
    }
    /**
     * Factory function to generate a polygon service instance. This is necessary because of constraints with AOT that do no allow
     * us to use lamda functions inline.
     *
     * @export
     * @param {?} f - The {\@link MapServiceFactory} implementation.
     * @param {?} m - A {\@link MapService} instance.
     * @param {?} l - A {\@link LayerService} instance.
     * @return {?} - A concrete instance of a Polygon Service based on the underlying map architecture.
     */
    function PolygonServiceFactory(f, m, l) {
        return f.CreatePolygonService(m, l);
    }
    /**
     * Factory function to generate a polyline service instance. This is necessary because of constraints with AOT that do no allow
     * us to use lamda functions inline.
     *
     * @export
     * @param {?} f - The {\@link MapServiceFactory} implementation.
     * @param {?} m - A {\@link MapService} instance.
     * @param {?} l - A {\@link LayerService} instance.
     * @return {?} - A concrete instance of a Polyline Service based on the underlying map architecture.
     */
    function PolylineServiceFactory(f, m, l) {
        return f.CreatePolylineService(m, l);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * internal counter to use as ids for multiple layers.
      @type {?} */
    var layerId = 0;
    /**
     * MapLayerDirective creates a layer on a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapMarkerDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *   .map-container {
     *     height: 300px;
     *   }
     * `],
     * template: `
     *   <x-map [Latitude]='lat' [Longitude]='lng' [Zoom]='zoom'>
     *     <x-map-layer [Visible]='visible'>
     *         <x-map-marker [Latitude]='lat' [Longitude]='lng' [Label]=''M''></x-map-marker>
     *     </x-map-layer>
     *   </x-map>
     * `
     * })
     * ```
     *
     * @export
     */
    var MapLayerDirective = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapLayerDirective.
         * @param _layerService - Concreted implementation of a layer service for the underlying maps implementations.
         * Generally provided via injections.
         * @param _containerRef - Reference to the container hosting the map canvas. Generally provided via injection.
         *
         * @memberof MapLayerDirective
         */
        function MapLayerDirective(_layerService, _containerRef) {
            this._layerService = _layerService;
            this._containerRef = _containerRef;
            this._visible = true;
            this._addedToManager = false;
            this._id = layerId++;
        }
        Object.defineProperty(MapLayerDirective.prototype, "Visible", {
            ///
            /// Property declarations
            ///
            /**
             * Gets or sets the layer visibility.
             *
             * @memberof MapLayerDirective
             */
            get: /**
             * Gets or sets the layer visibility.
             *
             * \@memberof MapLayerDirective
             * @return {?}
             */ function () { return this._visible; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._visible = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapLayerDirective.prototype, "Id", {
            get: /**
             * Gets the layer id.
             *
             * \@readonly
             * \@memberof MapLayerDirective
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        /**
         * Called on Component initialization. Part of ng Component life cycle.
         *
         * \@memberof MapLayerDirective
         * @return {?}
         */
        MapLayerDirective.prototype.ngOnInit = /**
         * Called on Component initialization. Part of ng Component life cycle.
         *
         * \@memberof MapLayerDirective
         * @return {?}
         */
            function () {
                this._containerRef.element.nativeElement.attributes['layerId'] = this._id.toString();
                this._layerService.AddLayer(this);
                this._addedToManager = true;
            };
        /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapLayerDirective
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
        MapLayerDirective.prototype.ngOnChanges = /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapLayerDirective
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
            function (changes) {
                if (!this._addedToManager) {
                    return;
                }
                if (changes['Visible']) {
                    this._layerService.GetNativeLayer(this).then(function (l) {
                        l.SetVisible(!l.GetVisible());
                    });
                }
            };
        /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         *
         * \@memberof MapLayerDirective
         * @return {?}
         */
        MapLayerDirective.prototype.ngOnDestroy = /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         *
         * \@memberof MapLayerDirective
         * @return {?}
         */
            function () {
                this._layerService.DeleteLayer(this);
            };
        MapLayerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-map-layer'
                    },] },
        ];
        /** @nocollapse */
        MapLayerDirective.ctorParameters = function () {
            return [
                { type: LayerService },
                { type: core.ViewContainerRef }
            ];
        };
        MapLayerDirective.propDecorators = {
            _markers: [{ type: core.ContentChildren, args: [MapMarkerDirective,] }],
            Visible: [{ type: core.Input }]
        };
        return MapLayerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     *
     * Creates a cluster layer on a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapMarkerDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *   .map-container {
     *     height: 300px;
     *   }
     * `],
     * template: `
     *   <x-map [Latitude]='lat' [Longitude]='lng' [Zoom]='zoom'>
     *     <x-cluster-layer [Visible]='visible'>
     *         <x-map-marker [Latitude]='lat' [Longitude]='lng' [Label]=''M''></x-map-marker>
     *     </x-cluster-layer>
     *   </x-map>
     * `
     * })
     * ```
     *
     * @export
     */
    var ClusterLayerDirective = (function (_super) {
        __extends(ClusterLayerDirective, _super);
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of ClusterLayerDirective.
         *
         * @param _layerService - Concreted implementation of a cluster layer service for the underlying maps
         * implementations. Generally provided via injections.
         * @param _containerRef - A reference to the view container of the layer. Generally provided via injection.
         *
         * @memberof ClusterLayerDirective
         */
        function ClusterLayerDirective(_layerService, _containerRef) {
            var _this = _super.call(this, _layerService, _containerRef) || this;
            _this._clusteringEnabled = true;
            _this._clusterPlacementMode = ClusterPlacementMode.MeanValue;
            _this._clusterClickAction = ClusterClickAction.ZoomIntoCluster;
            _this._useDynamicSizeMarker = false;
            _this._dynamicMarkerBaseSize = 18;
            _this._dynamicMarkerRanges = new Map([
                [10, 'rgba(20, 180, 20, 0.5)'],
                [100, 'rgba(255, 210, 40, 0.5)'],
                [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
            ]);
            _this._zoomOnClick = true;
            return _this;
        }
        Object.defineProperty(ClusterLayerDirective.prototype, "ClusterClickAction", {
            ///
            /// Property defintions
            ///
            /**
             * Gets or sets the the Cluster Click Action {@link ClusterClickAction}.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._clusterClickAction; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._clusterClickAction = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "ClusteringEnabled", {
            /**
             * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
             * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
             * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._clusteringEnabled; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._clusteringEnabled = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "ClusterPlacementMode", {
            /**
             * Gets or sets the cluster placement mode. {@link ClusterPlacementMode}
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._clusterPlacementMode; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._clusterPlacementMode = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "CustomMarkerCallback", {
            /**
             * Gets or sets the callback invoked to create a custom cluster marker. Note that when {@link UseDynamicSizeMarkers} is enabled,
             * you cannot set a custom marker callback.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
             * you cannot set a custom marker callback.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._iconCreationCallback; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                if (this._useDynamicSizeMarker) {
                    throw (new Error("You cannot set a custom marker callback when UseDynamicSizeMarkers is set to true.\n                    Set UseDynamicSizeMakers to false."));
                }
                this._iconCreationCallback = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "DynamicMarkerBaseSize", {
            /**
             * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
             * See {@link UseDynamicSizeMarkers}.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
             * See {\@link UseDynamicSizeMarkers}.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._dynamicMarkerBaseSize; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._dynamicMarkerBaseSize = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "DynamicMarkerRanges", {
            /**
             * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
             * The map contains key/value pairs, with the keys being
             * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {@link UseDynamicSizeMarkers}.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
             * The map contains key/value pairs, with the keys being
             * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {\@link UseDynamicSizeMarkers}.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._dynamicMarkerRanges; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._dynamicMarkerRanges = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "GridSize", {
            /**
             * Gets or sets the grid size to be used for clustering.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the grid size to be used for clustering.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._gridSize; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._gridSize = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "IconInfo", {
            /**
             * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
             * See {@link IMarkerIconInfo}.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
             * See {\@link IMarkerIconInfo}.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._iconInfo; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._iconInfo = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "LayerOffset", {
            /**
             * Gets or sets An offset applied to the positioning of the layer.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets An offset applied to the positioning of the layer.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._layerOffset; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._layerOffset = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "MinimumClusterSize", {
            /**
             * Gets or sets the minimum pins required to form a cluster
             *
             * @readonly
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the minimum pins required to form a cluster
             *
             * \@readonly
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._minimumClusterSize; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._minimumClusterSize = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "SpiderClusterOptions", {
            /**
             * Gets or sets the options for spider clustering behavior. See {@link ISpiderClusterOptions}
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the options for spider clustering behavior. See {\@link ISpiderClusterOptions}
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._spiderClusterOptions; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._spiderClusterOptions = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "Styles", {
            /**
             * Gets or sets the cluster styles
             *
             * @readonly
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the cluster styles
             *
             * \@readonly
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._styles; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._styles = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "UseDynamicSizeMarkers", {
            /**
             * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
             * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
             * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._useDynamicSizeMarker; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                var _this = this;
                this._useDynamicSizeMarker = val;
                if (val) {
                    this._iconCreationCallback = function (m, info) {
                        return ClusterLayerDirective.CreateDynamicSizeMarker(m.length, info, _this._dynamicMarkerBaseSize, _this._dynamicMarkerRanges);
                    };
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "ZIndex", {
            /**
             * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._zIndex; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._zIndex = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClusterLayerDirective.prototype, "ZoomOnClick", {
            /**
             * Gets or sets whether the cluster should zoom in on click
             *
             * @readonly
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets whether the cluster should zoom in on click
             *
             * \@readonly
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._zoomOnClick; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._zoomOnClick = val; },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates the dynamic size marker to be used for cluster markers if UseDynamicSizeMarkers is set to true.
         *
         * \@memberof ClusterLayerDirective
         * @param {?} size - The number of markers in the cluster.
         * @param {?} info  - The icon info to be used. This will be hydrated with
         * the actualy dimensions of the created markers and is used by the underlying model/services
         * to correctly offset the marker for correct positioning.
         * @param {?} baseMarkerSize - The base size for dynmic markers.
         * @param {?} ranges - The ranges to use to calculate breakpoints and colors for dynamic markers.
         * The map contains key/value pairs, with the keys being
         * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range.
         * @return {?} - An string containing the SVG for the marker.
         *
         */
        ClusterLayerDirective.CreateDynamicSizeMarker = /**
         * Creates the dynamic size marker to be used for cluster markers if UseDynamicSizeMarkers is set to true.
         *
         * \@memberof ClusterLayerDirective
         * @param {?} size - The number of markers in the cluster.
         * @param {?} info  - The icon info to be used. This will be hydrated with
         * the actualy dimensions of the created markers and is used by the underlying model/services
         * to correctly offset the marker for correct positioning.
         * @param {?} baseMarkerSize - The base size for dynmic markers.
         * @param {?} ranges - The ranges to use to calculate breakpoints and colors for dynamic markers.
         * The map contains key/value pairs, with the keys being
         * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range.
         * @return {?} - An string containing the SVG for the marker.
         *
         */
            function (size, info, baseMarkerSize, ranges) {
                /** @type {?} */
                var mr = baseMarkerSize;
                /** @type {?} */
                var outline = mr * 0.35;
                /** @type {?} */
                var total = size;
                /** @type {?} */
                var r = Math.log(total) / Math.log(10) * 5 + mr;
                /** @type {?} */
                var d = r * 2;
                /** @type {?} */
                var fillColor;
                ranges.forEach(function (v, k) {
                    if (total <= k && !fillColor) {
                        fillColor = v;
                    }
                });
                if (!fillColor) {
                    fillColor = 'rgba(20, 180, 20, 0.5)';
                }
                /** @type {?} */
                var svg = ["<svg xmlns='http://www.w3.org/2000/svg' width='" + d + "' height='" + d + "'>",
                    "<circle cx='" + r + "' cy='" + r + "' r='" + r + "' fill='" + fillColor + "'/>",
                    "<circle cx='" + r + "' cy='" + r + "' r='" + (r - outline) + "' fill='" + fillColor + "'/>",
                    "</svg>"];
                info.size = { width: d, height: d };
                info.markerOffsetRatio = { x: 0.5, y: 0.5 };
                info.textOffset = { x: 0, y: r - 8 };
                return svg.join('');
            };
        /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof ClusterLayerDirective
         * @param {?} changes - collection of changes.
         *
         * @return {?}
         */
        ClusterLayerDirective.prototype.ngOnChanges = /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof ClusterLayerDirective
         * @param {?} changes - collection of changes.
         *
         * @return {?}
         */
            function (changes) {
                if (!this._addedToManager) {
                    return;
                }
                if (changes['ClusterClickAction']) {
                    throw (new Error('You cannot change the ClusterClickAction after the layer has been added to the layerservice.'));
                }
                /** @type {?} */
                var options = { id: this._id };
                if (changes['ClusteringEnabled']) {
                    options.clusteringEnabled = this._clusteringEnabled;
                }
                if (changes['GridSize']) {
                    options.gridSize = this._gridSize;
                }
                if (changes['LayerOffset']) {
                    options.layerOffset = this._layerOffset;
                }
                if (changes['SpiderClusterOptions']) {
                    options.spiderClusterOptions = this._spiderClusterOptions;
                }
                if (changes['ZIndex']) {
                    options.zIndex = this._zIndex;
                }
                if (changes['Visible']) {
                    options.visible = this._visible;
                }
                this._layerService.GetNativeLayer(this).then(function (l) {
                    l.SetOptions(options);
                });
            };
        ClusterLayerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-cluster-layer'
                    },] },
        ];
        /** @nocollapse */
        ClusterLayerDirective.ctorParameters = function () {
            return [
                { type: ClusterService },
                { type: core.ViewContainerRef }
            ];
        };
        ClusterLayerDirective.propDecorators = {
            ClusterClickAction: [{ type: core.Input }],
            ClusteringEnabled: [{ type: core.Input }],
            ClusterPlacementMode: [{ type: core.Input }],
            CustomMarkerCallback: [{ type: core.Input }],
            DynamicMarkerBaseSize: [{ type: core.Input }],
            DynamicMarkerRanges: [{ type: core.Input }],
            GridSize: [{ type: core.Input }],
            IconInfo: [{ type: core.Input }],
            LayerOffset: [{ type: core.Input }],
            MinimumClusterSize: [{ type: core.Input }],
            SpiderClusterOptions: [{ type: core.Input }],
            Styles: [{ type: core.Input }],
            UseDynamicSizeMarkers: [{ type: core.Input }],
            ZIndex: [{ type: core.Input }],
            ZoomOnClick: [{ type: core.Input }]
        };
        return ClusterLayerDirective;
    }(MapLayerDirective));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var polygonId = 0;
    /**
     *
     * MapPolygonDirective renders a polygon inside a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapPolygonDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map,
     *  styles: [`
     *   .map-container { height: 300px; }
     * `],
     * template: `
     *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-polygon [Paths]="path"></x-map-polygon>
     *   </x-map>
     * `
     * })
     * ```
     *
     *
     * @export
     */
    var MapPolygonDirective = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapPolygonDirective.
         * @param _polygonManager
         *
         * @memberof MapPolygonDirective
         */
        function MapPolygonDirective(_polygonService, _containerRef) {
            this._polygonService = _polygonService;
            this._containerRef = _containerRef;
            this._inCustomLayer = false;
            this._addedToService = false;
            this._events = [];
            /**
             * Gets or sets whether this Polygon handles mouse events.
             *
             * \@memberof MapPolygonDirective
             */
            this.Clickable = true;
            /**
             * If set to true, the user can drag this shape over the map.
             *
             * \@memberof MapPolygonDirective
             */
            this.Draggable = false;
            /**
             * If set to true, the user can edit this shape by dragging the control
             * points shown at the vertices and on each segment.
             *
             * \@memberof MapPolygonDirective
             */
            this.Editable = false;
            /**
             * When true, edges of the polygon are interpreted as geodesic and will
             * follow the curvature of the Earth. When false, edges of the polygon are
             * rendered as straight lines in screen space. Note that the shape of a
             * geodesic polygon may appear to change when dragged, as the dimensions
             * are maintained relative to the surface of the earth. Defaults to false.
             *
             * \@memberof MapPolygonDirective
             */
            this.Geodesic = false;
            /**
             * Arbitary metadata to assign to the Polygon. This is useful for events
             *
             * \@memberof MapPolygonDirective
             */
            this.Metadata = new Map();
            /**
             * The ordered sequence of coordinates that designates a closed loop.
             * Unlike polylines, a polygon may consist of one or more paths.
             * As a result, the paths property may specify one or more arrays of
             * LatLng coordinates. Paths are closed automatically; do not repeat the
             * first vertex of the path as the last vertex. Simple polygons may be
             * defined using a single array of LatLngs. More complex polygons may
             * specify an array of arrays (for inner loops ). Any simple arrays are converted into Arrays.
             * Inserting or removing LatLngs from the Array will automatically update
             * the polygon on the map.
             *
             * \@memberof MapPolygonDirective
             */
            this.Paths = [];
            /**
             * Whether to show the title of the polygon as the tooltip on the polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.ShowTooltip = true;
            /**
             * This event is fired when the DOM click event is fired on the Polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.Click = new core.EventEmitter();
            /**
             * This event is fired when the DOM dblclick event is fired on the Polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.DblClick = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.Drag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.DragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.DragStart = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the Polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.MouseDown = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the Polygon.
             *
             * \@memberof MapPolygonDirective
             */
            this.MouseMove = new core.EventEmitter();
            /**
             * This event is fired on Polygon mouseout.
             *
             * \@memberof MapPolygonDirective
             */
            this.MouseOut = new core.EventEmitter();
            /**
             * This event is fired on Polygon mouseover.
             *
             * \@memberof MapPolygonDirective
             */
            this.MouseOver = new core.EventEmitter();
            /**
             * This event is fired whe the DOM mouseup event is fired on the Polygon
             *
             * \@memberof MapPolygonDirective
             */
            this.MouseUp = new core.EventEmitter();
            /**
             * This event is fired when the Polygon is right-clicked on.
             *
             * \@memberof MapPolygonDirective
             */
            this.RightClick = new core.EventEmitter();
            /**
             * This event is fired when editing has completed.
             *
             * \@memberof MapPolygonDirective
             */
            this.PathChanged = new core.EventEmitter();
            this._id = polygonId++;
        }
        Object.defineProperty(MapPolygonDirective.prototype, "AddedToService", {
            get: /**
             * Gets whether the polygon has been registered with the service.
             * \@readonly
             * \@memberof MapPolygonDirective
             * @return {?}
             */ function () { return this._addedToService; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolygonDirective.prototype, "Id", {
            get: /**
             * Get the id of the polygon.
             *
             * \@readonly
             * \@memberof MapPolygonDirective
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolygonDirective.prototype, "IdAsString", {
            get: /**
             * Gets the id of the polygon as a string.
             *
             * \@readonly
             * \@memberof MapPolygonDirective
             * @return {?}
             */ function () { return this._id.toString(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolygonDirective.prototype, "InCustomLayer", {
            get: /**
             * Gets whether the polygon is in a custom layer. See {\@link MapLayer}.
             *
             * \@readonly
             * \@memberof MapPolygonDirective
             * @return {?}
             */ function () { return this._inCustomLayer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolygonDirective.prototype, "LayerId", {
            get: /**
             * gets the id of the Layer the polygon belongs to.
             *
             * \@readonly
             * \@memberof MapPolygonDirective
             * @return {?}
             */ function () { return this._layerId; },
            enumerable: true,
            configurable: true
        });
        ///
        /// Public methods
        ///
        /**
         * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
         *
         * @memberof MapPolygonDirective
         */
        /**
         * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
         *
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        MapPolygonDirective.prototype.ngAfterContentInit = /**
         * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
         *
         * \@memberof MapPolygonDirective
         * @return {?}
         */
            function () {
                if (this._containerRef.element.nativeElement.parentElement) {
                    /** @type {?} */
                    var parentName = this._containerRef.element.nativeElement.parentElement.tagName;
                    if (parentName.toLowerCase() === 'x-map-layer') {
                        this._inCustomLayer = true;
                        this._layerId = Number(this._containerRef.element.nativeElement.parentElement.attributes['layerId']);
                    }
                }
                if (!this._addedToService) {
                    this._polygonService.AddPolygon(this);
                    this._addedToService = true;
                    this.AddEventListeners();
                }
                return;
            };
        /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * @param changes - Changes that have occured.
         *
         * @memberof MapPolygonDirective
         */
        /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapPolygonDirective
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
        MapPolygonDirective.prototype.ngOnChanges = /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapPolygonDirective
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
            function (changes) {
                if (!this._addedToService) {
                    return;
                }
                /** @type {?} */
                var o = this.GeneratePolygonChangeSet(changes);
                if (o != null) {
                    this._polygonService.SetOptions(this, o);
                }
                if (changes['Paths'] && !changes['Paths'].isFirstChange()) {
                    this._polygonService.UpdatePolygon(this);
                }
            };
        /**
         * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
         *
         *
         * @memberof MapPolygonDirective
         */
        /**
         * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
         *
         *
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        MapPolygonDirective.prototype.ngOnDestroy = /**
         * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
         *
         *
         * \@memberof MapPolygonDirective
         * @return {?}
         */
            function () {
                this._polygonService.DeletePolygon(this);
                this._events.forEach(function (s) { return s.unsubscribe(); });
            };
        /**
         * Wires up the event receivers.
         *
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        MapPolygonDirective.prototype.AddEventListeners = /**
         * Wires up the event receivers.
         *
         * \@memberof MapPolygonDirective
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var _getEventArg = function (e) {
                    return {
                        Polygon: _this,
                        Click: e
                    };
                };
                this._events.push(this._polygonService.CreateEventObservable('click', this).subscribe(function (ev) {
                    if (_this._infoBox != null) {
                        _this._infoBox.Open(_this._polygonService.GetCoordinatesFromClick(ev));
                    }
                    _this.Click.emit(_getEventArg(ev));
                }));
                /** @type {?} */
                var handlers = [
                    { name: 'dblclick', handler: function (ev) { return _this.DblClick.emit(_getEventArg(ev)); } },
                    { name: 'drag', handler: function (ev) { return _this.Drag.emit(_getEventArg(ev)); } },
                    { name: 'dragend', handler: function (ev) { return _this.DragEnd.emit(_getEventArg(ev)); } },
                    { name: 'dragstart', handler: function (ev) { return _this.DragStart.emit(_getEventArg(ev)); } },
                    { name: 'mousedown', handler: function (ev) { return _this.MouseDown.emit(_getEventArg(ev)); } },
                    { name: 'mousemove', handler: function (ev) { return _this.MouseMove.emit(_getEventArg(ev)); } },
                    { name: 'mouseout', handler: function (ev) { return _this.MouseOut.emit(_getEventArg(ev)); } },
                    { name: 'mouseover', handler: function (ev) { return _this.MouseOver.emit(_getEventArg(ev)); } },
                    { name: 'mouseup', handler: function (ev) { return _this.MouseUp.emit(_getEventArg(ev)); } },
                    { name: 'rightclick', handler: function (ev) { return _this.RightClick.emit(_getEventArg(ev)); } },
                    { name: 'pathchanged', handler: function (ev) { return _this.PathChanged.emit(ev); } }
                ];
                handlers.forEach(function (obj) {
                    /** @type {?} */
                    var os = _this._polygonService.CreateEventObservable(obj.name, _this).subscribe(obj.handler);
                    _this._events.push(os);
                });
            };
        /**
         * Generates IPolygon option changeset from directive settings.
         *
         * \@memberof MapPolygonDirective
         * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
         * @return {?} - {\@link IPolygonOptions} containing the polygon options.
         *
         */
        MapPolygonDirective.prototype.GeneratePolygonChangeSet = /**
         * Generates IPolygon option changeset from directive settings.
         *
         * \@memberof MapPolygonDirective
         * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
         * @return {?} - {\@link IPolygonOptions} containing the polygon options.
         *
         */
            function (changes) {
                /** @type {?} */
                var options = { id: this._id };
                /** @type {?} */
                var hasOptions = false;
                if (changes['Clickable']) {
                    options.clickable = this.Clickable;
                    hasOptions = true;
                }
                if (changes['Draggable']) {
                    options.draggable = this.Draggable;
                    hasOptions = true;
                }
                if (changes['Editable']) {
                    options.editable = this.Editable;
                    hasOptions = true;
                }
                if (changes['FillColor'] || changes['FillOpacity']) {
                    options.fillColor = this.FillColor;
                    options.fillOpacity = this.FillOpacity;
                    hasOptions = true;
                }
                if (changes['Geodesic']) {
                    options.geodesic = this.Geodesic;
                    hasOptions = true;
                }
                if (changes['LabelMaxZoom']) {
                    options.labelMaxZoom = this.LabelMaxZoom;
                    hasOptions = true;
                }
                if (changes['LabelMinZoom']) {
                    options.labelMinZoom = this.LabelMinZoom;
                    hasOptions = true;
                }
                if (changes['ShowTooltip']) {
                    options.showTooltip = this.ShowTooltip;
                    hasOptions = true;
                }
                if (changes['ShowLabel']) {
                    options.showLabel = this.ShowLabel;
                    hasOptions = true;
                }
                if (changes['StrokeColor'] || changes['StrokeOpacity']) {
                    options.strokeColor = this.StrokeColor;
                    options.strokeOpacity = this.StrokeOpacity;
                    hasOptions = true;
                }
                if (changes['StrokeWeight']) {
                    options.strokeWeight = this.StrokeWeight;
                    hasOptions = true;
                }
                if (changes['Title']) {
                    options.title = this.Title;
                    hasOptions = true;
                }
                if (changes['Visible']) {
                    options.visible = this.Visible;
                    hasOptions = true;
                }
                if (changes['zIndex']) {
                    options.zIndex = this.zIndex;
                    hasOptions = true;
                }
                return hasOptions ? options : null;
            };
        MapPolygonDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-map-polygon'
                    },] },
        ];
        /** @nocollapse */
        MapPolygonDirective.ctorParameters = function () {
            return [
                { type: PolygonService },
                { type: core.ViewContainerRef }
            ];
        };
        MapPolygonDirective.propDecorators = {
            _infoBox: [{ type: core.ContentChild, args: [InfoBoxComponent,] }],
            Clickable: [{ type: core.Input }],
            Draggable: [{ type: core.Input }],
            Editable: [{ type: core.Input }],
            FillColor: [{ type: core.Input }],
            FillOpacity: [{ type: core.Input }],
            Geodesic: [{ type: core.Input }],
            LabelMaxZoom: [{ type: core.Input }],
            LabelMinZoom: [{ type: core.Input }],
            Metadata: [{ type: core.Input }],
            Paths: [{ type: core.Input }],
            ShowLabel: [{ type: core.Input }],
            ShowTooltip: [{ type: core.Input }],
            StrokeColor: [{ type: core.Input }],
            StrokeOpacity: [{ type: core.Input }],
            StrokeWeight: [{ type: core.Input }],
            Title: [{ type: core.Input }],
            Visible: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            Click: [{ type: core.Output }],
            DblClick: [{ type: core.Output }],
            Drag: [{ type: core.Output }],
            DragEnd: [{ type: core.Output }],
            DragStart: [{ type: core.Output }],
            MouseDown: [{ type: core.Output }],
            MouseMove: [{ type: core.Output }],
            MouseOut: [{ type: core.Output }],
            MouseOver: [{ type: core.Output }],
            MouseUp: [{ type: core.Output }],
            RightClick: [{ type: core.Output }],
            PathChanged: [{ type: core.Output }]
        };
        return MapPolygonDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var polylineId = 0;
    /**
     *
     * MapPolylineDirective renders a polyline inside a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapPolylineDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map,
     *  styles: [`
     *   .map-container { height: 300px; }
     * `],
     * template: `
     *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-polyline [Paths]="path"></x-map-polyline>
     *   </x-map>
     * `
     * })
     * ```
     *
     *
     * @export
     */
    var MapPolylineDirective = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapPolylineDirective.
         * @param _polylineManager
         *
         * @memberof MapPolylineDirective
         */
        function MapPolylineDirective(_polylineService, _containerRef) {
            this._polylineService = _polylineService;
            this._containerRef = _containerRef;
            this._inCustomLayer = false;
            this._addedToService = false;
            this._events = [];
            /**
             * Gets or sets whether this Polyline handles mouse events.
             *
             * \@memberof MapPolylineDirective
             */
            this.Clickable = true;
            /**
             * If set to true, the user can drag this shape over the map.
             *
             * \@memberof MapPolylineDirective
             */
            this.Draggable = false;
            /**
             * If set to true, the user can edit this shape by dragging the control
             * points shown at the vertices and on each segment.
             *
             * \@memberof MapPolylineDirective
             */
            this.Editable = false;
            /**
             * When true, edges of the polyline are interpreted as geodesic and will
             * follow the curvature of the Earth. When false, edges of the polyline are
             * rendered as straight lines in screen space. Note that the shape of a
             * geodesic polyline may appear to change when dragged, as the dimensions
             * are maintained relative to the surface of the earth. Defaults to false.
             *
             * \@memberof MapPolylineDirective
             */
            this.Geodesic = false;
            /**
             * Arbitary metadata to assign to the Polyline. This is useful for events
             *
             * \@memberof MapPolylineDirective
             */
            this.Metadata = new Map();
            /**
             * The ordered sequence of coordinates that designates a polyline.
             * Simple polylines may be defined using a single array of LatLngs. More
             * complex polylines may specify an array of arrays.
             *
             * \@memberof MapPolylineDirective
             */
            this.Path = [];
            /**
             * Whether to show the title of the polyline as the tooltip on the polygon.
             *
             * \@memberof MapPolylineDirective
             */
            this.ShowTooltip = true;
            /**
             * This event is fired when the DOM click event is fired on the Polyline.
             *
             * \@memberof MapPolylineDirective
             */
            this.Click = new core.EventEmitter();
            /**
             * This event is fired when the DOM dblclick event is fired on the Polyline.
             *
             * \@memberof MapPolylineDirective
             */
            this.DblClick = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the polyline.
             *
             * \@memberof MapPolylineDirective
             */
            this.Drag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the polyline.
             *
             * \@memberof MapPolylineDirective
             */
            this.DragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the polyline.
             *
             * \@memberof MapPolylineDirective
             */
            this.DragStart = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the Polyline.
             *
             * \@memberof MapPolylineDirective
             */
            this.MouseDown = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the Polyline.
             *
             * \@memberof MapPolylineDirective
             */
            this.MouseMove = new core.EventEmitter();
            /**
             * This event is fired on Polyline mouseout.
             *
             * \@memberof MapPolylineDirective
             */
            this.MouseOut = new core.EventEmitter();
            /**
             * This event is fired on Polyline mouseover.
             *
             * \@memberof MapPolylineDirective
             */
            this.MouseOver = new core.EventEmitter();
            /**
             * This event is fired whe the DOM mouseup event is fired on the Polyline
             *
             * \@memberof MapPolylineDirective
             */
            this.MouseUp = new core.EventEmitter();
            /**
             * This even is fired when the Polyline is right-clicked on.
             *
             * \@memberof MapPolylineDirective
             */
            this.RightClick = new core.EventEmitter();
            this._id = polylineId++;
        }
        Object.defineProperty(MapPolylineDirective.prototype, "AddedToService", {
            get: /**
             * Gets whether the polyline has been registered with the service.
             * \@readonly
             * \@memberof MapPolylineDirective
             * @return {?}
             */ function () { return this._addedToService; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolylineDirective.prototype, "Id", {
            get: /**
             * Get the id of the polyline.
             *
             * \@readonly
             * \@memberof MapPolylineDirective
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolylineDirective.prototype, "IdAsString", {
            get: /**
             * Gets the id of the polyline as a string.
             *
             * \@readonly
             * \@memberof MapPolylineDirective
             * @return {?}
             */ function () { return this._id.toString(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolylineDirective.prototype, "InCustomLayer", {
            get: /**
             * Gets whether the polyline is in a custom layer. See {\@link MapLayer}.
             *
             * \@readonly
             * \@memberof MapPolylineDirective
             * @return {?}
             */ function () { return this._inCustomLayer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolylineDirective.prototype, "LayerId", {
            get: /**
             * gets the id of the Layer the polyline belongs to.
             *
             * \@readonly
             * \@memberof MapPolylineDirective
             * @return {?}
             */ function () { return this._layerId; },
            enumerable: true,
            configurable: true
        });
        ///
        /// Public methods
        ///
        /**
         * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
         *
         * @memberof MapPolylineDirective
         */
        /**
         * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
         *
         * \@memberof MapPolylineDirective
         * @return {?}
         */
        MapPolylineDirective.prototype.ngAfterContentInit = /**
         * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
         *
         * \@memberof MapPolylineDirective
         * @return {?}
         */
            function () {
                if (this._containerRef.element.nativeElement.parentElement) {
                    /** @type {?} */
                    var parentName = this._containerRef.element.nativeElement.parentElement.tagName;
                    if (parentName.toLowerCase() === 'x-map-layer') {
                        this._inCustomLayer = true;
                        this._layerId = Number(this._containerRef.element.nativeElement.parentElement.attributes['layerId']);
                    }
                }
                if (!this._addedToService) {
                    this._polylineService.AddPolyline(this);
                    this._addedToService = true;
                    this.AddEventListeners();
                }
                return;
            };
        /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * @param changes - Changes that have occured.
         *
         * @memberof MapPolylineDirective
         */
        /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapPolylineDirective
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
        MapPolylineDirective.prototype.ngOnChanges = /**
         * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
         *
         * \@memberof MapPolylineDirective
         * @param {?} changes - Changes that have occured.
         *
         * @return {?}
         */
            function (changes) {
                if (!this._addedToService) {
                    return;
                }
                /** @type {?} */
                var o = this.GeneratePolylineChangeSet(changes);
                if (o != null) {
                    this._polylineService.SetOptions(this, o);
                }
                if (changes['Path'] && !changes['Path'].isFirstChange()) {
                    this._polylineService.UpdatePolyline(this);
                }
            };
        /**
         * Called when the polyline is being destroyed. Part of the ng Component life cycle. Release resources.
         *
         *
         * @memberof MapPolylineDirective
         */
        /**
         * Called when the polyline is being destroyed. Part of the ng Component life cycle. Release resources.
         *
         *
         * \@memberof MapPolylineDirective
         * @return {?}
         */
        MapPolylineDirective.prototype.ngOnDestroy = /**
         * Called when the polyline is being destroyed. Part of the ng Component life cycle. Release resources.
         *
         *
         * \@memberof MapPolylineDirective
         * @return {?}
         */
            function () {
                this._polylineService.DeletePolyline(this);
                this._events.forEach(function (s) { return s.unsubscribe(); });
            };
        /**
         * Wires up the event receivers.
         *
         * \@memberof MapPolylineDirective
         * @return {?}
         */
        MapPolylineDirective.prototype.AddEventListeners = /**
         * Wires up the event receivers.
         *
         * \@memberof MapPolylineDirective
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var _getEventArg = function (e) {
                    return {
                        Polyline: _this,
                        Click: e
                    };
                };
                this._polylineService.CreateEventObservable('click', this).subscribe(function (ev) {
                    if (_this._infoBox != null) {
                        _this._infoBox.Open(_this._polylineService.GetCoordinatesFromClick(ev));
                    }
                    _this.Click.emit(_getEventArg(ev));
                });
                /** @type {?} */
                var handlers = [
                    { name: 'dblclick', handler: function (ev) { return _this.DblClick.emit(_getEventArg(ev)); } },
                    { name: 'drag', handler: function (ev) { return _this.Drag.emit(_getEventArg(ev)); } },
                    { name: 'dragend', handler: function (ev) { return _this.DragEnd.emit(_getEventArg(ev)); } },
                    { name: 'dragstart', handler: function (ev) { return _this.DragStart.emit(_getEventArg(ev)); } },
                    { name: 'mousedown', handler: function (ev) { return _this.MouseDown.emit(_getEventArg(ev)); } },
                    { name: 'mousemove', handler: function (ev) { return _this.MouseMove.emit(_getEventArg(ev)); } },
                    { name: 'mouseout', handler: function (ev) { return _this.MouseOut.emit(_getEventArg(ev)); } },
                    { name: 'mouseover', handler: function (ev) { return _this.MouseOver.emit(_getEventArg(ev)); } },
                    { name: 'mouseup', handler: function (ev) { return _this.MouseUp.emit(_getEventArg(ev)); } },
                    { name: 'rightclick', handler: function (ev) { return _this.RightClick.emit(_getEventArg(ev)); } },
                ];
                handlers.forEach(function (obj) {
                    /** @type {?} */
                    var os = _this._polylineService.CreateEventObservable(obj.name, _this).subscribe(obj.handler);
                    _this._events.push(os);
                });
            };
        /**
         * Generates IPolyline option changeset from directive settings.
         *
         * \@memberof MapPolylineDirective
         * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
         * @return {?} - {\@link IPolylineOptions} containing the polyline options.
         *
         */
        MapPolylineDirective.prototype.GeneratePolylineChangeSet = /**
         * Generates IPolyline option changeset from directive settings.
         *
         * \@memberof MapPolylineDirective
         * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
         * @return {?} - {\@link IPolylineOptions} containing the polyline options.
         *
         */
            function (changes) {
                /** @type {?} */
                var options = { id: this._id };
                /** @type {?} */
                var hasOptions = false;
                if (changes['Clickable']) {
                    options.clickable = this.Clickable;
                    hasOptions = true;
                }
                if (changes['Draggable']) {
                    options.draggable = this.Draggable;
                    hasOptions = true;
                }
                if (changes['Editable']) {
                    options.editable = this.Editable;
                    hasOptions = true;
                }
                if (changes['Geodesic']) {
                    options.geodesic = this.Geodesic;
                    hasOptions = true;
                }
                if (changes['ShowTooltip']) {
                    options.showTooltip = this.ShowTooltip;
                    hasOptions = true;
                }
                if (changes['StrokeColor']) {
                    options.strokeColor = this.StrokeColor;
                    hasOptions = true;
                }
                if (changes['StrokeOpacity']) {
                    options.strokeOpacity = this.StrokeOpacity;
                    hasOptions = true;
                }
                if (changes['StrokeWeight']) {
                    options.strokeWeight = this.StrokeWeight;
                    hasOptions = true;
                }
                if (changes['Title']) {
                    options.title = this.Title;
                    hasOptions = true;
                }
                if (changes['Visible']) {
                    options.visible = this.Visible;
                    hasOptions = true;
                }
                if (changes['zIndex']) {
                    options.zIndex = this.zIndex;
                    hasOptions = true;
                }
                return hasOptions ? options : null;
            };
        MapPolylineDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-map-polyline'
                    },] },
        ];
        /** @nocollapse */
        MapPolylineDirective.ctorParameters = function () {
            return [
                { type: PolylineService },
                { type: core.ViewContainerRef }
            ];
        };
        MapPolylineDirective.propDecorators = {
            _infoBox: [{ type: core.ContentChild, args: [InfoBoxComponent,] }],
            Clickable: [{ type: core.Input }],
            Draggable: [{ type: core.Input }],
            Editable: [{ type: core.Input }],
            Geodesic: [{ type: core.Input }],
            Metadata: [{ type: core.Input }],
            Path: [{ type: core.Input }],
            ShowTooltip: [{ type: core.Input }],
            StrokeColor: [{ type: core.Input }],
            StrokeOpacity: [{ type: core.Input }],
            StrokeWeight: [{ type: core.Input }],
            Title: [{ type: core.Input }],
            Visible: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            Click: [{ type: core.Output }],
            DblClick: [{ type: core.Output }],
            Drag: [{ type: core.Output }],
            DragEnd: [{ type: core.Output }],
            DragStart: [{ type: core.Output }],
            MouseDown: [{ type: core.Output }],
            MouseMove: [{ type: core.Output }],
            MouseOut: [{ type: core.Output }],
            MouseOver: [{ type: core.Output }],
            MouseUp: [{ type: core.Output }],
            RightClick: [{ type: core.Output }]
        };
        return MapPolylineDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * internal counter to use as ids for marker.
      @type {?} */
    var layerId$1 = 1000000;
    /**
     * MapMarkerLayerDirective performantly renders a large set of map marker inside a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent, MapMarkerDirective} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *   .map-container {
     *     height: 300px;
     *   }
     * `],
     * template: `
     *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-marker-layer [MarkerOptions]="_markers"></x-map-marker-layer>
     *   </x-map>
     * `
     * })
     * ```
     *
     * @export
     */
    var MapMarkerLayerDirective = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapMarkerLayerDirective.
         * @param _markerService - Concreate implementation of a {@link MarkerService}.
         * @param _layerService - Concreate implementation of a {@link LayerService}.
         * @param _clusterService - Concreate implementation of a {@link ClusterService}.
         * @param _mapService - Concreate implementation of a {@link MapService}.
         * @param _zone - Concreate implementation of a {@link NgZone} service.
         *
         * @memberof MapMarkerLayerDirective
         */
        function MapMarkerLayerDirective(_markerService, _layerService, _clusterService, _mapService, _zone) {
            this._markerService = _markerService;
            this._layerService = _layerService;
            this._clusterService = _clusterService;
            this._mapService = _mapService;
            this._zone = _zone;
            this._useDynamicSizeMarker = false;
            this._dynamicMarkerBaseSize = 18;
            this._dynamicMarkerRanges = new Map([
                [10, 'rgba(20, 180, 20, 0.5)'],
                [100, 'rgba(255, 210, 40, 0.5)'],
                [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
            ]);
            this._streaming = false;
            this._markers = new Array();
            this._markersLast = new Array();
            /**
             * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.ClusterClickAction = ClusterClickAction.ZoomIntoCluster;
            /**
             * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.ClusterPlacementMode = ClusterPlacementMode.MeanValue;
            /**
             * Determines whether the layer clusters. This property can only be set on creation of the layer.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.EnableClustering = false;
            /**
             * Gets or sets the grid size to be used for clustering.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.GridSize = 150;
            /**
             * Gets or sets An offset applied to the positioning of the layer.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.LayerOffset = null;
            /**
             * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.ZIndex = 0;
            /**
             * Gets or sets whether the cluster should zoom in on click
             *
             * \@readonly
             * \@memberof MapMarkerLayerDirective
             */
            this.ZoomOnClick = true;
            /**
             * This event emitter gets emitted when the dynamic icon for a marker is being created.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.DynamicMarkerCreated = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks a marker in the layer.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.MarkerClick = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging a marker.
             *
             * \@memberof MapMarkerLayerDirective
             */
            this.DragEnd = new core.EventEmitter();
            this._id = layerId$1++;
        }
        Object.defineProperty(MapMarkerLayerDirective.prototype, "CustomMarkerCallback", {
            /**
             * Gets or sets the callback invoked to create a custom cluster marker. Note that when {@link UseDynamicSizeMarkers} is enabled,
             * you cannot set a custom marker callback.
             *
             * @memberof MapMarkerLayerDirective
             */
            get: /**
             * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
             * you cannot set a custom marker callback.
             *
             * \@memberof MapMarkerLayerDirective
             * @return {?}
             */ function () { return this._iconCreationCallback; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                if (this._useDynamicSizeMarker) {
                    throw (new Error("You cannot set a custom marker callback when UseDynamicSizeMarkers is set to true.\n                    Set UseDynamicSizeMakers to false."));
                }
                this._iconCreationCallback = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerLayerDirective.prototype, "DynamicMarkerBaseSize", {
            /**
             * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
             * See {@link UseDynamicSizeMarkers}.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
             * See {\@link UseDynamicSizeMarkers}.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._dynamicMarkerBaseSize; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._dynamicMarkerBaseSize = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerLayerDirective.prototype, "DynamicMarkerRanges", {
            /**
             * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
             * The map contains key/value pairs, with the keys being
             * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {@link UseDynamicSizeMarkers}.
             *
             * @memberof ClusterLayerDirective
             */
            get: /**
             * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
             * The map contains key/value pairs, with the keys being
             * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {\@link UseDynamicSizeMarkers}.
             *
             * \@memberof ClusterLayerDirective
             * @return {?}
             */ function () { return this._dynamicMarkerRanges; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._dynamicMarkerRanges = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerLayerDirective.prototype, "MarkerOptions", {
            /**
             *  IMarkerOptions array holding the marker info.
             *
             * @memberof MapMarkerLayerDirective
             */
            get: /**
             *  IMarkerOptions array holding the marker info.
             *
             * \@memberof MapMarkerLayerDirective
             * @return {?}
             */ function () { return this._markers; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                if (this._streaming) {
                    (_a = this._markersLast).push.apply(_a, __spread(val.slice(0)));
                    (_b = this._markers).push.apply(_b, __spread(val));
                }
                else {
                    this._markers = val.slice(0);
                }
                var _a, _b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerLayerDirective.prototype, "Styles", {
            /**
             * Gets or sets the cluster styles
             *
             * @memberof MapMarkerLayerDirective
             */
            get: /**
             * Gets or sets the cluster styles
             *
             * \@memberof MapMarkerLayerDirective
             * @return {?}
             */ function () { return this._styles; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._styles = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerLayerDirective.prototype, "TreatNewMarkerOptionsAsStream", {
            /**
             * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
             * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
             *
             * @memberof MapMarkerLayerDirective
             */
            get: /**
             * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
             * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
             *
             * \@memberof MapMarkerLayerDirective
             * @return {?}
             */ function () { return this._streaming; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._streaming = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerLayerDirective.prototype, "UseDynamicSizeMarkers", {
            /**
             * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
             * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
             *
             * @memberof MapMarkerLayerDirective
             */
            get: /**
             * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
             * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
             *
             * \@memberof MapMarkerLayerDirective
             * @return {?}
             */ function () { return this._useDynamicSizeMarker; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                var _this = this;
                this._useDynamicSizeMarker = val;
                if (val) {
                    this._iconCreationCallback = function (m, info) {
                        return ClusterLayerDirective.CreateDynamicSizeMarker(m.length, info, _this._dynamicMarkerBaseSize, _this._dynamicMarkerRanges);
                    };
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapMarkerLayerDirective.prototype, "Id", {
            get: /**
             * Gets the id of the marker layer.
             *
             * \@readonly
             * \@memberof MapMarkerLayerDirective
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        /**
         * Translates a geo location to a pixel location relative to the map viewport.
         *
         * \@memberof MapMarkerLayerDirective
         * @param {?} loc
         * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
         *
         */
        MapMarkerLayerDirective.prototype.LocationToPixel = /**
         * Translates a geo location to a pixel location relative to the map viewport.
         *
         * \@memberof MapMarkerLayerDirective
         * @param {?} loc
         * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
         *
         */
            function (loc) {
                return this._markerService.LocationToPoint(loc);
            };
        /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        MapMarkerLayerDirective.prototype.ngAfterContentInit = /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var layerOptions = {
                    id: this._id
                };
                this._zone.runOutsideAngular(function () {
                    /** @type {?} */
                    var fakeLayerDirective = {
                        Id: _this._id,
                        Visible: _this.Visible
                    };
                    if (!_this.EnableClustering) {
                        _this._layerService.AddLayer(fakeLayerDirective);
                        _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
                        _this._service = _this._layerService;
                    }
                    else {
                        fakeLayerDirective.LayerOffset = _this.LayerOffset;
                        fakeLayerDirective.ZIndex = _this.ZIndex;
                        fakeLayerDirective.ClusteringEnabled = _this.EnableClustering;
                        fakeLayerDirective.ClusterPlacementMode = _this.ClusterPlacementMode;
                        fakeLayerDirective.GridSize = _this.GridSize;
                        fakeLayerDirective.ClusterClickAction = _this.ClusterClickAction;
                        fakeLayerDirective.IconInfo = _this.ClusterIconInfo;
                        fakeLayerDirective.CustomMarkerCallback = _this.CustomMarkerCallback;
                        fakeLayerDirective.UseDynamicSizeMarkers = _this.UseDynamicSizeMarkers;
                        _this._clusterService.AddLayer(fakeLayerDirective);
                        _this._layerPromise = _this._clusterService.GetNativeLayer(fakeLayerDirective);
                        _this._service = _this._clusterService;
                    }
                    _this._layerPromise.then(function (l) {
                        l.SetVisible(_this.Visible);
                        if (_this.MarkerOptions) {
                            _this._zone.runOutsideAngular(function () { return _this.UpdateMarkers(); });
                        }
                    });
                });
            };
        /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
        MapMarkerLayerDirective.prototype.ngOnDestroy = /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         *
         * \@memberof MapMarkerLayerDirective
         * @return {?}
         */
            function () {
                this._layerPromise.then(function (l) {
                    l.Delete();
                });
            };
        /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapMarkerLayerDirective
         * @param {?} changes - collection of changes.
         *
         * @return {?}
         */
        MapMarkerLayerDirective.prototype.ngOnChanges = /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapMarkerLayerDirective
         * @param {?} changes - collection of changes.
         *
         * @return {?}
         */
            function (changes) {
                var _this = this;
                /** @type {?} */
                var shouldSetOptions = false;
                /** @type {?} */
                var o = {
                    id: this._id
                };
                if (changes['MarkerOptions']) {
                    this._zone.runOutsideAngular(function () {
                        _this.UpdateMarkers();
                    });
                }
                if (changes['Visible'] && !changes['Visible'].firstChange) {
                    this._zone.runOutsideAngular(function () {
                        _this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
                    });
                }
                if (changes['EnableClustering'] && !changes['EnableClustering'].firstChange) {
                    if ('StopClustering' in this._service) {
                        o.clusteringEnabled = this.EnableClustering;
                        shouldSetOptions = true;
                    }
                    else {
                        throw (new Error('You cannot change EnableClustering after the layer has been created.'));
                    }
                }
                if (changes['ClusterPlacementMode'] && !changes['ClusterPlacementMode'].firstChange && 'StopClustering' in this._service) {
                    o.placementMode = this.ClusterPlacementMode;
                    shouldSetOptions = true;
                }
                if (changes['GridSize'] && !changes['GridSize'].firstChange && 'StopClustering' in this._service) {
                    o.gridSize = this.GridSize;
                    shouldSetOptions = true;
                }
                if (changes['ClusterClickAction'] && !changes['ClusterClickAction'].firstChange && 'StopClustering' in this._service) {
                    o.zoomOnClick = this.ClusterClickAction === ClusterClickAction.ZoomIntoCluster;
                    shouldSetOptions = true;
                }
                if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
                    (changes['LayerOffset'] && !changes['LayerOffset'].firstChange) ||
                    (changes['IconInfo'] && !changes['IconInfo'].firstChange)) {
                    throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
                }
                if (shouldSetOptions) {
                    this._zone.runOutsideAngular(function () {
                        /** @type {?} */
                        var fakeLayerDirective = { Id: _this._id };
                        _this._layerPromise.then(function (l) { return l.SetOptions(o); });
                    });
                }
            };
        /**
         * Obtains a string representation of the Marker Id.
         * \@memberof MapMarkerLayerDirective
         * @return {?} - string representation of the marker id.
         */
        MapMarkerLayerDirective.prototype.toString = /**
         * Obtains a string representation of the Marker Id.
         * \@memberof MapMarkerLayerDirective
         * @return {?} - string representation of the marker id.
         */
            function () { return 'MapMarkerLayer-' + this._id.toString(); };
        /**
         * Adds various event listeners for the marker.
         *
         * \@memberof MapMarkerLayerDirective
         * @param {?} m - the marker for which to add the event.
         *
         * @return {?}
         */
        MapMarkerLayerDirective.prototype.AddEventListeners = /**
         * Adds various event listeners for the marker.
         *
         * \@memberof MapMarkerLayerDirective
         * @param {?} m - the marker for which to add the event.
         *
         * @return {?}
         */
            function (m) {
                var _this = this;
                m.AddListener('click', function (e) {
                    return _this.MarkerClick.emit({
                        Marker: m,
                        Click: e,
                        Location: _this._markerService.GetCoordinatesFromClick(e),
                        Pixels: _this._markerService.GetPixelsFromClick(e)
                    });
                });
                m.AddListener('dragend', function (e) {
                    return _this.DragEnd.emit({
                        Marker: m,
                        Click: e,
                        Location: _this._markerService.GetCoordinatesFromClick(e),
                        Pixels: _this._markerService.GetPixelsFromClick(e)
                    });
                });
            };
        /**
         * Sets or updates the markers based on the marker options. This will place the markers on the map
         * and register the associated events.
         *
         * \@memberof MapMarkerLayerDirective
         * \@method
         * @return {?}
         */
        MapMarkerLayerDirective.prototype.UpdateMarkers = /**
         * Sets or updates the markers based on the marker options. This will place the markers on the map
         * and register the associated events.
         *
         * \@memberof MapMarkerLayerDirective
         * \@method
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._layerPromise == null) {
                    return;
                }
                this._layerPromise.then(function (l) {
                    /** @type {?} */
                    var markers = _this._streaming ? _this._markersLast.splice(0) : _this._markers;
                    /** @type {?} */
                    var mp = _this._service.CreateMarkers(markers, _this.IconInfo);
                    // set markers once promises are fullfilled.
                    mp.then(function (m) {
                        m.forEach(function (marker) {
                            _this.AddEventListeners(marker);
                        });
                        _this._streaming ? l.AddEntities(m) : l.SetEntities(m);
                    });
                });
            };
        MapMarkerLayerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-map-marker-layer'
                    },] },
        ];
        /** @nocollapse */
        MapMarkerLayerDirective.ctorParameters = function () {
            return [
                { type: MarkerService },
                { type: LayerService },
                { type: ClusterService },
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        MapMarkerLayerDirective.propDecorators = {
            ClusterClickAction: [{ type: core.Input }],
            ClusterIconInfo: [{ type: core.Input }],
            ClusterPlacementMode: [{ type: core.Input }],
            CustomMarkerCallback: [{ type: core.Input }],
            DynamicMarkerBaseSize: [{ type: core.Input }],
            DynamicMarkerRanges: [{ type: core.Input }],
            EnableClustering: [{ type: core.Input }],
            GridSize: [{ type: core.Input }],
            IconInfo: [{ type: core.Input }],
            LayerOffset: [{ type: core.Input }],
            MarkerOptions: [{ type: core.Input }],
            Styles: [{ type: core.Input }],
            TreatNewMarkerOptionsAsStream: [{ type: core.Input }],
            UseDynamicSizeMarkers: [{ type: core.Input }],
            Visible: [{ type: core.Input }],
            ZIndex: [{ type: core.Input }],
            ZoomOnClick: [{ type: core.Input }],
            DynamicMarkerCreated: [{ type: core.Output }],
            MarkerClick: [{ type: core.Output }],
            DragEnd: [{ type: core.Output }]
        };
        return MapMarkerLayerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * internal counter to use as ids for polygons.
      @type {?} */
    var layerId$2 = 1000000;
    /**
     * MapPolygonLayerDirective performantly renders a large set of polygons on a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *   .map-container {
     *     height: 300px;
     *   }
     * `],
     * template: `
     *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-polygon-layer [PolygonOptions]="_polygons"></x-map-polygon-layer>
     *   </x-map>
     * `
     * })
     * ```
     *
     * @export
     */
    var MapPolygonLayerDirective = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapPolygonLayerDirective.
         * @param _layerService - Concreate implementation of a {@link LayerService}.
         * @param _mapService - Concreate implementation of a {@link MapService}.
         * @param _zone - Concreate implementation of a {@link NgZone} service.
         * @memberof MapPolygonLayerDirective
         */
        function MapPolygonLayerDirective(_layerService, _mapService, _zone) {
            this._layerService = _layerService;
            this._mapService = _mapService;
            this._zone = _zone;
            this._labels = new Array();
            this._tooltipSubscriptions = new Array();
            this._tooltipVisible = false;
            this._defaultOptions = {
                fontSize: 11,
                fontFamily: 'sans-serif',
                strokeWeight: 2,
                strokeColor: '#000000',
                fontColor: '#ffffff'
            };
            this._streaming = false;
            this._polygons = new Array();
            this._polygonsLast = new Array();
            /**
             * Set the maximum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
             * \@memberof MapPolygonLayerDirective
             */
            this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
            /**
             * Set the minimum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
             * \@memberof MapPolygonLayerDirective
             */
            this.LabelMinZoom = -1;
            /**
             * Gets or sets An offset applied to the positioning of the layer.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.LayerOffset = null;
            /**
             * Whether to show the polygon titles as the labels on the polygons.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.ShowLabels = false;
            /**
             * Whether to show the titles of the polygosn as the tooltips on the polygons.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.ShowTooltips = true;
            /**
             * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.ZIndex = 0;
            /**
             * This event emitter gets emitted when the user clicks a polygon in the layer.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.PolygonClick = new core.EventEmitter();
            /**
             * This event is fired when the DOM dblclick event is fired on a polygon in the layer.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.PolygonDblClick = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on a polygon in the layer.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.PolygonMouseMove = new core.EventEmitter();
            /**
             * This event is fired on mouseout on a polygon in the layer.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.PolygonMouseOut = new core.EventEmitter();
            /**
             * This event is fired on mouseover on a polygon in a layer.
             *
             * \@memberof MapPolygonLayerDirective
             */
            this.PolygonMouseOver = new core.EventEmitter();
            this._id = layerId$2++;
        }
        Object.defineProperty(MapPolygonLayerDirective.prototype, "PolygonOptions", {
            /**
             * An array of polygon options representing the polygons in the layer.
             *
             * @memberof MapPolygonLayerDirective
             */
            get: /**
             * An array of polygon options representing the polygons in the layer.
             *
             * \@memberof MapPolygonLayerDirective
             * @return {?}
             */ function () { return this._polygons; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                if (this._streaming) {
                    (_a = this._polygonsLast).push.apply(_a, __spread(val.slice(0)));
                    (_b = this._polygons).push.apply(_b, __spread(val));
                }
                else {
                    this._polygons = val.slice(0);
                }
                var _a, _b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolygonLayerDirective.prototype, "TreatNewPolygonOptionsAsStream", {
            /**
             * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
             * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
             *
             * @memberof MapPolygonLayerDirective
             */
            get: /**
             * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
             * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
             *
             * \@memberof MapPolygonLayerDirective
             * @return {?}
             */ function () { return this._streaming; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._streaming = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolygonLayerDirective.prototype, "Id", {
            get: /**
             * Gets the id of the marker layer.
             *
             * \@readonly
             * \@memberof MapPolygonLayerDirective
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.ngAfterContentInit = /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var layerOptions = {
                    id: this._id
                };
                this._zone.runOutsideAngular(function () {
                    /** @type {?} */
                    var fakeLayerDirective = {
                        Id: _this._id,
                        Visible: _this.Visible,
                        LayerOffset: _this.LayerOffset,
                        ZIndex: _this.ZIndex
                    };
                    _this._layerService.AddLayer(fakeLayerDirective);
                    _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
                    Promise.all([
                        _this._layerPromise,
                        _this._mapService.CreateCanvasOverlay(function (el) { return _this.DrawLabels(el); })
                    ]).then(function (values) {
                        values[0].SetVisible(_this.Visible);
                        _this._canvas = values[1];
                        _this._canvas._canvasReady.then(function (b) {
                            _this._tooltip = _this._canvas.GetToolTipOverlay();
                            _this.ManageTooltip(_this.ShowTooltips);
                        });
                        if (_this.PolygonOptions) {
                            _this._zone.runOutsideAngular(function () { return _this.UpdatePolygons(); });
                        }
                    });
                    _this._service = _this._layerService;
                });
            };
        /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.ngOnDestroy = /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
            function () {
                this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
                this._layerPromise.then(function (l) {
                    l.Delete();
                });
                if (this._canvas) {
                    this._canvas.Delete();
                }
            };
        /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} changes - collection of changes.
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.ngOnChanges = /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} changes - collection of changes.
         * @return {?}
         */
            function (changes) {
                var _this = this;
                if (changes['PolygonOptions']) {
                    this._zone.runOutsideAngular(function () {
                        _this.UpdatePolygons();
                    });
                }
                if (changes['Visible'] && !changes['Visible'].firstChange) {
                    this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
                }
                if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
                    (changes['LayerOffset'] && !changes['LayerOffset'].firstChange)) {
                    throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
                }
                if ((changes['ShowLabels'] && !changes['ShowLabels'].firstChange) ||
                    (changes['LabelMinZoom'] && !changes['LabelMinZoom'].firstChange) ||
                    (changes['LabelMaxZoom'] && !changes['LabelMaxZoom'].firstChange)) {
                    if (this._canvas) {
                        this._canvas.Redraw(true);
                    }
                }
                if (changes['ShowTooltips'] && this._tooltip) {
                    this.ManageTooltip(changes['ShowTooltips'].currentValue);
                }
            };
        /**
         * Obtains a string representation of the Marker Id.
         * \@memberof MapPolygonLayerDirective
         * @return {?} - string representation of the marker id.
         */
        MapPolygonLayerDirective.prototype.toString = /**
         * Obtains a string representation of the Marker Id.
         * \@memberof MapPolygonLayerDirective
         * @return {?} - string representation of the marker id.
         */
            function () { return 'MapPolygonLayer-' + this._id.toString(); };
        /**
         * Adds various event listeners for the marker.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} p - the polygon for which to add the event.
         *
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.AddEventListeners = /**
         * Adds various event listeners for the marker.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} p - the polygon for which to add the event.
         *
         * @return {?}
         */
            function (p) {
                var _this = this;
                /** @type {?} */
                var handlers = [
                    { name: 'click', handler: function (ev) { return _this.PolygonClick.emit({ Polygon: p, Click: ev }); } },
                    { name: 'dblclick', handler: function (ev) { return _this.PolygonDblClick.emit({ Polygon: p, Click: ev }); } },
                    { name: 'mousemove', handler: function (ev) { return _this.PolygonMouseMove.emit({ Polygon: p, Click: ev }); } },
                    { name: 'mouseout', handler: function (ev) { return _this.PolygonMouseOut.emit({ Polygon: p, Click: ev }); } },
                    { name: 'mouseover', handler: function (ev) { return _this.PolygonMouseOver.emit({ Polygon: p, Click: ev }); } }
                ];
                handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
            };
        /**
         * Draws the polygon labels. Called by the Canvas overlay.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} el - The canvas on which to draw the labels.
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.DrawLabels = /**
         * Draws the polygon labels. Called by the Canvas overlay.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} el - The canvas on which to draw the labels.
         * @return {?}
         */
            function (el) {
                var _this = this;
                if (this.ShowLabels) {
                    this._mapService.GetZoom().then(function (z) {
                        if (_this.LabelMinZoom <= z && _this.LabelMaxZoom >= z) {
                            /** @type {?} */
                            var ctx_1 = el.getContext('2d');
                            /** @type {?} */
                            var labels_1 = _this._labels.map(function (x) { return x.title; });
                            _this._mapService.LocationsToPoints(_this._labels.map(function (x) { return x.loc; })).then(function (locs) {
                                /** @type {?} */
                                var size = _this._mapService.MapSize;
                                for (var i = 0, len = locs.length; i < len; i++) {
                                    // Don't draw the point if it is not in view. This greatly improves performance when zoomed in.
                                    if (locs[i].x >= 0 && locs[i].y >= 0 && locs[i].x <= size.width && locs[i].y <= size.height) {
                                        _this.DrawText(ctx_1, locs[i], labels_1[i]);
                                    }
                                }
                            });
                        }
                    });
                }
            };
        /**
         * Draws the label text at the appropriate place on the canvas.
         * @param {?} ctx - Canvas drawing context.
         * @param {?} loc - Pixel location on the canvas where to center the text.
         * @param {?} text - Text to draw.
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.DrawText = /**
         * Draws the label text at the appropriate place on the canvas.
         * @param {?} ctx - Canvas drawing context.
         * @param {?} loc - Pixel location on the canvas where to center the text.
         * @param {?} text - Text to draw.
         * @return {?}
         */
            function (ctx, loc, text) {
                /** @type {?} */
                var lo = this.LabelOptions;
                if (lo == null && this._tooltip) {
                    lo = this._tooltip.DefaultLabelStyle;
                }
                if (lo == null) {
                    lo = this._defaultOptions;
                }
                ctx.strokeStyle = lo.strokeColor;
                ctx.font = lo.fontSize + "px " + lo.fontFamily;
                ctx.textAlign = 'center';
                /** @type {?} */
                var strokeWeight = lo.strokeWeight;
                if (text && strokeWeight && strokeWeight > 0) {
                    ctx.lineWidth = strokeWeight;
                    ctx.strokeText(text, loc.x, loc.y);
                }
                ctx.fillStyle = lo.fontColor;
                ctx.fillText(text, loc.x, loc.y);
            };
        /**
         * Manages the tooltip and the attachment of the associated events.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} show - True to enable the tooltip, false to disable.
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.ManageTooltip = /**
         * Manages the tooltip and the attachment of the associated events.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} show - True to enable the tooltip, false to disable.
         * @return {?}
         */
            function (show) {
                var _this = this;
                if (show && this._canvas) {
                    // add tooltip subscriptions
                    this._tooltip.Set('hidden', true);
                    this._tooltipVisible = false;
                    this._tooltipSubscriptions.push(this.PolygonMouseMove.asObservable().subscribe(function (e) {
                        if (_this._tooltipVisible) {
                            /** @type {?} */
                            var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                            _this._tooltip.Set('position', loc);
                        }
                    }));
                    this._tooltipSubscriptions.push(this.PolygonMouseOver.asObservable().subscribe(function (e) {
                        if (e.Polygon.Title && e.Polygon.Title.length > 0) {
                            /** @type {?} */
                            var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                            _this._tooltip.Set('text', e.Polygon.Title);
                            _this._tooltip.Set('position', loc);
                            if (!_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', false);
                                _this._tooltipVisible = true;
                            }
                        }
                    }));
                    this._tooltipSubscriptions.push(this.PolygonMouseOut.asObservable().subscribe(function (e) {
                        if (_this._tooltipVisible) {
                            _this._tooltip.Set('hidden', true);
                            _this._tooltipVisible = false;
                        }
                    }));
                }
                else {
                    // remove tooltip subscriptions
                    this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
                    this._tooltipSubscriptions.splice(0);
                    this._tooltip.Set('hidden', true);
                    this._tooltipVisible = false;
                }
            };
        /**
         * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
         * and register the associated events.
         *
         * \@memberof MapPolygonLayerDirective
         * \@method
         * @return {?}
         */
        MapPolygonLayerDirective.prototype.UpdatePolygons = /**
         * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
         * and register the associated events.
         *
         * \@memberof MapPolygonLayerDirective
         * \@method
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._layerPromise == null) {
                    return;
                }
                this._layerPromise.then(function (l) {
                    /** @type {?} */
                    var polygons = _this._streaming ? _this._polygonsLast.splice(0) : _this._polygons;
                    if (!_this._streaming) {
                        _this._labels.splice(0);
                    }
                    /** @type {?} */
                    var lp = _this._service.CreatePolygons(l.GetOptions().id, polygons);
                    // set markers once promises are fullfilled.
                    lp.then(function (p) {
                        p.forEach(function (poly) {
                            if (poly.Title != null && poly.Title.length > 0) {
                                _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                            }
                            _this.AddEventListeners(poly);
                        });
                        _this._streaming ? l.AddEntities(p) : l.SetEntities(p);
                        if (_this._canvas) {
                            _this._canvas.Redraw(!_this._streaming);
                        }
                    });
                });
            };
        MapPolygonLayerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-map-polygon-layer'
                    },] },
        ];
        /** @nocollapse */
        MapPolygonLayerDirective.ctorParameters = function () {
            return [
                { type: LayerService },
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        MapPolygonLayerDirective.propDecorators = {
            LabelMaxZoom: [{ type: core.Input }],
            LabelMinZoom: [{ type: core.Input }],
            LabelOptions: [{ type: core.Input }],
            LayerOffset: [{ type: core.Input }],
            PolygonOptions: [{ type: core.Input }],
            ShowLabels: [{ type: core.Input }],
            ShowTooltips: [{ type: core.Input }],
            TreatNewPolygonOptionsAsStream: [{ type: core.Input }],
            Visible: [{ type: core.Input }],
            ZIndex: [{ type: core.Input }],
            PolygonClick: [{ type: core.Output }],
            PolygonDblClick: [{ type: core.Output }],
            PolygonMouseMove: [{ type: core.Output }],
            PolygonMouseOut: [{ type: core.Output }],
            PolygonMouseOver: [{ type: core.Output }]
        };
        return MapPolygonLayerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * internal counter to use as ids for polylines.
      @type {?} */
    var layerId$3 = 1000000;
    /**
     * MapPolylineLayerDirective performantly renders a large set of polyline on a {\@link MapComponent}.
     *
     * ### Example
     * ```typescript
     * import {Component} from '\@angular/core';
     * import {MapComponent} from '...';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *   .map-container {
     *     height: 300px;
     *   }
     * `],
     * template: `
     *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
     *      <x-map-polyline-layer [PolygonOptions]="_polyline"></x-map-polyline-layer>
     *   </x-map>
     * `
     * })
     * ```
     *
     * @export
     */
    var MapPolylineLayerDirective = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of MapPolylineLayerDirective.
         * @param _layerService - Concreate implementation of a {@link LayerService}.
         * @param _mapService - Concreate implementation of a {@link MapService}.
         * @param _zone - Concreate implementation of a {@link NgZone} service.
         * @memberof MapPolylineLayerDirective
         */
        function MapPolylineLayerDirective(_layerService, _mapService, _zone) {
            this._layerService = _layerService;
            this._mapService = _mapService;
            this._zone = _zone;
            this._labels = new Array();
            this._tooltipSubscriptions = new Array();
            this._tooltipVisible = false;
            this._defaultOptions = {
                fontSize: 11,
                fontFamily: 'sans-serif',
                strokeWeight: 2,
                strokeColor: '#000000',
                fontColor: '#ffffff'
            };
            this._streaming = false;
            this._polylines = new Array();
            this._polylinesLast = new Array();
            /**
             * Set the maximum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
             * \@memberof MapPolylineLayerDirective
             */
            this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
            /**
             * Set the minimum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
             * \@memberof MapPolylineLayerDirective
             */
            this.LabelMinZoom = -1;
            /**
             * Gets or sets An offset applied to the positioning of the layer.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.LayerOffset = null;
            /**
             * Whether to show the polylines titles as the labels on the polylines.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.ShowLabels = false;
            /**
             * Whether to show the titles of the polylines as the tooltips on the polylines.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.ShowTooltips = true;
            /**
             * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.ZIndex = 0;
            /**
             * This event emitter gets emitted when the user clicks a polyline in the layer.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.PolylineClick = new core.EventEmitter();
            /**
             * This event is fired when the DOM dblclick event is fired on a polyline in the layer.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.PolylineDblClick = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on a polyline in the layer.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.PolylineMouseMove = new core.EventEmitter();
            /**
             * This event is fired on mouseout on a polyline in the layer.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.PolylineMouseOut = new core.EventEmitter();
            /**
             * This event is fired on mouseover on a polyline in a layer.
             *
             * \@memberof MapPolylineLayerDirective
             */
            this.PolylineMouseOver = new core.EventEmitter();
            this._id = layerId$3++;
        }
        Object.defineProperty(MapPolylineLayerDirective.prototype, "PolylineOptions", {
            /**
             * An array of polyline options representing the polylines in the layer.
             *
             * @memberof MapPolylineLayerDirective
             */
            get: /**
             * An array of polyline options representing the polylines in the layer.
             *
             * \@memberof MapPolylineLayerDirective
             * @return {?}
             */ function () { return this._polylines; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                if (this._streaming) {
                    (_a = this._polylinesLast).push.apply(_a, __spread(val.slice(0)));
                    (_b = this._polylines).push.apply(_b, __spread(val));
                }
                else {
                    this._polylines = val.slice(0);
                }
                var _a, _b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolylineLayerDirective.prototype, "TreatNewPolylineOptionsAsStream", {
            /**
             * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
             * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
             *
             * @memberof MapPolylineLayerDirective
             */
            get: /**
             * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
             * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
             *
             * \@memberof MapPolylineLayerDirective
             * @return {?}
             */ function () { return this._streaming; },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) { this._streaming = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapPolylineLayerDirective.prototype, "Id", {
            get: /**
             * Gets the id of the polyline layer.
             *
             * \@readonly
             * \@memberof MapPolylineLayerDirective
             * @return {?}
             */ function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.ngAfterContentInit = /**
         * Called after Component content initialization. Part of ng Component life cycle.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var layerOptions = {
                    id: this._id
                };
                this._zone.runOutsideAngular(function () {
                    /** @type {?} */
                    var fakeLayerDirective = {
                        Id: _this._id,
                        Visible: _this.Visible,
                        LayerOffset: _this.LayerOffset,
                        ZIndex: _this.ZIndex
                    };
                    _this._layerService.AddLayer(fakeLayerDirective);
                    _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
                    Promise.all([
                        _this._layerPromise,
                        _this._mapService.CreateCanvasOverlay(function (el) { return _this.DrawLabels(el); })
                    ]).then(function (values) {
                        values[0].SetVisible(_this.Visible);
                        _this._canvas = values[1];
                        _this._canvas._canvasReady.then(function (b) {
                            _this._tooltip = _this._canvas.GetToolTipOverlay();
                            _this.ManageTooltip(_this.ShowTooltips);
                        });
                        if (_this.PolylineOptions) {
                            _this._zone.runOutsideAngular(function () { return _this.UpdatePolylines(); });
                        }
                    });
                    _this._service = _this._layerService;
                });
            };
        /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.ngOnDestroy = /**
         * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
            function () {
                this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
                this._layerPromise.then(function (l) {
                    l.Delete();
                });
                if (this._canvas) {
                    this._canvas.Delete();
                }
            };
        /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapPolylineLayerDirective
         * @param {?} changes - collection of changes.
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.ngOnChanges = /**
         * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
         *
         * \@memberof MapPolylineLayerDirective
         * @param {?} changes - collection of changes.
         * @return {?}
         */
            function (changes) {
                var _this = this;
                if (changes['PolylineOptions']) {
                    this._zone.runOutsideAngular(function () {
                        _this.UpdatePolylines();
                    });
                }
                if (changes['Visible'] && !changes['Visible'].firstChange) {
                    this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
                }
                if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
                    (changes['LayerOffset'] && !changes['LayerOffset'].firstChange)) {
                    throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
                }
                if ((changes['ShowLabels'] && !changes['ShowLabels'].firstChange) ||
                    (changes['LabelMinZoom'] && !changes['LabelMinZoom'].firstChange) ||
                    (changes['LabelMaxZoom'] && !changes['LabelMaxZoom'].firstChange)) {
                    if (this._canvas) {
                        this._canvas.Redraw(true);
                    }
                }
                if (changes['ShowTooltips'] && this._tooltip) {
                    this.ManageTooltip(changes['ShowTooltips'].currentValue);
                }
            };
        /**
         * Obtains a string representation of the Layer Id.
         * \@memberof MapPolylineLayerDirective
         * @return {?} - string representation of the layer id.
         */
        MapPolylineLayerDirective.prototype.toString = /**
         * Obtains a string representation of the Layer Id.
         * \@memberof MapPolylineLayerDirective
         * @return {?} - string representation of the layer id.
         */
            function () { return 'MapPolylineLayer-' + this._id.toString(); };
        /**
         * Adds various event listeners for the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         * @param {?} p - the polyline for which to add the event.
         *
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.AddEventListeners = /**
         * Adds various event listeners for the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         * @param {?} p - the polyline for which to add the event.
         *
         * @return {?}
         */
            function (p) {
                var _this = this;
                /** @type {?} */
                var handlers = [
                    { name: 'click', handler: function (ev) { return _this.PolylineClick.emit({ Polyline: p, Click: ev }); } },
                    { name: 'dblclick', handler: function (ev) { return _this.PolylineDblClick.emit({ Polyline: p, Click: ev }); } },
                    { name: 'mousemove', handler: function (ev) { return _this.PolylineMouseMove.emit({ Polyline: p, Click: ev }); } },
                    { name: 'mouseout', handler: function (ev) { return _this.PolylineMouseOut.emit({ Polyline: p, Click: ev }); } },
                    { name: 'mouseover', handler: function (ev) { return _this.PolylineMouseOver.emit({ Polyline: p, Click: ev }); } }
                ];
                handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
            };
        /**
         * Draws the polyline labels. Called by the Canvas overlay.
         *
         * \@memberof MapPolylineLayerDirective
         * @param {?} el - The canvas on which to draw the labels.
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.DrawLabels = /**
         * Draws the polyline labels. Called by the Canvas overlay.
         *
         * \@memberof MapPolylineLayerDirective
         * @param {?} el - The canvas on which to draw the labels.
         * @return {?}
         */
            function (el) {
                var _this = this;
                if (this.ShowLabels) {
                    this._mapService.GetZoom().then(function (z) {
                        if (_this.LabelMinZoom <= z && _this.LabelMaxZoom >= z) {
                            /** @type {?} */
                            var ctx_1 = el.getContext('2d');
                            /** @type {?} */
                            var labels_1 = _this._labels.map(function (x) { return x.title; });
                            _this._mapService.LocationsToPoints(_this._labels.map(function (x) { return x.loc; })).then(function (locs) {
                                /** @type {?} */
                                var size = _this._mapService.MapSize;
                                for (var i = 0, len = locs.length; i < len; i++) {
                                    // Don't draw the point if it is not in view. This greatly improves performance when zoomed in.
                                    if (locs[i].x >= 0 && locs[i].y >= 0 && locs[i].x <= size.width && locs[i].y <= size.height) {
                                        _this.DrawText(ctx_1, locs[i], labels_1[i]);
                                    }
                                }
                            });
                        }
                    });
                }
            };
        /**
         * Draws the label text at the appropriate place on the canvas.
         * @param {?} ctx - Canvas drawing context.
         * @param {?} loc - Pixel location on the canvas where to center the text.
         * @param {?} text - Text to draw.
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.DrawText = /**
         * Draws the label text at the appropriate place on the canvas.
         * @param {?} ctx - Canvas drawing context.
         * @param {?} loc - Pixel location on the canvas where to center the text.
         * @param {?} text - Text to draw.
         * @return {?}
         */
            function (ctx, loc, text) {
                /** @type {?} */
                var lo = this.LabelOptions;
                if (lo == null && this._tooltip) {
                    lo = this._tooltip.DefaultLabelStyle;
                }
                if (lo == null) {
                    lo = this._defaultOptions;
                }
                ctx.strokeStyle = lo.strokeColor;
                ctx.font = lo.fontSize + "px " + lo.fontFamily;
                ctx.textAlign = 'center';
                /** @type {?} */
                var strokeWeight = lo.strokeWeight;
                if (text && strokeWeight && strokeWeight > 0) {
                    ctx.lineWidth = strokeWeight;
                    ctx.strokeText(text, loc.x, loc.y);
                }
                ctx.fillStyle = lo.fontColor;
                ctx.fillText(text, loc.x, loc.y);
            };
        /**
         * Manages the tooltip and the attachment of the associated events.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} show - True to enable the tooltip, false to disable.
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.ManageTooltip = /**
         * Manages the tooltip and the attachment of the associated events.
         *
         * \@memberof MapPolygonLayerDirective
         * @param {?} show - True to enable the tooltip, false to disable.
         * @return {?}
         */
            function (show) {
                var _this = this;
                if (show && this._canvas) {
                    // add tooltip subscriptions
                    this._tooltip.Set('hidden', true);
                    this._tooltipVisible = false;
                    this._tooltipSubscriptions.push(this.PolylineMouseMove.asObservable().subscribe(function (e) {
                        if (_this._tooltipVisible) {
                            /** @type {?} */
                            var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                            _this._tooltip.Set('position', loc);
                        }
                    }));
                    this._tooltipSubscriptions.push(this.PolylineMouseOver.asObservable().subscribe(function (e) {
                        if (e.Polyline.Title && e.Polyline.Title.length > 0) {
                            /** @type {?} */
                            var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                            _this._tooltip.Set('text', e.Polyline.Title);
                            _this._tooltip.Set('position', loc);
                            if (!_this._tooltipVisible) {
                                _this._tooltip.Set('hidden', false);
                                _this._tooltipVisible = true;
                            }
                        }
                    }));
                    this._tooltipSubscriptions.push(this.PolylineMouseOut.asObservable().subscribe(function (e) {
                        if (_this._tooltipVisible) {
                            _this._tooltip.Set('hidden', true);
                            _this._tooltipVisible = false;
                        }
                    }));
                }
                else {
                    // remove tooltip subscriptions
                    this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
                    this._tooltipSubscriptions.splice(0);
                    this._tooltip.Set('hidden', true);
                    this._tooltipVisible = false;
                }
            };
        /**
         * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
         * and register the associated events.
         *
         * \@memberof MapPolylineLayerDirective
         * \@method
         * @return {?}
         */
        MapPolylineLayerDirective.prototype.UpdatePolylines = /**
         * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
         * and register the associated events.
         *
         * \@memberof MapPolylineLayerDirective
         * \@method
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._layerPromise == null) {
                    return;
                }
                this._layerPromise.then(function (l) {
                    /** @type {?} */
                    var polylines = _this._streaming ? _this._polylinesLast.splice(0) : _this._polylines;
                    if (!_this._streaming) {
                        _this._labels.splice(0);
                    }
                    /** @type {?} */
                    var lp = _this._service.CreatePolylines(l.GetOptions().id, polylines);
                    // set polylines once promises are fullfilled.
                    lp.then(function (p) {
                        /** @type {?} */
                        var y = new Array();
                        p.forEach(function (poly) {
                            if (Array.isArray(poly)) {
                                /** @type {?} */
                                var title_1 = '';
                                /** @type {?} */
                                var centroids_1 = new Array();
                                poly.forEach(function (x) {
                                    y.push(x);
                                    _this.AddEventListeners(x);
                                    centroids_1.push(x.Centroid);
                                    if (x.Title != null && x.Title.length > 0 && title_1.length === 0) {
                                        title_1 = x.Title;
                                    }
                                });
                                _this._labels.push({ loc: Polyline.GetPolylineCentroid(centroids_1), title: title_1 });
                            }
                            else {
                                y.push(poly);
                                if (poly.Title != null && poly.Title.length > 0) {
                                    _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                                }
                                _this.AddEventListeners(poly);
                            }
                        });
                        _this._streaming ? l.AddEntities(y) : l.SetEntities(y);
                        if (_this._canvas) {
                            _this._canvas.Redraw(!_this._streaming);
                        }
                    });
                });
            };
        MapPolylineLayerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'x-map-polyline-layer'
                    },] },
        ];
        /** @nocollapse */
        MapPolylineLayerDirective.ctorParameters = function () {
            return [
                { type: LayerService },
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        MapPolylineLayerDirective.propDecorators = {
            LabelMaxZoom: [{ type: core.Input }],
            LabelMinZoom: [{ type: core.Input }],
            LabelOptions: [{ type: core.Input }],
            LayerOffset: [{ type: core.Input }],
            PolylineOptions: [{ type: core.Input }],
            ShowLabels: [{ type: core.Input }],
            ShowTooltips: [{ type: core.Input }],
            TreatNewPolylineOptionsAsStream: [{ type: core.Input }],
            Visible: [{ type: core.Input }],
            ZIndex: [{ type: core.Input }],
            PolylineClick: [{ type: core.Output }],
            PolylineDblClick: [{ type: core.Output }],
            PolylineMouseMove: [{ type: core.Output }],
            PolylineMouseOut: [{ type: core.Output }],
            PolylineMouseOver: [{ type: core.Output }]
        };
        return MapPolylineLayerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Abstract implementation. USed for defintion only and as a base to implement your
     * own provider.
     *
     * @export
     * @abstract
     * @abstract
     */
    var MapAPILoader = (function () {
        function MapAPILoader() {
        }
        MapAPILoader.decorators = [
            { type: core.Injectable },
        ];
        return MapAPILoader;
    }());
    /**
     * Document Reference service to assist with abstracting the availability of document. Needed for AOT and
     * Server Side rendering
     *
     * @export
     */
    var DocumentRef = (function () {
        function DocumentRef() {
        }
        Object.defineProperty(DocumentRef.prototype, "IsAvailable", {
            get: /**
             * Gets whether a document implementation is available. Generally will be true in the browser and false otherwise, unless there
             * there is a browser-less implementation in the current non-browser environment.
             *
             * \@readonly
             * \@memberof DocumentRef
             * @return {?}
             */ function () {
                return !(typeof (document) === 'undefined');
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the document object of the current environment.
         *
         * \@memberof DocumentRef
         * @return {?} - The document object.
         *
         */
        DocumentRef.prototype.GetNativeDocument = /**
         * Returns the document object of the current environment.
         *
         * \@memberof DocumentRef
         * @return {?} - The document object.
         *
         */
            function () {
                if (typeof (document) === 'undefined') {
                    return null;
                }
                return document;
            };
        DocumentRef.decorators = [
            { type: core.Injectable },
        ];
        return DocumentRef;
    }());
    /**
     * Window Reference service to assist with abstracting the availability of window. Needed for AOT and
     * Server Side rendering
     *
     * @export
     */
    var WindowRef = (function () {
        function WindowRef() {
        }
        Object.defineProperty(WindowRef.prototype, "IsAvailable", {
            get: /**
             * Gets whether a window implementation is available. Generally will be true in the browser and false otherwise, unless there
             * there is a browser-less implementation in the current non-browser environment.
             *
             * \@readonly
             * \@memberof WindowRef
             * @return {?}
             */ function () {
                return !(typeof (window) === 'undefined');
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the window object of the current environment.
         *
         * \@memberof WindowRef
         * @return {?} - The window object.
         *
         */
        WindowRef.prototype.GetNativeWindow = /**
         * Returns the window object of the current environment.
         *
         * \@memberof WindowRef
         * @return {?} - The window object.
         *
         */
            function () {
                if (typeof (window) === 'undefined') {
                    return null;
                }
                return window;
            };
        WindowRef.decorators = [
            { type: core.Injectable },
        ];
        return WindowRef;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ScriptProtocol = {
        HTTP: 0,
        HTTPS: 1,
        AUTO: 2,
    };
    ScriptProtocol[ScriptProtocol.HTTP] = 'HTTP';
    ScriptProtocol[ScriptProtocol.HTTPS] = 'HTTPS';
    ScriptProtocol[ScriptProtocol.AUTO] = 'AUTO';
    /**
     * Bing Maps V8 specific loader configuration to be used with the {\@link BingMapAPILoader}
     *
     * @export
     */
    var BingMapAPILoaderConfig = (function () {
        function BingMapAPILoaderConfig() {
            this.apiKey = '';
            this.hostAndPath = 'www.bing.com/api/maps/mapcontrol';
            this.protocol = ScriptProtocol.HTTPS;
            this.branch = '';
        }
        BingMapAPILoaderConfig.decorators = [
            { type: core.Injectable },
        ];
        return BingMapAPILoaderConfig;
    }());
    /** *
     * Default loader configuration.
      @type {?} */
    var DEFAULT_CONFIGURATION = new BingMapAPILoaderConfig();
    /**
     * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
     *
     * @export
     */
    var BingMapAPILoader = (function (_super) {
        __extends(BingMapAPILoader, _super);
        /**
         * Creates an instance of BingMapAPILoader.
         * @param _config  - The loader configuration.
         * @param _windowRef - An instance of {@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
         * @param _documentRef - An instance of {@link DocumentRef}.
         * Necessary because Bing Map V8 interacts with the document object.
         *
         * @memberof BingMapAPILoader
         */
        function BingMapAPILoader(_config, _windowRef, _documentRef) {
            var _this = _super.call(this) || this;
            _this._config = _config;
            _this._windowRef = _windowRef;
            _this._documentRef = _documentRef;
            if (_this._config === null || _this._config === undefined) {
                _this._config = DEFAULT_CONFIGURATION;
            }
            return _this;
        }
        Object.defineProperty(BingMapAPILoader.prototype, "Config", {
            get: /**
             * Gets the loader configuration.
             *
             * \@readonly
             * \@memberof BingMapAPILoader
             * @return {?}
             */ function () { return this._config; },
            enumerable: true,
            configurable: true
        });
        /**
         * Loads the necessary resources for Bing Maps V8.
         *
         * \@memberof BingMapAPILoader
         * @return {?}
         */
        BingMapAPILoader.prototype.Load = /**
         * Loads the necessary resources for Bing Maps V8.
         *
         * \@memberof BingMapAPILoader
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._scriptLoadingPromise) {
                    return this._scriptLoadingPromise;
                }
                /** @type {?} */
                var script = this._documentRef.GetNativeDocument().createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.defer = true;
                /** @type {?} */
                var callbackName = "angular2bingmaps" + new Date().getMilliseconds();
                script.src = this.GetScriptSrc(callbackName);
                this._scriptLoadingPromise = new Promise(function (resolve, reject) {
                    ((_this._windowRef.GetNativeWindow()))[callbackName] = function () {
                        resolve();
                    };
                    script.onerror = function (error) { reject(error); };
                });
                this._documentRef.GetNativeDocument().head.appendChild(script);
                return this._scriptLoadingPromise;
            };
        /**
         * Gets the Bing Map V8 scripts url for injections into the header.
         *
         * \@memberof BingMapAPILoader
         * @param {?} callbackName - Name of the function to be called when the Bing Maps V8 scripts are loaded.
         * @return {?} - The url to be used to load the Bing Map scripts.
         *
         */
        BingMapAPILoader.prototype.GetScriptSrc = /**
         * Gets the Bing Map V8 scripts url for injections into the header.
         *
         * \@memberof BingMapAPILoader
         * @param {?} callbackName - Name of the function to be called when the Bing Maps V8 scripts are loaded.
         * @return {?} - The url to be used to load the Bing Map scripts.
         *
         */
            function (callbackName) {
                /** @type {?} */
                var protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
                /** @type {?} */
                var protocol;
                switch (protocolType) {
                    case ScriptProtocol.AUTO:
                        protocol = '';
                        break;
                    case ScriptProtocol.HTTP:
                        protocol = 'http:';
                        break;
                    case ScriptProtocol.HTTPS:
                        protocol = 'https:';
                        break;
                }
                /** @type {?} */
                var hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
                /** @type {?} */
                var queryParams = {
                    callback: callbackName
                };
                if (this._config.branch !== '') {
                    queryParams['branch'] = this._config.branch;
                }
                /** @type {?} */
                var params = Object.keys(queryParams)
                    .map(function (k, i) {
                    /** @type {?} */
                    var param = (i === 0) ? '?' : '&';
                    return param += k + "=" + queryParams[k];
                })
                    .join('');
                return protocol + "//" + hostAndPath + params;
            };
        BingMapAPILoader.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingMapAPILoader.ctorParameters = function () {
            return [
                { type: BingMapAPILoaderConfig, decorators: [{ type: core.Optional }] },
                { type: WindowRef },
                { type: DocumentRef }
            ];
        };
        return BingMapAPILoader;
    }(MapAPILoader));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the {\@link InfoBoxService} contract for the Bing Maps V8 architecture.
     *
     * @export
     */
    var BingInfoBoxService = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of BingInfoBoxService.
         * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
         * @param _zone - An instance of NgZone to provide zone aware promises.
         *
         * @memberof BingInfoBoxService
         */
        function BingInfoBoxService(_mapService, _zone) {
            this._mapService = _mapService;
            this._zone = _zone;
            this._boxes = new Map();
        }
        /**
         * Adds an info window to the map or layer.
         *
         * \@memberof BingInfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         *
         * @return {?}
         */
        BingInfoBoxService.prototype.AddInfoWindow = /**
         * Adds an info window to the map or layer.
         *
         * \@memberof BingInfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         *
         * @return {?}
         */
            function (info) {
                /** @type {?} */
                var options = {};
                if (typeof info.Latitude === 'number' && typeof info.Longitude === 'number') {
                    options.position = {
                        latitude: info.Latitude,
                        longitude: info.Longitude
                    };
                }
                if (typeof info.InfoWindowActions !== 'undefined' && info.InfoWindowActions.length > 0) {
                    options.actions = [];
                    info.InfoWindowActions.forEach(function (action) {
                        options.actions.push({
                            label: action.Label,
                            eventHandler: function () { action.ActionClicked.emit(null); }
                        });
                    });
                }
                if (info.HtmlContent !== '') {
                    options.htmlContent = info.HtmlContent;
                }
                else {
                    options.title = info.Title;
                    options.description = info.Description;
                }
                if (info.xOffset || info.yOffset) {
                    if (options.pixelOffset == null) {
                        options.pixelOffset = { x: 0, y: 0 };
                    }
                    if (info.xOffset) {
                        options.pixelOffset.x = info.xOffset;
                    }
                    if (info.yOffset) {
                        options.pixelOffset.y = info.yOffset;
                    }
                }
                options.visible = info.Visible;
                /** @type {?} */
                var infoPromise = this._mapService.CreateInfoWindow(options);
                this._boxes.set(info, infoPromise);
            };
        /**
         * Closes an InfoBoxComponent that is open.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @return {?} - A promise that is fullfilled when the infobox has been closed.
         *
         */
        BingInfoBoxService.prototype.Close = /**
         * Closes an InfoBoxComponent that is open.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @return {?} - A promise that is fullfilled when the infobox has been closed.
         *
         */
            function (info) {
                return this._boxes.get(info).then(function (w) { return w.Close(); });
            };
        /**
         * Registers an event delegate for an info window.
         *
         * \@memberof GoogleInfoBoxService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
        BingInfoBoxService.prototype.CreateEventObservable = /**
         * Registers an event delegate for an info window.
         *
         * \@memberof GoogleInfoBoxService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
            function (eventName, infoComponent) {
                var _this = this;
                /** @type {?} */
                var eventNameTranslated = BingMapEventsLookup[eventName];
                return rxjs.Observable.create(function (observer) {
                    _this._boxes.get(infoComponent).then(function (b) {
                        b.AddListener(eventNameTranslated, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                    });
                });
            };
        /**
         * Deletes an infobox.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @return {?} - A promise that is fullfilled when the infobox has been deleted.
         *
         */
        BingInfoBoxService.prototype.DeleteInfoWindow = /**
         * Deletes an infobox.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @return {?} - A promise that is fullfilled when the infobox has been deleted.
         *
         */
            function (info) {
                var _this = this;
                /** @type {?} */
                var w = this._boxes.get(info);
                if (w == null) {
                    return Promise.resolve();
                }
                return w.then(function (i) {
                    return _this._zone.run(function () {
                        i.Close();
                        _this._boxes.delete(info);
                    });
                });
            };
        /**
         * Opens an infobox that is closed.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @param {?=} loc
         * @return {?} - A promise that is fullfilled when the infobox has been opened.
         *
         */
        BingInfoBoxService.prototype.Open = /**
         * Opens an infobox that is closed.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @param {?=} loc
         * @return {?} - A promise that is fullfilled when the infobox has been opened.
         *
         */
            function (info, loc) {
                if (info.CloseInfoBoxesOnOpen || info.Modal) {
                    // close all open info boxes.
                    this._boxes.forEach(function (v, i) {
                        if (info.Id !== i.Id) {
                            v.then(function (w) {
                                if (w.IsOpen) {
                                    w.Close();
                                    i.Close();
                                }
                            });
                        }
                    });
                }
                return this._boxes.get(info).then(function (w) {
                    /** @type {?} */
                    var options = {};
                    if (info.HtmlContent !== '') {
                        options.htmlContent = info.HtmlContent;
                    }
                    else {
                        options.title = info.Title;
                        options.description = info.Description;
                    }
                    w.SetOptions(options);
                    if (info.Latitude && info.Longitude) {
                        w.SetPosition({ latitude: info.Latitude, longitude: info.Longitude });
                    }
                    else if (loc) {
                        w.SetPosition(loc);
                    }
                    else if (info.HostMarker) {
                        w.SetPosition({ latitude: info.HostMarker.Latitude, longitude: info.HostMarker.Longitude });
                    }
                    w.Open();
                });
            };
        /**
         * Sets the infobox options.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
         * merged with the existing options of the underlying infobox.
         * @return {?} - A promise that is fullfilled when the infobox options have been updated.
         *
         */
        BingInfoBoxService.prototype.SetOptions = /**
         * Sets the infobox options.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
         * merged with the existing options of the underlying infobox.
         * @return {?} - A promise that is fullfilled when the infobox options have been updated.
         *
         */
            function (info, options) {
                return this._boxes.get(info).then(function (i) { return i.SetOptions(options); });
            };
        /**
         * Set the position of the infobox based on the properties set on the InfoBox component.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @return {?} - A promise that is fullfilled when the infobox position has been updated.
         *
         */
        BingInfoBoxService.prototype.SetPosition = /**
         * Set the position of the infobox based on the properties set on the InfoBox component.
         *
         * @abstract
         * \@memberof InfoBoxService
         * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
         * @return {?} - A promise that is fullfilled when the infobox position has been updated.
         *
         */
            function (info) {
                return this._boxes.get(info).then(function (i) {
                    return i.SetPosition({
                        latitude: info.Latitude,
                        longitude: info.Longitude
                    });
                });
            };
        BingInfoBoxService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingInfoBoxService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        return BingInfoBoxService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the MarkerService abstract class for Bing Maps V8.
     *
     * @export
     */
    var BingMarkerService = (function () {
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
                var b = new rxjs.Subject();
                if (eventName === 'mousemove') {
                    return b.asObservable();
                }
                if (eventName === 'rightclick') {
                    return b.asObservable();
                }
                return rxjs.Observable.create(function (observer) {
                    _this._markers.get(marker).then(function (m) {
                        m.AddListener(eventName, function (e) {
                            return _this._zone.run(function () {
                                return observer.next(e);
                            });
                        });
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
                var p = (((this._mapService)).MapInstance.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
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
                return this._markers.get(marker).then(function (m) {
                    return m.SetPosition({
                        latitude: marker.Latitude,
                        longitude: marker.Longitude
                    });
                });
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingMarkerService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: LayerService },
                { type: ClusterService },
                { type: core.NgZone }
            ];
        };
        return BingMarkerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the MapService abstract implementing a Bin Map V8 provider
     *
     * @export
     */
    var BingMapService = (function () {
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
            this._config = ((this._loader)).Config;
        }
        Object.defineProperty(BingMapService.prototype, "LoadedModules", {
            get: /**
             * Gets an array of loaded Bong modules.
             *
             * \@readonly
             * \@memberof BingMapService
             * @return {?}
             */ function () { return this._modules; },
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
             */ function () { return this._mapInstance; },
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
             */ function () { return this._map; },
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
             */ function () {
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
                if (options === void 0) {
                    options = /** @type {?} */ ({});
                }
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
                if (useSharedInstance === void 0) {
                    useSharedInstance = true;
                }
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
                if (useSharedInstance === void 0) {
                    useSharedInstance = true;
                }
                /** @type {?} */
                var s = moduleName.substr(moduleName.lastIndexOf('.') + 1);
                if (this._modules.has(moduleName)) {
                    /** @type {?} */
                    var o = null;
                    if (!useSharedInstance) {
                        o = new ((Microsoft.Maps))[s](this._mapInstance);
                    }
                    else if (this._modules.get(moduleName) != null) {
                        o = this._modules.get(moduleName);
                    }
                    else {
                        o = new ((Microsoft.Maps))[s](this._mapInstance);
                        this._modules.set(moduleName, o);
                    }
                    return Promise.resolve(o);
                }
                else {
                    return new Promise(function (resolve, reject) {
                        try {
                            Microsoft.Maps.loadModule(moduleName, function () {
                                /** @type {?} */
                                var o = new ((Microsoft.Maps))[s](_this._mapInstance);
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
                    var p = (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
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
                    var p = (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
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
                return this._map.then(function (map) {
                    return map.setView({
                        center: BingConversions.TranslateLocation(latLng)
                    });
                });
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
                return this._map.then(function (map) {
                    return map.setView({
                        zoom: zoom
                    });
                });
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
                return rxjs.Observable.create(function (observer) {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingMapService.ctorParameters = function () {
            return [
                { type: MapAPILoader },
                { type: core.NgZone }
            ];
        };
        return BingMapService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This abstract partially implements the contract for the {\@link LayerService}
     * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
     * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
     *
     * @export
     * @abstract
     * @abstract
     */
    var /**
     * This abstract partially implements the contract for the {\@link LayerService}
     * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
     * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
     *
     * @export
     * @abstract
     * @abstract
     */ BingLayerBase = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of BingLayerBase.
         * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
         *
         * @memberof BingLayerBase
         */
        function BingLayerBase(_mapService, _zone) {
            this._mapService = _mapService;
            this._zone = _zone;
            this._layers = new Map();
        }
        /**
         * Creates a marker in the layer.
         *
         * \@memberof BingLayerBase
         * @param {?} layer - The Id of the layer in which to create the marker.
         * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
         * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
         *
         */
        BingLayerBase.prototype.CreateMarker = /**
         * Creates a marker in the layer.
         *
         * \@memberof BingLayerBase
         * @param {?} layer - The Id of the layer in which to create the marker.
         * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
         * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
         *
         */
            function (layer, options) {
                /** @type {?} */
                var payload = function (icon, l) {
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
                    var marker = new BingMarker(pushpin, null, l.NativePrimitve);
                    marker.IsFirst = options.isFirst;
                    marker.IsLast = options.isLast;
                    if (options.metadata) {
                        options.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
                    }
                    l.AddEntity(marker);
                    return marker;
                };
                /** @type {?} */
                var p = this.GetLayerById(layer);
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    if (options.iconInfo && options.iconInfo.markerType) {
                        /** @type {?} */
                        var s = Marker.CreateMarker(options.iconInfo);
                        if (typeof (s) === 'string') {
                            return (payload(s, l));
                        }
                        else {
                            return s.then(function (x) {
                                return (payload(x.icon, l));
                            });
                        }
                    }
                    else {
                        return (payload(null, l));
                    }
                });
            };
        /**
         * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
         * operations.
         *
         * \@memberof BingLayerBase
         * @param {?} options - Marker options defining the markers.
         * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
         *
         */
        BingLayerBase.prototype.CreateMarkers = /**
         * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
         * operations.
         *
         * \@memberof BingLayerBase
         * @param {?} options - Marker options defining the markers.
         * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
         *
         */
            function (options, markerIcon) {
                /** @type {?} */
                var payload = function (icon, op) {
                    /** @type {?} */
                    var markers = op.map(function (mo) {
                        /** @type {?} */
                        var s;
                        /** @type {?} */
                        var o = BingConversions.TranslateMarkerOptions(mo);
                        if (icon && icon !== '') {
                            s = icon;
                        }
                        else if (o.icon) {
                            s = o.icon;
                        }
                        if (o.icon) {
                            delete o.icon;
                        }
                        /** @type {?} */
                        var loc = BingConversions.TranslateLocation(mo.position);
                        /** @type {?} */
                        var pushpin = new Microsoft.Maps.Pushpin(loc, o);
                        /** @type {?} */
                        var img = Marker.GetImageForMarker(s);
                        if (img != null) {
                            ((pushpin)).image = img;
                        }
                        /** @type {?} */
                        var marker = new BingMarker(pushpin, null, null);
                        marker.IsFirst = mo.isFirst;
                        marker.IsLast = mo.isLast;
                        if (mo.metadata) {
                            mo.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
                        }
                        return marker;
                    });
                    return markers;
                };
                /** @type {?} */
                var p = new Promise(function (resolve, reject) {
                    if (markerIcon && markerIcon.markerType) {
                        /** @type {?} */
                        var s = Marker.CreateMarker(markerIcon);
                        if (typeof (s) === 'string') {
                            resolve(payload(s, options));
                        }
                        else {
                            return s.then(function (x) {
                                resolve(payload(x.icon, options));
                            });
                        }
                    }
                    else {
                        resolve(payload(null, options));
                    }
                });
                return p;
            };
        /**
         * Deletes the layer
         *
         * \@memberof BingLayerBase
         * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
         * @return {?} - A promise that is fullfilled when the layer has been removed.
         *
         */
        BingLayerBase.prototype.DeleteLayer = /**
         * Deletes the layer
         *
         * \@memberof BingLayerBase
         * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
         * @return {?} - A promise that is fullfilled when the layer has been removed.
         *
         */
            function (layer) {
                var _this = this;
                /** @type {?} */
                var l = this._layers.get(layer.Id);
                if (l == null) {
                    return Promise.resolve();
                }
                return l.then(function (l1) {
                    return _this._zone.run(function () {
                        l1.Delete();
                        _this._layers.delete(layer.Id);
                    });
                });
            };
        /**
         * Returns the Layer model represented by this layer.
         *
         * \@memberof BingLayerBase
         * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
         * @return {?} - A promise that when resolved contains the Layer model.
         *
         */
        BingLayerBase.prototype.GetNativeLayer = /**
         * Returns the Layer model represented by this layer.
         *
         * \@memberof BingLayerBase
         * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
         * @return {?} - A promise that when resolved contains the Layer model.
         *
         */
            function (layer) {
                /** @type {?} */
                var p = null;
                if (typeof (layer) === 'number') {
                    p = this._layers.get(layer);
                }
                else {
                    p = this._layers.get(((layer)).Id);
                }
                return p;
            };
        ///
        /// Protected methods
        ///
        /**
         * Gets the layer based on its id.
         *
         * @protected
         * @param id - Layer Id.
         * @returns - A promise that when fullfilled contains the {@link Layer} model for the layer.
         *
         * @memberof BingLayerBase
         */
        /**
         * Gets the layer based on its id.
         *
         * @protected
         * \@memberof BingLayerBase
         * @param {?} id - Layer Id.
         * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
         *
         */
        BingLayerBase.prototype.GetLayerById = /**
         * Gets the layer based on its id.
         *
         * @protected
         * \@memberof BingLayerBase
         * @param {?} id - Layer Id.
         * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
         *
         */
            function (id) {
                /** @type {?} */
                var p;
                this._layers.forEach(function (l, k) {
                    if (k === id) {
                        p = l;
                    }
                });
                return p;
            };
        return BingLayerBase;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Implements the {\@link LayerService} contract for a  Bing Maps V8 specific implementation.
     *
     * @export
     */
    var BingLayerService = (function (_super) {
        __extends(BingLayerService, _super);
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of BingLayerService.
         * @param _mapService - Instance of the Bing Maps Service. Will generally be injected.
         * @param _zone - NgZone instance to provide zone aware promises.
         *
         * @memberof BingLayerService
         */
        function BingLayerService(_mapService, _zone) {
            return _super.call(this, _mapService, _zone) || this;
        }
        /**
         * Adds a layer to the map.
         *
         * @abstract
         * \@memberof BingLayerService
         * @param {?} layer - MapLayerDirective component object.
         * Generally, MapLayerDirective will be injected with an instance of the
         * LayerService and then self register on initialization.
         *
         * @return {?}
         */
        BingLayerService.prototype.AddLayer = /**
         * Adds a layer to the map.
         *
         * @abstract
         * \@memberof BingLayerService
         * @param {?} layer - MapLayerDirective component object.
         * Generally, MapLayerDirective will be injected with an instance of the
         * LayerService and then self register on initialization.
         *
         * @return {?}
         */
            function (layer) {
                /** @type {?} */
                var layerPromise = this._mapService.CreateLayer({ id: layer.Id });
                this._layers.set(layer.Id, layerPromise);
                layerPromise.then(function (l) { return l.SetVisible(layer.Visible); });
            };
        /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
        BingLayerService.prototype.CreatePolygon = /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
            function (layer, options) {
                var _this = this;
                /** @type {?} */
                var p = this.GetLayerById(layer);
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    /** @type {?} */
                    var locs = BingConversions.TranslatePaths(options.paths);
                    /** @type {?} */
                    var o = BingConversions.TranslatePolygonOptions(options);
                    /** @type {?} */
                    var poly = new Microsoft.Maps.Polygon(locs, o);
                    /** @type {?} */
                    var polygon = new BingPolygon(poly, /** @type {?} */ (_this._mapService), l.NativePrimitve);
                    if (options.metadata) {
                        options.metadata.forEach(function (v, k) { return polygon.Metadata.set(k, v); });
                    }
                    if (options.title && options.title !== '') {
                        polygon.Title = options.title;
                    }
                    if (options.showLabel != null) {
                        polygon.ShowLabel = options.showLabel;
                    }
                    if (options.showTooltip != null) {
                        polygon.ShowTooltip = options.showTooltip;
                    }
                    if (options.labelMaxZoom != null) {
                        polygon.LabelMaxZoom = options.labelMaxZoom;
                    }
                    if (options.labelMinZoom != null) {
                        polygon.LabelMinZoom = options.labelMinZoom;
                    }
                    l.AddEntity(polygon);
                    return polygon;
                });
            };
        /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
        BingLayerService.prototype.CreatePolygons = /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
            function (layer, options) {
                var _this = this;
                /** @type {?} */
                var p = this.GetLayerById(layer);
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    /** @type {?} */
                    var polygons = new Promise(function (resolve, reject) {
                        /** @type {?} */
                        var polys = options.map(function (o) {
                            /** @type {?} */
                            var locs = BingConversions.TranslatePaths(o.paths);
                            /** @type {?} */
                            var op = BingConversions.TranslatePolygonOptions(o);
                            /** @type {?} */
                            var poly = new Microsoft.Maps.Polygon(locs, op);
                            /** @type {?} */
                            var polygon = new BingPolygon(poly, /** @type {?} */ (_this._mapService), l.NativePrimitve);
                            if (o.title && o.title !== '') {
                                polygon.Title = o.title;
                            }
                            if (o.metadata) {
                                o.metadata.forEach(function (v, k) { return polygon.Metadata.set(k, v); });
                            }
                            return polygon;
                        });
                        resolve(polys);
                    });
                    return polygons;
                });
            };
        /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the line.
         * @param {?} options - Polyline options defining the line.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
         * of polygons for complex paths) model.
         *
         */
        BingLayerService.prototype.CreatePolyline = /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the line.
         * @param {?} options - Polyline options defining the line.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
         * of polygons for complex paths) model.
         *
         */
            function (layer, options) {
                var _this = this;
                /** @type {?} */
                var p = this.GetLayerById(layer);
                /** @type {?} */
                var polyline;
                /** @type {?} */
                var line;
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    /** @type {?} */
                    var locs = BingConversions.TranslatePaths(options.path);
                    /** @type {?} */
                    var o = BingConversions.TranslatePolylineOptions(options);
                    if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                        polyline = new Microsoft.Maps.Polyline(locs[0], o);
                        line = new BingPolyline(polyline, _this._mapService.MapInstance, l.NativePrimitve);
                        l.AddEntity(line);
                        if (options.metadata) {
                            options.metadata.forEach(function (v, k) { return line.Metadata.set(k, v); });
                        }
                        if (options.title && options.title !== '') {
                            line.Title = options.title;
                        }
                        if (options.showTooltip != null) {
                            line.ShowTooltip = options.showTooltip;
                        }
                        return line;
                    }
                    else {
                        /** @type {?} */
                        var lines_1 = new Array();
                        locs.forEach(function (x) {
                            polyline = new Microsoft.Maps.Polyline(x, o);
                            line = new BingPolyline(polyline, _this._mapService.MapInstance, l.NativePrimitve);
                            l.AddEntity(line);
                            if (options.metadata) {
                                options.metadata.forEach(function (v, k) { return line.Metadata.set(k, v); });
                            }
                            if (options.title && options.title !== '') {
                                line.Title = options.title;
                            }
                            if (options.showTooltip != null) {
                                line.ShowTooltip = options.showTooltip;
                            }
                            lines_1.push(line);
                        });
                        return lines_1;
                    }
                });
            };
        /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
        BingLayerService.prototype.CreatePolylines = /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof BingLayerService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
            function (layer, options) {
                var _this = this;
                /** @type {?} */
                var p = this.GetLayerById(layer);
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    /** @type {?} */
                    var polylines = new Promise(function (resolve, reject) {
                        /** @type {?} */
                        var polys = options.map(function (o) {
                            /** @type {?} */
                            var locs = BingConversions.TranslatePaths(o.path);
                            /** @type {?} */
                            var op = BingConversions.TranslatePolylineOptions(o);
                            if (locs && locs.length > 0 && !Array.isArray(locs[0])) {
                                /** @type {?} */
                                var poly = new Microsoft.Maps.Polyline(locs[0], op);
                                /** @type {?} */
                                var polyline_1 = new BingPolyline(poly, _this._mapService.MapInstance, l.NativePrimitve);
                                if (o.title && o.title !== '') {
                                    polyline_1.Title = o.title;
                                }
                                if (o.metadata) {
                                    o.metadata.forEach(function (v, k) { return polyline_1.Metadata.set(k, v); });
                                }
                                return polyline_1;
                            }
                            else {
                                /** @type {?} */
                                var lines_2 = new Array();
                                locs.forEach(function (x) {
                                    /** @type {?} */
                                    var poly = new Microsoft.Maps.Polyline(x, op);
                                    /** @type {?} */
                                    var polyline = new BingPolyline(poly, _this._mapService.MapInstance, l.NativePrimitve);
                                    if (o.metadata) {
                                        o.metadata.forEach(function (v, k) { return polyline.Metadata.set(k, v); });
                                    }
                                    if (o.title && o.title !== '') {
                                        polyline.Title = o.title;
                                    }
                                    lines_2.push(polyline);
                                });
                                return lines_2;
                            }
                        });
                        resolve(polys);
                    });
                    return polylines;
                });
            };
        BingLayerService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingLayerService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        return BingLayerService;
    }(BingLayerBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Implements the {\@link ClusterService} contract for a  Bing Maps V8 specific implementation.
     *
     * @export
     */
    var BingClusterService = (function (_super) {
        __extends(BingClusterService, _super);
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of BingClusterService.
         * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
         * @param _zone - NgZone instance to provide zone aware promises.
         *
         * @memberof BingClusterService
         */
        function BingClusterService(_mapService, _zone) {
            return _super.call(this, _mapService, _zone) || this;
        }
        /**
         * Adds a layer to the map.
         *
         * @abstract
         * \@memberof BingClusterService
         * @param {?} layer - ClusterLayerDirective component object.
         * Generally, MapLayer will be injected with an instance of the
         * LayerService and then self register on initialization.
         *
         * @return {?}
         */
        BingClusterService.prototype.AddLayer = /**
         * Adds a layer to the map.
         *
         * @abstract
         * \@memberof BingClusterService
         * @param {?} layer - ClusterLayerDirective component object.
         * Generally, MapLayer will be injected with an instance of the
         * LayerService and then self register on initialization.
         *
         * @return {?}
         */
            function (layer) {
                var _this = this;
                /** @type {?} */
                var options = {
                    id: layer.Id,
                    visible: layer.Visible,
                    clusteringEnabled: layer.ClusteringEnabled,
                    placementMode: layer.ClusterPlacementMode
                };
                if (layer.GridSize) {
                    options.gridSize = layer.GridSize;
                }
                if (layer.LayerOffset) {
                    options.layerOffset = layer.LayerOffset;
                }
                if (layer.ZIndex) {
                    options.zIndex = layer.ZIndex;
                }
                if (layer.IconInfo) {
                    options.clusteredPinCallback = function (pin) { _this.CreateClusterPushPin(pin, layer); };
                }
                if (layer.CustomMarkerCallback) {
                    options.clusteredPinCallback = function (pin) { _this.CreateCustomClusterPushPin(pin, layer); };
                }
                if (layer.SpiderClusterOptions) {
                    options.spiderClusterOptions = layer.SpiderClusterOptions;
                }
                /** @type {?} */
                var layerPromise = this._mapService.CreateClusterLayer(options);
                ((this._mapService)).MapPromise.then(function (m) {
                    Microsoft.Maps.Events.addHandler(m, 'viewchangeend', function (e) {
                        if (layer.ClusteringEnabled && m.getZoom() === 19) {
                            layerPromise.then(function (l) {
                                l.SetOptions({ id: layer.Id, clusteringEnabled: false });
                            });
                        }
                        if (layer.ClusteringEnabled && m.getZoom() < 19) {
                            layerPromise.then(function (l) {
                                if (!l.GetOptions().clusteringEnabled) {
                                    l.SetOptions({ id: layer.Id, clusteringEnabled: true });
                                }
                            });
                        }
                    });
                });
                this._layers.set(layer.Id, layerPromise);
            };
        /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
        BingClusterService.prototype.CreatePolygon = /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
            function (layer, options) {
                throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
            };
        /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
        BingClusterService.prototype.CreatePolygons = /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
            function (layer, options) {
                throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
            };
        /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the line.
         * @param {?} options - Polyline options defining the line.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
         * of polygons for complex paths) model.
         *
         */
        BingClusterService.prototype.CreatePolyline = /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the line.
         * @param {?} options - Polyline options defining the line.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
         * of polygons for complex paths) model.
         *
         */
            function (layer, options) {
                throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
            };
        /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
        BingClusterService.prototype.CreatePolylines = /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof BingClusterService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
            function (layer, options) {
                throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
            };
        /**
         * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
         * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterService
         * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
         *
         * @return {?}
         */
        BingClusterService.prototype.StartClustering = /**
         * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
         * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterService
         * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
         *
         * @return {?}
         */
            function (layer) {
                var _this = this;
                /** @type {?} */
                var l = this._layers.get(layer.Id);
                if (l == null) {
                    return Promise.resolve();
                }
                return l.then(function (l1) {
                    return _this._zone.run(function () {
                        l1.StartClustering();
                    });
                });
            };
        /**
         * Stop to actually cluster the entities in a cluster layer.
         * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterService
         * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
         *
         * @return {?}
         */
        BingClusterService.prototype.StopClustering = /**
         * Stop to actually cluster the entities in a cluster layer.
         * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof BingClusterService
         * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
         *
         * @return {?}
         */
            function (layer) {
                var _this = this;
                /** @type {?} */
                var l = this._layers.get(layer.Id);
                if (l == null) {
                    return Promise.resolve();
                }
                return l.then(function (l1) {
                    return _this._zone.run(function () {
                        l1.StopClustering();
                    });
                });
            };
        /**
         * Creates the default cluster pushpin as a callback from BingMaps when clustering occurs. The {\@link ClusterLayerDirective} model
         * can provide an IconInfo property that would govern the apparenace of the pin. This method will assign the same pin to all
         * clusters in the layer.
         *
         * \@memberof BingClusterService
         * @param {?} cluster - The cluster for which to create the pushpin.
         * @param {?} layer - The {\@link ClusterLayerDirective} component representing the layer.
         *
         * @return {?}
         */
        BingClusterService.prototype.CreateClusterPushPin = /**
         * Creates the default cluster pushpin as a callback from BingMaps when clustering occurs. The {\@link ClusterLayerDirective} model
         * can provide an IconInfo property that would govern the apparenace of the pin. This method will assign the same pin to all
         * clusters in the layer.
         *
         * \@memberof BingClusterService
         * @param {?} cluster - The cluster for which to create the pushpin.
         * @param {?} layer - The {\@link ClusterLayerDirective} component representing the layer.
         *
         * @return {?}
         */
            function (cluster, layer) {
                var _this = this;
                this._layers.get(layer.Id).then(function (l) {
                    if (layer.IconInfo) {
                        /** @type {?} */
                        var o_1 = {};
                        /** @type {?} */
                        var payload_1 = function (ico, info) {
                            o_1.icon = ico;
                            o_1.anchor = new Microsoft.Maps.Point((info.size && info.markerOffsetRatio) ? (info.size.width * info.markerOffsetRatio.x) : 0, (info.size && info.markerOffsetRatio) ? (info.size.height * info.markerOffsetRatio.y) : 0);
                            cluster.setOptions(o_1);
                        };
                        /** @type {?} */
                        var icon = Marker.CreateMarker(layer.IconInfo);
                        if (typeof (icon) === 'string') {
                            payload_1(icon, layer.IconInfo);
                        }
                        else {
                            icon.then(function (x) {
                                payload_1(x.icon, x.iconInfo);
                            });
                        }
                    }
                    if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                        Microsoft.Maps.Events.addHandler(cluster, 'click', function (e) { return _this.ZoomIntoCluster(e); });
                    }
                    if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                        Microsoft.Maps.Events.addHandler(cluster, 'dblclick', function (e) { return _this.ZoomIntoCluster(e); });
                        l.InitializeSpiderClusterSupport();
                    }
                });
            };
        /**
         * Provides a hook for consumers to provide a custom function to create cluster bins for a cluster. This is particuarily useful
         * in situation where the pin should differ to represent information about the pins in the cluster.
         *
         * \@memberof BingClusterService
         * @param {?} cluster - The cluster for which to create the pushpin.
         * @param {?} layer - The {\@link ClusterLayerDirective} component
         * representing the layer. Set the {\@link ClusterLayerDirective.CustomMarkerCallback}
         * property to define the callback generating the pin.
         *
         * @return {?}
         */
        BingClusterService.prototype.CreateCustomClusterPushPin = /**
         * Provides a hook for consumers to provide a custom function to create cluster bins for a cluster. This is particuarily useful
         * in situation where the pin should differ to represent information about the pins in the cluster.
         *
         * \@memberof BingClusterService
         * @param {?} cluster - The cluster for which to create the pushpin.
         * @param {?} layer - The {\@link ClusterLayerDirective} component
         * representing the layer. Set the {\@link ClusterLayerDirective.CustomMarkerCallback}
         * property to define the callback generating the pin.
         *
         * @return {?}
         */
            function (cluster, layer) {
                var _this = this;
                this._layers.get(layer.Id).then(function (l) {
                    /** @type {?} */
                    var m = new Array();
                    cluster.containedPushpins.forEach(function (p) {
                        /** @type {?} */
                        var marker = l.GetMarkerFromBingMarker(p);
                        if (marker) {
                            m.push(marker);
                        }
                    });
                    /** @type {?} */
                    var iconInfo = { markerType: MarkerTypeId.None };
                    /** @type {?} */
                    var o = {};
                    o.icon = layer.CustomMarkerCallback(m, iconInfo);
                    if (o.icon !== '') {
                        o.anchor = new Microsoft.Maps.Point((iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.width * iconInfo.markerOffsetRatio.x) : 0, (iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.height * iconInfo.markerOffsetRatio.y) : 0);
                        if (iconInfo.textOffset) {
                            o.textOffset = new Microsoft.Maps.Point(iconInfo.textOffset.x, iconInfo.textOffset.y);
                        }
                        cluster.setOptions(o);
                    }
                    if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                        Microsoft.Maps.Events.addHandler(cluster, 'click', function (e) { return _this.ZoomIntoCluster(e); });
                    }
                    if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                        Microsoft.Maps.Events.addHandler(cluster, 'dblclick', function (e) { return _this.ZoomIntoCluster(e); });
                        l.InitializeSpiderClusterSupport();
                    }
                });
            };
        /**
         * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
         *
         * \@memberof BingClusterService
         * @param {?} e - Mouse Event.
         *
         * @return {?}
         */
        BingClusterService.prototype.ZoomIntoCluster = /**
         * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
         *
         * \@memberof BingClusterService
         * @param {?} e - Mouse Event.
         *
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var pin = (e.target);
                if (pin && pin.containedPushpins) {
                    /** @type {?} */
                    var bounds_1 = void 0;
                    /** @type {?} */
                    var locs_1 = new Array();
                    pin.containedPushpins.forEach(function (p) { return locs_1.push(p.getLocation()); });
                    bounds_1 = Microsoft.Maps.LocationRect.fromLocations(locs_1);
                    // Zoom into the bounding box of the cluster.
                    // Add a padding to compensate for the pixel area of the pushpins.
                    ((this._mapService)).MapPromise.then(function (m) {
                        m.setView({ bounds: bounds_1, padding: 75 });
                    });
                }
            };
        BingClusterService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingClusterService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        return BingClusterService;
    }(BingLayerBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the Polygon Service abstract class for Bing Maps V8.
     *
     * @export
     */
    var BingPolygonService = (function () {
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
                var b = new rxjs.Subject();
                if (eventName === 'mousemove') {
                    return b.asObservable();
                }
                if (eventName === 'rightclick') {
                    return b.asObservable();
                }
                return rxjs.Observable.create(function (observer) {
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
                var x = (e);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingPolygonService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: LayerService },
                { type: core.NgZone }
            ];
        };
        return BingPolygonService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the Polyline Service abstract class for Bing Maps V8.
     *
     * @export
     */
    var BingPolylineService = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of BingPolylineService.
         * @param _mapService - {@link MapService} instance. The concrete {@link BingMapService} implementation is expected.
         * @param _layerService - {@link LayerService} instance.
         * The concrete {@link BingLayerService} implementation is expected.
         * @param _zone - NgZone instance to support zone aware promises.
         *
         * @memberof BingPolylineService
         */
        function BingPolylineService(_mapService, _layerService, _zone) {
            this._mapService = _mapService;
            this._layerService = _layerService;
            this._zone = _zone;
            this._polylines = new Map();
        }
        /**
         * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
         * corresponding layer.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
         *
         * @return {?}
         */
        BingPolylineService.prototype.AddPolyline = /**
         * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
         * corresponding layer.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
         *
         * @return {?}
         */
            function (polyline) {
                /** @type {?} */
                var o = {
                    id: polyline.Id,
                    clickable: polyline.Clickable,
                    draggable: polyline.Draggable,
                    editable: polyline.Editable,
                    geodesic: polyline.Geodesic,
                    path: polyline.Path,
                    showTooltip: polyline.ShowTooltip,
                    strokeColor: polyline.StrokeColor,
                    strokeOpacity: polyline.StrokeOpacity,
                    strokeWeight: polyline.StrokeWeight,
                    title: polyline.Title,
                    visible: polyline.Visible,
                    zIndex: polyline.zIndex,
                };
                /** @type {?} */
                var polylinePromise;
                if (polyline.InCustomLayer) {
                    polylinePromise = this._layerService.CreatePolyline(polyline.LayerId, o);
                }
                else {
                    polylinePromise = this._mapService.CreatePolyline(o);
                }
                this._polylines.set(polyline, polylinePromise);
            };
        /**
         * Registers an event delegate for a line.
         *
         * \@memberof BingPolylineService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
        BingPolylineService.prototype.CreateEventObservable = /**
         * Registers an event delegate for a line.
         *
         * \@memberof BingPolylineService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
            function (eventName, polyline) {
                var _this = this;
                /** @type {?} */
                var b = new rxjs.Subject();
                if (eventName === 'mousemove') {
                    return b.asObservable();
                }
                if (eventName === 'rightclick') {
                    return b.asObservable();
                }
                return rxjs.Observable.create(function (observer) {
                    _this._polylines.get(polyline).then(function (p) {
                        /** @type {?} */
                        var x = Array.isArray(p) ? p : [p];
                        x.forEach(function (line) { return line.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); }); });
                    });
                });
            };
        /**
         * Deletes a polyline.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
         * @return {?} - A promise fullfilled once the polyline has been deleted.
         *
         */
        BingPolylineService.prototype.DeletePolyline = /**
         * Deletes a polyline.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
         * @return {?} - A promise fullfilled once the polyline has been deleted.
         *
         */
            function (polyline) {
                var _this = this;
                /** @type {?} */
                var m = this._polylines.get(polyline);
                if (m == null) {
                    return Promise.resolve();
                }
                return m.then(function (l) {
                    return _this._zone.run(function () {
                        /** @type {?} */
                        var x = Array.isArray(l) ? l : [l];
                        x.forEach(function (line) { return line.Delete(); });
                        _this._polylines.delete(polyline);
                    });
                });
            };
        /**
         * Obtains geo coordinates for the marker on the click location
         *
         * @abstract
         * \@memberof BingPolylineService
         * @param {?} e - The mouse event.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
         *
         */
        BingPolylineService.prototype.GetCoordinatesFromClick = /**
         * Obtains geo coordinates for the marker on the click location
         *
         * @abstract
         * \@memberof BingPolylineService
         * @param {?} e - The mouse event.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
         *
         */
            function (e) {
                if (!e) {
                    return null;
                }
                if (!e.location) {
                    return null;
                }
                return { latitude: e.location.latitude, longitude: e.location.longitude };
            };
        /**
         * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
         * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
         * implementation of the underlying platform. For complex paths, returns an array of polylines.
         *
         */
        BingPolylineService.prototype.GetNativePolyline = /**
         * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
         * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
         * implementation of the underlying platform. For complex paths, returns an array of polylines.
         *
         */
            function (polyline) {
                return this._polylines.get(polyline);
            };
        /**
         * Set the polyline options.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
         * options already on the underlying object.
         * @return {?} - A promise fullfilled once the polyline options have been set.
         *
         */
        BingPolylineService.prototype.SetOptions = /**
         * Set the polyline options.
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
         * options already on the underlying object.
         * @return {?} - A promise fullfilled once the polyline options have been set.
         *
         */
            function (polyline, options) {
                return this._polylines.get(polyline).then(function (l) {
                    /** @type {?} */
                    var x = Array.isArray(l) ? l : [l];
                    x.forEach(function (line) { return line.SetOptions(options); });
                });
            };
        /**
         * Updates the Polyline path
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @return {?} - A promise fullfilled once the polyline has been updated.
         *
         */
        BingPolylineService.prototype.UpdatePolyline = /**
         * Updates the Polyline path
         *
         * \@memberof BingPolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @return {?} - A promise fullfilled once the polyline has been updated.
         *
         */
            function (polyline) {
                var _this = this;
                /** @type {?} */
                var m = this._polylines.get(polyline);
                if (m == null) {
                    return Promise.resolve();
                }
                return m.then(function (l) {
                    return _this._zone.run(function () {
                        /** @type {?} */
                        var x = Array.isArray(l) ? l : [l];
                        /** @type {?} */
                        var p = polyline.Path.length > 0 && Array.isArray(polyline.Path[0]) ? /** @type {?} */ (polyline.Path) : /** @type {?} */ ([polyline.Path]);
                        x.forEach(function (line, index) {
                            if (p.length > index) {
                                line.SetPath(p[index]);
                            }
                        });
                        if (Array.isArray(l) && l.length > p.length) {
                            l.splice(p.length - 1).forEach(function (line) { return line.Delete(); });
                        }
                    });
                });
            };
        BingPolylineService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingPolylineService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: LayerService },
                { type: core.NgZone }
            ];
        };
        return BingPolylineService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Implements a factory to create thre necessary Bing Maps V8 specific service instances.
     *
     * @export
     */
    var BingMapServiceFactory = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of BingMapServiceFactory.
         * @param _loader - {@link MapAPILoader} implementation for the Bing Map V8 provider.
         * @param _zone - NgZone object to implement zone aware promises.
         *
         * @memberof BingMapServiceFactory
         */
        function BingMapServiceFactory(_loader, _zone) {
            this._loader = _loader;
            this._zone = _zone;
        }
        /**
         * Creates the map service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @return {?} - {\@link MapService}. A concreted instance of the {\@link BingMapService}.
         *
         */
        BingMapServiceFactory.prototype.Create = /**
         * Creates the map service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @return {?} - {\@link MapService}. A concreted instance of the {\@link BingMapService}.
         *
         */
            function () {
                return new BingMapService(this._loader, this._zone);
            };
        /**
         * Creates the cluster service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
         *
         */
        BingMapServiceFactory.prototype.CreateClusterService = /**
         * Creates the cluster service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
         *
         */
            function (_mapService) {
                return new BingClusterService(_mapService, this._zone);
            };
        /**
         * Creates thh info box service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
         *
         */
        BingMapServiceFactory.prototype.CreateInfoBoxService = /**
         * Creates thh info box service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
         *
         */
            function (_mapService) {
                return new BingInfoBoxService(_mapService, this._zone);
            };
        /**
         * Creates the layer service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
         *
         */
        BingMapServiceFactory.prototype.CreateLayerService = /**
         * Creates the layer service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
         *
         */
            function (_mapService) {
                return new BingLayerService(_mapService, this._zone);
            };
        /**
         * Creates the marker service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @param {?} _layerService
         * @param {?} _clusterService
         * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link BingMarkerService}.
         *
         */
        BingMapServiceFactory.prototype.CreateMarkerService = /**
         * Creates the marker service for the Bing Maps V8 implementation.
         *
         * \@memberof BingMapServiceFactory
         * @param {?} _mapService
         * @param {?} _layerService
         * @param {?} _clusterService
         * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link BingMarkerService}.
         *
         */
            function (_mapService, _layerService, _clusterService) {
                return new BingMarkerService(_mapService, _layerService, _clusterService, this._zone);
            };
        /**
         * Creates the polygon service for the Bing Maps V8 implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
         *
         */
        BingMapServiceFactory.prototype.CreatePolygonService = /**
         * Creates the polygon service for the Bing Maps V8 implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
         *
         */
            function (map, layers) {
                return new BingPolygonService(map, layers, this._zone);
            };
        /**
         * Creates the polyline service for the Bing Maps V8 implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
         *
         */
        BingMapServiceFactory.prototype.CreatePolylineService = /**
         * Creates the polyline service for the Bing Maps V8 implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
         *
         */
            function (map, layers) {
                return new BingPolylineService(map, layers, this._zone);
            };
        BingMapServiceFactory.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BingMapServiceFactory.ctorParameters = function () {
            return [
                { type: MapAPILoader },
                { type: core.NgZone }
            ];
        };
        return BingMapServiceFactory;
    }());
    /**
     * Creates a new instance of a plaform specific MapServiceFactory.
     *
     * @export
     * @param {?} apiLoader - An {\@link MapAPILoader} instance. This is expected to the a {\@link BingMapAPILoader}.
     * @param {?} zone - An NgZone instance to provide zone aware promises.
     *
     * @return {?} -  A {\@link MapServiceFactory} instance.
     */
    function BingMapServiceFactoryFactory(apiLoader, zone) {
        return new BingMapServiceFactory(apiLoader, zone);
    }
    /**
     * Creates a new instance of a plaform specific MapLoaderFactory.
     *
     * @export
     * @return {?} - A {\@link MapAPILoader} instance.
     */
    function BingMapLoaderFactory() {
        return new BingMapAPILoader(new BingMapAPILoaderConfig(), new WindowRef(), new DocumentRef());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This abstract partially implements the contract for the {\@link LayerService}
     * and {\@link ClusterService} for the Google Maps archtiecture. It serves
     * as the base class for basic layer ({\@link GoogleLayerService}) and cluster layer ({\@link GoogleClusterLayer}).
     *
     * @export
     * @abstract
     * @abstract
     */
    var /**
     * This abstract partially implements the contract for the {\@link LayerService}
     * and {\@link ClusterService} for the Google Maps archtiecture. It serves
     * as the base class for basic layer ({\@link GoogleLayerService}) and cluster layer ({\@link GoogleClusterLayer}).
     *
     * @export
     * @abstract
     * @abstract
     */ GoogleLayerBase = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of GoogleLayerBase.
         * @param _mapService - Concrete {@link MapService} implementation for Google Maps.
         * An instance of {@link GoogleMapService}.
         * @param _zone - NgZone instance to provide zone aware promises.
         *
         * @memberof GoogleLayerBase
         */
        function GoogleLayerBase(_mapService, _zone) {
            this._mapService = _mapService;
            this._zone = _zone;
        }
        /**
         * Deletes the layer
         *
         * \@memberof GoogleLayerBase
         * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
         * @return {?} - A promise that is fullfilled when the layer has been removed.
         *
         */
        GoogleLayerBase.prototype.DeleteLayer = /**
         * Deletes the layer
         *
         * \@memberof GoogleLayerBase
         * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
         * @return {?} - A promise that is fullfilled when the layer has been removed.
         *
         */
            function (layer) {
                var _this = this;
                /** @type {?} */
                var l = this._layers.get(layer.Id);
                if (l == null) {
                    return Promise.resolve();
                }
                return l.then(function (l1) {
                    return _this._zone.run(function () {
                        l1.Delete();
                        _this._layers.delete(layer.Id);
                    });
                });
            };
        /**
         * Returns the Layer model represented by this layer.
         *
         * \@memberof GoogleLayerBase
         * @param {?} layer - MapLayerDirective component object or layer id for which to retrieve the layer model.
         * @return {?} - A promise that when resolved contains the Layer model.
         *
         */
        GoogleLayerBase.prototype.GetNativeLayer = /**
         * Returns the Layer model represented by this layer.
         *
         * \@memberof GoogleLayerBase
         * @param {?} layer - MapLayerDirective component object or layer id for which to retrieve the layer model.
         * @return {?} - A promise that when resolved contains the Layer model.
         *
         */
            function (layer) {
                /** @type {?} */
                var p = null;
                if (typeof (layer) === 'number') {
                    p = this._layers.get(layer);
                }
                else {
                    p = this._layers.get(((layer)).Id);
                }
                return p;
            };
        /**
         * Creates a marker in the layer.
         *
         * \@memberof GoogleLayerBase
         * @param {?} layer - The Id of the layer in which to create the marker.
         * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
         * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
         *
         */
        GoogleLayerBase.prototype.CreateMarker = /**
         * Creates a marker in the layer.
         *
         * \@memberof GoogleLayerBase
         * @param {?} layer - The Id of the layer in which to create the marker.
         * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
         * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
         *
         */
            function (layer, options) {
                /** @type {?} */
                var mp = this._mapService.MapPromise;
                /** @type {?} */
                var lp = this._layers.get(layer);
                return Promise.all([mp, lp]).then(function (_a) {
                    var _b = __read(_a, 2), map = _b[0], l = _b[1];
                    /** @type {?} */
                    var payload = function (x) {
                        /** @type {?} */
                        var marker = new google.maps.Marker(x);
                        if (options.metadata) {
                            options.metadata.forEach(function (val, key) { return marker.Metadata.set(key, val); });
                        }
                        marker.setMap(map);
                        /** @type {?} */
                        var m = new GoogleMarker(marker);
                        m.IsFirst = options.isFirst;
                        m.IsLast = options.isLast;
                        if (options.metadata) {
                            options.metadata.forEach(function (val, key) { return m.Metadata.set(key, val); });
                        }
                        l.AddEntity(m);
                        return m;
                    };
                    /** @type {?} */
                    var o = GoogleConversions.TranslateMarkerOptions(options);
                    if (options.iconInfo && options.iconInfo.markerType) {
                        /** @type {?} */
                        var s = Marker.CreateMarker(options.iconInfo);
                        if (typeof (s) === 'string') {
                            o.icon = s;
                            return payload(o);
                        }
                        else {
                            return s.then(function (x) {
                                o.icon = x.icon;
                                return payload(o);
                            });
                        }
                    }
                    else {
                        return payload(o);
                    }
                });
            };
        /**
         * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
         * operations.
         *
         * \@memberof GoogleLayerBase
         * @param {?} options - Marker options defining the markers.
         * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
         *
         */
        GoogleLayerBase.prototype.CreateMarkers = /**
         * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
         * operations.
         *
         * \@memberof GoogleLayerBase
         * @param {?} options - Marker options defining the markers.
         * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
         *
         */
            function (options, markerIcon) {
                /** @type {?} */
                var payload = function (icon) {
                    /** @type {?} */
                    var markers = options.map(function (mo) {
                        /** @type {?} */
                        var o = GoogleConversions.TranslateMarkerOptions(mo);
                        if (icon && icon !== '') {
                            o.icon = icon;
                        }
                        /** @type {?} */
                        var pushpin = new google.maps.Marker(o);
                        /** @type {?} */
                        var marker = new GoogleMarker(pushpin);
                        marker.IsFirst = mo.isFirst;
                        marker.IsLast = mo.isLast;
                        if (mo.metadata) {
                            mo.metadata.forEach(function (val, key) { return marker.Metadata.set(key, val); });
                        }
                        return marker;
                    });
                    return markers;
                };
                /** @type {?} */
                var p = new Promise(function (resolve, reject) {
                    if (markerIcon && markerIcon.markerType) {
                        /** @type {?} */
                        var s = Marker.CreateMarker(markerIcon);
                        if (typeof (s) === 'string') {
                            resolve(payload(s));
                        }
                        else {
                            return s.then(function (x) {
                                resolve(payload(x.icon));
                            });
                        }
                    }
                    else {
                        resolve(payload(null));
                    }
                });
                return p;
            };
        ///
        /// Protected methods
        ///
        /**
         * Gets the layer based on its id.
         *
         * @protected
         * @param id - Layer Id.
         * @returns - A promise that when fullfilled contains the {@link Layer} model for the layer.
         *
         * @memberof GoogleLayerBase
         */
        /**
         * Gets the layer based on its id.
         *
         * @protected
         * \@memberof GoogleLayerBase
         * @param {?} id - Layer Id.
         * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
         *
         */
        GoogleLayerBase.prototype.GetLayerById = /**
         * Gets the layer based on its id.
         *
         * @protected
         * \@memberof GoogleLayerBase
         * @param {?} id - Layer Id.
         * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
         *
         */
            function (id) {
                /** @type {?} */
                var p;
                this._layers.forEach(function (l, k) {
                    if (k === id) {
                        p = l;
                    }
                });
                return p;
            };
        return GoogleLayerBase;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GoogleClusterService = (function (_super) {
        __extends(GoogleClusterService, _super);
        ///
        /// Constructors
        ///
        /**
         * Creates an instance of GoogleClusterService.
         * @param _mapService
         * @param _zone
         * @memberof GoogleClusterService
         */
        function GoogleClusterService(_mapService, _zone) {
            var _this = _super.call(this, _mapService, _zone) || this;
            _this._layers = new Map();
            _this._layerStyles = new Map();
            return _this;
        }
        /**
         * Creates the cluster icon from the styles
         *
         * \@memberof GoogleClusterService
         * @param {?} styles
         * @return {?} - Promise that when resolved contains an Array of IClusterIconInfo objects
         * containing the hydrated cluster icons.
         */
        GoogleClusterService.CreateClusterIcons = /**
         * Creates the cluster icon from the styles
         *
         * \@memberof GoogleClusterService
         * @param {?} styles
         * @return {?} - Promise that when resolved contains an Array of IClusterIconInfo objects
         * containing the hydrated cluster icons.
         */
            function (styles) {
                /** @type {?} */
                var i = new Promise(function (resolve, reject) {
                    /** @type {?} */
                    var pa = new Array();
                    styles.forEach(function (style, index) {
                        if (style.iconInfo) {
                            /** @type {?} */
                            var s = Marker.CreateMarker(style.iconInfo);
                            if (typeof (s) === 'string') {
                                style.url = s;
                                if (style.width == null) {
                                    style.width = style.iconInfo.size.width;
                                    style.height = style.iconInfo.size.height;
                                }
                                if (style.iconInfo.markerOffsetRatio && style.iconInfo.size && style.anchor == null) {
                                    /** @type {?} */
                                    var o = style.iconInfo;
                                    style.anchor = [
                                        o.size.width * o.markerOffsetRatio.x,
                                        o.size.height * o.markerOffsetRatio.y
                                    ];
                                }
                                delete style.iconInfo;
                            }
                            else {
                                s.then(function (x) {
                                    style.url = x.icon;
                                    if (style.width == null) {
                                        style.width = x.iconInfo.size.width;
                                        style.height = x.iconInfo.size.height;
                                    }
                                    if (x.iconInfo.markerOffsetRatio && x.iconInfo.size && style.anchor == null) {
                                        /** @type {?} */
                                        var o = x.iconInfo;
                                        style.anchor = [
                                            o.size.width * o.markerOffsetRatio.x,
                                            o.size.height * o.markerOffsetRatio.y
                                        ];
                                    }
                                    delete style.iconInfo;
                                });
                                pa.push(s);
                            }
                        }
                    });
                    if (pa.length === 0) {
                        resolve(styles);
                    }
                    else {
                        Promise.all(pa).then(function () {
                            resolve(styles);
                        });
                    }
                });
                return i;
            };
        /**
         * Adds the cluster layer to the map
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @return {?}
         */
        GoogleClusterService.prototype.AddLayer = /**
         * Adds the cluster layer to the map
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                var _this = this;
                /** @type {?} */
                var options = {
                    id: layer.Id,
                    visible: layer.Visible,
                    clusteringEnabled: layer.ClusteringEnabled,
                    zoomOnClick: layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster
                };
                if (layer.GridSize) {
                    options.gridSize = layer.GridSize;
                }
                if (layer.MinimumClusterSize) {
                    options.minimumClusterSize = layer.MinimumClusterSize;
                }
                if (layer.Styles) {
                    options.styles = layer.Styles;
                }
                if (layer.UseDynamicSizeMarkers) {
                    options.styles = null;
                    // do not to attempt to setup styles here as the dynamic call back will generate them.
                }
                else {
                    options.styles = [{
                            height: 30,
                            width: 35,
                            textColor: 'white',
                            textSize: 11,
                            backgroundPosition: 'center',
                            iconInfo: {
                                markerType: MarkerTypeId.FontMarker,
                                fontName: 'FontAwesome',
                                fontSize: 30,
                                color: 'green',
                                text: '\uF111'
                            }
                        }];
                }
                /** @type {?} */
                var dynamicClusterCallback = function (markers, numStyles, clusterer) {
                    /** @type {?} */
                    var styles = _this._layerStyles.get(layer.Id);
                    /** @type {?} */
                    var iconInfo = {
                        markerType: MarkerTypeId.None
                    };
                    /** @type {?} */
                    var icon = layer.CustomMarkerCallback(/** @type {?} */ (markers), iconInfo);
                    styles[0] = {
                        url: "\"data:image/svg+xml;utf8," + icon + "\"",
                        height: iconInfo.size.height,
                        width: iconInfo.size.width,
                        textColor: 'white',
                        textSize: 11,
                        backgroundPosition: 'center',
                    };
                    return {
                        text: markers.length.toString(),
                        index: 1
                    };
                };
                /** @type {?} */
                var resetStyles = function (clusterer) {
                    if (_this._layerStyles.has(layer.Id)) {
                        _this._layerStyles.get(layer.Id).splice(0);
                    }
                    else {
                        /** @type {?} */
                        var styles = new Array();
                        styles.push({});
                        _this._layerStyles.set(layer.Id, styles);
                        clusterer.setStyles(styles);
                        // this is important for dynamic styles as the pointer to this array gets passed
                        // around key objects in the clusterer. Therefore, it must be initialized here in order for
                        // updates to the styles to be visible.
                        // also, we need to add at least one style to prevent the default styles from being picked up.
                    }
                };
                /** @type {?} */
                var layerPromise = this._mapService.CreateClusterLayer(options);
                this._layers.set(layer.Id, layerPromise);
                layerPromise.then(function (l) {
                    /** @type {?} */
                    var clusterer = (l.NativePrimitve);
                    if (options.styles) {
                        /** @type {?} */
                        var s = GoogleClusterService.CreateClusterIcons(options.styles);
                        s.then(function (x) {
                            clusterer.setStyles(/** @type {?} */ (x));
                        });
                    }
                    else {
                        resetStyles(clusterer);
                        _this._mapService.MapPromise.then(function (m) {
                            m.addListener('zoom_changed', function () {
                                resetStyles(clusterer);
                            });
                        });
                        clusterer.setCalculator(function (m, n) {
                            return dynamicClusterCallback(m, n, clusterer);
                        });
                    }
                });
            };
        /**
         * Create a marker in the cluster
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @param {?} options
         * @return {?}
         */
        GoogleClusterService.prototype.CreateMarker = /**
         * Create a marker in the cluster
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @param {?} options
         * @return {?}
         */
            function (layer, options) {
                var _this = this;
                /** @type {?} */
                var p = this.GetLayerById(layer);
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    return _this._mapService.CreateMarker(options)
                        .then(function (marker) {
                        marker.IsFirst = options.isFirst;
                        marker.IsLast = options.isLast;
                        l.AddEntity(marker);
                        return marker;
                    });
                });
            };
        /**
         * Starts the clustering
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @return {?}
         */
        GoogleClusterService.prototype.StartClustering = /**
         * Starts the clustering
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                return Promise.resolve();
            };
        /**
         * Stops the clustering
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @return {?}
         */
        GoogleClusterService.prototype.StopClustering = /**
         * Stops the clustering
         *
         * \@memberof GoogleClusterService
         * @param {?} layer
         * @return {?}
         */
            function (layer) {
                return Promise.resolve();
            };
        /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
        GoogleClusterService.prototype.CreatePolygon = /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
            function (layer, options) {
                throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
            };
        /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
        GoogleClusterService.prototype.CreatePolygons = /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
            function (layer, options) {
                throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
            };
        /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the line.
         * @param {?} options - Polyline options defining the line.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
         * array of polygons for complex paths) model.
         *
         */
        GoogleClusterService.prototype.CreatePolyline = /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the line.
         * @param {?} options - Polyline options defining the line.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
         * array of polygons for complex paths) model.
         *
         */
            function (layer, options) {
                throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
            };
        /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
        GoogleClusterService.prototype.CreatePolylines = /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof GoogleClusterService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
            function (layer, options) {
                throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
            };
        GoogleClusterService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleClusterService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        return GoogleClusterService;
    }(GoogleLayerBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GoogleInfoBoxService = (function (_super) {
        __extends(GoogleInfoBoxService, _super);
        ///
        /// Constructors
        ///
        /**
         * Creates an instance of GoogleInfoBoxService.
         * @param _mapService
         * @param _markerService
         * @param _zone
         *
         * @memberof GoogleInfoBoxService
         */
        function GoogleInfoBoxService(_mapService, _markerService, _zone) {
            var _this = _super.call(this) || this;
            _this._mapService = _mapService;
            _this._markerService = _markerService;
            _this._zone = _zone;
            _this._boxes = new Map();
            return _this;
        }
        /**
         * Creates a new instance of an info window
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         *
         * @return {?}
         */
        GoogleInfoBoxService.prototype.AddInfoWindow = /**
         * Creates a new instance of an info window
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         *
         * @return {?}
         */
            function (info) {
                /** @type {?} */
                var options = {};
                if (info.HtmlContent !== '') {
                    options.htmlContent = info.HtmlContent;
                }
                else {
                    options.title = info.Title;
                    options.description = info.Description;
                }
                if (info.xOffset || info.yOffset) {
                    if (options.pixelOffset == null) {
                        options.pixelOffset = { x: 0, y: 0 };
                    }
                    if (info.xOffset) {
                        options.pixelOffset.x = info.xOffset;
                    }
                    if (info.yOffset) {
                        options.pixelOffset.y = info.yOffset;
                    }
                }
                options.disableAutoPan = info.DisableAutoPan;
                options.visible = info.Visible;
                if (typeof info.Latitude === 'number' && typeof info.Longitude === 'number') {
                    options.position = { latitude: info.Latitude, longitude: info.Longitude };
                }
                /** @type {?} */
                var infoWindowPromise = this._mapService.CreateInfoWindow(options);
                this._boxes.set(info, infoWindowPromise);
            };
        /**
         * Closes the info window
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @return {?} -  A promise that is resolved when the info box is closed.
         *
         */
        GoogleInfoBoxService.prototype.Close = /**
         * Closes the info window
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @return {?} -  A promise that is resolved when the info box is closed.
         *
         */
            function (info) {
                return this._boxes.get(info).then(function (w) {
                    w.Close();
                });
            };
        /**
         * Registers an event delegate for an info window.
         *
         * \@memberof GoogleInfoBoxService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
        GoogleInfoBoxService.prototype.CreateEventObservable = /**
         * Registers an event delegate for an info window.
         *
         * \@memberof GoogleInfoBoxService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
            function (eventName, infoComponent) {
                var _this = this;
                /** @type {?} */
                var googleEventName = GoogleMapEventsLookup[eventName];
                return rxjs.Observable.create(function (observer) {
                    _this._boxes.get(infoComponent).then(function (b) {
                        b.AddListener(googleEventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                    });
                });
            };
        /**
         * Deletes the info window
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         *
         * @return {?}
         */
        GoogleInfoBoxService.prototype.DeleteInfoWindow = /**
         * Deletes the info window
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         *
         * @return {?}
         */
            function (info) {
                return Promise.resolve();
            };
        /**
         * Opens the info window. Window opens on a marker, if supplied, or a specific location if given
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @param {?=} loc
         * @return {?}
         */
        GoogleInfoBoxService.prototype.Open = /**
         * Opens the info window. Window opens on a marker, if supplied, or a specific location if given
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @param {?=} loc
         * @return {?}
         */
            function (info, loc) {
                var _this = this;
                if (info.CloseInfoBoxesOnOpen || info.Modal) {
                    // close all open info boxes
                    this._boxes.forEach(function (box, i) {
                        if (info.Id !== i.Id) {
                            box.then(function (w) {
                                if (w.IsOpen) {
                                    w.Close();
                                    i.Close();
                                }
                            });
                        }
                    });
                }
                return this._boxes.get(info).then(function (w) {
                    /** @type {?} */
                    var options = {};
                    if (info.HtmlContent !== '') {
                        options.htmlContent = info.HtmlContent;
                    }
                    else {
                        options.title = info.Title;
                        options.description = info.Description;
                    }
                    w.SetOptions(options);
                    if (info.HostMarker != null) {
                        return _this._markerService.GetNativeMarker(info.HostMarker).then(function (marker) {
                            return _this._mapService.MapPromise.then(function (map) { return ((w)).Open(((marker)).NativePrimitve); });
                        });
                    }
                    return _this._mapService.MapPromise.then(function (map) {
                        if (loc) {
                            w.SetPosition(loc);
                        }
                        w.Open();
                    });
                });
            };
        /**
         * Sets the info window options
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @param {?} options
         *
         * @return {?}
         */
        GoogleInfoBoxService.prototype.SetOptions = /**
         * Sets the info window options
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @param {?} options
         *
         * @return {?}
         */
            function (info, options) {
                return this._boxes.get(info).then(function (w) {
                    w.SetOptions(options);
                });
            };
        /**
         * Sets the info window position
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @param {?} latlng
         *
         * @return {?}
         */
        GoogleInfoBoxService.prototype.SetPosition = /**
         * Sets the info window position
         *
         * \@memberof GoogleInfoBoxService
         * @param {?} info
         * @param {?} latlng
         *
         * @return {?}
         */
            function (info, latlng) {
                this._boxes.get(info).then(function (w) {
                    w.SetPosition(latlng);
                });
                return Promise.resolve();
            };
        GoogleInfoBoxService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleInfoBoxService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: MarkerService },
                { type: core.NgZone }
            ];
        };
        return GoogleInfoBoxService;
    }(InfoBoxService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of a layer for the Google Map Provider.
     *
     * @export
     */
    var /**
     * Concrete implementation of a layer for the Google Map Provider.
     *
     * @export
     */ GoogleLayer = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates a new instance of the GoogleMarkerClusterer class.
         *
         * @param _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
         * @param _maps MapService. MapService implementation to leverage for the layer.
         *
         * @memberof GoogleLayer
         */
        function GoogleLayer(_layer, _maps, _id) {
            this._layer = _layer;
            this._maps = _maps;
            this._id = _id;
            this._entities = new Array();
            this._visible = true;
        }
        Object.defineProperty(GoogleLayer.prototype, "NativePrimitve", {
            get: /**
             * Get the native primitive underneath the abstraction layer. Google does not have the concept of a custom layer,
             * so we are returning the Map as the native object because it hosts all the markers.
             *
             * \@memberof GoogleLayer
             * @return {?} GoogleMapTypes.GoogleMap.
             *
             */ function () {
                return this._layer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener for the layer.
         *
         * \@memberof GoogleLayer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
        GoogleLayer.prototype.AddListener = /**
         * Adds an event listener for the layer.
         *
         * \@memberof GoogleLayer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                throw (new Error('Events are not supported on Google Layers. You can still add events to individual markers.'));
            };
        /**
         * Adds an entity to the layer. Use this method with caution as it will
         * trigger a recaluation of the clusters (and associated markers if approprite) for
         * each invocation. If you use this method to add many markers to the cluster, use
         *
         * \@memberof GoogleLAyer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
         *
         * @return {?}
         */
        GoogleLayer.prototype.AddEntity = /**
         * Adds an entity to the layer. Use this method with caution as it will
         * trigger a recaluation of the clusters (and associated markers if approprite) for
         * each invocation. If you use this method to add many markers to the cluster, use
         *
         * \@memberof GoogleLAyer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
         *
         * @return {?}
         */
            function (entity) {
                if (entity.NativePrimitve) {
                    this._entities.push(entity);
                    entity.NativePrimitve.setVisible(this._visible);
                    entity.NativePrimitve.setMap(this.NativePrimitve);
                }
            };
        /**
         * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
         * as marker, infowindow, polyline, polygon, etc..)
         *
         * \@memberof GoogleLAyer
         * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
         *
         * @return {?}
         */
        GoogleLayer.prototype.AddEntities = /**
         * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
         * as marker, infowindow, polyline, polygon, etc..)
         *
         * \@memberof GoogleLAyer
         * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
         *
         * @return {?}
         */
            function (entities) {
                var _this = this;
                if (entities != null && Array.isArray(entities) && entities.length !== 0) {
                    (_a = this._entities).push.apply(_a, __spread(entities));
                    async.eachSeries(__spread(entities), function (e, next) {
                        e.NativePrimitve.setVisible(_this._visible);
                        e.NativePrimitve.setMap(_this.NativePrimitve);
                        async.nextTick(function () { return next(); });
                    });
                }
                var _a;
            };
        /**
         * Deletes the layer anbd the markers in it.
         *
         * \@memberof GoogleLayer
         * @return {?}
         */
        GoogleLayer.prototype.Delete = /**
         * Deletes the layer anbd the markers in it.
         *
         * \@memberof GoogleLayer
         * @return {?}
         */
            function () {
                async.eachSeries(this._entities.splice(0), function (e, next) {
                    e.NativePrimitve.setMap(null);
                    async.nextTick(function () { return next(); });
                });
            };
        /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof GoogleLayer
         * @return {?} ILayerOptions. The layer options.
         *
         */
        GoogleLayer.prototype.GetOptions = /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof GoogleLayer
         * @return {?} ILayerOptions. The layer options.
         *
         */
            function () {
                /** @type {?} */
                var options = {
                    id: this._id
                };
                return options;
            };
        /**
         * Returns the visibility state of the layer.
         *
         * \@memberof GoogleLayer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
        GoogleLayer.prototype.GetVisible = /**
         * Returns the visibility state of the layer.
         *
         * \@memberof GoogleLayer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
            function () {
                return this._visible;
            };
        /**
         * Removes an entity from the layer.
         *
         * \@memberof GoogleLayer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
         *
         * @return {?}
         */
        GoogleLayer.prototype.RemoveEntity = /**
         * Removes an entity from the layer.
         *
         * \@memberof GoogleLayer
         * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
         *
         * @return {?}
         */
            function (entity) {
                if (entity.NativePrimitve) {
                    /** @type {?} */
                    var j = this._entities.indexOf(entity);
                    if (j > -1) {
                        this._entities.splice(j, 1);
                    }
                    entity.NativePrimitve.setMap(null);
                }
            };
        /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof GoogleLayer
         * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
         * the entities to add to the cluster. This replaces any existing entities.
         *
         * @return {?}
         */
        GoogleLayer.prototype.SetEntities = /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof GoogleLayer
         * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
         * the entities to add to the cluster. This replaces any existing entities.
         *
         * @return {?}
         */
            function (entities) {
                this.Delete();
                this.AddEntities(entities);
            };
        /**
         * Sets the options for the cluster layer.
         *
         * \@memberof GoogleLayer
         * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
        GoogleLayer.prototype.SetOptions = /**
         * Sets the options for the cluster layer.
         *
         * \@memberof GoogleLayer
         * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
            function (options) {
                this._id = options.id;
            };
        /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
        GoogleLayer.prototype.SetVisible = /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
            function (visible) {
                async.eachSeries(__spread(this._entities), function (e, next) {
                    e.NativePrimitve.setVisible(visible);
                    async.nextTick(function () { return next(); });
                });
                this._visible = visible;
            };
        return GoogleLayer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Implements the {\@link LayerService} contract for a Google Maps specific implementation.
     *
     * @export
     */
    var GoogleLayerService = (function (_super) {
        __extends(GoogleLayerService, _super);
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of GoogleLayerService.
         * @param _mapService - Instance of the Google Maps Service. Will generally be injected.
         * @param _zone - NgZone instance to provide zone aware promises.
         *
         * @memberof GoogleLayerService
         */
        function GoogleLayerService(_mapService, _zone) {
            var _this = _super.call(this, _mapService, _zone) || this;
            _this._layers = new Map();
            return _this;
        }
        /**
         * Adds a layer to the map.
         *
         * @abstract
         * \@memberof GoogleLayerService
         * @param {?} layer - MapLayerDirective component object.
         * Generally, MapLayerDirective will be injected with an instance of the
         * LayerService and then self register on initialization.
         *
         * @return {?}
         */
        GoogleLayerService.prototype.AddLayer = /**
         * Adds a layer to the map.
         *
         * @abstract
         * \@memberof GoogleLayerService
         * @param {?} layer - MapLayerDirective component object.
         * Generally, MapLayerDirective will be injected with an instance of the
         * LayerService and then self register on initialization.
         *
         * @return {?}
         */
            function (layer) {
                var _this = this;
                /** @type {?} */
                var p = new Promise(function (resolve, reject) {
                    _this._mapService.MapPromise.then(function (m) {
                        /** @type {?} */
                        var l = new GoogleLayer(m, _this._mapService, layer.Id);
                        l.SetVisible(layer.Visible);
                        resolve(l);
                    });
                });
                this._layers.set(layer.Id, p);
            };
        /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
        GoogleLayerService.prototype.CreatePolygon = /**
         * Adds a polygon to the layer.
         *
         * @abstract
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygon.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
         *
         */
            function (layer, options) {
                /** @type {?} */
                var p = this._mapService.CreatePolygon(options);
                /** @type {?} */
                var l = this._layers.get(layer);
                Promise.all([p, l]).then(function (x) { return x[1].AddEntity(x[0]); });
                return p;
            };
        /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
        GoogleLayerService.prototype.CreatePolygons = /**
         * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
         * operations.
         *
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polygon.
         * @param {?} options - Polygon options defining the polygons.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
         *
         */
            function (layer, options) {
                /** @type {?} */
                var p = this.GetLayerById(layer);
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    /** @type {?} */
                    var polygons = new Promise(function (resolve, reject) {
                        /** @type {?} */
                        var polys = options.map(function (o) {
                            /** @type {?} */
                            var op = GoogleConversions.TranslatePolygonOptions(o);
                            /** @type {?} */
                            var poly = new google.maps.Polygon(op);
                            /** @type {?} */
                            var polygon = new GooglePolygon(poly);
                            if (o.title && o.title !== '') {
                                polygon.Title = o.title;
                            }
                            if (o.metadata) {
                                o.metadata.forEach(function (val, key) { return polygon.Metadata.set(key, val); });
                            }
                            return polygon;
                        });
                        resolve(polys);
                    });
                    return polygons;
                });
            };
        /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polyline.
         * @param {?} options - Polyline options defining the polyline.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
         * of polygons for complex paths) model.
         *
         */
        GoogleLayerService.prototype.CreatePolyline = /**
         * Adds a polyline to the layer.
         *
         * @abstract
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polyline.
         * @param {?} options - Polyline options defining the polyline.
         * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
         * of polygons for complex paths) model.
         *
         */
            function (layer, options) {
                /** @type {?} */
                var p = this._mapService.CreatePolyline(options);
                /** @type {?} */
                var l = this._layers.get(layer);
                Promise.all([p, l]).then(function (x) {
                    /** @type {?} */
                    var p1 = Array.isArray(x[0]) ? /** @type {?} */ (x[0]) : [/** @type {?} */ (x[0])];
                    try {
                        for (var p1_1 = __values(p1), p1_1_1 = p1_1.next(); !p1_1_1.done; p1_1_1 = p1_1.next()) {
                            var p2 = p1_1_1.value;
                            x[1].AddEntity(p2);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (p1_1_1 && !p1_1_1.done && (_a = p1_1.return))
                                _a.call(p1_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                    var e_1, _a;
                });
                return p;
            };
        /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
        GoogleLayerService.prototype.CreatePolylines = /**
         * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
         * operations.
         *
         * \@memberof GoogleLayerService
         * @param {?} layer - The id of the layer to which to add the polylines.
         * @param {?} options - Polyline options defining the polylines.
         * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
         *
         */
            function (layer, options) {
                /** @type {?} */
                var p = this.GetLayerById(layer);
                if (p == null) {
                    throw (new Error("Layer with id " + layer + " not found in Layer Map"));
                }
                return p.then(function (l) {
                    /** @type {?} */
                    var polylines = new Promise(function (resolve, reject) {
                        /** @type {?} */
                        var polys = options.map(function (o) {
                            /** @type {?} */
                            var op = GoogleConversions.TranslatePolylineOptions(o);
                            if (o.path && o.path.length > 0 && !Array.isArray(o.path[0])) {
                                op.path = GoogleConversions.TranslatePaths(o.path)[0];
                                /** @type {?} */
                                var poly = new google.maps.Polyline(op);
                                /** @type {?} */
                                var polyline_1 = new GooglePolyline(poly);
                                if (o.title && o.title !== '') {
                                    polyline_1.Title = o.title;
                                }
                                if (o.metadata) {
                                    o.metadata.forEach(function (v, k) { return polyline_1.Metadata.set(k, v); });
                                }
                                return polyline_1;
                            }
                            else {
                                /** @type {?} */
                                var paths = GoogleConversions.TranslatePaths(o.path);
                                /** @type {?} */
                                var lines_1 = new Array();
                                paths.forEach(function (x) {
                                    op.path = x;
                                    /** @type {?} */
                                    var poly = new google.maps.Polyline(op);
                                    /** @type {?} */
                                    var polyline = new GooglePolyline(poly);
                                    if (o.metadata) {
                                        o.metadata.forEach(function (v, k) { return polyline.Metadata.set(k, v); });
                                    }
                                    if (o.title && o.title !== '') {
                                        polyline.Title = o.title;
                                    }
                                    lines_1.push(polyline);
                                });
                                return lines_1;
                            }
                        });
                        resolve(polys);
                    });
                    return polylines;
                });
            };
        GoogleLayerService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleLayerService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        return GoogleLayerService;
    }(GoogleLayerBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ScriptProtocol$1 = {
        HTTP: 0,
        HTTPS: 1,
        AUTO: 2,
    };
    ScriptProtocol$1[ScriptProtocol$1.HTTP] = 'HTTP';
    ScriptProtocol$1[ScriptProtocol$1.HTTPS] = 'HTTPS';
    ScriptProtocol$1[ScriptProtocol$1.AUTO] = 'AUTO';
    /**
     * Bing Maps V8 specific loader configuration to be used with the {\@link GoogleMapAPILoader}
     *
     * @export
     */
    var GoogleMapAPILoaderConfig = (function () {
        function GoogleMapAPILoaderConfig() {
        }
        GoogleMapAPILoaderConfig.decorators = [
            { type: core.Injectable },
        ];
        return GoogleMapAPILoaderConfig;
    }());
    /** *
     * Default loader configuration.
      @type {?} */
    var DEFAULT_CONFIGURATION$1 = new GoogleMapAPILoaderConfig();
    /**
     * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
     *
     * @export
     */
    var GoogleMapAPILoader = (function (_super) {
        __extends(GoogleMapAPILoader, _super);
        /**
         * Creates an instance of GoogleMapAPILoader.
         * @param _config - The loader configuration.
         * @param _windowRef - An instance of {@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
         * @param _documentRef - An instance of {@link DocumentRef}.
         *                                     Necessary because Bing Map V8 interacts with the document object.
         * @memberof GoogleMapAPILoader
         */
        function GoogleMapAPILoader(_config, _windowRef, _documentRef) {
            var _this = _super.call(this) || this;
            _this._config = _config;
            _this._windowRef = _windowRef;
            _this._documentRef = _documentRef;
            if (_this._config === null || _this._config === undefined) {
                _this._config = DEFAULT_CONFIGURATION$1;
            }
            return _this;
        }
        Object.defineProperty(GoogleMapAPILoader.prototype, "Config", {
            get: /**
             * Gets the loader configuration.
             *
             * \@readonly
             * \@memberof GoogleMapAPILoader
             * @return {?}
             */ function () { return this._config; },
            enumerable: true,
            configurable: true
        });
        /**
         * Loads the necessary resources for Bing Maps V8.
         *
         * \@memberof GoogleMapAPILoader
         * @return {?}
         */
        GoogleMapAPILoader.prototype.Load = /**
         * Loads the necessary resources for Bing Maps V8.
         *
         * \@memberof GoogleMapAPILoader
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._scriptLoadingPromise) {
                    return this._scriptLoadingPromise;
                }
                /** @type {?} */
                var script = this._documentRef.GetNativeDocument().createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.defer = true;
                /** @type {?} */
                var callbackName = "Create";
                script.src = this.GetMapsScriptSrc(callbackName);
                this._scriptLoadingPromise = new Promise(function (resolve, reject) {
                    ((_this._windowRef.GetNativeWindow()))[callbackName] = function () {
                        if (_this._config.enableClustering) {
                            /** @type {?} */
                            var clusterScript = _this._documentRef.GetNativeDocument().createElement('script');
                            clusterScript.type = 'text/javascript';
                            clusterScript.src = _this.GetClusterScriptSrc();
                            clusterScript.onload = clusterScript.onreadystatechange = function () {
                                resolve();
                            };
                            _this._documentRef.GetNativeDocument().head.appendChild(clusterScript);
                        }
                        else {
                            resolve();
                        }
                    };
                    script.onerror = function (error) { reject(error); };
                });
                this._documentRef.GetNativeDocument().head.appendChild(script);
                return this._scriptLoadingPromise;
            };
        /**
         * Gets the Google Maps scripts url for injections into the header.
         *
         * \@memberof GoogleMapAPILoader
         * @param {?} callbackName - Name of the function to be called when the Google Maps scripts are loaded.
         * @return {?} - The url to be used to load the Google Map scripts.
         *
         */
        GoogleMapAPILoader.prototype.GetMapsScriptSrc = /**
         * Gets the Google Maps scripts url for injections into the header.
         *
         * \@memberof GoogleMapAPILoader
         * @param {?} callbackName - Name of the function to be called when the Google Maps scripts are loaded.
         * @return {?} - The url to be used to load the Google Map scripts.
         *
         */
            function (callbackName) {
                /** @type {?} */
                var hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
                /** @type {?} */
                var queryParams = {
                    v: this._config.apiVersion,
                    callback: callbackName,
                    key: this._config.apiKey,
                    client: this._config.clientId,
                    channel: this._config.channel,
                    libraries: this._config.libraries,
                    region: this._config.region,
                    language: this._config.language
                };
                return this.GetScriptSrc(hostAndPath, queryParams);
            };
        /**
         * Gets the Google Maps Cluster library url for injections into the header.
         *
         * \@memberof GoogleMapAPILoader
         * @return {?} - The url to be used to load the Google Map Cluster library.
         *
         */
        GoogleMapAPILoader.prototype.GetClusterScriptSrc = /**
         * Gets the Google Maps Cluster library url for injections into the header.
         *
         * \@memberof GoogleMapAPILoader
         * @return {?} - The url to be used to load the Google Map Cluster library.
         *
         */
            function () {
                /** @type {?} */
                var hostAndPath = this._config.clusterHostAndPath ||
                    'developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
                return this.GetScriptSrc(hostAndPath, {});
            };
        /**
         * Gets a scripts url for injections into the header.
         *
         * \@memberof GoogleMapAPILoader
         * @param {?} hostAndPath - Host and path name of the script to load.
         * @param {?} queryParams - Url query parameters.
         * @return {?} - The url with correct protocol, path, and query parameters.
         *
         */
        GoogleMapAPILoader.prototype.GetScriptSrc = /**
         * Gets a scripts url for injections into the header.
         *
         * \@memberof GoogleMapAPILoader
         * @param {?} hostAndPath - Host and path name of the script to load.
         * @param {?} queryParams - Url query parameters.
         * @return {?} - The url with correct protocol, path, and query parameters.
         *
         */
            function (hostAndPath, queryParams) {
                /** @type {?} */
                var protocolType = (((this._config && this._config.protocol) || ScriptProtocol$1.HTTPS));
                /** @type {?} */
                var protocol;
                switch (protocolType) {
                    case ScriptProtocol$1.AUTO:
                        protocol = '';
                        break;
                    case ScriptProtocol$1.HTTP:
                        protocol = 'http:';
                        break;
                    case ScriptProtocol$1.HTTPS:
                        protocol = 'https:';
                        break;
                }
                /** @type {?} */
                var params = Object.keys(queryParams)
                    .filter(function (k) { return queryParams[k] != null; })
                    .filter(function (k) {
                    // remove empty arrays
                    return !Array.isArray(queryParams[k]) ||
                        (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
                })
                    .map(function (k) {
                    /** @type {?} */
                    var i = queryParams[k];
                    if (Array.isArray(i)) {
                        return { key: k, value: i.join(',') };
                    }
                    return { key: k, value: queryParams[k] };
                })
                    .map(function (entry) { return entry.key + "=" + entry.value; })
                    .join('&');
                return protocol + "//" + hostAndPath + "?" + params;
            };
        GoogleMapAPILoader.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleMapAPILoader.ctorParameters = function () {
            return [
                { type: GoogleMapAPILoaderConfig, decorators: [{ type: core.Optional }] },
                { type: WindowRef },
                { type: DocumentRef }
            ];
        };
        return GoogleMapAPILoader;
    }(MapAPILoader));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the MarkerService abstract class for Google.
     *
     * @export
     */
    var GoogleMarkerService = (function () {
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
                return rxjs.Observable.create(function (observer) {
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
                return this._markers.get(marker).then(function (m) {
                    return m.SetPosition({
                        latitude: marker.Latitude,
                        longitude: marker.Longitude
                    });
                });
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleMarkerService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: LayerService },
                { type: ClusterService },
                { type: core.NgZone }
            ];
        };
        return GoogleMarkerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of a clustering layer for the Google Map Provider.
     *
     * @export
     */
    var /**
     * Concrete implementation of a clustering layer for the Google Map Provider.
     *
     * @export
     */ GoogleMarkerClusterer = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates a new instance of the GoogleMarkerClusterer class.
         *
         * @param _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
         * @param _maps MapService. MapService implementation to leverage for the layer.
         *
         * @memberof GoogleMarkerClusterer
         */
        function GoogleMarkerClusterer(_layer) {
            this._layer = _layer;
            this._isClustering = true;
            this._markerLookup = new Map();
            this._markers = new Array();
            this._pendingMarkers = new Array();
            this._mapclicks = 0;
            this._currentZoom = 0;
            this._visible = true;
        }
        Object.defineProperty(GoogleMarkerClusterer.prototype, "NativePrimitve", {
            get: /**
             * Get the native primitive underneath the abstraction layer.
             *
             * \@memberof GoogleMarkerClusterer
             * @return {?} GoogleMapTypes.MarkerClusterer.
             *
             */ function () {
                return this._layer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds an event listener for the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.AddListener = /**
         * Adds an event listener for the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
         * layer supports.
         * @param {?} fn function. Handler to call when the event occurs.
         *
         * @return {?}
         */
            function (eventType, fn) {
                throw (new Error('Events are not supported on Google Cluster Layers. You can still add events to individual markers.'));
            };
        /**
         * Adds an entity to the layer. Use this method with caution as it will
         * trigger a recaluation of the clusters (and associated markers if approprite) for
         * each invocation. If you use this method to add many markers to the cluster, use
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entity Marker. Entity to add to the layer.
         *
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.AddEntity = /**
         * Adds an entity to the layer. Use this method with caution as it will
         * trigger a recaluation of the clusters (and associated markers if approprite) for
         * each invocation. If you use this method to add many markers to the cluster, use
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entity Marker. Entity to add to the layer.
         *
         * @return {?}
         */
            function (entity) {
                /** @type {?} */
                var isMarker = entity instanceof Marker;
                isMarker = entity instanceof GoogleMarker || isMarker;
                if (isMarker) {
                    entity.NativePrimitve.setMap(null);
                    // remove the marker from the map as the clusterer will control marker visibility.
                    if (entity.IsFirst) {
                        this.StopClustering();
                    }
                }
                if (entity.NativePrimitve && entity.Location) {
                    if (this._isClustering && this._visible) {
                        this._layer.addMarker(entity.NativePrimitve);
                        this._markers.push(entity);
                    }
                    else {
                        this._pendingMarkers.push(entity);
                    }
                    this._markerLookup.set(entity.NativePrimitve, entity);
                }
                if (isMarker) {
                    if (entity.IsLast) {
                        this.StartClustering();
                    }
                }
            };
        /**
         * Adds a number of markers to the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entities Array<Marker>. Entities to add to the layer.
         *
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.AddEntities = /**
         * Adds a number of markers to the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entities Array<Marker>. Entities to add to the layer.
         *
         * @return {?}
         */
            function (entities) {
                var _this = this;
                if (entities != null && Array.isArray(entities) && entities.length !== 0) {
                    /** @type {?} */
                    var e = entities.map(function (p) {
                        _this._markerLookup.set(p.NativePrimitve, p);
                        p.NativePrimitve.setMap(null);
                        // remove the marker from the map as the clusterer will control marker visibility.
                        return p.NativePrimitve;
                    });
                    if (this._isClustering && this._visible) {
                        this._layer.addMarkers(e);
                        (_a = this._markers).push.apply(_a, __spread(entities));
                    }
                    else {
                        // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                        // will render the markers appropriately
                        // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                        // will render the markers appropriately
                        (_b = this._pendingMarkers).push.apply(_b, __spread(entities));
                    }
                }
                var _a, _b;
            };
        /**
         * Deletes the clustering layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.Delete = /**
         * Deletes the clustering layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?}
         */
            function () {
                this._layer.getMarkers().forEach(function (m) {
                    m.setMap(null);
                    // remove the marker from the map as the clusterer will control marker visibility.
                });
                this._layer.clearMarkers();
                this._markers.splice(0);
                this._pendingMarkers.splice(0);
            };
        /**
         * Returns the abstract marker used to wrap the Google Marker.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} pin
         * @return {?} Marker. The abstract marker object representing the pushpin.
         *
         */
        GoogleMarkerClusterer.prototype.GetMarkerFromGoogleMarker = /**
         * Returns the abstract marker used to wrap the Google Marker.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} pin
         * @return {?} Marker. The abstract marker object representing the pushpin.
         *
         */
            function (pin) {
                /** @type {?} */
                var m = this._markerLookup.get(pin);
                return m;
            };
        /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?} IClusterOptions. The layer options.
         *
         */
        GoogleMarkerClusterer.prototype.GetOptions = /**
         * Returns the options governing the behavior of the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?} IClusterOptions. The layer options.
         *
         */
            function () {
                /** @type {?} */
                var options = {
                    id: 0,
                    gridSize: this._layer.getGridSize(),
                    clusteringEnabled: this._layer.getGridSize() === 0,
                    maxZoom: this._layer.getMaxZoom(),
                    minimumClusterSize: this._layer.getMinClusterSize(),
                    placementMode: this._layer.isAverageCenter() ? ClusterPlacementMode.MeanValue : ClusterPlacementMode.FirstPin,
                    visible: this._visible,
                    zoomOnClick: this._layer.isZoomOnClick(),
                    styles: this._layer.getStyles()
                };
                return options;
            };
        /**
         * Returns the visibility state of the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
        GoogleMarkerClusterer.prototype.GetVisible = /**
         * Returns the visibility state of the layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?} Boolean. True is the layer is visible, false otherwise.
         *
         */
            function () {
                return this._visible;
            };
        /**
         * Removes an entity from the cluster layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entity Marker Entity to be removed from the layer.
         *
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.RemoveEntity = /**
         * Removes an entity from the cluster layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entity Marker Entity to be removed from the layer.
         *
         * @return {?}
         */
            function (entity) {
                if (entity.NativePrimitve && entity.Location) {
                    /** @type {?} */
                    var j = this._markers.indexOf(entity);
                    /** @type {?} */
                    var k = this._pendingMarkers.indexOf(entity);
                    if (j > -1) {
                        this._markers.splice(j, 1);
                    }
                    if (k > -1) {
                        this._pendingMarkers.splice(k, 1);
                    }
                    if (this._isClustering) {
                        this._layer.removeMarker(entity.NativePrimitve);
                    }
                    this._markerLookup.delete(entity.NativePrimitve);
                }
            };
        /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entities Array<Marker> containing
         * the entities to add to the cluster. This replaces any existing entities.
         *
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.SetEntities = /**
         * Sets the entities for the cluster layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} entities Array<Marker> containing
         * the entities to add to the cluster. This replaces any existing entities.
         *
         * @return {?}
         */
            function (entities) {
                var _this = this;
                this._layer.getMarkers().forEach(function (m) {
                    m.setMap(null);
                });
                this._layer.clearMarkers();
                this._markers.splice(0);
                this._pendingMarkers.splice(0);
                this._markerLookup.clear();
                /** @type {?} */
                var p = new Array();
                entities.forEach(function (e) {
                    if (e.NativePrimitve && e.Location) {
                        e.NativePrimitve.setMap(null);
                        _this._markerLookup.set(e.NativePrimitve, e);
                        if (_this._visible) {
                            _this._markers.push(e);
                            p.push(e.NativePrimitve);
                        }
                        else {
                            _this._pendingMarkers.push(e);
                        }
                    }
                });
                this._layer.addMarkers(p);
            };
        /**
         * Sets the options for the cluster layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.SetOptions = /**
         * Sets the options for the cluster layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
         * are merged with the default/existing options.
         *
         * @return {?}
         */
            function (options) {
                if (options.placementMode != null) {
                    throw (new Error('GoogleMarkerClusterer: PlacementMode option cannot be set after initial creation.'));
                }
                if (options.zoomOnClick != null) {
                    throw (new Error('GoogleMarkerClusterer: ZoomOnClick option cannot be set after initial creation.'));
                }
                if (options.callback != null) ;
                if (options.clusteringEnabled != null) {
                    this._layer.setMinClusterSize(options.clusteringEnabled ? 1 : 10000000);
                    this._layer.resetViewport();
                    this._layer.redraw();
                }
                if (options.gridSize != null && (options.clusteringEnabled == null || options.clusteringEnabled)) {
                    this._layer.setGridSize(options.gridSize);
                    this._layer.resetViewport();
                    this._layer.redraw();
                }
                if (options.maxZoom != null) {
                    this._layer.setMaxZoom(options.maxZoom);
                }
                if (options.minimumClusterSize != null) {
                    this._layer.setMinClusterSize(options.minimumClusterSize);
                }
                if (options.styles != null) {
                    this._layer.setStyles(options.styles);
                }
                if (options.visible != null) {
                    this.SetVisible(options.visible);
                }
            };
        /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.SetVisible = /**
         * Toggles the cluster layer visibility.
         *
         * \@memberof GoogleMarkerClusterer
         * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
         *
         * @return {?}
         */
            function (visible) {
                /** @type {?} */
                var map = visible ? this._layer.getMap() : null;
                if (!visible) {
                    this._layer.resetViewport(true);
                }
                else {
                    /** @type {?} */
                    var p_1 = new Array();
                    if (this._pendingMarkers.length > 0) {
                        this._pendingMarkers.forEach(function (e) {
                            if (e.NativePrimitve && e.Location) {
                                p_1.push(/** @type {?} */ (e.NativePrimitve));
                            }
                        });
                        this._layer.addMarkers(p_1);
                        this._markers = this._markers.concat(this._pendingMarkers.splice(0));
                    }
                    else {
                        this._layer.redraw();
                    }
                }
                this._visible = visible;
            };
        /**
         * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
         * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?}
         */
        GoogleMarkerClusterer.prototype.StartClustering = /**
         * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
         * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._isClustering) {
                    return;
                }
                if (this._visible) {
                    /** @type {?} */
                    var p_2 = new Array();
                    this._markers.forEach(function (e) {
                        if (e.NativePrimitve && e.Location) {
                            p_2.push(/** @type {?} */ (e.NativePrimitve));
                        }
                    });
                    this._pendingMarkers.forEach(function (e) {
                        if (e.NativePrimitve && e.Location) {
                            p_2.push(/** @type {?} */ (e.NativePrimitve));
                        }
                    });
                    this._layer.addMarkers(p_2);
                    this._markers = this._markers.concat(this._pendingMarkers.splice(0));
                }
                if (!this._visible) {
                    // only add the markers if the layer is visible. Otherwise, keep them pending. They would be added once the
                    // layer is set to visible.
                    rxjs.timer(0).subscribe(function () {
                        _this._layer.resetViewport(true);
                    });
                }
                this._isClustering = true;
            };
        /**
         * Stop to actually cluster the entities in a cluster layer.
         * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?}
         *
         */
        GoogleMarkerClusterer.prototype.StopClustering = /**
         * Stop to actually cluster the entities in a cluster layer.
         * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
         * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
         * complete to recalculate the clusters.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?}
         *
         */
            function () {
                if (!this._isClustering) {
                    return;
                }
                this._isClustering = false;
            };
        return GoogleMarkerClusterer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the MapService abstract implementing a Google Maps provider
     *
     * @export
     */
    var GoogleMapService = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of GoogleMapService.
         * @param _loader MapAPILoader instance implemented for Google Maps. This instance will generally be injected.
         * @param _zone NgZone object to enable zone aware promises. This will generally be injected.
         *
         * @memberof GoogleMapService
         */
        function GoogleMapService(_loader, _zone) {
            var _this = this;
            this._loader = _loader;
            this._zone = _zone;
            this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
            this._config = ((this._loader)).Config;
        }
        Object.defineProperty(GoogleMapService.prototype, "MapInstance", {
            get: /**
             * Gets the Google Map control instance underlying the implementation
             *
             * \@readonly
             * \@memberof GoogleMapService
             * @return {?}
             */ function () { return this._mapInstance; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleMapService.prototype, "MapPromise", {
            get: /**
             * Gets a Promise for a Google Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
             * are not sure if and when the instance will be created.
             * \@readonly
             * \@memberof GoogleMapService
             * @return {?}
             */ function () { return this._map; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleMapService.prototype, "MapSize", {
            get: /**
             * Gets the maps physical size.
             *
             * \@readonly
             * @abstract
             * \@memberof BingMapService
             * @return {?}
             */ function () {
                if (this.MapInstance) {
                    /** @type {?} */
                    var el = this.MapInstance.getDiv();
                    /** @type {?} */
                    var s = { width: el.offsetWidth, height: el.offsetHeight };
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
         * \@memberof GoogleMapService
         * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
         * rendered for the current map view.
         * @return {?} - Promise of a {\@link CanvasOverlay} object.
         */
        GoogleMapService.prototype.CreateCanvasOverlay = /**
         * Creates a canvas overlay layer to perform custom drawing over the map with out
         * some of the overhead associated with going through the Map objects.
         * \@memberof GoogleMapService
         * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
         * rendered for the current map view.
         * @return {?} - Promise of a {\@link CanvasOverlay} object.
         */
            function (drawCallback) {
                return this._map.then(function (map) {
                    /** @type {?} */
                    var overlay = new GoogleCanvasOverlay(drawCallback);
                    overlay.SetMap(map);
                    return overlay;
                });
            };
        /**
         * @param {?} options
         * @return {?}
         */
        GoogleMapService.prototype.CreateClusterLayer = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                return this._map.then(function (map) {
                    /** @type {?} */
                    var updateOptions = false;
                    /** @type {?} */
                    var markerClusterer = new MarkerClusterer(map, [], options);
                    /** @type {?} */
                    var clusterLayer = new GoogleMarkerClusterer(markerClusterer);
                    /** @type {?} */
                    var o = {
                        id: options.id
                    };
                    if (!options.visible) {
                        o.visible = false;
                        updateOptions = true;
                    }
                    if (!options.clusteringEnabled) {
                        o.clusteringEnabled = false;
                        updateOptions = true;
                    }
                    if (updateOptions) {
                        clusterLayer.SetOptions(o);
                    }
                    return clusterLayer;
                });
            };
        /**
         * Creates an information window for a map position
         *
         * \@memberof GoogleMapService
         * @param {?=} options
         * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
         *
         */
        GoogleMapService.prototype.CreateInfoWindow = /**
         * Creates an information window for a map position
         *
         * \@memberof GoogleMapService
         * @param {?=} options
         * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
         *
         */
            function (options) {
                var _this = this;
                return this._map.then(function (map) {
                    /** @type {?} */
                    var o = GoogleConversions.TranslateInfoWindowOptions(options);
                    /** @type {?} */
                    var infoWindow = new google.maps.InfoWindow(o);
                    return new GoogleInfoWindow(infoWindow, _this);
                });
            };
        /**
         * Creates a map layer within the map context
         *
         * \@memberof GoogleMapService
         * @param {?} options - Options for the layer. See {\@link ILayerOptions}
         * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
         *
         */
        GoogleMapService.prototype.CreateLayer = /**
         * Creates a map layer within the map context
         *
         * \@memberof GoogleMapService
         * @param {?} options - Options for the layer. See {\@link ILayerOptions}
         * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
         *
         */
            function (options) {
                var _this = this;
                return this._map.then(function (map) {
                    return new GoogleLayer(map, _this, options.id);
                });
            };
        /**
         * Creates a map instance
         *
         * \@memberof GoogleMapService
         * @param {?} el - HTML element to host the map.
         * @param {?} mapOptions - Map options
         * @return {?} - Promise fullfilled once the map has been created.
         *
         */
        GoogleMapService.prototype.CreateMap = /**
         * Creates a map instance
         *
         * \@memberof GoogleMapService
         * @param {?} el - HTML element to host the map.
         * @param {?} mapOptions - Map options
         * @return {?} - Promise fullfilled once the map has been created.
         *
         */
            function (el, mapOptions) {
                var _this = this;
                return this._loader.Load().then(function () {
                    // apply mixins
                    MixinMapLabelWithOverlayView$1();
                    MixinCanvasOverlay$1();
                    // execute map startup
                    if (!mapOptions.mapTypeId == null) {
                        mapOptions.mapTypeId = MapTypeId.hybrid;
                    }
                    if (_this._mapInstance != null) {
                        _this.DisposeMap();
                    }
                    /** @type {?} */
                    var o = GoogleConversions.TranslateOptions(mapOptions);
                    /** @type {?} */
                    var map = new google.maps.Map(el, o);
                    if (mapOptions.bounds) {
                        map.fitBounds(GoogleConversions.TranslateBounds(mapOptions.bounds));
                    }
                    _this._mapInstance = map;
                    _this._mapResolver(map);
                    return;
                });
            };
        /**
         * Creates a Google map marker within the map context
         *
         * \@memberof GoogleMapService
         * @param {?=} options
         * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
         *
         */
        GoogleMapService.prototype.CreateMarker = /**
         * Creates a Google map marker within the map context
         *
         * \@memberof GoogleMapService
         * @param {?=} options
         * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
         *
         */
            function (options) {
                if (options === void 0) {
                    options = /** @type {?} */ ({});
                }
                /** @type {?} */
                var payload = function (x, map) {
                    /** @type {?} */
                    var marker = new google.maps.Marker(x);
                    /** @type {?} */
                    var m = new GoogleMarker(marker);
                    m.IsFirst = options.isFirst;
                    m.IsLast = options.isLast;
                    if (options.metadata) {
                        options.metadata.forEach(function (val, key) { return m.Metadata.set(key, val); });
                    }
                    marker.setMap(map);
                    return m;
                };
                return this._map.then(function (map) {
                    /** @type {?} */
                    var o = GoogleConversions.TranslateMarkerOptions(options);
                    if (options.iconInfo && options.iconInfo.markerType) {
                        /** @type {?} */
                        var s = Marker.CreateMarker(options.iconInfo);
                        if (typeof (s) === 'string') {
                            o.icon = s;
                            return payload(o, map);
                        }
                        else {
                            return s.then(function (x) {
                                o.icon = x.icon;
                                return payload(o, map);
                            });
                        }
                    }
                    else {
                        return payload(o, map);
                    }
                });
            };
        /**
         * Creates a polygon within the Google Map map context
         *
         * @abstract
         * \@memberof MapService
         * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
         * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
         *
         */
        GoogleMapService.prototype.CreatePolygon = /**
         * Creates a polygon within the Google Map map context
         *
         * @abstract
         * \@memberof MapService
         * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
         * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
         *
         */
            function (options) {
                return this._map.then(function (map) {
                    /** @type {?} */
                    var o = GoogleConversions.TranslatePolygonOptions(options);
                    /** @type {?} */
                    var polygon = new google.maps.Polygon(o);
                    polygon.setMap(map);
                    /** @type {?} */
                    var p = new GooglePolygon(polygon);
                    if (options.metadata) {
                        options.metadata.forEach(function (val, key) { return p.Metadata.set(key, val); });
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
                    return p;
                });
            };
        /**
         * Creates a polyline within the Google Map map context
         *
         * @abstract
         * \@memberof MapService
         * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
         * @return {?} - Promise of a {\@link Polyline} object (or an array therefore for complex paths)
         * which models the underlying native polyline.
         *
         */
        GoogleMapService.prototype.CreatePolyline = /**
         * Creates a polyline within the Google Map map context
         *
         * @abstract
         * \@memberof MapService
         * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
         * @return {?} - Promise of a {\@link Polyline} object (or an array therefore for complex paths)
         * which models the underlying native polyline.
         *
         */
            function (options) {
                /** @type {?} */
                var polyline;
                return this._map.then(function (map) {
                    /** @type {?} */
                    var o = GoogleConversions.TranslatePolylineOptions(options);
                    if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                        o.path = GoogleConversions.TranslatePaths(options.path)[0];
                        polyline = new google.maps.Polyline(o);
                        polyline.setMap(map);
                        /** @type {?} */
                        var pl_1 = new GooglePolyline(polyline);
                        if (options.metadata) {
                            options.metadata.forEach(function (val, key) { return pl_1.Metadata.set(key, val); });
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
                        var paths = GoogleConversions.TranslatePaths(options.path);
                        /** @type {?} */
                        var lines_1 = new Array();
                        paths.forEach(function (p) {
                            o.path = p;
                            polyline = new google.maps.Polyline(o);
                            polyline.setMap(map);
                            /** @type {?} */
                            var pl = new GooglePolyline(polyline);
                            if (options.metadata) {
                                options.metadata.forEach(function (val, key) { return pl.Metadata.set(key, val); });
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
         * \@memberof GoogleMapService
         * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
         * @return {?} - Promise fullfilled when the layer has been removed.
         *
         */
        GoogleMapService.prototype.DeleteLayer = /**
         * Deletes a layer from the map.
         *
         * \@memberof GoogleMapService
         * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
         * @return {?} - Promise fullfilled when the layer has been removed.
         *
         */
            function (layer) {
                // return resolved promise as there is no conept of a custom layer in Google.
                return Promise.resolve();
            };
        /**
         * Dispaose the map and associated resoures.
         *
         * \@memberof GoogleMapService
         * @return {?}
         */
        GoogleMapService.prototype.DisposeMap = /**
         * Dispaose the map and associated resoures.
         *
         * \@memberof GoogleMapService
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._map == null && this._mapInstance == null) {
                    return;
                }
                if (this._mapInstance != null) {
                    this._mapInstance = null;
                    this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
                }
            };
        /**
         * Gets the geo coordinates of the map center
         *
         * \@memberof GoogleMapService
         * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
         *
         */
        GoogleMapService.prototype.GetCenter = /**
         * Gets the geo coordinates of the map center
         *
         * \@memberof GoogleMapService
         * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
         *
         */
            function () {
                return this._map.then(function (map) {
                    /** @type {?} */
                    var center = map.getCenter();
                    return /** @type {?} */ ({
                        latitude: center.lat(),
                        longitude: center.lng()
                    });
                });
            };
        /**
         * Gets the geo coordinates of the map bounding box
         *
         * \@memberof GoogleMapService
         * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
         *
         */
        GoogleMapService.prototype.GetBounds = /**
         * Gets the geo coordinates of the map bounding box
         *
         * \@memberof GoogleMapService
         * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
         *
         */
            function () {
                return this._map.then(function (map) {
                    /** @type {?} */
                    var box = map.getBounds();
                    return /** @type {?} */ ({
                        maxLatitude: box.getNorthEast().lat(),
                        maxLongitude: Math.max(box.getNorthEast().lng(), box.getSouthWest().lng()),
                        minLatitude: box.getSouthWest().lat(),
                        minLongitude: Math.min(box.getNorthEast().lng(), box.getSouthWest().lng()),
                        center: { latitude: box.getCenter().lat(), longitude: box.getCenter().lng() },
                        padding: 0
                    });
                });
            };
        /**
         * Gets the current zoom level of the map.
         *
         * \@memberof GoogleMapService
         * @return {?} - A promise that when fullfilled contains the zoom level.
         *
         */
        GoogleMapService.prototype.GetZoom = /**
         * Gets the current zoom level of the map.
         *
         * \@memberof GoogleMapService
         * @return {?} - A promise that when fullfilled contains the zoom level.
         *
         */
            function () {
                return this._map.then(function (map) { return map.getZoom(); });
            };
        /**
         * Provides a conversion of geo coordinates to pixels on the map control.
         *
         * \@memberof GoogleMapService
         * @param {?} loc - The geo coordinates to translate.
         * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
         * if the goe coordinates are not in the view port.
         *
         */
        GoogleMapService.prototype.LocationToPoint = /**
         * Provides a conversion of geo coordinates to pixels on the map control.
         *
         * \@memberof GoogleMapService
         * @param {?} loc - The geo coordinates to translate.
         * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
         * if the goe coordinates are not in the view port.
         *
         */
            function (loc) {
                return this._map.then(function (m) {
                    /** @type {?} */
                    var crossesDateLine = false;
                    /** @type {?} */
                    var l = GoogleConversions.TranslateLocationObject(loc);
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
                    var point = p.fromLatLngToPoint(l);
                    return {
                        x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                        y: Math.floor((point.y - offsetY) * s)
                    };
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
        GoogleMapService.prototype.LocationsToPoints = /**
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
                    var crossesDateLine = false;
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
                    var offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
                    /** @type {?} */
                    var offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
                    /** @type {?} */
                    var l = locs.map(function (ll) {
                        /** @type {?} */
                        var l1 = GoogleConversions.TranslateLocationObject(ll);
                        /** @type {?} */
                        var point = p.fromLatLngToPoint(l1);
                        return {
                            x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                            y: Math.floor((point.y - offsetY) * s)
                        };
                    });
                    return l;
                });
            };
        /**
         * Centers the map on a geo location.
         *
         * \@memberof GoogleMapService
         * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
         * @return {?} - Promise that is fullfilled when the center operations has been completed.
         *
         */
        GoogleMapService.prototype.SetCenter = /**
         * Centers the map on a geo location.
         *
         * \@memberof GoogleMapService
         * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
         * @return {?} - Promise that is fullfilled when the center operations has been completed.
         *
         */
            function (latLng) {
                return this._map.then(function (map) {
                    /** @type {?} */
                    var center = GoogleConversions.TranslateLocationObject(latLng);
                    map.setCenter(center);
                });
            };
        /**
         * Sets the generic map options.
         *
         * \@memberof GoogleMapService
         * @param {?} options - Options to set.
         *
         * @return {?}
         */
        GoogleMapService.prototype.SetMapOptions = /**
         * Sets the generic map options.
         *
         * \@memberof GoogleMapService
         * @param {?} options - Options to set.
         *
         * @return {?}
         */
            function (options) {
                this._map.then(function (m) {
                    /** @type {?} */
                    var o = GoogleConversions.TranslateOptions(options);
                    m.setOptions(o);
                });
            };
        /**
         * Sets the view options of the map.
         *
         * \@memberof GoogleMapService
         * @param {?} options - Options to set.
         *
         * @return {?}
         */
        GoogleMapService.prototype.SetViewOptions = /**
         * Sets the view options of the map.
         *
         * \@memberof GoogleMapService
         * @param {?} options - Options to set.
         *
         * @return {?}
         */
            function (options) {
                this._map.then(function (m) {
                    if (options.bounds) {
                        m.fitBounds(GoogleConversions.TranslateBounds(options.bounds));
                    }
                    /** @type {?} */
                    var o = GoogleConversions.TranslateOptions(options);
                    m.setOptions(o);
                });
            };
        /**
         * Sets the zoom level of the map.
         *
         * \@memberof GoogleMapService
         * @param {?} zoom - Zoom level to set.
         * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
         *
         */
        GoogleMapService.prototype.SetZoom = /**
         * Sets the zoom level of the map.
         *
         * \@memberof GoogleMapService
         * @param {?} zoom - Zoom level to set.
         * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
         *
         */
            function (zoom) {
                return this._map.then(function (map) { return map.setZoom(zoom); });
            };
        /**
         * Creates an event subscription
         *
         * \@memberof GoogleMapService
         * @template E
         * @param {?} eventName - The name of the event (e.g. 'click')
         * @return {?} - An observable of type E that fires when the event occurs.
         *
         */
        GoogleMapService.prototype.SubscribeToMapEvent = /**
         * Creates an event subscription
         *
         * \@memberof GoogleMapService
         * @template E
         * @param {?} eventName - The name of the event (e.g. 'click')
         * @return {?} - An observable of type E that fires when the event occurs.
         *
         */
            function (eventName) {
                var _this = this;
                /** @type {?} */
                var googleEventName = GoogleMapEventsLookup[eventName];
                return rxjs.Observable.create(function (observer) {
                    _this._map.then(function (m) {
                        m.addListener(googleEventName, function (e) {
                            _this._zone.run(function () { return observer.next(e); });
                        });
                    });
                });
            };
        /**
         * Triggers the given event name on the map instance.
         *
         * \@memberof GoogleMapService
         * @param {?} eventName - Event to trigger.
         * @return {?} - A promise that is fullfilled once the event is triggered.
         *
         */
        GoogleMapService.prototype.TriggerMapEvent = /**
         * Triggers the given event name on the map instance.
         *
         * \@memberof GoogleMapService
         * @param {?} eventName - Event to trigger.
         * @return {?} - A promise that is fullfilled once the event is triggered.
         *
         */
            function (eventName) {
                return this._map.then(function (m) { return google.maps.event.trigger(m, eventName, null); });
            };
        GoogleMapService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleMapService.ctorParameters = function () {
            return [
                { type: MapAPILoader },
                { type: core.NgZone }
            ];
        };
        return GoogleMapService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the Polygon Service abstract class for Google Maps.
     *
     * @export
     */
    var GooglePolygonService = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of GooglePolygonService.
         * @param _mapService - {@link MapService} instance. The concrete {@link GoogleMapService} implementation is expected.
         * @param _layerService - {@link GoogleLayerService} instance.
         * The concrete {@link GoogleLayerService} implementation is expected.
         * @param _zone - NgZone instance to support zone aware promises.
         *
         * @memberof GooglePolygonService
         */
        function GooglePolygonService(_mapService, _layerService, _zone) {
            this._mapService = _mapService;
            this._layerService = _layerService;
            this._zone = _zone;
            this._polygons = new Map();
        }
        /**
         * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
         * correcsponding layer.
         *
         * \@memberof GooglePolygonService
         * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
         *
         * @return {?}
         */
        GooglePolygonService.prototype.AddPolygon = /**
         * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
         * correcsponding layer.
         *
         * \@memberof GooglePolygonService
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
                var polygonPromise = this._mapService.CreatePolygon(o);
                this._polygons.set(polygon, polygonPromise);
            };
        /**
         * Registers an event delegate for a polygon.
         *
         * \@memberof GooglePolygonService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
        GooglePolygonService.prototype.CreateEventObservable = /**
         * Registers an event delegate for a polygon.
         *
         * \@memberof GooglePolygonService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
            function (eventName, polygon) {
                var _this = this;
                return rxjs.Observable.create(function (observer) {
                    _this._polygons.get(polygon).then(function (p) {
                        p.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                    });
                });
            };
        /**
         * Deletes a polygon.
         *
         * \@memberof GooglePolygonService
         * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
         * @return {?} - A promise fullfilled once the polygon has been deleted.
         *
         */
        GooglePolygonService.prototype.DeletePolygon = /**
         * Deletes a polygon.
         *
         * \@memberof GooglePolygonService
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
         * \@memberof GooglePolygonService
         * @param {?} e - The mouse event.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
         *
         */
        GooglePolygonService.prototype.GetCoordinatesFromClick = /**
         * Obtains geo coordinates for the polygon on the click location
         *
         * @abstract
         * \@memberof GooglePolygonService
         * @param {?} e - The mouse event.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
         *
         */
            function (e) {
                return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
            };
        /**
         * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
         *
         * \@memberof GooglePolygonService
         * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
         * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
         *
         */
        GooglePolygonService.prototype.GetNativePolygon = /**
         * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
         *
         * \@memberof GooglePolygonService
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
         * \@memberof GooglePolygonService
         * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
         * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
         * options already on the underlying object.
         * @return {?} - A promise fullfilled once the polygon options have been set.
         *
         */
        GooglePolygonService.prototype.SetOptions = /**
         * Set the polygon options.
         *
         * \@memberof GooglePolygonService
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
         * \@memberof GooglePolygonService
         * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
         * @return {?} - A promise fullfilled once the polygon has been updated.
         *
         */
        GooglePolygonService.prototype.UpdatePolygon = /**
         * Updates the Polygon path
         *
         * \@memberof GooglePolygonService
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
        GooglePolygonService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GooglePolygonService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: LayerService },
                { type: core.NgZone }
            ];
        };
        return GooglePolygonService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Concrete implementation of the Polyline Service abstract class for Google Maps.
     *
     * @export
     */
    var GooglePolylineService = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of GooglePolylineService.
         * @param _mapService - {@link MapService} instance. The concrete {@link GoogleMapService} implementation is expected.
         * @param _layerService - {@link LayerService} instance.
         * The concrete {@link GoogleLayerService} implementation is expected.
         * @param _zone - NgZone instance to support zone aware promises.
         *
         * @memberof GooglePolylineService
         */
        function GooglePolylineService(_mapService, _layerService, _zone) {
            this._mapService = _mapService;
            this._layerService = _layerService;
            this._zone = _zone;
            this._polylines = new Map();
        }
        /**
         * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
         * correcsponding layer.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
         *
         * @return {?}
         */
        GooglePolylineService.prototype.AddPolyline = /**
         * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
         * correcsponding layer.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
         *
         * @return {?}
         */
            function (polyline) {
                /** @type {?} */
                var o = {
                    id: polyline.Id,
                    clickable: polyline.Clickable,
                    draggable: polyline.Draggable,
                    editable: polyline.Editable,
                    geodesic: polyline.Geodesic,
                    path: polyline.Path,
                    showTooltip: polyline.ShowTooltip,
                    strokeColor: polyline.StrokeColor,
                    strokeOpacity: polyline.StrokeOpacity,
                    strokeWeight: polyline.StrokeWeight,
                    title: polyline.Title,
                    visible: polyline.Visible,
                    zIndex: polyline.zIndex,
                };
                /** @type {?} */
                var polylinePromise = this._mapService.CreatePolyline(o);
                this._polylines.set(polyline, polylinePromise);
            };
        /**
         * Registers an event delegate for a line.
         *
         * \@memberof GooglePolylineService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
        GooglePolylineService.prototype.CreateEventObservable = /**
         * Registers an event delegate for a line.
         *
         * \@memberof GooglePolylineService
         * @template T
         * @param {?} eventName - The name of the event to register (e.g. 'click')
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
         * @return {?} - Observable emiting an instance of T each time the event occurs.
         *
         */
            function (eventName, polyline) {
                var _this = this;
                return rxjs.Observable.create(function (observer) {
                    _this._polylines.get(polyline).then(function (p) {
                        /** @type {?} */
                        var x = Array.isArray(p) ? p : [p];
                        x.forEach(function (line) { return line.AddListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); }); });
                    });
                });
            };
        /**
         * Deletes a polyline.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
         * @return {?} - A promise fullfilled once the polyline has been deleted.
         *
         */
        GooglePolylineService.prototype.DeletePolyline = /**
         * Deletes a polyline.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
         * @return {?} - A promise fullfilled once the polyline has been deleted.
         *
         */
            function (polyline) {
                var _this = this;
                /** @type {?} */
                var m = this._polylines.get(polyline);
                if (m == null) {
                    return Promise.resolve();
                }
                return m.then(function (l) {
                    return _this._zone.run(function () {
                        /** @type {?} */
                        var x = Array.isArray(l) ? l : [l];
                        x.forEach(function (line) { return line.Delete(); });
                        _this._polylines.delete(polyline);
                    });
                });
            };
        /**
         * Obtains geo coordinates for the line on the click location
         *
         * @abstract
         * \@memberof GooglePolylineService
         * @param {?} e - The mouse event.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked line.
         *
         */
        GooglePolylineService.prototype.GetCoordinatesFromClick = /**
         * Obtains geo coordinates for the line on the click location
         *
         * @abstract
         * \@memberof GooglePolylineService
         * @param {?} e - The mouse event.
         * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked line.
         *
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
         * Obtains the polyline model for the line allowing access to native implementation functionatiliy.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
         * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
         * implementation of the underlying platform. For complex paths, returns an array of polylines.
         *
         */
        GooglePolylineService.prototype.GetNativePolyline = /**
         * Obtains the polyline model for the line allowing access to native implementation functionatiliy.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
         * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
         * implementation of the underlying platform. For complex paths, returns an array of polylines.
         *
         */
            function (polyline) {
                return this._polylines.get(polyline);
            };
        /**
         * Set the polyline options.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
         * options already on the underlying object.
         * @return {?} - A promise fullfilled once the polyline options have been set.
         *
         */
        GooglePolylineService.prototype.SetOptions = /**
         * Set the polyline options.
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
         * options already on the underlying object.
         * @return {?} - A promise fullfilled once the polyline options have been set.
         *
         */
            function (polyline, options) {
                return this._polylines.get(polyline).then(function (l) {
                    /** @type {?} */
                    var x = Array.isArray(l) ? l : [l];
                    x.forEach(function (line) { return line.SetOptions(options); });
                });
            };
        /**
         * Updates the Polyline path
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @return {?} - A promise fullfilled once the polyline has been updated.
         *
         */
        GooglePolylineService.prototype.UpdatePolyline = /**
         * Updates the Polyline path
         *
         * \@memberof GooglePolylineService
         * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
         * @return {?} - A promise fullfilled once the polyline has been updated.
         *
         */
            function (polyline) {
                var _this = this;
                /** @type {?} */
                var m = this._polylines.get(polyline);
                if (m == null) {
                    return Promise.resolve();
                }
                return m.then(function (l) {
                    return _this._zone.run(function () {
                        /** @type {?} */
                        var x = Array.isArray(l) ? l : [l];
                        /** @type {?} */
                        var p = polyline.Path.length > 0 && Array.isArray(polyline.Path[0]) ? /** @type {?} */ (polyline.Path) : /** @type {?} */ ([polyline.Path]);
                        x.forEach(function (line, index) {
                            if (p.length > index) {
                                line.SetPath(p[index]);
                            }
                        });
                        if (Array.isArray(l) && l.length > p.length) {
                            l.splice(p.length - 1).forEach(function (line) { return line.Delete(); });
                        }
                    });
                });
            };
        GooglePolylineService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GooglePolylineService.ctorParameters = function () {
            return [
                { type: MapService },
                { type: LayerService },
                { type: core.NgZone }
            ];
        };
        return GooglePolylineService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Implements a factory to create three necessary Google Maps specific service instances.
     *
     * @export
     */
    var GoogleMapServiceFactory = (function () {
        ///
        /// Constructor
        ///
        /**
         * Creates an instance of GoogleMapServiceFactory.
         * @param _loader - {@link MapAPILoader} implementation for the Google Map provider.
         * @param _zone - NgZone object to implement zone aware promises.
         *
         * @memberof GoogleMapServiceFactory
         */
        function GoogleMapServiceFactory(_loader, _zone) {
            var _this = this;
            this._loader = _loader;
            this._zone = _zone;
            this._map =
                new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
        /**
         * Creates the map service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @return {?} - {\@link MapService}. A concreted instance of the {\@link GoogleMapService}.
         *
         */
        GoogleMapServiceFactory.prototype.Create = /**
         * Creates the map service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @return {?} - {\@link MapService}. A concreted instance of the {\@link GoogleMapService}.
         *
         */
            function () {
                return new GoogleMapService(this._loader, this._zone);
            };
        /**
         * Creates the cluster service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link GoogleClusterService}.
         *
         */
        GoogleMapServiceFactory.prototype.CreateClusterService = /**
         * Creates the cluster service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link GoogleClusterService}.
         *
         */
            function (_mapService) {
                return new GoogleClusterService(_mapService, this._zone);
            };
        /**
         * Creates thh info box service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @param {?} _markerService
         * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link GoogleInfoBoxService}.
         *
         */
        GoogleMapServiceFactory.prototype.CreateInfoBoxService = /**
         * Creates thh info box service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @param {?} _markerService
         * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link GoogleInfoBoxService}.
         *
         */
            function (_mapService, _markerService) {
                return new GoogleInfoBoxService(_mapService, _markerService, this._zone);
            };
        /**
         * Creates the layer service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link LayerService}. A concreted instance of the {\@link GoogleLayerService}.
         *
         */
        GoogleMapServiceFactory.prototype.CreateLayerService = /**
         * Creates the layer service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @return {?} - {\@link LayerService}. A concreted instance of the {\@link GoogleLayerService}.
         *
         */
            function (_mapService) {
                return new GoogleLayerService(_mapService, this._zone);
            };
        /**
         * Creates the marker service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @param {?} _layerService
         * @param {?} _clusterService
         * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link GoogleMarkerService}.
         *
         */
        GoogleMapServiceFactory.prototype.CreateMarkerService = /**
         * Creates the marker service for the Google Maps implementation.
         *
         * \@memberof GoogleMapServiceFactory
         * @param {?} _mapService
         * @param {?} _layerService
         * @param {?} _clusterService
         * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link GoogleMarkerService}.
         *
         */
            function (_mapService, _layerService, _clusterService) {
                return new GoogleMarkerService(_mapService, _layerService, _clusterService, this._zone);
            };
        /**
         * Creates the polygon service for the Google Maps implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
         *
         */
        GoogleMapServiceFactory.prototype.CreatePolygonService = /**
         * Creates the polygon service for the Google Maps implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
         *
         */
            function (map, layers) {
                return new GooglePolygonService(map, layers, this._zone);
            };
        /**
         * Creates the polyline service for the Google Maps implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
         *
         */
        GoogleMapServiceFactory.prototype.CreatePolylineService = /**
         * Creates the polyline service for the Google Maps implementation.
         *
         * \@memberof MapServiceFactory
         * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
         * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
         * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
         *
         */
            function (map, layers) {
                return new GooglePolylineService(map, layers, this._zone);
            };
        GoogleMapServiceFactory.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleMapServiceFactory.ctorParameters = function () {
            return [
                { type: MapAPILoader },
                { type: core.NgZone }
            ];
        };
        return GoogleMapServiceFactory;
    }());
    /**
     *  Creates a new instance of a plaform specific MapServiceFactory.
     *
     * @param {?} apiLoader - An {\@link MapAPILoader} instance. This is expected to the a {\@link GoogleMapAPILoader}.
     * @param {?} zone - An NgZone instance to provide zone aware promises.
     *
     * @return {?} - A {\@link MapServiceFactory} instance.
     */
    function GoogleMapServiceFactoryFactory(apiLoader, zone) {
        return new GoogleMapServiceFactory(apiLoader, zone);
    }
    /**
     * Creates a new instance of a plaform specific MapLoaderFactory.
     *
     * @export
     * @return {?} - A {\@link MapAPILoader} instance.
     */
    function GoogleMapLoaderFactory() {
        return new GoogleMapAPILoader(new GoogleMapAPILoaderConfig(), new WindowRef(), new DocumentRef());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MapModule = (function () {
        function MapModule() {
        }
        /**
         * @param {?=} mapServiceFactory
         * @param {?=} loader
         * @return {?}
         */
        MapModule.forRoot = /**
         * @param {?=} mapServiceFactory
         * @param {?=} loader
         * @return {?}
         */
            function (mapServiceFactory, loader) {
                return {
                    ngModule: MapModule,
                    providers: [
                        mapServiceFactory ? { provide: MapServiceFactory, useValue: mapServiceFactory } :
                            { provide: MapServiceFactory, deps: [MapAPILoader, core.NgZone], useFactory: BingMapServiceFactoryFactory },
                        loader ? { provide: MapAPILoader, useValue: loader } : { provide: MapAPILoader, useFactory: BingMapLoaderFactory },
                        DocumentRef,
                        WindowRef
                    ]
                };
            };
        /**
         * @return {?}
         */
        MapModule.forRootBing = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: MapModule,
                    providers: [
                        { provide: MapServiceFactory, deps: [MapAPILoader, core.NgZone], useFactory: BingMapServiceFactoryFactory },
                        { provide: MapAPILoader, useFactory: BingMapLoaderFactory },
                        DocumentRef,
                        WindowRef
                    ]
                };
            };
        /**
         * @return {?}
         */
        MapModule.forRootGoogle = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: MapModule,
                    providers: [
                        { provide: MapServiceFactory, deps: [MapAPILoader, core.NgZone], useFactory: GoogleMapServiceFactoryFactory },
                        { provide: MapAPILoader, useFactory: GoogleMapLoaderFactory },
                        DocumentRef,
                        WindowRef
                    ]
                };
            };
        MapModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            MapLayerDirective,
                            MapComponent,
                            MapMarkerDirective,
                            InfoBoxComponent,
                            InfoBoxActionDirective,
                            MapPolygonDirective,
                            MapPolylineDirective,
                            ClusterLayerDirective,
                            MapMarkerLayerDirective,
                            MapPolygonLayerDirective,
                            MapPolylineLayerDirective
                        ],
                        imports: [common.CommonModule],
                        exports: [
                            common.CommonModule,
                            MapComponent,
                            MapMarkerDirective,
                            MapPolygonDirective,
                            MapPolylineDirective,
                            InfoBoxComponent,
                            InfoBoxActionDirective,
                            MapLayerDirective,
                            ClusterLayerDirective,
                            MapMarkerLayerDirective,
                            MapPolygonLayerDirective,
                            MapPolylineLayerDirective
                        ]
                    },] },
        ];
        return MapModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.MapComponent = MapComponent;
    exports.InfoBoxComponent = InfoBoxComponent;
    exports.MapMarkerDirective = MapMarkerDirective;
    exports.MapPolygonDirective = MapPolygonDirective;
    exports.MapPolylineDirective = MapPolylineDirective;
    exports.InfoBoxActionDirective = InfoBoxActionDirective;
    exports.MapMarkerLayerDirective = MapMarkerLayerDirective;
    exports.MapPolygonLayerDirective = MapPolygonLayerDirective;
    exports.MapLayerDirective = MapLayerDirective;
    exports.ClusterLayerDirective = ClusterLayerDirective;
    exports.MapPolylineLayerDirective = MapPolylineLayerDirective;
    exports.MapTypeId = MapTypeId;
    exports.Marker = Marker;
    exports.MarkerTypeId = MarkerTypeId;
    exports.InfoWindow = InfoWindow;
    exports.Layer = Layer;
    exports.ClusterPlacementMode = ClusterPlacementMode;
    exports.ClusterClickAction = ClusterClickAction;
    exports.SpiderClusterMarker = SpiderClusterMarker;
    exports.Polygon = Polygon;
    exports.Polyline = Polyline;
    exports.CanvasOverlay = CanvasOverlay;
    exports.MapService = MapService;
    exports.MapServiceFactory = MapServiceFactory;
    exports.MarkerService = MarkerService;
    exports.InfoBoxService = InfoBoxService;
    exports.MapAPILoader = MapAPILoader;
    exports.WindowRef = WindowRef;
    exports.DocumentRef = DocumentRef;
    exports.LayerService = LayerService;
    exports.PolygonService = PolygonService;
    exports.PolylineService = PolylineService;
    exports.ClusterService = ClusterService;
    exports.BingMapServiceFactory = BingMapServiceFactory;
    exports.BingMapAPILoaderConfig = BingMapAPILoaderConfig;
    exports.BingMapService = BingMapService;
    exports.BingInfoBoxService = BingInfoBoxService;
    exports.BingMarkerService = BingMarkerService;
    exports.BingPolygonService = BingPolygonService;
    exports.BingPolylineService = BingPolylineService;
    exports.BingMapAPILoader = BingMapAPILoader;
    exports.BingLayerService = BingLayerService;
    exports.BingClusterService = BingClusterService;
    exports.BingLayer = BingLayer;
    exports.BingMarker = BingMarker;
    exports.BingPolyline = BingPolyline;
    exports.BingMapEventsLookup = BingMapEventsLookup;
    exports.BingPolygon = BingPolygon;
    exports.BingInfoWindow = BingInfoWindow;
    exports.BingClusterLayer = BingClusterLayer;
    exports.BingSpiderClusterMarker = BingSpiderClusterMarker;
    exports.BingCanvasOverlay = BingCanvasOverlay;
    exports.GoogleClusterService = GoogleClusterService;
    exports.GoogleInfoBoxService = GoogleInfoBoxService;
    exports.GoogleLayerService = GoogleLayerService;
    exports.GoogleMapAPILoader = GoogleMapAPILoader;
    exports.GoogleMapAPILoaderConfig = GoogleMapAPILoaderConfig;
    exports.GoogleMapServiceFactory = GoogleMapServiceFactory;
    exports.GoogleMapService = GoogleMapService;
    exports.GoogleMarkerService = GoogleMarkerService;
    exports.GooglePolygonService = GooglePolygonService;
    exports.GooglePolylineService = GooglePolylineService;
    exports.GoogleMarker = GoogleMarker;
    exports.GoogleInfoWindow = GoogleInfoWindow;
    exports.GooglePolygon = GooglePolygon;
    exports.GooglePolyline = GooglePolyline;
    exports.GoogleMapEventsLookup = GoogleMapEventsLookup;
    exports.GoogleCanvasOverlay = GoogleCanvasOverlay;
    exports.MapModule = MapModule;
    exports.ɵa = ClusterServiceFactory;
    exports.ɵb = InfoBoxServiceFactory;
    exports.ɵc = LayerServiceFactory;
    exports.ɵd = MapServiceCreator;
    exports.ɵe = MarkerServiceFactory;
    exports.ɵf = PolygonServiceFactory;
    exports.ɵg = PolylineServiceFactory;
    exports.ɵl = BingLayerBase;
    exports.ɵi = BingMapLoaderFactory;
    exports.ɵh = BingMapServiceFactoryFactory;
    exports.ɵm = GoogleLayerBase;
    exports.ɵk = GoogleMapLoaderFactory;
    exports.ɵj = GoogleMapServiceFactoryFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
