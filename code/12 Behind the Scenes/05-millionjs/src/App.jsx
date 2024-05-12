import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

// We can also use 'million.js' to optimize our React app

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    // These two state updates are combined together in a batch so that only one component execution
    // is triggered even though there are two state updates.
    setChosenCount(newCount);
    // We use this functional form for changing state so that we always get the latest state snapshot
    // in the argument. Hence we will get the state updated in the above statement. This is because React
    // will schedule the state updates in the same order they have been performed in the code.
    setChosenCount((prevChosenCount) => prevChosenCount + 1);
    // This will not print the state we just updated above because state updates are scheduled and are
    // not available instantly.
    console.log(chosenCount); // won't work!
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
