const {User} = require('../../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    const payload = {
        user: user,
        id: user.id
    }
    return jwt.sign(payload, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.send(
                {
                    user: userJson,
                    token: jwtSignUser(userJson)
                }
            );
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }

    },
    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )
            console.log("TESTE")
            if(!user) {
                res.status(403).send({
                    error: 'Login information invalid1.'
                })
                return;
            }
            console.log("TESTE1")
            const isPasswordValid = await user.comparePassword(password)
            console.log("TESTE2")
            console.log(isPasswordValid)
            console.log("TESTE3")
            if(!isPasswordValid) {
                res.status(403).send({
                    error: 'Login information invalid2'
                })
                return;
            }
            const userJson = user.toJSON()
            res.send(
                {
                    user: userJson,
                    token: jwtSignUser(userJson)
                }
            );
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying to login.'
            })
        }

    }
}