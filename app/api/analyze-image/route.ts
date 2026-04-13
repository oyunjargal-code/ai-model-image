import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "Зураг олдсонгүй" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const chatCompletion = await client.chatCompletion({
      model: "moonshotai/Kimi-K2.5:novita",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
              You are master chief.

              Describe in 1 sentence what kind of food this picture is
              - instructions
              - ingredient quantities
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: base64,
              },
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      summary: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Алдаа:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
