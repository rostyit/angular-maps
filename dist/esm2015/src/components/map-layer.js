/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ContentChildren, Input, ViewContainerRef } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapMarkerDirective } from './map-marker';
/** *
 * internal counter to use as ids for multiple layers.
  @type {?} */
let layerId = 0;
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
export class MapLayerDirective {
    /**
     * Creates an instance of MapLayerDirective.
     * \@memberof MapLayerDirective
     * @param {?} _layerService - Concreted implementation of a layer service for the underlying maps implementations.
     * Generally provided via injections.
     * @param {?} _containerRef - Reference to the container hosting the map canvas. Generally provided via injection.
     *
     */
    constructor(_layerService, _containerRef) {
        this._layerService = _layerService;
        this._containerRef = _containerRef;
        this._visible = true;
        this._addedToManager = false;
        this._id = layerId++;
    }
    /**
     * Gets or sets the layer visibility.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    get Visible() { return this._visible; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Visible(val) { this._visible = val; }
    /**
     * Gets the layer id.
     *
     * \@readonly
     * \@memberof MapLayerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    ngOnInit() {
        this._containerRef.element.nativeElement.attributes['layerId'] = this._id.toString();
        this._layerService.AddLayer(this);
        this._addedToManager = true;
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['Visible']) {
            this._layerService.GetNativeLayer(this).then(l => {
                l.SetVisible(!l.GetVisible());
            });
        }
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._layerService.DeleteLayer(this);
    }
}
MapLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-layer'
            },] },
];
/** @nocollapse */
MapLayerDirective.ctorParameters = () => [
    { type: LayerService },
    { type: ViewContainerRef }
];
MapLayerDirective.propDecorators = {
    _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
    Visible: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MapLayerDirective.prototype._visible;
    /** @type {?} */
    MapLayerDirective.prototype._addedToManager;
    /** @type {?} */
    MapLayerDirective.prototype._id;
    /** @type {?} */
    MapLayerDirective.prototype._markers;
    /** @type {?} */
    MapLayerDirective.prototype._layerService;
    /** @type {?} */
    MapLayerDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUNkLGVBQWUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUtsRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ2hCLE1BQU07Ozs7Ozs7OztJQTRDRixZQUFzQixhQUEyQixFQUFZLGFBQStCO1FBQXRFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVksa0JBQWEsR0FBYixhQUFhLENBQWtCO3dCQXZDdkUsSUFBSTsrQkFDRyxLQUFLO1FBdUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0tBQ3hCOzs7Ozs7O0lBMUJELElBQ2UsT0FBTyxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Ozs7O1FBQzVDLE9BQU8sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O1FBUWhELEVBQUUsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztJQTJCbkMsUUFBUTtRQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyRixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7OztJQVV6QixXQUFXLENBQUMsT0FBNkM7UUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM3QyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDakMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7OztJQVNFLFdBQVc7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztZQXpGNUMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2FBQzFCOzs7O1lBckNRLFlBQVk7WUFETyxnQkFBZ0I7Ozt1QkFnRHZDLGVBQWUsU0FBQyxrQkFBa0I7c0JBV2xDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgU2ltcGxlQ2hhbmdlLFxyXG4gICAgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcclxuXHJcbi8qKlxyXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIG11bHRpcGxlIGxheWVycy5cclxuICovXHJcbmxldCBsYXllcklkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBNYXBMYXllckRpcmVjdGl2ZSBjcmVhdGVzIGEgbGF5ZXIgb24gYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmV9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAubWFwLWNvbnRhaW5lciB7XHJcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgIH1cclxuICogYF0sXHJcbiAqIHRlbXBsYXRlOiBgXHJcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW1pvb21dPSd6b29tJz5cclxuICogICAgIDx4LW1hcC1sYXllciBbVmlzaWJsZV09J3Zpc2libGUnPlxyXG4gKiAgICAgICAgIDx4LW1hcC1tYXJrZXIgW0xhdGl0dWRlXT0nbGF0JyBbTG9uZ2l0dWRlXT0nbG5nJyBbTGFiZWxdPScnTScnPjwveC1tYXAtbWFya2VyPlxyXG4gKiAgICAgPC94LW1hcC1sYXllcj5cclxuICogICA8L3gtbWFwPlxyXG4gKiBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAneC1tYXAtbGF5ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBMYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcm90ZWN0ZWQgX3Zpc2libGUgPSB0cnVlO1xyXG4gICAgcHJvdGVjdGVkIF9hZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xyXG4gICAgcHJvdGVjdGVkIF9pZDogbnVtYmVyO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWFwTWFya2VyRGlyZWN0aXZlKSBwcm90ZWN0ZWQgX21hcmtlcnM6IEFycmF5PE1hcE1hcmtlckRpcmVjdGl2ZT47XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbGF5ZXIgdmlzaWJpbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgICAgICBwdWJsaWMgZ2V0IFZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl92aXNpYmxlOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBWaXNpYmxlKHZhbDogYm9vbGVhbikgeyB0aGlzLl92aXNpYmxlID0gdmFsOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsYXllciBpZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwTGF5ZXJEaXJlY3RpdmUuXHJcbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIENvbmNyZXRlZCBpbXBsZW1lbnRhdGlvbiBvZiBhIGxheWVyIHNlcnZpY2UgZm9yIHRoZSB1bmRlcmx5aW5nIG1hcHMgaW1wbGVtZW50YXRpb25zLlxyXG4gICAgICogR2VuZXJhbGx5IHByb3ZpZGVkIHZpYSBpbmplY3Rpb25zLlxyXG4gICAgICogQHBhcmFtIF9jb250YWluZXJSZWYgLSBSZWZlcmVuY2UgdG8gdGhlIGNvbnRhaW5lciBob3N0aW5nIHRoZSBtYXAgY2FudmFzLiBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSwgcHJvdGVjdGVkIF9jb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGxheWVySWQrKztcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gQ29tcG9uZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10gPSB0aGlzLl9pZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5BZGRMYXllcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBjaGFuZ2VzIHRvIHRoZSBkYXRhYm91ZCBwcm9wZXJ0aWVzIG9jY3VyLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIENoYW5nZXMgdGhhdCBoYXZlIG9jY3VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKHRoaXMpLnRoZW4obCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsLlNldFZpc2libGUoIWwuR2V0VmlzaWJsZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5EZWxldGVMYXllcih0aGlzKTtcclxuICAgIH1cclxufVxyXG4iXX0=