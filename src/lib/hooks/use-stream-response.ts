import {useState} from "react";

export default function useStreamingResponse() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const startStreaming = async (url: string) => {
        setError("");
        setValue("");
        const response = await fetch(url);
        if (!response.ok || !response.body) {
            setError(response.statusText);
            return;
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const {value, done} = await reader.read();
            if (done) break;
            const decoded = decoder.decode(value, {stream: true}).split("\n");
            console.log(decoded);
            const objects = decoded
                .filter(s => s.trim().length !== 0)
                .map(s => JSON.parse(s));
            for (const parsed of objects) {
                if (parsed.type === "content_block_delta") {
                    setValue(current => current + parsed["delta"]["text"]);
                }
            }
        }
    }

    return {startStreaming, value, error};
}
