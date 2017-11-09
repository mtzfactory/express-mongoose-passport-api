const express = require('express')
const passport = require('passport')
const tasksData = new(require('../../tasks/TasksData'))

const api = express.Router()

api.use(passport.authenticate('jwt', { session: false }))

api.route('/tasks/')
    .get((req, res) => {
        const { id: userId, username } = req.user // Passport

        tasksData.list(userId)
            .then(tasks => {
                res.json({
                    status: 'OK',
                    message: 'tasks listed successfully',
                    data: tasks
                })
            })
            .catch(err => {
                res.json({
                    status: 'KO',
                    message: err.message
                })
            })
    })
    .post((req, res) => {
        const { text, done } = req.body
        const { id: userId, username } = req.user // Passport

        tasksData.create(userId, text, done)
            .then(task => {
                res.json({
                    status: 'OK',
                    message: 'task created successfully',
                    data: task
                })
            })
            .catch(err => {
                res.json({
                    status: 'KO',
                    message: err.message
                })
            })
    })

api.route('/tasks/:id')
    .get((req, res) => {
        const { id: taskId } = req.params
        const { id: userId, username } = req.user // Passport

        tasksData.retrieve(userId, taskId)
            .then(task => {
                res.json({
                    status: 'OK',
                    message: 'task retrieved successfully',
                    data: task
                })
            })
            .catch(err => {
                res.json({
                    status: 'KO',
                    message: err.message
                })
            })
    })
    .put((req, res) => {
        const { id: taskId } = req.params
        const { id: userId, username } = req.user // Passport
        const { text, done } = req.body

        tasksData.update(userId, taskId, text, done)
            .then(task => res.json({
                status: 'OK',
                message: 'task updated successfully',
                data: task
            }))
            .catch(err => res.json({
                status: 'KO',
                message: err.message
            }))
    })
    .delete((req, res) => {
        const { id: taskId } = req.params
        const { id: userId, username } = req.user // Passport
        
        tasksData.delete(userId, taskId)
            .then(task => res.json({
                status: 'OK',
                message: 'task deleted successfully',
                data: task
            }))
            .catch(err => res.json({
                status: 'KO',
                message: err.message
            }))

    })

module.exports = api