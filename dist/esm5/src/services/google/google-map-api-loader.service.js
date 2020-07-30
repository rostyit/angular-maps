/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
/** @enum {number} */
var ScriptProtocol = {
    HTTP: 0,
    HTTPS: 1,
    AUTO: 2,
};
export { ScriptProtocol };
ScriptProtocol[ScriptProtocol.HTTP] = 'HTTP';
ScriptProtocol[ScriptProtocol.HTTPS] = 'HTTPS';
ScriptProtocol[ScriptProtocol.AUTO] = 'AUTO';
/**
 * Bing Maps V8 specific loader configuration to be used with the {\@link GoogleMapAPILoader}
 *
 * @export
 */
var GoogleMapAPILoaderConfig = /** @class */ (function () {
    function GoogleMapAPILoaderConfig() {
    }
    GoogleMapAPILoaderConfig.decorators = [
        { type: Injectable },
    ];
    return GoogleMapAPILoaderConfig;
}());
export { GoogleMapAPILoaderConfig };
if (false) {
    /**
     * The Google Maps API Key (see:
     * https://developers.google.com/maps/documentation/javascript/get-api-key)
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiKey;
    /**
     * The Google Maps client ID (for premium plans).
     * When you have a Google Maps APIs Premium Plan license, you must authenticate
     * your application with either an API key or a client ID.
     * The Google Maps API will fail to load if both a client ID and an API key are included.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clientId;
    /**
     * The Google Maps channel name (for premium plans).
     * A channel parameter is an optional parameter that allows you to track usage under your client
     * ID by assigning a distinct channel to each of your applications.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.channel;
    /**
     * Google Maps API version.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiVersion;
    /**
     * Host and Path used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.hostAndPath;
    /**
     * Protocol used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.protocol;
    /**
     * Defines which Google Maps libraries should get loaded.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.libraries;
    /**
     * The default bias for the map behavior is US.
     * If you wish to alter your application to serve different map tiles or bias the
     * application, you can overwrite the default behavior (US) by defining a `region`.
     * See https://developers.google.com/maps/documentation/javascript/basics#Region
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.region;
    /**
     * The Google Maps API uses the browser's preferred language when displaying
     * textual information. If you wish to overwrite this behavior and force the API
     * to use a given language, you can use this setting.
     * See https://developers.google.com/maps/documentation/javascript/basics#Language
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.language;
    /**
     * The Google Maps API requires a separate library for clustering. Set the property
     * to true in order to load this library.
     * See https://developers.google.com/maps/documentation/javascript/marker-clustering
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.enableClustering;
    /**
     * Host and Path used for the cluster library `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clusterHostAndPath;
}
/** *
 * Default loader configuration.
  @type {?} */
var DEFAULT_CONFIGURATION = new GoogleMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
var GoogleMapAPILoader = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleMapAPILoader, _super);
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
            _this._config = DEFAULT_CONFIGURATION;
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
         */
        function () { return this._config; },
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
            (/** @type {?} */ (_this._windowRef.GetNativeWindow()))[callbackName] = function () {
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
        var protocolType = /** @type {?} */ (((this._config && this._config.protocol) || ScriptProtocol.HTTPS));
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
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleMapAPILoader.ctorParameters = function () { return [
        { type: GoogleMapAPILoaderConfig, decorators: [{ type: Optional }] },
        { type: WindowRef },
        { type: DocumentRef }
    ]; };
    return GoogleMapAPILoader;
}(MapAPILoader));
export { GoogleMapAPILoader };
if (false) {
    /** @type {?} */
    GoogleMapAPILoader.prototype._scriptLoadingPromise;
    /** @type {?} */
    GoogleMapAPILoader.prototype._config;
    /** @type {?} */
    GoogleMapAPILoader.prototype._windowRef;
    /** @type {?} */
    GoogleMapAPILoader.prototype._documentRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztJQVNuRSxPQUFJO0lBQ0osUUFBSztJQUNMLE9BQUk7Ozs4QkFGSixJQUFJOzhCQUNKLEtBQUs7OEJBQ0wsSUFBSTs7Ozs7Ozs7OztnQkFRUCxVQUFVOzttQ0FwQlg7O1NBcUJhLHdCQUF3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEVyQyxJQUFNLHFCQUFxQixHQUFHLElBQUksd0JBQXdCLEVBQUUsQ0FBQzs7Ozs7OztJQVFyQiw4Q0FBWTtJQW1CaEQ7Ozs7Ozs7T0FPRztJQUNILDRCQUFpQyxPQUFpQyxFQUFVLFVBQXFCLEVBQVUsWUFBeUI7UUFBcEksWUFDSSxpQkFBTyxTQUlWO1FBTGdDLGFBQU8sR0FBUCxPQUFPLENBQTBCO1FBQVUsZ0JBQVUsR0FBVixVQUFVLENBQVc7UUFBVSxrQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUVoSSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxLQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztTQUN4Qzs7S0FDSjswQkFmVSxzQ0FBTTs7Ozs7Ozs7c0JBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFD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LElBQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2FBQ3pDO1lBQ0QsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDNUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFDLEtBQXFDLElBQU8sTUFBTSxDQUFJLEtBQUssQ0FBQyxHQUFHLFNBQUksS0FBSyxDQUFDLEtBQU8sQ0FBQyxFQUFFLENBQUM7YUFDekYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBSSxRQUFRLFVBQUssV0FBVyxTQUFJLE1BQVEsQ0FBQzs7O2dCQWxLdEQsVUFBVTs7OztnQkE0Qm1DLHdCQUF3Qix1QkFBcEQsUUFBUTtnQkFqSUgsU0FBUztnQkFBRSxXQUFXOzs2QkFEN0M7RUF1R3dDLFlBQVk7U0FBdkMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWFwQVBJTG9hZGVyLCBXaW5kb3dSZWYsIERvY3VtZW50UmVmIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcclxuXHJcbi8qKlxyXG4gKiBQcm90b2NvbCBlbnVtZXJhdGlvblxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBTY3JpcHRQcm90b2NvbCB7XHJcbiAgICBIVFRQLFxyXG4gICAgSFRUUFMsXHJcbiAgICBBVVRPXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5nIE1hcHMgVjggc3BlY2lmaWMgbG9hZGVyIGNvbmZpZ3VyYXRpb24gdG8gYmUgdXNlZCB3aXRoIHRoZSB7QGxpbmsgR29vZ2xlTWFwQVBJTG9hZGVyfVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXBBUElMb2FkZXJDb25maWcge1xyXG4gICAgLyoqXHJcbiAgICAgICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgS2V5IChzZWU6XHJcbiAgICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2dldC1hcGkta2V5KVxyXG4gICAgICAgKi9cclxuICAgIGFwaUtleT86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBHb29nbGUgTWFwcyBjbGllbnQgSUQgKGZvciBwcmVtaXVtIHBsYW5zKS5cclxuICAgICAqIFdoZW4geW91IGhhdmUgYSBHb29nbGUgTWFwcyBBUElzIFByZW1pdW0gUGxhbiBsaWNlbnNlLCB5b3UgbXVzdCBhdXRoZW50aWNhdGVcclxuICAgICAqIHlvdXIgYXBwbGljYXRpb24gd2l0aCBlaXRoZXIgYW4gQVBJIGtleSBvciBhIGNsaWVudCBJRC5cclxuICAgICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgd2lsbCBmYWlsIHRvIGxvYWQgaWYgYm90aCBhIGNsaWVudCBJRCBhbmQgYW4gQVBJIGtleSBhcmUgaW5jbHVkZWQuXHJcbiAgICAgKi9cclxuICAgIGNsaWVudElkPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEdvb2dsZSBNYXBzIGNoYW5uZWwgbmFtZSAoZm9yIHByZW1pdW0gcGxhbnMpLlxyXG4gICAgICogQSBjaGFubmVsIHBhcmFtZXRlciBpcyBhbiBvcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBhbGxvd3MgeW91IHRvIHRyYWNrIHVzYWdlIHVuZGVyIHlvdXIgY2xpZW50XHJcbiAgICAgKiBJRCBieSBhc3NpZ25pbmcgYSBkaXN0aW5jdCBjaGFubmVsIHRvIGVhY2ggb2YgeW91ciBhcHBsaWNhdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIGNoYW5uZWw/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHb29nbGUgTWFwcyBBUEkgdmVyc2lvbi5cclxuICAgICAqL1xyXG4gICAgYXBpVmVyc2lvbj86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvc3QgYW5kIFBhdGggdXNlZCBmb3IgdGhlIGA8c2NyaXB0PmAgdGFnLlxyXG4gICAgICovXHJcbiAgICBob3N0QW5kUGF0aD86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3RvY29sIHVzZWQgZm9yIHRoZSBgPHNjcmlwdD5gIHRhZy5cclxuICAgICAqL1xyXG4gICAgcHJvdG9jb2w/OiBTY3JpcHRQcm90b2NvbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgd2hpY2ggR29vZ2xlIE1hcHMgbGlicmFyaWVzIHNob3VsZCBnZXQgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBsaWJyYXJpZXM/OiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkZWZhdWx0IGJpYXMgZm9yIHRoZSBtYXAgYmVoYXZpb3IgaXMgVVMuXHJcbiAgICAgKiBJZiB5b3Ugd2lzaCB0byBhbHRlciB5b3VyIGFwcGxpY2F0aW9uIHRvIHNlcnZlIGRpZmZlcmVudCBtYXAgdGlsZXMgb3IgYmlhcyB0aGVcclxuICAgICAqIGFwcGxpY2F0aW9uLCB5b3UgY2FuIG92ZXJ3cml0ZSB0aGUgZGVmYXVsdCBiZWhhdmlvciAoVVMpIGJ5IGRlZmluaW5nIGEgYHJlZ2lvbmAuXHJcbiAgICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvYmFzaWNzI1JlZ2lvblxyXG4gICAgICovXHJcbiAgICByZWdpb24/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgR29vZ2xlIE1hcHMgQVBJIHVzZXMgdGhlIGJyb3dzZXIncyBwcmVmZXJyZWQgbGFuZ3VhZ2Ugd2hlbiBkaXNwbGF5aW5nXHJcbiAgICAgKiB0ZXh0dWFsIGluZm9ybWF0aW9uLiBJZiB5b3Ugd2lzaCB0byBvdmVyd3JpdGUgdGhpcyBiZWhhdmlvciBhbmQgZm9yY2UgdGhlIEFQSVxyXG4gICAgICogdG8gdXNlIGEgZ2l2ZW4gbGFuZ3VhZ2UsIHlvdSBjYW4gdXNlIHRoaXMgc2V0dGluZy5cclxuICAgICAqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9iYXNpY3MjTGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgbGFuZ3VhZ2U/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgR29vZ2xlIE1hcHMgQVBJIHJlcXVpcmVzIGEgc2VwYXJhdGUgbGlicmFyeSBmb3IgY2x1c3RlcmluZy4gU2V0IHRoZSBwcm9wZXJ0eVxyXG4gICAgICogdG8gdHJ1ZSBpbiBvcmRlciB0byBsb2FkIHRoaXMgbGlicmFyeS5cclxuICAgICAqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9tYXJrZXItY2x1c3RlcmluZ1xyXG4gICAgICovXHJcbiAgICBlbmFibGVDbHVzdGVyaW5nPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvc3QgYW5kIFBhdGggdXNlZCBmb3IgdGhlIGNsdXN0ZXIgbGlicmFyeSBgPHNjcmlwdD5gIHRhZy5cclxuICAgICAqL1xyXG4gICAgY2x1c3Rlckhvc3RBbmRQYXRoPzogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogRGVmYXVsdCBsb2FkZXIgY29uZmlndXJhdGlvbi5cclxuICovXHJcbmNvbnN0IERFRkFVTFRfQ09ORklHVVJBVElPTiA9IG5ldyBHb29nbGVNYXBBUElMb2FkZXJDb25maWcoKTtcclxuXHJcbi8qKlxyXG4gKiBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24gZm9yIHRoZSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBzZXJ2aWNlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXBBUElMb2FkZXIgZXh0ZW5kcyBNYXBBUElMb2FkZXIge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIEZpZWxkIGRlZmludGl0aW9ucy5cclxuICAgIC8vL1xyXG4gICAgcHJpdmF0ZSBfc2NyaXB0TG9hZGluZ1Byb21pc2U6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zLlxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsb2FkZXIgY29uZmlndXJhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBDb25maWcoKTogR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnIHsgcmV0dXJuIHRoaXMuX2NvbmZpZzsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVNYXBBUElMb2FkZXIuXHJcbiAgICAgKiBAcGFyYW0gX2NvbmZpZyAtIFRoZSBsb2FkZXIgY29uZmlndXJhdGlvbi5cclxuICAgICAqIEBwYXJhbSBfd2luZG93UmVmIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFdpbmRvd1JlZn0uIE5lY2Vzc2FyeSBiZWNhdXNlIEJpbmcgTWFwIFY4IGludGVyYWN0cyB3aXRoIHRoZSB3aW5kb3cgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIF9kb2N1bWVudFJlZiAtIEFuIGluc3RhbmNlIG9mIHtAbGluayBEb2N1bWVudFJlZn0uXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZWNlc3NhcnkgYmVjYXVzZSBCaW5nIE1hcCBWOCBpbnRlcmFjdHMgd2l0aCB0aGUgZG9jdW1lbnQgb2JqZWN0LlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciggQE9wdGlvbmFsKCkgcHJpdmF0ZSBfY29uZmlnOiBHb29nbGVNYXBBUElMb2FkZXJDb25maWcsIHByaXZhdGUgX3dpbmRvd1JlZjogV2luZG93UmVmLCBwcml2YXRlIF9kb2N1bWVudFJlZjogRG9jdW1lbnRSZWYpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcgPT09IG51bGwgfHwgdGhpcy5fY29uZmlnID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnID0gREVGQVVMVF9DT05GSUdVUkFUSU9OO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kcyBhbmQgTWFwQVBJTG9hZGVyIGltcGxlbWVudGF0aW9uLlxyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgbmVjZXNzYXJ5IHJlc291cmNlcyBmb3IgQmluZyBNYXBzIFY4LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvYWQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG4gICAgICAgIHNjcmlwdC5kZWZlciA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2tOYW1lID0gYENyZWF0ZWA7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHRoaXMuR2V0TWFwc1NjcmlwdFNyYyhjYWxsYmFja05hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzLl93aW5kb3dSZWYuR2V0TmF0aXZlV2luZG93KCkpW2NhbGxiYWNrTmFtZV0gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLmVuYWJsZUNsdXN0ZXJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBjbHVzdGVyaW5nIGlzIGVuYWJsZWQgdGhlbiBkZWxheSB0aGUgbG9hZGluZyB1bnRpbCBhZnRlciB0aGUgY2x1c3RlciBsaWJyYXJ5IGlzIGxvYWRlZFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsdXN0ZXJTY3JpcHQgPSB0aGlzLl9kb2N1bWVudFJlZi5HZXROYXRpdmVEb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJTY3JpcHQuc3JjID0gdGhpcy5HZXRDbHVzdGVyU2NyaXB0U3JjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlclNjcmlwdC5vbmxvYWQgPSBjbHVzdGVyU2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5oZWFkLmFwcGVuZENoaWxkKGNsdXN0ZXJTY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNjcmlwdC5vbmVycm9yID0gKGVycm9yOiBFdmVudCkgPT4geyByZWplY3QoZXJyb3IpOyB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBNYXBzIHNjcmlwdHMgdXJsIGZvciBpbmplY3Rpb25zIGludG8gdGhlIGhlYWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tOYW1lIC0gTmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIEdvb2dsZSBNYXBzIHNjcmlwdHMgYXJlIGxvYWRlZC5cclxuICAgICAqIEByZXR1cm5zIC0gVGhlIHVybCB0byBiZSB1c2VkIHRvIGxvYWQgdGhlIEdvb2dsZSBNYXAgc2NyaXB0cy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgR2V0TWFwc1NjcmlwdFNyYyhjYWxsYmFja05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGhvc3RBbmRQYXRoOiBzdHJpbmcgPSB0aGlzLl9jb25maWcuaG9zdEFuZFBhdGggfHwgJ21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IEFycmF5PHN0cmluZz4gfSA9IHtcclxuICAgICAgICAgICAgdjogdGhpcy5fY29uZmlnLmFwaVZlcnNpb24sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja05hbWUsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5fY29uZmlnLmFwaUtleSxcclxuICAgICAgICAgICAgY2xpZW50OiB0aGlzLl9jb25maWcuY2xpZW50SWQsXHJcbiAgICAgICAgICAgIGNoYW5uZWw6IHRoaXMuX2NvbmZpZy5jaGFubmVsLFxyXG4gICAgICAgICAgICBsaWJyYXJpZXM6IHRoaXMuX2NvbmZpZy5saWJyYXJpZXMsXHJcbiAgICAgICAgICAgIHJlZ2lvbjogdGhpcy5fY29uZmlnLnJlZ2lvbixcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuX2NvbmZpZy5sYW5ndWFnZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0U2NyaXB0U3JjKGhvc3RBbmRQYXRoLCBxdWVyeVBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgTWFwcyBDbHVzdGVyIGxpYnJhcnkgdXJsIGZvciBpbmplY3Rpb25zIGludG8gdGhlIGhlYWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSB1cmwgdG8gYmUgdXNlZCB0byBsb2FkIHRoZSBHb29nbGUgTWFwIENsdXN0ZXIgbGlicmFyeS5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgR2V0Q2x1c3RlclNjcmlwdFNyYygpIHtcclxuICAgICAgICBjb25zdCBob3N0QW5kUGF0aDogc3RyaW5nID0gdGhpcy5fY29uZmlnLmNsdXN0ZXJIb3N0QW5kUGF0aCB8fFxyXG4gICAgICAgICAgICAnZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2V4YW1wbGVzL21hcmtlcmNsdXN0ZXJlci9tYXJrZXJjbHVzdGVyZXIuanMnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldFNjcmlwdFNyYyhob3N0QW5kUGF0aCwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIHNjcmlwdHMgdXJsIGZvciBpbmplY3Rpb25zIGludG8gdGhlIGhlYWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaG9zdEFuZFBhdGggLSBIb3N0IGFuZCBwYXRoIG5hbWUgb2YgdGhlIHNjcmlwdCB0byBsb2FkLlxyXG4gICAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zIC0gVXJsIHF1ZXJ5IHBhcmFtZXRlcnMuXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSB1cmwgd2l0aCBjb3JyZWN0IHByb3RvY29sLCBwYXRoLCBhbmQgcXVlcnkgcGFyYW1ldGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgR2V0U2NyaXB0U3JjKGhvc3RBbmRQYXRoOiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IEFycmF5PHN0cmluZz4gfSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcHJvdG9jb2xUeXBlOiBTY3JpcHRQcm90b2NvbCA9XHJcbiAgICAgICAgICAgIDxTY3JpcHRQcm90b2NvbD4oKHRoaXMuX2NvbmZpZyAmJiB0aGlzLl9jb25maWcucHJvdG9jb2wpIHx8IFNjcmlwdFByb3RvY29sLkhUVFBTKTtcclxuICAgICAgICBsZXQgcHJvdG9jb2w6IHN0cmluZztcclxuXHJcbiAgICAgICAgc3dpdGNoIChwcm90b2NvbFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTY3JpcHRQcm90b2NvbC5BVVRPOlxyXG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkhUVFA6XHJcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTY3JpcHRQcm90b2NvbC5IVFRQUzpcclxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJ2h0dHBzOic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFtczogc3RyaW5nID1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChrOiBzdHJpbmcpID0+IHF1ZXJ5UGFyYW1zW2tdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChrOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZW1wdHkgYXJyYXlzXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KHF1ZXJ5UGFyYW1zW2tdKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgJiYgcXVlcnlQYXJhbXNba10ubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcCgoazogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gam9pbiBhcnJheXMgYXMgY29tbWEgc2VwZXJhdGVkIHN0cmluZ3NcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpID0gcXVlcnlQYXJhbXNba107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5OiBrLCB2YWx1ZTogaS5qb2luKCcsJykgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5OiBrLCB2YWx1ZTogcXVlcnlQYXJhbXNba10gfTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKChlbnRyeTogeyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9KSA9PiB7IHJldHVybiBgJHtlbnRyeS5rZXl9PSR7ZW50cnkudmFsdWV9YDsgfSlcclxuICAgICAgICAgICAgICAgIC5qb2luKCcmJyk7XHJcbiAgICAgICAgcmV0dXJuIGAke3Byb3RvY29sfS8vJHtob3N0QW5kUGF0aH0/JHtwYXJhbXN9YDtcclxuICAgIH1cclxufVxyXG4iXX0=