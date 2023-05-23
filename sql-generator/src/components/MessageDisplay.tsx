import React from "react";

interface UserMessage {
  role: string;
  content: string;
}

interface MessageDisplayProps {
  key: number;
  message: UserMessage;
}

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  return (
    <div className="message-display">
      <p id="icon">-</p>
      <p>{message.content}</p>
    </div>
  );
};

export default MessageDisplay;
