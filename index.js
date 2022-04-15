const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
app.use(
    bodyParser.xml({
      limit: '150MB', // Reject payload bigger than 1 MB
      xmlParseOptions: {
        normalize: true, // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false, // Only put nodes in array if >1
      },
    }),
  );
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))

app.post('/api/post_url',(req,res,body)=>{
    console.log(req.body);
    res.status(200).end();
})
app.post('/api/heart_url',(req,res,body)=>{
    console.log(req.body);
    res.status(200).end();
})
app.post('/',(req,res)=>{
    console.log(req.body)
})
app.listen(7050,()=>{
    console.log('running on port 7050')
})