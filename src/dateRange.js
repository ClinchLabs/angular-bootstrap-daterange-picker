import moment from 'moment';

const defaultLocale = {
	format: 'YYYY-MM-DD',
	separator: '-'
}

export default class DateRange {
	constructor(startDate, endDate, locale) {
		this._startDate = startDate ? moment(startDate) : null;
		this._endDate = endDate ? moment(endDate) : null;
		this._locale = locale;
	}

	/**
	 * 验证日期范围是否合法
	 */
	static isValid(startDate, endDate) {
		if (!startDate || !endDate) return true;
		const start = moment.isMoment(startDate) ? startDate : moment(startDate);
		const end = moment.isMoment(endDate) ? endDate : moment(endDate);
		return start.isBefore(end) || start.isSame(end, 'day');
	}

	get startDate() {
		return this._startDate
			? this._startDate.format(this._locale.format)
			: '';
	}

	get endDate() {
		return this._endDate
			? this._endDate.format(this._locale.format)
			: '';
	}

	valueOf() {
		return this.endDate
			? [this.startDate, this.endDate].join(this._locale.separator)
			: this.startDate;
	}

	toString() {
		return this.valueOf();
	}
}

