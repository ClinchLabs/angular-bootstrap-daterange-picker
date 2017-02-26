# angular-bootstrap-daterange-picker
> 

Sorry for my english,the code mainly from [angular-daterangepicker](https://github.com/fragaria/angular-daterangepicker),I found it can't work with ngModelController.$dirty and I can't commit PR using coffeescript,so I write this. 
## Installation
via npm
```bash
npm install angular-bootstrap-daterange-picker --save
```
via bower
```bash
bower install angular-bootstrap-daterange-picker --save
```

## Getting Started
Declare dependency:
```javascript
angular.module('demo', ['dateRangePicker']);
```

Prepare model in your controller. The model **must** have `startDate` and `endDate` attributes:
```javascript
class DemoCtrl {
    constructor() {
        this.selectedDate = {
            startDate: null,
            endDate: null
        };
    }
}
```

html template
```html
<div ng-controller="DemoCtrl as vm">
    <input date-range-picker type="text" 
        class="form-control date-picker" 
        ng-model="vm.selectedDate"/>
</div>
```

## License
MIT