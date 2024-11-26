import React, { useState, useEffect } from 'react';
import MenuBar from '../components/UserMenuBar';

const CastVotePage = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/elections', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        if (response.ok) {
          setElections(data);
        } else {
          setError('Failed to fetch elections.');
        }
      } catch {
        setError('Failed to fetch elections.');
      }
    };

    fetchElections();
  }, []);

  const handleVote = async () => {
    if (!selectedElection || !selectedCandidate) {
      setError('Please select an election and a candidate.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/votes/${selectedElection}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ candidateId: selectedCandidate }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Vote cast successfully!');
        setError(null);
      } else {
        setError(data.message || 'Failed to cast vote.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MenuBar />
      <div className="flex items-center justify-center min-h-screen py-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cast Your Vote</h2>
          
          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          
          {/* Election Selection */}
          <select
            value={selectedElection || ''}
            onChange={(e) => setSelectedElection(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an Election</option>
            {elections.map((election) => (
              <option key={election._id} value={election._id}>
                {election.title}
              </option>
            ))}
          </select>

          {/* Candidate Selection */}
          {selectedElection && (
            <select
              value={selectedCandidate || ''}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Candidate</option>
              {elections
                .find((e) => e._id === selectedElection)
                ?.candidates.map((candidate) => (
                  <option key={candidate._id} value={candidate._id}>
                    {candidate.name}
                  </option>
                ))}
            </select>
          )}
          
          {/* Cast Vote Button */}
          <button
            onClick={handleVote}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
          >
            Cast Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CastVotePage;
