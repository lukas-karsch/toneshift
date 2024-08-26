"use client";

import {useState} from "react";
import useStreamingResponse from "@/lib/hooks/use-stream-response";

export default function Home() {
    const [email, setEmail] = useState<string>("");
    const {value: rewrittenEmail, startStreaming, error} = useStreamingResponse();

    return (
        <main className="p-8">
            <h1 className="text-2xl">let it all out 💕</h1>
            <div className="container mt-8">
                <form className="flex flex-col gap-4" action={async () => {
                    const params = new URLSearchParams({email});
                    const stream = await startStreaming("/api/rewrite?" + params);
                }}>
                    <textarea name="email" placeholder="don't hold back. how are you feeling?"
                              spellCheck={false}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              rows={4}/>
                    <button className="py-2 px-4 bg-blue-500 rounded-full text-white w-fit">i&apos;m done</button>
                </form>
            </div>
            <div>{rewrittenEmail}</div>
            {error &&
                <div>sorry, we couldn&apos;t generate your email.</div>
            }
        </main>
    );
}
