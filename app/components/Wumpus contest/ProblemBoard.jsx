import React, { useState } from "react"
import { useGameStore } from "./GameStore"
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ExternalLink, RefreshCw } from "lucide-react"

function ProblemBoard({ problems }) {
  const { rewardedStepsByProblem, updateRewardedSteps } = useGameStore()
  const [loadingStates, setLoadingStates] = useState({})

  const fetchProblemScore = async (problem) => {
    if (loadingStates[problem.name]) return

    setLoadingStates((prev) => ({ ...prev, [problem.name]: true }))

    try {
      const response = await axios.get(`/api/wumpus?problem=${problem.name}`)

      if (response.data) {
        const leaderboardData = response.data.models
        const hackerRankId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("hackerRankId="))
          ?.split("=")[1]

        const found = leaderboardData.find((element) => element.hacker === hackerRankId)

        if (found) {
          const problemScore = {
            problemName: problem.name,
            userScore: found.score,
            maxScore: problem.score,
            baseSteps: problem.steps,
          }

          await updateRewardedSteps([problemScore])
        }
      }
    } catch (error) {
      console.error(`Error fetching score for ${problem.name}:`, error)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [problem.name]: false }))
    }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Problem Name</TableHead>
            <TableHead>Maximum Steps</TableHead>
            <TableHead>Steps Rewarded</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => {
            const rewardedSteps = rewardedStepsByProblem[problem.name] || 0
            const isLoading = loadingStates[problem.name]
            const progress = Math.min((rewardedSteps / problem.steps) * 100, 100)

            return (
              <TableRow key={index} className="group">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{problem.name}</span>
                    {isLoading && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
                  </div>
                </TableCell>
                <TableCell>{problem.steps}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span>{rewardedSteps}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => fetchProblemScore(problem)}>
                            Update Score
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fetch and update the score for this problem</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={`https://www.hackerrank.com/contests/grid-of-doom-coc-1/challenges/${problem.name}/problem`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1"
                      >
                        <span>View Problem</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>Click on "Update Score" to fetch the latest score and rewarded steps for a problem</p>
        <Badge variant="outline">Total Problems: {problems.length}</Badge>
      </div>
    </div>
  )
}

export default ProblemBoard

