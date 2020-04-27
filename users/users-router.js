const router = require("express").Router();
const Users = require('./users-model.js')

router.get('/', (req, res) => {
    console.log('token', req.decodedToken);
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.send(err))
})

router.get("/:userId", (req, res) => {
    const id = req.params.userId

    Users.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
})