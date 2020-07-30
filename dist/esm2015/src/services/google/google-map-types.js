/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
export let google;
/**
 * @record
 */
export function GoogleMap() { }
/** @type {?|undefined} */
GoogleMap.prototype.data;
/** @type {?} */
GoogleMap.prototype.constructor;
/** @type {?} */
GoogleMap.prototype.panTo;
/** @type {?} */
GoogleMap.prototype.setZoom;
/** @type {?} */
GoogleMap.prototype.getCenter;
/** @type {?} */
GoogleMap.prototype.setCenter;
/** @type {?} */
GoogleMap.prototype.getBounds;
/** @type {?} */
GoogleMap.prototype.getZoom;
/** @type {?} */
GoogleMap.prototype.getDiv;
/** @type {?} */
GoogleMap.prototype.getProjection;
/** @type {?} */
GoogleMap.prototype.setOptions;
/** @type {?} */
GoogleMap.prototype.panToBounds;
/** @type {?} */
GoogleMap.prototype.fitBounds;
/**
 * @record
 */
export function LatLng() { }
/** @type {?} */
LatLng.prototype.constructor;
/** @type {?} */
LatLng.prototype.lat;
/** @type {?} */
LatLng.prototype.lng;
/**
 * @record
 */
export function Marker() { }
/** @type {?} */
Marker.prototype.constructor;
/** @type {?} */
Marker.prototype.setMap;
/** @type {?} */
Marker.prototype.setPosition;
/** @type {?} */
Marker.prototype.setTitle;
/** @type {?} */
Marker.prototype.setLabel;
/** @type {?} */
Marker.prototype.setPosition;
/** @type {?} */
Marker.prototype.setDraggable;
/** @type {?} */
Marker.prototype.setIcon;
/** @type {?} */
Marker.prototype.setOpacity;
/** @type {?} */
Marker.prototype.setOptions;
/** @type {?} */
Marker.prototype.setVisible;
/** @type {?} */
Marker.prototype.setZIndex;
/** @type {?} */
Marker.prototype.getLabel;
/** @type {?} */
Marker.prototype.getPosition;
/** @type {?} */
Marker.prototype.getVisible;
/**
 * @record
 */
export function MarkerOptions() { }
/** @type {?} */
MarkerOptions.prototype.position;
/** @type {?|undefined} */
MarkerOptions.prototype.title;
/** @type {?|undefined} */
MarkerOptions.prototype.map;
/** @type {?|undefined} */
MarkerOptions.prototype.label;
/** @type {?|undefined} */
MarkerOptions.prototype.draggable;
/** @type {?|undefined} */
MarkerOptions.prototype.clickable;
/** @type {?|undefined} */
MarkerOptions.prototype.icon;
/** @type {?|undefined} */
MarkerOptions.prototype.opacity;
/** @type {?|undefined} */
MarkerOptions.prototype.visible;
/** @type {?|undefined} */
MarkerOptions.prototype.zIndex;
/**
 * @record
 */
export function MarkerLabel() { }
/** @type {?} */
MarkerLabel.prototype.color;
/** @type {?} */
MarkerLabel.prototype.fontFamily;
/** @type {?} */
MarkerLabel.prototype.fontSize;
/** @type {?} */
MarkerLabel.prototype.fontWeight;
/** @type {?} */
MarkerLabel.prototype.text;
/**
 * @record
 */
export function ClusterStyle() { }
/** @type {?|undefined} */
ClusterStyle.prototype.url;
/** @type {?|undefined} */
ClusterStyle.prototype.height;
/** @type {?|undefined} */
ClusterStyle.prototype.width;
/** @type {?|undefined} */
ClusterStyle.prototype.anchor;
/** @type {?|undefined} */
ClusterStyle.prototype.textColor;
/** @type {?|undefined} */
ClusterStyle.prototype.textSize;
/** @type {?|undefined} */
ClusterStyle.prototype.backgroundPosition;
/**
 * @record
 */
export function MarkerClusterer() { }
/** @type {?} */
MarkerClusterer.prototype.isZoomOnClick;
/** @type {?} */
MarkerClusterer.prototype.isAverageCenter;
/** @type {?} */
MarkerClusterer.prototype.getMarkers;
/** @type {?} */
MarkerClusterer.prototype.getTotalMarkers;
/** @type {?} */
MarkerClusterer.prototype.setMaxZoom;
/** @type {?} */
MarkerClusterer.prototype.getMaxZoom;
/** @type {?} */
MarkerClusterer.prototype.addMarkers;
/** @type {?} */
MarkerClusterer.prototype.addMarker;
/** @type {?} */
MarkerClusterer.prototype.removeMarkers;
/** @type {?} */
MarkerClusterer.prototype.removeMarker;
/** @type {?} */
MarkerClusterer.prototype.getTotalClusters;
/** @type {?} */
MarkerClusterer.prototype.getMap;
/** @type {?} */
MarkerClusterer.prototype.setMap;
/** @type {?} */
MarkerClusterer.prototype.getGridSize;
/** @type {?} */
MarkerClusterer.prototype.setGridSize;
/** @type {?} */
MarkerClusterer.prototype.getMinClusterSize;
/** @type {?} */
MarkerClusterer.prototype.setMinClusterSize;
/** @type {?} */
MarkerClusterer.prototype.clearMarkers;
/** @type {?} */
MarkerClusterer.prototype.setStyles;
/** @type {?} */
MarkerClusterer.prototype.getStyles;
/** @type {?} */
MarkerClusterer.prototype.setCalculator;
/** @type {?} */
MarkerClusterer.prototype.getCalculator;
/** @type {?} */
MarkerClusterer.prototype.resetViewport;
/** @type {?} */
MarkerClusterer.prototype.redraw;
/**
 * @record
 */
export function Circle() { }
/** @type {?} */
Circle.prototype.getBounds;
/** @type {?} */
Circle.prototype.getCenter;
/** @type {?} */
Circle.prototype.getDraggable;
/** @type {?} */
Circle.prototype.getEditable;
/** @type {?} */
Circle.prototype.getMap;
/** @type {?} */
Circle.prototype.getRadius;
/** @type {?} */
Circle.prototype.getVisible;
/** @type {?} */
Circle.prototype.setCenter;
/** @type {?} */
Circle.prototype.setDraggable;
/** @type {?} */
Circle.prototype.setEditable;
/** @type {?} */
Circle.prototype.setMap;
/** @type {?} */
Circle.prototype.setOptions;
/** @type {?} */
Circle.prototype.setRadius;
/** @type {?} */
Circle.prototype.setVisible;
/**
 * @record
 */
export function CircleOptions() { }
/** @type {?|undefined} */
CircleOptions.prototype.center;
/** @type {?|undefined} */
CircleOptions.prototype.clickable;
/** @type {?|undefined} */
CircleOptions.prototype.draggable;
/** @type {?|undefined} */
CircleOptions.prototype.editable;
/** @type {?|undefined} */
CircleOptions.prototype.fillColor;
/** @type {?|undefined} */
CircleOptions.prototype.fillOpacity;
/** @type {?|undefined} */
CircleOptions.prototype.map;
/** @type {?|undefined} */
CircleOptions.prototype.radius;
/** @type {?|undefined} */
CircleOptions.prototype.strokeColor;
/** @type {?|undefined} */
CircleOptions.prototype.strokeOpacity;
/** @type {?|undefined} */
CircleOptions.prototype.strokePosition;
/** @type {?|undefined} */
CircleOptions.prototype.strokeWeight;
/** @type {?|undefined} */
CircleOptions.prototype.visible;
/** @type {?|undefined} */
CircleOptions.prototype.zIndex;
/**
 * @record
 */
export function LatLngBounds() { }
/** @type {?} */
LatLngBounds.prototype.contains;
/** @type {?} */
LatLngBounds.prototype.equals;
/** @type {?} */
LatLngBounds.prototype.extend;
/** @type {?} */
LatLngBounds.prototype.getCenter;
/** @type {?} */
LatLngBounds.prototype.getNorthEast;
/** @type {?} */
LatLngBounds.prototype.getSouthWest;
/** @type {?} */
LatLngBounds.prototype.intersects;
/** @type {?} */
LatLngBounds.prototype.isEmpty;
/** @type {?} */
LatLngBounds.prototype.toJSON;
/** @type {?} */
LatLngBounds.prototype.toSpan;
/** @type {?} */
LatLngBounds.prototype.toString;
/** @type {?} */
LatLngBounds.prototype.toUrlValue;
/** @type {?} */
LatLngBounds.prototype.union;
/**
 * @record
 */
export function LatLngBoundsLiteral() { }
/** @type {?} */
LatLngBoundsLiteral.prototype.east;
/** @type {?} */
LatLngBoundsLiteral.prototype.north;
/** @type {?} */
LatLngBoundsLiteral.prototype.south;
/** @type {?} */
LatLngBoundsLiteral.prototype.west;
/**
 * @record
 */
export function LatLngLiteral() { }
/** @type {?} */
LatLngLiteral.prototype.lat;
/** @type {?} */
LatLngLiteral.prototype.lng;
/**
 * @record
 */
export function MouseEvent() { }
/** @type {?} */
MouseEvent.prototype.latLng;
/**
 * @record
 */
