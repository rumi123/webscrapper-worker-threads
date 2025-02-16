export const safeStringify = (errorLog) => {
    console.log('errorLog',typeof errorLog);
    if (typeof errorLog === "string") return errorLog;
    if (!errorLog) return "No error details available";
    if (errorLog instanceof Error) {
        return JSON.stringify({ message: errorLog.message, stack: errorLog.stack });
    }
    try {
        return JSON.stringify(errorLog);
    } catch (err) {
        return `Error converting log to JSON: ${err.message}`;
    }
}

