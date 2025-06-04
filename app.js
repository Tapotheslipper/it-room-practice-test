import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
const secretKey = 'sosi';

app.use(express.static('public'));
app.use(bodyParser.json());

let users = [];
let posts = [];

const dbPath = './db.json';
fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
        console.log('error reading file: ', err);
        return;
    } else {
        let dbData = JSON.parse(data);
        users = dbData.users || [];
        posts = dbData.posts || [];
    }
});

// users API ---
// get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// get one user
app.get('/api/users/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    let user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).send('user not found');
    } else {
        res.json(user);
    }
});

// user registration
app.post('/api/users/reg', async (req, res) => {
    let emailCheck = users.find(u => u.email === req.body.email);
    if (emailCheck) {
        return res.status(400).send('this email is already in use');
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

    users.push(newUser);

    fs.writeFile(dbPath, JSON.stringify({users, posts}, null, 2), (err) => {
        if (err) {
            console.log('error writing to file: ', err);
            return;
        } else {
            res.status(201).send(newUser);
        }
    });
});

// // user authorization
// app.post('/api/users/auth', async (req, res) => {
//     let user = users.find(u => u.email === req.body.email);
//     if (!user) {
//         return res.status(404).send('user not found');
//     }
//     let passwordFlag = await bcrypt.compare(req.body.password, user.password);
//     if (!passwordFlag) {
//         return res.status(401).send('invalid password');
//     }
//     const token = jwt.sign({id: user.id}, secretKey, {expiresIn: '1h'});
//     res.json({token});
// });

// const authenticateJWT = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (token) {
//         jwt.verify(token, secretKey, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             } else {
//                 req.user = user;
//                 next();
//             }
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };

// posts API ---
// get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// get one post
app.get('/api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    let post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).send('post not found');
    } else {
        res.json(post);
    }
});

// create new post
app.post('/api/posts', (req, res) => {
    let newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        posted: false,
        userId: req.user.id
    };
    posts.push(newPost);
    fs.writeFile(dbPath, JSON.stringify({users, posts}, null, 2), (err) => {
        if (err) {
            console.log('error writing in file: ', err);
            return;
        } else {
            res.status(201).json(newPost);
        }
    });
});

// publish a post / unpublish without removing
app.patch('/api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    let postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).send('Post not found to publish.');
    } else {
        posts[postIndex].posted = req.body.posted;
        fs.writeFile(dbPath, JSON.stringify({posts}, null, 2), (err) => {
            if (err) {
                console.log('error writing in file: ', err);
                return;
            } else {
                res.json(posts[postIndex]);
            }
        });
    }
});

// change whole post
app.put('/api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    let postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).send('Post not found to modify.');
    } else {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
        fs.writeFile(dbPath, JSON.stringify({posts}, null, 2), (err) => {
            if (err) {
                console.log('error changing in file: ', err);
                return;
            } else {
                res.json(posts[postIndex]);
            }
        });
    }
});

// remove one post
app.delete('/api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    fs.writeFile(dbPath, JSON.stringify({posts}, null, 2), (err) => {
        if (err) {
            console.log('error removing from file: ', err);
            return;
        } else {
            res.status(204).send();
        }
    });
});

// starting the server
app.get('/', (req, res) => {
    res.send('Title page.');
});

app.listen(port, () => {
    console.log('First app listening on port ', port);
});