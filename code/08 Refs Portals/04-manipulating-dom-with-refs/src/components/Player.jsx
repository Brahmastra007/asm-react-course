import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  
  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    // We can directly manipulate the input by imperatively setting its value through ref. However
    // we should use this only when required as React is based on the principle of declarative code,
    // which means letting React handle the DOM manipulation.
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input
          ref={playerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
