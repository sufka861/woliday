const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    signUpToEvent,
    uploadImg,
} = require('../controller/user');

router.get('/', getAllUsers);
router.get('/details', getUserById);
router.post('/', createUser);
router.put('/event',signUpToEvent);
router.put('/details', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
