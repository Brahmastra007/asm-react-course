import { useState } from 'react';

import { log } from '../../log.js';

// Exporting the code for configuring the counter here so that the 'App' component does not reexecute
// every time the state 'enteredNumber' changes on typing something in input and only this component
// is reexecuted. We can use component composition like this by exporting the code belonging to one
// functionality to other component for optimization purposes.
export default function ConfigureCounter({ onSet }) {
  log('<ConfigureCounter />', 1);

  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
}
