export async function parseErrorMessage(response: Response) {
    const text = await response.text();
    try {
        const data = JSON.parse(text) as {message?: string};
        return data?.message ?? text;
    } catch {
        return text;
    }
}