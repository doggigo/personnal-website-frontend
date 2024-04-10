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
    let statusesReq = await fetch("api/statuses", {
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
        <Status
          key={1}
          date={1}
          title="HEY"
          content="HEY &blue HEY &white HEYYY &rainbow sava {https://images.ctfassets.net/denf86kkcx7r/2M8VfjD3l28336lmz4eatI/ab9251e30102058a16d2e7c538a098b4/top_5_chien_intelligents_vid_o}"
        />
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
