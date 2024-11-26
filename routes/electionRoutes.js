const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');
const verifyToken = require('../middleware/verifyToken'); // Using verifyToken for authentication

// Route to create a new election (protected)
router.post('/create', verifyToken, electionController.createElection);

// Route to get all elections (no authentication)
router.get('/', electionController.getAllElections);

// Route to get a specific election by ID
router.get('/:id', electionController.getElectionById);

// Route to get candidates for a specific election
router.get('/:id/candidates', electionController.getCandidates);

// Route to get results for a specific election
router.get('/:id/results', electionController.getResults);

module.exports = router;
