"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function IngredientRecognition() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRecognize = async () => {
    if (!image) return;
    setLoading(true);
    setIngredients("");

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/recognize-ingredients", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setIngredients(data.ingredients);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🥕 Ingredient recognition</CardTitle>
        <p className="text-gray-500 text-sm">
          Describe the food, and AI will detect the ingredients.
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
        <Button onClick={handleRecognize} disabled={!image || loading}>
          {loading ? "Уншиж байна..." : "Recognize"}
        </Button>
        {ingredients && (
          <div>
            <p className="font-semibold">🥗 Identified ingredients</p>
            <p className="text-gray-700 mt-2 whitespace-pre-line">
              {ingredients}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
