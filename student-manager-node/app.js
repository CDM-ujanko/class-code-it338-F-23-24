import 'dotenv/config'
import express from 'express';
import data from './models/data.js'

const app = express();

// Start server
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.json({key : [1 , 'seven']});
});

app.get('/student/:id', (req, res) => {
    let student = data.find(s => s._id === req.params.id);
    if (!student) {
        res.status(404);
        res.json('No such student!');
    }

    res.json(student);
});

app.get('/students', (req, res) => {
    res.json(data.map(s => ({name: s.name, id: s._id})));
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})