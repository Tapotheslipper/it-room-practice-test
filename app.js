import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

let posts = [];

const dbPath = './db.json';
fs.readFile(dbPath, 'utf-8', (err, data) => {
   if (err) {
    console.log('error reading file: ', err);
    return;
   }
   posts = JSON.parse(data).posts;
});

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    let post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).send('post not found');
    } else {
        res.json(post);
    }
});

app.post('/api/posts', (req, res) => {
    let newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    fs.writeFile(dbPath, JSON.stringify({posts}, null, 2), (err) => {
        if (err) {
            console.log('error writing in file: ', err);
            return;
        }
    });
    res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    let postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).send('Post not found.');
    } else {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
        fs.writeFile(dbPath, JSON.stringify({posts}, null, 2), (err) => {
            if (err) {
                console.log('error changing in file: ', err);
                return;
            }
        });
        res.json(posts[postIndex]);
    }
});

app.delete('/api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    fs.writeFile(dbPath, JSON.stringify({posts}, null, 2), (err) => {
        if (err) {
            console.log('error removing from file: ', err);
            return;
        }
    });
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Title page.');
});

app.listen(port, () => {
    console.log('First app listening on port ', port);
});