export default class DemoCtrl {
    constructor() {
        this.selectedDate = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        };
    }

    onDateApply(event) {
        console.log(event);
    }

    onDateCancel(event) {
        console.log(event);
    }


}