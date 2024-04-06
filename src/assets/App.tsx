import { useEffect, useState } from "react";
import Status from "./Status";
import "./app.css";

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
    console.log(statuses);
  }, []);

  return (
    <div id="app">
      <div id="statuses">
        <Status title="HEY" content="hey" date={0} />
        <Status
          title="Hello"
          content="&blue vlog d'aout {https://cdn.futura-sciences.com/cdn-cgi/image/width=1760,quality=50,format=auto/sources/images/actu/esperance-vie-chiens-chiot-golden-retriever.jpg} &white hello"
          date={0}
        />
        {statuses?.map((status) => 
          (
            <Status
              key={status.id}
              title={status.title}
              content={status.content}
              date={status.date}
            />
          )
        )}
      </div>
      <div className="profile"></div>
    </div>
  );
}
