const express = require('express')
const app = express()
const port = 3033
import bodyParser from 'body-parser';
import cors from 'cors';
import creditRoute from './routes/credit.route';
import path from 'path'

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'pages')))

app.get('/', (req, res) => {
    console.log(__dirname);
    //console.log(path.join(__dirname, 'pages'), path.join(__dirname, '../pages'));
    res.sendFile(path.join(__dirname, './pages/index.html'));
})

app.get('/aa', (req, res) => {


});

app.use('/api/credit', creditRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));