const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const passport = require('passport');

const db = require('./config/keys').mongoURI;

const bodyParser = require('body-parser');


// bodyParser middleware function
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect(db)
  .then(()=>console.log('MongoDB Connected'))
  .catch((err)=> console.error(err))


// Passport Middleware
app.use(passport.initialize());


//Passport config
require('./config/passport')(passport);

// Use Routes;

app.use('/api/users' , users)
app.use('/api/profile' , profile)
app.use('/api/posts' , posts)




const port = process.env.PORT || 5000;

app.listen(port , () => {console.log(`Server running on port ${port}`)});