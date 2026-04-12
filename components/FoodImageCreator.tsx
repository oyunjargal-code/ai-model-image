"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FoodImageCreator() {
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setImage("");

    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🎨 Food image creator</CardTitle>
        <p className="text-gray-500 text-sm">
          What food do you want to create? Describe it briefly.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="I just made a delicious plate of Spaghetti Carbonara..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
        <Button onClick={handleGenerate} disabled={!prompt || loading}>
          {loading ? "Үүсгэж байна..." : "Generate"}
        </Button>
        {loading && (
          <div>
            <p className="font-semibold">🖼️ Result</p>
            <p className="text-gray-500">
              Waiting on your image just for moment...
            </p>
          </div>
        )}
        {image && (
          <div>
            <p className="font-semibold">🖼️ Result</p>
            <img
              src={image}
              alt="generated"
              className="w-64 h-64 object-cover rounded-lg mt-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