export function MapOptions() { }
/** @type {?|undefined} */
MapOptions.prototype.center;
/** @type {?|undefined} */
MapOptions.prototype.zoom;
/** @type {?|undefined} */
MapOptions.prototype.minZoom;
/** @type {?|undefined} */
MapOptions.prototype.maxZoom;
/** @type {?|undefined} */
MapOptions.prototype.disableDoubleClickZoom;
/** @type {?|undefined} */
MapOptions.prototype.disableDefaultUI;
/** @type {?|undefined} */
MapOptions.prototype.scrollwheel;
/** @type {?|undefined} */
MapOptions.prototype.backgroundColor;
/** @type {?|undefined} */
MapOptions.prototype.draggable;
/** @type {?|undefined} */
MapOptions.prototype.draggableCursor;
/** @type {?|undefined} */
MapOptions.prototype.draggingCursor;
/** @type {?|undefined} */
MapOptions.prototype.keyboardShortcuts;
/** @type {?|undefined} */
MapOptions.prototype.styles;
/** @type {?|undefined} */
MapOptions.prototype.zoomControl;
/** @type {?|undefined} */
MapOptions.prototype.zoomControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.streetViewControl;
/** @type {?|undefined} */
MapOptions.prototype.streetViewControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.scaleControl;
/** @type {?|undefined} */
MapOptions.prototype.scaleControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.mapTypeControl;
/** @type {?|undefined} */
MapOptions.prototype.mapTypeControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.panControl;
/** @type {?|undefined} */
MapOptions.prototype.panControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.rotateControl;
/** @type {?|undefined} */
MapOptions.prototype.rotateControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.fullscreenControl;
/** @type {?|undefined} */
MapOptions.prototype.fullscreenControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.mapTypeId;
/** @type {?|undefined} */
MapOptions.prototype.clickableIcons;
/** @type {?|undefined} */
MapOptions.prototype.gestureHandling;
/**
 * @record
 */
export function MapTypeStyle() { }
/** @type {?|undefined} */
MapTypeStyle.prototype.elementType;
/** @type {?|undefined} */
MapTypeStyle.prototype.featureType;
/** @type {?} */
MapTypeStyle.prototype.stylers;
/**
 *  If more than one key is specified in a single MapTypeStyler, all but one will be ignored.
 * @record
 */
export function MapTypeStyler() { }
/** @type {?|undefined} */
MapTypeStyler.prototype.color;
/** @type {?|undefined} */
MapTypeStyler.prototype.gamma;
/** @type {?|undefined} */
MapTypeStyler.prototype.hue;
/** @type {?|undefined} */
MapTypeStyler.prototype.invert_lightness;
/** @type {?|undefined} */
MapTypeStyler.prototype.lightness;
/** @type {?|undefined} */
MapTypeStyler.prototype.saturation;
/** @type {?|undefined} */
MapTypeStyler.prototype.visibility;
/** @type {?|undefined} */
MapTypeStyler.prototype.weight;
/**
 * @record
 */
export function InfoWindow() { }
/** @type {?} */
InfoWindow.prototype.constructor;
/** @type {?} */
InfoWindow.prototype.close;
/** @type {?} */
InfoWindow.prototype.getContent;
/** @type {?} */
InfoWindow.prototype.getPosition;
/** @type {?} */
InfoWindow.prototype.getZIndex;
/** @type {?} */
InfoWindow.prototype.open;
/** @type {?} */
InfoWindow.prototype.setContent;
/** @type {?} */
InfoWindow.prototype.setOptions;
/** @type {?} */
InfoWindow.prototype.setPosition;
/** @type {?} */
InfoWindow.prototype.setZIndex;
/**
 * @record
 */
export function MVCObject() { }
/** @type {?} */
MVCObject.prototype.addListener;
/**
 * @record
 */
export function MapsEventListener() { }
/** @type {?} */
MapsEventListener.prototype.remove;
/**
 * @record
 */
export function Size() { }
/** @type {?} */
Size.prototype.height;
/** @type {?} */
Size.prototype.width;
/** @type {?} */
Size.prototype.constructor;
/** @type {?} */
Size.prototype.equals;
/** @type {?} */
Size.prototype.toString;
/**
 * @record
 */
export function InfoWindowOptions() { }
/** @type {?|undefined} */
InfoWindowOptions.prototype.content;
/** @type {?|undefined} */
InfoWindowOptions.prototype.disableAutoPan;
/** @type {?|undefined} */
InfoWindowOptions.prototype.maxWidth;
/** @type {?|undefined} */
InfoWindowOptions.prototype.pixelOffset;
/** @type {?|undefined} */
InfoWindowOptions.prototype.position;
/** @type {?|undefined} */
InfoWindowOptions.prototype.zIndex;
/**
 * @record
 */
export function Point() { }
/** @type {?} */
Point.prototype.x;
/** @type {?} */
Point.prototype.y;
/** @type {?} */
Point.prototype.equals;
/** @type {?} */
Point.prototype.toString;
/**
 * @record
 */
export function GoogleSymbol() { }
/** @type {?|undefined} */
GoogleSymbol.prototype.anchor;
/** @type {?|undefined} */
GoogleSymbol.prototype.fillColor;
/** @type {?|undefined} */
GoogleSymbol.prototype.fillOpacity;
/** @type {?|undefined} */
GoogleSymbol.prototype.labelOrigin;
/** @type {?|undefined} */
GoogleSymbol.prototype.path;
/** @type {?|undefined} */
GoogleSymbol.prototype.rotation;
/** @type {?|undefined} */
GoogleSymbol.prototype.scale;
/** @type {?|undefined} */
GoogleSymbol.prototype.strokeColor;
/** @type {?|undefined} */
GoogleSymbol.prototype.strokeOpacity;
/** @type {?|undefined} */
GoogleSymbol.prototype.strokeWeight;
/**
 * @record
 */
export function IconSequence() { }
/** @type {?|undefined} */
IconSequence.prototype.fixedRotation;
/** @type {?|undefined} */
IconSequence.prototype.icon;
/** @type {?|undefined} */
IconSequence.prototype.offset;
/** @type {?|undefined} */
IconSequence.prototype.repeat;
/**
 * @record
 */
export function PolylineOptions() { }
/** @type {?|undefined} */
PolylineOptions.prototype.clickable;
/** @type {?|undefined} */
PolylineOptions.prototype.draggable;
/** @type {?|undefined} */
PolylineOptions.prototype.editable;
/** @type {?|undefined} */
PolylineOptions.prototype.geodesic;
/** @type {?|undefined} */
PolylineOptions.prototype.icon;
/** @type {?|undefined} */
PolylineOptions.prototype.map;
/** @type {?|undefined} */
PolylineOptions.prototype.path;
/** @type {?|undefined} */
PolylineOptions.prototype.strokeColor;
/** @type {?|undefined} */
PolylineOptions.prototype.strokeOpacity;
/** @type {?|undefined} */
PolylineOptions.prototype.strokeWeight;
/** @type {?|undefined} */
PolylineOptions.prototype.visible;
/** @type {?|undefined} */
PolylineOptions.prototype.zIndex;
/**
 * @record
 */
export function Polyline() { }
/** @type {?} */
Polyline.prototype.getDraggable;
/** @type {?} */
Polyline.prototype.getEditable;
/** @type {?} */
Polyline.prototype.getMap;
/** @type {?} */
Polyline.prototype.getPath;
/** @type {?} */
Polyline.prototype.getVisible;
/** @type {?} */
Polyline.prototype.setDraggable;
/** @type {?} */
Polyline.prototype.setEditable;
/** @type {?} */
Polyline.prototype.setMap;
/** @type {?} */
Polyline.prototype.setOptions;
/** @type {?} */
Polyline.prototype.setPath;
/** @type {?} */
Polyline.prototype.setVisible;
/**
 * PolyMouseEvent gets emitted when the user triggers mouse events on a polyline.
 * @record
 */
export function PolyMouseEvent() { }
/** @type {?} */
PolyMouseEvent.prototype.edge;
/** @type {?} */
PolyMouseEvent.prototype.path;
/** @type {?} */
PolyMouseEvent.prototype.vertex;
/**
 * @record
 */
export function PolygonOptions() { }
/** @type {?|undefined} */
PolygonOptions.prototype.clickable;
/** @type {?|undefined} */
PolygonOptions.prototype.draggable;
/** @type {?|undefined} */
PolygonOptions.prototype.editable;
/** @type {?|undefined} */
PolygonOptions.prototype.fillColor;
/** @type {?|undefined} */
PolygonOptions.prototype.fillOpacity;
/** @type {?|undefined} */
PolygonOptions.prototype.geodesic;
/** @type {?|undefined} */
PolygonOptions.prototype.icon;
/** @type {?|undefined} */
PolygonOptions.prototype.map;
/** @type {?|undefined} */
PolygonOptions.prototype.paths;
/** @type {?|undefined} */
PolygonOptions.prototype.strokeColor;
/** @type {?|undefined} */
PolygonOptions.prototype.strokeOpacity;
/** @type {?|undefined} */
PolygonOptions.prototype.strokeWeight;
/** @type {?|undefined} */
PolygonOptions.prototype.visible;
/** @type {?|undefined} */
PolygonOptions.prototype.zIndex;
/**
 * @record
 */
