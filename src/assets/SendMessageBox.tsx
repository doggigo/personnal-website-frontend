import { useState } from "react";
import { handleFile } from "./crypto.ts";

export default function SendMessageBox() {
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>();
  const [messageContent, setMessageContent] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setTitle(e.target.value);
  };

  const handleMessageContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!e.target.value) return;
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
    return;
  };

  return (
    <div>
      <input type="file" name="file" id="keyFile" onChange={handleFileChange} />
      <input
        type="text"
        name="titre"
        placeholder="titre"
        onChange={handleTitleChange}
      />
      <textarea
        name="messageContent"
        id="messageContentArea"
        onChange={handleMessageContentChange}
      ></textarea>
      <button onClick={handleFormSubmit}>Envoyer</button>
      <span className="success"></span>
    </div>
  );
}
