"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE_URL } from "@/lib/config";

export default function ImmigrationChatPage() {
  const [question, setQuestion] = useState("");
  const [forms, setForms] = useState<any[]>([]);
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!question.trim()) return;
    setStreamedAnswer("");
    setForms([]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });

      if (!response.body) {
        throw new Error("No response body found.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedAnswer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk
          .split("\n")
          .filter((line) => line.startsWith("data:"));

        for (const line of lines) {
          const jsonStr = line.replace("data: ", "").trim();
          if (jsonStr === "[DONE]") break;

          const parsed = JSON.parse(jsonStr);

          if (parsed.forms) {
            setForms(parsed.forms);
          } else if (parsed.chunk) {
            accumulatedAnswer += parsed.chunk;
            setStreamedAnswer(accumulatedAnswer);
          }
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
      setStreamedAnswer("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Immigration Assistant
      </h1>

      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Describe your immigration situation..."
        className="mb-4 min-h-[120px]"
      />

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Thinking..." : "Submit"}
      </Button>

      {forms.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Recommended Forms</h2>
          {forms.map((form) => (
            <Card key={form.form_id}>
              <CardContent className="p-4">
                <h3 className="font-bold">
                  {form.form_id} - {form.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {form.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {streamedAnswer && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Response</h2>
          <Card>
            <CardContent className="whitespace-pre-line p-4 text-muted-foreground">
              {streamedAnswer}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
