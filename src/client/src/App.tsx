import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Initial render");
    const socket = new WebSocket("ws://localhost:3003");

    socket.onmessage = function (event) {
      console.log(`[message] Data received from server: ${event.data}`);
    };
  }, []);

  const handleNameClick = () => {
    fetch("http://localhost:3002/message", {
      body: JSON.stringify({
        messageType: 1,
        message: name,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:5173",
        Host: "localhost:3002",
        Accept: "*/*",
      },
    });
  };

  return (
    <div className="py-4">
      <h1 className="text-4xl text-center">Web Sockets Demo</h1>
      <form className="container grid grid-cols-2 border border-gray-500 p-8 mx-auto gap-4">
        <label htmlFor="name" className="text-end">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          className="btn-blue col-span-2"
          onClick={handleNameClick}
        >
          Change Name
        </button>
        {/* <label htmlFor="count" className="text-end">
          Count
        </label>
        <input type="text" id="count" className="form-input" /> */}
      </form>
    </div>
  );
};

export default App;
