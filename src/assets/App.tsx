import { useEffect, useState } from "react";
import Status from "./status/Status";
import "./app.css";
import Profile from "./profile/Profile";

export interface StatusesInterface {
  title: string;
  content: string;
  date: number;
  id: number;
}

export default function App() {
  const [statuses, setStatuses] = useState<Array<StatusesInterface>>();

  const fetchStatuses = async () => {
    const statusesReq = await fetch("api/statuses", {
      mode: "cors",
    });
    setStatuses(await statusesReq.json());
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <div id="app">
      <Profile />
      <div id="statuses">
        {statuses?.map((status) => (
          <Status
            key={status.id}
            title={status.title}
            content={status.content}
            date={status.date}
          />
        ))}
      </div>
    </div>
  );
}
