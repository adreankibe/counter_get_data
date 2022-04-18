const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var parser = require('xml2json');
app.use(bodyParser.text({ type: "*/*" }));

const heart_url = require('./save_data/heart_url');
const post_url = require('./save_data/post_url');
const save_event = require('./save_data/events');
app.post('/api/PostUrl', (req, res) => {
    let xml = req.body;
    let json = parser.toJson(xml)
    json = JSON.parse(json)
    console.log(json.RTMetrics.ReportData.Report.Date)
    console.log(json.RTMetrics.ReportData.Report.Object.Count)
    let data = {
        device_id: json.RTMetrics.DeviceId,
        date: json.RTMetrics.ReportData.Report.Date,
        count: json.RTMetrics.ReportData.Report.Object.Count
    }

    // console.log(data)
    // save_event(data)
    post_url(data)

})
app.post('/api/HeartUrl', (req, res) => {
    let xml = req.body;
    let json = parser.toJson(xml)
    json = JSON.parse(json)
    let data = {
        device_id: json.Diags.DeviceId,
        properties: json.Diags.Properties
    }
    //console.log(data)
    heart_url(data)

})
// let currentdate = new Date("2022-04-23");
// var oneJan = new Date(currentdate.getFullYear(), 0, 1);
// var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
// var week_no = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
// console.log(week_no);

app.listen(8070, () => {
    console.log('running on port 8070')
})