/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import Auth from '../components/Auth';
import Account from '../components/Account';

import './App.scss';

const routeProps = {
  loader: <Spinner />,
  errorElement: <Error />,
};

const authCheck = (user) => {
  if (user) {
    return <Account user={user} />;
  }
  return <Navigate to="/auth" />;
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <main>
      <h1>Welcome to Thunder Dome</h1>
      <Routes>
        <Route path="/" element={authCheck(user)} />
        <Route
          {...routeProps}
          path="/auth"
          element={<Auth setUser={setUser} />}
        />
        <Route
          {...routeProps}
          path="/account"
          element={authCheck(user)}
        />
      </Routes>
    </main>
  );
}

export default App;
