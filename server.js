//load .env variables
require('dotenv').config();

const express =  require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: 'Jason Tatum',
        title: 'Journey to the NBA finals'
    },
       {
        username: 'Stephen Curry',
        title: 'Splash brothers'
    }
]

app.get('/posts', (req, res) => {
    res.json(posts)
});

app.post('/login', (req, res) => {
    //authenticate the user

    //get username
    const username = res.body.username
    const user = { name:username }

    //serialize using jwt
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });

});

app.listen(3000, 'localhost');