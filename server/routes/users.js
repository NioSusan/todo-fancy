const router = require('express').Router();
const auth      = require('../helpers/auth');
const isLogin = require('../helpers/isLogin');
const {login, logout, getUsers, newUser, getUser, updateUser, updateUserRole, deleteUser} = require('../controllers/user');

const authUser  = auth(['customer', 'admin'])
const authAdmin = auth(['admin'])

router.post('/login', login);
router.get('/logout', logout);
router.get('/', isLogin, authUser, getUsers);
router.post('/', isLogin, authAdmin, newUser);
router.get('/:userId', isLogin, authUser, getUser);
router.put('/:userId', isLogin, authUser, updateUser);
router.patch('/:userId', isLogin, authAdmin, updateUserRole);
router.delete('/:userId', isLogin, authAdmin, deleteUser);

module.exports = router;
