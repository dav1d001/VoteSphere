const Election = require('../models/Election');

// Utility function to validate ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Create a new election
exports.createElection = async (req, res) => {
  const { title, description, candidates, startDate, endDate } = req.body;
  try {
    const newElection = new Election({
      title,
      description,
      candidates,
      startDate,
      endDate,
    });
    await newElection.save();
    res.status(201).json({ success: true, election: newElection });
  } catch (error) {
    console.error('Error creating election:', error);
    res.status(500).json({ success: false, message: 'Failed to create election' });
  }
};

// Get all elections
exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    console.error('Error fetching elections:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch elections' });
  }
};

// Get a specific election by ID
exports.getElectionById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'Invalid election ID' });
  }
  try {
    const election = await Election.findById(id);
    if (!election) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }
    res.json(election);
  } catch (error) {
    console.error('Error fetching election:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch election' });
  }
};

// Get candidates for a specific election
exports.getCandidates = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'Invalid election ID' });
  }
  try {
    const election = await Election.findById(id).select('candidates');
    if (!election) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }
    res.json(election.candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch candidates' });
  }
};

// Get results for a specific election
exports.getResults = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'Invalid election ID' });
  }
  try {
    const election = await Election.findById(id).select('candidates');
    if (!election) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    const results = election.candidates.map(candidate => ({
      name: candidate.name,
      votes: candidate.votes,
    }));
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch results' });
  }
};
