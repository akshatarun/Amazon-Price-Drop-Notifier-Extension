const express = require('express')
const mongoose = require('mongoose');
const config = require('./config.js')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 5000;
const app = express()

// app.use(
//     express.urlencoded({
//         extended: true
//     })
// )
  
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
// shorter way for the above code. It is a middleware which parses request's body into js objects.
// middlewares are executed for all urls in the beginning

mongoose.connect(config.url,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req,res)=>{
    res.send("Hi")
})

app.post('/products', cors(), (req,res)=>{
    console.log(req.body.testData);
   // console.log(req.body.testData);
    resp={
        data: "Hi i am the response from the server."
    }
    res.json(resp);
})

app.listen(PORT,console.log(`Server is listening to port ${PORT}`));