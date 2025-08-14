import React from "react";
import emojipedia from "../emojipedia";
import Entry from "./Entry";

function createEntry(emojiDetail) {
  return (
    <Entry
      key={emojiDetail.id}
      emoji={emojiDetail.emoji}
      name={emojiDetail.name}
      meaning={emojiDetail.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
