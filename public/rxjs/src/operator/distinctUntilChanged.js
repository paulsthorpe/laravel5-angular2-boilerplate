System.register(['../Subscriber', '../util/tryCatch', '../util/errorObject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, tryCatch_1, errorObject_1;
    var DistinctUntilChangedOperator, DistinctUntilChangedSubscriber;
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
     * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
     * If a comparator function is not provided, an equality check is used by default.
     * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
     * @return {Observable} an Observable that emits items from the source Observable with distinct values.
     * @method distinctUntilChanged
     * @owner Observable
     */
    function distinctUntilChanged(compare, keySelector) {
        return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
    }
    exports_1("distinctUntilChanged", distinctUntilChanged);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            }],
        execute: function() {
            DistinctUntilChangedOperator = (function () {
                function DistinctUntilChangedOperator(compare, keySelector) {
                    this.compare = compare;
                    this.keySelector = keySelector;
                }
                DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
                };
                return DistinctUntilChangedOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DistinctUntilChangedSubscriber = (function (_super) {
                __extends(DistinctUntilChangedSubscriber, _super);
                function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
                    _super.call(this, destination);
                    this.keySelector = keySelector;
                    this.hasKey = false;
                    if (typeof compare === 'function') {
                        this.compare = compare;
                    }
                }
                DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
                    return x === y;
                };
                DistinctUntilChangedSubscriber.prototype._next = function (value) {
                    var keySelector = this.keySelector;
                    var key = value;
                    if (keySelector) {
                        key = tryCatch_1.tryCatch(this.keySelector)(value);
                        if (key === errorObject_1.errorObject) {
                            return this.destination.error(errorObject_1.errorObject.e);
                        }
                    }
                    var result = false;
                    if (this.hasKey) {
                        result = tryCatch_1.tryCatch(this.compare)(this.key, key);
                        if (result === errorObject_1.errorObject) {
                            return this.destination.error(errorObject_1.errorObject.e);
                        }
                    }
                    else {
                        this.hasKey = true;
                    }
                    if (Boolean(result) === false) {
                        this.key = key;
                        this.destination.next(value);
                    }
                };
                return DistinctUntilChangedSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});
//# sourceMappingURL=distinctUntilChanged.js.map