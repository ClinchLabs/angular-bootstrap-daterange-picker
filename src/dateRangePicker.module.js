import angular from 'angular';
import dateRangePickerConfig from './dateRangePickerConfig.constant';
import DateRange from './dateRange.service';

import dateRangePicker from './dateRangePicker.directive';

export default angular
    .module('dateRangePicker', [])
    .constant('dateRangePickerConfig', dateRangePickerConfig)
    .service('DateRange', DateRange)
    .directive('dateRangePicker', dateRangePicker).name;
