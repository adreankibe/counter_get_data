const mongojs = require('mongojs')
const target_reports = (data) => {
    const db = mongojs('mongodb://localhost/TwoRivers_mall_counter');
    const TargetReports = db.collection('target_reports');
    const count = data.count;

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


    let lastItem = count.pop()

    TargetReports.findOne({added_on:today},(err,result)=>{
        if(result)
        {
            let query = {
                _id:mongojs.ObjectId(result._id)
            }
            let data = {};
            data.count = result.count ;
            TargetReports.updateOne(query,{$set:data},()=>{

            })

        }
        else
        {
            let data = {};
            data.added_on  = today;
            data.count  = 0;
            data.year_month = year_month;
            data.week_no = week_no;
            TargetReports.save(data,()=>{
                
            })
        }
    })





}
module.exports = data