

export const formatTime = (date:Date)=>{
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2,'0');
    const seconds = date.getSeconds().toString().padStart(2,'0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;       
    hours = hours ? hours : 12;
    const hoursStr = hours.toString().padStart(2, '0');
    
    return `${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

/**
 * Formats a date string or Date object to a readable date-time string
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., "Nov 16, 2025, 08:09:58 AM")
 */
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};