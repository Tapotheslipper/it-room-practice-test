import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

let posts = [];

// getting all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// creating a post
app.post('/api/posts', (req, res) => {
    let newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// edit a post
app.put('api/posts', (req, res) => {
    let postId = parseInt(req.params.id);
    let post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).send('Пост не найден.');
    } else {
        post.title = req.body.title;
        post.content = req.body.content;
        res.json(post);
    }
});

// deleting a post
app.delete('api/posts/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Ebal Baranov.');
});

app.listen(port, () => {
    console.log('Example app listening on port ', port);
});