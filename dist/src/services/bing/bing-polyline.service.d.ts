import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { IPolylineOptions } from '../../interfaces/ipolyline-options';
import { ILatLong } from '../../interfaces/ilatlong';
import { Polyline } from '../../models/polyline';
import { MapPolylineDirective } from '../../components/map-polyline';
import { PolylineService } from '../polyline.service';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polyline Service abstract class for Bing Maps V8.
 *
 * @export
 */
export declare class BingPolylineService implements PolylineService {
    private _mapService;
    private _layerService;
    private _zone;
    private _polylines;
    /**
     * Creates an instance of BingPolylineService.
     * @param _mapService - {@link MapService} instance. The concrete {@link BingMapService} implementation is expected.
     * @param _layerService - {@link LayerService} instance.
     * The concrete {@link BingLayerService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof BingPolylineService
     */
    constructor(_mapService: MapService, _layerService: LayerService, _zone: NgZone);
    /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * corresponding layer.
     *
     * @param polyline - The {@link MapPolylineDirective} to be added.
     *
     * @memberof BingPolylineService
     */
    AddPolyline(polyline: MapPolylineDirective): void;
    /**
      * Registers an event delegate for a line.
      *
      * @param eventName - The name of the event to register (e.g. 'click')
      * @param polyline - The {@link MapPolylineDirective} for which to register the event.
      * @returns - Observable emiting an instance of T each time the event occurs.
      *
      * @memberof BingPolylineService
      */
    CreateEventObservable<T>(eventName: string, polyline: MapPolylineDirective): Observable<T>;
    /**
      * Deletes a polyline.
      *
      * @param polyline - {@link MapPolylineDirective} to be deleted.
      * @returns - A promise fullfilled once the polyline has been deleted.
      *
      * @memberof BingPolylineService
      */
    DeletePolyline(polyline: MapPolylineDirective): Promise<void>;
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * @param e - The mouse event.
     * @returns - {@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     * @memberof BingPolylineService
     */
    GetCoordinatesFromClick(e: Microsoft.Maps.IMouseEventArgs): ILatLong;
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * @param polyline - The {@link MapPolylineDirective} for which to obtain the polyline model.
     * @returns - A promise that when fullfilled contains the {@link Polyline}
     * implementation of the underlying platform. For complex paths, returns an array of polylines.
     *
     * @memberof BingPolylineService
     */
    GetNativePolyline(polyline: MapPolylineDirective): Promise<Polyline | Array<Polyline>>;
    /**
     * Set the polyline options.
     *
     * @param polyline - {@link MapPolylineDirective} to be updated.
     * @param options - {@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @returns - A promise fullfilled once the polyline options have been set.
     *
     * @memberof BingPolylineService
     */
    SetOptions(polyline: MapPolylineDirective, options: IPolylineOptions): Promise<void>;
    /**
     * Updates the Polyline path
     *
     * @param polyline - {@link MapPolylineDirective} to be updated.
     * @returns - A promise fullfilled once the polyline has been updated.
     *
     * @memberof BingPolylineService
     */
    UpdatePolyline(polyline: MapPolylineDirective): Promise<void>;
}
