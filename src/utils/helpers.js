import { formatDistanceToNow, format, formatRelative, parseISO } from 'date-fns'

// Converts a date string to a natural language 'distance since date' (eg: "14 minutes ago")
export function convertToNaturalLanguage(dateString) {
    const date = new Date(dateString);
    const distance = formatDistanceToNow(date, { includeSeconds: true, addSuffix: true });
    return distance;
}

// Converts a date string to 'yyyy-MM-dd'
export function convertDateInput(dateString) {
    const cleanedDateString = format(new Date(dateString), 'yyyy-MM-dd')
    return cleanedDateString;
}

// Converts a date string to natural language relative to current time "tomorrow, yesterday"
export function cleanDateString(dateString) {
    const cleanedDateString = formatRelative(parseISO(dateString), new Date())
    return cleanedDateString;
}