import React from "react";
import { useState } from "react";

function CreateArea(props) {
  const [noteItem, setNoteItem] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNoteItem(prevItem => {
      return {
        ...prevItem,
        [name]: value
      }
    })
  }

  return (
    <div>
      <form onSubmit={(event) => {
        props.onAdd(noteItem);
        event.preventDefault();
        setNoteItem({
          title: "",
          content: ""
        });
      }}>
        <input onChange={handleChange} value={noteItem.title} name="title" placeholder="Title" />
        <textarea onChange={handleChange} value={noteItem.content} name="content" placeholder="Take a note..." rows="3" />
        <button>
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
