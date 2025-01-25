"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getCookie, setCookie } from "cookies-next";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.js";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [hackerRankId, setHackerRankId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedHackerRankId = getCookie("hackerRankId");
    const savedName = getCookie("name");

    if (savedHackerRankId && savedName) {
      router.push(`/wumpus-world/${savedHackerRankId}`);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCookie("hackerRankId", hackerRankId);
    setCookie("name", name);
    const contestStartTime = new Date().toISOString();
    localStorage.setItem("contestStartTime", contestStartTime);

    console.log("User registered successfully in Firebase!");
    router.push(`/wumpus-world/${hackerRankId}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
