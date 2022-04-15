//models
const mongojs = require('mongojs');

const post_url = (data)=>{
    const db = mongojs('mongodb://localhost/mall_counter')
    const Report = db.collection('reports');
   
    const device_id = data.device_id;
    const date = data.date;
    const count = data.count;
    Report.findOne({date:date,device_id:device_id},(err,report)=>{
        if(report)
        {
            let query = {
                _id:mongojs.ObjectId(report._id)
            };
            let data = {};
            data.device_id = device_id;
            data.date = date;
            data.count = report.count.concat(count);
            Report.update(query,{$set:data},()=>{

            })
        }
        else
        {
            let data = {};
            data.device_id = device_id;
            data.date = date;
            data.count = [count];
            data.created_on = new Date()
            Report.save(data,()=>{

            })

        }
    })


}
module.exports = post_url