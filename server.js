// load .env variables
require('dotenv').config();

const express =  require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: 'Jason',
        title: 'Journey to the NBA finals'
    },
       {
        username: 'Curry',
        title: 'Splash brothers'
    }
]

app.get('/posts', (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
});

app.post('/login', authenticateToken, (req, res) => {
    // authenticate the user

    // get username
    const username = res.body.username
    const user = { name:username }

    // serialize using jwt
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });

});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(3000, 'localhost');