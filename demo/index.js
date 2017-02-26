import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import dateRangePicker from 'angular-bootstrap-daterange-picker.min';

import DemoCtrl from './demo.controller';

export default angular
    .module('demo', [dateRangePicker])
    .controller('DemoCtrl', DemoCtrl).name;