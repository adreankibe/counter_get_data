const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.text({type:"*/*"}));

app.post('/api/post_url',(req,res)=>{
    console.log(req.body);
 
    res.status(200).end();
})
// app.post('/api/heart_url',(req,res,body)=>{
//     console.log(req.body);
//     res.status(200).end();
// })
// app.post('/',(req,res)=>{
//     console.log(req.body)
// })
app.listen(7050,()=>{
    console.log('running on port 7050')
})