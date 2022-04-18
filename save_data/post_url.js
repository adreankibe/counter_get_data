//models
const mongojs = require('mongojs');

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const post_url = (data) => {
    const db = mongojs('mongodb://localhost/mall_counter')
    const Report = db.collection('reports');

    const device_id = data.device_id;
    const date = data.date;
    const count = data.count;
   
    let currentdate = new Date(date);
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var week_no = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    const year = currentdate.getFullYear();
    const nm = currentdate.getMonth() + 1
    const day = ("0" + currentdate.getDate()).slice(-2);
    const day_ = currentdate.getDate()
    const month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
    const today = year + "-" + month + "-" + day
    const year_month = year + "-" + month
    const start_date = year_month + "-01"
    const hour = addZero(currentdate.getHours())
    const minute = addZero(currentdate.getMinutes())
    const time = hour + ":" + minute;

    Report.findOne({ date: date, device_id: device_id }, (err, report) => {
        if (report) {
            let query = {
                _id: mongojs.ObjectId(report._id)
            };
            let data = {};
            data.device_id = device_id;
            data.date = today;
            if (Array.isArray(count) === true) {
                var lastItem = count.pop();
                data.count = report.count.concat([lastItem]);
            }
            else if (Array.isArray(count) === false) {
                data.count = report.count.concat([count]);
            }
            data.week_no = week_no
            data.year_month = year_month
            Report.update(query, { $set: data }, () => {

            })
        }
        else {
            let data = {};
            data.device_id = device_id;
            data.date = today;
            if (Array.isArray(count) === true) {
                var lastItem = count.pop();
                data.count = [lastItem];
            }
            else if (Array.isArray(count) === false) {
                data.count = [count];
            }


            data.created_on = new Date()
            data.week_no = week_no
            data.year_month = year_month
            Report.save(data, () => {

            })

        }
    })


}
module.exports = post_url