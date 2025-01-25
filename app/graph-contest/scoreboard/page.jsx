'use client'

import React, { useState, useEffect } from 'react'
import { firestore } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award } from 'lucide-react'

export default function Scoreboard() {
  const [finalScoreboard, setFinalScoreboard] = useState([])

  const fetchFinalScoreboard = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, 'submissions'))
      const playersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      playersData.map((item)=>{
        const aSubmissionsTime = item.submissionsTime.reduce((result, item) => {
          return { ...result, ...item };
        }, {});
        item.submissionsTime = aSubmissionsTime;
        return item;
      })


      playersData.sort((a, b) => {        
        const distanceA = a.minDistance.distance;
        const distanceB = b.minDistance.distance;

        if (distanceA !== distanceB) return distanceA - distanceB;

        const que = a.minDistance.question; 
        const timeA = a.submissionsTime[que];
        const timeB = b.submissionsTime[que];        

        const [hA, mA, sA] = timeA.split(":").map(Number);
        const [hB, mB, sB] = timeB.split(":").map(Number);

        const totalSecondsA = hA * 3600 + mA * 60 + sA;
        const totalSecondsB = hB * 3600 + mB * 60 + sB;

        return totalSecondsA - totalSecondsB;
      });
  
      setFinalScoreboard(playersData)
    } catch (error) {
      console.error("Error fetching scoreboard:", error)
    }
  }
  
  useEffect(() => {
    fetchFinalScoreboard()
  }, [])

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Card className="w-full max-w-5xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
            Final Scoreboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>HackerRank ID</TableHead>
                <TableHead className="text-right">Distance from goal</TableHead>
                <TableHead className="text-right">Time Taken</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalScoreboard.length > 0 ? (
                finalScoreboard.map((player, index) => (
                  <TableRow
                    key={player.id}
                    className={index < 3 ? "font-medium" : ""}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(index + 1)}
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell>
                      {player.team_name ? player.team_name : "Anonymous"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {player?.hackerrank_username}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {player?.minDistance?.distance ?? 12}
                    </TableCell>
                    <TableCell className="text-right font-medium text-blue-600">
                     {player?.submissionsTime[player?.minDistance?.question] ?? "NA"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No players found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}