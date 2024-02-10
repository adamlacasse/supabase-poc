import { useState } from 'react';
import Auth from '../components/Auth';
// import Account from '../components/Account';

import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  return (
    <main>
      {user ? (
        <h1>
          {`Logged in as: ${user.email}`}
        </h1>
      ) : <Auth setUser={setUser} />}
    </main>
  );
}

export default App;
