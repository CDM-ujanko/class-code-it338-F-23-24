import 'dotenv/config'
import express from 'express';
// import data from './models/data.js'
import { StudentSqlStore } from './models/StudentSqlStore.js';

const app = express();
const store = new StudentSqlStore();

// Start server
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({key : [1 , 'seven']});
});

app.get('/student/:id', async (req, res) => {
    res.json(await store.read(req.params.id));
});

app.get('/students', async (req, res) => {
    res.json(await store.list());
});

app.post('/student', async (req, res) => {
    let student = req.body;
    console.log(student);
    res.json(await store.create(student));
})

// Create
// Read
// Update
// Delete

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})