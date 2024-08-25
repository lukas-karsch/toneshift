"use server";

import Anthropic from "@anthropic-ai/sdk";
import {z} from "zod";
import {actionClient} from "@/lib/safe-action";

const anthropic = new Anthropic();

const schema = z.object({
    email: z.string().min(1)
});

export const rewriteEmail = actionClient
    .schema(schema)
    .action(async ({parsedInput: {email}}) => {
        try {
            const msg = await anthropic.messages.create({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 1000,
                temperature: 0,
                system: "You are a professional email rewriter.",
                messages: [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": `Your task is to take an angry, unprofessional email and rewrite it to be more appropriate, professional, and effective. Here's the email you need to rewrite:\n\n<angry_email>\n${email}\n</angry_email>\n\nFollow these guidelines when rewriting the email:\n\n1. Maintain the core message and main points of the original email.\n2. Remove any offensive language, insults, or aggressive tone.\n3. Use a professional and courteous tone throughout.\n4. Organize the content in a clear and logical manner.\n5. Be concise and to the point while remaining polite.\n6. Use appropriate salutations and closings.\n7. Ensure proper grammar, punctuation, and spelling.\n\nRewrite the email now, keeping these guidelines in mind. Your goal is to convey the same message and concerns in a way that is more likely to achieve a positive outcome.\n\nPresent your rewritten email within <rewritten_email> tags. Do not include any explanations or comments outside of these tags. Your entire response should consist solely of the rewritten email within the specified tags.`
                            }
                        ]
                    }
                ]
            });
            const regex = /<rewritten_email>([^<]*)<\/rewritten_email>/
            const text = msg.content
                .map(block => block.type === "text" ? block.text : "")
                .join("\n")
                .match(regex)?.[1];
            if (!text) {
                console.error("LLM returned incorrectly formatted data");
                console.log(msg);
                return;
            }
            return {
                success: text,
            }
        } catch (e) {
            console.error(e);
            return {
                error: "Something went wrong"
            }
        }
    });

export type RewriteEmailFn = typeof rewriteEmail;
