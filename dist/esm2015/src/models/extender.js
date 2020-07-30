/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class Extender {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        this._obj = obj;
        this._proto = obj.prototype;
    }
    /**
     * @param {?} newObj
     * @return {?}
     */
    Extend(newObj) {
        this.Set('prototype', newObj, this._obj);
        for (const y in this._proto) {
            if ((/** @type {?} */ (this._proto))[y] != null) {
                this.Set(y, (this._proto)[y], (/** @type {?} */ (this._obj.prototype))[y]);
            }
        }
        return this;
    }
    /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    Set(property, newObj, obj) {
        if (typeof newObj === 'undefined') {
            return this;
        }
        if (typeof obj === 'undefined') {
            obj = this._proto;
        }
        Object.defineProperty(obj, property, newObj);
    }
    /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    Map(property, newProperty) {
        this.Set(property, this._proto[newProperty], this._obj.prototype);
        return this;
    }
}
if (false) {
    /** @type {?} */
    Extender.prototype._obj;
    /** @type {?} */
    Extender.prototype._proto;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2V4dGVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNOzs7O0lBS0YsWUFBWSxHQUFRO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztLQUMvQjs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBVztRQUVkLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsbUJBQU0sSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1CQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRTtTQUNKO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7O0lBRUQsR0FBRyxDQUFDLFFBQWdCLEVBQUUsTUFBVyxFQUFFLEdBQVM7UUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEOzs7Ozs7SUFFRCxHQUFHLENBQUMsUUFBZ0IsRUFBRSxXQUFtQjtRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXh0ZW5kZXIge1xyXG5cclxuICAgIHByaXZhdGUgX29iajogYW55O1xyXG4gICAgcHJpdmF0ZSBfcHJvdG86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29iaiA9IG9iajtcclxuICAgICAgICB0aGlzLl9wcm90byA9IG9iai5wcm90b3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgRXh0ZW5kKG5ld09iajogYW55KTogRXh0ZW5kZXIge1xyXG5cclxuICAgICAgICB0aGlzLlNldCgncHJvdG90eXBlJywgbmV3T2JqLCB0aGlzLl9vYmopO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHkgaW4gdGhpcy5fcHJvdG8pIHtcclxuICAgICAgICAgICAgaWYgKCg8YW55PnRoaXMuX3Byb3RvKVt5XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNldCh5LCAodGhpcy5fcHJvdG8pW3ldLCAoPGFueT50aGlzLl9vYmoucHJvdG90eXBlKVt5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFNldChwcm9wZXJ0eTogc3RyaW5nLCBuZXdPYmo6IGFueSwgb2JqPzogYW55KTogRXh0ZW5kZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmV3T2JqID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBvYmogPSB0aGlzLl9wcm90bztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3BlcnR5LCBuZXdPYmopO1xyXG4gICAgfVxyXG5cclxuICAgIE1hcChwcm9wZXJ0eTogc3RyaW5nLCBuZXdQcm9wZXJ0eTogc3RyaW5nKTogRXh0ZW5kZXIge1xyXG4gICAgICAgIHRoaXMuU2V0KHByb3BlcnR5LCB0aGlzLl9wcm90b1tuZXdQcm9wZXJ0eV0sIHRoaXMuX29iai5wcm90b3R5cGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59Il19