'use strict';

(function () {
    'use strict';

    angular.module('dateRangePicker', []);
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 用于表示日期范围，适配dateRangePicker
 */
(function () {
	'use strict';

	DateRangeFactory.$inject = ["moment", "dateRangePickerConfig"];
	angular.module('dateRangePicker', []).factory('DateRange', DateRangeFactory);

	/** @ngInject */
	function DateRangeFactory(moment, dateRangePickerConfig) {
		var DateRange = function () {
			function DateRange(startDate, endDate) {
				var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dateRangePickerConfig.locale;

				_classCallCheck(this, DateRange);

				this._startDate = startDate ? moment(startDate) : null;
				this._endDate = endDate ? moment(endDate) : null;
				this._locale = locale;
			}

			/**
    * 验证日期范围是否合法
    */


			_createClass(DateRange, [{
				key: 'valueOf',
				value: function valueOf() {
					return this.endDate ? [this.startDate, this.endDate].join(this._locale.separator) : this.startDate;
				}
			}, {
				key: 'toString',
				value: function toString() {
					return this.valueOf();
				}
			}, {
				key: 'startDate',
				get: function get() {
					return this._endDate ? this._startDate.format(this._locale.format) : '';
				}
			}, {
				key: 'endDate',
				get: function get() {
					return this._endDate ? this._endDate.format(this._locale.format) : '';
				}
			}], [{
				key: 'isValid',
				value: function isValid(startDate, endDate) {
					if (!startDate || !endDate) return true;
					var start = moment.isMoment(startDate) ? startDate : moment(startDate);
					var end = moment.isMoment(endDate) ? endDate : moment(endDate);
					return start.isBefore(end) || start.isSame(end, 'day');
				}
			}]);

			return DateRange;
		}();

		return DateRange;
	}
})();
'use strict';

/* global moment:false */
(function () {
    'use strict';

    var dateRangePickerConfig = {
        clearLabel: 'Clear',
        autoUpdateInput: false,
        locale: {
            separator: ' - ',
            format: 'YYYY-MM-DD'
        }
    };

    angular.module('dateRangePicker').constant('moment', moment).constant('dateRangePickerConfig', dateRangePickerConfig);
})();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function () {
    'use strict';

    dateRangePicker.$inject = ["moment", "DateRange", "dateRangePickerConfig"];
    angular.module('dateRangePicker').directive('dateRangePicker', dateRangePicker);

    /** @ngInject */
    function dateRangePicker(moment, DateRange, dateRangePickerConfig) {
        return {
            link: link,
            restrict: 'A',
            require: 'ngModel',
            scope: {
                option: "=",
                dateMin: '=',
                dateMax: '=',
                model: "=ngModel",
                dateApply: '&',
                dateCancel: '&',
                dateShow: '&',
                dateHide: '&',
                dateShowCalendar: '&',
                dateHideCalendar: '&'
            }
        };

        function link(scope, ele, attr, modelCtrl) {
            var opts = angular.merge({}, scope.option, dateRangePickerConfig);
            var el = $(ele); //jqlite -> jquery
            var bsDatePicker = void 0; //bootstrap date picker
            scope.model = scope.model || {};

            /**
             * validators
             */
            if (attr.dateMin) {
                modelCtrl.$validators.dateMin = function (value) {
                    return value && DateRange.isValid(opts['minDate'], value.startDate);
                };
                scope.$watch('dateMin', function (date) {
                    opts['minDate'] = date ? moment(date) : false;
                    _init();
                });
            }
            if (attr.dateMax) {
                modelCtrl.$validators.dateMax = function (value) {
                    return value && DateRange.isValid(value.endDate, opts['maxDate']);
                };
                scope.$watch('dateMax', function (date) {
                    opts['maxDate'] = date ? moment(date) : false;
                    _init();
                });
            }

            /**
             * viewValue => modelValue
             */
            modelCtrl.$parsers.push(function (value) {
                var _ref = ~value.indexOf(opts.locale.separator) ? value.split(opts.locale.separator) : [value, null],
                    _ref2 = _slicedToArray(_ref, 2),
                    start = _ref2[0],
                    end = _ref2[1];

                return new DateRange(start, end, opts.locale);
            });

            /**
             * modelValue => viewValue 
             */
            modelCtrl.$formatters.push(function (model) {
                return model instanceof DateRange ? model.toString() : new DateRange(model.startDate, model.endDate, opts.locale).toString();
            });

            /**
             * The $render() method is invoked in the following situations:
             * 1.$rollbackViewValue() is called. If we are rolling back the view value to the last committed value then $render() is called to update the input control.
             * 2.The value referenced by ng-model is changed programmatically and both the $modelValue and the $viewValue are different from last time.
             * Since ng-model does not do a deep watch, $render() is only invoked if the values of $modelValue and $viewValue are actually different from their previous values
             */
            modelCtrl.$render = function () {
                if (modelCtrl.$modelValue && modelCtrl.$modelValue.startDate) {
                    _setStartDate(modelCtrl.$modelValue.startDate);
                    _setEndDate(modelCtrl.$modelValue.endDate);
                } else {
                    _clear();
                }
                return el.val(modelCtrl.$viewValue);
            };

            /**
             * This is called when we need to determine if the value of an input is empty.
             * For instance, the required directive does this to work out if the input has data or not.
             * The default $isEmpty function checks whether the value is undefined, '', null or NaN.
             */
            modelCtrl.$isEmpty = function (val) {
                return !(angular.isString(val) && val.length);
            };

            _init();

            function _clear() {
                bsDatePicker.setStartDate();
                bsDatePicker.setEndDate();
            };

            function _setStartDate(value) {
                if (!bsDatePicker || !value) return;
                if (bsDatePicker.endDate < value) bsDatePicker.setEndDate(value);
                opts.startDate = value;
                bsDatePicker.setStartDate(value);
            }

            function _setEndDate(value) {
                if (!bsDatePicker || !value) return;
                if (bsDatePicker.startDate > value) bsDatePicker.setStartDate(value);
                opts.endDate = value;
                bsDatePicker.setEndDate(value);
            }

            // _init has to be called anytime we make changes to the date picker options
            function _init() {
                el.daterangepicker(opts, function (start, end) {
                    return scope.$apply(scope.model = new DateRange(start, end, opts.locale));
                });
                bsDatePicker = el.data('daterangepicker');
                //listen event
                var events = ['apply', 'cancel', 'show', 'hide', 'showCalendar', 'hideCalendar'];
                events.forEach(function (eventName) {
                    var localEventName = 'date' + (eventName[0].toUpperCase() + eventName.slice(1));
                    if (angular.isFunction(scope[localEventName])) {
                        el.on(eventName + '.daterangepicker', function (e) {
                            return scope[localEventName]({ event: e });
                        });
                    }
                });
                //cancel button -> clear button
                if (attr.hasOwnProperty('dateClearable')) {
                    opts.locale.cancelLabel = opts.clearLabel;
                    el.on('cancel.daterangepicker', function () {
                        scope.$apply(scope.model = new DateRange(null, null, opts.locale));
                    });
                }
            }

            //watch model
            scope.$watch('model.startDate', function (v) {
                return _setStartDate(v);
            });
            scope.$watch('model.endDate', function (v) {
                return _setEndDate(v);
            });

            scope.$on('$destroy', function () {
                return bsDatePicker != null ? bsDatePicker.remove() : void 0;
            });
        }
    }
})();