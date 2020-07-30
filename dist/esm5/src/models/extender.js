/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Extender = /** @class */ (function () {
    function Extender(obj) {
        this._obj = obj;
        this._proto = obj.prototype;
    }
    /**
     * @param {?} newObj
     * @return {?}
     */
    Extender.prototype.Extend = /**
     * @param {?} newObj
     * @return {?}
     */
    function (newObj) {
        this.Set('prototype', newObj, this._obj);
        for (var y in this._proto) {
            if ((/** @type {?} */ (this._proto))[y] != null) {
                this.Set(y, (this._proto)[y], (/** @type {?} */ (this._obj.prototype))[y]);
            }
        }
        return this;
    };
    /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    Extender.prototype.Set = /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    function (property, newObj, obj) {
        if (typeof newObj === 'undefined') {
            return this;
        }
        if (typeof obj === 'undefined') {
            obj = this._proto;
        }
        Object.defineProperty(obj, property, newObj);
    };
    /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    Extender.prototype.Map = /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    function (property, newProperty) {
        this.Set(property, this._proto[newProperty], this._obj.prototype);
        return this;
    };
    return Extender;
}());
export { Extender };
if (false) {
    /** @type {?} */
    Extender.prototype._obj;
    /** @type {?} */
    Extender.prototype._proto;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2V4dGVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFBO0lBS0ksa0JBQVksR0FBUTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7S0FDL0I7Ozs7O0lBRUQseUJBQU07Ozs7SUFBTixVQUFPLE1BQVc7UUFFZCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLEdBQUcsQ0FBQyxDQUFDLElBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLG1CQUFNLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEU7U0FDSjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7OztJQUVELHNCQUFHOzs7Ozs7SUFBSCxVQUFJLFFBQWdCLEVBQUUsTUFBVyxFQUFFLEdBQVM7UUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEOzs7Ozs7SUFFRCxzQkFBRzs7Ozs7SUFBSCxVQUFJLFFBQWdCLEVBQUUsV0FBbUI7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjttQkF0Q0w7SUF1Q0MsQ0FBQTtBQXZDRCxvQkF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXh0ZW5kZXIge1xyXG5cclxuICAgIHByaXZhdGUgX29iajogYW55O1xyXG4gICAgcHJpdmF0ZSBfcHJvdG86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29iaiA9IG9iajtcclxuICAgICAgICB0aGlzLl9wcm90byA9IG9iai5wcm90b3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgRXh0ZW5kKG5ld09iajogYW55KTogRXh0ZW5kZXIge1xyXG5cclxuICAgICAgICB0aGlzLlNldCgncHJvdG90eXBlJywgbmV3T2JqLCB0aGlzLl9vYmopO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHkgaW4gdGhpcy5fcHJvdG8pIHtcclxuICAgICAgICAgICAgaWYgKCg8YW55PnRoaXMuX3Byb3RvKVt5XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNldCh5LCAodGhpcy5fcHJvdG8pW3ldLCAoPGFueT50aGlzLl9vYmoucHJvdG90eXBlKVt5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFNldChwcm9wZXJ0eTogc3RyaW5nLCBuZXdPYmo6IGFueSwgb2JqPzogYW55KTogRXh0ZW5kZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmV3T2JqID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBvYmogPSB0aGlzLl9wcm90bztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3BlcnR5LCBuZXdPYmopO1xyXG4gICAgfVxyXG5cclxuICAgIE1hcChwcm9wZXJ0eTogc3RyaW5nLCBuZXdQcm9wZXJ0eTogc3RyaW5nKTogRXh0ZW5kZXIge1xyXG4gICAgICAgIHRoaXMuU2V0KHByb3BlcnR5LCB0aGlzLl9wcm90b1tuZXdQcm9wZXJ0eV0sIHRoaXMuX29iai5wcm90b3R5cGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59Il19