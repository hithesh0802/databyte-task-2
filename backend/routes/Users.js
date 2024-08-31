const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { searchUsers, sendRequest, handleRequest, getdetails, getRequests } = require('../controllers/UserController');

router.post('/search', authMiddleware, searchUsers);
router.post('/send-request', authMiddleware, sendRequest);
router.post('/accept-request', authMiddleware, handleRequest);
router.get('/getdetails',authMiddleware,getdetails);
router.get('/getrequests',authMiddleware,getRequests);

module.exports = router;