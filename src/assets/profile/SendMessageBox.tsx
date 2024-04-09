import { useState } from "react";
import { handleFile } from "../crypto.ts";

export default function SendMessageBox() {
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
    let hashedFile = await handleFile(file);
    let body = {
      title: title,
      content: messageContent,
      secretKey: hashedFile,
    };
    console.log(body);
    await fetch("api/new-status", {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
    });
    setTitle("");
    setMessageContent("");
    return;
  };

  return (
    <div id='send-message-box'>
      <input type="file" name="file" id="keyFile" onChange={handleFileChange} />
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
      <button onClick={handleFormSubmit} id='send-form-button'>Envoyer</button>
      <span className="success"></span>
    </div>
  );
}
