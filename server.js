const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
// const cors = require('cors');
// app.use(cors({
//     origin: "http://127.0.0.1:5500"
// }))
let summary;
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get("/summary", (req, res) => {
    res.json(summary);
})

app.post('/summary', (req, res) => {
    summary = req.body;
    console.log(summary);
    res.json('status:OK');
});

app.listen(port, () => { console.log(`Server started on port ${port}`) })