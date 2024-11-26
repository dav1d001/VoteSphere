const mongoose = require('mongoose');
const Election = require('../models/Election'); // Ensure this model contains the election and candidates schema
const Vote = require('../models/voteModel'); // Ensure this model defines vote details

const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.status(200).json(votes);
  } catch (err) {
    console.error('Error fetching votes:', err.message);
    res.status(500).json({ message: 'Failed to fetch votes' });
  }
};

const castVote = async (req, res) => {
  const { electionId } = req.params;
  const { candidateId } = req.body;

  try {
    // Validate `electionId` format
    if (!mongoose.Types.ObjectId.isValid(electionId)) {
      return res.status(400).json({ success: false, message: 'Invalid election ID format' });
    }

    // Find the election by ID
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    // Find the candidate by ID within the election
    const candidate = election.candidates.id(candidateId);
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    // Increment the candidate's vote count
    candidate.votes += 1;

    // Save the updated election
    await election.save();

     // Log updated vote count
    console.log(`After vote: ${candidate.name} has ${candidate.votes} votes.`);

    res.json({ success: true, message: 'Vote cast successfully', candidate });
  } catch (error) {
    console.error('Error casting vote:', error);
    res.status(500).json({ success: false, message: 'Failed to cast vote' });
  }
};

//election create
const createElection = async (req, res) => {
  const { title, candidates, startDate, endDate } = req.body;

  try {
    // Validate that all required fields are provided
    if (!title || !candidates || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'All fields are required (title, candidates, startDate, endDate).' });
    }

    // Create a new election document
    const newElection = new Election({
      title,
      candidates: candidates.map((name) => ({ name, votes: 0 })), // Initialize votes to 0 for each candidate
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    // Save the election to the database
    await newElection.save();
    res.status(200).json({ success: true, message: 'Election created successfully', election: newElection });
  } catch (error) {
    console.error('Error creating election:', error); // Log error
    res.status(500).json({ success: false, message: 'Failed to create election', error: error.message });
  }
};


module.exports = {
  getVotes,
  castVote,
  createElection, // Include createElection if admin functionalities are needed
};
