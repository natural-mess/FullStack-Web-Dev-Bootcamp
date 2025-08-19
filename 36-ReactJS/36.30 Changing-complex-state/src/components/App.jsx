import React, { useState } from "react";

function App() {
  const [fullname, setFullName] = useState({
    fName: "",
    lName: ""
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setFullName(prevValue => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>Hello {fullname.fName} {fullname.lName}</h1>
      <form>
        <input onChange={handleChange} name="fName" placeholder="First Name" value={fullname.fName} />
        <input onChange={handleChange} name="lName" placeholder="Last Name" value={fullname.lName} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
