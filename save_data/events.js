//models
const mongojs = require('mongojs');

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
const update_event = (data) => {
    const db = mongojs('mongodb://localhost/mall_counter')
    const Event = db.collection('events');
    const Outlet = db.collection('outlets')
    const Building = db.collection('buildings')

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

    let total_entry = 0
    if (Array.isArray(count) === true) {
        var lastItem = count.pop();
        total_entry += parseInt(lastItem.Enters)
    }
    else if (Array.isArray(count) === false) {
        total_entry += parseInt(count.Enters)
    }

    Outlet.findOne({ device_id: device_id }, (err, outlet) => {
        if (outlet) {
            Event.find({ building_id: outlet.building_id, status: 'Active' }, (err, events) => {
                if (events.length > 0) {
                    events.map((x) => {
                        let query = {
                            _id: mongojs.ObjectId(id)
                        }
                        let data = {};
                        data.total = (parseInt(x.total) + parseInt(total_entry))
                        Event.update(query, { $set: data }, () => { });
                    })
                }
            })
        }
    })






}
module.exports = update_event