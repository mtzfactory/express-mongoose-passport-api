const Task = require('./TaskModel')

class TasksData {
    create(userId, text, done) {
        return new Promise((resolve, reject) => {
            if (!text)
                throw new Error('no task text provided')

            if (typeof done !== 'boolean')
                throw new Error('task done is not boolean')

            const task = new Task({ userId, text, done })

            task.save()
                .then(resolve)
                .catch(reject)
        })
    }

    list(userId) {
        return Task.find({ userId })
    }

    retrieve(userId, taskId) {
        return new Promise((resolve, reject) => {
            if (!taskId)
                throw new Error('no task id provided')

            //Task.findById(id)
            Task.findOne({ userId, _id: taskId })
                .then(task => {
                    if (!task)
                        throw new Error(`no task with id '${taskId}' in user '${userId}'`)
                    
                    resolve(task)
                })
                .catch(reject)
        })
    }

    update(userId, taskId, text, done) {
        return new Promise((resolve, reject) => {
            if (!taskId)
                throw new Error('no task id provided')

            if (!text)
                throw new Error('no task text provided')

            if (typeof done !== 'boolean')
                throw new Error('task done is not boolean')

            Task.update({ userId, _id: taskId }, { text, done })
                //.then(() => Task.findById(id)
                .then(() => Task.findOne({ userId, _id: taskId })
                    .then(task => {
                        if (!task)
                            throw new Error(`no task with id '${taskId}' in user '${userId}'`)
                        
                        resolve(task)
                    }))
                .catch(reject)
        })
    }

    delete(userId, taskId) {
        return new Promise((resolve, reject) => {
            if (!taskId)
                throw new Error('no task id provided')

            //Task.findById(id)
            Task.findOne({ userId, _id: taskId })
                .then(task => {
                    if (!task)
                        throw new Error(`no task with id '${taskId}' in user '${userId}'`)

                    Task.remove({userId, _id: taskId })
                        .then(() => resolve(task))
                })
                .catch(reject)
        })
    }
}

module.exports = TasksData