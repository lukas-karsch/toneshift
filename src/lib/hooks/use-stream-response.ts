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
            const text = decoder.decode(value, {stream: true});
            setValue(current => current + text);
        }
    };

    return {startStreaming, value, error};
}
