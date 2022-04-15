const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var parser = require('xml2json');
app.use(bodyParser.text({type:"*/*"}));

app.post('/api/PostUrl',(req,res)=>{
    let xml = req.body;
    let json = parser.toJson(xml)
    console.log(json)
    res.status(200).end();
})
app.post('/api/HeartUrl',(req,res)=>{
    let xml = req.body;
    let json = parser.toJson(xml)
    console.log(json)
    res.status(200).end();
})

app.listen(8070,()=>{
    console.log('running on port 8070')
})