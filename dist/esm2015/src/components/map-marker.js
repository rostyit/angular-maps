/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, ContentChild, ViewContainerRef } from '@angular/core';
import { timer } from 'rxjs';
import { MarkerService } from '../services/marker.service';
import { InfoBoxComponent } from './infobox';
/** *
 * internal counter to use as ids for marker.
  @type {?} */
let markerId = 0;
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
export class MapMarkerDirective {
    /**
     * Creates an instance of MapMarkerDirective.
     * \@memberof MapMarkerDirective
     * @param {?} _markerService - Concreate implementation of a {\@link MarkerService}.
     * @param {?} _containerRef - View container hosting the marker.
     * Used to determine parent layer through markup.
     *
     */
    constructor(_markerService, _containerRef) {
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
        this.DblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.Drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.DragEnd = new EventEmitter();
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
        this.DragStart = new EventEmitter();
        /**
         * This event emitter gets emitted when a marker icon is being created.
         *
         * \@memberof MapMarkerDirective
         */
        this.DynamicMarkerCreated = new EventEmitter();
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
        this.MarkerClick = new EventEmitter();
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
        this.MouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseMove = new EventEmitter();
        /**
         * This event is fired on marker mouseout.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseOut = new EventEmitter();
        /**
         * This event is fired on marker mouseover.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the marker
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseUp = new EventEmitter();
        /**
         * This even is fired when the marker is right-clicked on.
         *
         * \@memberof MapMarkerDirective
         */
        this.RightClick = new EventEmitter();
        this._id = (markerId++).toString();
    }
    /**
     * Getswhether the marker has already been added to the marker service and is ready for use.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get AddedToManager() { return this._markerAddedToManger; }
    /**
     * Gets the id of the marker as a string.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Gets whether the marker is in a cluster layer. See {\@link ClusterLayer}.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get InClusterLayer() { return this._inClusterLayer; }
    /**
     * Gets whether the marker is in a custom layer. See {\@link MapLayer}.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get InCustomLayer() { return this._inCustomLayer; }
    /**
     * gets the id of the Layer the marker belongs to.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get LayerId() { return this._layerId; }
    /**
     * Translates a marker geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerDirective
     * @param {?=} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    LocationToPixel(loc) {
        return this._markerService.LocationToPoint(loc ? loc : this);
    }
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    ngAfterContentInit() {
        if (this._infoBox != null) {
            this._infoBox.HostMarker = this;
        }
        if (this._containerRef.element.nativeElement.parentElement) {
            /** @type {?} */
            const parentName = this._containerRef.element.nativeElement.parentElement.tagName;
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
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._markerService.DeleteMarker(this);
        this._events.forEach((s) => s.unsubscribe());
    }
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerDirective
     * @return {?} - string representation of the marker id.
     */
    toString() { return 'MapMarker-' + this._id.toString(); }
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    AddEventListeners() {
        /** @type {?} */
        const _getEventArg = e => {
            return {
                Marker: this,
                Click: e,
                Location: this._markerService.GetCoordinatesFromClick(e),
                Pixels: this._markerService.GetPixelsFromClick(e)
            };
        };
        this._events.push(this._markerService.CreateEventObservable('click', this).subscribe((e) => {
            this._clickTimeout = timer(300).subscribe(n => {
                if (this._infoBox != null) {
                    this._infoBox.Open(this._markerService.GetCoordinatesFromClick(e));
                }
                this.MarkerClick.emit(_getEventArg(e));
            });
        }));
        this._events.push(this._markerService.CreateEventObservable('dblclick', this).subscribe((e) => {
            if (this._clickTimeout) {
                this._clickTimeout.unsubscribe();
                this._clickTimeout = null;
            }
            this.DblClick.emit(_getEventArg(e));
        }));
        /** @type {?} */
        const handlers = [
            { name: 'drag', handler: (ev) => this.Drag.emit(_getEventArg(ev)) },
            { name: 'dragend', handler: (ev) => this.DragEnd.emit(_getEventArg(ev)) },
            { name: 'dragstart', handler: (ev) => this.DragStart.emit(_getEventArg(ev)) },
            { name: 'mousedown', handler: (ev) => this.MouseDown.emit(_getEventArg(ev)) },
            { name: 'mousemove', handler: (ev) => this.MouseMove.emit(_getEventArg(ev)) },
            { name: 'mouseout', handler: (ev) => this.MouseOut.emit(_getEventArg(ev)) },
            { name: 'mouseover', handler: (ev) => this.MouseOver.emit(_getEventArg(ev)) },
            { name: 'mouseup', handler: (ev) => this.MouseUp.emit(_getEventArg(ev)) },
            { name: 'rightclick', handler: (ev) => this.RightClick.emit(_getEventArg(ev)) },
        ];
        handlers.forEach((obj) => {
            /** @type {?} */
            const os = this._markerService.CreateEventObservable(obj.name, this).subscribe(obj.handler);
            this._events.push(os);
        });
    }
}
MapMarkerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-marker'
            },] },
];
/** @nocollapse */
MapMarkerDirective.ctorParameters = () => [
    { type: MarkerService },
    { type: ViewContainerRef }
];
MapMarkerDirective.propDecorators = {
    _infoBox: [{ type: ContentChild, args: [InfoBoxComponent,] }],
    Anchor: [{ type: Input }],
    DblClick: [{ type: Output }],
    Drag: [{ type: Output }],
    DragEnd: [{ type: Output }],
    Draggable: [{ type: Input }],
    DragStart: [{ type: Output }],
    DynamicMarkerCreated: [{ type: Output }],
    Height: [{ type: Input }],
    IconInfo: [{ type: Input }],
    IconUrl: [{ type: Input }],
    IsFirstInSet: [{ type: Input }],
    IsLastInSet: [{ type: Input }],
    Label: [{ type: Input }],
    Latitude: [{ type: Input }],
    Longitude: [{ type: Input }],
    MarkerClick: [{ type: Output }],
    Metadata: [{ type: Input }],
    MouseDown: [{ type: Output }],
    MouseMove: [{ type: Output }],
    MouseOut: [{ type: Output }],
    MouseOver: [{ type: Output }],
    MouseUp: [{ type: Output }],
    RightClick: [{ type: Output }],
    Title: [{ type: Input }],
    Visible: [{ type: Input }],
    Width: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MapMarkerDirective.prototype._clickTimeout;
    /** @type {?} */
    MapMarkerDirective.prototype._events;
    /** @type {?} */
    MapMarkerDirective.prototype._id;
    /** @type {?} */
    MapMarkerDirective.prototype._inClusterLayer;
    /** @type {?} */
    MapMarkerDirective.prototype._inCustomLayer;
    /**
     * Any InfoBox that is a direct children of the marker
     *
     * @protected
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype._infoBox;
    /** @type {?} */
    MapMarkerDirective.prototype._layerId;
    /** @type {?} */
    MapMarkerDirective.prototype._markerAddedToManger;
    /**
     *  Icon anchor relative to marker root
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Anchor;
    /**
     * This event is fired when the DOM dblclick event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DblClick;
    /**
     * This event is repeatedly fired while the user drags the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Drag;
    /**
     * This event is fired when the user stops dragging the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DragEnd;
    /**
     * If true, the marker can be dragged. Default value is false.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Draggable;
    /**
     * This event is fired when the user starts dragging the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DragStart;
    /**
     * This event emitter gets emitted when a marker icon is being created.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DynamicMarkerCreated;
    /**
     * Icon height
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Height;
    /**
     * Information for dynamic, custom created icons.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IconInfo;
    /**
     * Icon (the URL of the image) for the foreground.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IconUrl;
    /**
     * True to indiciate whether this is the first marker in a set.
     * Use this for bulk operations (particularily clustering) to ensure performance.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IsFirstInSet;
    /**
     * True to indiciate whether this is the last marker in a set.
     * Use this for bulk operations (particularily clustering) to ensure performance.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IsLastInSet;
    /**
     * The label (a single uppercase character) for the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Label;
    /**
     * The latitude position of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Latitude;
    /**
     * The longitude position of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Longitude;
    /**
     * This event emitter gets emitted when the user clicks on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MarkerClick;
    /**
     * Arbitary metadata to assign to the Marker. This is useful for events
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Metadata;
    /**
     * This event is fired when the DOM mousedown event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseMove;
    /**
     * This event is fired on marker mouseout.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseOut;
    /**
     * This event is fired on marker mouseover.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the marker
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseUp;
    /**
     * This even is fired when the marker is right-clicked on.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.RightClick;
    /**
     *  The title of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Title;
    /**
     * Sets the visibility of the marker
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Visible;
    /**
     * Icon Width
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Width;
    /** @type {?} */
    MapMarkerDirective.prototype._markerService;
    /** @type {?} */
    MapMarkerDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLW1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL21hcC1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBRSxZQUFZLEVBQW9CLGdCQUFnQixFQUNqRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUszQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBSzdDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QmpCLE1BQU07Ozs7Ozs7OztJQThRRixZQUFvQixjQUE2QixFQUFVLGFBQStCO1FBQXRFLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWtCOzZCQXpRcEQsSUFBSTt1QkFDUixFQUFFOytCQUVWLEtBQUs7OEJBQ04sS0FBSztvQ0FXQyxLQUFLOzs7Ozs7d0JBY2EsSUFBSSxZQUFZLEVBQWdCOzs7Ozs7b0JBT3BDLElBQUksWUFBWSxFQUFnQjs7Ozs7O3VCQU83QixJQUFJLFlBQVksRUFBZ0I7Ozs7Ozt5QkFPcEQsS0FBSzs7Ozs7O3lCQU9pQixJQUFJLFlBQVksRUFBZ0I7Ozs7OztvQ0FPWCxJQUFJLFlBQVksRUFBbUI7Ozs7Ozs7NEJBNkIzRSxLQUFLOzs7Ozs7OzJCQVFOLElBQUk7Ozs7OzsyQkE0QnlCLElBQUksWUFBWSxFQUFnQjs7Ozs7O3dCQU85QyxJQUFJLEdBQUcsRUFBZTs7Ozs7O3lCQU9qQixJQUFJLFlBQVksRUFBZ0I7Ozs7Ozt5QkFPaEMsSUFBSSxZQUFZLEVBQWdCOzs7Ozs7d0JBT2pDLElB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dUJBT0wsS0FBSzt3QkFPTCxLQUFLOzBCQU9MLE1BQU07dUJBT04sS0FBSzt3QkFPTCxNQUFNO3dCQU9OLE1BQU07dUJBT04sTUFBTTt3QkFPTixNQUFNO3NCQU9OLE1BQU07eUJBT04sTUFBTTtvQkFPTixLQUFLO3NCQU9MLEtBQUs7b0JBT0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsIFNpbXBsZUNoYW5nZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsXHJcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgSU1hcmtlckV2ZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWV2ZW50JztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEluZm9Cb3hDb21wb25lbnQgfSBmcm9tICcuL2luZm9ib3gnO1xyXG5cclxuLyoqXHJcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgbWFya2VyLlxyXG4gKi9cclxubGV0IG1hcmtlcklkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBNYXBNYXJrZXJEaXJlY3RpdmUgcmVuZGVycyBhIG1hcCBtYXJrZXIgaW5zaWRlIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudCwgTWFwTWFya2VyRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgLm1hcC1jb250YWluZXIge1xyXG4gKiAgICAgaGVpZ2h0OiAzMDBweDtcclxuICogICB9XHJcbiAqIGBdLFxyXG4gKiB0ZW1wbGF0ZTogYFxyXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPHgtbWFwLW1hcmtlciBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbTGFiZWxdPVwiJ00nXCI+PC94LW1hcC1tYXJrZXI+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtbWFwLW1hcmtlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcE1hcmtlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfY2xpY2tUaW1lb3V0OiBTdWJzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZXZlbnRzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2luQ2x1c3RlckxheWVyID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pbkN1c3RvbUxheWVyID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgSW5mb0JveCB0aGF0IGlzIGEgZGlyZWN0IGNoaWxkcmVuIG9mIHRoZSBtYXJrZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBDb250ZW50Q2hpbGQoSW5mb0JveENvbXBvbmVudCkgcHJvdGVjdGVkIF9pbmZvQm94OiBJbmZvQm94Q29tcG9uZW50O1xyXG5cclxuICAgIHByaXZhdGUgX2xheWVySWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21hcmtlckFkZGVkVG9NYW5nZXIgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICBJY29uIGFuY2hvciByZWxhdGl2ZSB0byBtYXJrZXIgcm9vdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIEFuY2hvcjogSVBvaW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEYmxDbGljazogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIERyYWc6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgZHJhZ2dlZC4gRGVmYXVsdCB2YWx1ZSBpcyBmYWxzZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBEcmFnZ2FibGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gYSBtYXJrZXIgaWNvbiBpcyBiZWluZyBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBEeW5hbWljTWFya2VyQ3JlYXRlZDogRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEljb24gaGVpZ2h0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgSGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvcm1hdGlvbiBmb3IgZHluYW1pYywgY3VzdG9tIGNyZWF0ZWQgaWNvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgSWNvbkluZm86IElNYXJrZXJJY29uSW5mbztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEljb24gKHRoZSBVUkwgb2YgdGhlIGltYWdlKSBmb3IgdGhlIGZvcmVncm91bmQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgSWNvblVybDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJ1ZSB0byBpbmRpY2lhdGUgd2hldGhlciB0aGlzIGlzIHRoZSBmaXJzdCBtYXJrZXIgaW4gYSBzZXQuXHJcbiAgICAgKiBVc2UgdGhpcyBmb3IgYnVsayBvcGVyYXRpb25zIChwYXJ0aWN1bGFyaWx5IGNsdXN0ZXJpbmcpIHRvIGVuc3VyZSBwZXJmb3JtYW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBJc0ZpcnN0SW5TZXQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRydWUgdG8gaW5kaWNpYXRlIHdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBtYXJrZXIgaW4gYSBzZXQuXHJcbiAgICAgKiBVc2UgdGhpcyBmb3IgYnVsayBvcGVyYXRpb25zIChwYXJ0aWN1bGFyaWx5IGNsdXN0ZXJpbmcpIHRvIGVuc3VyZSBwZXJmb3JtYW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBJc0xhc3RJblNldCA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGFiZWwgKGEgc2luZ2xlIHVwcGVyY2FzZSBjaGFyYWN0ZXIpIGZvciB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXRpdHVkZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIExvbmdpdHVkZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFya2VyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBNYXJrZXJDbGljazogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFyYml0YXJ5IG1ldGFkYXRhIHRvIGFzc2lnbiB0byB0aGUgTWFya2VyLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VEb3duOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBtYXJrZXIgbW91c2VvdXQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1hcmtlciBtb3VzZW92ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBtYXJrZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBNb3VzZVVwOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVuIGlzIGZpcmVkIHdoZW4gdGhlIG1hcmtlciBpcyByaWdodC1jbGlja2VkIG9uLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhlIHRpdGxlIG9mIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgVGl0bGU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1hcmtlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJY29uIFdpZHRoXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgV2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBEZWxlZ2F0ZXNcclxuICAgIC8vL1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0c3doZXRoZXIgdGhlIG1hcmtlciBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkIHRvIHRoZSBtYXJrZXIgc2VydmljZSBhbmQgaXMgcmVhZHkgZm9yIHVzZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBBZGRlZFRvTWFuYWdlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGlkIG9mIHRoZSBtYXJrZXIgYXMgYSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuIFNlZSB7QGxpbmsgQ2x1c3RlckxheWVyfS5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBJbkNsdXN0ZXJMYXllcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2luQ2x1c3RlckxheWVyOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyBpbiBhIGN1c3RvbSBsYXllci4gU2VlIHtAbGluayBNYXBMYXllcn0uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgSW5DdXN0b21MYXllcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2luQ3VzdG9tTGF5ZXI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGlkIG9mIHRoZSBMYXllciB0aGUgbWFya2VyIGJlbG9uZ3MgdG8uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgTGF5ZXJJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGF5ZXJJZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwTWFya2VyRGlyZWN0aXZlLlxyXG4gICAgICogQHBhcmFtIF9tYXJrZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcmtlclNlcnZpY2V9LlxyXG4gICAgICogQHBhcmFtIF9jb250YWluZXJSZWYgLSBWaWV3IGNvbnRhaW5lciBob3N0aW5nIHRoZSBtYXJrZXIuXHJcbiAgICAgKiBVc2VkIHRvIGRldGVybWluZSBwYXJlbnQgbGF5ZXIgdGhyb3VnaCBtYXJrdXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZXJTZXJ2aWNlOiBNYXJrZXJTZXJ2aWNlLCBwcml2YXRlIF9jb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgICAgICB0aGlzLl9pZCA9IChtYXJrZXJJZCsrKS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgYSBtYXJrZXIgZ2VvIGxvY2F0aW9uIHRvIGEgcGl4ZWwgbG9jYXRpb24gcmVsYXRpdmUgdG8gdGhlIG1hcCB2aWV3cG9ydC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gW2xvY10gLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcy4gSWYgbnVsbCwgdGhlIG1hcmtlcidzIGNvb3JkaW5hdGVzIGFyZSB1c2VkLlxyXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgYW4ge0BsaW5rIElQb2ludH0gcmVwcmVzZW50aW5nIHRoZSBwaXhlbCBjb29yZGluYXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2NhdGlvblRvUGl4ZWwobG9jPzogSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkxvY2F0aW9uVG9Qb2ludChsb2MgPyBsb2MgOiB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciBDb21wb25lbnQgY29udGVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luZm9Cb3ggIT0gbnVsbCkgeyB0aGlzLl9pbmZvQm94Lkhvc3RNYXJrZXIgPSB0aGlzOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnROYW1lOiBzdHJpbmcgPSB0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQudGFnTmFtZTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3gtY2x1c3Rlci1sYXllcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luQ2x1c3RlckxheWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd4LW1hcC1sYXllcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luQ3VzdG9tTGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVySWQgPSBOdW1iZXIodGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmF0dHJpYnV0ZXNbJ2xheWVySWQnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLkFkZE1hcmtlcih0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgdG8gY2hhbmdlcyBpbiBkYXRhLWJvdW5kIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudCBhbmQgYWN0dWF0ZXMgcHJvcGVydHkgY2hhbmdlcyBpbiB0aGUgdW5kZXJsaW5nIGxheWVyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuTGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLkxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0xhdGl0dWRlJ10gfHwgY2hhbmdlc1snTG9uZ2l0dWRlJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5VcGRhdGVNYXJrZXJQb3NpdGlvbih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1RpdGxlJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5VcGRhdGVUaXRsZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0xhYmVsJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5VcGRhdGVMYWJlbCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0RyYWdnYWJsZSddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuVXBkYXRlRHJhZ2dhYmxlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snSWNvblVybCddIHx8IGNoYW5nZXNbJ0ljb25JbmZvJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5VcGRhdGVJY29uKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlc1snQW5jaG9yJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5VcGRhdGVBbmNob3IodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5VcGRhdGVWaXNpYmxlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5EZWxldGVNYXJrZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRhaW5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBNYXJrZXIgSWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWFya2VyIGlkLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuICdNYXBNYXJrZXItJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB2YXJpb3VzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIG1hcmtlci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQWRkRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgX2dldEV2ZW50QXJnOiAoZTogTW91c2VFdmVudCkgPT4gSU1hcmtlckV2ZW50ID0gZSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBNYXJrZXI6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBDbGljazogZSxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uOiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUpLFxyXG4gICAgICAgICAgICAgICAgUGl4ZWxzOiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldFBpeGVsc0Zyb21DbGljayhlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKHRoaXMuX21hcmtlclNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdjbGljaycsIHRoaXMpLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAvLy9cclxuICAgICAgICAgICAgLy8vIHRoaXMgaXMgbmVjZXNzYXJ5IHNpbmNlIG1hcCB3aWxsIHRyZWF0IGEgZG91YmxlY2xpY2sgZmlyc3QgYXMgdHdvIGNsaWNrcy4uLidcclxuICAgICAgICAgICAgLy8vXHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IHRpbWVyKDMwMCkuc3Vic2NyaWJlKG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZm9Cb3ggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZm9Cb3guT3Blbih0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTWFya2VyQ2xpY2suZW1pdChfZ2V0RXZlbnRBcmcoZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKHRoaXMuX21hcmtlclNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdkYmxjbGljaycsIHRoaXMpLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2xpY2tUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5EYmxDbGljay5lbWl0KF9nZXRFdmVudEFyZyhlKSk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnRW5kLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdTdGFydC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZURvd24uZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VNb3ZlLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdXQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdmVyLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZVVwLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5SaWdodENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcyA9IHRoaXMuX21hcmtlclNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMucHVzaChvcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==