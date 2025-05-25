// components/LiveTimestamp.jsx
import { useEffect, useState } from "react";
import { getPreciseFromNow } from "/src/getPreciseFromNow";

const LiveTimestamp = ({ timestamp }) => {
  const [displayTime, setDisplayTime] = useState(getPreciseFromNow(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(getPreciseFromNow(timestamp));
    }, 30000); // update every 30 seconds

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-xs text-gray-500 mt-1">{displayTime}</span>;
};

export default LiveTimestamp;
// This component takes a timestamp prop and displays the time elapsed since that timestamp in a human-readable format.
