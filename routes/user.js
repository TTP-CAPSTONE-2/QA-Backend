const express = require('express')
const router = express.Router()
const { User } = require('../models/index')
const bcrypt = require('bcrypt')


router.post('/auth/register', async (req, res) => {
    console.log("register route hit")
    const {name, email, password} = req.body
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

router.post('/auth/login', async (req, res) => {
    const {email, password} = req.body
    //User logs in

    // Backend verifies email
    const matchedUser = await User.findOne({
        where: {
            email:email,
        }
    })
    if(!matchedUser) {
        return res.status(401).json({error: 'Invalid credentials'})    }

    // Backend verifies password

    const isMatch = await bcrypt.compare(password ,matchedUser.password)

    if(!isMatch) {
        return res.status(401).json({error: 'Invalid credentials'})

    }
    // Backend creates a session for that user

    req.session.userId = matchedUser.id

    console.log(req.session)

    res.status(200).json({
        isLoggedIn: true,
        user: {
            name: matchedUser.name,
            email: matchedUser.email
        }
})
})
router.get('/auth/me', async (req, res) => {

    if(req.session.userId) {

        const loggedUser = await User.findOne({
            where: {
                id: req.session.userId
            }
        })
        if(!loggedUser) {
            return res.status(404).json({error: "Could not find user"})
        }

        return res.json({
            isLoggedIn: true,
            user: {
                name: loggedUser.get('name'),
                email: loggedUser.get('email'),
            }
        })
    }

    return res.json({
        isLoggedIn: false,
        user: null
    })
})

router.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.json({message: "logged out successfully"})
    });
})

module.exports = router