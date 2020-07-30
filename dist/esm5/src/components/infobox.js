/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { InfoBoxService } from '../services/infobox.service';
import { MapMarkerDirective } from './map-marker';
import { InfoBoxActionDirective } from './infobox-action';
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
var InfoBoxComponent = /** @class */ (function () {
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
        this.InfoBoxClose = new EventEmitter();
    }
    Object.defineProperty(InfoBoxComponent.prototype, "HtmlContent", {
        get: /**
         * Gets the HTML content of the info box.
         *
         * \@readonly
         * \@memberof InfoBoxComponent
         * @return {?}
         */
        function () {
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
         */
        function () { return this._id; },
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
        { type: Component, args: [{
                    selector: 'x-info-box',
                    template: "\n        <div #infoBoxContent class='info-box-content'>\n            <ng-content></ng-content>\n        </div>",
                    styles: ["\n        x-map .MicrosoftMap .Infobox .infobox-title { padding: 10px 10px 5px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-info { padding: 3px 10px 10px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-actions { height: auto }\n    "],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    InfoBoxComponent.ctorParameters = function () { return [
        { type: InfoBoxService }
    ]; };
    InfoBoxComponent.propDecorators = {
        _content: [{ type: ViewChild, args: ['infoBoxContent',] }],
        InfoWindowActions: [{ type: ContentChildren, args: [InfoBoxActionDirective,] }],
        Latitude: [{ type: Input }],
        Longitude: [{ type: Input }],
        Title: [{ type: Input }],
        Description: [{ type: Input }],
        DisableAutoPan: [{ type: Input }],
        MaxWidth: [{ type: Input }],
        Modal: [{ type: Input }],
        HostMarker: [{ type: Input }],
        Visible: [{ type: Input }],
        xOffset: [{ type: Input }],
        yOffset: [{ type: Input }],
        CloseInfoBoxesOnOpen: [{ type: Input }],
        InfoBoxClose: [{ type: Output }]
    };
    return InfoBoxComponent;
}());
export { InfoBoxComponent };
if (false) {
    /** @type {?} */
    InfoBoxComponent.prototype._infoBoxAddedToManager;
    /** @type {?} */
    InfoBoxComponent.prototype._id;
    /**
     * HTML conent of the infobox
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype._content;
    /**
     * Zero or more actions to show on the info window
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.InfoWindowActions;
    /**
     * The latitude position of the info window (only usefull if you use it ouside of a {\@link MapMarker}).
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Latitude;
    /**
     * The longitude position of the info window (only usefull if you use it ouside of a {\@link MapMarker}).
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Longitude;
    /**
     * The title to display in the info window
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Title;
    /**
     * The description to display in the info window.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Description;
    /**
     * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
     * visible when it opens.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.DisableAutoPan;
    /**
     *  Maximum width of the infowindow, regardless of content's width. This value is only considered
     *  if it is set before a call to open. To change the maximum width when changing content, call
     *  close, update maxWidth, and then open.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.MaxWidth;
    /**
     * Determine whether only one infobox can be open at a time. Note that ANY info box settings.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Modal;
    /**
     * Holds the marker that is the host of the info window (if available)
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.HostMarker;
    /**
     * Determines visibility of infobox
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Visible;
    /**
     * Horizontal offset of the infobox from the host marker lat/long or the sepecified coordinates.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.xOffset;
    /**
     * Vertical offset for the infobox from the host marker lat/long or the specified coordinates.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.yOffset;
    /**
     * Determines if other info boxes should be closed before opening this one
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.CloseInfoBoxesOnOpen;
    /**
     * Emits an event when the info window is closed.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.InfoBoxClose;
    /** @type {?} */
    InfoBoxComponent.prototype._infoBoxService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb2JveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2luZm9ib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBSzFELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0TGQsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7O09BS0c7SUFDSCwwQkFBb0IsZUFBK0I7UUFBL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO3NDQXZKbEIsS0FBSzttQkFDaEIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTs7Ozs7O3FCQW1FdEIsSUFBSTs7Ozs7O3VCQWNGLEtBQUs7Ozs7OztvQ0FxQlEsSUFBSTs7Ozs7OzRCQVdXLElBQUksWUFBWSxFQUFVO0tBcUN4QjswQkF6QjdDLHlDQUFXOzs7Ozs7Ozs7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM5SCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEs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LENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUFFO1FBQzNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFBRTtZQUMxRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7OztnQkFyUnRELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLGlIQUdDO29CQUNYLE1BQU0sRUFBRSxDQUFDLHlQQUlSLENBQUM7b0JBQ0YsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7O2dCQWhEUSxjQUFjOzs7MkJBOERsQixTQUFTLFNBQUMsZ0JBQWdCO29DQU8xQixlQUFlLFNBQUMsc0JBQXNCOzJCQVF0QyxLQUFLOzRCQU9MLEtBQUs7d0JBT0wsS0FBSzs4QkFPTCxLQUFLO2lDQVFMLEtBQUs7MkJBU0wsS0FBSzt3QkFPTCxLQUFLOzZCQU9MLEtBQUs7MEJBT0wsS0FBSzswQkFPTCxLQUFLOzBCQU9MLEtBQUs7dUNBT0wsS0FBSzsrQkFXTCxNQUFNOzsyQkF6TFg7O1NBa0VhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29udGVudENoaWxkcmVuLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUXVlcnlMaXN0LFxyXG4gICAgU2ltcGxlQ2hhbmdlLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IEluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaW5mb2JveC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcclxuaW1wb3J0IHsgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vaW5mb2JveC1hY3Rpb24nO1xyXG5cclxuLyoqXHJcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgbXVsdGlwbGUgaW5mb2JveGVzLlxyXG4gKi9cclxubGV0IGluZm9Cb3hJZCA9IDA7XHJcblxyXG4vKipcclxuICogSW5mb0JveCByZW5kZXJzIGEgaW5mbyB3aW5kb3cgaW5zaWRlIGEge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb3Igc3RhbmRhbG9uZS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmUsIEluZm9Cb3hDb21wb25lbnQsIEluZm9Cb3hBY3Rpb25EaXJlY3RpdmV9IGZyb20gJy4uLic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAgLm1hcC1jb250YWluZXIgeyBoZWlnaHQ6IDMwMHB4OyB9XHJcbiAqIGBdLFxyXG4gKiAgdGVtcGxhdGU6IGBcclxuICogICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj5cclxuICogICAgICA8eC1tYXAtbWFya2VyIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtMYWJlbF09XCInTSdcIj5cclxuICogICAgICAgIDx4LWluZm8tYm94IFtEaXNhYmxlQXV0b1Bhbl09XCJ0cnVlXCI+XHJcbiAqICAgICAgICAgIEhpLCB0aGlzIGlzIHRoZSBjb250ZW50IG9mIHRoZSA8c3Ryb25nPmluZm8gd2luZG93PC9zdHJvbmc+XHJcbiAqICAgICAgICAgPC94LWluZm8tYm94PlxyXG4gKiAgICAgICA8L3gtbWFwLW1hcmtlcj5cclxuICogICAgIDwveC1tYXA+XHJcbiAqICBgXHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAneC1pbmZvLWJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2luZm9Cb3hDb250ZW50IGNsYXNzPSdpbmZvLWJveC1jb250ZW50Jz5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgeC1tYXAgLk1pY3Jvc29mdE1hcCAuSW5mb2JveCAuaW5mb2JveC10aXRsZSB7IHBhZGRpbmc6IDEwcHggMTBweCA1cHggMTBweCB9XHJcbiAgICAgICAgeC1tYXAgLk1pY3Jvc29mdE1hcCAuSW5mb2JveCAuaW5mb2JveC1pbmZvIHsgcGFkZGluZzogM3B4IDEwcHggMTBweCAxMHB4IH1cclxuICAgICAgICB4LW1hcCAuTWljcm9zb2Z0TWFwIC5JbmZvYm94IC5pbmZvYm94LWFjdGlvbnMgeyBoZWlnaHQ6IGF1dG8gfVxyXG4gICAgYF0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbmZvQm94Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF9pbmZvQm94QWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmcgPSAoaW5mb0JveElkKyspLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIVE1MIGNvbmVudCBvZiB0aGUgaW5mb2JveFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoJ2luZm9Cb3hDb250ZW50JykgcHJpdmF0ZSBfY29udGVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFplcm8gb3IgbW9yZSBhY3Rpb25zIHRvIHNob3cgb24gdGhlIGluZm8gd2luZG93XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQENvbnRlbnRDaGlsZHJlbihJbmZvQm94QWN0aW9uRGlyZWN0aXZlKSBwdWJsaWMgSW5mb1dpbmRvd0FjdGlvbnM6IFF1ZXJ5TGlzdDxJbmZvQm94QWN0aW9uRGlyZWN0aXZlPjtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93IChvbmx5IHVzZWZ1bGwgaWYgeW91IHVzZSBpdCBvdXNpZGUgb2YgYSB7QGxpbmsgTWFwTWFya2VyfSkuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExhdGl0dWRlOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9uZ2l0dWRlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvdyAob25seSB1c2VmdWxsIGlmIHlvdSB1c2UgaXQgb3VzaWRlIG9mIGEge0BsaW5rIE1hcE1hcmtlcn0pLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMb25naXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0aXRsZSB0byBkaXNwbGF5IGluIHRoZSBpbmZvIHdpbmRvd1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBUaXRsZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIHRvIGRpc3BsYXkgaW4gdGhlIGluZm8gd2luZG93LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBEZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBhdXRvLXBhbiBvbiBvcGVuLiBCeSBkZWZhdWx0LCB0aGUgaW5mbyB3aW5kb3cgd2lsbCBwYW4gdGhlIG1hcCBzbyB0aGF0IGl0IGlzIGZ1bGx5XHJcbiAgICAgKiB2aXNpYmxlIHdoZW4gaXQgb3BlbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIERpc2FibGVBdXRvUGFuOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIE1heGltdW0gd2lkdGggb2YgdGhlIGluZm93aW5kb3csIHJlZ2FyZGxlc3Mgb2YgY29udGVudCdzIHdpZHRoLiBUaGlzIHZhbHVlIGlzIG9ubHkgY29uc2lkZXJlZFxyXG4gICAgICogIGlmIGl0IGlzIHNldCBiZWZvcmUgYSBjYWxsIHRvIG9wZW4uIFRvIGNoYW5nZSB0aGUgbWF4aW11bSB3aWR0aCB3aGVuIGNoYW5naW5nIGNvbnRlbnQsIGNhbGxcclxuICAgICAqICBjbG9zZSwgdXBkYXRlIG1heFdpZHRoLCBhbmQgdGhlbiBvcGVuLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBNYXhXaWR0aDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgb25seSBvbmUgaW5mb2JveCBjYW4gYmUgb3BlbiBhdCBhIHRpbWUuIE5vdGUgdGhhdCBBTlkgaW5mbyBib3ggc2V0dGluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIE1vZGFsID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBtYXJrZXIgdGhhdCBpcyB0aGUgaG9zdCBvZiB0aGUgaW5mbyB3aW5kb3cgKGlmIGF2YWlsYWJsZSlcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgSG9zdE1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyB2aXNpYmlsaXR5IG9mIGluZm9ib3hcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9yaXpvbnRhbCBvZmZzZXQgb2YgdGhlIGluZm9ib3ggZnJvbSB0aGUgaG9zdCBtYXJrZXIgbGF0L2xvbmcgb3IgdGhlIHNlcGVjaWZpZWQgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHhPZmZzZXQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcnRpY2FsIG9mZnNldCBmb3IgdGhlIGluZm9ib3ggZnJvbSB0aGUgaG9zdCBtYXJrZXIgbGF0L2xvbmcgb3IgdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgeU9mZnNldDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiBvdGhlciBpbmZvIGJveGVzIHNob3VsZCBiZSBjbG9zZWQgYmVmb3JlIG9wZW5pbmcgdGhpcyBvbmVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgQ2xvc2VJbmZvQm94ZXNPbk9wZW4gPSB0cnVlO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIERlbGVnYXRlIGRlZmludGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgaW5mbyB3aW5kb3cgaXMgY2xvc2VkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgSW5mb0JveENsb3NlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9ucy5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgSFRNTCBjb250ZW50IG9mIHRoZSBpbmZvIGJveC5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSHRtbENvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5fY29udGVudC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuX2NvbnRlbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQgJiYgdGhpcy5fY29udGVudC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dC50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50Lm5hdGl2ZUVsZW1lbnQub3V0ZXJIVE1MO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBJZCBvZiB0aGUgaW5mbyBib3ggYXMgYSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW5mb0JveENvbXBvbmVudC5cclxuICAgICAqIEBwYXJhbSBfaW5mb0JveFNlcnZpY2UgLSBDb25jcmV0ZSB7QGxpbmsgSW5mb0JveFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB1bmRlcmx5aW5nIE1hcCBhcmNoaXRlY3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb0JveFNlcnZpY2U6IEluZm9Cb3hTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgdGhlIEluZm9ib3guXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIENsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvQm94U2VydmljZS5DbG9zZSh0aGlzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5JbmZvQm94Q2xvc2UuZW1pdCh0aGlzLl9pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgb24gYWZ0ZXIgY29tcG9uZW50IHZpZXcgYXMgYmVlbiBpbml0aWFsaXplZC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuX2luZm9Cb3hTZXJ2aWNlLkFkZEluZm9XaW5kb3codGhpcyk7XHJcbiAgICAgICAgdGhpcy5faW5mb0JveEFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkhhbmRsZUV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gY2hhbmdlcyB0byB0aGUgZGF0YWJvdWQgcHJvcGVydGllcyBvY2N1ci4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBDaGFuZ2VzIHRoYXQgaGF2ZSBvY2N1cmVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luZm9Cb3hBZGRlZFRvTWFuYWdlcikgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pICYmIHR5cGVvZiB0aGlzLkxhdGl0dWRlID09PSAnbnVtYmVyJyAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5Mb25naXR1ZGUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luZm9Cb3hTZXJ2aWNlLlNldFBvc2l0aW9uKHRoaXMsIHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjaGFuZ2VzWydsYXRpdHVkZSddLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogY2hhbmdlc1snbG9uZ2l0dWRlJ10uY3VycmVudFZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNldEluZm9XaW5kb3dPcHRpb25zKGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkgeyB0aGlzLl9pbmZvQm94U2VydmljZS5EZWxldGVJbmZvV2luZG93KHRoaXMpOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyBhIGNsb3NlZCBpbmZvIHdpbmRvdy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW2xvY10gIC0ge0BsaW5rIElMYXRMb25nIH0gcmVwcmVzZW50aW5nIHBvc2l0aW9uIG9uIHdoaWNoIHRvIG9wZW4gdGhlIHdpbmRvdy5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBoYXMgYmVlbiBvcGVuZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIE9wZW4obG9jPzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5mb0JveFNlcnZpY2UuT3Blbih0aGlzLCBsb2MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW5mbyBib3guXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGluZm8gYm94LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBUb1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ0luZm9Cb3hDb21wb25lbnQtJyArIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIHRoZSBtYXAgY2xpY2sgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBIYW5kbGVFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faW5mb0JveFNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdpbmZvd2luZG93Y2xvc2UnLCB0aGlzKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5mb0JveENsb3NlLmVtaXQodGhpcy5faWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBTZXRJbmZvV2luZG93T3B0aW9ucyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zID0ge307XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3RpdGxlJ10pIHsgb3B0aW9ucy50aXRsZSA9IHRoaXMuVGl0bGU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snZGVzY3JpcHRpb24nXSkgeyBvcHRpb25zLmRlc2NyaXB0aW9uID0gdGhpcy5EZXNjcmlwdGlvbjsgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlQXV0b1BhbiddKSB7IG9wdGlvbnMuZGlzYWJsZUF1dG9QYW4gPSB0aGlzLkRpc2FibGVBdXRvUGFuOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSkgeyBvcHRpb25zLnZpc2libGUgPSB0aGlzLlZpc2libGU7IH1cclxuICAgICAgICBpZiAoY2hhbmdlc1sneE9mZnNldCddIHx8IGNoYW5nZXNbJ3lPZmZzZXQnXSkge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5waXhlbE9mZnNldCA9PSBudWxsKSB7IG9wdGlvbnMucGl4ZWxPZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTsgfVxyXG4gICAgICAgICAgICBvcHRpb25zLnBpeGVsT2Zmc2V0LnggPSB0aGlzLnhPZmZzZXQ7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucGl4ZWxPZmZzZXQueSA9IHRoaXMueU9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5mb0JveFNlcnZpY2UuU2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG4iXX0=