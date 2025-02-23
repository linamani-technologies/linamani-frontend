"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { usePerson } from "./PersonContext"; // Adjust the path as needed

const PersonForm = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { setPersonName } = usePerson();

  // Check username availability using the consolidated API.
  const createPerson = async () => {
    try {
      setError(""); // Clear previous errors
      const res = await axios.post("/api/person", {
        action: "create-person",
        username,
      });

      if (res.status === 201) {
        setPersonName(username);
        alert("Created!");
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        setError("Username is already taken. Please try another.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent>
          <Label htmlFor="username">Pick a Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="mt-2"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <Button className="mt-4 w-full" onClick={createPerson}>
            Check Availability
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonForm;
