import moment from 'moment';
import $ from 'jquery';
import 'bootstrap-daterangepicker/daterangepicker.js';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRange from './dateRange';
import dateRangePickerConfig from './dateRangePickerConfig.constant';

export default function dateRangePicker() {
    'ngInject';
    return {
        link: link,
        restrict: 'A',
        require: 'ngModel',
        scope: {
            dateMin: '=',
            dateMax: '=',
            dateOption: "=",
            model: "=ngModel",
            dateApply: '&',
            dateCancel: '&',
            dateShow: '&',
            dateHide: '&',
            dateShowCalendar: '&',
            dateHideCalendar: '&'
        },
    }

    function link(scope, ele, attr, modelCtrl) {
        const opts = angular.merge({}, scope.dateOption, dateRangePickerConfig);
        const el = $(ele); //jqlite -> jquery
        let bsDatePicker; //bootstrap date picker
        scope.model = scope.model || {};

        /**
         * validators
         */
        if (attr.dateMin) {
            modelCtrl.$validators.dateMin = value => value && DateRange.isValid(opts['minDate'], value.startDate);
            scope.$watch('dateMin', date => {
                opts['minDate'] = date ? moment(date) : false;
                _init();
            });
        }
        if (attr.dateMax) {
            modelCtrl.$validators.dateMax = value => value && DateRange.isValid(value.endDate, opts['maxDate']);
            scope.$watch('dateMax', date => {
                opts['maxDate'] = date ? moment(date) : false;
                _init();
            });
        }

        /**
         * viewValue => modelValue
         */
        modelCtrl.$parsers.push(value => {
            if(value instanceof DateRange) return value;
            const [start, end] = ~value.indexOf(opts.locale.separator)
                ? value.split(opts.locale.separator)
                : [value, null];
            return new DateRange(start, end, opts.locale);
        });

        /**
         * modelValue => viewValue 
         */
        modelCtrl.$formatters.push(model => {
            return (model instanceof DateRange)
                ? model.toString()
                : new DateRange(model.startDate, model.endDate, opts.locale).toString();
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
            el.val(modelCtrl.$viewValue);
        };

        /**
         * This is called when we need to determine if the value of an input is empty.
         * For instance, the required directive does this to work out if the input has data or not.
         * The default $isEmpty function checks whether the value is undefined, '', null or NaN.
         */
        modelCtrl.$isEmpty = val => !(angular.isString(val) && val.length);

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
            //cancel button -> clear button
            if (attr.hasOwnProperty('dateClearable')) {
                opts.locale.cancelLabel = opts.clearLabel;
                el.on('cancel.daterangepicker', () => {
                    scope.$apply(scope.model = new DateRange(null, null, opts.locale))
                });
            }

            // el.daterangepicker(opts, (start, end) => scope.$apply(scope.model = new DateRange(start, end, opts.locale)));
            el.daterangepicker(opts, (start, end) => {
                const date = new DateRange(start, end, opts.locale);
                modelCtrl.$setDirty();
                scope.$apply(scope.model = date)
            });
            bsDatePicker = el.data('daterangepicker');

            //listen event
            const events = ['apply', 'cancel', 'show', 'hide', 'showCalendar', 'hideCalendar'];
            events.forEach(function (eventName) {
                //localEventName:apply => dateApply;
                const localEventName = `date${eventName[0].toUpperCase() + eventName.slice(1)}`;
                if (angular.isFunction(scope[localEventName])) {
                    el.on(eventName + '.daterangepicker', e => scope[localEventName]({ event: e }))
                }
            });
        }

        //watch model
        scope.$watch('model.startDate', v => _setStartDate(v));
        scope.$watch('model.endDate', v => _setEndDate(v));

        scope.$on('$destroy', () => bsDatePicker != null ? bsDatePicker.remove() : void 0);
    }

}