export function recordFromSearchParams(params: URLSearchParams): Record<string, string> {
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}
