import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Текст олдсонгүй" }, { status: 400 });
    }

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      },
    );

    console.log("HF Status:", response.status);
    console.log("HF StatusText:", response.statusText);

    if (!response.ok) {
      const errText = await response.text();
      console.error("HF алдаа:", errText);
      return NextResponse.json({ error: errText }, { status: 500 });
    }

    const imageBlob = await response.arrayBuffer();
    const base64 = Buffer.from(imageBlob).toString("base64");

    return NextResponse.json({ image: `data:image/jpeg;base64,${base64}` });
  } catch (error) {
    console.error("Generate алдаа:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
