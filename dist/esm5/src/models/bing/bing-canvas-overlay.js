/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BingConversions } from '../../services/bing/bing-conversions';
import { CanvasOverlay } from '../canvas-overlay';
import { BingMapLabel } from './bing-label';
import { Extender } from '../extender';
/**
 * Concrete implementing a canvas overlay to be placed on the map for Bing Maps.
 *
 * @export
 */
var /**
 * Concrete implementing a canvas overlay to be placed on the map for Bing Maps.
 *
 * @export
 */
BingCanvasOverlay = /** @class */ (function (_super) {
    tslib_1.__extends(BingCanvasOverlay, _super);
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
        return (/** @type {?} */ (this)).getMap();
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
        var map = (/** @type {?} */ (this)).getMap();
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
                var pixelPoints = /** @type {?} */ (map.tryLocationToPixel([
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
        (/** @type {?} */ (this)).setHtmlElement(el);
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
        var map = (/** @type {?} */ (this)).getMap();
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
        var map = (/** @type {?} */ (this)).getMap();
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
 * Concrete implementing a canvas overlay to be placed on the map for Bing Maps.
 *
 * @export
 */
export { BingCanvasOverlay };
if (false) {
    /** @type {?} */
    BingCanvasOverlay.prototype._viewChangeEvent;
    /** @type {?} */
    BingCanvasOverlay.prototype._viewChangeEndEvent;
    /** @type {?} */
    BingCanvasOverlay.prototype._mapResizeEvent;
}
/**
 * Helper function to extend the OverlayView into the CanvasOverlay
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinCanvasOverlay() {
    new Extender(BingCanvasOverlay)
        .Extend(new Microsoft.Maps.CustomOverlay())
        .Map('onAdd', 'OnAdd')
        .Map('onLoad', 'OnLoad')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jYW52YXMtb3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWNhbnZhcy1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQU92Qzs7Ozs7QUFBQTtJQUF1Qyw2Q0FBYTtJQVVoRDs7Ozs7T0FLRztJQUNILDJCQUFZLFlBQWlEO2VBQ3pELGtCQUFNLFlBQVksQ0FBQztLQUN0Qjs7Ozs7Ozs7O0lBY00sbURBQXVCOzs7Ozs7OztjQUFDLENBQWlDO1FBQzVELE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7Ozs7O0lBU3ZFLGtDQUFNOzs7Ozs7OztRQUNULE1BQU0sQ0FBQyxtQkFBTSxJQUFJLEVBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7SUFZekIsNkNBQWlCOzs7Ozs7Ozs7OztRQUNwQixJQUFNLENBQUMsR0FBMkI7WUFDOUIsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLGVBQWUsRUFBRSxRQUFRO1lBQ3pCLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLEVBQUU7WUFDWixTQUFTLEVBQUUsU0FBUztZQUNwQixZQUFZLEVBQUUsQ0FBQztTQUNsQixDQUFD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QUM5QixNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1NBQ3JCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQ3ZCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMnO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBNYXBMYWJlbCB9IGZyb20gJy4uL21hcC1sYWJlbCc7XHJcbmltcG9ydCB7IEJpbmdNYXBMYWJlbCB9IGZyb20gJy4vYmluZy1sYWJlbCc7XHJcbmltcG9ydCB7IEV4dGVuZGVyIH0gZnJvbSAnLi4vZXh0ZW5kZXInO1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGluZyBhIGNhbnZhcyBvdmVybGF5IHRvIGJlIHBsYWNlZCBvbiB0aGUgbWFwIGZvciBCaW5nIE1hcHMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5nQ2FudmFzT3ZlcmxheSBleHRlbmRzIENhbnZhc092ZXJsYXkge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIGZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF92aWV3Q2hhbmdlRXZlbnQ6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICBwcml2YXRlIF92aWV3Q2hhbmdlRW5kRXZlbnQ6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XHJcbiAgICBwcml2YXRlIF9tYXBSZXNpemVFdmVudDogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBCaW5nQ2FudmFzT3ZlcmxheSBjbGFzcy5cclxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcclxuICAgICAqIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtYXAgdmlldy5cclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2FudmFzT3ZlcmxheVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgc3VwZXIoZHJhd0NhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC4gRXhwZWN0ZWQgdG8gaW1wbGVtZW50IHtAbGluayBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3N9LlxyXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NhbnZhc092ZXJsYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncyk6IElMYXRMb25nIHtcclxuICAgICAgICByZXR1cm4geyBsYXRpdHVkZTogZS5sb2NhdGlvbi5sYXRpdHVkZSwgbG9uZ2l0dWRlOiBlLmxvY2F0aW9uLmxvbmdpdHVkZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFwIGFzc29jaXRlZCB3aXRoIHRoZSBsYWJlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE1hcCgpOiBNaWNyb3NvZnQuTWFwcy5NYXAge1xyXG4gICAgICAgIHJldHVybiAoPGFueT50aGlzKS5nZXRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBNYXBMYWJlbCBpbnN0YW5jZSBmb3IgdGhlIGN1cnJlbnQgcGxhdGZvcm0gdGhhdCBjYW4gYmUgdXNlZCBhcyBhIHRvb2x0aXAuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBvbmx5IGdlbmVyYXRlcyB0aGUgbWFwIGxhYmVsLiBDb250ZW50IGFuZCBwbGFjZW1lbnQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5XHJcbiAgICAgKiBvZiB0aGUgY2FsbGVyLiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgcmV0dXJucyBudWxsIHVudGlsIE9uTG9hZCBoYXMgYmVlbiBjYWxsZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgbGFiZWwgdG8gYmUgdXNlZCBmb3IgdGhlIHRvb2x0aXAuXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFRvb2xUaXBPdmVybGF5KCk6IE1hcExhYmVsIHtcclxuICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2Jpc3F1ZScsXHJcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBsYWJlbDogTWFwTGFiZWwgPSBuZXcgQmluZ01hcExhYmVsKG8pO1xyXG4gICAgICAgIGxhYmVsLlNldE1hcCh0aGlzLkdldE1hcCgpKTtcclxuICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW52YXNPdmVybGF5IGxvYWRlZCwgYXR0YWNoIG1hcCBldmVudHMgZm9yIHVwZGF0aW5nIGNhbnZhcy5cclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDYW52YXNPdmVybGF5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBPbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc3QgbWFwOiBNaWNyb3NvZnQuTWFwcy5NYXAgPSAoPGFueT50aGlzKS5nZXRNYXAoKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGluZm9ybWF0aW9uLlxyXG4gICAgICAgIHRoaXMuX3pvb21TdGFydCA9IG1hcC5nZXRab29tKCk7XHJcbiAgICAgICAgdGhpcy5fY2VudGVyU3RhcnQgPSA8SUxhdExvbmc+bWFwLmdldENlbnRlcigpO1xyXG5cclxuICAgICAgICAvLyBSZWRyYXcgdGhlIGNhbnZhcy5cclxuICAgICAgICB0aGlzLlJlZHJhdyh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgbWFwIG1vdmVzLCBtb3ZlIHRoZSBjYW52YXMgYWNjb3JkaW5nbHkuXHJcbiAgICAgICAgdGhpcy5fdmlld0NoYW5nZUV2ZW50ID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobWFwLCAndmlld2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXAuZ2V0TWFwVHlwZUlkKCkgPT09IE1pY3Jvc29mdC5NYXBzLk1hcFR5cGVJZC5zdHJlZXRzaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBzaG93IHRoZSBjYW52YXMgaWYgdGhlIG1hcCBpcyBpbiBTdHJlZXRzaWRlIG1vZGUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlLWRyYXdpbmcgdGhlIGNhbnZhcyBhcyBpdCBtb3ZlcyB3b3VsZCBiZSB0b28gc2xvdy4gSW5zdGVhZCwgc2NhbGUgYW5kIHRyYW5zbGF0ZSBjYW52YXMgZWxlbWVudC5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHpvb21DdXJyZW50OiBudW1iZXIgPSBtYXAuZ2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VudGVyQ3VycmVudDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBtYXAuZ2V0Q2VudGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG1hcCBzY2FsZSBiYXNlZCBvbiB6b29tIGxldmVsIGRpZmZlcmVuY2UuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZTogbnVtYmVyID0gTWF0aC5wb3coMiwgem9vbUN1cnJlbnQgLSB0aGlzLl96b29tU3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgc2NhbGVkIGRpbWVuc2lvbnMgb2YgdGhlIGNhbnZhcy5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoOiBudW1iZXIgPSBtYXAuZ2V0V2lkdGgoKSAqIHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SGVpZ2h0OiBudW1iZXIgPSBtYXAuZ2V0SGVpZ2h0KCkgKiBzY2FsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgb2Zmc2V0IG9mIGNhbnZhcyBiYXNlZCBvbiB6b29tIGFuZCBjZW50ZXIgb2Zmc2V0cy5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpeGVsUG9pbnRzOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Qb2ludD4gPSA8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+Pm1hcC50cnlMb2NhdGlvblRvUGl4ZWwoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24odGhpcy5fY2VudGVyU3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJDdXJyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgXSwgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXJPZmZzZXRYOiBudW1iZXIgPSBwaXhlbFBvaW50c1sxXS54IC0gcGl4ZWxQb2ludHNbMF0ueDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRlck9mZnNldFk6IG51bWJlciA9IHBpeGVsUG9pbnRzWzFdLnkgLSBwaXhlbFBvaW50c1swXS55O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeDogbnVtYmVyID0gKC0obmV3V2lkdGggLSBtYXAuZ2V0V2lkdGgoKSkgLyAyKSAtIGNlbnRlck9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5OiBudW1iZXIgPSAoLShuZXdIZWlnaHQgLSBtYXAuZ2V0SGVpZ2h0KCkpIC8gMikgLSBjZW50ZXJPZmZzZXRZO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY2FudmFzIENTUyBwb3NpdGlvbiBhbmQgZGltZW5zaW9ucy5cclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlUG9zaXRpb24oeCwgeSwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgbWFwIHN0b3BzIG1vdmluZywgcmVuZGVyIG5ldyBkYXRhIG9uIHRoZSBjYW52YXMuXHJcbiAgICAgICAgdGhpcy5fdmlld0NoYW5nZUVuZEV2ZW50ID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobWFwLCAndmlld2NoYW5nZWVuZCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FudmFzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgd2hlbiB0aGUgbWFwIGlzIHJlc2l6ZWQuXHJcbiAgICAgICAgdGhpcy5fbWFwUmVzaXplRXZlbnQgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihtYXAsICdtYXByZXNpemUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUNhbnZhcygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIG92ZXJsYXkgdG8gcmVhZHkgc3RhdGVcclxuICAgICAgICB0aGlzLl9yZWFkeVJlc29sdmVyKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFwIGZvciB0aGUgbGFiZWwuIFNldHRpbmdzIHRoaXMgdG8gbnVsbCByZW1vdmUgdGhlIGxhYmVsIGZyb20gaHRlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0gTWFwIHRvIGFzc29jaWF0ZWQgd2l0aCB0aGUgbGFiZWwuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0TWFwKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbTogTWljcm9zb2Z0Lk1hcHMuTWFwID0gdGhpcy5HZXRNYXAoKTtcclxuICAgICAgICBpZiAobWFwID09PSBtKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgIG0ubGF5ZXJzLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1hcC5sYXllcnMuaW5zZXJ0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2FudmFzIHRvIHRoZSBtYXAuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgU2V0Q2FudmFzRWxlbWVudChlbDogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICAoPGFueT50aGlzKS5zZXRIdG1sRWxlbWVudChlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgdGhlIG1hcCBldmVudCBoYW5kbGVycy5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBSZW1vdmVFdmVudEhhbmRsZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnQgaGFuZGxlcnMgZnJvbSB0aGUgbWFwLlxyXG4gICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX3ZpZXdDaGFuZ2VFdmVudCk7XHJcbiAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fdmlld0NoYW5nZUVuZEV2ZW50KTtcclxuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tYXBSZXNpemVFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBDYW52YXMgc2l6ZSBiYXNlZCBvbiB0aGUgbWFwIHNpemUuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgUmVzaXplKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwID0gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIGNhbnZhcyBieSB1cGRhdGluZyBkaW1lbnNpb25zLiBUaGlzIGFsc28gZW5zdXJlcyBjYW52YXMgc3RheXMgdGhlIHNhbWUgc2l6ZSBhcyB0aGUgbWFwLlxyXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IG1hcC5nZXRXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBtYXAuZ2V0SGVpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBDYW52YXMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgVXBkYXRlQ2FudmFzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwID0gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XHJcblxyXG4gICAgICAgIC8vIE9ubHkgcmVuZGVyIHRoZSBjYW52YXMgaWYgaXQgaXNuJ3QgaW4gc3RyZWV0c2lkZSBtb2RlLlxyXG4gICAgICAgIGlmIChtYXAuZ2V0TWFwVHlwZUlkKCkgIT09IE1pY3Jvc29mdC5NYXBzLk1hcFR5cGVJZC5zdHJlZXRzaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCBDU1MgcG9zaXRpb24gYW5kIGRpbWVuc2lvbnMgb2YgY2FudmFzLlxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVBvc2l0aW9uKDAsIDAsIG1hcC5nZXRXaWR0aCgpLCBtYXAuZ2V0SGVpZ2h0KCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVkcmF3IHRoZSBjYW52YXMuXHJcbiAgICAgICAgICAgIHRoaXMuUmVkcmF3KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLl96b29tU3RhcnQgPSBtYXAuZ2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50ZXJTdGFydCA9IDxJTGF0TG9uZz5tYXAuZ2V0Q2VudGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGV4dGVuZCB0aGUgT3ZlcmxheVZpZXcgaW50byB0aGUgQ2FudmFzT3ZlcmxheVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBtZXRob2RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNaXhpbkNhbnZhc092ZXJsYXkoKSB7XHJcblxyXG4gICAgbmV3IEV4dGVuZGVyKEJpbmdDYW52YXNPdmVybGF5KVxyXG4gICAgLkV4dGVuZChuZXcgTWljcm9zb2Z0Lk1hcHMuQ3VzdG9tT3ZlcmxheSgpKVxyXG4gICAgLk1hcCgnb25BZGQnLCAnT25BZGQnKVxyXG4gICAgLk1hcCgnb25Mb2FkJywgJ09uTG9hZCcpXHJcbiAgICAuTWFwKCdvblJlbW92ZScsICdPblJlbW92ZScpO1xyXG59XHJcbiJdfQ==