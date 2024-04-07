import "./profile.css";
import SendMessageBox from "./SendMessageBox";
import { formatMessage } from "./StatusContent";
export default function Profile() {
  return (
    <div className="profile">
      <span className="username">ROBINS</span>
      <div className="biography">
        {formatMessage(
          "&black &orange B &yellow I &lightgreen E &green N &blue V &purple E &lightpurple N &lightred U &black SUR MON SITE IBNTERNET MON BLOG OU JE PARTAGE DES CHOSE FOLLE {https://pbs.twimg.com/profile_images/1703526724602822656/vsw-qAAy_400x400.jpg}"
        )}
        <br />
      </div>
      <div className="socials">
        <img src="Twitter.jpg" alt="Twitter" id="twitter" />
        <img src="Discord.jpg" alt="Discord" id="discord" />
        <img src="GitHub.jpg" alt="GitHub" id="github" />
      </div>
       <SendMessageBox />
    </div>
  );
}
