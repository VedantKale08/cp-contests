'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegistrationForm() {
  const [teamName, setTeamName] = useState('')
  const [hackerRankId, setHackerRankId] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    // You can add validation here if needed
    router.push(`/dashboard/${hackerRankId}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
          Team Name
        </label>
        <input
          type="text"
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="hackerRankId" className="block text-sm font-medium text-gray-700">
          HackerRank ID
        </label>
        <input
          type="text"
          id="hackerRankId"
          value={hackerRankId}
          onChange={(e) => setHackerRankId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Register
      </button>
    </form>
  )
}

