import 'dotenv/config'
import express from 'express';
import multer from 'multer';
import * as path from 'path'
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
     filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
     }
})

const upload = multer({ storage: storage});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/photos/', express.static('upload'))

app.get('/', (req, res) => {
    res.json({key : [1 , 'seven']});
});

app.get('/students', async (req, res) => {
    res.json(await store.list());
});

/**
 * Create
 */
app.post('/student', upload.single('photo'), async (req, res) => {
    let student = req.body;
    console.log(student);
    console.log(req.file);
    student.photo = '/photos/' + req.file.filename;
    res.json(await store.create(student));
})

/**
 * Read
 */
app.get('/student/:id', async (req, res) => {
    res.json(await store.read(req.params.id));
});

/**
 * Update
 */
app.put('/student/:id', async (req, res) => {
    let student = req.body;
    student.id = req.params.id;
    console.log(student);
    res.json(await store.update(student));
})

/**
 * Delete
 */
app.delete('/student/:id', async (req, res) => {
    res.json(await store.delete(req.params.id));
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})