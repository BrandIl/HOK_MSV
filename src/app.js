const express = require('express')
const app = express()
const port = 3000
import Data from './models/data.model'

console.log(new Data({
    institution: {
        name: 'aa',
        code: '555'
    },
    serialNumber: '00',
    creationDate: '01012010',
    paymentDate: '00012010',
    senderInstitution: '5555',
    actions:[{}]
}));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));