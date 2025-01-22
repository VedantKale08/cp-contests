import React, { useState } from 'react';
import { useGameStore } from "./GameStore";
import axios from 'axios';

function ProblemBoard({ problems }) 
{ 
  const { rewardedStepsByProblem, updateRewardedSteps } = useGameStore();
  const [loadingStates, setLoadingStates] = useState({});

  const fetchProblemScore = async (problem) => {
    if (loadingStates[problem.name]) return;
    
    setLoadingStates(prev => ({ ...prev, [problem.name]: true }));
    
    try {
      const response = await axios.get(`/api/wumpus?problem=${problem.name}`);
      
      if (response.data) {
        const leaderboardData = response.data.models;
        const hackerRankId = document.cookie
          .split('; ')
          .find(row => row.startsWith('hackerRankId='))
          ?.split('=')[1];

        const found = leaderboardData.find(
          (element) => element.hacker === hackerRankId
        );

        if (found) {
          const problemScore = {
            problemName: problem.name,
            userScore: found.score,
            maxScore: problem.score,
            baseSteps: problem.steps
          };
          
          await updateRewardedSteps([problemScore]);
        }
      }
    } catch (error) {
      console.error(`Error fetching score for ${problem.name}:`, error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [problem.name]: false }));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Problem Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Maximum Steps
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Steps Rewarded
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {problems.map((problem, index) => {
            const rewardedSteps = rewardedStepsByProblem[problem.name] || 0;
            const isLoading = loadingStates[problem.name];
            
            return (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} cursor-pointer hover:bg-gray-100 transition-colors`}
                onClick={() => fetchProblemScore(problem)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center space-x-2">
                    {problem.name}
                    {isLoading && (
                      <span className="inline-block h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {problem.steps}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rewardedSteps}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={problem.link}
                    className="text-blue-600 hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Problem
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-600">
        Click on any problem to update its score and rewarded steps
      </div>
    </div>
  );
}

export default ProblemBoard;