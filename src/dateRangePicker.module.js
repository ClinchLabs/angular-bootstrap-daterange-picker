import angular from 'angular';
import dateRangePickerConfig from './dateRangePickerConfig.constant';
import DateRange from './dateRange';

import dateRangePicker from './dateRangePicker.directive';

export default angular
    .module('dateRangePicker', [])
    .constant('dateRangePickerConfig', dateRangePickerConfig)
    .directive('dateRangePicker', dateRangePicker).name;
