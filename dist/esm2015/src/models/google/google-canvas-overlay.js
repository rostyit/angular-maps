/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CanvasOverlay } from '../canvas-overlay';
import { GoogleMapLabel } from './google-label';
import { Extender } from '../extender';
/**
 * Concrete implementing a canvas overlay to be placed on the map for Google Maps.
 *
 * @export
 */
export class GoogleCanvasOverlay extends CanvasOverlay {
    /**
     * Creates a new instance of the GoogleCanvasOverlay class.
     * \@memberof GoogleCanvasOverlay
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     */
    constructor(drawCallback) {
        super(drawCallback);
    }
    /**
     * Obtains geo coordinates for the click location
     *
     * \@memberof GoogleCanvasOverlay
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    GetCoordinatesFromClick(e) {
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
    }
    /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?}
     */
    GetMap() {
        return (/** @type {?} */ (this)).getMap();
    }
    /**
     * Returns a MapLabel instance for the current platform that can be used as a tooltip.
     * This method only generates the map label. Content and placement is the responsibility
     * of the caller.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?} - The label to be used for the tooltip.
     */
    GetToolTipOverlay() {
        /** @type {?} */
        const o = {
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
        const label = new GoogleMapLabel(o);
        label.SetMap(this.GetMap());
        return label;
    }
    /**
     * Called when the custom overlay is added to the map. Triggers Onload....
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    OnAdd() {
        super.OnAdd();
        this.OnLoad();
        this._canvas.style.zIndex = '100';
        // move the canvas above primitives such as polygons.
        // set the overlay to ready state
        this._readyResolver(true);
    }
    /**
     * Called whenever the canvas needs to be redrawn. This method does not do the actual
     * update, it simply scales the canvas. The actual redraw happens once the map is idle.
     * \@memberof GoogleCanvasOverly
     * \@method
     * @return {?}
     */
    OnDraw() {
        /** @type {?} */
        const isStreetView = false;
        /** @type {?} */
        const map = this.GetMap();
        if (isStreetView) {
            // Don't show the canvas if the map is in Streetside mode.
            this._canvas.style.display = 'none';
        }
        else {
            /** @type {?} */
            const zoomCurrent = map.getZoom();
            /** @type {?} */
            const centerCurrent = map.getCenter();
            /** @type {?} */
            const scale = Math.pow(2, zoomCurrent - this._zoomStart);
            /** @type {?} */
            const el = map.getDiv();
            /** @type {?} */
            const w = el.offsetWidth;
            /** @type {?} */
            const h = el.offsetHeight;
            /** @type {?} */
            const newWidth = w * scale;
            /** @type {?} */
            const newHeight = h * scale;
            /** @type {?} */
            const projection = (/** @type {?} */ (this)).getProjection();
            /** @type {?} */
            const cc = projection.fromLatLngToDivPixel(centerCurrent);
            // Update the canvas CSS position and dimensions.
            this.UpdatePosition(cc.x - newWidth / 2, cc.y - newHeight / 2, newWidth, newHeight);
        }
    }
    /**
     * CanvasOverlay loaded, attach map events for updating canvas.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    OnLoad() {
        /** @type {?} */
        const isStreetView = false;
        /** @type {?} */
        const map = (/** @type {?} */ (this)).getMap();
        // Get the current map view information.
        this._zoomStart = map.getZoom();
        /** @type {?} */
        const c = map.getCenter();
        this._centerStart = {
            latitude: c.lat(),
            longitude: c.lng()
        };
        // When the map stops moving, render new data on the canvas.
        this._viewChangeEndEvent = google.maps.event.addListener(map, 'idle', (e) => {
            this.UpdateCanvas();
        });
        // Update the position of the overlay when the map is resized.
        this._mapResizeEvent = google.maps.event.addListener(map, 'resize', (e) => {
            this.UpdateCanvas();
        });
    }
    /**
     * Associates the cnavas overlay with a map.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @param {?} map
     * @return {?}
     */
    SetMap(map) {
        (/** @type {?} */ (this)).setMap(map);
    }
    /**
     * Attaches the canvas to the map.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} el
     * @return {?}
     */
    SetCanvasElement(el) {
        /** @type {?} */
        const panes = (/** @type {?} */ (this)).getPanes();
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
    }
    /**
     * Remove the map event handlers.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    RemoveEventHandlers() {
        // Remove all event handlers from the map.
        if (this._viewChangeEndEvent) {
            google.maps.event.removeListener(this._viewChangeEndEvent);
        }
        if (this._mapResizeEvent) {
            google.maps.event.removeListener(this._mapResizeEvent);
        }
    }
    /**
     * Updates the Canvas size based on the map size.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    Resize() {
        /** @type {?} */
        const map = (/** @type {?} */ (this)).getMap();
        /** @type {?} */
        const el = map.getDiv();
        this._canvas.width = el.offsetWidth;
        this._canvas.height = el.offsetHeight;
    }
    /**
     * Updates the Canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    UpdateCanvas() {
        /** @type {?} */
        const map = (/** @type {?} */ (this)).getMap();
        // Only render the canvas if it isn't in streetside mode.
        if (true) {
            this._canvas.style.display = '';
            /** @type {?} */
            const el = map.getDiv();
            /** @type {?} */
            const w = el.offsetWidth;
            /** @type {?} */
            const h = el.offsetHeight;
            /** @type {?} */
            const centerPoint = (/** @type {?} */ (this)).getProjection().fromLatLngToDivPixel(map.getCenter());
            this.UpdatePosition((centerPoint.x - w / 2), (centerPoint.y - h / 2), w, h);
            // Redraw the canvas.
            this.Redraw(true);
            // Get the current map view information.
            this._zoomStart = map.getZoom();
            /** @type {?} */
            const c = map.getCenter();
            this._centerStart = {
                latitude: c.lat(),
                longitude: c.lng()
            };
        }
    }
}
if (false) {
    /** @type {?} */
    GoogleCanvasOverlay.prototype._viewChangeEndEvent;
    /** @type {?} */
    GoogleCanvasOverlay.prototype._mapResizeEvent;
}
/**
 * Helper function to extend the OverlayView into the CanvasOverlay
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinCanvasOverlay() {
    new Extender(GoogleCanvasOverlay)
        .Extend(new google.maps.OverlayView)
        .Map('onAdd', 'OnAdd')
        .Map('draw', 'OnDraw')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNhbnZhcy1vdmVybGF5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWNhbnZhcy1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQVF2QyxNQUFNLDBCQUEyQixTQUFRLGFBQWE7Ozs7Ozs7SUFjbEQsWUFBWSxZQUFpRDtRQUN6RCxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdkI7Ozs7Ozs7O0lBYU0sdUJBQXVCLENBQUMsQ0FBNEI7UUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FBRTtRQUNwRCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDOzs7Ozs7Ozs7SUFTNUQsTUFBTTtRQUNULE1BQU0sQ0FBQyxtQkFBTSxJQUFJLEVBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7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LElBQUksQ0FBQyxDQUFDOztZQUdsQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7WUFDaEMsTUFBTSxDQUFDLEdBQTBCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNoQixRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsU0FBUyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUU7YUFDckIsQ0FBQztTQUNMO0tBQ0o7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7QUFRRCxNQUFNO0lBRUYsSUFBSSxRQUFRLENBQUMsbUJBQW1CLENBQUM7U0FDNUIsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDbkMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7U0FDckIsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7U0FDckIsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1jb252ZXJzaW9ucyc7XHJcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi9jYW52YXMtb3ZlcmxheSc7XHJcbmltcG9ydCB7IE1hcExhYmVsIH0gZnJvbSAnLi4vbWFwLWxhYmVsJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwTGFiZWwgfSBmcm9tICcuL2dvb2dsZS1sYWJlbCc7XHJcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcclxuaW1wb3J0IHsgRXh0ZW5kZXIgfSBmcm9tICcuLi9leHRlbmRlcic7XHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIENvbmNyZXRlIGltcGxlbWVudGluZyBhIGNhbnZhcyBvdmVybGF5IHRvIGJlIHBsYWNlZCBvbiB0aGUgbWFwIGZvciBHb29nbGUgTWFwcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUNhbnZhc092ZXJsYXkgZXh0ZW5kcyBDYW52YXNPdmVybGF5IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBmaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfdmlld0NoYW5nZUVuZEV2ZW50OiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lcjtcclxuICAgIHByaXZhdGUgX21hcFJlc2l6ZUV2ZW50OiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEdvb2dsZUNhbnZhc092ZXJsYXkgY2xhc3MuXHJcbiAgICAgKiBAcGFyYW0gZHJhd0NhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FudmFzIGlzIHJlYWR5IHRvIGJlXHJcbiAgICAgKiByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbWFwIHZpZXcuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2FudmFzT3ZlcmxheVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgc3VwZXIoZHJhd0NhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIGNsaWNrIGxvY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KTogSUxhdExvbmcge1xyXG4gICAgICAgIGlmICghZSkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgIGlmICghZS5sYXRMbmcpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICBpZiAoIWUubGF0TG5nLmxhdCB8fCAhZS5sYXRMbmcubG5nKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IGUubGF0TG5nLmxhdCgpLCBsb25naXR1ZGU6IGUubGF0TG5nLmxuZygpIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXAgYXNzb2NpdGVkIHdpdGggdGhlIGxhYmVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRNYXAoKTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwIHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgTWFwTGFiZWwgaW5zdGFuY2UgZm9yIHRoZSBjdXJyZW50IHBsYXRmb3JtIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSB0b29sdGlwLlxyXG4gICAgICogVGhpcyBtZXRob2Qgb25seSBnZW5lcmF0ZXMgdGhlIG1hcCBsYWJlbC4gQ29udGVudCBhbmQgcGxhY2VtZW50IGlzIHRoZSByZXNwb25zaWJpbGl0eVxyXG4gICAgICogb2YgdGhlIGNhbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBsYWJlbCB0byBiZSB1c2VkIGZvciB0aGUgdG9vbHRpcC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRUb29sVGlwT3ZlcmxheSgpOiBNYXBMYWJlbCB7XHJcbiAgICAgICAgY29uc3QgbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcclxuICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgb2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjUpLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiaXNxdWUnLFxyXG4gICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgZm9udENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgby56SW5kZXggPSAxMDAwMDA7XHJcbiAgICAgICAgY29uc3QgbGFiZWw6IE1hcExhYmVsID0gbmV3IEdvb2dsZU1hcExhYmVsKG8pO1xyXG4gICAgICAgIGxhYmVsLlNldE1hcCh0aGlzLkdldE1hcCgpKTtcclxuICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgY3VzdG9tIG92ZXJsYXkgaXMgYWRkZWQgdG8gdGhlIG1hcC4gVHJpZ2dlcnMgT25sb2FkLi4uLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIE9uQWRkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLk9uQWRkKCk7XHJcbiAgICAgICAgdGhpcy5PbkxvYWQoKTtcclxuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuekluZGV4ID0gJzEwMCc7XHJcbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIGNhbnZhcyBhYm92ZSBwcmltaXRpdmVzIHN1Y2ggYXMgcG9seWdvbnMuXHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgb3ZlcmxheSB0byByZWFkeSBzdGF0ZVxyXG4gICAgICAgIHRoaXMuX3JlYWR5UmVzb2x2ZXIodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIGNhbnZhcyBuZWVkcyB0byBiZSByZWRyYXduLiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBkbyB0aGUgYWN0dWFsXHJcbiAgICAgKiB1cGRhdGUsIGl0IHNpbXBseSBzY2FsZXMgdGhlIGNhbnZhcy4gVGhlIGFjdHVhbCByZWRyYXcgaGFwcGVucyBvbmNlIHRoZSBtYXAgaXMgaWRsZS5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybHlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIE9uRHJhdygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc1N0cmVldFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCA9IHRoaXMuR2V0TWFwKCk7XHJcblxyXG4gICAgICAgIGlmIChpc1N0cmVldFZpZXcpIHtcclxuICAgICAgICAgICAgLy8gRG9uJ3Qgc2hvdyB0aGUgY2FudmFzIGlmIHRoZSBtYXAgaXMgaW4gU3RyZWV0c2lkZSBtb2RlLlxyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFJlLWRyYXdpbmcgdGhlIGNhbnZhcyBhcyBpdCBtb3ZlcyB3b3VsZCBiZSB0b28gc2xvdy4gSW5zdGVhZCwgc2NhbGUgYW5kIHRyYW5zbGF0ZSBjYW52YXMgZWxlbWVudC5cclxuICAgICAgICAgICAgLy8gVXBvbiBpZGxlIG9yIGRyYWcgZW5kLCB3ZSBjYW4gdGhlbiByZWRyYXcgdGhlIGNhbnZhcy4uLi5cclxuICAgICAgICAgICAgY29uc3Qgem9vbUN1cnJlbnQ6IG51bWJlciA9IG1hcC5nZXRab29tKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlckN1cnJlbnQ6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG1hcC5nZXRDZW50ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBtYXAgc2NhbGUgYmFzZWQgb24gem9vbSBsZXZlbCBkaWZmZXJlbmNlLlxyXG4gICAgICAgICAgICBjb25zdCBzY2FsZTogbnVtYmVyID0gTWF0aC5wb3coMiwgem9vbUN1cnJlbnQgLSB0aGlzLl96b29tU3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBzY2FsZWQgZGltZW5zaW9ucyBvZiB0aGUgY2FudmFzLlxyXG4gICAgICAgICAgICBjb25zdCBlbDogSFRNTERpdkVsZW1lbnQgPSBtYXAuZ2V0RGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHc6IG51bWJlciA9IGVsLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBoOiBudW1iZXIgPSBlbC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoOiBudW1iZXIgPSB3ICogc2NhbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0hlaWdodDogbnVtYmVyID0gaCAqIHNjYWxlO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG9mZnNldCBvZiBjYW52YXMgYmFzZWQgb24gem9vbSBhbmQgY2VudGVyIG9mZnNldHMuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3Rpb24gPSAoPGFueT50aGlzKS5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNjID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbChjZW50ZXJDdXJyZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY2FudmFzIENTUyBwb3NpdGlvbiBhbmQgZGltZW5zaW9ucy5cclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVQb3NpdGlvbihjYy54IC0gbmV3V2lkdGggLyAyLCBjYy55IC0gbmV3SGVpZ2h0IC8gMiwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FudmFzT3ZlcmxheSBsb2FkZWQsIGF0dGFjaCBtYXAgZXZlbnRzIGZvciB1cGRhdGluZyBjYW52YXMuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2FudmFzT3ZlcmxheVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgT25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzU3RyZWV0VmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwID0gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBtYXAgdmlldyBpbmZvcm1hdGlvbi5cclxuICAgICAgICB0aGlzLl96b29tU3RhcnQgPSBtYXAuZ2V0Wm9vbSgpO1xyXG4gICAgICAgIGNvbnN0IGM6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG1hcC5nZXRDZW50ZXIoKTtcclxuICAgICAgICB0aGlzLl9jZW50ZXJTdGFydCA9IHtcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IGMubGF0KCksXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogYy5sbmcoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFdoZW4gdGhlIG1hcCBzdG9wcyBtb3ZpbmcsIHJlbmRlciBuZXcgZGF0YSBvbiB0aGUgY2FudmFzLlxyXG4gICAgICAgIHRoaXMuX3ZpZXdDaGFuZ2VFbmRFdmVudCA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2lkbGUnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FudmFzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgd2hlbiB0aGUgbWFwIGlzIHJlc2l6ZWQuXHJcbiAgICAgICAgdGhpcy5fbWFwUmVzaXplRXZlbnQgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdyZXNpemUnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FudmFzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBc3NvY2lhdGVzIHRoZSBjbmF2YXMgb3ZlcmxheSB3aXRoIGEgbWFwLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE1hcChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCk6IHZvaWQge1xyXG4gICAgICAgICg8YW55PnRoaXMpLnNldE1hcChtYXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjYW52YXMgdG8gdGhlIG1hcC5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBTZXRDYW52YXNFbGVtZW50KGVsOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBhbmVzID0gKDxhbnk+dGhpcykuZ2V0UGFuZXMoKTtcclxuICAgICAgICBpZiAocGFuZXMpIHtcclxuICAgICAgICAgICAgaWYgKGVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHBhbmVzLm92ZXJsYXlMYXllci5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICAgICAgICAgICAgICAvLyA0OiBmbG9hdFBhbmUgKGluZm93aW5kb3cpXHJcbiAgICAgICAgICAgICAgICAvLyAzOiBvdmVybGF5TW91c2VUYXJnZXQgKG1vdXNlIGV2ZW50cylcclxuICAgICAgICAgICAgICAgIC8vIDI6IG1hcmtlckxheWVyIChtYXJrZXIgaW1hZ2VzKVxyXG4gICAgICAgICAgICAgICAgLy8gMTogb3ZlcmxheUxheWVyIChwb2x5Z29ucywgcG9seWxpbmVzLCBncm91bmQgb3ZlcmxheXMsIHRpbGUgbGF5ZXIgb3ZlcmxheXMpXHJcbiAgICAgICAgICAgICAgICAvLyAwOiBtYXBQYW5lIChsb3dlc3QgcGFuZSBhYm92ZSB0aGUgbWFwIHRpbGVzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFuZXMub3ZlcmxheUxheWVyLnJlbW92ZUNoaWxkKHRoaXMuX2NhbnZhcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgdGhlIG1hcCBldmVudCBoYW5kbGVycy5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBSZW1vdmVFdmVudEhhbmRsZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnQgaGFuZGxlcnMgZnJvbSB0aGUgbWFwLlxyXG4gICAgICAgIGlmICh0aGlzLl92aWV3Q2hhbmdlRW5kRXZlbnQpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fdmlld0NoYW5nZUVuZEV2ZW50KTsgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXBSZXNpemVFdmVudCkgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tYXBSZXNpemVFdmVudCk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIENhbnZhcyBzaXplIGJhc2VkIG9uIHRoZSBtYXAgc2l6ZS5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBSZXNpemUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAgPSAoPGFueT50aGlzKS5nZXRNYXAoKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgY2FudmFzIGJ5IHVwZGF0aW5nIGRpbWVuc2lvbnMuIFRoaXMgYWxzbyBlbnN1cmVzIGNhbnZhcyBzdGF5cyB0aGUgc2FtZSBzaXplIGFzIHRoZSBtYXAuXHJcbiAgICAgICAgY29uc3QgZWw6IEhUTUxEaXZFbGVtZW50ID0gbWFwLmdldERpdigpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBDYW52YXMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgVXBkYXRlQ2FudmFzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwID0gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XHJcblxyXG4gICAgICAgIC8vIE9ubHkgcmVuZGVyIHRoZSBjYW52YXMgaWYgaXQgaXNuJ3QgaW4gc3RyZWV0c2lkZSBtb2RlLlxyXG4gICAgICAgIGlmICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCBDU1MgcG9zaXRpb24gYW5kIGRpbWVuc2lvbnMgb2YgY2FudmFzLlxyXG4gICAgICAgICAgICBjb25zdCBlbDogSFRNTERpdkVsZW1lbnQgPSBtYXAuZ2V0RGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHc6IG51bWJlciA9IGVsLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBoOiBudW1iZXIgPSBlbC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlclBvaW50ID0gKDxhbnk+dGhpcykuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb0RpdlBpeGVsKG1hcC5nZXRDZW50ZXIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlUG9zaXRpb24oKGNlbnRlclBvaW50LnggLSB3IC8gMiksIChjZW50ZXJQb2ludC55IC0gaCAvIDIpLCB3LCBoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlZHJhdyB0aGUgY2FudmFzLlxyXG4gICAgICAgICAgICB0aGlzLlJlZHJhdyh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBtYXAgdmlldyBpbmZvcm1hdGlvbi5cclxuICAgICAgICAgICAgdGhpcy5fem9vbVN0YXJ0ID0gbWFwLmdldFpvb20oKTtcclxuICAgICAgICAgICAgY29uc3QgYzogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gbWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50ZXJTdGFydCA9IHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBjLmxuZygpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGV4dGVuZCB0aGUgT3ZlcmxheVZpZXcgaW50byB0aGUgQ2FudmFzT3ZlcmxheVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBtZXRob2RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNaXhpbkNhbnZhc092ZXJsYXkoKSB7XHJcblxyXG4gICAgbmV3IEV4dGVuZGVyKEdvb2dsZUNhbnZhc092ZXJsYXkpXHJcbiAgICAgICAgLkV4dGVuZChuZXcgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpXHJcbiAgICAgICAgLk1hcCgnb25BZGQnLCAnT25BZGQnKVxyXG4gICAgICAgIC5NYXAoJ2RyYXcnLCAnT25EcmF3JylcclxuICAgICAgICAuTWFwKCdvblJlbW92ZScsICdPblJlbW92ZScpO1xyXG59XHJcbiJdfQ==