export function Polygon() { }
/** @type {?} */
Polygon.prototype.zIndex;
/** @type {?} */
Polygon.prototype.getDraggable;
/** @type {?} */
Polygon.prototype.getEditable;
/** @type {?} */
Polygon.prototype.getMap;
/** @type {?} */
Polygon.prototype.getPath;
/** @type {?} */
Polygon.prototype.getPaths;
/** @type {?} */
Polygon.prototype.getVisible;
/** @type {?} */
Polygon.prototype.setDraggable;
/** @type {?} */
Polygon.prototype.setEditable;
/** @type {?} */
Polygon.prototype.setMap;
/** @type {?} */
Polygon.prototype.setPath;
/** @type {?} */
Polygon.prototype.setOptions;
/** @type {?} */
Polygon.prototype.setPaths;
/** @type {?} */
Polygon.prototype.setVisible;
/**
 * @record
 */
export function KmlLayer() { }
/** @type {?} */
KmlLayer.prototype.getDefaultViewport;
/** @type {?} */
KmlLayer.prototype.getMap;
/** @type {?} */
KmlLayer.prototype.getMetadata;
/** @type {?} */
KmlLayer.prototype.getStatus;
/** @type {?} */
KmlLayer.prototype.getUrl;
/** @type {?} */
KmlLayer.prototype.getZIndex;
/** @type {?} */
KmlLayer.prototype.setMap;
/** @type {?} */
KmlLayer.prototype.setOptions;
/** @type {?} */
KmlLayer.prototype.setUrl;
/** @type {?} */
KmlLayer.prototype.setZIndex;
/** @typedef {?} */
var KmlLayerStatus;
export { KmlLayerStatus };
/**
 * See: https://developers.google.com/maps/documentation/javascript/reference?hl=de#KmlLayerMetadata
 * @record
 */
export function KmlLayerMetadata() { }
/** @type {?} */
KmlLayerMetadata.prototype.author;
/** @type {?} */
KmlLayerMetadata.prototype.description;
/** @type {?} */
KmlLayerMetadata.prototype.hasScreenOverlays;
/** @type {?} */
KmlLayerMetadata.prototype.name;
/** @type {?} */
KmlLayerMetadata.prototype.snippet;
/**
 * @record
 */
export function KmlAuthor() { }
/** @type {?} */
KmlAuthor.prototype.email;
/** @type {?} */
KmlAuthor.prototype.name;
/** @type {?} */
KmlAuthor.prototype.uri;
/**
 * @record
 */
export function KmlLayerOptions() { }
/** @type {?|undefined} */
KmlLayerOptions.prototype.clickable;
/** @type {?|undefined} */
KmlLayerOptions.prototype.map;
/** @type {?|undefined} */
KmlLayerOptions.prototype.preserveViewport;
/** @type {?|undefined} */
KmlLayerOptions.prototype.screenOverlays;
/** @type {?|undefined} */
KmlLayerOptions.prototype.suppressInfoWindows;
/** @type {?|undefined} */
KmlLayerOptions.prototype.url;
/** @type {?|undefined} */
KmlLayerOptions.prototype.zIndex;
/**
 * @record
 */
export function KmlFeatureData() { }
/** @type {?} */
KmlFeatureData.prototype.author;
/** @type {?} */
KmlFeatureData.prototype.description;
/** @type {?} */
KmlFeatureData.prototype.id;
/** @type {?} */
KmlFeatureData.prototype.infoWindowHtml;
/** @type {?} */
KmlFeatureData.prototype.name;
/** @type {?} */
KmlFeatureData.prototype.snippet;
/**
 * @record
 */
export function KmlMouseEvent() { }
/** @type {?} */
KmlMouseEvent.prototype.featureData;
/** @type {?} */
KmlMouseEvent.prototype.pixelOffset;
/**
 * @record
 */
export function Data() { }
/** @type {?} */
Data.prototype.features;
/** @type {?} */
Data.prototype.constructor;
/** @type {?} */
Data.prototype.addGeoJson;
/** @type {?} */
Data.prototype.remove;
/** @type {?} */
Data.prototype.setControlPosition;
/** @type {?} */
Data.prototype.setControls;
/** @type {?} */
Data.prototype.setDrawingMode;
/** @type {?} */
Data.prototype.setMap;
/** @type {?} */
Data.prototype.setStyle;
/** @type {?} */
Data.prototype.forEach;
/**
 * @record
 */
export function Feature() { }
/** @type {?|undefined} */
Feature.prototype.id;
/** @type {?} */
Feature.prototype.geometry;
/** @type {?} */
Feature.prototype.properties;
/**
 * @record
 */
export function DataOptions() { }
/** @type {?|undefined} */
DataOptions.prototype.controlPosition;
/** @type {?|undefined} */
DataOptions.prototype.controls;
/** @type {?|undefined} */
DataOptions.prototype.drawingMode;
/** @type {?|undefined} */
DataOptions.prototype.featureFactory;
/** @type {?|undefined} */
DataOptions.prototype.map;
/** @type {?|undefined} */
DataOptions.prototype.style;
/**
 * @record
 */
export function DataMouseEvent() { }
/** @type {?} */
DataMouseEvent.prototype.feature;
/**
 * @record
 */
export function GeoJsonOptions() { }
/** @type {?} */
GeoJsonOptions.prototype.idPropertyName;
/**
 * @record
 */
export function Geometry() { }
/** @type {?} */
Geometry.prototype.type;
/** @enum {number} */
const ControlPosition = {
    BOTTOM_CENTER: 0,
    BOTTOM_LEFT: 1,
    BOTTOM_RIGHT: 2,
    LEFT_BOTTOM: 3,
    LEFT_CENTER: 4,
    LEFT_TOP: 5,
    RIGHT_BOTTOM: 6,
    RIGHT_CENTER: 7,
    RIGHT_TOP: 8,
    TOP_CENTER: 9,
    TOP_LEFT: 10,
    TOP_RIGHT: 11,
};
export { ControlPosition };
ControlPosition[ControlPosition.BOTTOM_CENTER] = 'BOTTOM_CENTER';
ControlPosition[ControlPosition.BOTTOM_LEFT] = 'BOTTOM_LEFT';
ControlPosition[ControlPosition.BOTTOM_RIGHT] = 'BOTTOM_RIGHT';
ControlPosition[ControlPosition.LEFT_BOTTOM] = 'LEFT_BOTTOM';
ControlPosition[ControlPosition.LEFT_CENTER] = 'LEFT_CENTER';
ControlPosition[ControlPosition.LEFT_TOP] = 'LEFT_TOP';
ControlPosition[ControlPosition.RIGHT_BOTTOM] = 'RIGHT_BOTTOM';
ControlPosition[ControlPosition.RIGHT_CENTER] = 'RIGHT_CENTER';
ControlPosition[ControlPosition.RIGHT_TOP] = 'RIGHT_TOP';
ControlPosition[ControlPosition.TOP_CENTER] = 'TOP_CENTER';
ControlPosition[ControlPosition.TOP_LEFT] = 'TOP_LEFT';
ControlPosition[ControlPosition.TOP_RIGHT] = 'TOP_RIGHT';
/** @enum {number} */
const MapTypeId = {
    /** This map type displays a transparent layer of major streets on satellite images. */
    hybrid: 0,
    /** This map type displays a normal street map. */
    roadmap: 1,
    /** This map type displays satellite images. */
    satellite: 2,
    /** This map type displays maps with physical features such as terrain and vegetation. */
    terrain: 3,
};
export { MapTypeId };
MapTypeId[MapTypeId.hybrid] = 'hybrid';
MapTypeId[MapTypeId.roadmap] = 'roadmap';
MapTypeId[MapTypeId.satellite] = 'satellite';
MapTypeId[MapTypeId.terrain] = 'terrain';
/**
 * Options for the rendering of the map type control.
 * @record
 */
export function MapTypeControlOptions() { }
/**
 * IDs of map types to show in the control.
 * @type {?|undefined}
 */
MapTypeControlOptions.prototype.mapTypeIds;
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_RIGHT.
 * @type {?|undefined}
 */
MapTypeControlOptions.prototype.position;
/**
 * Style id. Used to select what style of map type control to display.
 * @type {?|undefined}
 */
MapTypeControlOptions.prototype.style;
/** @enum {number} */
const MapTypeControlStyle = {
    DEFAULT: 0,
    DROPDOWN_MENU: 1,
    HORIZONTAL_BAR: 2,
};
export { MapTypeControlStyle };
MapTypeControlStyle[MapTypeControlStyle.DEFAULT] = 'DEFAULT';
MapTypeControlStyle[MapTypeControlStyle.DROPDOWN_MENU] = 'DROPDOWN_MENU';
MapTypeControlStyle[MapTypeControlStyle.HORIZONTAL_BAR] = 'HORIZONTAL_BAR';
/**
 * @record
 */
export function OverviewMapControlOptions() { }
/** @type {?|undefined} */
OverviewMapControlOptions.prototype.opened;
/**
 * Options for the rendering of the pan control.
 * @record
 */
export function PanControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_LEFT.
 * @type {?|undefined}
 */
PanControlOptions.prototype.position;
/**
 * Options for the rendering of the rotate control.
 * @record
 */
