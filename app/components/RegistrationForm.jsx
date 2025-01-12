"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { setCookie } from "cookies-next";

export default function RegistrationForm() {
  const [teamName, setTeamName] = useState("");
  const [hackerRankId, setHackerRankId] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCookie("hackerRankId",hackerRankId);
    setCookie("teamName", teamName);
    // You can add validation here if needed
    router.push(`/graph-contest/${hackerRankId}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <TextField
        label="Team Name"
        variant="outlined"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="HackerRank ID"
        variant="outlined"
        value={hackerRankId}
        onChange={(e) => setHackerRankId(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="info" fullWidth>
        Register
      </Button>
    </form>
  );
}
