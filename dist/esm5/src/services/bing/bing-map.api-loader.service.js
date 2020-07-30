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
 * Bing Maps V8 specific loader configuration to be used with the {\@link BingMapAPILoader}
 *
 * @export
 */
var BingMapAPILoaderConfig = /** @class */ (function () {
    function BingMapAPILoaderConfig() {
        this.apiKey = '';
        this.hostAndPath = 'www.bing.com/api/maps/mapcontrol';
        this.protocol = ScriptProtocol.HTTPS;
        this.branch = '';
    }
    BingMapAPILoaderConfig.decorators = [
        { type: Injectable },
    ];
    return BingMapAPILoaderConfig;
}());
export { BingMapAPILoaderConfig };
if (false) {
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.apiKey;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.hostAndPath;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.protocol;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.branch;
}
/** *
 * Default loader configuration.
  @type {?} */
var DEFAULT_CONFIGURATION = new BingMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
var BingMapAPILoader = /** @class */ (function (_super) {
    tslib_1.__extends(BingMapAPILoader, _super);
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
         */
        function () { return this._config; },
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
            (/** @type {?} */ (_this._windowRef.GetNativeWindow()))[callbackName] = function () {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    BingMapAPILoader.ctorParameters = function () { return [
        { type: BingMapAPILoaderConfig, decorators: [{ type: Optional }] },
        { type: WindowRef },
        { type: DocumentRef }
    ]; };
    return BingMapAPILoader;
}(MapAPILoader));
export { BingMapAPILoader };
if (false) {
    /** @type {?} */
    BingMapAPILoader.prototype._scriptLoadingPromise;
    /** @type {?} */
    BingMapAPILoader.prototype._config;
    /** @type {?} */
    BingMapAPILoader.prototype._windowRef;
    /** @type {?} */
    BingMapAPILoader.prototype._documentRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztJQVNuRSxPQUFJO0lBQ0osUUFBSztJQUNMLE9BQUk7Ozs4QkFGSixJQUFJOzhCQUNKLEtBQUs7OEJBQ0wsSUFBSTs7Ozs7Ozs7c0JBY0ssRUFBRTsyQkFLRyxrQ0FBa0M7d0JBS3JCLGNBQWMsQ0FBQyxLQUFLO3NCQUt0QyxFQUFFOzs7Z0JBckJkLFVBQVU7O2lDQXBCWDs7U0FxQmEsc0JBQXNCOzs7Ozs7Ozs7Ozs7OztBQTBCbkMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7Ozs7Ozs7SUFRckIsNENBQVk7SUFtQjlDOzs7Ozs7OztPQVFHO0lBQ0gsMEJBQWlDLE9BQStCLEVBQVUsVUFBcUIsRUFBVSxZQUF5QjtRQUFsSSxZQUNJLGlCQUFPLFNBSVY7UUFMZ0MsYUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUFBVSxnQkFBVSxHQUFWLFVBQVUsQ0FBVztRQUFVLGtCQUFZLEdBQVosWUFBWSxDQUFhO1FBRTlILEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLEtBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1NBQ3hDOztLQUNKOzBCQWhCVSxvQ0FBTTs7Ozs7Ozs7c0JBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7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QVcsR0FBRyxNQUFRLENBQUM7OztnQkE1R3JELFVBQVU7Ozs7Z0JBNkJtQyxzQkFBc0IsdUJBQWxELFFBQVE7Z0JBbEZILFNBQVM7Z0JBQUUsV0FBVzs7MkJBRDdDO0VBdURzQyxZQUFZO1NBQXJDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XHJcblxyXG4vKipcclxuICogUHJvdG9jb2wgZW51bWVyYXRpb25cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gU2NyaXB0UHJvdG9jb2wge1xyXG4gICAgSFRUUCxcclxuICAgIEhUVFBTLFxyXG4gICAgQVVUT1xyXG59XHJcblxyXG4vKipcclxuICogQmluZyBNYXBzIFY4IHNwZWNpZmljIGxvYWRlciBjb25maWd1cmF0aW9uIHRvIGJlIHVzZWQgd2l0aCB0aGUge0BsaW5rIEJpbmdNYXBBUElMb2FkZXJ9XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJpbmdNYXBBUElMb2FkZXJDb25maWcgIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBBUEkga2V5IGZvciBiaW5nIG1hcHNcclxuICAgIC8vL1xyXG4gICAgYXBpS2V5ID0gJyc7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gSG9zdCBhbmQgUGF0aCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXHJcbiAgICAvLy9cclxuICAgIGhvc3RBbmRQYXRoID0gJ3d3dy5iaW5nLmNvbS9hcGkvbWFwcy9tYXBjb250cm9sJztcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQcm90b2NvbCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXHJcbiAgICAvLy9cclxuICAgIHByb3RvY29sOiBTY3JpcHRQcm90b2NvbCA9IFNjcmlwdFByb3RvY29sLkhUVFBTO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFRoZSBicmFuY2ggdG8gYmUgdXNlZC4gTGVhdmUgZW1wdHkgZm9yIHByb2R1Y3Rpb24uIFVzZSBleHBlcmltZW50YWxcclxuICAgIC8vL1xyXG4gICAgYnJhbmNoID0gJyc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IGxvYWRlciBjb25maWd1cmF0aW9uLlxyXG4gKi9cclxuY29uc3QgREVGQVVMVF9DT05GSUdVUkFUSU9OID0gbmV3IEJpbmdNYXBBUElMb2FkZXJDb25maWcoKTtcclxuXHJcbi8qKlxyXG4gKiBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24gZm9yIHRoZSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBzZXJ2aWNlLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCaW5nTWFwQVBJTG9hZGVyIGV4dGVuZHMgTWFwQVBJTG9hZGVyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWZpbnRpdGlvbnMuXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3NjcmlwdExvYWRpbmdQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9ucy5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IENvbmZpZygpOiBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnIHsgcmV0dXJuIHRoaXMuX2NvbmZpZzsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTWFwQVBJTG9hZGVyLlxyXG4gICAgICogQHBhcmFtIF9jb25maWcgIC0gVGhlIGxvYWRlciBjb25maWd1cmF0aW9uLlxyXG4gICAgICogQHBhcmFtIF93aW5kb3dSZWYgLSBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgV2luZG93UmVmfS4gTmVjZXNzYXJ5IGJlY2F1c2UgQmluZyBNYXAgVjggaW50ZXJhY3RzIHdpdGggdGhlIHdpbmRvdyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gX2RvY3VtZW50UmVmIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIERvY3VtZW50UmVmfS5cclxuICAgICAqIE5lY2Vzc2FyeSBiZWNhdXNlIEJpbmcgTWFwIFY4IGludGVyYWN0cyB3aXRoIHRoZSBkb2N1bWVudCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoIEBPcHRpb25hbCgpIHByaXZhdGUgX2NvbmZpZzogQmluZ01hcEFQSUxvYWRlckNvbmZpZywgcHJpdmF0ZSBfd2luZG93UmVmOiBXaW5kb3dSZWYsIHByaXZhdGUgX2RvY3VtZW50UmVmOiBEb2N1bWVudFJlZikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZyA9PT0gbnVsbCB8fCB0aGlzLl9jb25maWcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcgPSBERUZBVUxUX0NPTkZJR1VSQVRJT047XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBBUElMb2FkZXIgaW1wbGVtZW50YXRpb24uXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBuZWNlc3NhcnkgcmVzb3VyY2VzIGZvciBCaW5nIE1hcHMgVjguXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIExvYWQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG4gICAgICAgIHNjcmlwdC5kZWZlciA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2tOYW1lID0gYGFuZ3VsYXIyYmluZ21hcHMke25ldyBEYXRlKCkuZ2V0TWlsbGlzZWNvbmRzKCl9YDtcclxuICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5HZXRTY3JpcHRTcmMoY2FsbGJhY2tOYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgKDxhbnk+dGhpcy5fd2luZG93UmVmLkdldE5hdGl2ZVdpbmRvdygpKVtjYWxsYmFja05hbWVdID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9IChlcnJvcjogRXZlbnQpID0+IHsgcmVqZWN0KGVycm9yKTsgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudFJlZi5HZXROYXRpdmVEb2N1bWVudCgpLmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIEJpbmcgTWFwIFY4IHNjcmlwdHMgdXJsIGZvciBpbmplY3Rpb25zIGludG8gdGhlIGhlYWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tOYW1lIC0gTmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIEJpbmcgTWFwcyBWOCBzY3JpcHRzIGFyZSBsb2FkZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSB1cmwgdG8gYmUgdXNlZCB0byBsb2FkIHRoZSBCaW5nIE1hcCBzY3JpcHRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgR2V0U2NyaXB0U3JjKGNhbGxiYWNrTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBwcm90b2NvbFR5cGU6IFNjcmlwdFByb3RvY29sID0gKHRoaXMuX2NvbmZpZyAmJiB0aGlzLl9jb25maWcucHJvdG9jb2wpIHx8IERFRkFVTFRfQ09ORklHVVJBVElPTi5wcm90b2NvbDtcclxuICAgICAgICBsZXQgcHJvdG9jb2w6IHN0cmluZztcclxuXHJcbiAgICAgICAgc3dpdGNoIChwcm90b2NvbFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTY3JpcHRQcm90b2NvbC5BVVRPOlxyXG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkhUVFA6XHJcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTY3JpcHRQcm90b2NvbC5IVFRQUzpcclxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJ2h0dHBzOic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGhvc3RBbmRQYXRoOiBzdHJpbmcgPSB0aGlzLl9jb25maWcuaG9zdEFuZFBhdGggfHwgREVGQVVMVF9DT05GSUdVUkFUSU9OLmhvc3RBbmRQYXRoO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tOYW1lXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmJyYW5jaCAhPT0gJycpIHtcclxuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ2JyYW5jaCddID0gdGhpcy5fY29uZmlnLmJyYW5jaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyYW1zOiBzdHJpbmcgPSBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcylcclxuICAgICAgICAgICAgLm1hcCgoazogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IChpID09PSAwKSA/ICc/JyA6ICcmJztcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbSArPSBgJHtrfT0ke3F1ZXJ5UGFyYW1zW2tdfWA7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5qb2luKCcnKTtcclxuICAgICAgICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RBbmRQYXRofSR7cGFyYW1zfWA7XHJcbiAgICB9XHJcbn1cclxuIl19