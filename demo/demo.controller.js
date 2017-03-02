export default class DemoCtrl {
    constructor() {
        this.dateRange = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        };
        this.singleDate = {
            startDate: moment()
        }
    }

    onDateApply(event) {
        console.log(event);
    }

    onDateCancel(event) {
        console.log(event);
    }


}