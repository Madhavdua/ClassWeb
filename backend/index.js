const express = require("express");
const app = express();

require('dotenv').config();
const port = process.env.PORT || 80;


const db = require("./db");
const URI = process.env.URI || "mongodb://localhost:27017/Classroom";
db.connect(URI);

// to avoid cors error
let cors = require('cors')
app.use(cors());

// to avoid req. body is undefined i use below 2 statements
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send("Hello ")
})

const path = require('path');
let file=""
app.put('/attachment/:file', (req, res) => {
    file=req.params.file;
    return res.json({success:true});
})
app.get('/attachment', (req, res) => {
    const showfile = path.join(__dirname,'uploads',file);
    res.sendFile(showfile);
})

app.use('/api/auth', require('./Routes/user'));
app.use('/api/task', require('./Routes/task'));
app.use('/api/group', require('./Routes/group'));


app.listen(port, () => {
    console.log("app is listening")
})
