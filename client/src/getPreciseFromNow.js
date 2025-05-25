// utils/getPreciseFromNow.js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Accepts a Firestore timestamp and returns a human-readable time difference.
 * @param {firebase.firestore.Timestamp} timestamp
 * @returns {string}
 */
export const getPreciseFromNow = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return 'Unknown time';

  const time = dayjs(timestamp.toDate());
  const now = dayjs();

  const diffInSeconds = now.diff(time, 'second');
  const diffInMinutes = now.diff(time, 'minute');
  const diffInHours = now.diff(time, 'hour');
  const diffInDays = now.diff(time, 'day');

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 30) return `${diffInDays}d ago`;

  return time.format('MMM D, YYYY');
};
// This function takes a Firestore timestamp and returns a human-readable time difference.