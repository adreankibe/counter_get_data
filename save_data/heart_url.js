//models
const mongojs = require('mongojs');

const heart_url = (data) => {
    const db = mongojs('mongodb://localhost/mall_counter')
    const Outlet = db.collection('outlets');

    const device_id = data.device_id;
    const properties = data.properties;
    Outlet.findOne({ device_id: device_id }, (err, outlet) => {
        if (outlet) {
            let query = {
                _id: mongojs.ObjectId(outlet._id)
            }
            let data = {};
            data.properties = properties;
            Outlet.update(query, { $set: data }, () => {

            })
        }
    })
}
module.exports = heart_url