import chai from 'chai';
import DateRange from './dateRange'
import dateRangePickerModule from './dateRangePicker.module';

const should = chai.should();

describe('dateRangePicker', () => {
    let dateRangePicker;

    beforeEach(angular.mock.module(dateRangePickerModule));
    beforeEach(inject($injector => {
        // dateRangePicker = $injector.get('dateRangePicker');
    }));

    describe('isValid', () => {
        it('test', ()=>{
            // console.log(dateRangePicker);
        });
    });
});