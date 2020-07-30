/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MarkerTypeId } from '../models/marker-type-id';
/**
 * This interface defines the contract for an icon cache entry.
 * @record
 */
function IMarkerIconCacheEntry() { }
/**
 * The icon string of the cache entry.
 *
 * \@memberof IMarkerIconCacheEntry
 * @type {?}
 */
IMarkerIconCacheEntry.prototype.markerIconString;
/**
 * The Size of the icon.
 *
 * \@memberof IMarkerIconCacheEntry
 *
 * @type {?}
 */
IMarkerIconCacheEntry.prototype.markerSize;
/**
 * This class defines the contract for a marker.
 *
 * @export
 * @abstract
 * @abstract
 */
var Marker = /** @class */ (function () {
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
export { Marker };
if (false) {
    /**
     * Caches concrete img elements for marker icons to accelerate patining.
     *
     * \@memberof Marker
     * @type {?}
     */
    Marker.ImageElementCache;
    /**
     * Used to cache generated markers for performance and reusability.
     *
     * \@memberof Marker
     * @type {?}
     */
    Marker.MarkerCache;
    /**
     * Indicates that the marker is the first marker in a set.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.IsFirst = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Marker.prototype.IsFirst = function (val) { };
    /**
     * Indicates that the marker is the last marker in the set.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.IsLast = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Marker.prototype.IsLast = function (val) { };
    /**
     * Gets the Location of the marker
     *
     * \@readonly
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.Location = function () { };
    /**
     * Gets the marker metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.Metadata = function () { };
    /**
     * Gets the native primitve implementing the marker (e.g. Microsoft.Maps.Pushpin)
     *
     * \@readonly
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.NativePrimitve = function () { };
    /**
     * Adds an event listener to the marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    Marker.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.DeleteMarker = function () { };
    /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.GetLabel = function () { };
    /**
     * Gets the marker visibility
     *
     * @abstract
     *
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.GetVisible = function () { };
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    Marker.prototype.SetAnchor = function (anchor) { };
    /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    Marker.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    Marker.prototype.SetIcon = function (icon) { };
    /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    Marker.prototype.SetLabel = function (label) { };
    /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    Marker.prototype.SetPosition = function (latLng) { };
    /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    Marker.prototype.SetTitle = function (title) { };
    /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    Marker.prototype.SetOptions = function (options) { };
    /**
     * Sets the visiblilty of the marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} visible - Boolean which determines if the marker is visible or not.
     *
     * @return {?}
     */
    Marker.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkR0QyxtQkFBWTs7Ozs7Ozs7Ozs7Y0FBQyxRQUF5QjtRQUNoRCxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFLLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRSxLQUFLLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pGLEtBQUssWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVFLEtBQUssWUFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkYsS0FBSyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RixLQUFLLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JGLEtBQUssWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1NBQ2hHO1FBQ0QsTUFBTSxLQUFLLENBQUMsMkJBQTJCLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7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LENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUd2RyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7O2dCQUV6QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFFakIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyRixRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Z0JBRXJELElBQU0sQ0FBQyxHQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUFFO2dCQUNySCxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO2FBQzFDLENBQUM7U0FDTCxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2xCO0lBRUQ7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UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2xCOzs7Ozs7K0JBcldpRSxJQUFJLEdBQUcsRUFBNEI7Ozs7Ozt5QkFRcEMsSUFBSSxHQUFHLEVBQWlDO2lCQW5EN0c7O1NBZ0NzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElTaXplIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc2l6ZSc7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcblxyXG4vKipcclxuICogVGhpcyBpbnRlcmZhY2UgZGVmaW5lcyB0aGUgY29udHJhY3QgZm9yIGFuIGljb24gY2FjaGUgZW50cnkuXHJcbiAqL1xyXG5pbnRlcmZhY2UgSU1hcmtlckljb25DYWNoZUVudHJ5IHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGljb24gc3RyaW5nIG9mIHRoZSBjYWNoZSBlbnRyeS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSU1hcmtlckljb25DYWNoZUVudHJ5XHJcbiAgICAgKi9cclxuICAgIG1hcmtlckljb25TdHJpbmc6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBTaXplIG9mIHRoZSBpY29uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJTWFya2VySWNvbkNhY2hlRW50cnlcclxuICAgICogKi9cclxuICAgIG1hcmtlclNpemU6IElTaXplO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBkZWZpbmVzIHRoZSBjb250cmFjdCBmb3IgYSBtYXJrZXIuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFya2VyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWZpbml0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWNoZXMgY29uY3JldGUgaW1nIGVsZW1lbnRzIGZvciBtYXJrZXIgaWNvbnMgdG8gYWNjZWxlcmF0ZSBwYXRpbmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIEltYWdlRWxlbWVudENhY2hlOiBNYXA8c3RyaW5nLCBIVE1MSW1hZ2VFbGVtZW50PiA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSW1hZ2VFbGVtZW50PigpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gY2FjaGUgZ2VuZXJhdGVkIG1hcmtlcnMgZm9yIHBlcmZvcm1hbmNlIGFuZCByZXVzYWJpbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIE1hcmtlckNhY2hlOiBNYXA8c3RyaW5nLCBJTWFya2VySWNvbkNhY2hlRW50cnk+ID0gbmV3IE1hcDxzdHJpbmcsIElNYXJrZXJJY29uQ2FjaGVFbnRyeT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBtYXJrZXIgYmFzZWQgb24gdGhlIG1hcmtlciBpbmZvLiBJbiB0dXJuIGNhbGxzIGEgbnVtYmVyIG9mIGludGVybmFsIG1lbWJlcnMgdG9cclxuICAgICAqIGNyZWF0ZSB0aGUgYWN0dWFsIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSBpY29uIGluZm9ybWF0aW9uLiBEZXBlbmRpbmcgb24gdGhlIG1hcmtlciB0eXBlLCB2YXJpb3VzIHByb3BlcnRpZXNcclxuICAgICAqIG5lZWQgdG8gYmUgcHJlc2VudC4gRm9yIHBlcmZvcm1hbmNlLCBpdCBpcyByZWNvbW1lbmRlZCB0byB1c2UgYW4gaWQgZm9yIG1hcmtlcnMgdGhhdCBhcmUgY29tbW9uIHRvIGZhY2lsaXRhdGVcclxuICAgICAqIHJldXNlLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gYSBjYWxsYmFjayB0aGF0IGlzIGludm9rZWQgb24gbWFya2VycyB0aGF0IHJlcXVpcmUgYXN5bmNyb25vdXNcclxuICAgICAqIHByb2Nlc3NpbmcgZHVyaW5nIGNyZWF0aW9uLiBGb3IgbWFya2VycyB0aGF0IGRvIG5vdCByZXF1aXJlIGFzeW5jIHByb2Nlc3NpbmcsIHRoaXMgcGFyYW1ldGVyIGlzIGlnbm9yZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIGEgc3RyaW5nIG9yIGEgcHJvbWlzZSBmb3IgYSBzdHJpbmcgY29udGFpbmluZ1xyXG4gICAgICogYSBkYXRhIHVybCB3aXRoIHRoZSBtYXJrZXIgaW1hZ2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlTWFya2VyKGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pOiBzdHJpbmd8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4ge1xyXG4gICAgICAgIHN3aXRjaCAoaWNvbkluZm8ubWFya2VyVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIE1hcmtlclR5cGVJZC5DYW52YXNNYXJrZXI6IHJldHVybiBNYXJrZXIuQ3JlYXRlQ2FudmFzTWFya2VyKGljb25JbmZvKTtcclxuICAgICAgICAgICAgY2FzZSBNYXJrZXJUeXBlSWQuRHluYW1pY0NpcmNsZU1hcmtlcjogcmV0dXJuIE1hcmtlci5DcmVhdGVEeW5hbWljQ2lyY2xlTWFya2VyKGljb25JbmZvKTtcclxuICAgICAgICAgICAgY2FzZSBNYXJrZXJUeXBlSWQuRm9udE1hcmtlcjogcmV0dXJuIE1hcmtlci5DcmVhdGVGb250QmFzZWRNYXJrZXIoaWNvbkluZm8pO1xyXG4gICAgICAgICAgICBjYXNlIE1hcmtlclR5cGVJZC5Sb3RhdGVkSW1hZ2VNYXJrZXI6IHJldHVybiBNYXJrZXIuQ3JlYXRlUm90YXRlZEltYWdlTWFya2VyKGljb25JbmZvKTtcclxuICAgICAgICAgICAgY2FzZSBNYXJrZXJUeXBlSWQuUm91bmRlZEltYWdlTWFya2VyOiByZXR1cm4gTWFya2VyLkNyZWF0ZVJvdW5kZWRJbWFnZU1hcmtlcihpY29uSW5mbyk7XHJcbiAgICAgICAgICAgIGNhc2UgTWFya2VyVHlwZUlkLlNjYWxlZEltYWdlTWFya2VyOiByZXR1cm4gTWFya2VyLkNyZWF0ZVNjYWxlZEltYWdlTWFya2VyKGljb25JbmZvKTtcclxuICAgICAgICAgICAgY2FzZSBNYXJrZXJUeXBlSWQuQ3VzdG9tOiB0aHJvdyBFcnJvcignQ3VzdG9tIE1hcmtlciBDcmVhdG9ycyBhcmUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IEVycm9yKCdVbnN1cHBvcnRlZCBtYXJrZXIgdHlwZTogJyArIGljb25JbmZvLm1hcmtlclR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBhIHNoYXJlZCBpbWcgZWxlbWVudCBmb3IgYSBtYXJrZXIgaWNvbiB0byBwcmV2ZW50IHVuZWNlc3NhcnkgY3JlYXRpb24gb2ZcclxuICAgICAqIERPTSBpdGVtcy4gVGhpcyBoYXMgc3BlZCB1cCBsYXJnZSBzY2FsZSBtYWtlcnMgb24gQmluZyBNYXBzIGJ5IGFib3V0IDcwJVxyXG4gICAgICogQHBhcmFtIGljb24gLSBUaGUgaWNvbiBzdHJpbmcgKHVybCwgZGF0YSB1cmwsIHN2ZykgZm9yIHdoaWNoIHRvIG9idGFpbiB0aGUgaW1hZ2UuXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBvYnRhaW5lZCBpbWFnZSBlbGVtZW50LlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEltYWdlRm9yTWFya2VyKGljb246IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIGlmIChpY29uID09IG51bGwgfHwgaWNvbiA9PT0gJycgKSB7IHJldHVybiAgbnVsbDsgfVxyXG5cclxuICAgICAgICBsZXQgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICBpbWcgPSBNYXJrZXIuSW1hZ2VFbGVtZW50Q2FjaGUuZ2V0KGljb24pO1xyXG4gICAgICAgIGlmIChpbWcgIT0gbnVsbCkgeyByZXR1cm4gaW1nOyB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YoZG9jdW1lbnQpICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gaWNvbjtcclxuICAgICAgICAgICAgTWFya2VyLkltYWdlRWxlbWVudENhY2hlLnNldChpY29uLCBpbWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNhbnZhc2VkIGJhc2VkIG1hcmtlciB1c2luZyB0aGUgcG9pbnQgY29sbGVjdGlvbiBjb250YWluZWQgaW4gdGhlIGljb25JbmZvIHBhcmFtZXRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSB7QGxpbmsgSU1hcmtlckljb25JbmZvfSBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gY3JlYXRlIHRoZSBpY29uLlxyXG4gICAgICogQHJldHVybnMgLSBTdHJpbmcgd2l0aCB0aGUgZGF0YSB1cmwgZm9yIHRoZSBtYXJrZXIgaW1hZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIENyZWF0ZUNhbnZhc01hcmtlcihpY29uSW5mbzogSU1hcmtlckljb25JbmZvKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQgPT0gbnVsbCkgeyB0aHJvdyBFcnJvcignRG9jdW1lbnQgY29udGV4dCAod2luZG93LmRvY3VtZW50KSBpcyByZXF1aXJlZCBmb3IgY2FudmFzIG1hcmtlcnMuJyk7IH1cclxuICAgICAgICBpZiAoaWNvbkluZm8gPT0gbnVsbCB8fCBpY29uSW5mby5zaXplID09IG51bGwgfHwgaWNvbkluZm8ucG9pbnRzID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0lNYXJrZXJJY29uSW5mby5zaXplLCBhbmQgSU1hcmtlcklDb25JbmZvLnBvaW50cyBhcmUgcmVxdWlyZWQgZm9yIGNhbnZhcyBtYXJrZXJzLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCAmJiBNYXJrZXIuTWFya2VyQ2FjaGUuaGFzKGljb25JbmZvLmlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XHJcbiAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSBtaS5tYXJrZXJTaXplO1xyXG4gICAgICAgICAgICByZXR1cm4gbWkubWFya2VySWNvblN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgYy53aWR0aCA9IGljb25JbmZvLnNpemUud2lkdGg7XHJcbiAgICAgICAgYy5oZWlnaHQgPSBpY29uSW5mby5zaXplLmhlaWdodDtcclxuICAgICAgICBpZiAoaWNvbkluZm8ucm90YXRpb24pIHtcclxuICAgICAgICAgICAgLy8gT2Zmc2V0IHRoZSBjYW52YXMgc3VjaCB0aGF0IHdlIHdpbGwgcm90YXRlIGFyb3VuZCB0aGUgY2VudGVyIG9mIG91ciBhcnJvd1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGMud2lkdGggKiAwLjUsIGMuaGVpZ2h0ICogMC41KTtcclxuICAgICAgICAgICAgLy8gUm90YXRlIHRoZSBjYW52YXMgYnkgdGhlIGRlc2lyZWQgaGVhZGluZ1xyXG4gICAgICAgICAgICBjdHgucm90YXRlKGljb25JbmZvLnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY2FudmFzIG9mZnNldCBiYWNrIHRvIGl0J3Mgb3JpZ2luYWwgcG9zaXRpb25cclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgtYy53aWR0aCAqIDAuNSwgLWMuaGVpZ2h0ICogMC41KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBpY29uSW5mby5jb2xvciB8fCAncmVkJztcclxuXHJcbiAgICAgICAgLy8gRHJhdyBhIHBhdGggaW4gdGhlIHNoYXBlIG9mIGFuIGFycm93LlxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBpZiAoaWNvbkluZm8uZHJhd2luZ09mZnNldCkgeyBjdHgubW92ZVRvKGljb25JbmZvLmRyYXdpbmdPZmZzZXQueCwgaWNvbkluZm8uZHJhd2luZ09mZnNldC55KTsgfVxyXG4gICAgICAgIGljb25JbmZvLnBvaW50cy5mb3JFYWNoKChwOiBJUG9pbnQpID0+IHsgY3R4LmxpbmVUbyhwLngsIHAueSk7IH0pO1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgczogc3RyaW5nID0gYy50b0RhdGFVUkwoKTtcclxuICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCkgeyBNYXJrZXIuTWFya2VyQ2FjaGUuc2V0KGljb25JbmZvLmlkLCB7IG1hcmtlckljb25TdHJpbmc6IHMsIG1hcmtlclNpemU6IGljb25JbmZvLnNpemUgfSk7IH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjaXJjbGUgbWFya2VyIGltYWdlIHVzaW5nIGluZm9ybWF0aW9uIGNvbnRhaW5lZCBpbiB0aGUgaWNvbkluZm8gcGFyYW1ldGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSBpY29uSW5mbyAtIHtAbGluayBJTWFya2VySWNvbkluZm99IGNvbnRhaW5pbmcgdGhlIGluZm9ybWF0aW9uIG5lY2Vzc2FyeSB0byBjcmVhdGUgdGhlIGljb24uXHJcbiAgICAgKiBAcmV0dXJucyAtIFN0cmluZyB3aXRoIHRoZSBkYXRhIHVybCBmb3IgdGhlIG1hcmtlciBpbWFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgQ3JlYXRlRHluYW1pY0NpcmNsZU1hcmtlcihpY29uSW5mbzogSU1hcmtlckljb25JbmZvKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQgPT0gbnVsbCkgeyB0aHJvdyBFcnJvcignRG9jdW1lbnQgY29udGV4dCAod2luZG93LmRvY3VtZW50KSBpcyByZXF1aXJlZCBmb3IgZHluYW1pYyBjaXJjbGUgbWFya2Vycy4nKTsgfVxyXG4gICAgICAgIGlmIChpY29uSW5mbyA9PSBudWxsIHx8IGljb25JbmZvLnNpemUgPT0gbnVsbCkgeyB0aHJvdyBFcnJvcignSU1hcmtlckljb25JbmZvLnNpemUgaXMgcmVxdWlyZWQgZm9yIGR5bmFtaWMgY2lyY2xlIG1hcmtlcnMuJyk7IH1cclxuICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCAmJiBNYXJrZXIuTWFya2VyQ2FjaGUuaGFzKGljb25JbmZvLmlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XHJcbiAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSBtaS5tYXJrZXJTaXplO1xyXG4gICAgICAgICAgICByZXR1cm4gbWkubWFya2VySWNvblN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0cm9rZVdpZHRoOiBudW1iZXIgPSBpY29uSW5mby5zdHJva2VXaWR0aCB8fCAwO1xyXG4gICAgICAgIC8vIENyZWF0ZSBhbiBTVkcgc3RyaW5nIG9mIGEgY2lyY2xlIHdpdGggdGhlIHNwZWNpZmllZCByYWRpdXMgYW5kIGNvbG9yLlxyXG4gICAgICAgIGNvbnN0IHN2ZzogQXJyYXk8c3RyaW5nPiA9IFtcclxuICAgICAgICAgICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJyxcclxuICAgICAgICAgICAgaWNvbkluZm8uc2l6ZS53aWR0aC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAnXCIgaGVpZ2h0PVwiJyxcclxuICAgICAgICAgICAgaWNvbkluZm8uc2l6ZS53aWR0aC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAnXCI+PGNpcmNsZSBjeD1cIicsXHJcbiAgICAgICAgICAgIChpY29uSW5mby5zaXplLndpZHRoIC8gMikudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgJ1wiIGN5PVwiJyxcclxuICAgICAgICAgICAgKGljb25JbmZvLnNpemUud2lkdGggLyAyKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAnXCIgcj1cIicsXHJcbiAgICAgICAgICAgICgoaWNvbkluZm8uc2l6ZS53aWR0aCAvIDIpIC0gc3Ryb2tlV2lkdGgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICdcIiBzdHJva2U9XCInLFxyXG4gICAgICAgICAgICBpY29uSW5mby5jb2xvciB8fCAncmVkJyxcclxuICAgICAgICAgICAgJ1wiIHN0cm9rZS13aWR0aD1cIicsXHJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICdcIiBmaWxsPVwiJyxcclxuICAgICAgICAgICAgaWNvbkluZm8uY29sb3IgfHwgJ3JlZCcsXHJcbiAgICAgICAgICAgICdcIi8+PC9zdmc+J1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGNvbnN0IHM6IHN0cmluZyA9IHN2Zy5qb2luKCcnKTtcclxuICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCkgeyBNYXJrZXIuTWFya2VyQ2FjaGUuc2V0KGljb25JbmZvLmlkLCB7IG1hcmtlckljb25TdHJpbmc6IHMsIG1hcmtlclNpemU6IGljb25JbmZvLnNpemUgfSk7IH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBmb250IGJhc2VkIG1hcmtlciBpbWFnZSAoc3VjaCBhcyBGb250LUF3ZXNvbWUpLCBieSB1c2luZyBpbmZvcm1hdGlvbiBzdXBwbGllZCBpbiB0aGUgcGFyYW1ldGVycyAoc3VjaCBhcyBGb250LUF3ZXNvbWUpLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSBpY29uSW5mbyAtIHtAbGluayBJTWFya2VySWNvbkluZm99IGNvbnRhaW5pbmcgdGhlIGluZm9ybWF0aW9uIG5lY2Vzc2FyeSB0byBjcmVhdGUgdGhlIGljb24uXHJcbiAgICAgKiBAcmV0dXJucyAtIFN0cmluZyB3aXRoIHRoZSBkYXRhIHVybCBmb3IgdGhlIG1hcmtlciBpbWFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgQ3JlYXRlRm9udEJhc2VkTWFya2VyKGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChkb2N1bWVudCA9PSBudWxsKSB7IHRocm93IEVycm9yKCdEb2N1bWVudCBjb250ZXh0ICh3aW5kb3cuZG9jdW1lbnQpIGlzIHJlcXVpcmVkIGZvciBmb250IGJhc2VkIG1hcmtlcnMnKTsgfVxyXG4gICAgICAgIGlmIChpY29uSW5mbyA9PSBudWxsIHx8IGljb25JbmZvLmZvbnROYW1lID09IG51bGwgfHwgaWNvbkluZm8uZm9udFNpemUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSU1hcmtlckljb25JbmZvLmZvbnROYW1lLCBJTWFya2VySWNvbkluZm8uZm9udFNpemUgYW5kIElNYXJrZXJJQ29uSW5mby50ZXh0IGFyZSByZXF1aXJlZCBmb3IgZm9udCBiYXNlZCBtYXJrZXJzLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCAmJiBNYXJrZXIuTWFya2VyQ2FjaGUuaGFzKGljb25JbmZvLmlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XHJcbiAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSBtaS5tYXJrZXJTaXplO1xyXG4gICAgICAgICAgICByZXR1cm4gbWkubWFya2VySWNvblN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY29uc3QgZm9udDogc3RyaW5nID0gaWNvbkluZm8uZm9udFNpemUgKyAncHggJyArIGljb25JbmZvLmZvbnROYW1lO1xyXG4gICAgICAgIGN0eC5mb250ID0gZm9udDtcclxuXHJcbiAgICAgICAgLy8gUmVzaXplIGNhbnZhcyBiYXNlZCBvbiBzaWUgb2YgdGV4dC5cclxuICAgICAgICBjb25zdCBzaXplOiBUZXh0TWV0cmljcyA9IGN0eC5tZWFzdXJlVGV4dChpY29uSW5mby50ZXh0KTtcclxuICAgICAgICBjLndpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICBjLmhlaWdodCA9IGljb25JbmZvLmZvbnRTaXplO1xyXG5cclxuICAgICAgICBpZiAoaWNvbkluZm8ucm90YXRpb24pIHtcclxuICAgICAgICAgICAgLy8gT2Zmc2V0IHRoZSBjYW52YXMgc3VjaCB0aGF0IHdlIHdpbGwgcm90YXRlIGFyb3VuZCB0aGUgY2VudGVyIG9mIG91ciBhcnJvd1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGMud2lkdGggKiAwLjUsIGMuaGVpZ2h0ICogMC41KTtcclxuICAgICAgICAgICAgLy8gUm90YXRlIHRoZSBjYW52YXMgYnkgdGhlIGRlc2lyZWQgaGVhZGluZ1xyXG4gICAgICAgICAgICBjdHgucm90YXRlKGljb25JbmZvLnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY2FudmFzIG9mZnNldCBiYWNrIHRvIGl0J3Mgb3JpZ2luYWwgcG9zaXRpb25cclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgtYy53aWR0aCAqIDAuNSwgLWMuaGVpZ2h0ICogMC41KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGZvbnQgYXMgaXQgd2lsbCBiZSBjbGVhcmVkIGJ5IHRoZSByZXNpemUuXHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250O1xyXG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gaWNvbkluZm8uY29sb3IgfHwgJ3JlZCc7XHJcblxyXG4gICAgICAgIGN0eC5maWxsVGV4dChpY29uSW5mby50ZXh0LCAwLCAwKTtcclxuICAgICAgICBpY29uSW5mby5zaXplID0geyB3aWR0aDogYy53aWR0aCwgaGVpZ2h0OiBjLmhlaWdodCB9O1xyXG4gICAgICAgIGNvbnN0IHM6IHN0cmluZyA9IGMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgaWYgKGljb25JbmZvLmlkICE9IG51bGwpIHsgTWFya2VyLk1hcmtlckNhY2hlLnNldChpY29uSW5mby5pZCwgeyBtYXJrZXJJY29uU3RyaW5nOiBzLCBtYXJrZXJTaXplOiBpY29uSW5mby5zaXplIH0pOyB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGltYWdlIG1hcmtlciBieSBhcHBseWluZyBhIHJvYXRpb24gdG8gYSBzdXBwbGllZCBpbWFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSB7QGxpbmsgSU1hcmtlckljb25JbmZvfSBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gY3JlYXRlIHRoZSBpY29uLlxyXG4gICAgICogQHJldHVybnMgLSBhIHN0cmluZyBvciBhIHByb21pc2UgZm9yIGEgc3RyaW5nIGNvbnRhaW5pbmdcclxuICAgICAqIGEgZGF0YSB1cmwgd2l0aCB0aGUgbWFya2VyIGltYWdlLiBJbiBjYXNlIG9mIGEgY2FjaGVkIGltYWdlLCB0aGUgaW1hZ2Ugd2lsbCBiZSByZXR1cm5lZCwgb3RoZXJ3aXNlIHRoZSBwcm9taXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBDcmVhdGVSb3RhdGVkSW1hZ2VNYXJrZXIoaWNvbkluZm86IElNYXJrZXJJY29uSW5mbyk6IHN0cmluZ3xQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50ID09IG51bGwpIHsgdGhyb3cgRXJyb3IoJ0RvY3VtZW50IGNvbnRleHQgKHdpbmRvdy5kb2N1bWVudCkgaXMgcmVxdWlyZWQgZm9yIHJvdGF0ZWQgaW1hZ2UgbWFya2VycycpOyB9XHJcbiAgICAgICAgaWYgKGljb25JbmZvID09IG51bGwgfHwgaWNvbkluZm8ucm90YXRpb24gPT0gbnVsbCB8fCBpY29uSW5mby51cmwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSU1hcmtlckljb25JbmZvLnJvdGF0aW9uLCBJTWFya2VySWNvbkluZm8udXJsIGFyZSByZXF1aXJlZCBmb3Igcm90YXRlZCBpbWFnZSBtYXJrZXJzLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCAmJiBNYXJrZXIuTWFya2VyQ2FjaGUuaGFzKGljb25JbmZvLmlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XHJcbiAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSBtaS5tYXJrZXJTaXplO1xyXG4gICAgICAgICAgICByZXR1cm4gbWkubWFya2VySWNvblN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZTogUHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4gPVxyXG4gICAgICAgICAgICBuZXcgUHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBBbGxvdyBjcm9zcyBkb21haW4gaW1hZ2UgZWRpdHRpbmcuXHJcbiAgICAgICAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IGljb25JbmZvLnVybDtcclxuICAgICAgICAgICAgaWYgKGljb25JbmZvLnNpemUpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLndpZHRoID0gaWNvbkluZm8uc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IGljb25JbmZvLnNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhZHM6IG51bWJlciA9IGljb25JbmZvLnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgcm90YXRlZCBpbWFnZSBzaXplLlxyXG4gICAgICAgICAgICAgICAgYy53aWR0aCA9IE1hdGguY2VpbChNYXRoLmFicyhpbWFnZS53aWR0aCAqIE1hdGguY29zKHJhZHMpKSArIE1hdGguYWJzKGltYWdlLmhlaWdodCAqIE1hdGguc2luKHJhZHMpKSk7XHJcbiAgICAgICAgICAgICAgICBjLmhlaWdodCA9IE1hdGguY2VpbChNYXRoLmFicyhpbWFnZS53aWR0aCAqIE1hdGguc2luKHJhZHMpKSArIE1hdGguYWJzKGltYWdlLmhlaWdodCAqIE1hdGguY29zKHJhZHMpKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgY2VudGVyIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKGMud2lkdGggLyAyLCBjLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICAgICAgLy8gUm90YXRlIHRoZSBjYW52YXMgdG8gdGhlIHNwZWNpZmllZCBhbmdsZSBpbiBkZWdyZWVzLlxyXG4gICAgICAgICAgICAgICAgY3R4LnJvdGF0ZShyYWRzKTtcclxuICAgICAgICAgICAgICAgIC8vIERyYXcgdGhlIGltYWdlLCBzaW5jZSB0aGUgY29udGV4dCBpcyByb3RhdGVkLCB0aGUgaW1hZ2Ugd2lsbCBiZSByb3RhdGVkIGFsc28uXHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAtaW1hZ2Uud2lkdGggLyAyLCAtaW1hZ2UuaGVpZ2h0IC8gMiwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBpY29uSW5mby5zaXplID0geyB3aWR0aDogYy53aWR0aCwgaGVpZ2h0OiBjLmhlaWdodCB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHM6IHN0cmluZyA9IGMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCkgeyBNYXJrZXIuTWFya2VyQ2FjaGUuc2V0KGljb25JbmZvLmlkLCB7IG1hcmtlckljb25TdHJpbmc6IHMsIG1hcmtlclNpemU6IGljb25JbmZvLnNpemUgfSk7IH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoe2ljb246IHMsIGljb25JbmZvOiBpY29uSW5mb30pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHJvdW5kZWQgaW1hZ2UgbWFya2VyIGJ5IGFwcGx5aW5nIGEgY2lyY2xlIG1hc2sgdG8gYSBzdXBwbGllZCBpbWFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSB7QGxpbmsgSU1hcmtlckljb25JbmZvfSBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gY3JlYXRlIHRoZSBpY29uLlxyXG4gICAgICogQHBhcmFtIGljb25JbmZvIC0gQ2FsbGJhY2sgaW52b2tlZCBvbmNlIG1hcmtlciBnZW5lcmF0aW9uIGlzIGNvbXBsZXRlLiBUaGUgY2FsbGJhY2tcclxuICAgICAqIHBhcmFtZXRlcnMgYXJlIHRoZSBkYXRhIHVyaSBhbmQgdGhlIElNYXJrZXJJY29uSW5mby5cclxuICAgICAqIEByZXR1cm5zIC0gYSBzdHJpbmcgb3IgYSBwcm9taXNlIGZvciBhIHN0cmluZyBjb250YWluaW5nXHJcbiAgICAgKiBhIGRhdGEgdXJsIHdpdGggdGhlIG1hcmtlciBpbWFnZS4gSW4gY2FzZSBvZiBhIGNhY2hlZCBpbWFnZSwgdGhlIGltYWdlIHdpbGwgYmUgcmV0dXJuZWQsIG90aGVyd2lzZSB0aGUgcHJvbWlzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgQ3JlYXRlUm91bmRlZEltYWdlTWFya2VyKGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pOiBzdHJpbmd8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudCA9PSBudWxsKSB7IHRocm93IEVycm9yKCdEb2N1bWVudCBjb250ZXh0ICh3aW5kb3cuZG9jdW1lbnQpIGlzIHJlcXVpcmVkIGZvciByb3VuZGVkIGltYWdlIG1hcmtlcnMnKTsgfVxyXG4gICAgICAgIGlmIChpY29uSW5mbyA9PSBudWxsIHx8IGljb25JbmZvLnNpemUgPT0gbnVsbCB8fCBpY29uSW5mby51cmwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSU1hcmtlckljb25JbmZvLnNpemUsIElNYXJrZXJJY29uSW5mby51cmwgYXJlIHJlcXVpcmVkIGZvciByb3VuZGVkIGltYWdlIG1hcmtlcnMuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsICYmIE1hcmtlci5NYXJrZXJDYWNoZS5oYXMoaWNvbkluZm8uaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pOiBJTWFya2VySWNvbkNhY2hlRW50cnkgPSBNYXJrZXIuTWFya2VyQ2FjaGUuZ2V0KGljb25JbmZvLmlkKTtcclxuICAgICAgICAgICAgaWNvbkluZm8uc2l6ZSA9IG1pLm1hcmtlclNpemU7XHJcbiAgICAgICAgICAgIHJldHVybiBtaS5tYXJrZXJJY29uU3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZTogUHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4gPVxyXG4gICAgICAgICAgICBuZXcgUHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByYWRpdXM6IG51bWJlciA9IGljb25JbmZvLnNpemUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQ6IElQb2ludCA9IGljb25JbmZvLmRyYXdpbmdPZmZzZXQgfHwgeyB4OiAwLCB5OiAwIH07XHJcblxyXG4gICAgICAgICAgICAvLyBBbGxvdyBjcm9zcyBkb21haW4gaW1hZ2UgZWRpdHRpbmcuXHJcbiAgICAgICAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IGljb25JbmZvLnVybDtcclxuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYzogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gYy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgYy53aWR0aCA9IGljb25JbmZvLnNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjLmhlaWdodCA9IGljb25JbmZvLnNpemUud2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRHJhdyBhIGNpcmNsZSB3aGljaCBjYW4gYmUgdXNlZCB0byBjbGlwIHRoZSBpbWFnZSwgdGhlbiBkcmF3IHRoZSBpbWFnZS5cclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5hcmMocmFkaXVzLCByYWRpdXMsIHJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguY2xpcCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgb2Zmc2V0LngsIG9mZnNldC55LCBpY29uSW5mby5zaXplLndpZHRoLCBpY29uSW5mby5zaXplLndpZHRoKTtcclxuICAgICAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSB7IHdpZHRoOiBjLndpZHRoLCBoZWlnaHQ6IGMuaGVpZ2h0IH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgczogc3RyaW5nID0gYy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsKSB7IE1hcmtlci5NYXJrZXJDYWNoZS5zZXQoaWNvbkluZm8uaWQsIHsgbWFya2VySWNvblN0cmluZzogcywgbWFya2VyU2l6ZTogaWNvbkluZm8uc2l6ZSB9KTsgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7aWNvbjogcywgaWNvbkluZm86IGljb25JbmZvfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgc2NhbGVkIGltYWdlIG1hcmtlciBieSBzY2FsaW5nIGEgc3VwcGxpZWQgaW1hZ2UgYnkgYSBmYWN0b3IgdXNpbmcgYSBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIGljb25JbmZvIC0ge0BsaW5rIElNYXJrZXJJY29uSW5mb30gY29udGFpbmluZyB0aGUgaW5mb3JtYXRpb24gbmVjZXNzYXJ5IHRvIGNyZWF0ZSB0aGUgaWNvbi5cclxuICAgICAqIEBwYXJhbSBpY29uSW5mbyAtIENhbGxiYWNrIGludm9rZWQgb25jZSBtYXJrZXIgZ2VuZXJhdGlvbiBpcyBjb21wbGV0ZS4gVGhlIGNhbGxiYWNrXHJcbiAgICAgKiBwYXJhbWV0ZXJzIGFyZSB0aGUgZGF0YSB1cmkgYW5kIHRoZSBJTWFya2VySWNvbkluZm8uXHJcbiAgICAgKiBAcmV0dXJucyAtIGEgc3RyaW5nIG9yIGEgcHJvbWlzZSBmb3IgYSBzdHJpbmcgY29udGFpbmluZ1xyXG4gICAgICogYSBkYXRhIHVybCB3aXRoIHRoZSBtYXJrZXIgaW1hZ2UuIEluIGNhc2Ugb2YgYSBjYWNoZWQgaW1hZ2UsIHRoZSBpbWFnZSB3aWxsIGJlIHJldHVybmVkLCBvdGhlcndpc2UgdGhlIHByb21pc2UuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIENyZWF0ZVNjYWxlZEltYWdlTWFya2VyKGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pOiBzdHJpbmd8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudCA9PSBudWxsKSB7IHRocm93IEVycm9yKCdEb2N1bWVudCBjb250ZXh0ICh3aW5kb3cuZG9jdW1lbnQpIGlzIHJlcXVpcmVkIGZvciBzY2FsZWQgaW1hZ2UgbWFya2VycycpOyB9XHJcbiAgICAgICAgaWYgKGljb25JbmZvID09IG51bGwgfHwgaWNvbkluZm8uc2NhbGUgPT0gbnVsbCB8fCBpY29uSW5mby51cmwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSU1hcmtlckljb25JbmZvLnNjYWxlLCBJTWFya2VySWNvbkluZm8udXJsIGFyZSByZXF1aXJlZCBmb3Igc2NhbGVkIGltYWdlIG1hcmtlcnMuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsICYmIE1hcmtlci5NYXJrZXJDYWNoZS5oYXMoaWNvbkluZm8uaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pOiBJTWFya2VySWNvbkNhY2hlRW50cnkgPSBNYXJrZXIuTWFya2VyQ2FjaGUuZ2V0KGljb25JbmZvLmlkKTtcclxuICAgICAgICAgICAgaWNvbkluZm8uc2l6ZSA9IG1pLm1hcmtlclNpemU7XHJcbiAgICAgICAgICAgIHJldHVybiBtaS5tYXJrZXJJY29uU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcm9taXNlOiBQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiA9XHJcbiAgICAgICAgICAgIG5ldyBQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBbGxvdyBjcm9zcyBkb21haW4gaW1hZ2UgZWRpdHRpbmcuXHJcbiAgICAgICAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IGljb25JbmZvLnVybDtcclxuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYzogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gYy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgYy53aWR0aCA9IGltYWdlLndpZHRoICogaWNvbkluZm8uc2NhbGU7XHJcbiAgICAgICAgICAgICAgICBjLmhlaWdodCA9IGltYWdlLmhlaWdodCAqIGljb25JbmZvLnNjYWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERyYXcgYSBjaXJjbGUgd2hpY2ggY2FuIGJlIHVzZWQgdG8gY2xpcCB0aGUgaW1hZ2UsIHRoZW4gZHJhdyB0aGUgaW1hZ2UuXHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBpY29uSW5mby5zaXplID0geyB3aWR0aDogYy53aWR0aCwgaGVpZ2h0OiBjLmhlaWdodCB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHM6IHN0cmluZyA9IGMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCkgeyBNYXJrZXIuTWFya2VyQ2FjaGUuc2V0KGljb25JbmZvLmlkLCB7IG1hcmtlckljb25TdHJpbmc6IHMsIG1hcmtlclNpemU6IGljb25JbmZvLnNpemUgfSk7IH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoe2ljb246IHMsIGljb25JbmZvOiBpY29uSW5mb30pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSBtYXJrZXIgaXMgdGhlIGZpcnN0IG1hcmtlciBpbiBhIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBJc0ZpcnN0KCk6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IElzRmlyc3QodmFsOiBib29sZWFuKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSBtYXJrZXIgaXMgdGhlIGxhc3QgbWFya2VyIGluIHRoZSBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgSXNMYXN0KCk6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IElzTGFzdCh2YWw6IGJvb2xlYW4pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgTG9jYXRpb24gb2YgdGhlIG1hcmtlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTG9jYXRpb24oKTogSUxhdExvbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgbWV0YWRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgbWFya2VyIChlLmcuIE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4pXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnk7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcclxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlcyB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IERlbGV0ZU1hcmtlcigpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFya2VyIGxhYmVsXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0TGFiZWwoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFya2VyIHZpc2liaWxpdHlcclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRWaXNpYmxlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhbmNob3IgZm9yIHRoZSBtYXJrZXIuIFVzZSB0aGlzIHRvIGFkanVzdCB0aGUgcm9vdCBsb2NhdGlvbiBmb3IgdGhlIG1hcmtlciB0byBhY2NvbW9kYXRlIHZhcmlvdXMgbWFya2VyIGltYWdlIHNpemVzLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGFuY2hvciAtIFBvaW50IGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIGFuY2hvci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRBbmNob3IoYW5jaG9yOiBJUG9pbnQpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZHJhZ2dhYmlsaXR5IG9mIGEgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFyayB0aGUgbWFya2VyIGFzIGRyYWdnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaWNvbiBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBpY29uIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGljb24gaW4gdmFyaW91cyBmb3JtcyAodXJsLCBkYXRhIHVybCwgZXRjLilcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRJY29uKGljb246IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgbGFiZWwuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gbGFiZWwgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgbGFiZWwgdG8gc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldExhYmVsKGxhYmVsOiBzdHJpbmcpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFya2VyIHBvc2l0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIGxhdExuZyAtIEdlbyBjb29yZGluYXRlcyB0byBzZXQgdGhlIG1hcmtlciBwb3NpdGlvbiB0by5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRQb3NpdGlvbihsYXRMbmc6IElMYXRMb25nKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1hcmtlciB0aXRsZS5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSB0aXRsZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSB0aXRsZSB0byBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0VGl0bGUodGl0bGU6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElNYXJrZXJPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgbWFya2VyIG9wdGlvbnMgdG8gc2V0LiBUaGUgc3VwcGxpZWQgb3B0aW9ucyBhcmVcclxuICAgICAqIG1lcmdlZCB3aXRoIHRoZSB1bmRlcmx5aW5nIG1hcmtlciBvcHRpb25zLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmxpbHR5IG9mIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIEJvb2xlYW4gd2hpY2ggZGV0ZXJtaW5lcyBpZiB0aGUgbWFya2VyIGlzIHZpc2libGUgb3Igbm90LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG59XHJcbiJdfQ==