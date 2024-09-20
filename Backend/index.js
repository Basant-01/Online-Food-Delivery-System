const express = require('express')
const app = express()
const port = 5000
const fetchData = require("./db")
//const connectToMongo = require("./db")
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
})
fetchData();
//connectToMongo();

app.use(express.json());
app.use('/api',require("./Routes/CreatUser"))
app.use('/api',require("./Routes/DisplayData"))

app.get('/', (req, res) => {
  res.send('Hello World!--')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})