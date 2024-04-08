import "./textcolors.css";

export function formatMessage(message: string) {
  let elements = new Array<JSX.Element>();
  let bufferMessage = "";
  let currentColor = "white";
  let i = 0;
  if (!message) return;

  for (let e of message.split(" ")) {
    if (e.startsWith("&")) {
      if (bufferMessage !== "") {
        elements.push(
          <span className={`color-${currentColor}`} key={i}>
            {bufferMessage}
          </span>
        );
        bufferMessage = "";
      }
      currentColor = e.substring(1);
    } else if (e.startsWith("{")) {
      elements.push(
        <span className={`color-${currentColor}`} key={i}>
          {bufferMessage}
        </span>
      );
      bufferMessage = "";
      i++;
      elements.push(<img src={e.substring(1, e.length - 1)} key={i}></img>);
    } else {
      bufferMessage += e + " ";
    }
    i++;
  }
  elements.push(
    <span className={`color-${currentColor}`} key={i}>
      {bufferMessage}
    </span>
  );

  return elements;
}

export default function StatusContent({ content }: StatusContentProps) {
  return <div className="status-content">{formatMessage(content)}</div>;
}

interface StatusContentProps {
  content: string;
}
