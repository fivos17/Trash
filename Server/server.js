const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500"
}))
let summary;

app.get("/", (req, res) => {
    res.json('hello:bruv');
})

app.get("/summary", (req, res) => {
    res.json(summary);
})

app.post('/summary', (req, res) => {
    summary = req.body;
    console.log(summary);
    res.json('status:OK');
});

app.listen(5000, () => { console.log('Server started on port 5000') })