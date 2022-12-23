import Todo from '../models/todo.model.js'


export const addTask=async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        if (todo == null) {
            return res.send('No such Todo exists')
        }
        let main = req.body.main
        main = main.trim()
        if (main == null || main == "") {
            return res.send('Task should not be empty')
        }
        todo.tasks.push({ main: req.body.main })
        await Todo.findByIdAndUpdate(id, todo)
        return res.send('Successfully updated')
    } catch (err) {
        console.log(err)
    }
}


export const checkTask=async (req, res) => {
    try {
        const { todoid, taskid } = req.params
        const todo = await Todo.findById(todoid)
        if (todo == null) {
            return res.send('No such ToDo exists')
        }
        const task = todo.tasks.find(t => t._id == taskid)
        // console.log(task)
        // res.send(task)
        if (task == null) {
            return res.send('No such task')
        }
        // if(task.checked==true) task.checked=false
        // else task.checked=true
        await Todo.updateOne({ "tasks._id": taskid }, { $set: { "tasks.$.checked": (!task.checked) } })
        res.sendStatus(200)
    } catch (err) {
        console.log(err.message)
    }
}


export const deleteTask=async (req, res) => {
    try {
        const { todoid, taskid } = req.params
        const todo = await Todo.findById(todoid)
        if (todo == null) {
            return res.send('No such ToDo exists')
        }
        const task = todo.tasks.find(t => t._id == taskid)
        // console.log(task)
        // res.send(task)
        if (task == null) {
            return res.send('No such task')
        }
        todo.tasks.pull({ _id: taskid })
        await Todo.findByIdAndUpdate(todoid,todo)
        res.sendStatus(200)
    } catch (err) {
        console.log(err.message)
    }
}