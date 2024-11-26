// VotingPage.js
import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Import the api module

function VotingPage() {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await api.get('/api/candidates'); // Use api instead of axios
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates', error);
            }
        };
        fetchCandidates();
    }, []);

    const handleVote = async () => {
        if (selectedCandidate) {
            try {
                await api.post('/api/vote', { candidateId: selectedCandidate }); // Use api instead of axios
                alert('Vote submitted successfully!');
            } catch (error) {
                console.error('Error submitting vote', error);
            }
        }
    };

    return (
        <div>
            <h2>Vote for your candidate</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.id}>
                        <label>
                            <input
                                type="radio"
                                name="candidate"
                                value={candidate.id}
                                onChange={() => setSelectedCandidate(candidate.id)}
                            />
                            {candidate.name}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={handleVote}>Submit Vote</button>
        </div>
    );
}

export default VotingPage;
