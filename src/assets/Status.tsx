import "./status.css";
import StatusContent from "./StatusContent";

function convertTime(timestamp: number){
  var a = new Date(timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  return `${date.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
}

export default function Status({ title, content, date }: StatusProps) {
  return (
    <div className="status">
      <div className="footer">
        <p className="title">{title}</p>
      </div>
      <div className="status-main">
        <StatusContent content={content}/>
        <p className="date">{convertTime(date)}</p>
      </div>
    </div>
  );
}

export interface StatusProps {
  title: string;
  content: string;
  date: number;
}
