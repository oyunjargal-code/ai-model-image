"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageAnalysis from "@/components/ImageAnalysis";
import IngredientRecognition from "@/components/IngredientRecognition";
import FoodImageCreator from "@/components/FoodImageCreator";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">AI Image Models</h1>
        <p className="text-center text-gray-500 mb-8">
          Хоолны зураг дүн шинжилгээ хийх AI апп
        </p>

        <Tabs defaultValue="analysis">
          <TabsList className="grid grid-cols-4 w-full mb-8">
            <TabsTrigger value="analysis">🔍 Дүн шинжилгээ</TabsTrigger>
            <TabsTrigger value="ingredients">🥕 Орц таних</TabsTrigger>
            <TabsTrigger value="creator">🎨 Зураг үүсгэх</TabsTrigger>
            <TabsTrigger value="chat">💬 Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
            <ImageAnalysis />
          </TabsContent>
          <TabsContent value="ingredients">
            <IngredientRecognition />
          </TabsContent>
          <TabsContent value="creator">
            <FoodImageCreator />
          </TabsContent>
          <TabsContent value="chat">
            <ChatAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
