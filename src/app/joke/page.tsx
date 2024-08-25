"use client";

import useStreamingResponse from "@/lib/hooks/use-stream-response";

export default function JokePage() {
    const {value: joke, error, startStreaming} = useStreamingResponse();

    return (
        <div className="p-8">
            <h1 className="text-2xl">Tell a joke</h1>
            <button className="rounded-full bg-blue-500 hover:bg-blue-600 transition-colors py-2 px-4 text-white"
                    onClick={async () => {
                        await startStreaming("api/joke")
                    }
                    }>Go!
            </button>
            <div className="text-sm text-red-800">
                {error}
            </div>
            <div className="mt-4">
                {joke}
            </div>
        </div>
    );
}
