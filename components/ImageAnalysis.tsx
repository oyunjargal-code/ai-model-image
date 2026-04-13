"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";

export default function ImageAnalysis() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setSummary("");

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/analyze-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔍 Image analysis</CardTitle>
        <p className="text-gray-500 text-sm">
          Upload a food photo, and AI will detect the ingredients.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-48 h-48 object-cover rounded-lg"
          />
        )}
        <Button onClick={handleAnalyze} disabled={!image || loading}>
          {loading ? "Уншиж байна..." : "Analyze"}
        </Button>
        {summary && (
          <div>
            <p className="font-semibold">📋 Here is the summary</p>
            <Markdown>{summary}</Markdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
