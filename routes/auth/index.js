const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../../users/UserModel')

const auth = express.Router()

auth.post('/register', (req, res) => {
    const { username, password } = req.body

    const user = new User({ username })

    User.register(user, password, err => {
        if (err) return res.json({
            status: 'KO',
            message: err.message
        })

        res.json({
            status: 'OK',
            message: `user '${username}' registered successfully`
        })
    })
})

auth.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const { _id: id, username } = req.user

    const token = jwt.sign({ id, username }, process.env.SECRET)

    res.json({
        status: 'OK',
        message: `user '${username}' authenticated successfully`,
        data: token
    })
})

module.exports = auth