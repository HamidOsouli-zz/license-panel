const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const path=require('path');

// Our DB Configuration
require('./database');
const Post = require('./models/Post.model');
const app = express();
const apiPort = 3030;
// if (process.env.NODE_ENV === "production") {
//   const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");
//
// // Static files
//   app.use(express.static(CLIENT_BUILD_PATH));
//
// // Server React Client
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
//   });
// }

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
// Routes
const postRouter = require('./routes/post.router');
// app.get('/', postRouter)
app.use('/posts', postRouter);


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
