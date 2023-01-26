const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    signUpToEvent
} = require('../controller/user');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/event',signUpToEvent)
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
