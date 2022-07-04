//models
const mongojs = require('mongojs');

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const general_reports = require('../report_functions/general_reports')
const target_reports = require('../report_functions/target_reports');

const post_url = (data) => {
    const db = mongojs('mongodb://localhost/TwoRivers_mall_counter')
    const Report = db.collection('reports');
   

    const device_id = data.device_id;
    const date = data.date;
    const count = data.count;
   
    // current day, current week, current month
    let currentdate = new Date();
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



    Report.findOne({device_id:device_id,added_on:today},(err,report)=>{
        if(report)
        {
            general_reports(data,report)
            target_reports(data)
            // targets function
            // popular_days function
        }
        else
        {
            
            general_reports(data,null)
            target_reports(data)
            // targets function
            // popular_days function

        }
    })


}
module.exports = post_url