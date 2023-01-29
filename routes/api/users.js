//For authentication purposes only
const express = require('express')
const router = express.Router();
const User = require('../../models/Users');
const bcrypt = require('bcryptjs')

// @route   GET api/users/test
// @desc    Tests users route
// @access  Private
router.get('/test', (req, res)=>{ res.json({msg: "User routes working good."}) })



// @route   GET api/users/register
// @desc    Registers users
// @access  Public
router.post('/register', (req, res)=>{ 
  User.findOne({email: req.body.email})
    .then((user)=> {
      if(user){
        return res.status(400).json({email: "Email Already Exists"});
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password , salt , (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then( user => res.json(user))
              .catch(err => console.error(err))
          })
        })
      }
    })
})


// @route   GET api/users/login
// @desc    Login user / Send JWT
// @access  Public
router.post('/login' , (req,res) => {
  User.findOne({email: req.body.email})
  .then((user) => {
    if(!user){
      return res.status(404).json({email: "User doesn't Exist"});
    } else {
      bcrypt.compare(req.body.password, user.password)
        .then(isMatch => {
          if(isMatch) {
            res.json({msg: "Successfully logged in"});
          } else {
            res.status(400).json({password: "Incorrect Password"});
          }

        });
      

    }

  })

})





module.exports = router;