export const generateRawResultForHash = (result) => `{${result.reduce((total, number) => total + number, 0)}}`;
