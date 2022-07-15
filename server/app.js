const express = require("express");
const data = require('./data')
const app = express();

// Tell the app to listen to JSON bodies on POST request
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/flavours', (req, res) => {

    let flavours = data;
    if (req.query.vegan == 'true') {
        flavours = flavours.filter(f => f['vegan'])
    } else if (req.query.vegan == 'false') {
        flavours = flavours.filter(f => f['vegan'] === false)
    }
    

    res.json({
        flavours: flavours.map(flavour => flavour['flavour'])
    })
})

app.get('/flavours/:id', (req, res) => {
    const id = req.params.id

    const filteredData = data.filter(f => f['id'] == id)

    if (filteredData.length == 1) {

        res.json({
            flavour: filteredData[0]
        })
    } else {
        res.status(404).json({
            error: "No such ice cream"
        })
    }

})

app.post('/flavours', (req, res) => {
    console.log(req.body);

    const newFlavour = req.body
    newFlavour['id'] = data.length + 1
    data.push(newFlavour)

    res.status(201).json({success: true,
    flavour: newFlavour})
})

module.exports = app
