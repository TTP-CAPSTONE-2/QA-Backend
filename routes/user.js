const express = require('express')
const router = express.Router()
const { User } = require('../models/index')

router.post('auth/register', async (req, res) => {
    const {name, email, password} = req.body

    // try to see if user exists
    const userMatch = await User.findOne({
        where: {
            email: email
        }
    })
    // if user exist, dont create a new user
    if(userMatch) {
        return res.status(409).json({error: "User with email already exists"})
    }

    // else - bcrypt hash password before this part on the model
    const newUser = await User.create({name, email, password})
    
    res.status(201).json({
        name: newUser.get('name'),
        email: newUser.get('email')
    })

})