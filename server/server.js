const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 5000;
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
  
app.use(express.json())

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