/* global moment:false */
(function () {
    'use strict';

    var dateRangePickerConfig = {
        clearLabel: 'Clear',
        autoUpdateInput:false,
        locale: {
            separator: ' - ',
            format: 'YYYY-MM-DD'
        }
    }

    angular
        .module('dateRangePicker')
        .constant('moment',moment)
        .constant('dateRangePickerConfig', dateRangePickerConfig);

} ());