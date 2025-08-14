import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [headingName, setHeadingName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick(event) {
    setHeadingName(name);

    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {headingName}</h1>
      {/* <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
        value={name}
      /> */}
      {/* <button onClick={handleClick}>Submit</button> */}

      <form onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
