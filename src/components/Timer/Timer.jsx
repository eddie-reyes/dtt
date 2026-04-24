import { useEffect, useState } from "react";

export default function Timer({isRunning}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
	if (!isRunning) return;
	
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(secs).padStart(2, "0")}`;
  };

  return <h2>Timer {formatTime(seconds)}</h2>;
}
