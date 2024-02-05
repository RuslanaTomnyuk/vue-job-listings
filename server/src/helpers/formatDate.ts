// Function to convert UTC timestamp to user's local time and format it
function convertAndFormatDate(utcTimestamp: Date) {
  const utcDate = new Date(utcTimestamp);
  const userTimezoneOffset = new Date().getTimezoneOffset();
  const userLocalTime = new Date(
    utcDate.getTime() - userTimezoneOffset * 60000
  );

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }).format(userLocalTime);

  return formattedDate;
}

export function convertToMilliseconds(utcTimestamp: Date) {
  const convertedAndFormattedDate = convertAndFormatDate(utcTimestamp);
  const userLocalTime = new Date(convertedAndFormattedDate);
  return userLocalTime.getTime();
}
