import Todo from '../models/todo.model.js'


export const getAllTodos = async (req, res) => {
    try {
        const user = req.user
        if (user == null) {
            return res.status(401).send('User not found')
        }
        const reqTodo = await Todo.find({ user_id: user._id })
        if (reqTodo == null) {
            return res.send('No ToDos')
        }
        return res.send(reqTodo)
    } catch (err) {
        console.log(err.message)
    }
}

export const createTodo = async (req, res) => {
    try {
        const user = req.user
        if (user == null) {
            return res.status(401).send('User not found')
        }
        const { title } = req.body
        // if(title==null){
        //     return res.send('Title required')
        // }    
        const todo = new Todo({
            title,
            user_id: user._id
        })
        await Todo.create(todo)
        return res.send('Created Todo')
    } catch (err) {
        return res.send(err.message)
    }
}

export const editTodo = async (req, res) => {
    // console.log('2')
    try {
        const { id } = req.params
        const todo1 = await Todo.findById(id)
        // console.log(todo)
        if (todo1 == null) {
            return res.send('No such ToDo exists')
        }
        let { title } = req.body
        title = title.trim()
        if (title == null || title == "") {
            return res.send('Title should not be empty')
        }
        todo1.title = title
        await Todo.findByIdAndUpdate(id, todo1)
        return res.send('Succesfully updated')
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = Todo.findById(id, (err) => {
            if (err) return res.send('No such ToDo exists')
        })
        if (!todo) {
            return res.send('No such ToDo exists')
        }
        await Todo.deleteOne(todo)
        return res.send('Successfully deleted Todo')
    } catch (err) {
        console.log(err.message)
    }
}