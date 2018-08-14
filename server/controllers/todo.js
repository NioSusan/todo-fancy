const Todo = require("../models/todo");
const User = require("../models/user");

module.exports = {
	getTodos: (req, res) => {
		let id = req.headers.id;
		User.findById(id)
			.populate("todos")
			.then(user => {
                let todos = user.todos;
				res.status(200).json(todos);
			})
			.catch(err => {
				res.status(500).json(err.errors.name.message);
			});
	},

	newTodo: (req, res) => {
		let id = req.headers.id;
		let todoName = req.body.name;

		Todo.findOne({ name: todoName })
			.then(todo => {
				if (todo == null) {
					Todo.create({ name: req.body.name }).then(newTodo => {
						let todoId = newTodo._id;
						User.findOneAndUpdate({ _id: id }, { $push: { todos: todoId } })
							.then(success => {
								res.status(201).json(newTodo);
							})
							.catch(error => {
								console.log("error to push!", error);
							});
					});
				} else {
					todoId = todo._id;
					User.findOneAndUpdate({ _id: id }, { $push: { todos: todoId } })
						.then(success => {
							console.log("success to push!", success);
							res.status(201).json(todo);
						})
						.catch(error => {
							console.log("error to push!", error);
						});
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	},

	getTodo: (req, res) => {
		Todo.findById(req.params.todoId)
			.then(todo => {
				res.status(200).json(todo);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	},

	updateTodo: (req, res) => {
		Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
			.then(todo => {
				res.status(200).json(todo);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	},

	deleteTodo: (req, res) => {
		Todo.remove({ _id: req.params.todoId })
			.then(() => {
				res.status(200).json({ msg: "Successfully deleted!" });
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
};
