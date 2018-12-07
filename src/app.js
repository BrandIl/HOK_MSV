const express = require('express')
const app = express()
const port = 3033


import creditRoute from './routes/credit.route';


app.get('/', (req, res) => {
    console.log(path.join(__dirname, 'pages'), path.join(__dirname, '../pages'));
    res.sendFile(path.join(__dirname, '../pages/index.html'));
})

app.get('/aa', (req, res) => {
   
   
});

app.use('/api/credit', creditRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));