const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController'); // Ensure correct path
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this middleware is implemented

// Ensure correct function is being passed
router.post('/create', authMiddleware, voteController.createElection);  // Example route for creating an election
router.get('/', voteController.getVotes);  // Assuming this is fetching votes
router.post('/:electionId/vote', authMiddleware, voteController.castVote);  // Voting route

module.exports = router;
