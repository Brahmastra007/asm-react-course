import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        {/* All 'Counter' components will get their own states which will be independent from each other. */}
        {/* We can also use the 'key' prop to cause rerender of a component. Here we set 'key' as 'chosenCount'
        so whenever 'chosenCount' changes in this component, the 'Counter' component would be recreated and
        rerendered. Another alternative to achieving this functionality would be to add a 'useEffect' hook
        in the 'Counter' component with this 'initialCount' prop as a dependency but it is not recommended
        because it causes two component executions - one before 'useEffect' execution and one after as it would
        change some state. */}
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
