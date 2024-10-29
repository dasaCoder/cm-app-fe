// function to format timestamp into yyyy-mm-dd hh:mm:ss
export function formatDateTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
}