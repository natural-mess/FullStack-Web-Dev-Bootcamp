import React, { useState } from "react";

function App() {
  let [currTime, setTime] = useState(new Date().toLocaleTimeString("en-GB"));

  function getTime() {
    setTime(new Date().toLocaleTimeString("en-GB"));
  }

  setInterval(getTime, 1000);

  return (
    <div className="container">
      <h1>{currTime}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
