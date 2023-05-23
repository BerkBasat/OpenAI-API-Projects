import React from "react";
import { UseState } from "react";
import MessagesDisplay from "./components/MessagesDisplay";
import CodeDisplay from "./components/CodeDisplay";

interface ChatData {
  role: string;
  content: string;
}
const App = () => {
  const [chat, setChat] = UseState<ChatData[]>([]);
  const [value, setValue] = UseState<string>("");

  const getQuery = async () => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data: ChatData = await response.json();
      console.log(data);
      const userMessages = {
        role: "user",
        content: value,
      };
      setChat((oldChat) => [...oldChat, data, userMessages]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearChat = () => {
    setValue("");
    setChat([]);
  };

  const filteredUserMessages = chat.filter(
    (message) => message.role === "user"
  );
  const latest = chat.filter((message) => message.role === "assistant").pop();

  return (
    <div className="app">
      <MessagesDisplay userMessages={filteredUserMessages} />
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <CodeDisplay text={latest?.content || ""} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          Get Query
        </button>
        <button id="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default App;
