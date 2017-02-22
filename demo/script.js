(function () {
    'use strict';

    angular
        .module('demo', ['dateRangePicker'])
        .controller('DemoCtrl', DemoCtrl)

    /** @ngInject */
    function DemoCtrl() {
        var vm = this;

        var safeCopy;

        /**field */
        vm.selectedDate = {
            startDate: '2017-01-05',
            endDate: '2017-01-25',
        };

        /**func */
        vm.isDirty = isDirty;
        
        vm.onDateApply = function (event) {
            console.log(event);
        }
        vm.onDateCancel = function (event) {
            console.log(event);
        }

        activate();
        function activate() {
            safeCopy = angular.copy(vm.selectedDate);
        }

        function isDirty() {
            return !angular.equals(safeCopy, vm.selectedDate);
        }
    }

} ());