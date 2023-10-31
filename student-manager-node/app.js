import 'dotenv/config'
import express from 'express';
import multer from 'multer';
import * as path from 'path'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

// import data from './models/data.js'
import { StudentSqlStore } from './models/StudentSqlStore.js';
import { UserSqlStore } from './models/UserSqlStore.js';

const app = express();
const store = new StudentSqlStore();
const userStore = new UserSqlStore();

// Start server
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Pass to next layer of middleware
    next();
});

app.use(passport.initialize());

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

// /**
//  * Create User
//  */
// app.post('/user', async (req, res) => {
//     const hash = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));
//     const user = {
//         username: req.body.username,
//         password: hash
//     }
//     res.json(await userStore.create(user));
// })

app.post('/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json('Invalid username or password.');
        return;
    }

    try {
        let user = await userStore.read(req.body.username);
        if (!user) {
            res.status(401).json('Invalid username or password.');
            return;
        }

        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            let tokenObj = {
                username: user.username
            }

            let token = jwt.sign(tokenObj, process.env.JWT_KEY, {expiresIn: '30 days'});
            res.json({
                username: user.username,
                token: token
            })
        } else {
            res.status(401).json('Invalid username or password.');
        }
    } catch (e) {
        res.status(401).json(e);
    }
})

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}, async (token, done) => {
    try {
        let user = await userStore.read(token.username)
        return user ? done(null, user) : done(null, false);
    } catch (e) {
        return done(e, false);
    }
}))

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})