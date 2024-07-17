export const extractOwnerFromUrl = (url: string): string => {
    if (!url) return 'Unknown';
    const match = url.match(/github\.com\/([^/]+)\//);
    return match ? match[1] : 'Unknown';
};