export function RotateControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_LEFT.
 * @type {?|undefined}
 */
RotateControlOptions.prototype.position;
/**
 * Options for the rendering of the scale control.
 * @record
 */
export function ScaleControlOptions() { }
/**
 * Style id. Used to select what style of scale control to display.
 * @type {?|undefined}
 */
ScaleControlOptions.prototype.style;
/** @enum {number} */
const ScaleControlStyle = {
    DEFAULT: 0,
};
export { ScaleControlStyle };
ScaleControlStyle[ScaleControlStyle.DEFAULT] = 'DEFAULT';
/**
 * Options for the rendering of the Street View pegman control on the map.
 * @record
 */
export function StreetViewControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map. The
 * default position is embedded within the navigation (zoom and pan) controls.
 * If this position is empty or the same as that specified in the
 * zoomControlOptions or panControlOptions, the Street View control will be
 * displayed as part of the navigation controls. Otherwise, it will be displayed
 * separately.
 * @type {?|undefined}
 */
StreetViewControlOptions.prototype.position;
/**
 * Options for the rendering of the zoom control.
 * @record
 */
export function ZoomControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_LEFT.
 * @type {?|undefined}
 */
ZoomControlOptions.prototype.position;
/** @type {?|undefined} */
ZoomControlOptions.prototype.style;
/** @enum {number} */
const ZoomControlStyle = {
    DEFAULT: 0,
    LARGE: 1,
    SMALL: 2,
};
export { ZoomControlStyle };
ZoomControlStyle[ZoomControlStyle.DEFAULT] = 'DEFAULT';
ZoomControlStyle[ZoomControlStyle.LARGE] = 'LARGE';
ZoomControlStyle[ZoomControlStyle.SMALL] = 'SMALL';
/**
 * Options for the rendering of the fullscreen control.
 * @record
 */
export function FullscreenControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is RIGHT_TOP.
 * @type {?|undefined}
 */
