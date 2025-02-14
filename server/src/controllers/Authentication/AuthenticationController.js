const {user} = require('../../../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

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
            const user = await user.create(req.body)
            const userJson = user.toJSON()
            res.send(
                {
                    user: userJson,
                    token: jwtSignUser(userJson)
                }
            );
        } catch (err) {

            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }

    },
    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await user.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )

            if(!user) {
                res.status(403).send({
                    error: 'Login information invalid1.'
                })
                return;
            }

            const isPasswordValid = await user.comparePassword(password)

            if(!isPasswordValid) {
                res.status(403).send({
                    error: 'Login information invalid'
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

            res.status(500).send({
                error: 'Error while trying to login.' + err
            })
        }

    }
}