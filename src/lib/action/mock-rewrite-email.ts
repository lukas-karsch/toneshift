import {z} from "zod";
import {actionClient} from "@/lib/safe-action";
import {RewriteEmailFn} from "@/lib/action/rewrite-email";

const schema = z.object({
    email: z.string().min(1)
});

export const mockRewriteEmail: RewriteEmailFn = actionClient
    .schema(schema)
    .action(async ({parsedInput: {email: string}}) => {
        return {
            success: "Dear Customer Support, I am writing to express my deep concern and disappointment regarding a recent order I placed with your company. Unfortunately, I received an incorrect dishwasher model, which has caused significant inconvenience and frustration. I had ordered the [correct dishwasher model], but upon delivery, I discovered that a different model had been sent instead. This model is not suitable for my needs and does not meet the specifications I had carefully selected. This mix-up has resulted in considerable inconvenience, as I now need to arrange for the return of the incorrect item and wait for the correct one to be delivered. I am concerned about the time and effort this will require on my part. I would greatly appreciate your immediate attention to this matter. Specifically, I am requesting the following: 1. A return label to be sent to me as soon as possible for the incorrect dishwasher. 2. Prompt delivery of the correct [dishwasher model] that I originally ordered. 3. Consideration of appropriate compensation for the inconvenience caused, such as a partial refund or discount on future purchases. I have been a loyal customer and would like to maintain a positive relationship with your company. However, this experience has shaken my confidence in your service. I hope we can resolve this issue quickly and satisfactorily. I look forward to your response within the next 24 hours, detailing how you plan to address these concerns. Thank you for your prompt attention to this matter. Sincerely, Lukas"
        }
    });
