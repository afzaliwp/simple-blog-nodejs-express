const jm = require('jalali-moment');
exports.toPersianDate = (date, format = 'YYYY/MM/DD') => {
    return jm(date).locale('fa').format(format);
};

exports.toHumanTimeDifference = (date, format = 'YYYYMMDD') => {
    const timestamp = date.toISOString();
    return jm(timestamp, format).locale('fa').fromNow();
};