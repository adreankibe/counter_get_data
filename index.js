const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var parser = require('xml2json');
app.use(bodyParser.text({type:"*/*"}));

const heart_url = require('./save_data/heart_url');
const post_url = require('./save_data/post_url');

app.post('/api/PostUrl',(req,res)=>{
    let xml = req.body;
    let json = parser.toJson(xml)
    json = JSON.parse(json)
    let data = {
        device_id:json.RTMetrics.DeviceId,
        date:json.RTMetrics.ReportData.Report.Date,
        count:json.RTMetrics.ReportData.Report.Object.Count
    }
    console.log(data)
    post_url(data)
    res.status(200).end();
})
app.post('/api/HeartUrl',(req,res)=>{
    let xml = req.body;
    let json = parser.toJson(xml)
    json = JSON.parse(json)
    let data = {
        device_id:json.Diags.DeviceId,
        properties:json.Diags.Properties
    }


    heart_url(data)
    res.status(200).end();
})

app.listen(8070,()=>{
    console.log('running on port 8070')
})