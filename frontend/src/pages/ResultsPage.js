import React, { useState, useEffect } from 'react';
import UserMenuBar from '../components/UserMenuBar';

const ResultsPage = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/elections', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setElections(data);
      } catch {
        setError('Failed to fetch elections.');
      }
    };

    fetchElections();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/elections/${selectedElection}/results`);
      const data = await response.json();
      setResults(data);
    } catch {
      setError('Failed to fetch results.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserMenuBar />
      <div className="flex justify-center items-center min-h-screen py-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Election Results</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Election Selection */}
          <select
            value={selectedElection || ''}
            onChange={(e) => setSelectedElection(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an Election</option>
            {elections.map((election) => (
              <option key={election._id} value={election._id}>
                {election.title}
              </option>
            ))}
          </select>

          {/* View Results Button */}
          <button
            onClick={fetchResults}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
          >
            View Results
          </button>

          {/* Results List */}
          {results && (
            <ul className="space-y-4 mt-6">
              {results.map((result) => (
                <li key={result.candidateId} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">{result.name}</p>
                    <p className="text-sm text-gray-600">{result.votes} votes</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
