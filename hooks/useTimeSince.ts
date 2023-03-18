import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const useTimeSince = function (timestamp?: number) {
  const [timeSince, setTimeSince] = useState("");

  useEffect(() => {
    if (timestamp) {
      setTimeSince(dayjs.unix(timestamp).fromNow());
    } else {
      setTimeSince("");
    }
  }, [timestamp]);

  return timeSince;
};

export default useTimeSince;
