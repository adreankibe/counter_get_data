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
    const count = data.count;


    let total_entry = 0
    if (Array.isArray(count) === true) {
        var lastItem = count.pop();
        total_entry = parseInt(lastItem.Enters)
    }
    if (Array.isArray(count) === false) {
        total_entry = parseInt(count.Enters)
    }



    Outlet.findOne({ device_id: device_id }, (err, outlet) => {
        if (outlet) {
            Event.find({ building_id: outlet.building_id, status: 'Active' }, (err, events) => {
                if (events.length > 0) {
                    events.map((x) => {
                        let query = {
                            _id: mongojs.ObjectId(x._id)
                        }
                        let data = {};
                        data.total = (parseInt(x.total) + parseInt(total_entry))
                        Event.update(query, { $set: data }, () => {

                        });
                    })
                }
            })
        }
    })

}
module.exports = update_event