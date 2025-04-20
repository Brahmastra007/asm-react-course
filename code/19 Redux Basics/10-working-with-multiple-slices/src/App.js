import { Fragment } from 'react';

import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';


function App() {
  return (
    <Fragment>
      {/* Add the 'Header' and 'Auth' components */}
      <Header />
      <Auth />
      <Counter />
    </Fragment>
  );
}

export default App;
