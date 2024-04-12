import { useRef, useState } from "react";
import { handleFile } from "../crypto.ts";

export default function SendMessageBox() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>();
  const [messageContent, setMessageContent] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleMessageContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.target.style.height = "";
    e.target.style.height = e.target.scrollHeight + "px";
    setMessageContent(e.target.value);
  };

  const handleFormSubmit = async () => {
    if (!file) return;
    const hashedFile = await handleFile(file);
    const body = {
      title: title,
      content: messageContent,
      secretKey: hashedFile,
    };
    await fetch("api/new-status", {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
    });
    setTitle("");
    setMessageContent("");
    return;
  };

  const handleFileButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current?.click();
  }

  return (
    <div id="send-message-box">
      <input type="file" ref={inputRef} style={ {'display' : 'none'}} onChange={handleFileChange}/>
      <button onClick={handleFileButtonClick}>METTRE LA CLÉ SECRÈTE</button>
      {file ? <div className="color-rainbow">{file.name}</div> : null}
      <input
        type="text"
        name="titre"
        placeholder="titre"
        onChange={handleTitleChange}
        value={title}
      />
      <textarea
        name="messageContent"
        id="messageContentArea"
        onChange={handleMessageContentChange}
        value={messageContent}
      ></textarea>

      <button onClick={handleFormSubmit} id="send-form-button">
        Envoyer
      </button>
      <span className="success"></span>
    </div>
  );
}