FullscreenControlOptions.prototype.position;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC10eXBlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFdBQVcsTUFBTSxDQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdWRyQixnQkFBYTtJQUNiLGNBQVc7SUFDWCxlQUFZO0lBQ1osY0FBVztJQUNYLGNBQVc7SUFDWCxXQUFRO0lBQ1IsZUFBWTtJQUNaLGVBQVk7SUFDWixZQUFTO0lBQ1QsYUFBVTtJQUNWLFlBQVE7SUFDUixhQUFTOzs7Z0NBWFQsYUFBYTtnQ0FDYixXQUFXO2dDQUNYLFlBQVk7Z0NBQ1osV0FBVztnQ0FDWCxXQUFXO2dDQUNYLFFBQVE7Z0NBQ1IsWUFBWTtnQ0FDWixZQUFZO2dDQUNaLFNBQVM7Z0NBQ1QsVUFBVTtnQ0FDVixRQUFRO2dDQUNSLFNBQVM7Ozs7SUFLVCxTQUFNOztJQUVOLFVBQU87O0lBRVAsWUFBUzs7SUFFVCxVQUFPOzs7b0JBTlAsTUFBTTtvQkFFTixPQUFPO29CQUVQLFNBQVM7b0JBRVQsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JQLFVBQU87SUFDUCxnQkFBYTtJQUNiLGlCQUFjOzs7d0NBRmQsT0FBTzt3Q0FDUCxhQUFhO3dDQUNiLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0NkLFVBQU87OztvQ0FBUCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkJQLFVBQU87SUFDUCxRQUFLO0lBQ0wsUUFBSzs7O2tDQUZMLE9BQU87a0NBQ1AsS0FBSztrQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGxldCBnb29nbGU6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlTWFwIGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBkYXRhPzogRGF0YTtcclxuICBjb25zdHJ1Y3RvcihlbDogSFRNTEVsZW1lbnQsIG9wdHM/OiBNYXBPcHRpb25zKTogdm9pZDtcclxuICBwYW5UbyhsYXRMbmc6IExhdExuZ3xMYXRMbmdMaXRlcmFsKTogdm9pZDtcclxuICBzZXRab29tKHpvb206IG51bWJlcik6IHZvaWQ7XHJcbiAgZ2V0Q2VudGVyKCk6IExhdExuZztcclxuICBzZXRDZW50ZXIobGF0TG5nOiBMYXRMbmd8TGF0TG5nTGl0ZXJhbCk6IHZvaWQ7XHJcbiAgZ2V0Qm91bmRzKCk6IExhdExuZ0JvdW5kcztcclxuICBnZXRab29tKCk6IG51bWJlcjtcclxuICBnZXREaXYoKTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgZ2V0UHJvamVjdGlvbigpOiBhbnk7XHJcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBNYXBPcHRpb25zKTogdm9pZDtcclxuICBwYW5Ub0JvdW5kcyhsYXRMbmdCb3VuZHM6IExhdExuZ0JvdW5kc3xMYXRMbmdCb3VuZHNMaXRlcmFsKTogdm9pZDtcclxuICBmaXRCb3VuZHMoYm91bmRzOiBMYXRMbmdCb3VuZHN8TGF0TG5nQm91bmRzTGl0ZXJhbCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF0TG5nIHtcclxuICBjb25zdHJ1Y3RvcihsYXQ6IG51bWJlciwgbG5nOiBudW1iZXIpOiB2b2lkO1xyXG4gIGxhdCgpOiBudW1iZXI7XHJcbiAgbG5nKCk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXJrZXIgZXh0ZW5kcyBNVkNPYmplY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBNYXJrZXJPcHRpb25zKTogdm9pZDtcclxuICBzZXRNYXAobWFwOiBHb29nbGVNYXApOiB2b2lkO1xyXG4gIHNldFBvc2l0aW9uKGxhdExuZzogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xyXG4gIHNldFRpdGxlKHRpdGxlOiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNldExhYmVsKGxhYmVsOiBzdHJpbmd8TWFya2VyTGFiZWwpOiB2b2lkO1xyXG4gIHNldFBvc2l0aW9uKGxhdGxuZzogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xyXG4gIHNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHNldEljb24oaWNvbjogc3RyaW5nKTogdm9pZDtcclxuICBzZXRPcGFjaXR5KG9wYWNpdHk6IG51bWJlcik6IHZvaWQ7XHJcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBNYXJrZXJPcHRpb25zKTogdm9pZDtcclxuICBzZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHNldFpJbmRleCh6SW5kZXg6IG51bWJlcik6IHZvaWQ7XHJcbiAgZ2V0TGFiZWwoKTogTWFya2VyTGFiZWw7XHJcbiAgZ2V0UG9zaXRpb24oKTogTGF0TG5nO1xyXG4gIGdldFZpc2libGUoKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXJrZXJPcHRpb25zIHtcclxuICBwb3NpdGlvbjogTGF0TG5nfExhdExuZ0xpdGVyYWw7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgbWFwPzogR29vZ2xlTWFwO1xyXG4gIGxhYmVsPzogc3RyaW5nfE1hcmtlckxhYmVsO1xyXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XHJcbiAgY2xpY2thYmxlPzogYm9vbGVhbjtcclxuICBpY29uPzogc3RyaW5nO1xyXG4gIG9wYWNpdHk/OiBudW1iZXI7XHJcbiAgdmlzaWJsZT86IGJvb2xlYW47XHJcbiAgekluZGV4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtlckxhYmVsIHtcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIGZvbnRGYW1pbHk6IHN0cmluZztcclxuICBmb250U2l6ZTogc3RyaW5nO1xyXG4gIGZvbnRXZWlnaHQ6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2x1c3RlclN0eWxlIHtcclxuICB1cmw/OiBzdHJpbmc7XHJcbiAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG4gIGFuY2hvcj86IEFycmF5PG51bWJlcj47XHJcbiAgdGV4dENvbG9yPzogc3RyaW5nO1xyXG4gIHRleHRTaXplPzogbnVtYmVyO1xyXG4gIGJhY2tncm91bmRQb3NpdGlvbj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXJrZXJDbHVzdGVyZXIge1xyXG4gIGlzWm9vbU9uQ2xpY2soKTogYm9vbGVhbjtcclxuICBpc0F2ZXJhZ2VDZW50ZXIoKTogYm9vbGVhbjtcclxuICBnZXRNYXJrZXJzKCk6IEFycmF5PE1hcmtlcj47XHJcbiAgZ2V0VG90YWxNYXJrZXJzKCk6IG51bWJlcjtcclxuICBzZXRNYXhab29tKG1heFpvb206IG51bWJlcik6IHZvaWQ7XHJcbiAgZ2V0TWF4Wm9vbSgpOiBudW1iZXI7XHJcbiAgYWRkTWFya2VycyhtYXJrZXJzOiBBcnJheTxNYXJrZXI+LCBvcHRfbm9kcmF3PzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgYWRkTWFya2VyKG1hcmtlcjogTWFya2VyLCBvcHRfbm9kcmF3PzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgcmVtb3ZlTWFya2VycyhtYXJrZXJzOiBBcnJheTxNYXJrZXI+LCBvcHRfbm9kcmF3PzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFya2VyLCBvcHRfbm9kcmF3PzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgZ2V0VG90YWxDbHVzdGVycygpOiBudW1iZXI7XHJcbiAgZ2V0TWFwKCk6IEdvb2dsZU1hcDtcclxuICBzZXRNYXAobWFwOiBHb29nbGVNYXApOiB2b2lkO1xyXG4gIGdldEdyaWRTaXplKCk6IG51bWJlcjtcclxuICBzZXRHcmlkU2l6ZShncmlkU2l6ZTogbnVtYmVyKTogdm9pZDtcclxuICBnZXRNaW5DbHVzdGVyU2l6ZSgpOiBudW1iZXI7XHJcbiAgc2V0TWluQ2x1c3RlclNpemUobWluQ2x1c3RlclNpemU6IG51bWJlcik6IHZvaWQ7XHJcbiAgY2xlYXJNYXJrZXJzKCk6IHZvaWQ7XHJcbiAgc2V0U3R5bGVzKHN0eWxlczogQXJyYXk8Q2x1c3RlclN0eWxlPik6IHZvaWQ7XHJcbiAgZ2V0U3R5bGVzKCk6IEFycmF5PENsdXN0ZXJTdHlsZT47XHJcbiAgc2V0Q2FsY3VsYXRvcihjYWxsYmFjazogKG1hcmtlcnM6IEFycmF5PE1hcmtlcj4sIG51bVN0eWxlczogbnVtYmVyKSA9PiB7IHRleHQ6IHN0cmluZywgaW5kZXg6IG51bWJlcn0pOiB2b2lkO1xyXG4gIGdldENhbGN1bGF0b3IoKTogKG1hcmtlcnM6IEFycmF5PE1hcmtlcj4sIG51bVN0eWxlczogbnVtYmVyKSA9PiB7IHRleHQ6IHN0cmluZywgaW5kZXg6IG51bWJlcn07XHJcbiAgcmVzZXRWaWV3cG9ydChoaWRlPzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgcmVkcmF3KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2lyY2xlIGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBnZXRCb3VuZHMoKTogTGF0TG5nQm91bmRzO1xyXG4gIGdldENlbnRlcigpOiBMYXRMbmc7XHJcbiAgZ2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW47XHJcbiAgZ2V0RWRpdGFibGUoKTogYm9vbGVhbjtcclxuICBnZXRNYXAoKTogR29vZ2xlTWFwO1xyXG4gIGdldFJhZGl1cygpOiBudW1iZXI7XHJcbiAgZ2V0VmlzaWJsZSgpOiBib29sZWFuO1xyXG4gIHNldENlbnRlcihjZW50ZXI6IExhdExuZ3xMYXRMbmdMaXRlcmFsKTogdm9pZDtcclxuICBzZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcclxuICBzZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKTogdm9pZDtcclxuICBzZXRPcHRpb25zKG9wdGlvbnM6IENpcmNsZU9wdGlvbnMpOiB2b2lkO1xyXG4gIHNldFJhZGl1cyhyYWRpdXM6IG51bWJlcik6IHZvaWQ7XHJcbiAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaXJjbGVPcHRpb25zIHtcclxuICBjZW50ZXI/OiBMYXRMbmd8TGF0TG5nTGl0ZXJhbDtcclxuICBjbGlja2FibGU/OiBib29sZWFuO1xyXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XHJcbiAgZWRpdGFibGU/OiBib29sZWFuO1xyXG4gIGZpbGxDb2xvcj86IHN0cmluZztcclxuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcclxuICBtYXA/OiBHb29nbGVNYXA7XHJcbiAgcmFkaXVzPzogbnVtYmVyO1xyXG4gIHN0cm9rZUNvbG9yPzogc3RyaW5nO1xyXG4gIHN0cm9rZU9wYWNpdHk/OiBudW1iZXI7XHJcbiAgc3Ryb2tlUG9zaXRpb24/OiAnQ0VOVEVSJ3wnSU5TSURFJ3wnT1VUU0lERSc7XHJcbiAgc3Ryb2tlV2VpZ2h0PzogbnVtYmVyO1xyXG4gIHZpc2libGU/OiBib29sZWFuO1xyXG4gIHpJbmRleD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMYXRMbmdCb3VuZHMge1xyXG4gIGNvbnRhaW5zKGxhdExuZzogTGF0TG5nKTogYm9vbGVhbjtcclxuICBlcXVhbHMob3RoZXI6IExhdExuZ0JvdW5kc3xMYXRMbmdCb3VuZHNMaXRlcmFsKTogYm9vbGVhbjtcclxuICBleHRlbmQocG9pbnQ6IExhdExuZyk6IHZvaWQ7XHJcbiAgZ2V0Q2VudGVyKCk6IExhdExuZztcclxuICBnZXROb3J0aEVhc3QoKTogTGF0TG5nO1xyXG4gIGdldFNvdXRoV2VzdCgpOiBMYXRMbmc7XHJcbiAgaW50ZXJzZWN0cyhvdGhlcjogTGF0TG5nQm91bmRzfExhdExuZ0JvdW5kc0xpdGVyYWwpOiBib29sZWFuO1xyXG4gIGlzRW1wdHkoKTogYm9vbGVhbjtcclxuICB0b0pTT04oKTogTGF0TG5nQm91bmRzTGl0ZXJhbDtcclxuICB0b1NwYW4oKTogTGF0TG5nO1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZztcclxuICB0b1VybFZhbHVlKHByZWNpc2lvbj86IG51bWJlcik6IHN0cmluZztcclxuICB1bmlvbihvdGhlcjogTGF0TG5nQm91bmRzfExhdExuZ0JvdW5kc0xpdGVyYWwpOiBMYXRMbmdCb3VuZHM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF0TG5nQm91bmRzTGl0ZXJhbCB7XHJcbiAgZWFzdDogbnVtYmVyO1xyXG4gIG5vcnRoOiBudW1iZXI7XHJcbiAgc291dGg6IG51bWJlcjtcclxuICB3ZXN0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF0TG5nTGl0ZXJhbCB7XHJcbiAgbGF0OiBudW1iZXI7XHJcbiAgbG5nOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VFdmVudCB7IGxhdExuZzogTGF0TG5nOyB9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcE9wdGlvbnMge1xyXG4gIGNlbnRlcj86IExhdExuZ3xMYXRMbmdMaXRlcmFsO1xyXG4gIHpvb20/OiBudW1iZXI7XHJcbiAgbWluWm9vbT86IG51bWJlcjtcclxuICBtYXhab29tPzogbnVtYmVyO1xyXG4gIGRpc2FibGVEb3VibGVDbGlja1pvb20/OiBib29sZWFuO1xyXG4gIGRpc2FibGVEZWZhdWx0VUk/OiBib29sZWFuO1xyXG4gIHNjcm9sbHdoZWVsPzogYm9vbGVhbjtcclxuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XHJcbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcclxuICBkcmFnZ2FibGVDdXJzb3I/OiBzdHJpbmc7XHJcbiAgZHJhZ2dpbmdDdXJzb3I/OiBzdHJpbmc7XHJcbiAga2V5Ym9hcmRTaG9ydGN1dHM/OiBib29sZWFuO1xyXG4gIHN0eWxlcz86IE1hcFR5cGVTdHlsZVtdO1xyXG4gIHpvb21Db250cm9sPzogYm9vbGVhbjtcclxuICB6b29tQ29udHJvbE9wdGlvbnM/OiBab29tQ29udHJvbE9wdGlvbnM7XHJcbiAgc3RyZWV0Vmlld0NvbnRyb2w/OiBib29sZWFuO1xyXG4gIHN0cmVldFZpZXdDb250cm9sT3B0aW9ucz86IFN0cmVldFZpZXdDb250cm9sT3B0aW9ucztcclxuICBzY2FsZUNvbnRyb2w/OiBib29sZWFuO1xyXG4gIHNjYWxlQ29udHJvbE9wdGlvbnM/OiBTY2FsZUNvbnRyb2xPcHRpb25zO1xyXG4gIG1hcFR5cGVDb250cm9sPzogYm9vbGVhbjtcclxuICBtYXBUeXBlQ29udHJvbE9wdGlvbnM/OiBNYXBUeXBlQ29udHJvbE9wdGlvbnM7XHJcbiAgcGFuQ29udHJvbD86IGJvb2xlYW47XHJcbiAgcGFuQ29udHJvbE9wdGlvbnM/OiBQYW5Db250cm9sT3B0aW9ucztcclxuICByb3RhdGVDb250cm9sPzogYm9vbGVhbjtcclxuICByb3RhdGVDb250cm9sT3B0aW9ucz86IFJvdGF0ZUNvbnRyb2xPcHRpb25zO1xyXG4gIGZ1bGxzY3JlZW5Db250cm9sPzogYm9vbGVhbjtcclxuICBmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM/OiBGdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM7XHJcbiAgbWFwVHlwZUlkPzogc3RyaW5nfE1hcFR5cGVJZDtcclxuICBjbGlja2FibGVJY29ucz86IGJvb2xlYW47XHJcbiAgZ2VzdHVyZUhhbmRsaW5nPzogJ2Nvb3BlcmF0aXZlJ3wnZ3JlZWR5J3wnbm9uZSd8J2F1dG8nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcFR5cGVTdHlsZSB7XHJcbiAgZWxlbWVudFR5cGU/OiAnYWxsJ3wnZ2VvbWV0cnknfCdnZW9tZXRyeS5maWxsJ3wnZ2VvbWV0cnkuc3Ryb2tlJ3wnbGFiZWxzJ3wnbGFiZWxzLmljb24nfFxyXG4gICAgICAnbGFiZWxzLnRleHQnfCdsYWJlbHMudGV4dC5maWxsJ3wnbGFiZWxzLnRleHQuc3Ryb2tlJztcclxuICBmZWF0dXJlVHlwZT86ICdhZG1pbmlzdHJhdGl2ZSd8J2FkbWluaXN0cmF0aXZlLmNvdW50cnknfCdhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbCd8XHJcbiAgICAgICdhZG1pbmlzdHJhdGl2ZS5sb2NhbGl0eSd8J2FkbWluaXN0cmF0aXZlLm5laWdoYm9yaG9vZCd8J2FkbWluaXN0cmF0aXZlLnByb3ZpbmNlJ3wnYWxsJ3xcclxuICAgICAgJ2xhbmRzY2FwZSd8J2xhbmRzY2FwZS5tYW5fbWFkZSd8J2xhbmRzY2FwZS5uYXR1cmFsJ3wnbGFuZHNjYXBlLm5hdHVyYWwubGFuZGNvdmVyJ3xcclxuICAgICAgJ2xhbmRzY2FwZS5uYXR1cmFsLnRlcnJhaW4nfCdwb2knfCdwb2kuYXR0cmFjdGlvbid8J3BvaS5idXNpbmVzcyd8J3BvaS5nb3Zlcm5tZW50J3xcclxuICAgICAgJ3BvaS5tZWRpY2FsJ3wncG9pLnBhcmsnfCdwb2kucGxhY2Vfb2Zfd29yc2hpcCd8J3BvaS5zY2hvb2wnfCdwb2kuc3BvcnRzX2NvbXBsZXgnfCdyb2FkJ3xcclxuICAgICAgJ3JvYWQuYXJ0ZXJpYWwnfCdyb2FkLmhpZ2h3YXknfCdyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3MnfCdyb2FkLmxvY2FsJ3wndHJhbnNpdCd8XHJcbiAgICAgICd0cmFuc2l0LmxpbmUnfCd0cmFuc2l0LnN0YXRpb24nfCd0cmFuc2l0LnN0YXRpb24uYWlycG9ydCd8J3RyYW5zaXQuc3RhdGlvbi5idXMnfFxyXG4gICAgICAndHJhbnNpdC5zdGF0aW9uLnJhaWwnfCd3YXRlcic7XHJcbiAgc3R5bGVyczogTWFwVHlwZVN0eWxlcltdO1xyXG59XHJcblxyXG4vKipcclxuICogIElmIG1vcmUgdGhhbiBvbmUga2V5IGlzIHNwZWNpZmllZCBpbiBhIHNpbmdsZSBNYXBUeXBlU3R5bGVyLCBhbGwgYnV0IG9uZSB3aWxsIGJlIGlnbm9yZWQuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1hcFR5cGVTdHlsZXIge1xyXG4gIGNvbG9yPzogc3RyaW5nO1xyXG4gIGdhbW1hPzogbnVtYmVyO1xyXG4gIGh1ZT86IHN0cmluZztcclxuICBpbnZlcnRfbGlnaHRuZXNzPzogYm9vbGVhbjtcclxuICBsaWdodG5lc3M/OiBudW1iZXI7XHJcbiAgc2F0dXJhdGlvbj86IG51bWJlcjtcclxuICB2aXNpYmlsaXR5Pzogc3RyaW5nO1xyXG4gIHdlaWdodD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbmZvV2luZG93IGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBjb25zdHJ1Y3RvcihvcHRzPzogSW5mb1dpbmRvd09wdGlvbnMpOiB2b2lkO1xyXG4gIGNsb3NlKCk6IHZvaWQ7XHJcbiAgZ2V0Q29udGVudCgpOiBzdHJpbmd8Tm9kZTtcclxuICBnZXRQb3NpdGlvbigpOiBMYXRMbmc7XHJcbiAgZ2V0WkluZGV4KCk6IG51bWJlcjtcclxuICBvcGVuKG1hcD86IEdvb2dsZU1hcCwgYW5jaG9yPzogTVZDT2JqZWN0KTogdm9pZDtcclxuICBzZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZ3xOb2RlKTogdm9pZDtcclxuICBzZXRPcHRpb25zKG9wdGlvbnM6IEluZm9XaW5kb3dPcHRpb25zKTogdm9pZDtcclxuICBzZXRQb3NpdGlvbihwb3NpdGlvbjogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xyXG4gIHNldFpJbmRleCh6SW5kZXg6IG51bWJlcik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTVZDT2JqZWN0IHsgYWRkTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogTWFwc0V2ZW50TGlzdGVuZXI7IH1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFwc0V2ZW50TGlzdGVuZXIgeyByZW1vdmUoKTogdm9pZDsgfVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTaXplIHtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB3aWR0aFVuaXQ/OiBzdHJpbmcsIGhlaWdodFVuaXQ/OiBzdHJpbmcpOiB2b2lkO1xyXG4gIGVxdWFscyhvdGhlcjogU2l6ZSk6IGJvb2xlYW47XHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEluZm9XaW5kb3dPcHRpb25zIHtcclxuICBjb250ZW50Pzogc3RyaW5nfE5vZGU7XHJcbiAgZGlzYWJsZUF1dG9QYW4/OiBib29sZWFuO1xyXG4gIG1heFdpZHRoPzogbnVtYmVyO1xyXG4gIHBpeGVsT2Zmc2V0PzogU2l6ZTtcclxuICBwb3NpdGlvbj86IExhdExuZ3xMYXRMbmdMaXRlcmFsO1xyXG4gIHpJbmRleD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb2ludCB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBlcXVhbHMob3RoZXI6IFBvaW50KTogYm9vbGVhbjtcclxuICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlU3ltYm9sIHtcclxuICBhbmNob3I/OiBQb2ludDtcclxuICBmaWxsQ29sb3I/OiBzdHJpbmc7XHJcbiAgZmlsbE9wYWNpdHk/OiBzdHJpbmc7XHJcbiAgbGFiZWxPcmlnaW4/OiBQb2ludDtcclxuICBwYXRoPzogc3RyaW5nO1xyXG4gIHJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIHNjYWxlPzogbnVtYmVyO1xyXG4gIHN0cm9rZUNvbG9yPzogc3RyaW5nO1xyXG4gIHN0cm9rZU9wYWNpdHk/OiBudW1iZXI7XHJcbiAgc3Ryb2tlV2VpZ2h0PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEljb25TZXF1ZW5jZSB7XHJcbiAgZml4ZWRSb3RhdGlvbj86IGJvb2xlYW47XHJcbiAgaWNvbj86IEdvb2dsZVN5bWJvbDtcclxuICBvZmZzZXQ/OiBzdHJpbmc7XHJcbiAgcmVwZWF0Pzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBvbHlsaW5lT3B0aW9ucyB7XHJcbiAgY2xpY2thYmxlPzogYm9vbGVhbjtcclxuICBkcmFnZ2FibGU/OiBib29sZWFuO1xyXG4gIGVkaXRhYmxlPzogYm9vbGVhbjtcclxuICBnZW9kZXNpYz86IGJvb2xlYW47XHJcbiAgaWNvbj86IEFycmF5PEljb25TZXF1ZW5jZT47XHJcbiAgbWFwPzogR29vZ2xlTWFwO1xyXG4gIHBhdGg/OiBBcnJheTxMYXRMbmc+fEFycmF5PExhdExuZ3xMYXRMbmdMaXRlcmFsPjtcclxuICBzdHJva2VDb2xvcj86IHN0cmluZztcclxuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xyXG4gIHN0cm9rZVdlaWdodD86IG51bWJlcjtcclxuICB2aXNpYmxlPzogYm9vbGVhbjtcclxuICB6SW5kZXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9seWxpbmUgZXh0ZW5kcyBNVkNPYmplY3Qge1xyXG4gIGdldERyYWdnYWJsZSgpOiBib29sZWFuO1xyXG4gIGdldEVkaXRhYmxlKCk6IGJvb2xlYW47XHJcbiAgZ2V0TWFwKCk6IEdvb2dsZU1hcDtcclxuICBnZXRQYXRoKCk6IEFycmF5PExhdExuZz47XHJcbiAgZ2V0VmlzaWJsZSgpOiBib29sZWFuO1xyXG4gIHNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZDtcclxuICBzZXRNYXAobWFwOiBHb29nbGVNYXApOiB2b2lkO1xyXG4gIHNldE9wdGlvbnMob3B0aW9uczogUG9seWxpbmVPcHRpb25zKTogdm9pZDtcclxuICBzZXRQYXRoKHBhdGg6IEFycmF5PExhdExuZ3xMYXRMbmdMaXRlcmFsPik6IHZvaWQ7XHJcbiAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBvbHlNb3VzZUV2ZW50IGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHRyaWdnZXJzIG1vdXNlIGV2ZW50cyBvbiBhIHBvbHlsaW5lLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBQb2x5TW91c2VFdmVudCBleHRlbmRzIE1vdXNlRXZlbnQge1xyXG4gIGVkZ2U6IG51bWJlcjtcclxuICBwYXRoOiBudW1iZXI7XHJcbiAgdmVydGV4OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9seWdvbk9wdGlvbnMge1xyXG4gIGNsaWNrYWJsZT86IGJvb2xlYW47XHJcbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcclxuICBlZGl0YWJsZT86IGJvb2xlYW47XHJcbiAgZmlsbENvbG9yPzogc3RyaW5nO1xyXG4gIGZpbGxPcGFjaXR5PzogbnVtYmVyO1xyXG4gIGdlb2Rlc2ljPzogYm9vbGVhbjtcclxuICBpY29uPzogQXJyYXk8SWNvblNlcXVlbmNlPjtcclxuICBtYXA/OiBHb29nbGVNYXA7XHJcbiAgcGF0aHM/OiBBcnJheTxMYXRMbmd8TGF0TG5nTGl0ZXJhbD58QXJyYXk8QXJyYXk8TGF0TG5nfExhdExuZ0xpdGVyYWw+PjtcclxuICBzdHJva2VDb2xvcj86IHN0cmluZztcclxuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xyXG4gIHN0cm9rZVdlaWdodD86IG51bWJlcjtcclxuICB2aXNpYmxlPzogYm9vbGVhbjtcclxuICB6SW5kZXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9seWdvbiBleHRlbmRzIE1WQ09iamVjdCB7XHJcbiAgekluZGV4OiBudW1iZXI7XHJcbiAgZ2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW47XHJcbiAgZ2V0RWRpdGFibGUoKTogYm9vbGVhbjtcclxuICBnZXRNYXAoKTogR29vZ2xlTWFwO1xyXG4gIGdldFBhdGgoKTogQXJyYXk8TGF0TG5nPjtcclxuICBnZXRQYXRocygpOiBBcnJheTxBcnJheTxMYXRMbmc+PjtcclxuICBnZXRWaXNpYmxlKCk6IGJvb2xlYW47XHJcbiAgc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQ7XHJcbiAgc2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XHJcbiAgc2V0UGF0aChwYXRoOiBBcnJheTxMYXRMbmc+fEFycmF5PExhdExuZ3xMYXRMbmdMaXRlcmFsPik6IHZvaWQ7XHJcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBQb2x5Z29uT3B0aW9ucyk6IHZvaWQ7XHJcbiAgc2V0UGF0aHMocGF0aHM6IEFycmF5PEFycmF5PExhdExuZ3xMYXRMbmdMaXRlcmFsPj58QXJyYXk8TGF0TG5nfExhdExuZ0xpdGVyYWw+KTogdm9pZDtcclxuICBzZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEttbExheWVyIGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBnZXREZWZhdWx0Vmlld3BvcnQoKTogTGF0TG5nQm91bmRzO1xyXG4gIGdldE1hcCgpOiBHb29nbGVNYXA7XHJcbiAgZ2V0TWV0YWRhdGEoKTogS21sTGF5ZXJNZXRhZGF0YTtcclxuICBnZXRTdGF0dXMoKTogS21sTGF5ZXJTdGF0dXM7XHJcbiAgZ2V0VXJsKCk6IHN0cmluZztcclxuICBnZXRaSW5kZXgoKTogbnVtYmVyO1xyXG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XHJcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBLbWxMYXllck9wdGlvbnMpOiB2b2lkO1xyXG4gIHNldFVybCh1cmw6IHN0cmluZyk6IHZvaWQ7XHJcbiAgc2V0WkluZGV4KHpJbmRleDogbnVtYmVyKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvcmVmZXJlbmNlP2hsPWRlI0ttbExheWVyU3RhdHVzXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBLbWxMYXllclN0YXR1cyA9ICdET0NVTUVOVF9OT1RfRk9VTkQnIHxcclxuICAgICdET0NVTUVOVF9UT09fTEFSR0UnIHwgJ0ZFVENIX0VSUk9SJyB8ICdJTlZBTElEX0RPQ1VNRU5UJyB8ICdJTlZBTElEX1JFUVVFU1QnIHxcclxuICAgICdMSU1JVFNfRVhDRUVERUQnIHwgJ09LJyB8ICdUSU1FRF9PVVQnIHwgJ1VOS05PV04nO1xyXG5cclxuLyoqXHJcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvcmVmZXJlbmNlP2hsPWRlI0ttbExheWVyTWV0YWRhdGFcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgS21sTGF5ZXJNZXRhZGF0YSB7XHJcbiAgYXV0aG9yOiBLbWxBdXRob3I7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBoYXNTY3JlZW5PdmVybGF5czogYm9vbGVhbjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgc25pcHBldDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEttbEF1dGhvciB7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdXJpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS21sTGF5ZXJPcHRpb25zIHtcclxuICBjbGlja2FibGU/OiBib29sZWFuO1xyXG4gIG1hcD86IEdvb2dsZU1hcDtcclxuICBwcmVzZXJ2ZVZpZXdwb3J0PzogYm9vbGVhbjtcclxuICBzY3JlZW5PdmVybGF5cz86IGJvb2xlYW47XHJcbiAgc3VwcHJlc3NJbmZvV2luZG93cz86IGJvb2xlYW47XHJcbiAgdXJsPzogc3RyaW5nO1xyXG4gIHpJbmRleD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLbWxGZWF0dXJlRGF0YSB7XHJcbiAgYXV0aG9yOiBLbWxBdXRob3I7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBpZDogc3RyaW5nO1xyXG4gIGluZm9XaW5kb3dIdG1sOiBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHNuaXBwZXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLbWxNb3VzZUV2ZW50IGV4dGVuZHMgTW91c2VFdmVudCB7XHJcbiAgZmVhdHVyZURhdGE6IEttbEZlYXR1cmVEYXRhO1xyXG4gIHBpeGVsT2Zmc2V0OiBTaXplO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBNVkNPYmplY3Qge1xyXG4gIGZlYXR1cmVzOiBGZWF0dXJlW107XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IERhdGFPcHRpb25zKTogdm9pZDtcclxuICBhZGRHZW9Kc29uKGdlb0pzb246IE9iamVjdCwgb3B0aW9ucz86IEdlb0pzb25PcHRpb25zKTogRmVhdHVyZVtdO1xyXG4gIHJlbW92ZShmZWF0dXJlOiBGZWF0dXJlKTogdm9pZDtcclxuICBzZXRDb250cm9sUG9zaXRpb24oY29udHJvbFBvc2l0aW9uOiBDb250cm9sUG9zaXRpb24pOiB2b2lkO1xyXG4gIHNldENvbnRyb2xzKGNvbnRyb2xzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgc2V0RHJhd2luZ01vZGUoZHJhd2luZ01vZGU6IHN0cmluZyk6IHZvaWQ7XHJcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKTogdm9pZDtcclxuICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gIC8qXHJcbiAgKiBUc2xpbnQgY29uZmlndXJhdGlvbiBjaGVjay1wYXJhbWV0ZXJzIHdpbGwgcHJvbXB0IGVycm9ycyBmb3IgdGhlc2UgbGluZXMgb2YgY29kZS5cclxuICAqIGh0dHBzOi8vcGFsYW50aXIuZ2l0aHViLmlvL3RzbGludC9ydWxlcy9uby11bnVzZWQtdmFyaWFibGUvXHJcbiAgKi9cclxuICBzZXRTdHlsZShzdHlsZTogKCkgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgZm9yRWFjaChjYWxsYmFjazogKGZlYXR1cmU6IEZlYXR1cmUpID0+IHZvaWQpOiB2b2lkO1xyXG4gIC8qIHRzbGludDplbmFibGUgKi9cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlIGV4dGVuZHMgTVZDT2JqZWN0IHtcclxuICBpZD86IG51bWJlcnxzdHJpbmd8dW5kZWZpbmVkO1xyXG4gIGdlb21ldHJ5OiBHZW9tZXRyeTtcclxuICBwcm9wZXJ0aWVzOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YU9wdGlvbnMge1xyXG4gIGNvbnRyb2xQb3NpdGlvbj86IENvbnRyb2xQb3NpdGlvbjtcclxuICBjb250cm9scz86IHN0cmluZ1tdO1xyXG4gIGRyYXdpbmdNb2RlPzogc3RyaW5nO1xyXG4gIGZlYXR1cmVGYWN0b3J5PzogKGdlb21ldHJ5OiBHZW9tZXRyeSkgPT4gRmVhdHVyZTtcclxuICBtYXA/OiBHb29nbGVNYXA7XHJcbiAgc3R5bGU/OiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGFNb3VzZUV2ZW50IGV4dGVuZHMgTW91c2VFdmVudCB7XHJcbiAgZmVhdHVyZTogRmVhdHVyZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHZW9Kc29uT3B0aW9ucyB7XHJcbiAgaWRQcm9wZXJ0eU5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHZW9tZXRyeSB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogSWRlbnRpZmllcnMgdXNlZCB0byBzcGVjaWZ5IHRoZSBwbGFjZW1lbnQgb2YgY29udHJvbHMgb24gdGhlIG1hcC4gQ29udHJvbHMgYXJlXHJcbiAqIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gb3RoZXIgY29udHJvbHMgaW4gdGhlIHNhbWUgbGF5b3V0IHBvc2l0aW9uLiBDb250cm9scyB0aGF0XHJcbiAqIGFyZSBhZGRlZCBmaXJzdCBhcmUgcG9zaXRpb25lZCBjbG9zZXIgdG8gdGhlIGVkZ2Ugb2YgdGhlIG1hcC5cclxuICovXHJcbmV4cG9ydCBlbnVtIENvbnRyb2xQb3NpdGlvbiB7XHJcbiAgQk9UVE9NX0NFTlRFUixcclxuICBCT1RUT01fTEVGVCxcclxuICBCT1RUT01fUklHSFQsXHJcbiAgTEVGVF9CT1RUT00sXHJcbiAgTEVGVF9DRU5URVIsXHJcbiAgTEVGVF9UT1AsXHJcbiAgUklHSFRfQk9UVE9NLFxyXG4gIFJJR0hUX0NFTlRFUixcclxuICBSSUdIVF9UT1AsXHJcbiAgVE9QX0NFTlRFUixcclxuICBUT1BfTEVGVCxcclxuICBUT1BfUklHSFRcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTWFwVHlwZUlkIHtcclxuICAvKiogVGhpcyBtYXAgdHlwZSBkaXNwbGF5cyBhIHRyYW5zcGFyZW50IGxheWVyIG9mIG1ham9yIHN0cmVldHMgb24gc2F0ZWxsaXRlIGltYWdlcy4gKi9cclxuICBoeWJyaWQsXHJcbiAgLyoqIFRoaXMgbWFwIHR5cGUgZGlzcGxheXMgYSBub3JtYWwgc3RyZWV0IG1hcC4gKi9cclxuICByb2FkbWFwLFxyXG4gIC8qKiBUaGlzIG1hcCB0eXBlIGRpc3BsYXlzIHNhdGVsbGl0ZSBpbWFnZXMuICovXHJcbiAgc2F0ZWxsaXRlLFxyXG4gIC8qKiBUaGlzIG1hcCB0eXBlIGRpc3BsYXlzIG1hcHMgd2l0aCBwaHlzaWNhbCBmZWF0dXJlcyBzdWNoIGFzIHRlcnJhaW4gYW5kIHZlZ2V0YXRpb24uICovXHJcbiAgdGVycmFpblxyXG59XHJcblxyXG4vKioqKiogQ29udHJvbHMgKioqKiovXHJcbi8qKiBPcHRpb25zIGZvciB0aGUgcmVuZGVyaW5nIG9mIHRoZSBtYXAgdHlwZSBjb250cm9sLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1hcFR5cGVDb250cm9sT3B0aW9ucyB7XHJcbiAgLyoqIElEcyBvZiBtYXAgdHlwZXMgdG8gc2hvdyBpbiB0aGUgY29udHJvbC4gKi9cclxuICBtYXBUeXBlSWRzPzogKE1hcFR5cGVJZHxzdHJpbmcpW107XHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gaWQuIFVzZWQgdG8gc3BlY2lmeSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wgb24gdGhlIG1hcC5cclxuICAgKiBUaGUgZGVmYXVsdCBwb3NpdGlvbiBpcyBUT1BfUklHSFQuXHJcbiAgICovXHJcbiAgcG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XHJcbiAgLyoqIFN0eWxlIGlkLiBVc2VkIHRvIHNlbGVjdCB3aGF0IHN0eWxlIG9mIG1hcCB0eXBlIGNvbnRyb2wgdG8gZGlzcGxheS4gKi9cclxuICBzdHlsZT86IE1hcFR5cGVDb250cm9sU3R5bGU7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1hcFR5cGVDb250cm9sU3R5bGUge1xyXG4gIERFRkFVTFQsXHJcbiAgRFJPUERPV05fTUVOVSxcclxuICBIT1JJWk9OVEFMX0JBUlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE92ZXJ2aWV3TWFwQ29udHJvbE9wdGlvbnMge1xyXG4gIG9wZW5lZD86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKiBPcHRpb25zIGZvciB0aGUgcmVuZGVyaW5nIG9mIHRoZSBwYW4gY29udHJvbC4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBQYW5Db250cm9sT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gaWQuIFVzZWQgdG8gc3BlY2lmeSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wgb24gdGhlIG1hcC5cclxuICAgKiBUaGUgZGVmYXVsdCBwb3NpdGlvbiBpcyBUT1BfTEVGVC5cclxuICAgKi9cclxuICBwb3NpdGlvbj86IENvbnRyb2xQb3NpdGlvbjtcclxufVxyXG5cclxuLyoqIE9wdGlvbnMgZm9yIHRoZSByZW5kZXJpbmcgb2YgdGhlIHJvdGF0ZSBjb250cm9sLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFJvdGF0ZUNvbnRyb2xPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBQb3NpdGlvbiBpZC4gVXNlZCB0byBzcGVjaWZ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udHJvbCBvbiB0aGUgbWFwLlxyXG4gICAqIFRoZSBkZWZhdWx0IHBvc2l0aW9uIGlzIFRPUF9MRUZULlxyXG4gICAqL1xyXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xyXG59XHJcblxyXG4vKiogT3B0aW9ucyBmb3IgdGhlIHJlbmRlcmluZyBvZiB0aGUgc2NhbGUgY29udHJvbC4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTY2FsZUNvbnRyb2xPcHRpb25zIHtcclxuICAvKiogU3R5bGUgaWQuIFVzZWQgdG8gc2VsZWN0IHdoYXQgc3R5bGUgb2Ygc2NhbGUgY29udHJvbCB0byBkaXNwbGF5LiAqL1xyXG4gIHN0eWxlPzogU2NhbGVDb250cm9sU3R5bGU7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNjYWxlQ29udHJvbFN0eWxlIHtcclxuICBERUZBVUxUXHJcbn1cclxuXHJcbi8qKiBPcHRpb25zIGZvciB0aGUgcmVuZGVyaW5nIG9mIHRoZSBTdHJlZXQgVmlldyBwZWdtYW4gY29udHJvbCBvbiB0aGUgbWFwLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVldFZpZXdDb250cm9sT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gaWQuIFVzZWQgdG8gc3BlY2lmeSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wgb24gdGhlIG1hcC4gVGhlXHJcbiAgICogZGVmYXVsdCBwb3NpdGlvbiBpcyBlbWJlZGRlZCB3aXRoaW4gdGhlIG5hdmlnYXRpb24gKHpvb20gYW5kIHBhbikgY29udHJvbHMuXHJcbiAgICogSWYgdGhpcyBwb3NpdGlvbiBpcyBlbXB0eSBvciB0aGUgc2FtZSBhcyB0aGF0IHNwZWNpZmllZCBpbiB0aGVcclxuICAgKiB6b29tQ29udHJvbE9wdGlvbnMgb3IgcGFuQ29udHJvbE9wdGlvbnMsIHRoZSBTdHJlZXQgVmlldyBjb250cm9sIHdpbGwgYmVcclxuICAgKiBkaXNwbGF5ZWQgYXMgcGFydCBvZiB0aGUgbmF2aWdhdGlvbiBjb250cm9scy4gT3RoZXJ3aXNlLCBpdCB3aWxsIGJlIGRpc3BsYXllZFxyXG4gICAqIHNlcGFyYXRlbHkuXHJcbiAgICovXHJcbiAgcG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XHJcbn1cclxuXHJcbi8qKiBPcHRpb25zIGZvciB0aGUgcmVuZGVyaW5nIG9mIHRoZSB6b29tIGNvbnRyb2wuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgWm9vbUNvbnRyb2xPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBQb3NpdGlvbiBpZC4gVXNlZCB0byBzcGVjaWZ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udHJvbCBvbiB0aGUgbWFwLlxyXG4gICAqIFRoZSBkZWZhdWx0IHBvc2l0aW9uIGlzIFRPUF9MRUZULlxyXG4gICAqL1xyXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xyXG4gIHN0eWxlPzogWm9vbUNvbnRyb2xTdHlsZTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gWm9vbUNvbnRyb2xTdHlsZSB7XHJcbiAgREVGQVVMVCxcclxuICBMQVJHRSxcclxuICBTTUFMTFxyXG59XHJcblxyXG4vKiogT3B0aW9ucyBmb3IgdGhlIHJlbmRlcmluZyBvZiB0aGUgZnVsbHNjcmVlbiBjb250cm9sLiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEZ1bGxzY3JlZW5Db250cm9sT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gaWQuIFVzZWQgdG8gc3BlY2lmeSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wgb24gdGhlIG1hcC5cclxuICAgKiBUaGUgZGVmYXVsdCBwb3NpdGlvbiBpcyBSSUdIVF9UT1AuXHJcbiAgICovXHJcbiAgcG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE92ZXJsYXlWaWV3IHtcclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG4gICAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IGFueTtcclxuICAgIHB1YmxpYyBzZXRWYWx1ZXMob3B0aW9uczogYW55KTogdm9pZDtcclxuICAgIHB1YmxpYyBnZXRQYW5lcygpOiBhbnk7XHJcbiAgICBwdWJsaWMgZ2V0UHJvamVjdGlvbigpOiBhbnk7XHJcbiAgICBwdWJsaWMgZ2V0TWFwKCk6IEdvb2dsZU1hcDtcclxufVxyXG4iXX0=