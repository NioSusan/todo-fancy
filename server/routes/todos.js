const router = require('express').Router();
const {getTodos, newTodo, getTodo, updateTodo, deleteTodo} = require('../controllers/todo');
const isLogin =  require('../helpers/isLogin');
const auth =  require('../helpers/auth');

const authUser  = auth(['customer', 'admin'])
const authAdmin = auth(['admin'])

router.get('/', isLogin, authUser, getTodos);
router.post('/', isLogin, authUser, newTodo);
router.get('/:todoId',isLogin, authUser, getTodo);
router.put('/:todoId',isLogin, authUser, updateTodo);
router.delete('/:todoId',isLogin, authUser, deleteTodo);

module.exports = router;