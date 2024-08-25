import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export const dynamic = "force-dynamic";

export function GET() {
    const stream = anthropic.messages.stream({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 300,
        system: "You are a professional comedian.",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `Tell a funny joke. Only respond with the joke, nothing else. Do not start a conversation or say random stuff.`
                    }
                ]
            }
        ]
    });
    return new Response(stream.toReadableStream());
}
