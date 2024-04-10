import "../textcolors.css";

type color =
  | "red"
  | "orange"
  | "yellow"
  | "lightgreen"
  | "green"
  | "blue"
  | "purple"
  | "lightpurple"
  | "lightred"
  | "white"
  | "black"
  | "rainbow";

export function handleMediaString(mediaString: string, key: number) {
  const link = mediaString.substring(1, mediaString.length - 1);
  if (!(link.startsWith("http") || link.startsWith("https"))) {
    return (
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png"></img>
    );
  }

  let extension = link.includes("?")
    ? link.substring(0, link.indexOf("?"))
    : link;

  extension = extension.substring(link.lastIndexOf(".") + 1).toLowerCase();

  let element: JSX.Element;
  switch (extension) {
    case "gif":
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
    case "img":
      element = <img src={link} key={key}></img>;
      break;
    case "mp4":
    case "webm":
    case "mov":
      element = <video src={link} key={key}></video>;
      break;
    case "mp3":
    case "wav":
    case "ogg":
      element = <audio src={link} key={key}></audio>;
      break;
    default:
      element = <a href={link} key={key}></a>
      break;
  }
  return element;
}

export function formatMessage(message: string) {
  let elements = new Array<JSX.Element>();
  let bufferMessage = " ";
  let currentColor = "white";
  let i = 0;
  if (!message) return;

  for (let e of message.replace(/\n/g, " ").split(" ")) {
    if (e.startsWith("&")) {
      if (bufferMessage !== " ") {
        elements.push(
          <span className={`color-${currentColor}`} key={i}>
            {bufferMessage}
          </span>
        );
        bufferMessage = "";
      }
      currentColor = e.substring(1);
    } else if (e.startsWith("{") && e.endsWith("}")) {
      elements.push(<span className={`color-${currentColor}`} key={i}></span>);
      bufferMessage = " ";
      i++;
      elements.push(handleMediaString(e, i));
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
